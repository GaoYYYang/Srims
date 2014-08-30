using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Documents;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using MIS.Common.Query;

namespace Srims.Server.UI.Type
{
    /// <summary>
    /// 项目类别显示
    /// </summary>
    public static class ProjectTypeExtension
    {
        /// <summary>
        /// 取得查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static ProjectTypeQueryInformation GetProjectTypeQueryInformation(this HttpRequest request)
        {
            var queryueryInformation = new ProjectTypeQueryInformation();

            queryueryInformation.Start = request.GetQueryInformation_Start();
            queryueryInformation.Limit = request.GetQueryInformation_Limit();
            queryueryInformation.SortInfor = request.GetQueryCondition_SortInfo();

            queryueryInformation.projectRanks = request.GetList<int>("ProjectRank");

            return queryueryInformation;
        }
        /// <summary>
        /// 显示项目类别
        /// </summary>
        /// <param name="ProjectType"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowProjectType(ProjectType ProjectType, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", ProjectType.ID);
            response.WriteTagWithValue("Name", ProjectType.Name);
            response.WriteTagWithValue("OverheadExpenseInRate", ProjectType.OverheadExpenseInRate);
            response.WriteTagWithValue("OverheadExpenseOutRate", ProjectType.OverheadExpenseOutRate);
            response.WriteTagWithValue("Administration", ProjectType.Administration);
            response.WriteTagWithValue("ShortName", ProjectType.ShortName);
            response.WriteTagWithValue("Code", ProjectType.Code);
            response.WriteTagWithValue("BakCode", ProjectType.BakCode);
            response.WriteTagWithValue("PerCode", ProjectType.PerCode);
            response.WriteTagWithValue("IsBudget", ProjectType.IsBudget);
            response.WriteTagWithValue("IsAvailable", ProjectType.IsAvailable);
            response.WriteTagWithValue("IsExploit", ProjectType.IsExploit);
            response.WriteTagWithValue("IsHorizontalType", ProjectType.IsHorizontalType);
            response.WriteTagWithValue("ProjectComingFrom", ProjectType.ProjectComingFrom);
            response.WriteTagWithValue("ProjectRankID", ProjectType.ProjectRankID);
            response.WriteTagWithValue("ProjectRank", ProjectType.ProjectRank.Name);
            response.WriteTagWithValue("SubjectNatrue", ProjectType.SubjectNature);
            response.WriteTagWithValue("ManagementFeesType", ProjectType.ManagementFeesType);

            //has
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_ShowProjectType(database));
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditProjectType(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteProjectType(database));
            response.WriteTagWithValue("HasPermission_ManageProjectSupportField", user.HasPermission_ManageProjectSupportField(database));
            response.WriteTagWithValue("HasPermission_ManageProjectSupportCategory", user.HasPermission_ManageProjectSupportCategory(database));
            response.WriteTagWithValue("HasPermission_UploadDocumentModel", user.HasPermission_UploadDocumentModel(database));

