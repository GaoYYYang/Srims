using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;
using System.Threading;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Type;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

using Srims.Server.DataAccess;


namespace Srims.Server.DataExchange.ArtsImport
{
    public static class ArtsImport
    {
        static long changeToMoney = 1000000;

        static StringBuilder ArtsImportLog = new StringBuilder();
        static StringBuilder ProjectNameOrPrincipalNotMatchLog = new StringBuilder();
        static StringBuilder ProjectNameAndPrincipalNotOnlyOneMatchLog = new StringBuilder();
        static StringBuilder FinanceVoucherNumberOrReceivedDateNotMatchLog = new StringBuilder();
        static StringBuilder FinanceInformationNotOnlyOneMatchLog = new StringBuilder();
        static StringBuilder FundAllocationNotEnough = new StringBuilder();
        static StringBuilder ExpertNotFind = new StringBuilder();
        static StringBuilder ExpertNotOnlyOneMatch = new StringBuilder();

        static StringBuilder fundDescendNotOnlyOneMatchLog = new StringBuilder();
        static StringBuilder fundAllocationNotOnlyOneMatchLog = new StringBuilder();
        static StringBuilder importFundDescendId = new StringBuilder();
        static StringBuilder importFinaceFundDescendId = new StringBuilder();
        static StringBuilder importFundAllocationId = new StringBuilder();
        static StringBuilder importVocherId = new StringBuilder();

        static StringBuilder updateFundDescendId = new StringBuilder();
        static StringBuilder updateFinaceFundDescendId = new StringBuilder();
        static StringBuilder updateFundAllocationId = new StringBuilder();
        static StringBuilder updateVocherId = new StringBuilder();

        static int importFundDescendCount = 0;
        static int importFinaceFundDescendCount = 0;
        static int importFundAllocationCount = 0;
        static int importVoucherCount = 0;

