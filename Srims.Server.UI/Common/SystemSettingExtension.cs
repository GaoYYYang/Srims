using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 
    /// </summary>
    public static class SystemSettingExtension
    {
        /// <summary>
        /// 显示系统设置
        /// </summary>
        public static void ShowSystemSetting(SystemSetting systemsetting, HttpResponse response, IDatabase database)
        {
            response.WriteTagWithValue("ID", systemsetting.ID);
            response.WriteTagWithValue("FundOutRatio", systemsetting.FundOutRatio);
            response.WriteTagWithValue("DefaultOverheadExpenseInRateHorizonal", systemsetting.DefaultOverheadExpenseInRateHorizonal);
            response.WriteTagWithValue("DefaultOverheadExpenseOutRateHorizonal", systemsetting.DefaultOverheadExpenseOutRateHorizonal);
            response.WriteTagWithValue("DefaultOverheadExpenseInRateVertical", systemsetting.DefaultOverheadExpenseInRateVertical);
            response.WriteTagWithValue("DefaultOverheadExpenseOutRateVertical", systemsetting.DefaultOverheadExpenseOutRateVertical);
            response.WriteTagWithValue("EmailAddress", systemsetting.EmailAddress);
            response.WriteTagWithValue("SmtpHost", systemsetting.SmtpHost);
            response.WriteTagWithValue("SmtpPort", systemsetting.SmtpPort);
            response.WriteTagWithValue("SmtpUsername", systemsetting.SmtpUsername);
            response.WriteTagWithValue("SmtpPassword", systemsetting.SmtpPassword);
            response.WriteTagWithValue("FinanceWebAddress", systemsetting.FinanceWebAddress);
            response.WriteTagWithValue("ExpertWebAddress", systemsetting.ExpertWebAddress);
            response.WriteTagWithValue("LogType", systemsetting.GetAutoRunLogType(database));
            response.WriteTagWithValue("WindowsServiceType", systemsetting.GetAutoRunWindowService(database));
            response.WriteTagWithValue("PaperDescription", systemsetting.PaperDescription);
        }
        /// <summary>
        /// 显示系统设置
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this IList<SystemSetting> list, HttpResponse response, IDatabase database)
        {
            ShowDelegateWithDatabase<SystemSetting> showDelegate = new ShowDelegateWithDatabase<SystemSetting>(ShowSystemSetting);
            list.Show<SystemSetting>(response, database, showDelegate);
        }
        /// <summary>
        /// 取得系统设置
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static SystemSetting GetSystemSetting(this HttpRequest request, IDatabase database, User user)
        {
            var systemsetting = request.getSystemSetting(database, user);
            systemsetting.FundOutRatio = request.GetInt("FundOutRatio");
            if (request.GetInt("DefaultOverheadExpenseInRateHorizonal").HasValue)
                systemsetting.DefaultOverheadExpenseInRateHorizonal = request.GetInt("DefaultOverheadExpenseInRateHorizonal").Value * 100;
            if (request.GetInt("DefaultOverheadExpenseOutRateHorizonal").HasValue)
                systemsetting.DefaultOverheadExpenseOutRateHorizonal = request.GetInt("DefaultOverheadExpenseOutRateHorizonal").Value * 100;
            if (request.GetInt("DefaultOverheadExpenseInRateVertical").HasValue)
                systemsetting.DefaultOverheadExpenseInRateVertical = request.GetInt("DefaultOverheadExpenseInRateVertical").Value * 100;
            if (request.GetInt("DefaultOverheadExpenseOutRateVertical").HasValue)
                systemsetting.DefaultOverheadExpenseOutRateVertical = request.GetInt("DefaultOverheadExpenseOutRateVertical").Value * 100;
            systemsetting.EmailAddress = request.GetString("EmailAddress");
            systemsetting.SmtpHost = request.GetString("SmtpHost");
            systemsetting.SmtpPort = request.GetInt("SmtpPort");
            systemsetting.SmtpUsername = request.GetString("SmtpUsername");
            systemsetting.SmtpPassword = request.GetString("SmtpPassword");
            systemsetting.FinanceWebAddress = request.GetString("FinanceWebAddress");
            systemsetting.ExpertWebAddress = request.GetString("ExpertWebAddress");
            systemsetting.PaperDescription = request.GetString("PaperDescription");
            systemsetting.WindowsServiceType = null;

            return systemsetting;
        }
        private static SystemSetting getSystemSetting(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.SystemSettings.GetByID(id.Value);

            var systemsetting = new SystemSetting();
            return systemsetting;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldEntity(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getSystemSetting(database, user).Clone();
            return oldEntity;
        }
    }
}
