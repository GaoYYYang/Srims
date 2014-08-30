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
    /// 论文
    /// </summary>
    public partial class Paper : Entity<Paper>
    {
        /// <summary>
        /// 取得对应的发表杂志
        /// </summary>
        public Magazine Magazine
        {
            get { return _Magazine.Entity; }
            set
            {
                _Magazine.Entity = value;
                _MagazineID = value == null ? null : new int?(value.ID);
                _ResourceName = value == null ? null : value.ShortName;
            }
        }
        /// <summary>
        /// 论文名称
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return this.Name;
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

            list.Add(new LogDescriptionItem { Name = "Name", Title = "名称" });
            list.Add(new LogDescriptionItem { Name = "MagazineID", Title = "发表杂志的ID" });
            list.Add(new LogDescriptionItem { Name = "Type", Title = "文章类型" });
            list.Add(new LogDescriptionItem { Name = "CiteFrequency", Title = "被引频次" });
            list.Add(new LogDescriptionItem { Name = "PublishDateYear", Title = "发表年份" });
            list.Add(new LogDescriptionItem { Name = "PublishDate", Title = "发表日期" });
            list.Add(new LogDescriptionItem { Name = "DocumentNumber", Title = "期次" });
            list.Add(new LogDescriptionItem { Name = "Volume", Title = "卷号" });
            list.Add(new LogDescriptionItem { Name = "StartPage", Title = "起始页码" });
            list.Add(new LogDescriptionItem { Name = "EndPage", Title = "终止页码" });
            list.Add(new LogDescriptionItem { Name = "Pages", Title = "页数" });

            list.Add(new LogDescriptionItem { Name = "SubAirer", Title = "分区" });
            list.Add(new LogDescriptionItem { Name = "InfluenceFactor", Title = "影响因子" });
            list.Add(new LogDescriptionItem { Name = "AuthorKeyWord", Title = "作者关键词" });
            list.Add(new LogDescriptionItem { Name = "KeyWord", Title = "关键词" });
            list.Add(new LogDescriptionItem { Name = "Abstract", Title = "摘要" });
            list.Add(new LogDescriptionItem { Name = "LinkManAddress", Title = "通讯作者地址" });
            list.Add(new LogDescriptionItem { Name = "LinkManEmail", Title = "通讯作者Email" });
            list.Add(new LogDescriptionItem { Name = "LinkManSignUnit", Title = "通讯作者署名单位" });

            list.Add(new LogDescriptionItem { Name = "FirstAuthorSignUnit", Title = "第一作者署名单位" });
            list.Add(new LogDescriptionItem { Name = "SignOrder", Title = "我校署名位次" });
            list.Add(new LogDescriptionItem { Name = "CollegeID", Title = "所属院系的ID" });
            list.Add(new LogDescriptionItem { Name = "Lab", Title = "所属实验室" });
            list.Add(new LogDescriptionItem { Name = "ISIUniqueArticleIdentifier", Title = "ISIUniqueArticleIdentifier" });
            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });

            return list.ToArray();
        }
        /// <summary>
        /// 判断该用户是否是论文作者
        /// </summary>
        /// <param name="user"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool IsPaperAuthor(User user, IQueryable<PaperAuthor> query)
        {
            return user.IsExpert && query.Count(q => q.PaperID == _ID && q.ExpertID.HasValue && q.Expert.User.ID == user.ID) != 0;
        }
        /// <summary>
        /// 取得论文所有作者
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PaperAuthor> GetPaperAuthors(IQueryable<PaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.PaperID == _ID).ToList();
        }
        /// <summary>
        /// 取得论文所有作者姓名
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<String> GetPaperAuthorsName(IQueryable<PaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.PaperID == _ID).Select(q => q.Name).ToList();
        }
        /// <summary>
        /// 取得论文第一作者
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public PaperAuthor GetPaperFirstAuthor(IQueryable<PaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.PaperID == _ID && q.Order == 1);
        }
        /// <summary>
        /// 取得论文的通讯作者
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public PaperAuthor GetPaperAuthorLink(IQueryable<PaperAuthor> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.PaperID == _ID && q.IsLinkMan);
        }
        /// <summary>
        /// 判断用户是否是论文作者
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool IsAuthor(User user, IDatabase database)
        {
            var paperAuthors = GetPaperAuthors(database.PaperAuthors);

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
        public bool CanEditPaperAuthorLink(IQueryable<PaperAuthor> query, PaperAuthor paperAuthor)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            PaperAuthor author = GetPaperAuthorLink(query);

            if (author == null)
                return true;
            return paperAuthor == author;
        }
        /// <summary>
        /// 取得论文的收录信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PaperIndexed> GetPaperIndexeds(IQueryable<PaperIndexed> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.PaperID == _ID).ToList();
        }
        /// <summary>
        /// 取得论文的录入
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PaperIndexedType> GetPaperIndexedsName(IQueryable<PaperIndexed> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.PaperID == _ID).Select(q => q.Indexed).ToList();
        }
        /// <summary>
        /// 取得论文发表年份的杂志信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public MagazineInformation GetPaperMagazineInformation(IQueryable<MagazineInformation> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.MagazineID == _MagazineID && q.Year == _PublishDateYear);
        }
        /// <summary>
        /// 取得论文的影响因子
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int? GetPaperInfluenceFactor(IQueryable<MagazineInformation> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            var paperMagazineInformation = GetPaperMagazineInformation(query);

            if (paperMagazineInformation == null)
                return null;

            return paperMagazineInformation.InfluenceFactor;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "论文名称不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_LinkManSignUnit.ToString()), "通讯作者署名单位不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_FirstAuthorSignUnit.ToString()), "第一作者署名单位不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Type.ToString()), "论文类型不能为空");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var paperAuthor in GetPaperAuthors(database.PaperAuthors))
                    paperAuthor.Delete(database);

                foreach (var paperIndexed in GetPaperIndexeds(database.PaperIndexeds))
                    paperIndexed.Delete(database);

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
                if (_MagazineID.HasValue)
                {
                    MagazineInformation magazineInformation = GetPaperMagazineInformation(database.MagazineInformations);
                    if (_InfluenceFactor.HasValue)
                    {
                        if (magazineInformation == null)
                            magazineInformation = new MagazineInformation();

                        magazineInformation.Magazine = _Magazine.Entity;
                        magazineInformation.Year = _PublishDateYear;
                        magazineInformation.InfluenceFactor = _InfluenceFactor;
                        magazineInformation.Save(database);
                    }
                }
                base.SaveAction(database);
                ts.Complete();
            }
        }
    }
    /// <summary>
    /// 论文的业务扩展
    /// </summary>
    public static class PaperBusinessExtension
    {
    }
    /// <summary>
    /// 论文的查询扩展
    /// </summary>
    public static class PaperQueryExtension
    {
        /// <summary>
        /// 论文查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<Paper> Query(this IQueryable<Paper> query, PaperQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.GetPaper(queryInformation, user, database);

            //排序
            q = sortQuery(q, queryInformation.SortInfo, database);

            return new QueryResult<Paper>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }

        private static IQueryable<Paper> sortQuery(IQueryable<Paper> query, SortInfo sortInfo, IDatabase database)
        {
            if (sortInfo == null)
                return query.OrderByDescending(p => p.ID);
            else if (sortInfo.Field.EqualIgnoreCase("InfluenceFactorOfPaper"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.InfluenceFactor)
                    : query.OrderByDescending(p => p.InfluenceFactor);
            else if (sortInfo.Field.EqualIgnoreCase("PublishYear"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.PublishDateYear)
                    : query.OrderByDescending(p => p.PublishDateYear);
            else if (sortInfo.Field.EqualIgnoreCase("CollegeName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.College.Name)
                    : query.OrderByDescending(p => p.College.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Name)
                    : query.OrderByDescending(p => p.Name);
            else if (sortInfo.Field.EqualIgnoreCase("FullName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Magazine.FullName)
                    : query.OrderByDescending(p => p.Magazine.FullName);
            else if (sortInfo.Field.EqualIgnoreCase("Type"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Type)
                    : query.OrderByDescending(p => p.Type);
            else if (sortInfo.Field.EqualIgnoreCase("CiteFrequencyOfPaper"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.CiteFrequency)
                    : query.OrderByDescending(p => p.CiteFrequency);
            else if (sortInfo.Field.EqualIgnoreCase("PublishDate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.PublishDate)
                    : query.OrderByDescending(p => p.PublishDate);
            else if (sortInfo.Field.EqualIgnoreCase("DocumentNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.DocumentNumber)
                    : query.OrderByDescending(p => p.DocumentNumber);
            else if (sortInfo.Field.EqualIgnoreCase("Volume"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Volume)
                    : query.OrderByDescending(p => p.Volume);
            else if (sortInfo.Field.EqualIgnoreCase("SubAirer"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.SubAirer)
                    : query.OrderByDescending(p => p.SubAirer);
            else if (sortInfo.Field.EqualIgnoreCase("AuthorKeyWord"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.AuthorKeyWord)
                    : query.OrderByDescending(p => p.AuthorKeyWord);
            else if (sortInfo.Field.EqualIgnoreCase("KeyWord"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.KeyWord)
                    : query.OrderByDescending(p => p.KeyWord);
            else if (sortInfo.Field.EqualIgnoreCase("LinkManAddress"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.LinkManAddress)
                    : query.OrderByDescending(p => p.LinkManAddress);
            else if (sortInfo.Field.EqualIgnoreCase("LinkManSignUnit"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.LinkManSignUnit)
                    : query.OrderByDescending(p => p.LinkManSignUnit);
            else if (sortInfo.Field.EqualIgnoreCase("FirstAuthorSignUnit"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.FirstAuthorSignUnit)
                    : query.OrderByDescending(p => p.FirstAuthorSignUnit);
            else if (sortInfo.Field.EqualIgnoreCase("SignOrder"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.SignOrder)
                    : query.OrderByDescending(p => p.SignOrder);
            else if (sortInfo.Field.EqualIgnoreCase("lab"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Lab)
                    : query.OrderByDescending(p => p.Lab);
            else if (sortInfo.Field.EqualIgnoreCase("IsiUniqueArticleIdentifier"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ISIUniqueArticleIdentifier)
                    : query.OrderByDescending(p => p.ISIUniqueArticleIdentifier);
            else if (sortInfo.Field.EqualIgnoreCase("Pages"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Pages)
                    : query.OrderByDescending(p => p.Pages);
            //else if (sortInfo.Field.EqualIgnoreCase("linkManName"))
            //    return sortInfo.Direction == SortDirection.ASC
            //        ? query.OrderBy(p => p.GetPaperAuthorLink().Name)
            //        : query.OrderByDescending(p => p.Lab);
            //else if (sortInfo.Field.EqualIgnoreCase("firstAuthorName"))
            //    return sortInfo.Direction == SortDirection.ASC
            //        ? query.OrderBy(p => p.ISIUniqueArticleIdentifier)
            //       : query.OrderByDescending(p => p.ISIUniqueArticleIdentifier);
            else
                return query.OrderByDescending(p => p.ID);
        }
        /// <summary>
        /// 取得论文的查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Paper> GetPaper(this IQueryable<Paper> query, PaperQueryInformation queryInformation, User user, IDatabase database)
        {
            var q = query;
            q = q.Intersect(query.getPaper(queryInformation, user, database));

            if (queryInformation.Basic != null)
                q = q.Intersect(query.getPaper(queryInformation.Basic, database));
            if (queryInformation.Indexed != null)
                q = q.Intersect(query.getPaper(queryInformation.Indexed, database));
            if (queryInformation.Author != null)
                q = q.Intersect(database.PaperAuthors.getPaper(queryInformation.Author));
            if (queryInformation.Magazine != null)
                q = q.Intersect(query.getPaper(queryInformation.Magazine, database));


            return q;
        }
        private static IQueryable<Paper> getPaper(this IQueryable<Paper> query, PaperQueryInformation queryInformation, User user, IDatabase database)
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
                return database.PaperAuthors.Where(q => q.Expert.UserID == user.ID).Select(q => q.Paper).Distinct();

            return query.Where(q => false);
        }
        private static IQueryable<Paper> getPaper(this IQueryable<Paper> query, PaperQueryInformation_Basic queryInformation, IDatabase database)
        {
            if (queryInformation.Name != null) queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name)) query = query.Where(q => q.Name.Contains(queryInformation.Name));

            if (queryInformation.PaoerKeyWord != null) queryInformation.PaoerKeyWord = queryInformation.PaoerKeyWord.Trim();
            if (!string.IsNullOrEmpty(queryInformation.PaoerKeyWord)) query = query.Where(q => q.KeyWord.Contains(queryInformation.PaoerKeyWord));


            if (queryInformation.Type != null && queryInformation.Type.Length != 0)
                query = query.Where(q => queryInformation.Type.Contains(q.Type));

            if (queryInformation.PulishDateTimeYear != null)
            {
                if (queryInformation.PulishDateTimeYear.Start.HasValue)
                    query = query.Where(q => q.PublishDateYear >= queryInformation.PulishDateTimeYear.Start.Value);
                if (queryInformation.PulishDateTimeYear.End.HasValue)
                    query = query.Where(q => q.PublishDateYear <= queryInformation.PulishDateTimeYear.End.Value);
            }

            if (queryInformation.InfluenceFactor != null)
            {
                if (queryInformation.InfluenceFactor.Start.HasValue)
                    query = query.Where(q => q.InfluenceFactor >= queryInformation.InfluenceFactor.Start.Value);
                if (queryInformation.InfluenceFactor.End.HasValue)
                    query = query.Where(q => q.InfluenceFactor <= queryInformation.InfluenceFactor.End.Value);
            }
            if (queryInformation.SubAirer != null)
            {
                if (queryInformation.SubAirer.Start.HasValue)
                    query = query.Where(q => q.SubAirer >= queryInformation.SubAirer.Start.Value);
                if (queryInformation.SubAirer.End.HasValue)
                    query = query.Where(q => q.SubAirer <= queryInformation.SubAirer.End.Value);
            }
            if (queryInformation.CiteFrequency != null)
            {
                if (queryInformation.CiteFrequency.Start.HasValue)
                    query = query.Where(q => q.CiteFrequency >= queryInformation.CiteFrequency.Start.Value);
                if (queryInformation.CiteFrequency.End.HasValue)
                    query = query.Where(q => q.CiteFrequency <= queryInformation.CiteFrequency.End.Value);
            }

            if (queryInformation.College != null) queryInformation.College = queryInformation.College.Trim();
            if (!string.IsNullOrEmpty(queryInformation.College))
                query = query.Where(p => p.College.Name == queryInformation.College);

            if (queryInformation.Lab != null) queryInformation.Lab = queryInformation.Lab.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Lab))
                query = query.Where(p => p.Lab == queryInformation.Lab);

            if (queryInformation.IsFistAuthorOrLinkManSignUnit == true && queryInformation.LinkManSingUnit != null && queryInformation.LinkManSingUnit.Length != 0 && queryInformation.FistAuthorSignUnit != null && queryInformation.FistAuthorSignUnit.Length != 0)
                query = query.Where(q => queryInformation.LinkManSingUnit.Contains(q.LinkManSignUnit) || queryInformation.FistAuthorSignUnit.Contains(q.FirstAuthorSignUnit));
            else
            {
                if (queryInformation.LinkManSingUnit != null && queryInformation.LinkManSingUnit.Length != 0)
                    query = query.Where(q => queryInformation.LinkManSingUnit.Contains(q.LinkManSignUnit));

                if (queryInformation.FistAuthorSignUnit != null && queryInformation.FistAuthorSignUnit.Length != 0)
                    query = query.Where(p => queryInformation.FistAuthorSignUnit.Contains(p.FirstAuthorSignUnit));
            }
            return query;
        }
        private static IQueryable<Paper> getPaper(this IQueryable<Paper> query, PaperQueryInformation_Indexed queryInformation, IDatabase database)
        {
            if (queryInformation.Indexed != null && queryInformation.Indexed.Length != 0)
                query = database.PaperIndexeds.Where(p => queryInformation.Indexed.Contains(p.Indexed)).Select(p => p.Paper);
            return query;
        }
        private static IQueryable<Paper> getPaper(this IQueryable<PaperAuthor> authorQuery, PaperQueryInformation_Author queryInformation)
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

            return q.Select(p => p.Paper).Distinct();
        }
        private static IQueryable<PaperAuthor> getPaperAuthor(this IQueryable<PaperAuthor> authorquery, ExpertQueryInformation_Basic queryInformation)
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
        private static IQueryable<Paper> getPaper(this IQueryable<Paper> query, PaperQueryInformation_Magazine queryInformation, IDatabase database)
        {
            if (queryInformation.MagazineBasic != null)
            {
                if (queryInformation.MagazineBasic.Name != null) queryInformation.MagazineBasic.Name = queryInformation.MagazineBasic.Name.Trim();
                if (!string.IsNullOrEmpty(queryInformation.MagazineBasic.Name)) query = query.Where(q => q.Magazine.FullName.Contains(queryInformation.MagazineBasic.Name));

                if (queryInformation.MagazineBasic.Names != null && queryInformation.MagazineBasic.Names.Length != 0)
                    query = query.Where(q => queryInformation.MagazineBasic.Names.Contains(q.Magazine.ShortName));
                if (queryInformation.MagazineBasic.Language != null && queryInformation.MagazineBasic.Language.Length != 0)
                    query = query.Where(q => queryInformation.MagazineBasic.Language.Contains(q.Magazine.Language));

                if (queryInformation.MagazineBasic.ISSN != null) queryInformation.MagazineBasic.ISSN = queryInformation.MagazineBasic.ISSN.Trim();
                if (!string.IsNullOrEmpty(queryInformation.MagazineBasic.ISSN)) query = query.Where(q => q.Magazine.ISSN.Equals(queryInformation.MagazineBasic.ISSN));

            }
            IList<Magazine> magazines = database.Magazines.ToList();
            if (queryInformation.SubjectClass != null)
            {
                if (queryInformation.SubjectClass.SubjectClass != null && queryInformation.SubjectClass.SubjectClass.Length != 0)
                {
                    magazines = database.MagazineSubjectClasses.Where(q => queryInformation.SubjectClass.SubjectClass.Contains(q.SubjectClass)).Select(q => q.Magazine).Distinct().ToList();
                    query = query.Where(q => magazines.AsEnumerable().Contains(q.Magazine));
                }
            }
            return query;
        }
        /// <summary>
        /// 查询杂志
        /// </summary>
        /// <param name="query"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static IList<Magazine> SearchMagazine(this IQueryable<Magazine> query, string param)
        {
            if (param != null) param = param.Trim();

            return query
                .Where(m => m.ISSN.StartsWith(param)
                    || m.FullName.StartsWith(param)
                        || m.ShortName.StartsWith(param))
                .ToList();
        }
        /// <summary>
        /// 取得论文所属的学院集合
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<Department> GetPaperColleges(this IQueryable<Paper> query)
        {
            return query
                .Select(q => q.College)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 取得所属实验室
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetLabs(this IQueryable<Paper> query)
        {
            return query
                .Select(p => p.Lab)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 取得某年发表于某一杂志的论文
        /// </summary>
        /// <param name="query"></param>
        /// <param name="magazineID"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public static IList<Paper> GetPapersByMagazineAndYear(this IQueryable<Paper> query, int magazineID, int? year)
        {
            IList<Paper> papers = new List<Paper>() { };
            if (year.HasValue)
                papers = query.Where(p => p.MagazineID == magazineID && p.PublishDateYear.HasValue && p.PublishDateYear.Value == year.Value).ToList();
            return papers;
        }
    }
    /// <summary>
    /// 论文的权限扩展
    /// </summary>
    public static class PaperPermissionExtension
    {
        /// <summary>
        /// 管理员是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPaper(this User user, IDatabase database)
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
        public static bool HasPermission_Show(this User user, Paper paper, IDatabase database)
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
        public static bool CanShow(this User user, Paper paper, IDatabase database)
        {
            return user.HasPermission_Show(paper, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑该论文的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, Paper paper, IDatabase database)
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
        public static bool CanEdit(this User user, Paper paper, IDatabase database)
        {
            return user.HasPermission_Edit(paper, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑该论文作者的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="paper"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPaperAuthor(this User user, Paper paper, IDatabase database)
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
        public static bool CanEditPaperAuthor(this User user, Paper paper, IDatabase database)
        {
            return user.HasPermission_EditPaperAuthor(paper, database);
        }
    }
}
