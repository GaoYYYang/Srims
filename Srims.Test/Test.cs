using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;
using System.Data;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Reflection;
using System.Web;
using Microsoft.Office.Interop.Excel;
using Srims.Server.DataExchange;
using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Type;
namespace Srims.Test
{
    [TestClass]
    public class Test
    {
        [TestMethod, Description("更新专家统计存储过程测试")]
        public void UpdateExpertAchieveStatisticTest()
        {
            var db = Srims.Server.DataAccess.Database.New(Global.DatabaseConnectionString);
            var parameters = new Srims.Server.Business.Experts.ExpertAchieveStatisticUpdateParameters();

            parameters.Project_IDArray = null;//db.Projects.Select(p => p.ID).ToArray();

            parameters.Paper_IDArray = null;
            parameters.Paper_IsLinkMan = true;
            parameters.Paper_AuthorOrder = null;

            parameters.Award_IDArray = null;//new int[] { 1, 2 };
            parameters.Award_WinnerOrder = new MIS.Common.Range<int>(null, 3);

            parameters.Patent_IDArray = null;//db.Patents.Select(p => p.ID).ToArray();
            parameters.Patent_IsPrincipal = null;
            parameters.Patent_InvertorOrder = new MIS.Common.Range<int>(3, 5);

            var sw = Stopwatch.StartNew();
            db.ExpertAchieveStatistics.UpdateExpertAchieveStatistic(parameters);
            sw.Stop();
        }
        [TestMethod, Description("按新算法计算数据库Voucher表中的管理费")]
        public void UpdateVoucher()
        {
            var db = Srims.Server.DataAccess.Database.New(Global.DatabaseConnectionString);
            var parameters = new Srims.Server.Business.Experts.ExpertAchieveStatisticUpdateParameters();

            parameters.Project_IDArray = null;//db.Projects.Select(p => p.ID).ToArray();

            parameters.Paper_IDArray = null;
            parameters.Paper_IsLinkMan = true;
            parameters.Paper_AuthorOrder = null;

            parameters.Award_IDArray = null;//new int[] { 1, 2 };
            parameters.Award_WinnerOrder = new MIS.Common.Range<int>(null, 3);

            parameters.Patent_IDArray = null;//db.Patents.Select(p => p.ID).ToArray();
            parameters.Patent_IsPrincipal = null;
            parameters.Patent_InvertorOrder = new MIS.Common.Range<int>(3, 5);

            var sw = Stopwatch.StartNew();
            db.ExpertAchieveStatistics.UpdateExpertAchieveStatistic(parameters);
            sw.Stop();
        }
        [TestMethod, Description("所有横向项目中，有实际分配经费的人员，如果在‘项目成员’中没有的，系统自动添加到‘项目成员’中，位次按照分配经费先后顺序，从99开始排序号，依次递减。所有纵向项目中，有实际分配经费的人员，如果在‘项目成员’中没有的，系统自动添加到‘项目成员’中，位次按照分配经费先后顺序，从89开始排序号，依次递减。")]
        public void AdjustMembers()
        {
            var db = Srims.Server.DataAccess.Database.New(Global.DatabaseConnectionString);

            foreach (var item in db.Projects)
            {
                int i = 999;
                var projectmenbers = db.ProjectMemebers.Where(c => c.Project == item).ToList();
                var experts = new List<Expert>();
                foreach (var projectmember in projectmenbers)
                {
                    experts.Add(projectmember.Expert);
                }
                var vouchers = db.Vouchers.Where(c => c.FundAllocation.FundDescend.ProjectInfo_Fund.Project == item && (c.CurrentState.State == VoucherState.Allocated || c.CurrentState.State == VoucherState.NotSignIn | c.CurrentState.State == VoucherState.SignIn)).ToList();
                foreach (var voucher in vouchers)
                {
                    if (!experts.Contains(voucher.FundMember.Expert))
                    {
                        ProjectMember member = new ProjectMember();
                        member.Project = item;
                        member.Expert = voucher.FundMember.Expert;
                        member.IsExpertSecondCollege = voucher.FundMember.IsExpertSecondCollege;
                        member.Order = i--;
                        member.Save(db);
                    }
                }

            }

        }
        //[TestMethod, Description(" //2013.1.29加入新办法，对于2012.1.1.前的公益性行业专项，采用老办法生成管理费，之后的采用新办法。而对于非预算制的项目，都采用新办法。")]
        //public void UpdateOverheadExpensesAndPerformance()
        //{
        //    var db = Srims.Server.DataAccess.Database.New(Global.DatabaseConnectionString);
        //    var projects = db.Projects.Where(c => ((c.Type.TypeID == 70 && c.StartDate >= Convert.ToDateTime("2012-1-1")) || (!c.Type.Type.IsBudget && c.Type.Type.SubjectNature == SubjectNature.Science))&&(c.Fund.FundTotal-c.Fund.FundPlanOut)!=c.Fund.FundAlreadyIn);
        //    foreach()
        //}
        [TestMethod, Description(" //2013.1.29加入新办法，对于2012.1.1.前的公益性行业专项，采用老办法生成管理费，之后的采用新办法。而对于非预算制的项目，都采用新办法。")]
        public void testvoucher()
        {
            var db = Srims.Server.DataAccess.Database.New(Global.DatabaseConnectionString);
            var sys = db.SystemSettings.FirstOrDefault();
            sys.HorizontalPerformanceVoucher = 110;
            sys.Save(db);
        }
        /// <summary>
        ///  从EXCEL中获取数据(放入dataset中)
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="xmlname"></param>
        /// <returns></returns>
        public static DataSet GetDataFromFile(string tableName, string xmlname)
        {
            string directory = Global.SrimsDocumentPath;
            string conn = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + directory + xmlname + ";Extended Properties='Excel 8.0;HDR=YES;IMEX=1'";

            // string workSheetName = GetExcelWorkSheet(context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY) + filename);
            string sqlin = "SELECT * FROM [" + "Sheet1" + "$]";
            OleDbCommand oleCommand = new OleDbCommand(sqlin, new OleDbConnection(conn));
            OleDbDataAdapter adapterIn = new OleDbDataAdapter(oleCommand);
            DataSet dsIn = new DataSet();
            adapterIn.Fill(dsIn, tableName);

            return dsIn;
        }
    }
}
