using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Srims.Server.Business;
using Srims.Server.DataAccess;
using System.IO;

namespace Srims.Test.Utils
{
    /// <summary>
    /// Summary description for Util_CreatDemonDatabase
    /// </summary>
    [TestClass]
    public class Util_CreatDemonDatabase
    {
        private const string LOG_FILE_NAME = @"d:\\Log.txt";
        private static StreamWriter _LogFileWriter;
        private static Database db = Database.New(Global.DatabaseConnectionString);

        [TestMethod]
        public void CreateDemonDataBase()
        {

            if (File.Exists(LOG_FILE_NAME)) File.Delete(LOG_FILE_NAME);
            _LogFileWriter = File.CreateText(LOG_FILE_NAME);

            try
            {
                // createLogData();
                //createSystemSettingData();

                // createAnnouncementData();

                // createMessageData();
                //createDepartmentData();

                // createExpertData();
                //createBaseData();

                // createUserData();

                createFundData();
                createProjectData();
                createProjectDocumentData();

            }
            catch (Exception e)
            {
                if (_LogFileWriter != null)
                    _LogFileWriter.WriteLine(e.ToString());
            }

        }

        private void createProjectDocumentData()
        {
            var documents = db.Documents.ToList();

            foreach (var document in documents)
            {
                db = Database.New(Global.DatabaseConnectionString);

                document.Author = "提交人";
                document.Censor = "审核人";
                document.CensorDateTime = Convert.ToDateTime(@"2008/01/01");
                document.Name = "文档名称";
                document.SubmitDateTime = Convert.ToDateTime(@"2008/01/01");

                db.Submit();
            }

            var contracts = db.Contracts.ToList();

            foreach (var contract in contracts)
            {
                db = Database.New(Global.DatabaseConnectionString);

                contract.Author = "提交人";
                contract.Censor = "审核人";
                contract.CensorDateTime = Convert.ToDateTime(@"2008/01/01");
                contract.SubmitDateTime = Convert.ToDateTime(@"2008/01/01");

                db.Submit();

            }
        }

        private void createUserData()
        {
            int i = 0;
            var users = db.Users.ToList();
            foreach (var user in users)
            {
                db = Database.New(Global.DatabaseConnectionString);

                user.Email = null;
                user.Fax = null;
                user.HomePhone = "81234567";
                user.MobilePhone = "13708954218";
                user.Name = "用户" + i;
                user.NameSpell = "yh";
                user.OfficePhone = "12345678";

                db.Submit();
                i++;
            }
        }

        private void createDepartmentData()
        {
            int i = 0;
            var departments = db.Departments.ToList();
            foreach (var department in departments)
            {
                db = Database.New(Global.DatabaseConnectionString);

                department.Name = "部门" + i;
                department.ShortName = "部门" + i;

                db.Submit();
                i++;
            }
        }
        private void createBaseData()
        {
            int i = 0;
            var bases = db.Bases.ToList();
            foreach (var currentBase in bases)
            {
                db = Database.New(Global.DatabaseConnectionString);

                currentBase.AcademyDirectorName = "专家";
                currentBase.Address = "基地地址";
                currentBase.Administration = "主管部门";
                currentBase.DirectorName = "专家";
                currentBase.Fax = "111111";
                currentBase.Name = "基地名称" + i;
                currentBase.Phone = "13708954218";

                db.Submit();

                i++;
            }
        }

        private void createExpertData()
        {
            int i = 0;
            db = Database.New(Global.DatabaseConnectionString);
            var experts = db.Experts.ToList();
            foreach (var expert in experts)
            {
                expert.Address = "这是专家的通信地址";
                expert.Email = "ceshi@sina.com";
                expert.Fax = "111111";
                expert.FileNumber = "000000";
                expert.HomePhone = "81234567";
                expert.IDCardNumber = "";
                expert.MobilePhone = "13708954218";
                expert.Name = "专家" + i;
                expert.Occupation = null;
                expert.OfficePhone = "81234567";
                expert.SocietyPost = null;
                expert.Zip = "262700";
                expert.Number = String.Format("{0:D5}", i);
                i++;
                db.Submit();
            }
        }

        private void createMessageData()
        {
            var messages = db.Messages.ToList();
            foreach (var message in messages)
            {
                message.Delete(db);
            }
        }

