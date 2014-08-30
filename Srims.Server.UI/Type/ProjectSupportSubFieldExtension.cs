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
    /// 显示项目资助子领域
    /// </summary>
    public static class ProjectSupportSubFieldExtension
    {
        /// <summary>
        ///  显示项目资助子领域
        /// </summary>
        /// <param name="ProjectSupportSubField"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowProjectSupportSubField(ProjectSupportSubField ProjectSupportSubField, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", ProjectSupportSubField.ID);
            response.WriteTagWithValue("Name", ProjectSupportSubField.Name);
            response.WriteTagWithValue("IsAvailable", ProjectSupportSubField.IsAvailable);
            response.WriteTagWithValue("ProjectSupportField", ProjectSupportSubField.ProjectSupportField.Name);

            //has
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditSupportSubField(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteSupportSubField(database));
            //can
            response.WriteTagWithValue("CanEdit", user.CanEditSupportSubField(database, ProjectSupportSubField));
            response.WriteTagWithValue("CanDelete", user.CanDeleteSupportSubField(database, ProjectSupportSubField));
        }
        /// <summary>
        ///  显示项目资助子领域列表
        /// </summary>
        /// <param name="ProjectSupportSubFieldList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<ProjectSupportSubField> ProjectSupportSubFieldList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<ProjectSupportSubField> showDelegate = new ShowDelegateWithUserAndDatabase<ProjectSupportSubField>(ShowProjectSupportSubField);
            ProjectSupportSubFieldList.Show<ProjectSupportSubField>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 项目资助子领域节点数据
        /// </summary>
        /// <param name="projectSupportSubFieldList"></param>
        /// <param name="response"></param>
        public static void ShowSupportSubFieldNodeData(this IList<ProjectSupportSubField> projectSupportSubFieldList, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectSupportSubField in projectSupportSubFieldList)
            {
                response.WriteChildBegin();

                response.WriteIdAndText("supportSubField-" + projectSupportSubField.ID, projectSupportSubField.Name);
                response.WriteLeaf();

                response.WriteChildEnd(projectSupportSubField.ID == projectSupportSubFieldList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 取得资助子领域编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ProjectSupportSubField GetProjectSupportSubField(this HttpRequest request, IDatabase database, User user)
        {
            var projectSupportSubField = request.getProjectSupportSubField(database, user);

            projectSupportSubField.Name = request.GetString("name");
            projectSupportSubField.ProjectSupportField = request.GetEntity<ProjectSupportField>(database.ProjectSupportFields, "projectSupportFiledID");
            return projectSupportSubField;
        }

        private static ProjectSupportSubField getProjectSupportSubField(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.ProjectSupportSubFields.GetByID(id.Value);
            var projectSupportSubField = new ProjectSupportSubField();
            return projectSupportSubField;
        }
        /// <summary>
        /// 取得新建的ProjectSupportSubField或者编辑之前的旧ProjectSupportSubField
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldProjectSupportSubField(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getProjectSupportSubField(database, user).Clone();
            return oldEntity;
        }
    }
}
