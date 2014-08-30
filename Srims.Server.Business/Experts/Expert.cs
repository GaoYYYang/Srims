using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Transactions;

using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;

using Srims.Server.Business.Awards;
using Srims.Server.Business.Common;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家
    /// </summary>
    public partial class Expert : Entity<Expert>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "Sex", Title = "性别" });
            list.Add(new LogDescriptionItem { Name = "Birthday", Title = "生日" });
            list.Add(new LogDescriptionItem { Name = "Nation", Title = "民族" });
            list.Add(new LogDescriptionItem { Name = "Policy", Title = "政治面貌" });
            list.Add(new LogDescriptionItem { Name = "ComeDate", Title = "到校日期" });
            list.Add(new LogDescriptionItem { Name = "FileNumber", Title = "档案号" });
            list.Add(new LogDescriptionItem { Name = "AcademyDegree", Title = "学历" });
            list.Add(new LogDescriptionItem { Name = "Occupation", Title = "职位" });
            list.Add(new LogDescriptionItem { Name = "IsDoctorDirector", Title = "是否博导" });
            list.Add(new LogDescriptionItem { Name = "IsChinese", Title = "是否中国国籍" });
            list.Add(new LogDescriptionItem { Name = "Language1", Title = "外语" });
            list.Add(new LogDescriptionItem { Name = "LanguageLevel1", Title = "外语水平" });
            list.Add(new LogDescriptionItem { Name = "Department", Title = "部门" });
            list.Add(new LogDescriptionItem { Name = "College", Title = "学院" });
            list.Add(new LogDescriptionItem { Name = "PostNew", Title = "职称" });
            list.Add(new LogDescriptionItem { Name = "PostLevel", Title = "职称等级" });

            return list.ToArray();
        }
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得或设置姓名
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set
            {
                _Name = value;
                _NameSpell = Spell.GetSpell(value);
            }
        }
        /// <summary>
        /// 取得专家是否院士
        /// </summary>
        public bool? IsAcademician
        {
            get { return PostLevel.HasValue ? new bool?(PostLevel.Value == 1) : null; }
        }
        /// <summary>
        /// 同意用户协议
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="userIP">同意协议时所使用的IP</param>
        public void AgreeLicence(IDatabase database, string userIP)
        {
            if (this._IsAgreeLicence)
                throw new InvalidOperationException("该专家已经同意用户协议！");

            this._IsAgreeLicence = true;
            this._AgreeLicenceDateTime = DateTime.Now;
            this._AgreeLicenceIP = userIP;

            this.Save(database);
        }
        /// <summary>
        /// 专家的描述
        /// </summary>
        /// <returns>姓名</returns>
        public override string ToString()
        {
            return _Name;
        }
        /// <summary>
        /// 取得专家参与的项目
        /// </summary>
        /// <param name="database"></param>
        /// <param name="isCharged"></param>
        /// <returns></returns>
        public IList<Project> GetMyProjects(IDatabase database, bool isCharged)
        {
            if (database.Projects == null)
                throw new ArgumentNullException("database.Projects");

            IQueryable<Project> projects = database.Projects;

            if (isCharged)
                projects = database.Projects.Where(p => p.PrincipalID == ID);
            else
                projects = database.ProjectMemebers.Where(pm => pm.ExpertID == ID).Select(pm => pm.Project).Where(p => p.PrincipalID != ID);

            return projects
                .Where(p => p.CurrentState.State != ProjectState.Deleted && p.CurrentState.State != ProjectState.WithDraw && p.CurrentState.State != ProjectState.WaitingStartInformation)
                .Distinct().OrderByDescending(p => p.CreateDate)
                .ToList();
        }
        /// <summary>
        /// 取得专家所获得的奖励
        /// </summary>
        /// <param name="awardWinners"></param>
        /// <returns></returns>
        public IList<Award> GetMyAwards(IQueryable<AwardWinner> awardWinners)
        {
            if (awardWinners == null)
                throw new ArgumentNullException("awardWinners");

            return awardWinners.Where(aw => aw.ExpertID == ID).Select(aw => aw.Award).Distinct().OrderByDescending(aw => aw.Year).ToList();
        }
        /// <summary>
        /// 取得专家在获奖人中的位次
        /// </summary>
        /// <param name="awardWinners"></param>
        /// <param name="awardID"></param>
        /// <returns></returns>
        public int GetMyAwardOrder(IQueryable<AwardWinner> awardWinners, int awardID)
        {
            if (awardWinners == null)
                throw new ArgumentNullException("awardWinners");

            return awardWinners.Single(aw => aw.ExpertID == ID && aw.AwardID == awardID).Order;
        }
        /// <summary>
        /// 取得专家发表的论文
        /// </summary>
        /// <param name="paperAuthors"></param>
        /// <returns></returns>
        public IList<Paper> GetMyPapers(IQueryable<PaperAuthor> paperAuthors)
        {
            if (paperAuthors == null)
                throw new ArgumentNullException("paperAuthors");

            return paperAuthors
                .Where(pa => pa.ExpertID.HasValue && pa.ExpertID.Value == ID)
                .Select(pa => pa.Paper)
                .Distinct()
                .OrderByDescending(pa => pa.PublishDateYear)
                .ToList();
        }
        /// <summary>
        /// 取得专家发表的文科论文
        /// </summary>
        /// <param name="paperAuthors"></param>
        /// <returns></returns>
        public IList<LiberalArtsPaper> GetMyLiberalArtsPapers(IQueryable<LiberalArtsPaperAuthor> paperAuthors)
        {
            if (paperAuthors == null)
                throw new ArgumentNullException("paperAuthors");

            return paperAuthors
                .Where(pa => pa.ExpertID.HasValue && pa.ExpertID.Value == ID)
                .Select(pa => pa.LiberalArtsPaper)
                .Distinct()
                .OrderByDescending(pa => pa.PublishDateYear)
                .ToList();
        }
        /// <summary>
        /// 取得专家在论文作者中的位次
        /// </summary>
        /// <param name="paperAuthors"></param>
        /// <param name="paperID"></param>
        /// <returns></returns>
        public int GetMyPaperOrder(IQueryable<PaperAuthor> paperAuthors, int paperID)
        {
            if (paperAuthors == null)
                throw new ArgumentNullException("paperAuthors");

            return paperAuthors.Single(pa => pa.ExpertID == ID && paperID == pa.PaperID).Order;
        }
        /// <summary>
        /// 取得专家获得的专利
        /// </summary>
        /// <param name="patentInventers"></param>
        /// <returns></returns>
        public IList<Patent> GetMyPatents(IQueryable<PatentInventer> patentInventers)
        {
            if (patentInventers == null)
                throw new ArgumentNullException("patentInventers");

            return patentInventers.Where(pi => pi.ExpertID == ID).Select(pi => pi.Patent).Distinct().OrderByDescending(pi => pi.AuthorizeDateTime).ToList();
        }
        /// <summary>
        /// 取得专家在专利发明人中的位次
        /// </summary>
        /// <param name="patentInventers"></param>
        /// <param name="patentID"></param>
        /// <returns></returns>
        public int GetMyPatentOrder(IQueryable<PatentInventer> patentInventers, int patentID)
        {
            if (patentInventers == null)
                throw new ArgumentNullException("patentInventers");

            return patentInventers.Single(pi => pi.ExpertID == ID && pi.PatentID == patentID).Order;
        }
        /// <summary>
        /// 取得专家在项目成员中的位次
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectID"></param>
        /// <returns></returns>
        public int GetMyProjectMemberOrder(IQueryable<ProjectMember> query, int projectID)
        {
            return query
                .Single(q => q.ProjectID == projectID && q.ExpertID == this.ID)
                .Order;
        }
        /// <summary>
        /// 取得专家的项目数目
        /// </summary>
        /// <param name="expertAchieveStatistic"></param>
        /// <returns></returns>
        public int? GetProjectCount(IQueryable<ExpertAchieveStatistic> expertAchieveStatistic)
        {
            if (expertAchieveStatistic == null)
                throw new ArgumentNullException("expertAchieveStatistic");

            return expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID) == null ? null : expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID).ProjectCount;
        }
        /// <summary>
        /// 取得专家的论文数目
        /// </summary>
        /// <param name="expertAchieveStatistic"></param>
        /// <returns></returns>
        public int? GetPaperCount(IQueryable<ExpertAchieveStatistic> expertAchieveStatistic)
        {
            if (expertAchieveStatistic == null)
                throw new ArgumentNullException("expertAchieveStatistic");

            return expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID) == null ? null : expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID).PaperCount;
        }
        /// <summary>
        /// 取得专家的专利数目
        /// </summary>
        /// <param name="expertAchieveStatistic"></param>
        /// <returns></returns>
        public int? GetPatentCount(IQueryable<ExpertAchieveStatistic> expertAchieveStatistic)
        {
            if (expertAchieveStatistic == null)
                throw new ArgumentNullException("expertAchieveStatistic");

            return expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID) == null ? null : expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID).PatentCount;
        }
        /// <summary>
        /// 取得专家的奖励数目
        /// </summary>
        /// <param name="expertAchieveStatistic"></param>
        /// <returns></returns>
        public int? GetAwardCount(IQueryable<ExpertAchieveStatistic> expertAchieveStatistic)
        {
            if (expertAchieveStatistic == null)
                throw new ArgumentNullException("expertAchieveStatistic");

            return expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID) == null ? null : expertAchieveStatistic.SingleOrDefault(eas => eas.ExpertID == ID).AwardCount;
        }
        /// <summary>
        ///  取得专家对应的用户
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public User GetUser(IQueryable<User> query, IDatabase database)
        {
            if (this.IsNew)
                return new User { UserRole = database.UserRoles.GetUserRulesByType(UserRoleType.Expert).First() };

            return query.SingleOrDefault(q => q.LoginID == this.Number);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            if (!string.IsNullOrEmpty(_IDCardNumber))
                validater.AddCondition(ValidateIDCardNumber(_IDCardNumber), "身份证号不符合规则");

            if (_Email != null && !string.IsNullOrEmpty(_Email.Trim()))
                validater.AddCondition(ValidateEmail(_Email), "邮箱地址不符合规则");
        }

        private bool ValidateIDCardNumber(string IDCardNumber)
        {
            return Regex.IsMatch(IDCardNumber.ToUpper(), @"(^\d{15}$)|(^\d{17}([0-9]|X)$)");
        }
        private bool ValidateEmail(string IDCardNumber)
        {
            return Regex.IsMatch(IDCardNumber.ToUpper(), @"\w+([-+.]\w+)*@\w+([-.]\w+)+");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                updateUser(database);
                base.SaveAction(database);

                ts.Complete();
            }
        }
        private void updateUser(IDatabase database)
        {
            var user = this.GetUser(database.Users, database);
            if (this.IsNew)
            {
                user.LoginID = this.Number;
                user.Password = User._USER_RESET_PASSWORD;
                user.Name = this.Name;
            }
            user.Email = this.Email;
            user.HomePhone = this.HomePhone;
            user.OfficePhone = this.OfficePhone;
            user.MobilePhone = this.MobilePhone;
            user.Fax = this.Fax;
            user.Save(database);
            this.User = user;
        }
    }

    /// <summary>
    /// 专家的业务扩展
    /// </summary>
    public static class ExpertBusinessExtension
    {
    }
    /// <summary>
    /// 专家的查询扩展
    /// </summary>
    public static class ExpertQueryExtension
    {
        /// <summary>
        /// 取得工作证号相同的专家
        /// </summary>
        /// <param name="query"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        public static int GetExpertOfSameNumber(this IQueryable<Expert> query, string number)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.Number == number).Count();
        }
        /// <summary>
        /// 搜索专家
        /// </summary>
        /// <param name="query">查询</param>
        /// <param name="keyword">关键字</param>
        /// <returns>姓名、姓名拼音首字母或专家号以关键字开头的专家列表</returns>
        public static IList<Expert> SearchExpert(this IQueryable<Expert> query, string keyword)
        {
            if (keyword != null) keyword = keyword.Trim();

            return query
                .Where(e =>
                            (!e.IsDeleted)
                            && (e.Name.StartsWith(keyword)
                               || e.NameSpell.Equals(keyword)
                               || e.Number.StartsWith(keyword)))
                .ToList();
        }
        /// <summary>
        /// 取得专家
        /// </summary>
        /// <param name="query">数据查询</param>
        /// <param name="loginID">登陆ID</param>
        /// <param name="password">密码</param>
        /// <returns>如果对应的专辑存在则返回该专家，否则返回空</returns>
        public static Expert Get(this IQueryable<Expert> query, string loginID, string password)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query
                .SingleOrDefault(e => e.User.LoginID == loginID && e.User.Password == PasswordBuilder.BuildPassword(password));
        }
        /// <summary>
        /// 取得专家所在的学院
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetExpertCollege(this IQueryable<Expert> query)
        {
            return query
                .Select(q => q.College.Name)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 根据专家姓名取得专家
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static IList<Expert> GetByName(this IQueryable<Expert> query, string name)
        {
            return query
                .Where(q => q.Name == name)
                .ToList();
        }
        /// <summary>
        /// 取得专家的学历
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetExpertAcademyDegree(this IQueryable<Expert> query)
        {
            return query
                .Select(q => q.AcademyDegree.Substring(0, 5))
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 取得专家的职称
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetExpertPost(this IQueryable<Expert> query)
        {
            return query
                .Select(q => q.PostNew)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 专家查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<Expert> Query(this IQueryable<Expert> query, ExpertQueryInformation queryInformation, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.GetExperts(queryInformation, database);
            q = sortQuery(q, queryInformation.sortInfo, database);

            return new QueryResult<Expert>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
        /// <summary>
        /// 排序
        /// </summary>
        /// <param name="query"></param>
        /// <param name="sortInfo"></param>
        /// <returns></returns>
        private static IQueryable<Expert> sortQuery(IQueryable<Expert> query, SortInfo sortInfo, IDatabase database)
        {
            if (sortInfo == null)
                return query.OrderBy(e => e.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(e => e.Name) : query.OrderByDescending(e => e.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Number"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(e => e.Number) : query.OrderByDescending(e => e.Number);
            else if (sortInfo.Field.EqualIgnoreCase("Post"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(e => e.PostNew) : query.OrderByDescending(e => e.PostNew);
            else if (sortInfo.Field.EqualIgnoreCase("ProjectCount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.ProjectCount }).OrderBy(e => e.ProjectCount).Select(e => e.e)
                    : query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.ProjectCount }).OrderByDescending(e => e.ProjectCount).Select(e => e.e);
            else if (sortInfo.Field.EqualIgnoreCase("PaperCount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.PaperCount }).OrderBy(e => e.PaperCount).Select(e => e.e)
                    : query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.PaperCount }).OrderByDescending(e => e.PaperCount).Select(e => e.e);
            else if (sortInfo.Field.EqualIgnoreCase("PatentCount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.PatentCount }).OrderBy(e => e.PatentCount).Select(e => e.e)
                    : query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.PatentCount }).OrderByDescending(e => e.PatentCount).Select(e => e.e);
            else if (sortInfo.Field.EqualIgnoreCase("AwardCount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.AwardCount }).OrderBy(e => e.AwardCount).Select(e => e.e)
                    : query.Join(database.ExpertAchieveStatistics, e => e.ID, ea => ea.ExpertID, (e, ea) => new { e, ea.AwardCount }).OrderByDescending(e => e.AwardCount).Select(e => e.e);
            else
                return query.OrderBy(e => e.Name);
        }
        /// <summary>
        /// 取得专家
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Expert> GetExperts(this IQueryable<Expert> query, ExpertQueryInformation queryInformation, IDatabase database)
        {
            var q = query.Where(e => !e.IsDeleted);

            var expertsAchieveStatistics = database.ExpertAchieveStatistics.AsQueryable();
            var expertsByProject = q;
            var expertsByFund = q;
            var expertsByPaper = q;
            var expertsByPatent = q;
            var expertsByAward = q;

            var updateParamters = getUpdateParamters(queryInformation, database);

            if (queryInformation.Basic != null)
                q = q.getExperts(queryInformation.Basic);

            if (queryInformation.PatentQueryInformation_IsPrincipal.HasValue
                || queryInformation.PatentQueryInformation_Count != null
                || queryInformation.PatentQueryInformation_Order != null
                || queryInformation.PaperQueryInformation_IsLinkMan.HasValue
                || queryInformation.PaperQueryInformation_Count != null
                || queryInformation.PaperQueryInformation_Order != null
                || queryInformation.ProjectQueryInformation_Count != null
                || queryInformation.ProjectQueryInformation_Fund_Count != null
                || queryInformation.AwardQueryInformation_Count != null
                || queryInformation.AwardQueryInformation_Order != null
                || queryInformation.PatentQueryInformation != null
                || queryInformation.ProjectQueryInformation != null
                || queryInformation.PaperQueryInformation != null
                || queryInformation.AwardQueryInformation != null)
            {
                database.ExpertAchieveStatistics.UpdateExpertAchieveStatistic(updateParamters);
                expertsByPaper = expertsAchieveStatistics.Where(eas => eas.PaperCount >= 1).Select(eas => eas.Expert);
                expertsByPatent = expertsAchieveStatistics.Where(eas => eas.PatentCount >= 1).Select(eas => eas.Expert);
                expertsByProject = expertsAchieveStatistics.Where(eas => eas.ProjectCount >= 1).Select(eas => eas.Expert);
                //expertsByFund = expertsAchieveStatistics.Where(eas => eas.FundTotal > 0).Select(eas => eas.Expert);
                expertsByAward = expertsAchieveStatistics.Where(eas => eas.AwardCount >= 1).Select(eas => eas.Expert);

                if (queryInformation.PaperQueryInformation_Count != null)
                {
                    if (queryInformation.PaperQueryInformation_Count.Start.HasValue)
                        expertsByPaper = expertsByPaper.Intersect(expertsAchieveStatistics.Where(eas => eas.PaperCount >= queryInformation.PaperQueryInformation_Count.Start.Value).Select(eas => eas.Expert));
                    if (queryInformation.PaperQueryInformation_Count.End.HasValue)
                        expertsByPaper = expertsByPaper.Intersect(expertsAchieveStatistics.Where(eas => eas.PaperCount <= queryInformation.PaperQueryInformation_Count.End.Value).Select(eas => eas.Expert));
                }
                if (queryInformation.PaperQueryInformation_Count != null || queryInformation.PaperQueryInformation_IsLinkMan.HasValue || queryInformation.PaperQueryInformation_Order != null || queryInformation.PaperQueryInformation != null)
                    q = q.Intersect(expertsByPaper);

                if (queryInformation.PatentQueryInformation_Count != null)
                {
                    if (queryInformation.PatentQueryInformation_Count.Start.HasValue)
                        expertsByPatent = expertsByPatent.Intersect(expertsAchieveStatistics.Where(eas => eas.PatentCount >= queryInformation.PatentQueryInformation_Count.Start.Value).Select(eas => eas.Expert));
                    if (queryInformation.PatentQueryInformation_Count.End.HasValue)
                        expertsByPatent = expertsByPatent.Intersect(expertsAchieveStatistics.Where(eas => eas.PatentCount <= queryInformation.PatentQueryInformation_Count.End.Value).Select(eas => eas.Expert));
                }
                if (queryInformation.PatentQueryInformation != null || queryInformation.PatentQueryInformation_Count != null || queryInformation.PatentQueryInformation_IsPrincipal.HasValue || queryInformation.PatentQueryInformation_Order != null)
                    q = q.Intersect(expertsByPatent);

                if (queryInformation.ProjectQueryInformation_Fund_Count != null && queryInformation.ProjectQueryInformation_Count != null && queryInformation.IsProjectCountOrFundTotal.HasValue && queryInformation.IsProjectCountOrFundTotal.Value == true)
                {
                    if (queryInformation.ProjectQueryInformation_Fund_Count.Start.HasValue)
                        expertsByFund = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.FundTotal >= queryInformation.ProjectQueryInformation_Fund_Count.Start.Value).Select(eas => eas.Expert));
                    if (queryInformation.ProjectQueryInformation_Fund_Count.End.HasValue)
                        expertsByFund = expertsByFund.Intersect(expertsAchieveStatistics.Where(eas => eas.FundTotal <= queryInformation.ProjectQueryInformation_Fund_Count.End.Value).Select(eas => eas.Expert));

                    if (queryInformation.ProjectQueryInformation_Count.Start.HasValue)
                        expertsByProject = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.ProjectCount >= queryInformation.ProjectQueryInformation_Count.Start.Value).Select(eas => eas.Expert));
                    if (queryInformation.ProjectQueryInformation_Count.End.HasValue)
                        expertsByProject = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.ProjectCount <= queryInformation.ProjectQueryInformation_Count.End.Value).Select(eas => eas.Expert));

                    expertsByProject = expertsByProject.Union(expertsByFund);
                }
                else
                {
                    if (queryInformation.ProjectQueryInformation_Count != null)
                    {
                        if (queryInformation.ProjectQueryInformation_Count.Start.HasValue)
                            expertsByProject = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.ProjectCount >= queryInformation.ProjectQueryInformation_Count.Start.Value).Select(eas => eas.Expert));
                        if (queryInformation.ProjectQueryInformation_Count.End.HasValue)
                            expertsByProject = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.ProjectCount <= queryInformation.ProjectQueryInformation_Count.End.Value).Select(eas => eas.Expert));
                    }
                    if (queryInformation.ProjectQueryInformation_Fund_Count != null)
                    {
                        if (queryInformation.ProjectQueryInformation_Fund_Count.Start.HasValue)
                            expertsByProject = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.FundTotal >= queryInformation.ProjectQueryInformation_Fund_Count.Start.Value).Select(eas => eas.Expert));
                        if (queryInformation.ProjectQueryInformation_Fund_Count.End.HasValue)
                            expertsByProject = expertsByProject.Intersect(expertsAchieveStatistics.Where(eas => eas.FundTotal <= queryInformation.ProjectQueryInformation_Fund_Count.End.Value).Select(eas => eas.Expert));
                    }
                }
                if (queryInformation.ProjectQueryInformation != null || queryInformation.ProjectQueryInformation_Count != null || queryInformation.ProjectQueryInformation_Fund_Count != null)
                    q = q.Intersect(expertsByProject);

                if (queryInformation.AwardQueryInformation_Count != null)
                {
                    if (queryInformation.AwardQueryInformation_Count.Start.HasValue)
                        expertsByAward = expertsByAward.Intersect(expertsAchieveStatistics.Where(eas => eas.AwardCount >= queryInformation.AwardQueryInformation_Count.Start.Value).Select(eas => eas.Expert));
                    if (queryInformation.AwardQueryInformation_Count.End.HasValue)
                        expertsByAward = expertsByAward.Intersect(expertsAchieveStatistics.Where(eas => eas.AwardCount <= queryInformation.AwardQueryInformation_Count.End.Value).Select(eas => eas.Expert));
                }
                if (queryInformation.AwardQueryInformation != null || queryInformation.AwardQueryInformation_Count != null || queryInformation.AwardQueryInformation_Order != null)
                    q = q.Intersect(expertsByAward);
            }
            return q;
        }

        private static ExpertAchieveStatisticUpdateParameters getUpdateParamters(ExpertQueryInformation queryInformation, IDatabase database)
        {
            var updateParamters = new ExpertAchieveStatisticUpdateParameters();

            int[] projectIDArray = null;
            int[] paperIDArray = null;
            int[] awardIDArray = null;
            int[] patentIDArray = null;

            ProjectQueryInformation projectQueryInformation = queryInformation.ProjectQueryInformation;
            if (projectQueryInformation != null || queryInformation.ProjectQueryInformation_Count != null)
            {
                if (projectQueryInformation == null)
                    projectIDArray = database.Projects.Select(p => p.ID).ToArray();
                else
                    projectIDArray = database
                        .Projects.GetProject(projectQueryInformation, null, database)
                        .Where(p => p.CurrentState.State != ProjectState.Deleted || p.CurrentState.State != ProjectState.WaitingStartInformation)
                        .Select(p => p.ID)
                        .ToArray();
            }

            PaperQueryInformation paperQueryInformation = queryInformation.PaperQueryInformation;
            if (paperQueryInformation != null || queryInformation.PaperQueryInformation_Count != null || queryInformation.PaperQueryInformation_IsLinkMan.HasValue || queryInformation.PaperQueryInformation_Order != null)
            {
                if (paperQueryInformation == null)
                    paperIDArray = database.Papers.Select(p => p.ID).ToArray();
                else
                    paperIDArray = database.Papers.GetPaper(paperQueryInformation, null, database).Select(p => p.ID).ToArray();
            }

            AwardQueryInformation awardQueryInformation = queryInformation.AwardQueryInformation;
            if (awardQueryInformation != null || queryInformation.AwardQueryInformation_Count != null || queryInformation.AwardQueryInformation_Order != null)
            {
                if (awardQueryInformation == null)
                    awardIDArray = database.Awards.Select(a => a.ID).ToArray();
                else
                    awardIDArray = database.Awards.GetAward(awardQueryInformation, null, database).Select(p => p.ID).ToArray();
            }

            PatentQueryInformation patentQueryInformation = queryInformation.PatentQueryInformation;
            if (patentQueryInformation != null || queryInformation.PatentQueryInformation_Count != null || queryInformation.PatentQueryInformation_IsPrincipal.HasValue || queryInformation.PatentQueryInformation_Order != null)
            {
                if (patentQueryInformation == null)
                    patentIDArray = database.Patents.Select(p => p.ID).ToArray();
                else
                    patentIDArray = database.Patents.GetPatent(patentQueryInformation, null, database).Select(p => p.ID).ToArray();
            }


            updateParamters.Project_IDArray = projectIDArray;

            updateParamters.Award_IDArray = awardIDArray;
            updateParamters.Award_WinnerOrder = queryInformation.AwardQueryInformation_Order;

            updateParamters.Paper_IDArray = paperIDArray;
            updateParamters.Paper_AuthorOrder = queryInformation.PaperQueryInformation_Order;
            updateParamters.Paper_IsLinkMan = queryInformation.PaperQueryInformation_IsLinkMan;

            updateParamters.Patent_IDArray = patentIDArray;
            updateParamters.Patent_InvertorOrder = queryInformation.PatentQueryInformation_Order;
            updateParamters.Patent_IsPrincipal = queryInformation.PatentQueryInformation_IsPrincipal;

            return updateParamters;
        }
        /// <summary>
        /// 根据基本信息取得专家
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Expert> getExperts(this IQueryable<Expert> query, ExpertQueryInformation_Basic queryInformation)
        {
            var q = query;

            if (queryInformation.Name != null)
                queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(e => e.Name.StartsWith(queryInformation.Name) || e.NameSpell.StartsWith(queryInformation.Name));

            if (queryInformation.Number != null)
                queryInformation.Number = queryInformation.Number.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Number))
                q = q.Where(e => e.Number.StartsWith(queryInformation.Number));

            if (queryInformation.ExpertPostLevel != null)
            {
                if (queryInformation.ExpertPostLevel.Start.HasValue)
                    q = q.Where(e => e.PostLevel.HasValue && e.PostLevel >= queryInformation.ExpertPostLevel.Start);
                if (queryInformation.ExpertPostLevel.End.HasValue)
                    q = q.Where(e => e.PostLevel.HasValue && e.PostLevel <= queryInformation.ExpertPostLevel.End);
            }

            if (queryInformation.ExpertCollege != null)
                queryInformation.ExpertCollege = queryInformation.ExpertCollege.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ExpertCollege))
                q = q.Where(e => e.College.Name.Contains(queryInformation.ExpertCollege));

            if (queryInformation.ExpertBirthday != null)
            {
                if (queryInformation.ExpertBirthday.Start.HasValue)
                    q = q.Where(e => e.Birthday <= queryInformation.ExpertBirthday.Start);
                if (queryInformation.ExpertBirthday.End.HasValue)
                    q = q.Where(e => e.Birthday >= queryInformation.ExpertBirthday.End);
            }

            if (queryInformation.IsPostOrAcademyDegree.HasValue && queryInformation.IsPostOrAcademyDegree.Value && queryInformation.ExpertAcademyDegree != null && queryInformation.ExpertAcademyDegree.Length > 0 && queryInformation.ExpertPost != null && queryInformation.ExpertPost.Length > 0)
                q = q.Where(e => queryInformation.ExpertPost.Contains(e.PostNew) || queryInformation.ExpertAcademyDegree.Contains(e.AcademyDegree));
            else
            {
                if (queryInformation.ExpertPost != null && queryInformation.ExpertPost.Length > 0)
                    q = q.Where(e => queryInformation.ExpertPost.Contains(e.PostNew));

                if (queryInformation.ExpertAcademyDegree != null && queryInformation.ExpertAcademyDegree.Length > 0)
                    q = q.Where(e => queryInformation.ExpertAcademyDegree.Contains(e.AcademyDegree));
            }

            if (queryInformation.IsDotorDirector.HasValue && queryInformation.IsDotorDirector.Value)
                q = q.Where(e => e.IsDoctorDirector.Value == true);

            if (queryInformation.IsAcademician.HasValue && queryInformation.IsAcademician.Value)
                q = q.Where(e => e.IsAcademician.Value);

            return q;
        }
    }
    /// <summary>
    /// 专家的权限扩展
    /// </summary>
    public static class ExpertPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有查看专家的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowExpert(this User user, IDatabase database)
        {
            if (user.IsSuper)
                return true;

            return user.HasPermission(PermissionItem.ExpertShow, database) || user.HasPermission_EditExpert(database) || user.HasPermission_EditExpertLinkWay(database);
        }
        /// <summary>
        /// 判断用户是否具有编辑专家的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditExpert(this User user, IDatabase database)
        {
            if (user.IsSuper)
                return true;
            return user.HasPermission(PermissionItem.ExpertEdit, database);
        }
        /// <summary>
        /// 判断是否具有直接保存编辑专家信息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditExpertAndSaveDirect(this User user, IDatabase database, List<string> list, string paramName)
        {
            if (user.IsSuper)
                return true;

            if (user.HasPermission_EditExpert(database))
            {
                if (user.IsExpert && list.Contains(paramName))
                    return true;
                if (!user.IsExpert)
                    return true;
            }
            if (user.HasPermission_EditExpertLinkWay(database))
            {
                if (user.IsExpert && list.Contains(paramName))
                    return true;
                if (!user.IsExpert)
                    return true;
            }
            if (user.IsExpert && list.Contains(paramName))
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 判断用户是否具有编辑专家联系方式的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditExpertLinkWay(this User user, IDatabase database)
        {
            if (user.IsSuper)
                return true;
            return user.HasPermission(PermissionItem.ExpertLinkWayEdit, database) || user.HasPermission_EditExpert(database);
        }
        /// <summary>
        /// 用户能否查看专家
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowExpert(this User user, IDatabase database)
        {
            return user.HasPermission_ShowExpert(database);
        }
        /// <summary>
        /// 判断用户能否编辑专家
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditExpert(this User user, IDatabase database)
        {
            return user.HasPermission_EditExpert(database);
        }
        /// <summary>
        /// 判断用户能否编辑专家联系方式
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditExpertLinkWay(this User user, IDatabase database)
        {
            return user.HasPermission_EditExpertLinkWay(database);
        }
        /// <summary>
        /// 判断用户是否具有权限
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermission_ExpertSimpleQuery_ShowDetail(this User user)
        {
            return user.UserRole.Type == UserRoleType.Administrator;
        }
    }
}