        private void createAnnouncementData()
        {
            int i = 0;
            var announcements = db.Announcements.ToList();
            foreach (var announcement in announcements)
            {
                db = Database.New(Global.DatabaseConnectionString);

                announcement.Content = "这是测试通知";
                announcement.Title = "测试通知标题" + i;
                announcement.UserName = "通知发布人";

                db.Submit();
                i++;
            }
        }

        private void createSystemSettingData()
        {
            var systemsettings = db.SystemSettings.ToList();
            foreach (var systemSetting in systemsettings)
            {
                systemSetting.Delete(db);
            }
        }

        private void createLogData()
        {
            var logs = db.Logs.ToList();
            foreach (var log in logs)
                log.Delete(db);
        }

        private void createFundData()
        {
            //int i = 0;
            //var finances = db.Finances.ToList();
            //foreach (var finance in finances)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    finance.Abstract = "经费到帐备注";
            //    finance.InvoiceNumber = null;
            //    finance.InvoiceTime = null;
            //    finance.IsInvoiced = false;
            //    finance.VoucherNumber = String.Format("{0:D5}", i);
            //    finance.ReceivedDate = Convert.ToDateTime(@"2008/01/01");
            //    db.Submit();
            //    i++;
            //}
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE Finance");
            stringBuilder.Append("SET ReceivedDate = \"2008/01/01\",");
            stringBuilder.Append("    InvoiceNumber = \"\",");
            stringBuilder.Append("    IsInvoiced = 0,");
            stringBuilder.Append("    InvoiceTime = \"\",");
            stringBuilder.Append("    Abstract = \"经费到帐备注\",");
            stringBuilder.Append("    VoucherNumber = id ");


            db.Execute(stringBuilder.ToString());
        }
        private void createProjectData()
        {
            createProjectBasicData();
            createProjectHistoryData();
            createProjectMemberData();
            createProjectFundData();
            createProjectTypeData();
        }

        private void createProjectHistoryData()
        {
            //var projectStateHistorys = db.ProjectStateHistories.ToList();
            //foreach (var projectStateHistory in projectStateHistorys)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    projectStateHistory.DateTime = Convert.ToDateTime(@"2008/01/01");
            //    projectStateHistory.Operator = "操作人";
            //    projectStateHistory.Remark = "项目状态历史备注";

            //    db.Submit();
            //}

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE ProjectStateHistory ");
            stringBuilder.Append("SET Operator = \"操作人\",Remark=\"备注\",DescendDateTime = \"2008/01/01\" ");
            db.Execute(stringBuilder.ToString());
        }

        private void createProjectTypeData()
        {
        }
        private void createProjectMemberData()
        {
            //var projectMembers = db.ProjectMemebers.ToList();
            //foreach (var projectMember in projectMembers)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    projectMember.TaskName = null;
            //    projectMember.TaskNo = null;
            //    db.Submit();
            //}
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE ProjectMemebers ");
            stringBuilder.Append("SET TaskName = \"\",TaskName=\"\" ");
            db.Execute(stringBuilder.ToString());
        }

        private void createProjectBasicData()
        {
            //var projects = db.Projects.ToList();

            //int i = 0;
            //foreach (var project in projects)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    project.CreateDate = Convert.ToDateTime(@"2008/01/01");
            //    project.Creator = "创建人";
            //    project.EndDate = Convert.ToDateTime(@"2008/01/01");
            //    project.Name = "演示项目" + i;
            //    project.Number = String.Format("{0:D5}", i);
            //    project.Remark = "项目备注";
            //    project.StartDate = Convert.ToDateTime(@"2008/01/01");
            //    project.TaskComingFrom = "项目来源";

            //    i++;

            //    db.Submit();
            //}

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE Projects ");
            stringBuilder.Append("SET CreateDate = \"2008/01/01\",EndDate = \"2008/01/01\", StartDate = \"2008/01/01\", Creator = \"创建人\",Remark = \"项目备注\", TaskComingFrom = \"项目来源\", Name ='演示项目_' + CONVERT(char, id), Number =id  ");
            db.Execute(stringBuilder.ToString());
        }
        private void createProjectFundData()
        {
            createProjectFundBasicData();
            createProjectFundAllocationData();
            createProjectFundDescendData();
            createFundMemberData();
            createVoucherData();

        }

