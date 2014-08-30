using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Performances;
using Srims.Server.UI;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.ManageFeesImport
{
    public static class DateUpdate
    {
        public static string ImportData(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);
            string fileName = "DateUpdate";
            StringBuilder UpdateLog = new StringBuilder();
            StringBuilder Compare = new StringBuilder();
            StringBuilder NoAllocation = new StringBuilder();
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);
            database = Database.New();
            int count = 0;
            //校内简介费生成比例
            double number = 0.13;
            ////系统生成Finance
            //Finance finance = new Finance();
            //finance.Abstract = "系统升级生成绩效时所生成，生成的所有项目的绩效均在本Finance金额里面";
            //finance.ReceivedDate = System.DateTime.Now;
            //finance.VoucherNumber = "系统生成";
            //finance.DescendAmount = 0;
            //finance.Amount = 10000000000;
            //finance.IsInvoiced = false;
            //finance.Remarks = "系统升级生成绩效时所生成，生成的所有项目的绩效均在本Finance金额里面";
            //finance.Save(database);
            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                //项目间接费用总额
                string indirectCosts = row[13].ToString().Trim();
                //设备购置费
                string EquipmentCost = row[14].ToString().Trim();
                //校内间接费用
                string indirectCostsin = row[16].ToString().Trim();
                //项目总绩效
                string ProjectPerformance = row[15].ToString().Trim();
                //
                //项目ID
                string ID = row[0].ToString();

                //以下字段用于数据比对
                //读入的应收间接费用
                string readOverheadExpensesAmount = row[12].ToString().Trim();
                //读入的校内绩效
                string readPerformancein = row[17].ToString().Trim();
                //校内间接费用是否为空
                bool blank = indirectCostsin.IsEmptyOrNull() ? true : false;

                Project project = database.Projects.SingleOrDefault(c => c.ID.ToString() == ID);

                if (project.ID == 9006)
                {
                    var a = 0;
                }
                try
                {
                    //根据项目的序号取得项目信息

                    ProjectInfo_Fund Fund = database.ProjectInfo_Funds.SingleOrDefault(c => c.ProjectID.ToString() == ID);
                    //校内绩效
                    Int64 performancein;
                    performancein = readPerformancein.IsEmptyOrNull() ? 0
                        : Convert.ToInt64(readPerformancein);


                    //更新项目经费信息
                    Fund.EquipmentCost = EquipmentCost.IsEmptyOrNull() ? 0 : Convert.ToInt64(EquipmentCost);
                    Fund.BorrowAmount = 0;
                    Fund.PerformancePay = performancein;
                    Fund.ProjectPerformancePay = ProjectPerformance.IsEmptyOrNull() ? 0 : Convert.ToInt64(ProjectPerformance);
                    Fund.IndirectCosts = indirectCosts.IsEmptyOrNull() ? 0 : Convert.ToInt64(indirectCosts);

                    //保存校内管理费
                    Int64 managefeesin;
                    if (blank)
                        managefeesin = Convert.ToInt64((double)Fund.FundPlanIn * number) - performancein;
                    else
                        managefeesin = Convert.ToInt64(indirectCostsin) - Convert.ToInt64(performancein);
                    Fund.OverheadExpenseInTotal = Convert.ToInt64(managefeesin);

                    Fund.Save(database);

                    if (Fund.FundAlreadyIn == 0)
                    {
                        NoAllocation.AppendFormat("项目:{0}已分配经费为零，故没有生成追缴单和绩效记录\n", project.Name);
                        continue;
                    }

                    //保存项目追缴单信息
                    Recovery Recovery = new Recovery();
                    Recovery.ReceivedOverheadExpensesIn = Fund.OverheadExpensesAlreadyIn;
                    if (blank)
                        indirectCostsin = (Convert.ToInt32(Fund.FundPlanIn) * number).ToString();

                    Recovery.PlanedOverheadExpensesIn = Convert.ToInt64(Convert.ToInt64(indirectCostsin) * (decimal)(Fund.FundAlreadyIn) / Fund.FundPlanIn);

                    if (Recovery.PlanedOverheadExpensesIn.ToString() != readOverheadExpensesAmount && !readOverheadExpensesAmount.IsEmptyOrNull())
                        Compare.AppendFormat("项目：{0}  的应收取间接费用数据不一致！科技处提供表格数据中为{1} 系统计算为：{2}。\n", project.Name, readOverheadExpensesAmount, Recovery.PlanedOverheadExpensesIn);


                    Recovery.PlanedPerformancePay = Convert.ToInt64(((decimal)(Fund.FundAlreadyIn) / Fund.FundPlanIn) * Convert.ToInt64(performancein));
                    Recovery.Project = project;
                    Recovery.IsPrint = false;
                    Recovery.VoucherNumber = getVoucherNumber(Recovery, database);
                    Recovery.Save(database);
                    count++;
                    UpdateLog.AppendFormat("成功生成追缴单：追缴单的基本信息为：\n 对应项目：{0},已收间接费用：{1},应收间接费用:{2},追缴单号：{3}\n", Recovery.Project.Name, Recovery.ReceivedOverheadExpensesIn, Recovery.PlanedOverheadExpensesIn, Recovery.VoucherNumber);


                    if (performancein != 0)
                    {
                        if (performancein.ToString() != readPerformancein && !readPerformancein.IsEmptyOrNull())
                            Compare.AppendFormat("项目：{0}  的校内绩效数据不一致！科技处提供表格数据中为{1} 系统计算为：{2}。\n", project.Name, readPerformancein, performancein);


                        ////系统生成经费下拨
                        //FundDescend fundDescend = new FundDescend();

                        //fundDescend.ProjectInfo_Fund = Fund;
                        //fundDescend.DescendDateTime = System.DateTime.Now;
                        //fundDescend.Amount = Convert.ToInt32(((decimal)(Fund.FundAlreadyIn) / Fund.FundPlanIn) * Convert.ToInt64(performancein));
                        //fundDescend.ReceivedAmount = Convert.ToInt32(((decimal)(Fund.FundAlreadyIn) / Fund.FundPlanIn) * Convert.ToInt64(performancein));
                        //fundDescend.Operator = "系统生成";
                        //fundDescend.Save(database);
                        ////系统生成FinanceFundDescend
                        //FinanceFundDescend financefunddescend = new FinanceFundDescend();
                        //financefunddescend.Finance = finance;
                        //financefunddescend.FundDescend = fundDescend;
                        //financefunddescend.Amount = Convert.ToInt32(((decimal)(Fund.FundAlreadyIn) / Fund.FundPlanIn) * Convert.ToInt64(performancein));
                        //financefunddescend.Operator = "系统生成";
                        //financefunddescend.OperateDateTime = System.DateTime.Now;
                        //financefunddescend.IsReturn = false;
                        //financefunddescend.Save(database);

                        //FundDescendStateHistory funddescendstate = new FundDescendStateHistory();
                        //funddescendstate.FundDescend = fundDescend;
                        //funddescendstate.State = FundDescendState.AllocationCompleted;
                        //funddescendstate.Operator = "系统生成";
                        //funddescendstate.DateTime = System.DateTime.Now;
                        //funddescendstate.Remark = "数据库升级时追缴单形成时系统所生成";
                        //funddescendstate.Save(database);
                        //fundDescend.CurrentState = funddescendstate;
                        //fundDescend.Save(database);

                        ////系统生成经费分配
                        //FundAllocation fundallocation = new FundAllocation();
                        //fundallocation.FundDescend = fundDescend;
                        //fundallocation.AllocationIn = 0;
                        //fundallocation.AllocationOut = 0;
                        //fundallocation.AllocationHardware = 0;
                        //fundallocation.PerformancePay = fundDescend.Amount;
                        //fundallocation.OverheadExpensesIn = 0;
                        //fundallocation.OverheadExpensesOut = 0;
                        //fundallocation.OverheadPerformancePay = 0;
                        //fundallocation.Save(database);

                        //FundAllocationStateHistory fundallocationstate = new FundAllocationStateHistory();
                        //fundallocationstate.FundAllocation = fundallocation;
                        //fundallocationstate.State = FundAllocationState.Passed;
                        //fundallocationstate.Operator = "系统生成";
                        //fundallocationstate.DateTime = System.DateTime.Now;
                        //fundallocationstate.Remark = "数据库升级时追缴单形成时系统所生成";
                        //fundallocationstate.Save(database);
                        //fundallocation.CurrentState = fundallocationstate;
                        //fundallocation.Save(database);

                        //保存项目绩效信息 
                        Performance performance = new Performance();
                        // performance.FundAllocation = fundallocation;
                        performance.Project = project;
                        performance.ArrivedPerformance = Convert.ToInt32(((decimal)(Fund.FundAlreadyIn) / Fund.FundPlanIn) * Convert.ToInt64(performancein));
                        performance.IsAllocated = false;
                        performance.IsCancel = false;
                        performance.FoundationTime = System.DateTime.Now;
                        performance.Remark = "系统升级时产生绩效";
                        performance.Save(database);

                        UpdateLog.AppendFormat("成功生成绩效记录：绩效记录的基本信息为： 已到达绩效为：{0}。", performance.ArrivedPerformance);
                    }

                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入发生错误，项目名称为{0}，错误信息为：{1}", project.Name, e.Message));
                }
            }

            UpdateLog.AppendFormat("成功更新论和导入项目信息{0}条\n", count);
            writer.WriteLine("成功更新项目{0}条。\n", count);
            writer.WriteLine();
            writer.WriteLine("此外：\n{0}", NoAllocation.ToString());
            writer.WriteLine();
            writer.WriteLine("对比数据信息为：\n{0}", Compare.ToString());
            writer.WriteLine();
            writer.WriteLine("详细信息为：\n{0}", UpdateLog.ToString());
            writer.WriteLine();

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();
            return logName;
        }
        private static string getVoucherNumber(Recovery recovery, IDatabase database)
        {

            return recovery.Project.Type.Rank.IsHorizontal ?
                 string.Format("H{0:D5}", database.SystemSettings.NewHorizontalVouherNumber()) :
                 string.Format("V{0:D5}", database.SystemSettings.NewVerticalVouherNumber());

        }

        /// <summary>
        /// 判断字符串是否是null或者Empty
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        private static bool IsEmptyOrNull(this string s)
        {
            if (s == null)
                return true;

            return string.IsNullOrEmpty(s.Trim());
        }
    }

}