            //can
            response.WriteTagWithValue("CanShow", user.CanShowProjectType(database, ProjectType));
            response.WriteTagWithValue("CanEdit", user.CanEditProjectType(database, ProjectType));
            response.WriteTagWithValue("CanDelete", user.CanDeleteProjectType(database, ProjectType));
            response.WriteTagWithValue("CanManageProjectSupportField", user.CanManageProjectSupportField(database, ProjectType));
            response.WriteTagWithValue("CanManageProjectSupportCategory", user.CanManageProjectSupportCategory(database, ProjectType));
        }
        /// <summary>
        /// 项目类别查询的显示扩展
        /// </summary>
        /// <param name="projectTypeQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowQueryResult(this QueryResult<ProjectType> projectTypeQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<ProjectType> showDelegate = new ShowDelegateWithUserAndDatabase<ProjectType>(ShowProjectType);
            projectTypeQueryResult.Show<ProjectType>(response, user, database, showDelegate);
        }

        /// <summary>
        /// 显示项目类别
        /// </summary>
        /// <param name="ProjectType"></param>
        /// <param name="response"></param>
        public static void ShowProjectType(ProjectType ProjectType, HttpResponse response)
        {
            response.WriteTagWithValue("ID", ProjectType.ID);
            response.WriteTagWithValue("Name", ProjectType.Name);
            response.WriteTagWithValue("IsBudget", ProjectType.IsBudget);
            response.WriteTagWithValue("OverheadExpenseInRate", ProjectType.OverheadExpenseInRate);
            response.WriteTagWithValue("OverheadExpenseOutRate", ProjectType.OverheadExpenseOutRate);
            response.WriteTagWithValue("ManagementFeesType", ProjectType.ManagementFeesType);
        }
        /// <summary>
        /// 显示项目类别列表
        /// </summary>
        /// <param name="ProjectTypeList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<ProjectType> ProjectTypeList, HttpResponse response)
        {
            ShowDelegate<ProjectType> showDelegate = new ShowDelegate<ProjectType>(ShowProjectType);
            ProjectTypeList.Show<ProjectType>(response, showDelegate);
        }
        /// <summary>
        /// 项目资助类型节点数据
        /// </summary>
        /// <param name="projectTypeList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowTypeNodeData(this IList<ProjectType> projectTypeList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectType in projectTypeList)
            {
                var projectSupportFieldList = database.ProjectSupportFields.Get(projectType.ID);
                var projectSupportCategoryList = database.ProjectSupportCategories.Get(projectType.ID);

                response.WriteChildBegin();

                response.WriteIdAndText("type-" + projectType.ID, projectType.Name);
                if (projectSupportFieldList.Count == 0 || projectSupportCategoryList.Count() == 0)
                    response.WriteLeaf();
                else
                {
                    response.WriteChildrenWithNoValue();
                    ProjectSupportCategoryExtension.ShowSupportNode(projectSupportCategoryList, projectSupportFieldList, database, response, projectType.Name);
                }

                response.WriteChildEnd(projectType.ID == projectTypeList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 显示项目类型节点（带查看权限）
        /// </summary>
        /// <param name="projectTypeList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowAsTreeForPermissionShow(this IList<ProjectType> projectTypeList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectType in projectTypeList)
            {
                response.WriteChildBegin();
                response.WriteNodeWithValue("id", projectType.ID.ToString());
                response.WriteNodeWithValue("text", projectType.Name);
                if (projectType.ProjectRank.IsHorizontal)
                    response.WriteNodeWithValue("checked", user.CanManageProjectsOf(projectType, PermissionOperation.Show, PermissionItem.ManageHorizontalProjectByType, database)
                        ? "true" : "");
                else
                    response.WriteNodeWithValue("checked", user.CanManageProjectsOf(projectType, PermissionOperation.Show, PermissionItem.ManageVerticalProjectByType, database)
                         ? "true" : "");
                response.WriteLeaf();
                response.WriteChildEnd(projectType.ID == projectTypeList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        ///  显示项目类型节点（带编辑权限）
        /// </summary>
        /// <param name="projectTypeList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowAsTreeForPermissionEdit(this IList<ProjectType> projectTypeList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectType in projectTypeList)
            {
                response.WriteChildBegin();
                response.WriteNodeWithValue("id", projectType.ID.ToString());
                response.WriteNodeWithValue("text", projectType.Name);
                if (projectType.ProjectRank.IsHorizontal)
                    response.WriteNodeWithValue("checked", user.CanManageProjectsOf(projectType, PermissionOperation.Edit, PermissionItem.ManageHorizontalProjectByType, database)
                        ? "true" : "");
                else
                    response.WriteNodeWithValue("checked", user.CanManageProjectsOf(projectType, PermissionOperation.Edit, PermissionItem.ManageVerticalProjectByType, database)
                         ? "true" : "");
                response.WriteLeaf();
                response.WriteChildEnd(projectType.ID == projectTypeList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 显示项目类型节点（临时授权）
        /// </summary>
        /// <param name="projectTypeList"></param>
        /// <param name="response"></param>
        public static void ShowAsTreeForUserTemporaryAuthorization(this IList<ProjectType> projectTypeList, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectType in projectTypeList)
            {
                response.WriteChildBegin();
                response.WriteNodeWithValue("id", projectType.ID.ToString());
                response.WriteNodeWithValue("text", projectType.Name);
                response.WriteLeaf();
                response.WriteChildEnd(projectType.ID == projectTypeList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 取得类型编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ProjectType GetProjectType(this HttpRequest request, IDatabase database, User user)
        {
            var projectType = request.getProjectType(database, user);

            projectType.Name = request.GetString("name");
            projectType.ShortName = request.GetString("shortName");
            projectType.NameSpell = request.GetString("nameSpell");
            projectType.ProjectRank = request.GetEntity<ProjectRank>(database.ProjectRanks, "projectRankID");
            projectType.IsBudget = request.GetBoolean("isBudget").Value;
            projectType.IsExploit = request.GetBoolean("isExploit").Value;
            projectType.Administration = request.GetString("administration");
            projectType.BakCode = request.GetString("bakCode");
            projectType.Code = request.GetString("code");
            projectType.PerCode = request.GetString("perCode");
            projectType.OverheadExpenseOutRate = request.GetInt("overheadExpenseOutRate").HasValue ? request.GetInt("overheadExpenseOutRate").Value : 0;
            projectType.OverheadExpenseInRate = request.GetInt("overheadExpenseInRate").HasValue ? request.GetInt("overheadExpenseInRate").Value : 0;
            projectType.ProjectComingFrom = request.GetEnum<ProjectFrom>("projectComingFrom");
            projectType.SubjectNature = request.GetEnum<SubjectNature>("subjectNature");
            projectType.ManagementFeesType = request.GetString("managementFeesType");
            return projectType;
        }

        private static ProjectType getProjectType(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.ProjectTypes.GetByID(id.Value);
            var projectType = new ProjectType();
            return projectType;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldProjectType(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getProjectType(database, user).Clone();

            return oldEntity;
        }
    }
}
