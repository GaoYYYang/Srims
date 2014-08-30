using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Projects
{
    /// <summary>
    /// 显示项目
    /// </summary>
    public static class ProjectMemberExtension
    {
        /// <summary>
        /// 显示项目成员
        /// </summary>
        /// <param name="projectMember"></param>
        /// <param name="response"></param>
        public static void ShowProjectMember(ProjectMember projectMember, HttpResponse response)
        {
            response.WriteTagWithValue("ID", projectMember.ID);
            response.WriteTagWithValue("Name", projectMember.Expert.Name);
            response.WriteTagWithValue("IsExpertSecondCollege", projectMember.IsExpertSecondCollege);
            response.WriteTagWithValue("Order", projectMember.Order);
            response.WriteTagWithValue("TaskNo", projectMember.TaskNo);
            response.WriteTagWithValue("TaskName", projectMember.TaskName);
            response.WriteTagWithValue("ExpertID", projectMember.ExpertID);
            response.WriteTagWithValue("Number", projectMember.Expert.Number);
        }
        /// <summary>
        /// 显示项目成员列表
        /// </summary>
        /// <param name="projectMemberList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<ProjectMember> projectMemberList, HttpResponse response)
        {
            ShowDelegate<ProjectMember> showDelegate = new ShowDelegate<ProjectMember>(ShowProjectMember);
            projectMemberList.Show<ProjectMember>(response, showDelegate);
        }
        /// <summary>
        /// 取得项目成员
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        public static ProjectMember GetProjectMember(this HttpRequest request, IDatabase database)
        {
            var projectMember = request.getProjectMember(database);

            projectMember.Expert = request.GetEntity<Expert>(database.Experts, "ExpertID");
            projectMember.IsExpertSecondCollege = request.GetBoolean("IsExpertSecondCollege").Value;
            projectMember.Order = request.GetInt("Order").Value;
            projectMember.Project = request.GetEntity<Project>(database.Projects, "ProjectID");
            projectMember.TaskName = request.GetString("TaskName");
            projectMember.TaskNo = request.GetString("TaskNo");

            return projectMember;
        }
        private static ProjectMember getProjectMember(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.ProjectMemebers.GetByID(id.Value);

            return new ProjectMember();
        }
        /// <summary>
        /// 取得新建的空ProjectMember或者编辑之前的旧ProjectMember
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldProjectMember(this HttpRequest request, IDatabase database)
        {
            Object oldWinner = new Object();
            oldWinner = request.getProjectMember(database).Clone();
            return oldWinner;
        }
    }
}