        static int updateFundDescendCount = 0;
        static int updateFinaceFundDescendCount = 0;
        static int updateFundAllocationCount = 0;
        static int updateVoucherCount = 0;
        /// <summary>
        /// 导入文科项目数据
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string ImportArts(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {

            IDatabase database = Database.New();
            string logName = "ArtsImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();

            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Arts";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);


            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                string projectName = row[0].ToString().Trim().Length == 0 ? string.Empty : row[0].ToString().Trim();
                string projectPrincipal = row[1].ToString().Trim().Length == 0 ? string.Empty : row[1].ToString().Trim();
                DateTime projectFinanceDateTime = new DateTime();
                DateTime.TryParse(row[2].ToString().Trim(), out projectFinanceDateTime);
                string projectVoucherNumber = row[3].ToString().Trim().Length == 0 ? string.Empty : row[3].ToString().Trim();
                long projectAmount = row[4].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[4].ToString().Trim()) * changeToMoney);
                string projectInvoiceType = row[5].ToString().Trim().Length == 0 ? string.Empty : row[5].ToString().Trim();
                DateTime projectInvoiceTime = new DateTime();
                DateTime.TryParse(row[6].ToString().Trim(), out projectInvoiceTime);
                string projectInvoiceNumber = row[7].ToString().Trim().Length == 0 ? string.Empty : row[7].ToString().Trim();
                string descendDateTime = row[8].ToString().Trim();
                descendDateTime = descendDateTime.Insert(6, "/");
                descendDateTime = descendDateTime.Insert(4, "/");
                DateTime projectDescendDateTime = new DateTime();
                DateTime.TryParse(descendDateTime, out projectDescendDateTime);
                string projectAbstract = row[9].ToString().Trim().Length == 0 ? string.Empty : row[9].ToString().Trim();
                //expertPostLevel = row[10].ToString().Trim();
                long fundDescendAmount = row[11].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[11].ToString().Trim()) * changeToMoney);
                string VoucherNumber = row[12].ToString().Trim().Length == 0 ? string.Empty : row[12].ToString().Trim();
                string VoucherAccountBookNumber = row[13].ToString().Trim().Length == 0 ? string.Empty : row[13].ToString().Trim();
                long VoucherAllocationIn = row[14].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[14].ToString().Trim()) * changeToMoney);
                long VoucherOverheadExpensesIn = row[15].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[15].ToString().Trim()) * changeToMoney);
                long VoucherAllocationOut = row[16].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[16].ToString().Trim()) * changeToMoney);
                long VoucherOverheadExpensesOut = row[17].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[17].ToString().Trim()) * changeToMoney);
                long Hardware = row[18].ToString().Trim().Length == 0 ? 0 : Convert.ToInt64(Convert.ToDouble(row[18].ToString().Trim()) * changeToMoney);
                string FundMemberName = row[19].ToString().Trim().Length == 0 ? string.Empty : row[19].ToString().Trim();
                string FundMemberDepartment = row[20].ToString().Trim().Length == 0 ? string.Empty : row[20].ToString().Trim();
                string Remark = row[21].ToString().Trim().Length == 0 ? string.Empty : row[21].ToString().Trim();

                try
                {
                    //取得对应项目
                    Project project = getProject(database, projectName, projectPrincipal);
                    if (project == null)
                        continue;

                    //取得对应经费到账记录
                    Finance finance = getFinance(database, projectVoucherNumber, projectFinanceDateTime, projectAmount, projectAbstract);
                    if (finance == null)
                        continue;

                    //取得项目经费信息
                    ProjectInfo_Fund projectInfo_fund = project.Fund;

                    //取得或者新建经费下拨
                    FundDescend fundDescend = getFundDescend(database, projectInfo_fund, projectDescendDateTime, fundDescendAmount, fundDescendAmount);
                    if (fundDescend == null)
                        continue;

                    //取得或者新建经费下拨关联
                    FinanceFundDescend financeFundDescend = getFinanceFundDescend(database, finance, fundDescend, fundDescendAmount);


                    //取得或者新建经费分配
                    FundAllocation fundAllocation = getFundAllocation(database, fundDescend, VoucherAllocationIn, VoucherAllocationOut, Hardware, VoucherOverheadExpensesIn, VoucherOverheadExpensesOut);
                    if (fundAllocation == null)
                        continue;

                    buildVoucher(database, projectInfo_fund, fundAllocation, FundMemberName, VoucherNumber, VoucherAccountBookNumber, VoucherAllocationIn, VoucherAllocationOut, Hardware, VoucherOverheadExpensesIn, VoucherOverheadExpensesOut);


                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入文科数据出错，项目名称为：{0}，错误信息为：{1}\n", projectName, e.Message));
                }
            }

            writeLog(database, user, request);
            writeFile(database, writer);

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
        /// <summary>
        /// 根据项目名称和负责人取得对应的项目
        /// </summary>
        /// <param name="database"></param>
        /// <param name="projectName"></param>
        /// <param name="projectPrincipal"></param>
        /// <returns></returns>
        private static Project getProject(IDatabase database, string projectName, string projectPrincipal)
        {
            Expert expert = getExpertByName(database, projectPrincipal);
            if (expert == null)
                return null;

            IEnumerable<Int32> projectsID = (IEnumerable<Int32>)database.ProjectMemebers.Where(q => q.Expert == expert).Select(p => p.Project.ID).ToList();

            if (database.Projects.Where(q => q.Name == projectName && projectsID.Contains(q.ID)).ToList().Count() > 1)
            {
                ProjectNameAndPrincipalNotOnlyOneMatchLog.AppendFormat("项目名称和负责人不取得的项目不止一个，项目名称为：{0}，负责人为：{1}，\n", projectName, projectPrincipal);
                return null;
            }
            Project project = database.Projects.SingleOrDefault(q => q.Name == projectName && projectsID.Contains(q.ID));
            if (project == null)
                ProjectNameOrPrincipalNotMatchLog.AppendFormat("项目名称和负责人不一致，项目名称为：{0}，负责人为：{1}，\n", projectName, projectPrincipal);

            return project;

        }
        /// <summary>
        /// 根据经费到账信息取得经费到账记录
        /// </summary>
        /// <param name="database"></param>
        /// <param name="projectVoucherNumber"></param>
        /// <param name="projectFinanceDateTime"></param>
        /// <param name="projectAmount"></param>
        /// <param name="projectAbstract"></param>
        /// <returns></returns>
        private static Finance getFinance(IDatabase database, string projectVoucherNumber, DateTime projectFinanceDateTime, long projectAmount, string projectAbstract)
        {
            if (database.Finances.Where(q => q.VoucherNumber == projectVoucherNumber && q.ReceivedDate == Convert.ToDateTime(projectFinanceDateTime)).ToList().Count() > 1)
            {
                FinanceInformationNotOnlyOneMatchLog.AppendFormat("经费到账记录信息不止一条，凭单号为：{0},到款日期为:{1},到款金额为:{2},描述为：{3},\n", projectVoucherNumber, projectFinanceDateTime, projectAmount, projectAbstract);
                return null;
            }
            Finance finance = database.Finances.SingleOrDefault(q => q.VoucherNumber == projectVoucherNumber && q.ReceivedDate == Convert.ToDateTime(projectFinanceDateTime) && q.Amount == projectAmount && q.Abstract == projectAbstract);
            if (finance == null)
                FinanceVoucherNumberOrReceivedDateNotMatchLog.AppendFormat("经费到账记录信息不一致，凭单号为：{0},到款日期为:{1},到款金额为:{2},描述为：{3},\n", projectVoucherNumber, projectFinanceDateTime, projectAmount, projectAbstract);

            return finance;

        }
        /// <summary>
        /// 根据经费下拨信息取得或者新建经费下拨
        /// </summary>
        /// <param name="database"></param>
        /// <param name="projectInfo_fund"></param>
        /// <param name="projectDescendDateTime"></param>
        /// <param name="fundDescendAmount"></param>
        /// <param name="fundDescendAmounts"></param>
        /// <returns></returns>
        private static FundDescend getFundDescend(IDatabase database, ProjectInfo_Fund projectInfo_fund, DateTime projectDescendDateTime, long fundDescendAmount, long fundDescendAmounts)
        {
            if (database.FundDescends.Where(q => q.ProjectInfo_Fund == projectInfo_fund && q.DescendDateTime == projectDescendDateTime && q.Amount == fundDescendAmount && q.ReceivedAmount == fundDescendAmounts).ToList().Count() > 1)
            {
                fundDescendNotOnlyOneMatchLog.AppendFormat("经费下拨信息不止一条，请检查数据格式，项目名称为：{0}，负责人为：{1}，下拨日期为:{2},下拨金额为:{3},实到金额为：{5},\n", projectInfo_fund.Project.Name, projectInfo_fund.Project.Principal, projectDescendDateTime, fundDescendAmount, fundDescendAmounts);
                return null;
            }

            FundDescend fundDescend = database.FundDescends.SingleOrDefault(q => q.ProjectInfo_Fund == projectInfo_fund && q.DescendDateTime == projectDescendDateTime && q.Amount == fundDescendAmount && q.ReceivedAmount == fundDescendAmount);
            if (fundDescend == null)
                fundDescend = new FundDescend();

            if (fundDescend.IsNew)
            {
                fundDescend.ProjectInfo_Fund = projectInfo_fund;
                fundDescend.DescendDateTime = projectDescendDateTime;
                fundDescend.Amount = fundDescendAmount;
                fundDescend.ReceivedAmount = fundDescendAmount;
                fundDescend.Operator = "系统导入";
                fundDescend.Save(database);
                FundDescendStateHistory fundDescendStateHistory = new FundDescendStateHistory();
                fundDescendStateHistory.Operator = "系统导入";
                fundDescendStateHistory.DateTime = DateTime.Now;
                fundDescendStateHistory.FundDescend = fundDescend;
                fundDescendStateHistory.Save(database);
                fundDescend.CurrentState = fundDescendStateHistory;

                importFundDescendId.AppendFormat("{0}；", fundDescend.ID);
                importFundDescendCount++;
            }
            else
            {
                updateFundDescendId.AppendFormat("{0}；", fundDescend.ID);
                updateFundDescendCount++;
            }

            return fundDescend;
        }
        /// <summary>
        /// 取得经费下拨关联
        /// </summary>
        /// <param name="database"></param>
        /// <param name="finance"></param>
        /// <param name="fundDescend"></param>
        /// <param name="fundDescendAmount"></param>
        /// <returns></returns>
        private static FinanceFundDescend getFinanceFundDescend(IDatabase database, Finance finance, FundDescend fundDescend, long fundDescendAmount)
        {
            FinanceFundDescend financeFundDescend = database.FinanceFundDescends.SingleOrDefault(p => p.Finance == finance && p.FundDescend == fundDescend && p.Amount == fundDescendAmount);
            if (financeFundDescend == null)
                financeFundDescend = new FinanceFundDescend();

            if (financeFundDescend.IsNew)
            {
                financeFundDescend.Finance = finance;
                financeFundDescend.FundDescend = fundDescend;
                financeFundDescend.Amount = fundDescendAmount;
                financeFundDescend.IsReturn = false;
                financeFundDescend.OperateDateTime = DateTime.Now;
                financeFundDescend.Operator = "系统导入";
                financeFundDescend.Save(database);

                importFinaceFundDescendId.AppendFormat("{0}；", financeFundDescend.ID);
                importFinaceFundDescendCount++;
            }
            else
            {
                updateFinaceFundDescendId.AppendFormat("{0}；", financeFundDescend.ID);
                updateFinaceFundDescendCount++;
            }

            return financeFundDescend;
        }
        /// <summary>
        /// 取得符合经费分配的条数
        /// </summary>
        /// <param name="database"></param>
        /// <param name="fundDescend"></param>
        /// <returns></returns>
        private static int getFundAllocationMathCount(IDatabase database, FundDescend fundDescend)
        {
            return database.FundAllocations.Where(q => q.FundDescend == fundDescend).ToList().Count();
        }
        /// <summary>
        /// 取得经费分配
        /// </summary>
        /// <param name="database"></param>
        /// <param name="fundDescend"></param>
        /// <param name="VoucherAllocationIn"></param>
        /// <param name="VoucherAllocationOut"></param>
        /// <param name="Hardware"></param>
        /// <param name="VoucherOverheadExpensesIn"></param>
        /// <param name="VoucherOverheadExpensesOut"></param>
        /// <returns></returns>
        private static FundAllocation getFundAllocation(IDatabase database, FundDescend fundDescend, long VoucherAllocationIn, long VoucherAllocationOut, long Hardware, long VoucherOverheadExpensesIn, long VoucherOverheadExpensesOut)
        {
            if (database.FundAllocations.Where(q => q.FundDescend == fundDescend).ToList().Count() > 1)
            {
                FundAllocationNotEnough.AppendFormat("经费分配信息不止一条，请检查数据格式，项目名称为：{0}，负责人为：{1}，校内分配：{2},校外分配:{3},硬件费:{4},\n", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ProjectInfo_Fund.Project.Principal, VoucherAllocationIn, VoucherAllocationOut, Hardware);
                return null;
            }

            FundAllocation fundAllocation = database.FundAllocations.SingleOrDefault(q => q.FundDescend == fundDescend);
            if (fundAllocation == null)
                fundAllocation = new FundAllocation();

            if (fundAllocation.IsNew)
            {
                fundAllocation.FundDescend = fundDescend;
                fundAllocation.AllocationIn = VoucherAllocationIn;
                fundAllocation.AllocationOut = VoucherAllocationOut;
                fundAllocation.AllocationHardware = Hardware;
                fundAllocation.OverheadExpensesIn = VoucherOverheadExpensesIn;
                fundAllocation.OverheadExpensesOut = VoucherOverheadExpensesOut;
                fundAllocation.Save(database);
                FundAllocationStateHistory fundAllocationStateHistory = new FundAllocationStateHistory();
                fundAllocationStateHistory.Operator = "系统导入";
                fundAllocationStateHistory.DateTime = DateTime.Now;
                fundAllocationStateHistory.FundAllocation = fundAllocation;
                fundAllocationStateHistory.Save(database);
                fundAllocation.CurrentState = fundAllocationStateHistory;

                importFundAllocationId.AppendFormat("{0}；", fundAllocation.ID);
                importFundAllocationCount++;
            }
            else
            {
                updateFundAllocationId.AppendFormat("{0}；", fundAllocation.ID);
                updateFundAllocationCount++;
            }
            return fundAllocation;
        }
        /// <summary>
        /// 更新经费下拨和经费分配的状态
        /// </summary>
        /// <param name="database"></param>
        /// <param name="fundAllocation"></param>
        /// <returns></returns>
        private static bool updateDescendAndAllocationState(IDatabase database, FundAllocation fundAllocation, long Hardware, long VoucherAllocationIn, long VoucherAllocationOut)
        {
            long hasAllocation = fundAllocation.AllocationHardware + fundAllocation.AllocationIn + fundAllocation.AllocationOut;
            long planAllocation = Hardware + VoucherAllocationIn + VoucherAllocationOut;
            if (fundAllocation.FundDescend.Amount < hasAllocation + planAllocation)
            {
                fundAllocation.CurrentState.State = FundAllocationState.UnSubmit;
                fundAllocation.FundDescend.CurrentState.State = FundDescendState.Passed;
            }
            if (fundAllocation.FundDescend.Amount == hasAllocation + planAllocation)
            {
                fundAllocation.CurrentState.State = FundAllocationState.Passed;
                fundAllocation.FundDescend.CurrentState.State = FundDescendState.AllocationCompleted;
            }
            if (fundAllocation.FundDescend.Amount > hasAllocation + planAllocation)
            {
                FundAllocationNotEnough.AppendFormat("下拨经费中剩余的不足需要分配的金额,项目名称为：{0},负责人为：{1},下拨经费ID为：{2},经费分配ID为：{3}\n", fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, fundAllocation.FundDescend.ProjectInfo_Fund.Project.Principal, fundAllocation.FundDescend.ID, fundAllocation.ID);
                return false;
            }

            fundAllocation.FundDescend.Save(database);
            fundAllocation.Save(database);
            return true;
        }
        /// <summary>
        /// 写日志到系统里
        /// </summary>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="request"></param>
        private static void writeLog(IDatabase database, User user, HttpRequest request)
        {
            ArtsImportLog.AppendFormat("成功导入经费下拨{0}个，经费下拨关联{1}个,经费分配{2}个,经费凭单{3}个。\n", importFundDescendCount, importFinaceFundDescendCount, importFundAllocationCount, importVoucherCount);
            ArtsImportLog.AppendFormat("添加经费下拨ID为：\n{0}", importFundDescendId.ToString());
            ArtsImportLog.AppendFormat("添加经费下拨关联ID为：\n{0}", importFinaceFundDescendId.ToString());
            ArtsImportLog.AppendFormat("添加经费分配ID为：\n{0}", importFundAllocationId.ToString());
            ArtsImportLog.AppendFormat("添加经费凭单号号为：\n{0}", importVocherId.ToString());
            ArtsImportLog.AppendFormat("经费分配金额不足：\n{0}", FundAllocationNotEnough.ToString());
            ArtsImportLog.AppendFormat("更新经费下拨{0}个，更新经费分配{1}个，更新经费分配{2}个，更新经费凭单{3}个\n", updateFundDescendCount, updateFinaceFundDescendCount, updateFundAllocationCount, updateVoucherCount);
            ArtsImportLog.AppendFormat("更新经费下拨ID为：\n{0}", updateFundDescendId.ToString());
            ArtsImportLog.AppendFormat("更新经费下拨关联ID为：\n{0}", updateFinaceFundDescendId.ToString());
            ArtsImportLog.AppendFormat("更新经费分配ID为：\n{0}", updateFundAllocationId.ToString());
            ArtsImportLog.AppendFormat("更新经费凭单号号为：\n{0}", updateVocherId.ToString());
            ArtsImportLog.AppendFormat("以下项目对应的项目名称和负责人不匹配，请检查写法是否规范。\n{0}", ProjectNameOrPrincipalNotMatchLog.ToString());
            ArtsImportLog.AppendFormat("以下经费关联的信息部匹配，请检查写法是否规范。\n{0}", FinanceVoucherNumberOrReceivedDateNotMatchLog.ToString());
            ArtsImportLog.AppendFormat("以下项目信息匹配结果不止一项，请检查是否规范。\n{0}", ProjectNameAndPrincipalNotOnlyOneMatchLog.ToString());
            ArtsImportLog.AppendFormat("以下经费信息匹配结果不止一项，请检查是否规范。\n{0}", FinanceInformationNotOnlyOneMatchLog.ToString());
            ArtsImportLog.AppendFormat("以下经费下拨信息匹配结果不止一项，请检查是否规范。\n{0}", fundDescendNotOnlyOneMatchLog.ToString());
            ArtsImportLog.AppendFormat("以下经费分配信息匹配结果不止一项，请检查是否规范。\n{0}", fundAllocationNotOnlyOneMatchLog.ToString());
            ArtsImportLog.AppendFormat("以下经费成员信息匹配结果不止一项，请检查是否规范。\n{0}", ExpertNotOnlyOneMatch.ToString());

            Log.Write(user.Name, (int)(LogType.ArtsImport), ArtsImportLog.ToString(), request.UserHostAddress, "文科项目经费导入", database);
        }
        /// <summary>
        /// 写日志到文件
        /// </summary>
        /// <param name="database"></param>
        /// <param name="writer"></param>
        private static void writeFile(IDatabase database, StreamWriter writer)
        {
            writer.WriteLine("成功导入经费下拨{0}个，经费下拨关联{1}个,经费分配{2}个,经费凭单{3}个。\n\n\n", importFundDescendCount, importFinaceFundDescendCount, importFundAllocationCount, importVoucherCount);
            writer.WriteLine("添加经费下拨ID为：\n{0}\n\n\n", importFundDescendId.ToString());
            writer.WriteLine("添加经费下拨关联ID为：\n{0}\n\n\n", importFinaceFundDescendId.ToString());
            writer.WriteLine("添加经费分配ID为：\n{0}\n\n\n", importFundAllocationId.ToString());
            writer.WriteLine("添加经费凭单号号为：\n{0}\n\n\n", importVocherId.ToString());
            writer.WriteLine("经费分配金额不足：\n{0}\n\n\n", FundAllocationNotEnough.ToString());
            writer.WriteLine("更新经费下拨{0}个，更新经费关联{1}个，更新经费分配{2}个，更新经费凭单{3}个\n\n\n\n", updateFundDescendCount, updateFinaceFundDescendCount, updateFundAllocationCount, updateVoucherCount);
            writer.WriteLine("更新经费下拨ID为：\n{0}\n\n\n", updateFundDescendId.ToString());
            writer.WriteLine("更新经费下拨关联ID为：\n{0}\n\n\n", updateFinaceFundDescendId.ToString());
            writer.WriteLine("更新经费分配ID为：\n{0}\n\n\n", updateFundAllocationId.ToString());
            writer.WriteLine("更新经费凭单号号为：\n{0}\n\n\n", updateVocherId.ToString());
            writer.WriteLine("以下项目对应的项目名称和负责人不匹配，请检查写法是否规范。\n{0}\n\n\n", ProjectNameOrPrincipalNotMatchLog.ToString());
            writer.WriteLine("以下经费关联的信息部匹配，请检查写法是否规范。\n{0}\n\n\n", FinanceVoucherNumberOrReceivedDateNotMatchLog.ToString());
            writer.WriteLine("以下项目信息匹配结果不止一项，请检查是否规范。\n{0}\n\n\n", ProjectNameAndPrincipalNotOnlyOneMatchLog.ToString());
            writer.WriteLine("以下经费信息匹配结果不止一项，请检查是否规范。\n{0}\n\n\n", FinanceInformationNotOnlyOneMatchLog.ToString());
            writer.WriteLine("以下经费下拨信息匹配结果不止一项，请检查是否规范。\n{0}\n\n\n", fundDescendNotOnlyOneMatchLog.ToString());
            writer.WriteLine("以下经费分配信息匹配结果不止一项，请检查是否规范。\n{0}\n\n\n", fundAllocationNotOnlyOneMatchLog.ToString());
            writer.WriteLine("以下经费成员信息匹配结果不止一项，请检查是否规范。\n{0}\n\n\n", ExpertNotOnlyOneMatch.ToString());
        }
        /// <summary>
        /// 建立凭单
        /// </summary>
        /// <param name="database"></param>
        /// <param name="projectInfo_fund"></param>
        /// <param name="fundAllocation"></param>
        private static bool buildVoucher(IDatabase database, ProjectInfo_Fund projectInfo_fund, FundAllocation fundAllocation, string FundMemberName, string VoucherNumber, string VoucherAccountBookNumber
            , long VoucherAllocationIn, long VoucherAllocationOut, long Hardware, long VoucherOverheadExpensesIn, long VoucherOverheadExpensesOut)
        {
            //取得或者建立经费凭单
            Voucher voucher = database.Vouchers.SingleOrDefault(q => q.FundAllocation == fundAllocation && q.FundMember.Expert.Name == FundMemberName
                && q.VoucherNumber == VoucherNumber
                && q.AccountBookNumber == VoucherAccountBookNumber
                && q.AllocationIn == VoucherAllocationIn
                && q.AllocationOut == VoucherAllocationOut
                && q.AllocationHardware == Hardware
                && q.OverheadExpensesIn == VoucherOverheadExpensesIn
                && q.OverheadExpensesOut == VoucherOverheadExpensesOut
                );
            if (voucher != null)
            {
                updateVocherId.AppendFormat("{0}；", voucher.ID);
                updateVoucherCount++;
                return true;
            }

            // 取得经费成员
            FundMember fundMember = getFundMember(database, projectInfo_fund, VoucherAccountBookNumber, FundMemberName);
            if (fundMember == null)
                return false;
            //更新经费下拨和经费分配的状态
            if (!updateDescendAndAllocationState(database, fundAllocation, Hardware, VoucherAllocationIn, VoucherAllocationOut))
                return false;

            voucher = new Voucher();
            voucher.FundAllocation = fundAllocation;
            voucher.FundMember = fundMember;
            voucher.VoucherNumber = VoucherNumber;
            voucher.AccountBookNumber = VoucherAccountBookNumber;
            voucher.AllocationIn = VoucherAllocationIn;
            voucher.AllocationOut = VoucherAllocationOut;
            voucher.AllocationHardware = Hardware;
            voucher.OverheadExpensesIn = VoucherOverheadExpensesIn;
            voucher.OverheadExpensesOut = VoucherOverheadExpensesOut;
            voucher.IsRead = true;
            voucher.FinanceNumber = null;
            voucher.FinanceAllocateDateTime = DateTime.Now;

            voucher.Save(database);

            VoucherStateHistory voucherStateHistory = new VoucherStateHistory();
            voucherStateHistory.State = VoucherState.Allocated;
            voucherStateHistory.Operator = "系统导入";
            voucherStateHistory.DateTime = DateTime.Now;
            voucherStateHistory.Voucher = voucher;
            voucherStateHistory.Save(database);

            importVoucherCount++;
            importVocherId.AppendFormat("添加经费凭单号为：{0},账本号为:{1}，凭单ID为：{2}。\n", voucher.VoucherNumber, voucher.AccountBookNumber, voucher.ID);
            return true;

        }
        /// <summary>
        /// 取得经费成员
        /// </summary>
        /// <param name="database"></param>
        /// <param name="projectInfo_fund"></param>
        /// <returns></returns>
        private static FundMember getFundMember(IDatabase database, ProjectInfo_Fund projectInfo_fund, string VoucherAccountBookNumber, string FundMemberName)
        {
            //取得经费成员
            FundMember fundMember = new FundMember();
            fundMember.ProjectInfo_Fund = projectInfo_fund;
            fundMember.AccountBookNumber = VoucherAccountBookNumber;
            if (database.Experts.Where(q => q.Name == FundMemberName).ToList().Count() > 1)
            {
                ExpertNotOnlyOneMatch.AppendFormat("经费成员姓名不止一个，项目名称：{0}，负责人为：{1}，经费成员为：{2}\n", projectInfo_fund.Project.Name, projectInfo_fund.Project.Principal, FundMemberName);
                return null;

            }
            fundMember.Expert = database.Experts.SingleOrDefault(q => q.Name == FundMemberName);
            if (fundMember.Expert == null)
            {
                ExpertNotFind.AppendFormat("经费成员没找到，项目名称{为：0}，负责人为：{1}，经费成员为：{2}\n", projectInfo_fund.Project.Name, projectInfo_fund.Project.Principal, FundMemberName);
                return null;
            }

            fundMember.Save(database);
            return fundMember;
        }
        /// <summary>
        /// 根据专家姓名找到专家
        /// </summary>
        /// <param name="database"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        private static Expert getExpertByName(IDatabase database, string name)
        {
            if (database.Experts.Where(q => q.Name == name).ToList().Count() > 1)
            {
                ExpertNotOnlyOneMatch.AppendFormat("专家姓名不止一个，负责人为：{0}\n", name);
                return null;

            }
            Expert expert = database.Experts.SingleOrDefault(q => q.Name == name);
            if (expert == null)
            {
                ExpertNotFind.AppendFormat("专家姓名没找到，负责人为：{0}，\n", name);
                return null;
            }
            return expert;

        }
    }

}
