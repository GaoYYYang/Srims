using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志
    /// </summary>
    public partial class Magazine : Entity<Magazine>
    {
        /// <summary>
        /// 杂志全称
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return this.FullName;
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
        public static LogDescriptionItem[] GetMagazineDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "FullName", Title = "全称" });
            list.Add(new LogDescriptionItem { Name = "ShortName", Title = "简称" });
            list.Add(new LogDescriptionItem { Name = "ISSN", Title = "ISSN" });
            list.Add(new LogDescriptionItem { Name = "SubjectRank", Title = "学科等级" });
            list.Add(new LogDescriptionItem { Name = "PublishType", Title = "出版类型" });
            list.Add(new LogDescriptionItem { Name = "Language", Title = "语种" });
            list.Add(new LogDescriptionItem { Name = "PublishCompany", Title = "出版社" });
            list.Add(new LogDescriptionItem { Name = "PublishCompanyAddress", Title = "出版社地址" });
            list.Add(new LogDescriptionItem { Name = "PublishCompanyCity", Title = "出版社所在城市" });
            list.Add(new LogDescriptionItem { Name = "IsDelete", Title = "是否删除" });

            return list.ToArray();
        }
        /// <summary>
        /// 获取该杂志对应的信息
        /// </summary>
        /// <param name="magazineInformationQuery"></param>
        /// <returns></returns>
        public IList<MagazineInformation> GetMagazineInformations(IQueryable<MagazineInformation> magazineInformationQuery)
        {
            if (magazineInformationQuery == null)
                throw new ArgumentNullException("magazineInformationQuery");

            return magazineInformationQuery.Where(mq => mq.MagazineID == _ID).OrderBy(q => q.Year).ToList();
        }
        /// <summary>
        /// 取得杂志某一年的影响因子
        /// </summary>
        /// <param name="query"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public int? GetMagazineFactorByYear(IQueryable<MagazineInformation> query, int year)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            var magazineInformation = query.SingleOrDefault(q => q.MagazineID == _ID && q.Year == year);

            if (magazineInformation == null)
                return null;

            return magazineInformation.InfluenceFactor;
        }
        /// <summary>
        /// 取得杂志对应的学科分类
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<MagazineSubjectClass> GetSubjectClass(IQueryable<MagazineSubjectClass> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.MagazineID == _ID).ToList();
        }
        /// <summary>
        ///  取得杂志对应的论文
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Paper> GetPapers(IQueryable<Paper> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.Magazine == this).ToList();
        }
        /// <summary>
        /// 取得杂志的学科分类名称
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<string> GetSubjectClasses(IQueryable<MagazineSubjectClass> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.MagazineID == _ID).Select(q => q.SubjectClass).ToList();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_FullName), "全名不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_ISSN), "ISSN不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Language.ToString()), "语种不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_IsDelete.ToString()), "是否已删除不能为空");

        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                //foreach (var magazineInformation in GetMagazineInformations(database.MagazineInformations))
                //    magazineInformation.Delete(database);
                //foreach (var magazineSubjectClasse in GetSubjectClass(database.MagazineSubjectClasses))
                //    magazineSubjectClasse.Delete(database);
                //foreach (var paper in GetPapers(database.Papers))
                //    paper.Magazine = null;

                //base.DeleteAction(database);
                this.IsDelete = true;
                this.Save(database);
                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 杂志的业务扩展
    /// </summary>
    public static class MagazineBusinessExtension
    {
    }
    /// <summary>
    /// 杂志的查询扩展
    /// </summary>
    public static class MagazineQueryExtension
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="magazineQueryInformation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<Magazine> Query(this IQueryable<Magazine> query, MagazineQueryInformation magazineQueryInformation, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (magazineQueryInformation == null)
                throw new ArgumentNullException("magazineQueryInformation");

            var q = query.GetMagazine(magazineQueryInformation, database);
            q = q.Where(m => !m.IsDelete);

            //排序
            q = sortQuery(q, magazineQueryInformation.SortInfo);


            return new QueryResult<Magazine>(q.ToList().Distinct().Skip(magazineQueryInformation.Start).Take(magazineQueryInformation.Limit).ToList(), q.Count());
        }

        private static IQueryable<Magazine> sortQuery(IQueryable<Magazine> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query.OrderByDescending(p => p.ID);
            else if (sortInfo.Field.EqualIgnoreCase("FullName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.FullName)
                    : query.OrderByDescending(p => p.FullName);
            else if (sortInfo.Field.EqualIgnoreCase("ISSN"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ISSN)
                    : query.OrderByDescending(p => p.ISSN);
            else if (sortInfo.Field.EqualIgnoreCase("Language"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Language)
                    : query.OrderByDescending(p => p.Language);
            else if (sortInfo.Field.EqualIgnoreCase("SubjectRank"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.SubjectRank)
                    : query.OrderByDescending(p => p.SubjectRank);
            else if (sortInfo.Field.EqualIgnoreCase("ShortName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ShortName)
                    : query.OrderByDescending(p => p.ShortName);
            else if (sortInfo.Field.EqualIgnoreCase("IsDelete"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.IsDelete)
                    : query.OrderByDescending(p => p.IsDelete);
            else if (sortInfo.Field.EqualIgnoreCase("publishCompany"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.PublishCompany)
                    : query.OrderByDescending(p => p.PublishCompany);
            else if (sortInfo.Field.EqualIgnoreCase("publishType"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.PublishType)
                    : query.OrderByDescending(p => p.PublishType);
            else
                return query.OrderByDescending(p => p.ID);
        }
        /// <summary>
        /// 取得查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="magazineQueryInformation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Magazine> GetMagazine(this IQueryable<Magazine> query, MagazineQueryInformation magazineQueryInformation, IDatabase database)
        {
            var q = query;

            if (magazineQueryInformation.Basic != null)
                q = q.Intersect(query.getMagazine(magazineQueryInformation.Basic));
            if (magazineQueryInformation.Infor != null)
                q = q.Intersect(query.getMagazine(database.MagazineInformations, magazineQueryInformation.Infor));
            if (magazineQueryInformation.SubjectClass != null)
                q = q.Intersect(query.getMagazine(database.MagazineSubjectClasses, magazineQueryInformation.SubjectClass));

            q = q.Where(qu => qu.IsDelete == false);
            return q;
        }
        private static IQueryable<Magazine> getMagazine(this IQueryable<Magazine> query, MagazineQueryInformation_Basic queryInformation)
        {

            if (queryInformation.Name != null) queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name))
                query = query.Where(q => q.FullName.StartsWith(queryInformation.Name) || q.ShortName.StartsWith(queryInformation.Name));

            if (queryInformation.ISSN != null) queryInformation.ISSN = queryInformation.ISSN.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ISSN))
                query = query.Where(q => q.ISSN.Contains(queryInformation.ISSN));

            if (queryInformation.Language != null && queryInformation.Language.Length != 0)
                query = query.Where(q => queryInformation.Language.Contains(q.Language));

            if (queryInformation.SubjectRank != null && queryInformation.SubjectRank.Length != 0)
                query = query.Where(q => queryInformation.SubjectRank.Contains(q.SubjectRank));

            return query;
        }
        private static IQueryable<Magazine> getMagazine(this IQueryable<Magazine> query, IQueryable<MagazineInformation> informatonQuery, MagazineQueryInformation_Infor queryInformation)
        {
            if (informatonQuery != null)
            {
                bool hasQueryCondation = false;
                if (queryInformation.Year != null)
                {
                    hasQueryCondation = true;
                    informatonQuery = informatonQuery.Where(m => m.Year == queryInformation.Year);
                }
                if (queryInformation.InfluenceFactor != null)
                {
                    hasQueryCondation = true;
                    if (queryInformation.InfluenceFactor.Start.HasValue)
                        informatonQuery = informatonQuery.Where(m => m.InfluenceFactor >= queryInformation.InfluenceFactor.Start);
                    if (queryInformation.InfluenceFactor.End.HasValue)
                        informatonQuery = informatonQuery.Where(m => m.InfluenceFactor <= queryInformation.InfluenceFactor.End);
                }
                if (queryInformation.CiteFrequency != null)
                {
                    hasQueryCondation = true;
                    if (queryInformation.CiteFrequency.Start.HasValue)
                        informatonQuery = informatonQuery.Where(m => m.CiteFrequency >= queryInformation.CiteFrequency.Start);
                    if (queryInformation.CiteFrequency.End.HasValue)
                        informatonQuery = informatonQuery.Where(m => m.CiteFrequency <= queryInformation.CiteFrequency.End);

                }
                if (queryInformation.SubAirer != null)
                {
                    hasQueryCondation = true;
                    if (queryInformation.SubAirer.Start.HasValue)
                        informatonQuery = informatonQuery.Where(m => m.SubAirer >= queryInformation.SubAirer.Start);
                    if (queryInformation.SubAirer.End.HasValue)
                        informatonQuery = informatonQuery.Where(m => m.SubAirer <= queryInformation.SubAirer.End);
                }
                if (hasQueryCondation)
                    query = informatonQuery.Select(m => m.Magazine);
            }
            return query;
        }
        private static IQueryable<Magazine> getMagazine(this IQueryable<Magazine> query, IQueryable<MagazineSubjectClass> subjectClassQuery, MagazineQueryInformation_SubjectClass queryInformation)
        {
            if (subjectClassQuery != null)
            {
                if (queryInformation.SubjectClass != null && queryInformation.SubjectClass.Length != 0)
                {
                    subjectClassQuery = subjectClassQuery.Where(ms => queryInformation.SubjectClass.Contains(ms.SubjectClass));
                    query = query.Intersect(subjectClassQuery.Select(ms => ms.Magazine));
                }
            }
            return query;
        }
        /// <summary>
        /// 取得学科等级
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetSubjectRank(this IQueryable<Magazine> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(q => q.SubjectRank).Where(s => s != null).Distinct().OrderBy(p => p).ToList();
        }
    }
    /// <summary>
    /// 杂志的权限扩展
    /// </summary>
    public static class MagazinePermissionExtension
    {
        /// <summary>
        /// 用户是否有查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowMagazine(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePaper, database);
        }
        /// <summary>
        /// 用户是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditMagazine(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePaper, database);
        }
        /// <summary>
        /// 用户能够察看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowMagazine(this User user, IDatabase database)
        {
            return user.HasPermission_ShowMagazine(database);
        }
        /// <summary>
        /// 用户能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditMagazine(this User user, IDatabase database)
        {
            return user.HasPermission_EditMagazine(database);
        }
        /// <summary>
        /// 用户是否有察看年度信息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowMagazineInformation(this User user, IDatabase database)
        {
            return user.HasPermission_ShowMagazine(database);
        }
        /// <summary>
        /// 用户能够察看年度信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow_MagazineInformation(this User user, IDatabase database)
        {
            return user.HasPermission_ShowMagazineInformation(database);
        }
        /// <summary>
        /// 用户是否有编辑年度信息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditMagazineInformation(this User user, IDatabase database)
        {
            return user.HasPermission_EditMagazine(database);
        }
        /// <summary>
        /// 用户能够编辑年度信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit_MagazineInformation(this User user, IDatabase database)
        {
            return user.HasPermission_EditMagazine(database);
        }
        /// <summary>
        /// 用户是否有编辑任职信息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditMagazineOccupation(this User user, IDatabase database)
        {
            return user.HasPermission_EditMagazine(database);
        }
        /// <summary>
        /// 用户能够编辑任职信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit_MagazineOccupation(this User user, IDatabase database)
        {
            return user.HasPermission_EditMagazine(database);
        }
    }
}
