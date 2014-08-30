using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using System.Transactions;
using Srims.Server.Business.Common;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目类别
    /// </summary>
    public partial class ProjectType : Entity<ProjectType>, ICloneable
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

            list.Add(new LogDescriptionItem { Name = "ProjectRankID", Title = "对应级别ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "名称" });
            list.Add(new LogDescriptionItem { Name = "ShortName", Title = "简称" });
            list.Add(new LogDescriptionItem { Name = "Administration", Title = "专管部门" });
            list.Add(new LogDescriptionItem { Name = "Code", Title = "分类代码" });
            list.Add(new LogDescriptionItem { Name = "PerCode", Title = "原来代码" });
            list.Add(new LogDescriptionItem { Name = "BakCode", Title = "分类备用代码" });
            list.Add(new LogDescriptionItem { Name = "ProjectComingFrom", Title = "对应项目来源" });
            list.Add(new LogDescriptionItem { Name = "IsBudget", Title = "是否预算制" });
            list.Add(new LogDescriptionItem { Name = "IsExploit", Title = "是否是同年单账本号" });
            list.Add(new LogDescriptionItem { Name = "OverheadExpenseInRate", Title = "校内管理费率" });
            list.Add(new LogDescriptionItem { Name = "OverheadExpenseOutRate", Title = "外协管理费率" });
            list.Add(new LogDescriptionItem { Name = "IsAvailable", Title = "是否有效" });

            return list.ToArray();
        }
        /// <summary>
        ///构造函数
        /// </summary>
        public ProjectType()
        {
            _IsAvailable = true;
        }
        /// <summary>
        /// 取得或设置名称
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
        /// 取得或设置类别简称
        /// </summary>
        public string ShortName
        {
            get { return string.IsNullOrEmpty(_ShortName) ? _Name : _ShortName; }
            set { _ShortName = value; }
        }

        /// <summary>
        /// 判断该类型是否是横向项目类型
        /// </summary>
        /// <returns></returns>
        public bool IsHorizontalType
        {
            get { return this.ProjectRank.IsHorizontal; }
        }
        /// <summary>
        /// 取得属于该项目分类的资助类别
        /// </summary>
        /// <param name="query">资助类别查询</param>
        /// <returns>属于该项目分类的资助类别</returns>
        public IList<ProjectSupportCategory> GetProjectSupportCategories(IQueryable<ProjectSupportCategory> query)
        {
            if (this.IsNew)
                return new List<ProjectSupportCategory>();
            else
                return query.Where(psc => psc.ProjectTypeID == this.ID).ToList();
        }
        /// <summary>
        /// 取得属于该项目分类的资助领域
        /// </summary>
        /// <param name="query">资助领域查询</param>
        /// <returns>属于该项目分类的资助领域</returns>
        public IList<ProjectSupportField> GetProjectSupportFields(IQueryable<ProjectSupportField> query)
        {
            if (this.IsNew)
                return new List<ProjectSupportField>();
            else
                return query.Where(psf => psf.ProjectTypeID == this.ID).ToList();
        }
        /// <summary>
        /// 取得属于该项目分类的项目类型信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<ProjectInfo_Type> GetProjectInfo_Types(IQueryable<ProjectInfo_Type> query)
        {
            if (this.IsNew)
                return new List<ProjectInfo_Type>();
            else
                return query.Where(psf => psf.TypeID == this.ID).ToList();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            //TODO 类型的验证算法有待完善
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "项目类别名称不能为空。");
            validater.AddCondition(_ProjectRank.Entity != null, "项目级别不能为空。");

            if (!String.IsNullOrEmpty(_Code))
                validater.AddCondition(ValidateCode(_Code), "项目类别代码只能为两位数字。");

            base.ValidateAction(validater, database);
        }
        private bool ValidateCode(string _Code)
        {
            return Regex.IsMatch(_Code.ToUpper(), @"(^\d{2}$)");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var categories in GetProjectSupportCategories(database.ProjectSupportCategories))
                    categories.Delete(database);
                foreach (var fileds in GetProjectSupportFields(database.ProjectSupportFields))
                    fileds.Delete(database);

                this.IsAvailable = false;
                this.Save(database);
                ts.Complete();
            }
        }

        #region ICloneable Members

        object ICloneable.Clone()
        {
            throw new NotImplementedException();
        }

        #endregion
    }

    /// <summary>
    /// 项目类别的业务扩展
    /// </summary>
    public static class ProjectTypeBusinessExtension
    {

        /// <summary>
        /// 根据纵向等级取得类型
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectRankID"></param>
        /// <returns></returns>
        public static IList<ProjectType> Get(this IQueryable<ProjectType> query, int projectRankID)
        {
            return query
                .Where(pr => pr.ProjectRankID == projectRankID && pr.IsAvailable)
                .ToList();
        }
        /// <summary>
        /// 取得项目类型
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectRankID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetForQuery(this IEntityDataAccess<ProjectType> query, int projectRankID, User user)
        {
            if (user == null || user.IsExpert)
                return query.Get(projectRankID);

            IDatabase database = query.Database;
            var projectRank = database.ProjectRanks.GetByID(projectRankID);

            if (projectRank.IsHorizontal)
                return user.GetCanShowHorizontalTypes(database);

            return user.GetCanShowVerticalTypes(database)
                .Where(q => q.ProjectRankID == projectRankID)
                .ToList();
        }
        /// <summary>
        /// 取得项目类型
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectRankID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetForEdit(this IEntityDataAccess<ProjectType> query, int projectRankID, User user)
        {
            if (user.IsExpert)
                return query.Get(projectRankID);

            IDatabase database = query.Database;
            var projectRank = database.ProjectRanks.GetByID(projectRankID);

            if (projectRank.IsHorizontal)
                return user.GetCanEditHorizontalTypes(database);

            return user.GetCanEditVerticalTypes(database)
                .Where(q => q.ProjectRankID == projectRankID)
                .ToList();
        }

        //根据项目类型取得对应的管理费收取类别

        /// <summary>
        /// 根据类型名称取得项目类型
        /// </summary>
        /// <param name="query"></param>
        /// <param name="typeName"></param>
        /// <param name="rankId"></param>
        /// <param name="subjectNature"></param>
        /// <returns></returns>
        public static ProjectType GetByName(this IQueryable<ProjectType> query, string typeName, int rankId, SubjectNature subjectNature)
        {
            if (string.IsNullOrEmpty(typeName))
                return null;

            return query.SingleOrDefault(q => q.Name == typeName
                && q.ProjectRankID == rankId
                && q.SubjectNature == subjectNature);
        }
    }
    /// <summary>
    /// 项目类别的查询扩展
    /// </summary>
    public static class ProjectTypeQueryExtension
    {
        /// <summary>
        /// 根据级别查询类别
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static QueryResult<ProjectType> Query(this IQueryable<ProjectType> query, ProjectTypeQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.Where(pt => pt.IsAvailable);
            if (queryInformation.projectRanks != null && queryInformation.projectRanks.Length != 0)
                q = q.Where(pt => queryInformation.projectRanks.Contains(pt.ProjectRankID));

            q = SortQuery(q, queryInformation.SortInfor);

            return new QueryResult<ProjectType>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
        private static IQueryable<ProjectType> SortQuery(IQueryable<ProjectType> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(pt => pt.ID);
            else if (sortInfo.Field.EqualIgnoreCase("ProjectRank"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.ProjectRank.Name)
                    : query.OrderByDescending(pt => pt.ProjectRank.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.Name)
                    : query.OrderByDescending(pt => pt.Name);
            else if (sortInfo.Field.EqualIgnoreCase("ShortName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.ShortName)
                    : query.OrderByDescending(pt => pt.ShortName);
            else if (sortInfo.Field.EqualIgnoreCase("Administration"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.Administration)
                    : query.OrderByDescending(pt => pt.Administration);
            else if (sortInfo.Field.EqualIgnoreCase("Code"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.Code)
                    : query.OrderByDescending(pt => pt.Code);
            else if (sortInfo.Field.EqualIgnoreCase("ProjectComingFrom"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.ProjectComingFrom)
                    : query.OrderByDescending(pt => pt.ProjectComingFrom);
            else if (sortInfo.Field.EqualIgnoreCase("IsBudget"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.IsBudget)
                    : query.OrderByDescending(pt => pt.IsBudget);
            else if (sortInfo.Field.EqualIgnoreCase("IsExploit"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.IsExploit)
                    : query.OrderByDescending(pt => pt.IsExploit);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpenseInRate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.OverheadExpenseInRate)
                    : query.OrderByDescending(pt => pt.OverheadExpenseInRate);
            else if (sortInfo.Field.EqualIgnoreCase("OverheadExpenseOutRate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.OverheadExpenseOutRate)
                    : query.OrderByDescending(pt => pt.OverheadExpenseOutRate);
            else if (sortInfo.Field.EqualIgnoreCase("SubjectNature"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.SubjectNature)
                    : query.OrderByDescending(pt => pt.SubjectNature);
            else if (sortInfo.Field.EqualIgnoreCase("IsAvailable"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.IsAvailable)
                    : query.OrderByDescending(pt => pt.IsAvailable);
            else
                return query = query.OrderByDescending(v => v.ID);
        }
    }
    /// <summary>
    /// 项目类别的权限扩展
    /// </summary>
    public static class ProjectTypePermissionExtension
    {
        /// <summary>
        /// 取得能够编辑的纵向项目类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetCanEditVerticalTypes(this User user, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManageAllVerticalProject, PermissionOperation.Edit, null, database))
                return database.ProjectTypes
                    .Where(q => q.IsAvailable && !q.ProjectRank.IsHorizontal)
                    .ToList();

            return user.GetCanEditProjectTypesByPermissionItem(PermissionItem.ManageVerticalProjectByType, database);
        }
        /// <summary>
        /// 取得只能够查看的纵向项目类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetCanShowVerticalTypes(this User user, IDatabase database)
        {
            if (user.HasRelatePerssionsOf(PermissionItem.ManageAllVerticalProject, database))
                return database.ProjectTypes
                    .Where(q => q.IsAvailable && !q.ProjectRank.IsHorizontal)
                    .ToList();

            return user.GetCanShowProjectTypesByPermissionItem(PermissionItem.ManageVerticalProjectByType, database);
        }
        /// <summary>
        /// 取得能够编辑的横向向项目类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetCanEditHorizontalTypes(this User user, IDatabase database)
        {
            if (user.HasPermission(PermissionItem.ManageAllHorizontalProject, PermissionOperation.Edit, null, database))
                return database.ProjectTypes
                    .Where(q => q.IsAvailable && q.ProjectRank.IsHorizontal)
                    .ToList();

            return user.GetCanEditProjectTypesByPermissionItem(PermissionItem.ManageHorizontalProjectByType, database);
        }
        /// <summary>
        /// 取得只能够查看的横向项目类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetCanShowHorizontalTypes(this User user, IDatabase database)
        {
            if (user.HasRelatePerssionsOf(PermissionItem.ManageAllHorizontalProject, database))
                return database.ProjectTypes
                    .Where(q => q.IsAvailable && q.ProjectRank.IsHorizontal)
                    .ToList();

            return user.GetCanShowProjectTypesByPermissionItem(PermissionItem.ManageHorizontalProjectByType, database);
        }
        //根据权限类型取得用户具有编辑权限的项目类型(当用户具有分类别项目权限的时候有效)
        private static IList<ProjectType> GetCanEditProjectTypesByPermissionItem(this User user, PermissionItem permissionItem, IDatabase database)
        {
            if (permissionItem != PermissionItem.ManageHorizontalProjectByType && permissionItem != PermissionItem.ManageVerticalProjectByType)
                throw new Exception("权限类型不正确");

            var projectTypePermissions = user.GetRelatePermissionsOf(permissionItem, database);
            var projectTypesID = projectTypePermissions
                .Where(p => p.Params.HasValue && p.PermissionOperation == PermissionOperation.Edit)
                .Select(p => p.Params.Value)
                .Distinct();

            return database.ProjectTypes.Where(q => projectTypesID.Contains(q.ID) && q.IsAvailable).ToList();
        }
        //根据权限类型取得用户具有查看权限的项目类型(当用户具有分类别项目权限的时候有效)
        private static IList<ProjectType> GetCanShowProjectTypesByPermissionItem(this User user, PermissionItem permissionItem, IDatabase database)
        {
            if (permissionItem != PermissionItem.ManageHorizontalProjectByType && permissionItem != PermissionItem.ManageVerticalProjectByType)
                throw new Exception("权限类型不正确");

            var projectTypePermissions = user.GetRelatePermissionsOf(permissionItem, database);
            var projectTypesID = projectTypePermissions
                .Where(p => p.Params.HasValue)
                .Select(p => p.Params.Value)
                .Distinct();

            return database.ProjectTypes.Where(q => projectTypesID.Contains(q.ID) && q.IsAvailable).ToList();
        }
        /// <summary>
        /// 判断用户是否具有对某一项目类型的项目具有查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="projectType"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowProjectsOf(this User user, ProjectType projectType, IDatabase database)
        {
            if (projectType.ProjectRank.IsHorizontal)
                return user.HasPermission(PermissionItem.ManageAllHorizontalProject, PermissionOperation.Edit, null, database)
                    //|| user.HasPermission(PermissionItem.ManageAllHorizontalProject, PermissionOperation.Show, null, database)
                    || user.HasPermission(PermissionItem.ManageHorizontalProjectByType, PermissionOperation.Edit, projectType.ID, database);
            //|| user.HasPermission(PermissionItem.ManageHorizontalProjectByType, PermissionOperation.Show, projectType.ID, database);

            return user.HasPermission(PermissionItem.ManageAllVerticalProject, PermissionOperation.Edit, null, database)
                //|| user.HasPermission(PermissionItem.ManageAllVerticalProject, PermissionOperation.Show, null, database)
                || user.HasPermission(PermissionItem.ManageVerticalProjectByType, PermissionOperation.Edit, projectType.ID, database);
            // || user.HasPermission(PermissionItem.ManageVerticalProjectByType, PermissionOperation.Show, projectType.ID, database);
        }
        /// <summary>
        /// 判断用户是否具有对某一项目类型的项目具有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="projectType"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditProjectsOf(this User user, ProjectType projectType, IDatabase database)
        {
            if (projectType.ProjectRank.IsHorizontal)
                return user.HasPermission(PermissionItem.ManageAllHorizontalProject, PermissionOperation.Edit, null, database)
                    || user.HasPermission(PermissionItem.ManageHorizontalProjectByType, PermissionOperation.Edit, projectType.ID, database);

            return user.HasPermission(PermissionItem.ManageAllVerticalProject, PermissionOperation.Edit, null, database)
                || user.HasPermission(PermissionItem.ManageVerticalProjectByType, PermissionOperation.Edit, projectType.ID, database);
        }
        /// <summary>
        /// 判断用户是否具有对某一类型项目具有某种权限（非临时权限）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="projectType"></param>
        /// <param name="permissionOperation"></param>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanManageProjectsOf(this User user, ProjectType projectType, PermissionOperation permissionOperation, PermissionItem permissionItem, IDatabase database)
        {
            var permissionList = user.GetPermissions(database.UserPermissions);
            List<int> typeID = new List<int>();

            foreach (var permission in permissionList)
                if (permission.PermissionOperation == permissionOperation && permission.PermissionItem == permissionItem)
                    if (permission.Params.HasValue)
                        typeID.Add(permission.Params.Value);

            return typeID.Contains(projectType.ID);
        }
        /// <summary>
        /// 判断用户对横向或纵向项目是否具有某种管理权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="permissionOperation"></param>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanManageProjectsOf(this User user, PermissionOperation permissionOperation, PermissionItem permissionItem, IDatabase database)
        {
            var permissionList = user.GetPermissions(database.UserPermissions);

            foreach (var permission in permissionList)
                if (permission.PermissionOperation == permissionOperation && permission.PermissionItem == permissionItem)
                    return true;

            return false;
        }
        /// <summary>
        /// 取得用户能够审核的纵向项目类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetCanCensorVerticalProjectTypes(this User user, IDatabase database)
        {
            return user.GetCanEditVerticalTypes(database);
        }
        /// <summary>
        /// 取得用户能够审核的横向项目类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<ProjectType> GetCanCensorHorizontalProjectTypes(this User user, IDatabase database)
        {
            return user.GetCanEditHorizontalTypes(database);
        }
        /// <summary>
        /// 是否有查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowProjectType(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageType, database);
        }
        /// <summary>
        /// 能够查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pt"></param>
        /// <returns></returns>
        public static bool CanShowProjectType(this User user, IDatabase database, ProjectType pt)
        {
            return user.HasPermission_ShowProjectType(database) && pt.IsAvailable;
        }
        /// <summary>
        /// 是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditProjectType(this User user, IDatabase database)
        {
            return user.HasPermission_ShowProjectType(database);
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pt"></param>
        /// <returns></returns>
        public static bool CanEditProjectType(this User user, IDatabase database, ProjectType pt)
        {
            return user.HasPermission_EditProjectType(database) && pt.IsAvailable;
        }
        /// <summary>
        /// 是否有删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteProjectType(this User user, IDatabase database)
        {
            return user.HasPermission_ShowProjectType(database);
        }
        /// <summary>
        ///  能够删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pt"></param>
        /// <returns></returns>
        public static bool CanDeleteProjectType(this User user, IDatabase database, ProjectType pt)
        {
            return user.HasPermission_DeleteProjectType(database) && pt.IsAvailable;
        }
        /// <summary>
        /// 是否有管理资助领域权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ManageProjectSupportField(this User user, IDatabase database)
        {
            return user.HasPermission_ShowProjectType(database);
        }
        /// <summary>
        ///  能够管理资助领域
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pt"></param>
        /// <returns></returns>
        public static bool CanManageProjectSupportField(this User user, IDatabase database, ProjectType pt)
        {
            return user.HasPermission_ManageProjectSupportField(database) && pt.IsAvailable;
        }
        /// <summary>
        /// 是否有管理资助类别权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ManageProjectSupportCategory(this User user, IDatabase database)
        {
            return user.HasPermission_ShowProjectType(database);
        }
        /// <summary>
        /// 能够管理资助类别
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="pt"></param>
        /// <returns></returns>
        public static bool CanManageProjectSupportCategory(this User user, IDatabase database, ProjectType pt)
        {
            return user.HasPermission_ManageProjectSupportCategory(database) && pt.IsAvailable;
        }
    }
}
