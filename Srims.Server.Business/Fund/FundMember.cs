using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Performances;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目经费成员
    /// </summary>
    public partial class FundMember : Entity<FundMember>
    {
        /// <summary>
        /// 取得该经费成员对应的该项目的凭单数量
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int GetVouchersCount(IQueryable<Voucher> query)
        {
            return query.Count(q => q.FundMemberID == _ID && q.FundAllocation.FundDescend.ProjectInfo_Fund == this.ProjectInfo_Fund && q.CurrentState.State != VoucherState.Canceled);
        }
        /// <summary>
        /// 取得该经费成员对应的该项目的凭单数量
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int GetPerformanceVouchersCount(IQueryable<PerformanceVoucher> query)
        {
            return query.Count(q => q.FundMemberID == _ID && q.PerformanceAllocation.Performance.Project == this.ProjectInfo_Fund.Project && q.CurrentState.State != PerformanceVoucherState.Canceled);
        }
        /// <summary>
        /// 取得经费成员某一账本号对应的所有凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Voucher> GetVouchers(IQueryable<Voucher> query)
        {
            return query.Where(q => q.FundMemberID == _ID).ToList();
        }
    }

    /// <summary>
    /// 项目经费成员的业务扩展
    /// </summary>
    public static class FundMemberBusinessExtension
    {
        /// <summary>
        /// 取得经费分配纠错时的经费成员（指定账本号，不参与账本号规则）
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectInfo_Fund"></param>
        /// <param name="expert"></param>
        /// <param name="accountBookNumber"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static FundMember GetCorrect(this IQueryable<FundMember> query, ProjectInfo_Fund projectInfo_Fund, Expert expert, string accountBookNumber, IDatabase database)
        {
            FundMember fundMember = query.GetByProjectAndExpert(projectInfo_Fund.Project.ID, expert.ID);
            if (fundMember == null)
                fundMember = new FundMember();

            fundMember.Expert = expert;
            fundMember.ProjectInfo_Fund = projectInfo_Fund;
            fundMember.AccountBookNumber = accountBookNumber;

            fundMember.Save(database);
            ////所有项目中，有实际分配经费的人员，如果在‘项目成员’中没有的，系统自动添加到‘项目成员’中，位次按照分配经费先后顺序，从999开始排序号，依次递减。
            //if (!database.ProjectMemebers.Any(c => c.Expert == expert && c.Project == projectInfo_Fund.Project))
            //{
            //    int i;
            //    //获取最小位次
            //    var smallorder = database.ProjectMemebers.Where(c => c.Project == projectInfo_Fund.Project && c.Order > 500).ToList();
            //    if (smallorder.Count == 0)
            //    {
            //        i = 999;
            //    }
            //    else
            //    {
            //        i = smallorder.Min(c => c.Order);
            //        i--;
            //    }
            //    ProjectMember member = new ProjectMember();
            //    member.Project = projectInfo_Fund.Project;
            //    member.Expert = expert;
            //    member.Order = i;
            //    member.Save(database);

            //}
            return fundMember;
        }
        /// <summary>
        /// 取得项目经费成员
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <param name="projectInfo_Fund"></param>
        /// <param name="expert"></param>
        /// <param name="isExpertSecondCollege"></param>
        /// <param name="database"></param>
        /// <param name="isPerformance"></param>
        /// <returns></returns>
        public static FundMember Get(this IEntityDataAccess<FundMember> dataAccess, ProjectInfo_Fund projectInfo_Fund, Expert expert, Boolean isExpertSecondCollege, IDatabase database, bool isPerformance)
        {
            FundMember fundMember = null;

            if (isPerformance)
            {
                fundMember = dataAccess.SingleOrDefault(fm => fm.ProjectInfo_FundID == projectInfo_Fund.ID && fm.ExpertID == expert.ID && fm.AccountBookNumber.Substring(5, 1) == "9");
            }
            else
            {
                fundMember = dataAccess.SingleOrDefault(fm => fm.ProjectInfo_FundID == projectInfo_Fund.ID && fm.ExpertID == expert.ID && fm.AccountBookNumber.Substring(5, 1) != "9");
            }

            //已经是项目的经费成员
            if (fundMember != null)
                fundMember = getExistFundMember(dataAccess, projectInfo_Fund, expert, database, fundMember, isPerformance);
            else
                fundMember = getNewFundMember(dataAccess, projectInfo_Fund, expert, isExpertSecondCollege, database, isPerformance);

            return fundMember;
        }
        public static FundMember Get(this IEntityDataAccess<FundMember> dataAccess, ProjectInfo_Fund projectInfo_Fund, Expert expert, Boolean isExpertSecondCollege, IDatabase database)
        {
            return Get(dataAccess, projectInfo_Fund, expert, isExpertSecondCollege, database, false);
        }
        private static FundMember getExistFundMember(IEntityDataAccess<FundMember> dataAccess, ProjectInfo_Fund projectInfo_Fund, Expert expert, IDatabase database, FundMember fundMember, bool isPerformance)
        {
            //当经费成员的账本号为空时重新生成账本号
            if (string.IsNullOrEmpty(fundMember.AccountBookNumber))
                fundMember.AccountBookNumber = getAccountBookNumber(dataAccess, projectInfo_Fund, expert, fundMember.IsExpertSecondCollege.Value, database, isPerformance);

            if (isPerformance)//如果进行绩效分配存在的经费成员账本号第6位不是9（即为经费分配的账本号），则需要重新生成新的经费成员来对应绩效分配
            {
                if (fundMember.AccountBookNumber.Substring(5, 1) != "9")//绩效
                    return getNewFundMember(dataAccess, projectInfo_Fund, expert, fundMember.IsExpertSecondCollege.Value, database, isPerformance);
            }
            else//如果进行经费分配存在的经费成员账本号第6位是9（即为绩效分配的账本号），则需要重新生成新的经费成员来对应经费分配
                if (fundMember.AccountBookNumber.Substring(5, 1) == "9")
                    return getNewFundMember(dataAccess, projectInfo_Fund, expert, fundMember.IsExpertSecondCollege.Value, database, isPerformance);

            return fundMember;
        }
        private static FundMember getNewFundMember(IEntityDataAccess<FundMember> dataAccess, ProjectInfo_Fund projectInfo_Fund, Expert expert, Boolean isExpertSecondCollege, IDatabase database, bool isPerformance)
        {
            string accountBookNumber = getAccountBookNumber(dataAccess, projectInfo_Fund, expert, isExpertSecondCollege, database, isPerformance);

            FundMember fundMember = new FundMember
            {
                AccountBookNumber = accountBookNumber,
                Expert = expert,
                ProjectInfo_Fund = projectInfo_Fund,
                IsExpertSecondCollege = isExpertSecondCollege,

            };

            fundMember.Save(dataAccess.Database);
            projectInfo_Fund.Save(dataAccess.Database);

            return fundMember;
        }
        private static string getAccountBookNumber(IEntityDataAccess<FundMember> dataAccess, ProjectInfo_Fund projectInfo_Fund, Expert expert, Boolean isExpertSecondCollege, IDatabase database, bool isPerformance)
        {
            string accountBookNumber = null;
            ////横向项目且同年单号，同类型今年已有账本号,且到校经费40万之内,则使用该账本号
            if (projectInfo_Fund.Project.Type.Rank.IsHorizontal && projectInfo_Fund.Project.Type.Type.IsExploit && projectInfo_Fund.FundTotal < 40000000)
                accountBookNumber = getExistAccountBookNumber(dataAccess, projectInfo_Fund, expert, isPerformance);

            if (string.IsNullOrEmpty(accountBookNumber))
                accountBookNumber = getNewAccountBookNumber(projectInfo_Fund, expert, isExpertSecondCollege, database, isPerformance);

            return accountBookNumber;
        }
        private static string getExistAccountBookNumber(IEntityDataAccess<FundMember> dataAccess, ProjectInfo_Fund projectInfo_Fund, Expert expert, bool isPerformance)
        {
            string accountBookNumber = null;
            //查找同类型今年是否已分配经费
            var fundMembers = dataAccess.Where(fm => fm.ExpertID == expert.ID && fm.ProjectInfo_Fund.FundTotal < 40000000).OrderBy(c => c.ID).ToList();
            var matchNumber = String.Format("91{0}{1}", DateTime.Now.Year.ToString().Substring(2, 2), projectInfo_Fund.Project.Type.Type.Code);
            foreach (var fm in fundMembers)
            {
                if (!string.IsNullOrEmpty(fm.AccountBookNumber) && fm.AccountBookNumber.Length == 13 && fm.AccountBookNumber.Substring(4, 6) == matchNumber)
                {
                    accountBookNumber = fm.AccountBookNumber;
                    break;
                }
            }

            return accountBookNumber;
        }
        private static string getNewAccountBookNumber(ProjectInfo_Fund projectInfo_Fund, Expert expert, Boolean isExpertSecondCollege, IDatabase database, bool isPerformance)
        {
            var type = projectInfo_Fund.Project.Type.Type;

            if (expert.College == null || expert.College.Code == null || type == null || string.IsNullOrEmpty(type.Code))
                return String.Empty;

            //一到四位是学院代码
            string oneToFour = isExpertSecondCollege ? expert.College2.Code : expert.College.Code;
            //第五位为9
            string five = "9";

            string sixToThirteen;
            //获取横向项目同年单账本号且40万之内的项目的六到十三位
            if (projectInfo_Fund.Project.Type.Rank.IsHorizontal && projectInfo_Fund.Project.Type.Type.IsExploit && projectInfo_Fund.FundTotal < 40000000)
                sixToThirteen = getHorizonalAccountBookNumberSixToThirteen(projectInfo_Fund, expert, database, isPerformance);
            //获取横向项目同年单账本号且40万之外的项目的六到十三位
            else if (projectInfo_Fund.Project.Type.Rank.IsHorizontal && projectInfo_Fund.Project.Type.Type.IsExploit && projectInfo_Fund.FundTotal >= 40000000)
                sixToThirteen = getVerticalOrExploitAccountBooNumberSixToThirteen(projectInfo_Fund, expert, database, isPerformance, true);
            //获取其他项目的六到十三位（非同年单账本号的项目）
            else
                sixToThirteen = getVerticalOrExploitAccountBooNumberSixToThirteen(projectInfo_Fund, expert, database, isPerformance, false);

            if (string.IsNullOrEmpty(sixToThirteen))
                return string.Empty;

            string accountBookNumber = oneToFour + five + sixToThirteen;

            if (IsAccountBookNumberRepeat(database.FundMembers, accountBookNumber, projectInfo_Fund, expert))
                throw new Exception(string.Format("账本号:{0}出现重复，请找技术人员处理", accountBookNumber));

            return accountBookNumber;
        }
        //获取除横向项目同年单账本号且40万之内的项目之外的项目的六到十三位
        private static string getVerticalOrExploitAccountBooNumberSixToThirteen(ProjectInfo_Fund projectInfo_Fund, Expert expert, IDatabase database, bool isPerformance, bool isExploitAnd40000000)
        {
            //取得第六到十二位
            string sixToTwelve = isPerformance ? projectInfo_Fund.GetPerformanceAccountBookNumber(database, isExploitAnd40000000) : projectInfo_Fund.GetAccountbookNumber(database, isExploitAnd40000000);
            if (string.IsNullOrEmpty(sixToTwelve))
                return string.Empty;

            //以下为计算第十三位的代码。即该项目专家序号，当大于9个时以字母区分。
            bool isZeroBeAllocated = false;
            var fundMembers = database.FundMembers.Where(fm => fm.ProjectInfo_FundID == projectInfo_Fund.ID).ToList();
            foreach (var fundMember in fundMembers)
                if (!string.IsNullOrEmpty(fundMember.AccountBookNumber) && fundMember.AccountBookNumber.Length == 13 && fundMember.AccountBookNumber[12].ToString() == "0")
                    isZeroBeAllocated = true;
            
            string thirteen;
            //当专家为项目的负责人时，末位为0
            if (projectInfo_Fund.Project.PrincipalID == expert.ID)
            {
                if (isZeroBeAllocated)
                {
                    if (isPerformance)
                    {
                        thirteen = projectInfo_Fund.PerformanceAccountBookNumberCount > 9 ? (Convert.ToChar('A' + (projectInfo_Fund.PerformanceAccountBookNumberCount - 10))).ToString() : projectInfo_Fund.PerformanceAccountBookNumberCount.ToString();
                        projectInfo_Fund.PerformanceAccountBookNumberCount++;
                    }
                    else
                    {
                        thirteen = projectInfo_Fund.AccountBookNumberCount > 9 ? (Convert.ToChar('A' + (projectInfo_Fund.AccountBookNumberCount - 10))).ToString() : projectInfo_Fund.AccountBookNumberCount.ToString();
                        projectInfo_Fund.AccountBookNumberCount++;
                    }
                }
                else
                {
                    thirteen = "0";
                }
            }
            else
            {
                if (isPerformance)
                    if (projectInfo_Fund.PerformanceAccountBookNumberCount == 0)
                    {
                        thirteen = "1";
                        projectInfo_Fund.PerformanceAccountBookNumberCount = 2;
                    }
                    else
                    {
                        thirteen = projectInfo_Fund.PerformanceAccountBookNumberCount > 9 ? (Convert.ToChar('A' + (projectInfo_Fund.PerformanceAccountBookNumberCount - 10))).ToString() : projectInfo_Fund.PerformanceAccountBookNumberCount.ToString();
                        projectInfo_Fund.PerformanceAccountBookNumberCount++;
                    }
                else
                    if (projectInfo_Fund.AccountBookNumberCount == 0)
                    {
                        thirteen = "1";
                        projectInfo_Fund.AccountBookNumberCount = 2;
                    }
                    else
                    {
                        thirteen = projectInfo_Fund.AccountBookNumberCount > 9 ? (Convert.ToChar('A' + (projectInfo_Fund.AccountBookNumberCount - 10))).ToString() : projectInfo_Fund.AccountBookNumberCount.ToString();
                        projectInfo_Fund.AccountBookNumberCount++;
                    }
            }
            return sixToTwelve + thirteen;
        }
        //获取横向项目同年单账本号且40万之内的项目的六到十三位6到13位
        private static string getHorizonalAccountBookNumberSixToThirteen(ProjectInfo_Fund projectInfo_Fund, Expert expert, IDatabase database, bool isPerformance)
        {
            //第六位绩效的话为9，非绩效为1
            string six = isPerformance ? "9" : "1";
            //九和十位为项目分类代码
            string nineTen = projectInfo_Fund.Project.Type.Type.Code;
            if (string.IsNullOrEmpty(nineTen))
                return string.Empty;

            int year = DateTime.Now.Year;
            //七八位为当年年份
            string sevenEight = year.ToString().Substring(2, 2);
            //十一到十三位为项目的专家顺序编码计数器
            string elevenToThirteen = String.Format("{0:D3}", database.Counts.NewExpertSerialCodeCount(year));

            return six + sevenEight + nineTen + elevenToThirteen;
        }
        /// <summary>
        /// 判断账本号是否重复
        /// </summary>
        /// <param name="query"></param>
        /// <param name="accountBookNumber"></param>
        /// <param name="projectInfo_Fund"></param>
        /// <param name="expert"></param>
        /// <returns></returns>
        public static bool IsAccountBookNumberRepeat(this IQueryable<FundMember> query, string accountBookNumber, ProjectInfo_Fund projectInfo_Fund, Expert expert)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (!(projectInfo_Fund.Project.Type.Rank.IsHorizontal) || !(projectInfo_Fund.Project.Type.Type.IsExploit && projectInfo_Fund.FundTotal < 40000000))
                return query.Count(q => q.AccountBookNumber.Substring(4) == accountBookNumber.Substring(4)) != 0;

            return query.Count(q => (q.ProjectInfo_Fund.Project.Type != projectInfo_Fund.Project.Type && q.AccountBookNumber.Substring(4) == accountBookNumber.Substring(4))
                                   || (q.ProjectInfo_Fund.Project.Type == projectInfo_Fund.Project.Type && q.Expert != expert && q.AccountBookNumber.Substring(4) == accountBookNumber.Substring(4))) != 0;
        }
    }
    /// <summary>
    /// 项目经费成员的查询扩展
    /// </summary>
    public static class FundMemberQueryExtension
    {
        /// <summary>
        /// 取得项目的经费成员
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectInfor_FundID"></param>
        /// <param name="isPerformance"></param>
        /// <returns></returns>
        public static IList<FundMember> GetByProject(this IQueryable<FundMember> query, int projectInfor_FundID, bool isPerformance)
        {
            query = query
                .Where(q => q.ProjectInfo_FundID.HasValue && q.ProjectInfo_FundID.Value == projectInfor_FundID);
            if (isPerformance)
                query = query.Where(q => q.AccountBookNumber.Substring(5, 1) == "9");
            else
                query = query.Where(q => q.AccountBookNumber.Substring(5, 1) != "9");

            return query.ToList();

        }
        /// <summary>
        /// 根据项目和专家取得经费成员
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectId"></param>
        /// <param name="expertId"></param>
        /// <returns></returns>
        public static FundMember GetByProjectAndExpert(this IQueryable<FundMember> query, int projectId, int expertId)
        {
            return query
                .SingleOrDefault(q => q.ProjectInfo_Fund.ProjectID == projectId && q.ExpertID == expertId);
        }
    }
    /// <summary>
    /// 项目经费成员的权限扩展
    /// </summary>
    public static class FundMemberPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有清空某一经费成员账本号的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundMember"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ResetAccountBookNumber(this User user, FundMember fundMember, IDatabase database)
        {
            if (user.IsExpert)
                return false;

            if (!user.HasPermission(PermissionItem.ManageFund, database))
                return false;

            return user.CanEdit(fundMember.ProjectInfo_Fund.Project, database);
        }
        /// <summary>
        /// 判断用户是否能清空某一经费成员的账本号
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundmember"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanResetAccountBookNumber(this User user, FundMember fundmember, IDatabase database)
        {
            if (!user.HasPermission_ResetAccountBookNumber(fundmember, database))
                return false;

            var vouchers = fundmember.GetVouchers(database.Vouchers);

            if (vouchers == null || vouchers.Count == 0)
                return true;

            foreach (var voucher in vouchers)
            {
                //只有当凭单对应的经费分配作废后，才能清空账本号
                if (voucher.FundAllocation.CurrentState.State != FundAllocationState.Canceled)
                    return false;

                //有被财务签收的凭单
                if (voucher.CurrentState.State == VoucherState.Allocated || voucher.CurrentState.State == VoucherState.SignIn)
                    return false;

                //如果没有，判断这个凭单对应的经费分配的所有的凭单是否有被财务签收的
                var vouchersRelate = voucher.FundAllocation.GetVouchers(database.Vouchers);
                foreach (var voucherRelate in vouchersRelate)
                    if (voucher.CurrentState.State == VoucherState.Allocated || voucher.CurrentState.State == VoucherState.SignIn)
                        return false;
            }

            return true;
        }
    }
}
