using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using System.Transactions;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 系统设置
    /// </summary>
    public partial class SystemSetting : Entity<SystemSetting>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "FundOutRatio", Title = "外协经费在总经费中最大比例" });
            list.Add(new LogDescriptionItem { Name = "HorizontalVoucher", Title = "横向凭单数目" });
            list.Add(new LogDescriptionItem { Name = "VerticalVoucher", Title = "纵向凭单数目" });
            list.Add(new LogDescriptionItem { Name = "DefaultOverheadExpenseInRateHorizonal", Title = "默认横向校内管理费率" });
            list.Add(new LogDescriptionItem { Name = "DefaultOverheadExpenseOutRateHorizonal", Title = "默认横向校外管理费率" });
            list.Add(new LogDescriptionItem { Name = "DefaultOverheadExpenseInRateVertical", Title = "默认纵向校内管理费率（非预算制）" });
            list.Add(new LogDescriptionItem { Name = "DefaultOverheadExpenseOutRateVertical", Title = "默认纵向校外管理费率（非预算制）" });
            list.Add(new LogDescriptionItem { Name = "LogType", Title = "日志类型" });
            list.Add(new LogDescriptionItem { Name = "EmailAddress", Title = "邮件地址" });
            list.Add(new LogDescriptionItem { Name = "SmtpHost", Title = "SMTP域" });
            list.Add(new LogDescriptionItem { Name = "SmtpPort", Title = "SMTP端口" });
            list.Add(new LogDescriptionItem { Name = "SmtpPassword", Title = "SMTP密码" });
            list.Add(new LogDescriptionItem { Name = "SmtpUsername", Title = "SMTP用户名" });
            list.Add(new LogDescriptionItem { Name = "FinanceWebAddress", Title = "财务处网址" });
            list.Add(new LogDescriptionItem { Name = "ExpertWebAddress", Title = "人事处网址" });
            list.Add(new LogDescriptionItem { Name = "WindowsServiceType", Title = "Windows服务类型" });
            list.Add(new LogDescriptionItem { Name = "HorizontalPerformanceVoucher", Title = "横向绩效凭单数目" });
            list.Add(new LogDescriptionItem { Name = "VPV", Title = "纵向绩效凭单数目" });
            return list.ToArray();
        }
        /// <summary>
        /// 取得自动运行的WindowsService
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public string GetAutoRunWindowService(IDatabase database)
        {
            var windowServiceArray = getWindowsServiceArray();
            string autoRenwindowServiceString = string.Empty;

            for (int i = 0; i < windowServiceArray.Length; i++)
                if (windowServiceArray[i] == "1")
                    autoRenwindowServiceString += ((WindowsServiceType)Enum.Parse(typeof(WindowsServiceType), (i + 1).ToString())).ToString() + ",";

            return autoRenwindowServiceString;
        }
        ///<summary>
        /// 判断windows服务是否自动执行
        /// </summary>
        /// <param name="windowsServiceType"></param>
        ///<param name="database"></param>
        /// <returns></returns>
        public bool IsWindowsServiceAutoRun(int windowsServiceType, IDatabase database)
        {
            string[] windowsServiceTypeArry = getWindowsServiceArray();

            if (windowsServiceType > windowsServiceTypeArry.Length)
                return false;

            if (windowsServiceTypeArry[windowsServiceType - 1] == "1")
                return true;

            return false;
        }
        /// <summary>
        /// 使某一项windows服务自动执行
        /// </summary>
        /// <param name="windowsServiceType"></param>
        /// <param name="database"></param>
        public void SetWindowsServiceCanAutoRun(int windowsServiceType, IDatabase database)
        {
            setWindowsServiceTypeValue(windowsServiceType, database, true);
        }
        private void setWindowsServiceTypeValue(int windowsServiceType, IDatabase database, bool IsAutoRun)
        {
            string[] windowsServiceArray = getWindowsServiceArray();
            string[] newWindowsServiceArray = new string[] { };

            if (windowsServiceType > windowsServiceArray.Length)
            {
                List<string> listString = new List<string>();
                for (int i = 0; i < windowsServiceType; i++)
                    listString.Add("0");
                newWindowsServiceArray = listString.ToArray();

                if (windowsServiceArray.Length > 0)
                    windowsServiceArray.CopyTo(newWindowsServiceArray, 0);
                windowsServiceArray = newWindowsServiceArray;
            }
            windowsServiceArray[windowsServiceType - 1] = (Convert.ToInt32(IsAutoRun)).ToString();
            this.WindowsServiceType = windowsServiceArray.ToString(",");
            this.Save(database);
        }
        private string[] getWindowsServiceArray()
        {
            return string.IsNullOrEmpty(this.WindowsServiceType) ? new string[] { } : this.WindowsServiceType.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        }
        /// <summary>
        /// 取得自动运行的LogType
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public string GetAutoRunLogType(IDatabase database)
        {
            var LogTypeArray = GetLogArray(database);
            string autoRenLogTypeString = string.Empty;

            for (int i = 0; i < LogTypeArray.Length; i++)

                if (LogTypeArray[i] == "1")
                    autoRenLogTypeString += ((LogType)Enum.Parse(typeof(LogType), (i + 1).ToString())).ToString() + ",";

            return autoRenLogTypeString;
        }
        /// <summary>
        /// 设置需要保存的日志类型
        /// </summary>
        /// <param name="LogString"></param>
        /// <param name="database"></param>
        public void SetNeedWriteLoyTypeString(LogType[] LogString, IDatabase database)
        {
            if (LogString == null || LogString.Length == 0)
            {
                saveLogTypes(database, null);
                return;
            }

            int max = (int)LogString[0];
            for (int i = 1; i < LogString.Length; i++)
                if ((int)LogString[i] > max)
                    max = (int)LogString[i];

            string[] needWriteLoyTypeArray = new string[max];

            for (int i = 0; i < needWriteLoyTypeArray.Length; i++)
                needWriteLoyTypeArray[i] = "0";

            for (int i = 0; i < LogString.Length; i++)
                needWriteLoyTypeArray[(int)LogString[i] - 1] = "1";

            saveLogTypes(database, needWriteLoyTypeArray.ToString(","));
        }
        private static void saveLogTypes(IDatabase database, string logTypes)
        {
            var systemSetting = database.SystemSettings.GetSystemSetting();
            systemSetting.LogType = logTypes;
            systemSetting.Save(database);
        }

        private string[] GetLogArray(IDatabase database)
        {
            string logString = database.SystemSettings.GetSystemSetting().LogType;
            return string.IsNullOrEmpty(logString) ? new string[] { } : logString.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        }
    }

    /// <summary>
    /// 系统设置的业务扩展
    /// </summary>
    public static class SystemSettingBusinessExtension
    {
        /// <summary>
        /// 取得系统设置
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <returns>系统设置</returns>
        public static SystemSetting GetSystemSetting(this IEntityDataAccess<SystemSetting> dataAccess)
        {
            var systemSetting = dataAccess.Single();
            if (systemSetting == null)
            {
                systemSetting = new SystemSetting();
                systemSetting.Save(dataAccess.Database);
            }
            return systemSetting;
        }
    }
    /// <summary>
    /// 系统设置的查询扩展
    /// </summary>
    public static class SystemSettingQueryExtension
    {
        /// <summary>
        /// 取得新的横向凭单编号
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <returns></returns>
        public static int NewHorizontalVouherNumber(this IEntityDataAccess<SystemSetting> dataAccess)
        {
            int voucherNumber;
            using (TransactionScope ts = new TransactionScope())
            {
                var systemSetting = dataAccess.GetSystemSetting();

                voucherNumber = ++systemSetting.HorizontalVoucher;

                systemSetting.Save(dataAccess.Database);

                ts.Complete();
            }
            return voucherNumber;
        }
        /// <summary>
        /// 取得新的纵向凭单编号
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <returns></returns>
        public static int NewVerticalVouherNumber(this IEntityDataAccess<SystemSetting> dataAccess)
        {
            int voucherNumber;
            using (TransactionScope ts = new TransactionScope())
            {
                var systemSetting = dataAccess.GetSystemSetting();
                voucherNumber = ++systemSetting.VerticalVoucher;
                systemSetting.Save(dataAccess.Database);
                ts.Complete();
            }
            return voucherNumber;
        }
        /// <summary>
        /// 取得新的横向绩效凭单编号
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <returns></returns>
        public static int NewHorizontalPerformanceVouherNumber(this IEntityDataAccess<SystemSetting> dataAccess)
        {
            int voucherNumber;
            using (TransactionScope ts = new TransactionScope())
            {
                var systemSetting = dataAccess.GetSystemSetting();

                voucherNumber = ++systemSetting.HorizontalPerformanceVoucher;

                systemSetting.Save(dataAccess.Database);

                ts.Complete();
            }
            return voucherNumber;
        }
        /// <summary>
        /// 取得新的纵向绩效凭单编号
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <returns></returns>
        public static int NewVerticalPerformanceVouherNumber(this IEntityDataAccess<SystemSetting> dataAccess)
        {
            int voucherNumber;
            using (TransactionScope ts = new TransactionScope())
            {
                var systemSetting = dataAccess.GetSystemSetting();
                voucherNumber = ++systemSetting.VPV;
                systemSetting.Save(dataAccess.Database);
                ts.Complete();
            }
            return voucherNumber;
        }
    }
    /// <summary>
    /// 系统设置的权限扩展
    /// </summary>
    public static class SystemSettingPermissionExtension
    {
    }
}
