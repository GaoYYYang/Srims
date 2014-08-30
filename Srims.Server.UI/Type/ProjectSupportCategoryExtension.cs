using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Type;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Users;

namespace Srims.Server.UI.Type
{
    /// <summary>
    /// 显示项目资助类别
    /// </summary>
    public static class ProjectSupportCategoryExtension
    {
        /// <summary>
        /// 显示项目资助领域
        /// </summary>
        /// <param name="ProjectSupportCategory"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowProjectSupportCategory(ProjectSupportCategory ProjectSupportCategory, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", ProjectSupportCategory.ID);
            response.WriteTagWithValue("Name", ProjectSupportCategory.Name);
            response.WriteTagWithValue("IsGetOverheadExpense", ProjectSupportCategory.IsGetOverheadExpense);
            response.WriteTagWithValue("ProjectType", ProjectSupportCategory.ProjectType.Name);
            response.WriteTagWithValue("IsAvailable", ProjectSupportCategory.IsAvailable);
            //has
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditSupportCategory(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteSupportCategory(database));
            //can
            response.WriteTagWithValue("CanEdit", user.CanEditSupportCategory(database, ProjectSupportCategory));
            response.WriteTagWithValue("CanDelete", user.CanDeleteSupportCategory(database, ProjectSupportCategory));
        }
        /// <summary>
        /// 显示项目资助领域列表
        /// </summary>
        /// <param name="ProjectSupportCategoryList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<ProjectSupportCategory> ProjectSupportCategoryList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<ProjectSupportCategory> showDelegate = new ShowDelegateWithUserAndDatabase<ProjectSupportCategory>(ShowProjectSupportCategory);
            ProjectSupportCategoryList.Show<ProjectSupportCategory>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 项目资助节点
        /// </summary>
        /// <param name="projectSupportCategoryList"></param>
        /// <param name="projectsupportFieldList"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        /// <param name="typeName"></param>
        public static void ShowSupportNode(IList<ProjectSupportCategory> projectSupportCategoryList, IList<ProjectSupportField> projectsupportFieldList, IDatabase database, HttpResponse response, string typeName)
        {
            response.WriteBegin();

            if (projectSupportCategoryList.Count != 0)
            {
                response.WriteChildBegin();
                response.WriteIdAndText(typeName + "-supportCategory", "资助类别");
                response.WriteChildrenWithNoValue();
                projectSupportCategoryList.ShowSupportCategoryNodeData(database, response);
                response.WriteChildEnd(projectsupportFieldList.Count == 0);
            }
            if (projectsupportFieldList.Count != 0)
            {
                response.WriteChildBegin();
                response.WriteIdAndText(typeName + "-supportField", "资助领域");
                response.WriteChildrenWithNoValue();
                projectsupportFieldList.ShowSupportFieldNodeData(database, response);
                response.WriteChildEnd(true);
            }

            response.WriteEnd();
        }
        /// <summary>
        /// 项目资助领域数据
        /// </summary>
        /// <param name="projectSupportCategoryList"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowSupportCategoryNodeData(this  IList<ProjectSupportCategory> projectSupportCategoryList, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectSupportCategory in projectSupportCategoryList)
            {
                response.WriteChildBegin();

                response.WriteIdAndText("supportCategory-" + projectSupportCategory.ID, projectSupportCategory.Name);
                response.WriteLeaf();

                response.WriteChildEnd(projectSupportCategory.ID == projectSupportCategoryList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 取得资助类型编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ProjectSupportCategory GetProjectSupportCategory(this HttpRequest request, IDatabase database, User user)
        {
            var projectSupportCategory = request.getProjectSupportCategory(database, user);

            projectSupportCategory.Name = request.GetString("name");
            projectSupportCategory.ProjectType = request.GetEntity<ProjectType>(database.ProjectTypes, "projectTypeID");
            projectSupportCategory.IsGetOverheadExpense = request.GetBoolean("isGetOverheadExpense").Value;
            return projectSupportCategory;
        }

        private static ProjectSupportCategory getProjectSupportCategory(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.ProjectSupportCategories.GetByID(id.Value);
            var projectSupportCategory = new ProjectSupportCategory();
            return projectSupportCategory;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldEntity(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getProjectSupportCategory(database, user).Clone();
            return oldEntity;
        }
    }
}
