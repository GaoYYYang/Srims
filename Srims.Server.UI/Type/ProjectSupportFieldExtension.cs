using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Type;
using Srims.Server.Business;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Users;

namespace Srims.Server.UI.Type
{
    /// <summary>
    /// 显示项目资助领域
    /// </summary>
    public static class ProjectSupportFieldExtension
    {
        /// <summary>
        /// 显示项目资助领域
        /// </summary>
        /// <param name="ProjectSupportField"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowProjectSupportField(ProjectSupportField ProjectSupportField, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", ProjectSupportField.ID);
            response.WriteTagWithValue("Name", ProjectSupportField.Name);
            response.WriteTagWithValue("ProjectType", ProjectSupportField.ProjectType.Name);
            response.WriteTagWithValue("IsAvailable", ProjectSupportField.IsAvailable);

            //has
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditSupportField(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteSupportField(database));
            response.WriteTagWithValue("HasPermission_ManageSubField", user.HasPermission_ManageSubSupportField(database));
            //can
            response.WriteTagWithValue("CanEdit", user.CanEditSupportField(database, ProjectSupportField));
            response.WriteTagWithValue("CanDelete", user.CanDeleteSupportField(database, ProjectSupportField));
            response.WriteTagWithValue("CanManageSubField", user.CanManageSubSupportField(database, ProjectSupportField));
        }
        /// <summary>
        ///  显示项目资助领域列表
        /// </summary>
        /// <param name="ProjectSupportFieldList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<ProjectSupportField> ProjectSupportFieldList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<ProjectSupportField> showDelegate = new ShowDelegateWithUserAndDatabase<ProjectSupportField>(ShowProjectSupportField);
            ProjectSupportFieldList.Show<ProjectSupportField>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 项目资助领域数据
        /// </summary>
        /// <param name="projectSupportFieldList"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowSupportFieldNodeData(this IList<ProjectSupportField> projectSupportFieldList, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectSupportField in projectSupportFieldList)
            {
                var projectSupportSubFieldList = database.ProjectSupportSubFields.Get(projectSupportField.ID);

                response.WriteChildBegin();

                response.WriteIdAndText("supportField-" + projectSupportField.ID, projectSupportField.Name);
                if (projectSupportSubFieldList.Count == 0)
                    response.WriteLeaf();
                else
                {
                    response.WriteChildrenWithNoValue();
                    projectSupportSubFieldList.ShowSupportSubFieldNodeData(response);

                }

                response.WriteChildEnd(projectSupportField.ID == projectSupportFieldList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 取得资助领域编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ProjectSupportField GetProjectSupportField(this HttpRequest request, IDatabase database, User user)
        {
            var projectSupportField = request.getProjectSupportField(database, user);

            projectSupportField.Name = request.GetString("name");
            projectSupportField.ProjectType = request.GetEntity<ProjectType>(database.ProjectTypes, "projectTypeID");
            return projectSupportField;
        }

        private static ProjectSupportField getProjectSupportField(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.ProjectSupportFields.GetByID(id.Value);
            var projectSupportField = new ProjectSupportField();
            return projectSupportField;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldProjectSupportField(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getProjectSupportField(database, user).Clone();
            return oldEntity;
        }
    }
}