        private void createVoucherData()
        {
            //var vouchers = db.Vouchers.ToList();
            //foreach (var voucher in vouchers)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    voucher.AccountBookNumber = "新建";
            //    voucher.FinanceAllocateDateTime = Convert.ToDateTime(@"2008/01/01");
            //    voucher.FinanceNumber = null;
            //    db.Submit();
            //}
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE Vouchers ");
            stringBuilder.Append("SET AccountBookNumber = \"新建\",FinanceAllocateDateTime = \"2008/01/01\", FinanceNumber = \"\"  ");
            db.Execute(stringBuilder.ToString());

            //var voucherHistorys = db.VoucherStateHistories.ToList();
            //foreach (var voucherHistory in voucherHistorys)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    voucherHistory.DateTime = Convert.ToDateTime(@"2008/01/01");
            //    voucherHistory.Operator = "操作人";
            //    voucherHistory.Remark = "备注";

            //    db.Submit();
            //}

            StringBuilder stringBuilder1 = new StringBuilder();
            stringBuilder1.Append("UPDATE VoucherStateHistory ");
            stringBuilder1.Append("SET Operator = \"操作人\",Remark=\"备注\",DescendDateTime = \"2008/01/01\" ");
            db.Execute(stringBuilder1.ToString());
        }

        private void createFundMemberData()
        {
            //var fundMembers = db.FundMembers.ToList();
            //foreach (var fundMember in fundMembers)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    fundMember.AccountBookNumber = "新建";
            //    db.Submit();
            //}

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE FundMember ");
            stringBuilder.Append("SET AccountBookNumber = \"新建\" ");
            db.Execute(stringBuilder.ToString());
        }

        private void createProjectFundDescendData()
        {
            //var fundDescends = db.FundDescends.ToList();
            //foreach (var fundDescend in fundDescends)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    fundDescend.DescendDateTime = Convert.ToDateTime(@"2008/01/01");
            //    fundDescend.Operator = "操作人";

            //    db.Submit();
            //}
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE FundDescend ");
            stringBuilder.Append("SET Operator = \"操作人\",DescendDateTime = \"2008/01/01\" ");
            db.Execute(stringBuilder.ToString());

            //var fundDescendHistorys = db.FundDescendStateHistories.ToList();
            //foreach (var fundDescendHistory in fundDescendHistorys)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    fundDescendHistory.DateTime = Convert.ToDateTime(@"2008/01/01");
            //    fundDescendHistory.Operator = "操作人";
            //    fundDescendHistory.Remark = "备注";

            //    db.Submit();
            //}
            StringBuilder stringBuilder1 = new StringBuilder();
            stringBuilder1.Append("UPDATE FundDescendStateHistory ");
            stringBuilder1.Append("SET Operator = \"操作人\",Remark=\"备注\",DescendDateTime = \"2008/01/01\" ");
            db.Execute(stringBuilder1.ToString());
        }

        private void createProjectFundAllocationData()
        {
            //var fundAllocations = db.FundAllocations.ToList();

            //var fundAllocationHistorys = db.FundAllocationStateHistories.ToList();
            //foreach (var fundAllocationHistory in fundAllocationHistorys)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    fundAllocationHistory.DateTime = Convert.ToDateTime(@"2008/01/01");
            //    fundAllocationHistory.Operator = "操作人";
            //    fundAllocationHistory.Remark = "备注";

            //    db.Submit();
            //}
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE FundAllocationStateHistory ");
            stringBuilder.Append("SET Operator = \"操作人\",Remark = \"备注\", DateTime = \"2008/01/01\" ");
            db.Execute(stringBuilder.ToString());
        }

        private void createProjectFundBasicData()
        {
            //var projectFunds = db.ProjectInfo_Funds.ToList();
            //foreach (var projectFund in projectFunds)
            //{
            //    db = Database.New(Global.DatabaseConnectionString);

            //    projectFund.FundFrom = "资金来源";
            //    projectFund.FundFromUnit = "来款单位";
            //    projectFund.FundFromUnitAddress = "来款单位地址";

            //    db.Submit();
            //}
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append("UPDATE ProjectInfo_Fund ");
            stringBuilder.Append("SET FundFrom = \"资金来源\", FundFromUnit = \"来款单位\", FundFromUnitAddress = \"来款单位地址\" ");
            db.Execute(stringBuilder.ToString());
        }
    }
}
