using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文(文科)
    /// </summary>
    public partial class LiberalArtsPaper : Entity<LiberalArtsPaper>
    {

        /// <summary>
        /// 论文名称
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return this.ResultsName;
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
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetPaperDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "PublishDateYear", Title = "发表年" });
            list.Add(new LogDescriptionItem { Name = "SerialNumbe", Title = "序列号ID" });
            list.Add(new LogDescriptionItem { Name = "ResultsName", Title = "成果名" });
            list.Add(new LogDescriptionItem { Name = "Type", Title = "成果类别" });
            list.Add(new LogDescriptionItem { Name = "EnglishName", Title = "英文篇名" });
            list.Add(new LogDescriptionItem { Name = "SourceAuthor", Title = "来源作者" });
            list.Add(new LogDescriptionItem { Name = "ResultsForm", Title = "成果形式" });
            list.Add(new LogDescriptionItem { Name = "Fund", Title = "基金" });
            list.Add(new LogDescriptionItem { Name = "Publisher", Title = "期刊名或出版社" });
            list.Add(new LogDescriptionItem { Name = "ISSN", Title = "ISSN" });
            list.Add(new LogDescriptionItem { Name = "FirstOrganization", Title = "第一机构" });

            list.Add(new LogDescriptionItem { Name = "OurSchoolSignRank", Title = "我校署名位次" });
            list.Add(new LogDescriptionItem { Name = "OrganizationName", Title = "机构名称" });
            list.Add(new LogDescriptionItem { Name = "Region", Title = "地区" });
            list.Add(new LogDescriptionItem { Name = "SubjectClass", Title = "学科分类" });
            list.Add(new LogDescriptionItem { Name = "FirstAuthor", Title = "第一作者" });
            list.Add(new LogDescriptionItem { Name = "College", Title = "所属院系" });
            list.Add(new LogDescriptionItem { Name = "CODEN", Title = "期刊代码" });
            list.Add(new LogDescriptionItem { Name = "IssuesDate", Title = "年代卷期" });

            list.Add(new LogDescriptionItem { Name = "KeyWord", Title = "关键词" });
            list.Add(new LogDescriptionItem { Name = "Mark", Title = "标志" });
            list.Add(new LogDescriptionItem { Name = "DegreeType", Title = "学位分类" });
            list.Add(new LogDescriptionItem { Name = "FundType", Title = "基金类别" });
            list.Add(new LogDescriptionItem { Name = "References", Title = "参考文献" });
            list.Add(new LogDescriptionItem { Name = "CiteTime", Title = "总被引次数" });

            return list.ToArray();
        }
        /// <summary>
        /// 判断该用户是否是论文作者
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool IsPaperAuthor(User user, IQueryable<LiberalArtsPaperAuthor> query)
        {
            return user.IsExpert && query.Count(q => q.LiberalArtsPaperID == _ID && q.ExpertID.HasValue && q.Expert.User.ID == user.ID) != 0;
        }
        /// <summary>
        /// 取得论文所有作者
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<LiberalArtsPaperAuthor> GetPaperAuthors(IQueryable<LiberalArtsPaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.LiberalArtsPaperID == _ID).ToList();
        }
        /// <summary>
        /// 取得论文所有作者姓名
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<String> GetPaperAuthorsName(IQueryable<LiberalArtsPaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.LiberalArtsPaperID == _ID).Select(q => q.Name).ToList();
        }
        /// <summary>
        /// 取得论文第一作者
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public LiberalArtsPaperAuthor GetPaperFirstAuthor(IQueryable<LiberalArtsPaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.LiberalArtsPaperID == _ID && q.Order == 1);
        }
        /// <summary>
        /// 取得论文的通讯作者
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public LiberalArtsPaperAuthor GetPaperAuthorLink(IQueryable<LiberalArtsPaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.LiberalArtsPaperID == _ID && q.IsLinkMan);
        }
        /// <summary>
        /// 判断用户是否是论文作者
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool IsAuthor(User user, IDatabase database)
        {
            var paperAuthors = GetPaperAuthors(database.LiberalArtsPaperAuthors);

            return paperAuthors
                .Where(q => q.ExpertID.HasValue)
                .Select(q => q.Expert)
                .Select(q => q.User)
                .Contains(user);
        }
        /// <summary>
        /// 判断能否编辑论文的通讯作者
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paperAuthor"></param>
        /// <returns></returns>
        public bool CanEditPaperAuthorLink(IQueryable<LiberalArtsPaperAuthor> query, LiberalArtsPaperAuthor paperAuthor)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            LiberalArtsPaperAuthor author = GetPaperAuthorLink(query);

            if (author == null)
                return true;
            return paperAuthor == author;
        }
        ///// <summary>
        ///// 取得论文的收录信息
        ///// </summary>
        ///// <param name="query"></param>
        ///// <returns></returns>
        //public IList<LiberalArtsPaperIndexed> GetPaperIndexeds(IQueryable<LiberalArtsPaperIndexed> query)
        //{
        //    if (query == null)
        //        throw new ArgumentNullException("query");

        //    return query.Where(q => q.LiberalArtsPaperID == _ID).ToList();
        //}
        ///// <summary>
        ///// 取得论文的录入
        ///// </summary>
        ///// <param name="query"></param>
        ///// <returns></returns>
        //public IList<PaperIndexedType> GetPaperIndexedsName(IQueryable<PaperIndexed> query)
        //{
        //    if (query == null)
        //        throw new ArgumentNullException("query");

        //    return query.Where(q => q.PaperID == _ID).Select(q => q.Indexed).ToList();
        //}
        /// <summary>
        /// 取得论文发表年份的杂志信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>


        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_PublishDateYear.ToString()), "发表年");
            validater.AddCondition(!string.IsNullOrEmpty(_ResultsName.ToString()), "成果名");
            validater.AddCondition(!string.IsNullOrEmpty(_Type.ToString()), "成果类别");
            validater.AddCondition(!string.IsNullOrEmpty(_Publisher.ToString()), "期刊名或出版社");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                base.DeleteAction(database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {

                base.SaveAction(database);
                ts.Complete();
            }

        }
    }
    /// <summary>
    /// 论文(文科)的业务扩展
    /// </summary>
    public static class LiberalArtsPaperBusinessExtension
    {
    }
    /// <summary>
    /// 论文(文科)的查询扩展
    /// </summary>
    public static class LiberalArtsPaperQueryExtension
    {
        /// <summary>
        /// 论文查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<LiberalArtsPaper> Query(this IQueryable<LiberalArtsPaper> query, LiberalArtsPaperQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.GetPaper(queryInformation, user, database);

            //排序
            q = sortQuery(q, queryInformation.SortInfo, database);

            return new QueryResult<LiberalArtsPaper>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }

        private static IQueryable<LiberalArtsPaper> sortQuery(IQueryable<LiberalArtsPaper> query, SortInfo sortInfo, IDatabase database)
        {
            if (sortInfo == null)
                return query.OrderByDescending(p => p.ID);

            else if (sortInfo.Field.EqualIgnoreCase("PublishDateYear"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.PublishDateYear)
                    : query.OrderByDescending(p => p.PublishDateYear);
            else if (sortInfo.Field.EqualIgnoreCase("SerialNumbe"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.SerialNumbe)
                    : query.OrderByDescending(p => p.SerialNumbe);
            else if (sortInfo.Field.EqualIgnoreCase("ResultsName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ResultsName)
                    : query.OrderByDescending(p => p.ResultsName);
            else if (sortInfo.Field.EqualIgnoreCase("Type"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Type)
                    : query.OrderByDescending(p => p.Type);
            else if (sortInfo.Field.EqualIgnoreCase("EnglishName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.EnglishName)
                    : query.OrderByDescending(p => p.EnglishName);
            else if (sortInfo.Field.EqualIgnoreCase("ResultsForm"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ResultsForm)
                    : query.OrderByDescending(p => p.ResultsForm);
            else if (sortInfo.Field.EqualIgnoreCase("Fund"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Fund)
                    : query.OrderByDescending(p => p.Fund);
            else if (sortInfo.Field.EqualIgnoreCase("Publisher"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Publisher)
                    : query.OrderByDescending(p => p.Publisher);
            else if (sortInfo.Field.EqualIgnoreCase("ISSN"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ISSN)
                    : query.OrderByDescending(p => p.ISSN);
            else if (sortInfo.Field.EqualIgnoreCase("FirstOrganization"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.FirstOrganization)
                    : query.OrderByDescending(p => p.FirstOrganization);
            else if (sortInfo.Field.EqualIgnoreCase("OurSchoolSignRank"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.OurSchoolSignRank)
                    : query.OrderByDescending(p => p.OurSchoolSignRank);
            else if (sortInfo.Field.EqualIgnoreCase("OrganizationName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.OrganizationName)
                    : query.OrderByDescending(p => p.OrganizationName);
            else if (sortInfo.Field.EqualIgnoreCase("Region"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Region)
                    : query.OrderByDescending(p => p.Region);
            else if (sortInfo.Field.EqualIgnoreCase("SubjectClass"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.SubjectClass)
                    : query.OrderByDescending(p => p.SubjectClass);
            else if (sortInfo.Field.EqualIgnoreCase("College"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.College.Name)
                    : query.OrderByDescending(p => p.College.Name);
            else if (sortInfo.Field.EqualIgnoreCase("CODEN"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.CODEN)
                    : query.OrderByDescending(p => p.CODEN);
            else if (sortInfo.Field.EqualIgnoreCase("IssuesDate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.IssuesDate)
                    : query.OrderByDescending(p => p.IssuesDate);
            else if (sortInfo.Field.EqualIgnoreCase("KeyWord"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.KeyWord)
                    : query.OrderByDescending(p => p.KeyWord);
            else if (sortInfo.Field.EqualIgnoreCase("Mark"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Mark)
                    : query.OrderByDescending(p => p.Mark);
            else if (sortInfo.Field.EqualIgnoreCase("DegreeType"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.DegreeType)
                   : query.OrderByDescending(p => p.DegreeType);
            else if (sortInfo.Field.EqualIgnoreCase("CiteTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.CiteTime)
                   : query.OrderByDescending(p => p.CiteTime);
            else if (sortInfo.Field.EqualIgnoreCase("References"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.References)
                   : query.OrderByDescending(p => p.References);
            else if (sortInfo.Field.EqualIgnoreCase("FundType"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.FundType)
                   : query.OrderByDescending(p => p.FundType);
            else
                return query.OrderByDescending(p => p.ID);
        }
        ///// <summary>
        ///// 取得论文的查询结果
        ///// </summary>
        ///// <param name="query"></param>
        ///// <param name="queryInformation"></param>
        ///// <param name="user"></param>
        ///// <param name="database"></param>
        ///// <returns></returns>
        public static IQueryable<LiberalArtsPaper> GetPaper(this IQueryable<LiberalArtsPaper> query, LiberalArtsPaperQueryInformation queryInformation, User user, IDatabase database)
        {
            var q = query;
            q = q.Intersect(query.getPaper(queryInformation, user, database));

            if (queryInformation.Basic != null)
                q = q.Intersect(query.getPaper(queryInformation.Basic, database));
            if (queryInformation.OtherBasic != null)
                q = q.Intersect(query.getPaper(queryInformation.OtherBasic, database));
            if (queryInformation.Author != null)
                q = q.Intersect(database.LiberalArtsPaperAuthors.getPaper(queryInformation.Author));

            return q;
        }
        private static IQueryable<LiberalArtsPaper> getPaper(this IQueryable<LiberalArtsPaper> query, LiberalArtsPaperQueryInformation queryInformation, User user, IDatabase database)
        {
            //统计的情况：忽略用户
            if (user == null)
                return query;

            //论文管理员
            if (user.HasPermission(PermissionItem.ManagePaper, database))
                return query;

            //院系管理员
            if (user.IsCollegeManagerOf(PermissionItem.ManagePaper, database))
            {
                List<int> collegesID = user.GetCanManageCollegesID(PermissionItem.ManagePaper, database);
                return query.Where(q => q.CollegeID.HasValue && collegesID.Contains(q.CollegeID.Value));
            }

            //专家
            if (user.IsExpert)
                return database.LiberalArtsPaperAuthors.Where(q => q.Expert.UserID == user.ID).Select(q => q.LiberalArtsPaper).Distinct();

            return query.Where(q => false);
        }
        private static IQueryable<LiberalArtsPaper> getPaper(this IQueryable<LiberalArtsPaper> query, LiberalArtsPaperQueryInformation_Basic queryInformation, IDatabase database)
        {
            if (queryInformation.ResultsName != null) queryInformation.ResultsName = queryInformation.ResultsName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ResultsName)) query = query.Where(q => q.ResultsName.Contains(queryInformation.ResultsName));

            if (queryInformation.ResultsForm != null) queryInformation.ResultsForm = queryInformation.ResultsForm.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ResultsForm)) query = query.Where(q => q.ResultsForm.Contains(queryInformation.ResultsForm));


            if (queryInformation.Type != null && queryInformation.Type.Length != 0)
                query = query.Where(q => queryInformation.Type.Contains(q.Type));

            if (queryInformation.Degree != null && queryInformation.Degree.Length != 0)
                query = query.Where(q => q.Degree.ToString() == queryInformation.Degree);
            if (queryInformation.PublishDateYear != null)
            {
                //if (queryInformation.PublishDateYear.Start.HasValue)
                //    query = query.Where(q => q.PublishDateYear >= queryInformation.PublishDateYear.Start.Value);
                //if (queryInformation.PublishDateYear.End.HasValue)
                //    query = query.Where(q => q.PublishDateYear <= queryInformation.PublishDateYear.End.Value);

                query = query.Where(q => q.PublishDateYear.ToString() == queryInformation.PublishDateYear);
            }

            if (queryInformation.OurSchoolSignRank != null)
            {
                if (queryInformation.OurSchoolSignRank.Start.HasValue)
                    query = query.Where(q => q.OurSchoolSignRank >= queryInformation.OurSchoolSignRank.Start.Value);
                if (queryInformation.OurSchoolSignRank.End.HasValue)
                    query = query.Where(q => q.OurSchoolSignRank <= queryInformation.OurSchoolSignRank.End.Value);
            }

            if (queryInformation.Publisher != null) queryInformation.Publisher = queryInformation.Publisher.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Publisher)) query = query.Where(q => q.Publisher.Contains(queryInformation.Publisher));

            return query;
        }
        private static IQueryable<LiberalArtsPaper> getPaper(this IQueryable<LiberalArtsPaper> query, LiberalArtsPaperQueryInformation_OtherBasic queryInformation, IDatabase database)
        {
            if (queryInformation.SerialNumbe != null) queryInformation.SerialNumbe = queryInformation.SerialNumbe.Trim();
            if (!string.IsNullOrEmpty(queryInformation.SerialNumbe)) query = query.Where(q => q.SerialNumbe.Contains(queryInformation.SerialNumbe));

            if (queryInformation.EnglishName != null) queryInformation.EnglishName = queryInformation.EnglishName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.EnglishName)) query = query.Where(q => q.EnglishName.Contains(queryInformation.EnglishName));


            if (queryInformation.Fund != null) queryInformation.Fund = queryInformation.Fund.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Fund)) query = query.Where(q => q.Fund.Contains(queryInformation.Fund));

            if (queryInformation.ISSN != null) queryInformation.ISSN = queryInformation.ISSN.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ISSN)) query = query.Where(q => q.ISSN.Contains(queryInformation.ISSN));

            if (queryInformation.FirstOrganization != null) queryInformation.FirstOrganization = queryInformation.FirstOrganization.Trim();
            if (!string.IsNullOrEmpty(queryInformation.FirstOrganization)) query = query.Where(q => q.FirstOrganization.Contains(queryInformation.FirstOrganization));

            if (queryInformation.OrganizationName != null) queryInformation.OrganizationName = queryInformation.OrganizationName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.OrganizationName)) query = query.Where(q => q.OrganizationName.Contains(queryInformation.OrganizationName));

            if (queryInformation.Region != null) queryInformation.Region = queryInformation.Region.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Region)) query = query.Where(q => q.Region.Contains(queryInformation.Region));

            if (queryInformation.SubjectClass != null) queryInformation.SubjectClass = queryInformation.SubjectClass.Trim();
            if (!string.IsNullOrEmpty(queryInformation.SubjectClass)) query = query.Where(q => q.SubjectClass.Contains(queryInformation.SubjectClass));

            if (queryInformation.CODEN != null) queryInformation.CODEN = queryInformation.CODEN.Trim();
            if (!string.IsNullOrEmpty(queryInformation.CODEN)) query = query.Where(q => q.CODEN.Contains(queryInformation.CODEN));

            if (queryInformation.IssuesDate != null) queryInformation.IssuesDate = queryInformation.IssuesDate.Trim();
            if (!string.IsNullOrEmpty(queryInformation.IssuesDate)) query = query.Where(q => q.IssuesDate.Contains(queryInformation.IssuesDate));

            if (queryInformation.CiteTime != null)
            {
                if (queryInformation.CiteTime.Start.HasValue)
                    query = query.Where(q => q.CiteTime >= queryInformation.CiteTime.Start.Value);
                if (queryInformation.CiteTime.End.HasValue)
                    query = query.Where(q => q.CiteTime <= queryInformation.CiteTime.End.Value);
            }
            if (queryInformation.KeyWord != null) queryInformation.KeyWord = queryInformation.KeyWord.Trim();
            if (!string.IsNullOrEmpty(queryInformation.KeyWord)) query = query.Where(q => q.KeyWord.Contains(queryInformation.KeyWord));
            if (queryInformation.Mark != null) queryInformation.Mark = queryInformation.Mark.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Mark)) query = query.Where(q => q.Mark.Contains(queryInformation.Mark));
            if (queryInformation.DegreeType != null) queryInformation.DegreeType = queryInformation.DegreeType.Trim();
            if (!string.IsNullOrEmpty(queryInformation.DegreeType)) query = query.Where(q => q.DegreeType.Contains(queryInformation.DegreeType));
            //if (queryInformation.CollegeName != null)
            //{
            //    Department department = database.Departments.FirstOrDefault(c => c.Name == queryInformation.CollegeName);
            //    query = query.Where(q => q.CollegeID==department.ID);
            //}
            if (queryInformation.CollegeName != null) queryInformation.CollegeName = queryInformation.CollegeName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.CollegeName))
                query = query.Where(p => p.College.Name == queryInformation.CollegeName);


            return query;
        }
        //private static IQueryable<LiberalArtsPaper> getPaper(this IQueryable<LiberalArtsPaper> query, PaperQueryInformation_Indexed queryInformation, IDatabase database)
        //{
        //    if (queryInformation.Indexed != null && queryInformation.Indexed.Length != 0)
        //        query = database.PaperIndexeds.Where(p => queryInformation.Indexed.Contains(p.Indexed)).Select(p => p.Paper);
        //    return query;
        //}
        private static IQueryable<LiberalArtsPaper> getPaper(this IQueryable<LiberalArtsPaperAuthor> authorQuery, PaperQueryInformation_Author queryInformation)
        {
            var q = authorQuery;

            if (queryInformation.PaperAuthorName != null) queryInformation.PaperAuthorName = queryInformation.PaperAuthorName.Trim();

            if (!string.IsNullOrEmpty(queryInformation.PaperAuthorName))
                q = q.Where(a => a.EnglishName.Equals(queryInformation.PaperAuthorName)
                    || a.Name.Equals(queryInformation.PaperAuthorName)
                    || a.Expert.NameSpell.Equals(queryInformation.PaperAuthorName));

            if (queryInformation.IsLinkMan.HasValue && queryInformation.IsLinkMan.Value)
                q = q.Where(a => a.IsLinkMan);


            if (queryInformation.AuthorOrder.HasValue)
                q = q.Where(p => p.Order == queryInformation.AuthorOrder.Value);

            var expertQueryInformation = queryInformation.ExpertAuthorQueryInformation;
            if (expertQueryInformation != null)
                q = q.Intersect(q.getPaperAuthor(expertQueryInformation));

            return q.Select(p => p.LiberalArtsPaper).Distinct();
        }
        private static IQueryable<LiberalArtsPaperAuthor> getPaperAuthor(this IQueryable<LiberalArtsPaperAuthor> authorquery, ExpertQueryInformation_Basic queryInformation)
        {
            var q = authorquery;

            if (queryInformation.ExpertBirthday != null)
            {
                if (queryInformation.ExpertBirthday.Start.HasValue)
                    q = q.Where(a => a.Expert.Birthday <= queryInformation.ExpertBirthday.Start);

                if (queryInformation.ExpertBirthday.End.HasValue)
                    q = q.Where(a => a.Expert.Birthday >= queryInformation.ExpertBirthday.End);
            }

            if (queryInformation.ExpertCollege != null && queryInformation.ExpertCollege.Length > 0)
                q = q.Where(a => queryInformation.ExpertCollege == a.Expert.College.Name);


            if (queryInformation.IsPostOrAcademyDegree == true && queryInformation.ExpertAcademyDegree != null
                && queryInformation.ExpertAcademyDegree.Length != 0 && queryInformation.ExpertPostLevel != null)
            {
                var qTemporary = q.Where(pm => queryInformation.ExpertAcademyDegree.Contains(pm.Expert.AcademyDegree));

                if (queryInformation.ExpertPostLevel.Start.HasValue)
                    q = q.Where(pm => pm.Expert.PostLevel >= queryInformation.ExpertPostLevel.Start.Value);
                if (queryInformation.ExpertPostLevel.End.HasValue)
                    q = q.Where(pm => pm.Expert.PostLevel <= queryInformation.ExpertPostLevel.End.Value);

                q = q.Union(qTemporary);
            }
            else
            {
                if (queryInformation.ExpertAcademyDegree != null && queryInformation.ExpertAcademyDegree.Length != 0)
                    q = q.Where(pm => queryInformation.ExpertAcademyDegree.Contains(pm.Expert.AcademyDegree));

                if (queryInformation.ExpertPostLevel != null)
                {
                    if (queryInformation.ExpertPostLevel.Start.HasValue)
                        q = q.Where(pm => pm.Expert.PostLevel >= queryInformation.ExpertPostLevel.Start.Value);
                    if (queryInformation.ExpertPostLevel.End.HasValue)
                        q = q.Where(pm => pm.Expert.PostLevel <= queryInformation.ExpertPostLevel.End.Value);
                }
            }

            return q;
        }
        //private static IQueryable<Paper> getPaper(this IQueryable<Paper> query, PaperQueryInformation_Magazine queryInformation, IDatabase database)
        //{
        //    if (queryInformation.MagazineBasic != null)
        //    {
        //        if (queryInformation.MagazineBasic.Name != null) queryInformation.MagazineBasic.Name = queryInformation.MagazineBasic.Name.Trim();
        //        if (!string.IsNullOrEmpty(queryInformation.MagazineBasic.Name)) query = query.Where(q => q.Magazine.FullName.Contains(queryInformation.MagazineBasic.Name));

        //        if (queryInformation.MagazineBasic.Names != null && queryInformation.MagazineBasic.Names.Length != 0)
        //            query = query.Where(q => queryInformation.MagazineBasic.Names.Contains(q.Magazine.ShortName));
        //        if (queryInformation.MagazineBasic.Language != null && queryInformation.MagazineBasic.Language.Length != 0)
        //            query = query.Where(q => queryInformation.MagazineBasic.Language.Contains(q.Magazine.Language));

        //        if (queryInformation.MagazineBasic.ISSN != null) queryInformation.MagazineBasic.ISSN = queryInformation.MagazineBasic.ISSN.Trim();
        //        if (!string.IsNullOrEmpty(queryInformation.MagazineBasic.ISSN)) query = query.Where(q => q.Magazine.ISSN.Equals(queryInformation.MagazineBasic.ISSN));

        //    }
        //    IList<Magazine> magazines = database.Magazines.ToList();
        //    if (queryInformation.SubjectClass != null)
        //    {
        //        if (queryInformation.SubjectClass.SubjectClass != null && queryInformation.SubjectClass.SubjectClass.Length != 0)
        //        {
        //            magazines = database.MagazineSubjectClasses.Where(q => queryInformation.SubjectClass.SubjectClass.Contains(q.SubjectClass)).Select(q => q.Magazine).Distinct().ToList();
        //            query = query.Where(q => magazines.AsEnumerable().Contains(q.Magazine));
        //        }
        //    }
        //    return query;
        //}
        /// <summary>
        /// 查询杂志
        /// </summary>
        /// <param name="query"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        //public static IList<Magazine> SearchMagazine(this IQueryable<Magazine> query, string param)
        //{
        //    if (param != null) param = param.Trim();

        //    return query
        //        .Where(m => m.ISSN.StartsWith(param)
        //            || m.FullName.StartsWith(param)
        //                || m.ShortName.StartsWith(param))
        //        .ToList();
        //}
        /// <summary>
        /// 取得论文所属的学院集合
        /// </summary>
        /// <param name="query"></param>
        ///// <returns></returns>
        //public static IList<Department> GetPaperColleges(this IQueryable<LiberalArtsPaper> query)
        //{
        //    return query
        //        .Select(q => q.College)
        //        .Distinct()
        //        .ToList();
        //}
        ///// <summary>
        ///// 取得所属实验室
        ///// </summary>
        ///// <param name="query"></param>
        ///// <returns></returns>
        //public static IList<string> GetLabs(this IQueryable<LiberalArtsPaper> query)
        //{
        //    return query
        //        .Select(p => p.Lab)
        //        .Distinct()
        //        .ToList();
        //}
        ///// <summary>
        ///// 取得某年发表于某一杂志的论文
        ///// </summary>
        ///// <param name="query"></param>
        ///// <param name="magazineID"></param>
        ///// <param name="year"></param>
        ///// <returns></returns>
        //public static IList<Paper> GetPapersByMagazineAndYear(this IQueryable<LiberalArtsPaper> query, int magazineID, int? year)
        //{
        //    IList<Paper> papers = new List<Paper>() { };
        //    if (year.HasValue)
        //        papers = query.Where(p => p.MagazineID == magazineID && p.PublishDateYear.HasValue && p.PublishDateYear.Value == year.Value).ToList();
        //    return papers;
        //}
    }
    /// <summary>
    /// 论文(文科)的权限扩展
    /// </summary>
    public static class LiberalArtsPaperPermissionExtension
    {/// <summary>
        /// 管理员是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPaper2(this User user, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManagePaper, database))
                return true;

            return false;
        }
        /// <summary>
        /// 判断用户是否具有查看该论文的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Show2(this User user, LiberalArtsPaper paper, IDatabase database)
        {
            if (user.IsExpert)
                return paper.IsAuthor(user, database);

            if (user.HasPermission(PermissionItem.ManagePaper, database))
                return true;

            if (user.IsCollegeManagerOf(PermissionItem.ManagePaper, database))
                return paper.CollegeID.HasValue && user.GetCanManageCollegesID(PermissionItem.ManagePaper, database).Contains(paper.CollegeID.Value);

            return false;

        }
        /// <summary>
        /// 判断用户能否查看该论文
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow2(this User user, LiberalArtsPaper paper, IDatabase database)
        {
            return user.HasPermission_Show2(paper, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑该论文的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit2(this User user, LiberalArtsPaper paper, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePaper, database);
        }
        /// <summary>
        ///  判断用户是否具有编辑该论文的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit2(this User user, LiberalArtsPaper paper, IDatabase database)
        {
            return user.HasPermission_Edit2(paper, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑该论文作者的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPaperAuthor2(this User user, LiberalArtsPaper paper, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePaper, database);
        }
        /// <summary>
        ///  判断用户是否能编辑该论文作者
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditPaperAuthor2(this User user, LiberalArtsPaper paper, IDatabase database)
        {
            return user.HasPermission_EditPaperAuthor2(paper, database);
        }
    }
}

