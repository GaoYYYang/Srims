using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Documents;
using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.Users;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class SystemSettingService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            List<SystemSetting> list = new List<SystemSetting>();
            var systemSetting = Database.SystemSettings.GetSystemSetting();
            list.Add(systemSetting);

            list.Show(Response, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldSystemSetting = Request.GetOldEntity(Database, User);
            var systemsetting = Request.GetSystemSetting(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = Log.GetEditOperationDescription(oldSystemSetting, systemsetting, SystemSetting.GetDescriptionItems(), false);
                Log.Write(User.Name, (int)LogType.SystemSettingEdit, description, Request.UserHostAddress, "编辑系统设置", Database);
                systemsetting.Save(Database);
                ts.Complete();
            }
            var windowsServices = Request.GetEnumList<WindowsServiceType>("WindowsServiceType");
            if (windowsServices == null)
                return;

            foreach (var windowsService in windowsServices)
                systemsetting.SetWindowsServiceCanAutoRun(Convert.ToInt32(windowsService), Database);
        }

        [WebMethod]
        public void GetPaperDescript()
        {
            var systemSetting = Database.SystemSettings.GetSystemSetting();

            Response.Write(systemSetting.PaperDescription);

        }

        [WebMethod]
        public void RemindAndSendEmail()
        {
            startWork();
            Response.Write("执行中，当日请勿二次点击");
        }

        private void startWork()
        {



            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.PatentEmailAutoSent, Database))
                Database.PatentInventers.PayPatentFeeRemind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.ProjectEndAwoke, Database))
                Database.Projects.EndAwoke(Database);

            //  if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.AdminWorkAwoke, Database))
            //      Database.Users.WorkRemind();

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.FundAllocation, Database))
                Database.FundDescends.FundAllocationRemind(Database);


            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.VoucherPrint, Database))
            {
                Database.Vouchers.VoucherPrintRemind(Database);
                Database.Vouchers.VoucherPrintRemindToAdmin(Database);
            }

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.VoucherPrintedRemind, Database))
                Database.VoucherStateHistories.VoucherPrintedRemind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.ExpertCensorRemind, Database))
                Database.ExpertCensorInfos.SendMailToAdmin(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorVerticalProjectRemind, Database))
                Database.Projects.CensorVerticalProjectRemind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorHorizontalProjectRemind, Database))
                Database.Projects.CensorHorizontalProjectRemind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorDocumentRemaind, Database))
                Database.Documents.CeasorDocumentRemaind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorContractRemaind, Database))
                Database.Contracts.CensorContractRemaind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorFundAllocationRemaind, Database))
                Database.FundAllocations.CensorFundAllocationRemaind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorProjectRemaind, Database))
                Database.Projects.CensorProjectRemaind(Database);

            if (Database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorFundDescendRemaind, Database))
                Database.FundDescends.CensorFundDescendRemaind(Database);



        }
    }
}