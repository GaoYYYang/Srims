using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目级别
    /// </summary>
    public partial class ProjectRank : Entity<ProjectRank>
    {
        /// <summary>
        /// 取得项目级别名称
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return this.Name;
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        public ProjectRank()
        {
            _IsAvailable = true;
        }
        /// <summary>
        ///验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "项目级别名称不能为空。");
        }
    }

    /// <summary>
    /// 项目级别的业务扩展
    /// </summary>
    public static class ProjectRankBusinessExtension
    {
    }
    /// <summary>
    /// 项目级别的查询扩展
    /// </summary>
    public static class ProjectRankQueryExtension
    {
        /// <summary>
        /// 取得项目等级 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetProjectRanks(this IQueryable<ProjectRank> query)
        {
            return query.Where(q => q.IsAvailable).ToList();
        }
        /// <summary>
        /// 取得项目等级
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetProjectRankString(this IQueryable<ProjectRank> query)
        {
            return query.Where(q => q.IsAvailable).Select(q => q.Name).ToList();
        }
        /// <summary>
        /// 取得项目等级
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <returns></returns>
        public static IList<ProjectRank> Get(this IQueryable<ProjectRank> query, bool? isHorizontal)
        {

            return isHorizontal.HasValue ?
                query.Where(pr => pr.IsHorizontal == isHorizontal.Value && pr.IsAvailable).ToList() :
                query.Where(q => q.IsAvailable).ToList();
        }
        /// <summary>
        /// 取得纵向等级
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetVerticalRanksForEdit(this IEntityDataAccess<ProjectRank> query, User user)
        {
            if (user.IsExpert)
                return query.Where(q => !q.IsHorizontal && q.IsAvailable).ToList();

            IDatabase database = query.Database;

            return user.GetCanEditVerticalRanks(database);
        }
        /// <summary>
        /// 取得等级
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetForQuery(this IEntityDataAccess<ProjectRank> query, bool? isHorizontal, User user)
        {
            if (user == null || user.IsExpert)
                return query.Get(isHorizontal).ToList();

            IDatabase database = query.Database;

            if (isHorizontal.HasValue)
                if (!isHorizontal.Value)
                    return user.GetCanShowVerticalRanks(database);
                else
                    return user.GetCanShowHorizontalRanks(database);

            return user.GetCanShowVerticalRanks(database)
                .Union(user.GetCanShowHorizontalRanks(database))
                .ToList();
        }
        /// <summary>
        /// 取得横项目等级
        /// </summary>
        /// <param name="query">项目等级查询</param>
        /// <returns>横向项目等级</returns>
        public static ProjectRank GetHorizontlProjectRank(this IQueryable<ProjectRank> query)
        {
            var projectRankList = query.Where(pr => pr.IsHorizontal).ToList();
            if (projectRankList.Count == 0)
                throw new InvalidDataException("未找到横向项目等级！");
            if (projectRankList.Count > 1)
                throw new InvalidDataException("横向项目等级的数量大于1！");

            return projectRankList.Single();
        }
        /// <summary>
        /// 根据等级名称取得等级
        /// </summary>
        /// <param name="query"></param>
        /// <param name="rankName"></param>
        /// <returns></returns>
        public static ProjectRank GetByName(this IQueryable<ProjectRank> query, string rankName)
        {
            if (string.IsNullOrEmpty(rankName))
                return null;

            return query.SingleOrDefault(q => q.Name == rankName);
        }
    }
    /// <summary>
    /// 项目级别的权限扩展
    /// </summary>
    public static class ProjectRankPermissionExtension
    {
        /// <summary>
        /// 取得用户能够查看的项目纵向等级
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetCanShowVerticalRanks(this User user, IDatabase database)
        {
            return user.GetCanShowVerticalTypes(database)
                .Select(q => q.ProjectRank)
                .Where(q => q.IsAvailable)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 取得用户能够编辑的项目纵向等级
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetCanEditVerticalRanks(this User user, IDatabase database)
        {
            return user.GetCanEditVerticalTypes(database)
                .Select(q => q.ProjectRank)
                .Where(q => q.IsAvailable)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 判断用户能够查看横向项目等级
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetCanShowHorizontalRanks(this User user, IDatabase database)
        {
            return user.GetCanShowHorizontalTypes(database)
                .Select(q => q.ProjectRank)
                .Where(q => q.IsAvailable)
                .Distinct()
                .ToList();

        }
        /// <summary>
        /// 判断用户能否编辑横向项目等级
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectRank> GetCanEditHorizontalRanks(this User user, IDatabase database)
        {
            return user.GetCanEditHorizontalTypes(database)
                .Select(q => q.ProjectRank)
                .Where(q => q.IsAvailable)
                .Distinct()
                .ToList();

        }
        /// <summary>
        /// 判断用户是否具有横向项目的编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditHorizontalProject(this User user, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManageAllHorizontalProject, PermissionOperation.Edit, null, database))
                return true;

            return user.GetRelatePermissionsOf(PermissionItem.ManageHorizontalProjectByType, database)
                .Where(q => q.PermissionOperation == PermissionOperation.Edit)
                .Count() > 0;
        }
        /// <summary>
        /// 判断用户是否具有纵向项目的编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditVerticalProject(this User user, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManageAllVerticalProject, PermissionOperation.Edit, null, database))
                return true;

            return user.GetRelatePermissionsOf(PermissionItem.ManageVerticalProjectByType, database)
                .Where(q => q.PermissionOperation == PermissionOperation.Edit)
                .Count() > 0;
        }
        /// <summary>
        /// 判断用户是否具有横向项目的查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowHorizontalProject(this User user, IDatabase database)
        {
            return user.HasRelatePerssionsOf(PermissionItem.ManageAllHorizontalProject, database)
                || user.HasRelatePerssionsOf(PermissionItem.ManageHorizontalProjectByType, database);

        }
        /// <summary>
        /// 判断是否具有纵向项目的查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowVerticalProject(this User user, IDatabase database)
        {
            return user.HasRelatePerssionsOf(PermissionItem.ManageAllVerticalProject, database)
               || user.HasRelatePerssionsOf(PermissionItem.ManageVerticalProjectByType, database);
        }
        /// <summary>
        /// 判断用户是否具有审核横向项目的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorHorizontalProject(this User user, IDatabase database)
        {
            return user.HasPermission_EditHorizontalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有纵向项目的审核权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorVerticalProject(this User user, IDatabase database)
        {
            return user.HasPermission_EditVerticalProject(database);
        }
    }
}
