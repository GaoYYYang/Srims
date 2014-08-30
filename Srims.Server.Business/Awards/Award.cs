using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Awards
{
    /// <summary>
    /// 获奖情况
    /// </summary>
    public partial class Award : Entity<Award>
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
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "Name", Title = "奖励名称" });
            list.Add(new LogDescriptionItem { Name = "Year", Title = "获奖年度" });
            list.Add(new LogDescriptionItem { Name = "Rank", Title = "奖励级别" });
            list.Add(new LogDescriptionItem { Name = "FirstWinnerID", Title = "第一获奖人的ID" });
            list.Add(new LogDescriptionItem { Name = "Class", Title = "奖励等级" });
            list.Add(new LogDescriptionItem { Name = "AttendType", Title = "参与类型" });
            list.Add(new LogDescriptionItem { Name = "Project", Title = "奖励项目名称" });
            list.Add(new LogDescriptionItem { Name = "Introduction", Title = "简介" });
            list.Add(new LogDescriptionItem { Name = "AuthorisedUnit", Title = "授奖单位" });
            list.Add(new LogDescriptionItem { Name = "Classification", Title = "获奖种类" });
            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });

            return list.ToArray();
        }
        /// <summary>
        /// 取得奖项获奖人的数目
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int AwardWinnerCount(IQueryable<AwardWinner> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            return query.Count(q => q.AwardID == _ID);
        }
        /// <summary>
        /// 取得奖项对应的获奖人
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<AwardWinner> GetAwardWinners(IQueryable<AwardWinner> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            return query.Where(q => q.AwardID == _ID).OrderBy(q => q.Order).ToList();
        }
        /// <summary>
        /// 取得奖项的第一获奖人
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public AwardWinner GetFirstWinner(IQueryable<AwardWinner> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.AwardID == _ID && q.Order == 1);
        }
        /// <summary>
        /// 判断用户是否是获奖人
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool IsWinner(IQueryable<AwardWinner> query, User user)
        {
            var winners = GetAwardWinners(query);

            return winners
                .Where(aw => aw.ExpertID.HasValue)
                .Select(aw => aw.Expert)
                .Select(e => e.User)
                .Contains(user);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name.Trim()), "奖项的名称不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_AttendType), "奖项的参与类型不能为空");
            validater.AddCondition(this.SubjectNature != SubjectNature.Unknown, "奖励的学科分类(文理）不能为空");
        }
    }

    /// <summary>
    /// 获奖情况的业务扩展
    /// </summary>
    public static class AwardBusinessExtension
    {
        /// <summary>
        /// 取得项目的级别
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetRanks(this IQueryable<Award> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(p => p.Rank).Where(a => a != null).Distinct().ToList();
        }
        /// <summary>
        /// 取得参与类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetAttendTypes(this IQueryable<Award> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            return query.Select(p => p.AttendType).Where(a => a != null).Distinct().ToList();
        }
        /// <summary>
        /// 取得奖励的等级
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetClasses(this IQueryable<Award> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(p => p.Class).Where(a => a != null).Distinct().ToList();
        }

        /// <summary>
        /// 取得数据库中所有的获奖类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetClassification(this IQueryable<Award> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(p => p.Classification).Where(a => a != null).Distinct().ToList();
        }
        /// <summary>
        /// 取得授奖单位
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetAuthorUnit(this IQueryable<Award> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(p => p.AuthorisedUnit).Where(a => a != null).Distinct().ToList();
        }

        /// <summary>
        /// 取得含有关键字的奖励名称
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyWord"></param>
        /// <returns></returns>
        public static IList<string> SearchAwardName(this IQueryable<Award> query, string keyWord)
        {
            if (keyWord != null) keyWord = keyWord.Trim();

            return query
                .Where(n => n.Name.StartsWith(keyWord)).Select(a => a.Name)
                .ToList();
        }


    }
    /// <summary>
    /// 获奖情况的查询扩展
    /// </summary>
    public static class AwardQueryExtension
    {
        /// <summary>
        /// 奖励查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user">当前用户</param>
        /// <param name="database">数据库</param>
        /// <returns></returns>
        public static QueryResult<Award> Query(this IQueryable<Award> query, AwardQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            if (user == null)
                throw new ArgumentNullException("user");

            //查询
            var awardquery = query.GetAward(queryInformation, user, database);

            //排序            
            awardquery = sortQuery(awardquery, queryInformation);

            //构造查询结果
            int total = awardquery.Count();
            return new QueryResult<Award>(
                awardquery.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                total);
        }
        /// <summary>
        /// 奖励查询结果的排序处理
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Award> sortQuery(IQueryable<Award> query, AwardQueryInformation queryInformation)
        {
            SortInfo sortInfo = queryInformation.SortInfo;

            if (sortInfo == null)
                return query.OrderByDescending(p => p.ID);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Name)
                    : query.OrderByDescending(p => p.Name);
            else if (sortInfo.Field.EqualIgnoreCase("AttendType"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.AttendType)
                    : query.OrderByDescending(p => p.AttendType);
            else if (sortInfo.Field.EqualIgnoreCase("ProjectName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Project)
                    : query.OrderByDescending(p => p.Project);
            else if (sortInfo.Field.EqualIgnoreCase("Classification"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Classification)
                    : query.OrderByDescending(p => p.Classification);
            else if (sortInfo.Field.EqualIgnoreCase("AuthorisedUnit"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.AuthorisedUnit)
                    : query.OrderByDescending(p => p.AuthorisedUnit);
            else if (sortInfo.Field.EqualIgnoreCase("Rank"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Rank)
                    : query.OrderByDescending(p => p.Rank);
            else if (sortInfo.Field.EqualIgnoreCase("Year"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Year)
                    : query.OrderByDescending(p => p.Year);
            else if (sortInfo.Field.EqualIgnoreCase("ID"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ID)
                    : query.OrderByDescending(p => p.ID);

            else
                return query.OrderByDescending(p => p.ID);
        }
        /// <summary>
        /// 奖励查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Award> GetAward(this IQueryable<Award> query, AwardQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryinformation");

            var q = query;

            q = q.Intersect(query.getAwardByUserPower(user, database));

            if (queryInformation.BasicInformation != null)
                q = q.Intersect(query.getAwardByBasicInformation(queryInformation.BasicInformation));
            if (queryInformation.WinnerInformation != null)
                q = q.Intersect(database.AwardWinners.getAwardByAwardWinnerInformation(queryInformation.WinnerInformation));

            return q;
        }
        /// <summary>
        /// 根据用户权限取得相应的奖励
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user">用户</param>      
        /// <param name="database">数据库</param>
        /// <returns></returns>
        private static IQueryable<Award> getAwardByUserPower(this IQueryable<Award> query, User user, IDatabase database)
        {
            if (user == null)
                return query;

            if (user.HasPermission(PermissionItem.ManageLiteralAward, database) || user.HasPermission(PermissionItem.ManageScienceAward, database))
            {
                if (user.HasPermission(PermissionItem.ManageLiteralAward, database) && user.HasPermission(PermissionItem.ManageScienceAward, database))
                    return query;

                if (user.HasPermission(PermissionItem.ManageScienceAward, database))
                    return query.Where(aw => aw.SubjectNature == SubjectNature.Science);

                if (user.HasPermission(PermissionItem.ManageLiteralAward, database))
                    return query.Where(aw => aw.SubjectNature == SubjectNature.Liberal);

            }

            if (user.IsCollegeManagerOf(PermissionItem.ManageLiteralAward, database) || user.IsCollegeManagerOf(PermissionItem.ManageScienceAward, database))
            {
                var collegesID = new List<int>();
                if (user.IsCollegeManagerOf(PermissionItem.ManageLiteralAward, database))
                    collegesID = user.GetCanManageCollegesID(PermissionItem.ManageLiteralAward, database);

                if (user.IsCollegeManagerOf(PermissionItem.ManageScienceAward, database))
                    collegesID = collegesID.Union(user.GetCanManageCollegesID(PermissionItem.ManageScienceAward, database)).ToList();

                return query.Where(q => q.FirstWinner != null && q.FirstWinner.ExpertID.HasValue && collegesID.Contains(q.FirstWinner.Expert.CollegeID.Value));
            }
            if (user.IsExpert)
                return database.AwardWinners.Where(q => q.Expert.UserID == user.ID).Select(q => q.Award).Distinct();

            return query.Where(q => false);
        }
        /// <summary>
        /// 根据奖励的基本查询信息取得奖励
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation">奖励的基本查询信息</param>
        /// <returns></returns>
        private static IQueryable<Award> getAwardByBasicInformation(this IQueryable<Award> query, AwardQueryInformation_Basic queryInformation)
        {
            var q = query;

            if (queryInformation.AttendType != null && queryInformation.AttendType.Length != 0)
                q = q.Where(p => queryInformation.AttendType.Contains(p.AttendType));

            if (queryInformation.Classification != null && queryInformation.Classification.Length != 0)
                q = q.Where(p => queryInformation.Classification.Contains(p.Classification));

            if (queryInformation.Classes != null && queryInformation.Classes.Length != 0)
                q = q.Where(p => queryInformation.Classes.Contains(p.Class));

            if (queryInformation.Ranks != null && queryInformation.Ranks.Length != 0)
                q = q.Where(p => queryInformation.Ranks.Contains(p.Rank));

            if (queryInformation.AuthorisedUnit != null && queryInformation.AuthorisedUnit.Length != 0)
                q = q.Where(p => queryInformation.AuthorisedUnit.Contains(p.AuthorisedUnit));

            if (queryInformation.Year != null)
            {
                if (queryInformation.Year.Start.HasValue)
                    q = q.Where(p => p.Year >= queryInformation.Year.Start.Value);
                if (queryInformation.Year.End.HasValue)
                    q = q.Where(p => p.Year <= queryInformation.Year.End.Value);
            }

            if (queryInformation.Name != null)
                queryInformation.Name = queryInformation.Name.Trim();
            if (!String.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(p => p.Name.Contains(queryInformation.Name));

            if (queryInformation.ProjectName != null)
                queryInformation.ProjectName = queryInformation.ProjectName.Trim();
            if (!String.IsNullOrEmpty(queryInformation.ProjectName))
                q = q.Where(p => p.Project.Contains(queryInformation.ProjectName));

            if (queryInformation.CollegeName != null)
                queryInformation.CollegeName = queryInformation.CollegeName.Trim();
            if (!String.IsNullOrEmpty(queryInformation.CollegeName))
                q = q.Where(p => p.College.Name == queryInformation.CollegeName);

            var subjectNature = queryInformation.AwardSubjectNature;
            if (subjectNature != SubjectNature.Unknown)
                q = q.Where(p => subjectNature == p.SubjectNature);

            return q;
        }
        private static IQueryable<Award> getAwardByAwardWinnerInformation(this IQueryable<AwardWinner> query, AwardQueryInformation_Winner queryInformation)
        {
            var q = query;

            if (queryInformation.AwardWinnerName != null) queryInformation.AwardWinnerName = queryInformation.AwardWinnerName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.AwardWinnerName))
                q = q.Where(aw => aw.Name.Equals(queryInformation.AwardWinnerName) || aw.Expert.NameSpell.Equals(queryInformation.AwardWinnerName));

            if (queryInformation.AwardWinnerOrder.HasValue)
                q = q.Where(aw => aw.Order == queryInformation.AwardWinnerOrder);

            if (queryInformation.WinnerQueryInformation != null)
                q = q.Intersect(q.getAwardWinner(queryInformation.WinnerQueryInformation));



            return q.Select(a => a.Award).Distinct();
        }
        private static IQueryable<AwardWinner> getAwardWinner(this IQueryable<AwardWinner> query, ExpertQueryInformation_Basic queryInformation)
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
            {
                q = q.Where(a => queryInformation.ExpertCollege == a.Expert.College.Name && a.Order == 1);
            }

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

    }
    /// <summary>
    /// 获奖情况的权限扩展
    /// </summary>
    public static class AwardPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有上传奖励文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_UploadAwardDocument(this User user, Award award, IDatabase database)
        {
            if (user.IsExpert)
                return award.IsWinner(database.AwardWinners, user);

            if (award.SubjectNature == SubjectNature.Science)
                return user.HasPermission(PermissionItem.ManageScienceAward, database);

            return user.HasPermission(PermissionItem.ManageLiteralAward, database);

        }
        /// <summary>
        /// 判断用户是否能够上传奖励文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanUploadAwardDocument(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_UploadAwardDocument(award, database);
        }
        /// <summary>
        /// 判断用户是否具有查看奖励文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowAwardDocument(this User user, Award award, IDatabase database)
        {
            if (user.IsExpert)
                return award.IsWinner(database.AwardWinners, user);

            if (award.SubjectNature == SubjectNature.Science)
                return user.HasPermission(PermissionItem.ManageScienceAward, database);

            return user.HasPermission(PermissionItem.ManageLiteralAward, database);

        }
        /// <summary>
        /// 判断用户是否能够查看奖励文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowAwardDocument(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_ShowAwardDocument(award, database);
        }
        /// <summary>
        /// 判断用户是否具有查看该奖励的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowAward(this User user, Award award, IDatabase database)
        {
            if (user.IsExpert)
                return award.IsWinner(database.AwardWinners, user);

            if (award.SubjectNature == SubjectNature.Science)
                return user.HasPermission(PermissionItem.ManageScienceAward, database);

            if (award.SubjectNature == SubjectNature.Liberal)
                return user.HasPermission(PermissionItem.ManageLiteralAward, database);

            if (user.IsCollegeManagerOf(PermissionItem.ManageScienceAward, database) || user.IsCollegeManagerOf(PermissionItem.ManageLiteralAward, database))
            {
                var collegesID = new List<int>();
                if (user.IsCollegeManagerOf(PermissionItem.ManageLiteralAward, database))
                    collegesID = user.GetCanManageCollegesID(PermissionItem.ManageLiteralAward, database);

                if (user.IsCollegeManagerOf(PermissionItem.ManageScienceAward, database))
                    collegesID = collegesID.Union(user.GetCanManageCollegesID(PermissionItem.ManageScienceAward, database)).ToList();

                AwardWinner winner = award.FirstWinner;
                if (winner != null)
                    return winner.ExpertID.HasValue && collegesID.Contains(winner.Expert.CollegeID.Value);
                else
                    return false;
            }

            return false;
        }
        /// <summary>
        /// 判断用户是否具有编辑该奖励的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditAward(this User user, Award award, IDatabase database)
        {
            if (award.SubjectNature == SubjectNature.Science)
                return user.HasPermission(PermissionItem.ManageScienceAward, database);

            return user.HasPermission(PermissionItem.ManageLiteralAward, database);
        }
        /// <summary>
        /// 判断用户是否具有新建奖励的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_NewAward(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageScienceAward, database)
                || user.HasPermission(PermissionItem.ManageLiteralAward, database);
        }
        /// <summary>
        /// 用户能够查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowAward(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_ShowAward(award, database);
        }
        /// <summary>
        ///用户能够编辑 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditAward(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_EditAward(award, database);

        }
    }
}
