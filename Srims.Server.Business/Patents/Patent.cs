using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利
    /// </summary>
    public partial class Patent : Entity<Patent>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得该实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetPatentDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "Name", Title = "专利名称" });
            list.Add(new LogDescriptionItem { Name = "CollegeID", Title = "所属学院的ID" });
            list.Add(new LogDescriptionItem { Name = "ApplicationDateTime", Title = "申请时间" });
            list.Add(new LogDescriptionItem { Name = "AuthorizeDateTime", Title = "授权时间" });
            list.Add(new LogDescriptionItem { Name = "LawState", Title = "法律状态" });
            list.Add(new LogDescriptionItem { Name = "LawStateTime", Title = "法律状态时间" });
            list.Add(new LogDescriptionItem { Name = "Country", Title = "国别" });
            list.Add(new LogDescriptionItem { Name = "Category", Title = "专利分类" });
            list.Add(new LogDescriptionItem { Name = "MainCategoryNumber", Title = "主分类号" });
            list.Add(new LogDescriptionItem { Name = "AllCategoryNumber", Title = "全部分类号" });
            list.Add(new LogDescriptionItem { Name = "Type", Title = "类型" });
            list.Add(new LogDescriptionItem { Name = "Level", Title = "级别" });
            list.Add(new LogDescriptionItem { Name = "Introduction", Title = "简介" });
            list.Add(new LogDescriptionItem { Name = "AgencyID", Title = "代理机构的ID" });
            list.Add(new LogDescriptionItem { Name = "Agent", Title = "代理人" });

            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });



            return list.ToArray();
        }
        /// <summary>
        /// 取得或设置专利号
        /// </summary>
        public string Number
        {
            get { return _Number; }
            set
            {
                _Number = String.IsNullOrEmpty(value) ? value : value.Replace('X', 'x');
            }
        }

        /// <summary>
        /// 取得专利发明人的数目
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int PatentInventerCount(IQueryable<PatentInventer> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            return query.Count(q => q.PatentID == _ID);
        }
        /// <summary>
        /// 取得专利对应的发明人
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<PatentInventer> GetPatentIntenvers(IQueryable<PatentInventer> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            return query.Where(q => q.PatentID == _ID).OrderBy(q => q.Order).ToList();
        }
        /// <summary>
        /// 取得专利的负责人
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public PatentInventer GetPatentPrincipal(IQueryable<PatentInventer> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            return query.SingleOrDefault(q => q.PatentID == _ID && q.IsPrincipal == true);
        }
        /// <summary>
        /// 判断用户是否是专利发明人
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool isInventer(IQueryable<PatentInventer> query, User user)
        {
            var inventers = GetPatentIntenvers(query);
            return inventers.Where(i => i.ExpertID.HasValue).Select(i => i.Expert).Select(e => e.User).Contains(user);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name.Trim()), "专利名称不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Number), "专利号不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Type.ToString()), "专利类型不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_LawState.ToString()), "专利法律状态不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Country), "专利国别不能为空");

            validater.AddCondition(ValidatePatentNumber(_Number), "专利号不符合规则");
        }
        /// <summary>
        /// 验证专利号是否有效
        /// </summary>
        /// <param name="patentNumber"></param>
        /// <returns></returns>
        private bool ValidatePatentNumber(string patentNumber)
        {
            //只有中国的验证
            if (this.Country != "中国")
                return true;
            //专利号的长度必须是10位或者是14位
            if (patentNumber.Length != 10 && patentNumber.Length != 14)
                return false;
            //倒数第二位必须是'.'
            if (patentNumber.IndexOf('.') != patentNumber.Length - 2)
                return false;
            //验证最后一位
            return ValidateLastPatentNumber(patentNumber);
        }
        /// <summary>
        /// 验证专利号末位是否有效
        /// </summary>
        /// <param name="patentNumber"></param>
        /// <returns></returns>
        private bool ValidateLastPatentNumber(string patentNumber)
        {
            int validater = 0;
            //专利号为10位的情况
            for (int i = 0; i <= 7; i++)
                validater += Convert.ToInt32(patentNumber.Substring(i, 1)) * (i + 2);
            //专利号为14为的情况
            if (patentNumber.Length == 14)
                for (int i = 8; i <= 11; i++)
                    validater += Convert.ToInt32(patentNumber.Substring(i, 1)) * (i - 6);

            return patentNumber.Substring(patentNumber.Length - 1, 1) == (validater % 11 == 10 ? "x" : (validater % 11).ToString());
        }
    }

    /// <summary>
    /// 专利的业务扩展
    /// </summary>
    public static class PatentBusinessExtension
    {
        /// <summary>
        /// 取得专利的分类
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetCategorys(this IQueryable<Patent> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(p => p.Category).Where(a => a != null).Distinct().ToList();
        }
        /// <summary>
        /// 取得专利所属的国家
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetCountrys(this IQueryable<Patent> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(p => p.Country).Where(a => a != null).Distinct().ToList();
        }
    }
    /// <summary>
    /// 专利的查询扩展
    /// </summary>
    public static class PatentQueryExtension
    {
        /// <summary>
        /// 查询专利
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user">当前用户</param>
        /// <param name="database">数据库</param>
        /// <returns></returns>
        public static QueryResult<Patent> Query(this IQueryable<Patent> query, PatentQueryInformation queryInformation, User user, IDatabase database)
        {

            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            if (user == null)
                throw new ArgumentNullException("user");

            //查询
            var patentquery = query.GetPatent(queryInformation, user, database);
            //排序
            patentquery = sortQuery(patentquery, queryInformation);

            //构造查询结果
            int total = patentquery.Count();
            return new QueryResult<Patent>(patentquery.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), total);
        }
        /// <summary>
        /// 根据查询条件取得查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation">查询条件</param>
        /// <param name="user">当前用户</param>
        /// <param name="database">数据库</param>
        /// <returns></returns>
        public static IQueryable<Patent> GetPatent(this IQueryable<Patent> query, PatentQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryinformation");

            var q = query;
            q = q.Intersect(query.getPatentByUserPower(user, database));

            if (queryInformation.BasicInformation != null)
                q = q.Intersect(query.getPatent(queryInformation.BasicInformation));
            if (queryInformation.InventerInformation != null)
                q = q.Intersect(database.PatentInventers.getPatent(queryInformation.InventerInformation));

            return q;
        }
        /// <summary>
        /// 根据用户权限取得相应的专利
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user">用户</param>      
        /// <param name="database">数据库</param>
        /// <returns></returns>
        private static IQueryable<Patent> getPatentByUserPower(this IQueryable<Patent> query, User user, IDatabase database)
        {
            if (user == null)
                return query;
            if (user.HasPermission(PermissionItem.ManagePatent, database))
                return query;

            if (user.IsCollegeManagerOf(PermissionItem.ManagePatent, database))
            {
                var collegesID = user.GetCanManageCollegesID(PermissionItem.ManagePatent, database);
                return query.Where(q => q.CollegeID.HasValue && collegesID.Contains(q.CollegeID.Value));
            }
            if (user.IsExpert)
                return database.PatentInventers.Where(q => q.Expert.UserID == user.ID).Select(q => q.Patent).Distinct();

            return query.Where(q => false);
        }
        /// <summary>
        /// 根据专利基本信息查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Patent> getPatent(this IQueryable<Patent> query, PatentQueryInformation_Basic queryInformation)
        {
            var q = query;

            if (queryInformation.Name != null)
                queryInformation.Name = queryInformation.Name.Trim();
            if (!String.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(p => p.Name.Contains(queryInformation.Name));

            if (queryInformation.Number != null)
                queryInformation.Number = queryInformation.Number.Trim();
            if (!String.IsNullOrEmpty(queryInformation.Number))
                q = q.Where(p => p.Number.Contains(queryInformation.Number));

            if (queryInformation.IsAccredited.HasValue)
                q = q.Where(p => p.LawState == PatentLawState.Accredit);

            if (queryInformation.Categorys != null && queryInformation.Categorys.Length != 0)
                q = q.Where(p => queryInformation.Categorys.Contains(p.Category));

            if (queryInformation.Countrys != null && queryInformation.Countrys.Length != 0)
                q = q.Where(p => queryInformation.Countrys.Contains(p.Country));

            if (queryInformation.Levels != null && queryInformation.Levels.Length != 0)
                q = q.Where(p => queryInformation.Levels.Contains(p.Level));

            if (queryInformation.Types != null && queryInformation.Types.Length != 0)
                q = q.Where(p => queryInformation.Types.Contains(p.Type));

            if (queryInformation.LawStates != null && queryInformation.LawStates.Length != 0)
                q = q.Where(p => queryInformation.LawStates.Contains(p.LawState));

            if (queryInformation.ApplicationDateTime != null)
            {
                if (queryInformation.ApplicationDateTime.Start.HasValue)
                    q = q.Where(p => p.ApplicationDateTime >= queryInformation.ApplicationDateTime.Start);
                if (queryInformation.ApplicationDateTime.End.HasValue)
                    q = q.Where(p => p.ApplicationDateTime <= queryInformation.ApplicationDateTime.End);
            }

            if (queryInformation.AuthorizeDateTime != null)
            {
                if (queryInformation.AuthorizeDateTime.Start.HasValue)
                    q = q.Where(p => p.AuthorizeDateTime >= queryInformation.AuthorizeDateTime.Start);
                if (queryInformation.AuthorizeDateTime.End.HasValue)
                    q = q.Where(p => p.AuthorizeDateTime <= queryInformation.AuthorizeDateTime.End);
            }

            if (queryInformation.LawStateTime != null)
            {
                if (queryInformation.LawStateTime.Start.HasValue)
                    q = q.Where(p => p.LawStateTime >= queryInformation.LawStateTime.Start);
                if (queryInformation.LawStateTime.End.HasValue)
                    q = q.Where(p => p.LawStateTime <= queryInformation.LawStateTime.End);
            }

            if (queryInformation.CollegeName != null)
                queryInformation.CollegeName = queryInformation.CollegeName.Trim();
            if (!String.IsNullOrEmpty(queryInformation.CollegeName))
                q = q.Where(p => p.College.Name==queryInformation.CollegeName);

            return q;
        }
        /// <summary>
        /// 根据专利发明人信息查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Patent> getPatent(this IQueryable<PatentInventer> query, PatentQueryInformation_Inventer queryInformation)
        {
            var q = query;

            if (queryInformation.PatentInventer != null) queryInformation.PatentInventer = queryInformation.PatentInventer.Trim();
            if (!string.IsNullOrEmpty(queryInformation.PatentInventer))
                q = q.Where(pi => pi.Name.Equals(queryInformation.PatentInventer) || pi.Expert.NameSpell.Equals(queryInformation.PatentInventer));

            if (queryInformation.InventOrder.HasValue)
                q = q.Where(pi => pi.Order == queryInformation.InventOrder);

            if (queryInformation.IsPrincipal.HasValue)
                q = q.Where(p => p.IsPrincipal == queryInformation.IsPrincipal);

            if (queryInformation.AuthorQueryInformation != null)
                q = q.Intersect(q.getPatentInventer(queryInformation.AuthorQueryInformation));

            return q.Select(p => p.Patent).Distinct();
        }
        private static IQueryable<PatentInventer> getPatentInventer(this IQueryable<PatentInventer> query, ExpertQueryInformation_Basic queryInformation)
        {
            var q = query;

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
        private static IQueryable<Patent> sortQuery(IQueryable<Patent> query, PatentQueryInformation queryInformation)
        {
            SortInfo sortInfo = queryInformation.SortInfo;
            if (sortInfo == null)
                return query.OrderByDescending(p => p.ID);

            else if (sortInfo.Field.EqualIgnoreCase("ID"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ID)
                    : query.OrderByDescending(p => p.ID);

            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Name)
                    : query.OrderByDescending(p => p.Name);

            else if (sortInfo.Field.EqualIgnoreCase("Number"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Number)
                    : query.OrderByDescending(p => p.Number);

            else if (sortInfo.Field.EqualIgnoreCase("LawState"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.LawState)
                    : query.OrderByDescending(p => p.LawState);

            else if (sortInfo.Field.EqualIgnoreCase("Type"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Type)
                    : query.OrderByDescending(p => p.Type);

            else if (sortInfo.Field.EqualIgnoreCase("CollegeName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.College.Name)
                    : query.OrderByDescending(p => p.College.Name);

            else if (sortInfo.Field.EqualIgnoreCase("AuthorizeDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.AuthorizeDateTime)
                    : query.OrderByDescending(p => p.AuthorizeDateTime);

            else if (sortInfo.Field.EqualIgnoreCase("LawStateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.LawStateTime)
                    : query.OrderByDescending(p => p.LawStateTime);

            else if (sortInfo.Field.EqualIgnoreCase("Level"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Level)
                    : query.OrderByDescending(p => p.Level);

            else if (sortInfo.Field.EqualIgnoreCase("MainCategoryNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.MainCategoryNumber)
                    : query.OrderByDescending(p => p.MainCategoryNumber);

            else if (sortInfo.Field.EqualIgnoreCase("ApplicationDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ApplicationDateTime)
                    : query.OrderByDescending(p => p.ApplicationDateTime);

            else if (sortInfo.Field.EqualIgnoreCase("Category"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Category)
                    : query.OrderByDescending(p => p.Category);

            else if (sortInfo.Field.EqualIgnoreCase("Country"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Country)
                    : query.OrderByDescending(p => p.Country);

            else
                return query.OrderByDescending(p => p.ID);
        }
    }
    /// <summary>
    /// 专利的权限扩展
    /// </summary>
    public static class PatentPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有查看该专利的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="patent"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowPatent(this User user, Patent patent, IDatabase database)
        {
            if (user.IsExpert)
                return patent.isInventer(database.PatentInventers, user);

            if (user.IsCollegeManagerOf(PermissionItem.ManagePatent, database))
            {
                var collegesID = user.GetCanManageCollegesID(PermissionItem.ManagePatent, database);
                return patent.CollegeID.HasValue && collegesID.Contains(patent.CollegeID.Value);
            }

            if (user.HasPermission(PermissionItem.ManagePatent, database))
                return true;

            return false;
        }
        /// <summary>
        /// 判断用户是否具有编辑该专利的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPatent(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePatent, database);
        }
        /// <summary>
        /// 判断用户是否具有新建专利的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_NewPatent(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePatent, database);
        }
        /// <summary>
        /// 用户能够查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="patent"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowPatent(this User user, Patent patent, IDatabase database)
        {
            return user.HasPermission_ShowPatent(patent, database);
        }
        /// <summary>
        /// 用户能够编辑
        /// </summary>
        public static bool CanEditPatent(this User user, IDatabase database)
        {
            return user.HasPermission_EditPatent(database);
        }
    }
}
