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

namespace Srims.Server.DataExchange.RecoveryImport
{
    public static class RecoveryImport
    {
        public static string ImportRecovery(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);
            string fileName = "DateUpdate";
            StringBuilder UpdateLog = new StringBuilder();
            int RecoveryCount = 0, PerformanceCount = 0;
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);
            database = Database.New();
            //作废已存在的调整单
            //cancelRecovery(user, database);

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {

                try
                {
                    //项目名称
                    var projectName = row[1].ToString().Trim();

                    //项目负责人名称
                    var princepalName = row[4].ToString().Trim();

                    //项目开始时间
                    var startdate = row[6].ToString().Trim();
                    //调整后应收取内间接费用

                    double newCost = Convert.ToDouble(row[18].ToString().Trim());

                    //调整前已收校内间接费用

                    double oldCost = Convert.ToDouble(row[19].ToString().Trim());

                    //调整前已发放的绩效总额

                    double oldPerformance = Convert.ToDouble(row[20].ToString().Trim());
                    //
                    //调整后应发放的绩效总额

                    double newPerformance = Convert.ToDouble(row[21].ToString().Trim());

                    //已分配校内分配

                    double fundAlreadyIn = Convert.ToDouble(row[12].ToString().Trim());




                    var projects = database.Projects.Where(c => c.Name == projectName && c.CurrentState.State != ProjectState.Deleted && c.CurrentState.State != ProjectState.Terminate && c.CurrentState.State != ProjectState.WithDraw && c.Principal.Name == princepalName).OrderByDescending(c => c.ID);
                    var project = new Project();
                    if (projects.Count() > 1)
                    {
                        project = projects.SingleOrDefault(c => c.StartDate == Convert.ToDateTime(startdate));
                    }
                    else
                    {
                        project = projects.SingleOrDefault();
                    }
                    if (project == null)
                    {
                        writer.WriteLine("系统中不存在名为《{0}》的的项目。跳过该项目。\n", projectName);
                    }
                    else
                    {
                        Recovery recovery = new Recovery();
                        recovery.Project = project;
                        recovery.VoucherNumber = getVoucherNumber(recovery, database);
                        recovery.CurrentAllocationIn = Convert.ToInt64(fundAlreadyIn);

                        recovery.ReceivedOverheadExpensesIn = Convert.ToInt64(oldCost - oldPerformance);
                        recovery.PlanedOverheadExpensesIn = Convert.ToInt64(newCost - newPerformance);
                        recovery.ReceivedPerformancePay = Convert.ToInt64(oldPerformance);
                        recovery.PlanedPerformancePay = Convert.ToInt64(newPerformance);

                        recovery.OperateTime = System.DateTime.Now;
                        recovery.Operator = user.Name;
                        recovery.IsPrint = false;
                        recovery.IsCanceled = false;
                        if (recovery.PlanedOverheadExpensesIn != recovery.ReceivedOverheadExpensesIn || recovery.PlanedPerformancePay != recovery.ReceivedPerformancePay)
                        {
                            recovery.Save(database);
                            UpdateLog.AppendFormat("成功生成调整单：对应项目为：《{0}》。\n", projectName);
                            RecoveryCount++;
                        }

                        if (recovery.PlanedPerformancePay - recovery.ReceivedPerformancePay > 0)
                        {
                            Srims.Server.Business.Performances.Performance performence = new Srims.Server.Business.Performances.Performance();
                            performence.ArrivedPerformance = (recovery.PlanedPerformancePay == null ? 0 : recovery.PlanedPerformancePay.Value) - (recovery.ReceivedPerformancePay == null ? 0 : recovery.ReceivedPerformancePay.Value);
                            performence.DescendPerformance = 0;
                            performence.Project = project;
                            performence.Recovery = recovery;
                            performence.IsAllocated = false;
                            performence.FoundationTime = System.DateTime.Now;
                            performence.Remark = "系统间接费用调整时产生";
                            performence.IsCancel = false;
                            performence.Save(database);
                            UpdateLog.AppendFormat("同时为该项目生成绩效暂存。\n");
                            PerformanceCount++;
                        }
                    }

                }

                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入发生错误，项目名称为{0}，错误信息为：{1}", e.Message));
                }
            }

            writer.WriteLine("成功生成调整单{0}条，绩效暂存{1}条。\n", RecoveryCount, PerformanceCount);
            writer.WriteLine("详细信息为：\n{0}", UpdateLog.ToString());
            writer.WriteLine();
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

        /// <summary>
        /// 作废已存在的调整单
        /// </summary>
        /// <param name="recovery"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        private static void cancelRecovery(User user, IDatabase database)
        {
            var recoverys = database.Recovery.ToList();
            foreach (var re in recoverys)
            {
                re.Cancel(user, database);
            }

        }
    }

}
