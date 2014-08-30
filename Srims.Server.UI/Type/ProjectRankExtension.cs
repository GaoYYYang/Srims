using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Type
{
    /// <summary>
    /// 显示项目等级
    /// </summary>
    public static class ProjectRankExtension
    {
        /// <summary>
        /// 等级筛选显示
        /// </summary>
        /// <param name="projectRankList"></param>
        /// <param name="response"></param>
        public static void ShowForFilter(this IList<ProjectRank> projectRankList, HttpResponse response)
        {
            response.WriteTagBegin("List");

            foreach (var pr in projectRankList)
            {
                if (pr == null)
                    continue;

                response.WriteTagBegin("Record");

                response.WriteTagWithValue("ID", pr.ID);
                response.WriteTagWithValue("Value", pr.Name);

                response.WriteTagEnd("Record");
            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示项目等级
        /// </summary>
        /// <param name="ProjectRank"></param>
        /// <param name="response"></param>
        public static void ShowProjectRank(ProjectRank ProjectRank, HttpResponse response)
        {
            if (ProjectRank == null)
                return;

            response.WriteTagWithValue("ID", ProjectRank.ID);
            response.WriteTagWithValue("Name", ProjectRank.Name);
        }
        /// <summary>
        /// 显示项目等级列表
        /// </summary>
        /// <param name="ProjectRankList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<ProjectRank> ProjectRankList, HttpResponse response)
        {
            ShowDelegate<ProjectRank> showDelegate = new ShowDelegate<ProjectRank>(ShowProjectRank);
            ProjectRankList.Show<ProjectRank>(response, showDelegate);
        }
        /// <summary>
        /// 项目等级数据
        /// </summary>
        /// <param name="projectRankList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowRankNodeData(this IList<ProjectRank> projectRankList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();
            foreach (var projectRank in projectRankList)
            {
                var projectTypeList = database.ProjectTypes.GetForQuery(projectRank.ID, user);

                response.WriteChildBegin();

                response.WriteIdAndText("rank-" + projectRank.ID, projectRank.Name);
                if (projectRankList.Count() == 0)
                    response.WriteLeaf();
                else
                {
                    response.WriteChildrenWithNoValue();
                    projectTypeList.ShowTypeNodeData(user, database, response);
                }

                response.WriteChildEnd(projectRank.ID == projectRankList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 项目类型节点（带查看权限）
        /// </summary>
        /// <param name="projectRankList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowAsTreeForPermissionShow(this IList<ProjectRank> projectRankList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();

            response.WriteChildBegin();
            response.WriteNodeWithValue("id", "allHorizontalProject");
            response.WriteNodeWithValue("text", "所有横向项目");
            response.WriteNodeWithValue("checked", user.CanManageProjectsOf(PermissionOperation.Show, PermissionItem.ManageAllHorizontalProject, database) ? "true" : "");
            response.WriteLeaf();
            response.WriteChildEnd(false);

            response.WriteChildBegin();
            response.WriteNodeWithValue("id", "allVerticalProject");
            response.WriteNodeWithValue("text", "所有纵向项目");
            response.WriteNodeWithValue("checked", user.CanManageProjectsOf(PermissionOperation.Show, PermissionItem.ManageAllVerticalProject, database) ? "true" : "");
            response.WriteLeaf();
            response.WriteChildEnd(false);


            foreach (var projectRank in projectRankList)
            {
                var projectTypeList = database.ProjectTypes.Get(projectRank.ID);
                response.WriteChildBegin();
                response.WriteNodeWithValue("id", "rank-" + projectRank.ID.ToString());
                response.WriteNodeWithValue("text", projectRank.Name);
                if (projectTypeList.Count() == 0)
                    response.WriteLeaf();
                else
                {
                    response.WriteChildrenWithNoValue();
                    projectTypeList.ShowAsTreeForPermissionShow(user, database, response);
                }
                response.WriteChildEnd(projectRank.ID == projectRankList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 项目类型节点（带编辑权限）
        /// </summary>
        /// <param name="projectRankList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowAsTreeForPermissionEdit(this IList<ProjectRank> projectRankList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();

            response.WriteChildBegin();
            response.WriteNodeWithValue("id", "allHorizontalProject");
            response.WriteNodeWithValue("text", "所有横向项目");
            response.WriteNodeWithValue("checked", user.CanManageProjectsOf(PermissionOperation.Edit, PermissionItem.ManageAllHorizontalProject, database) ? "true" : "");
            response.WriteLeaf();
            response.WriteChildEnd(false);

            response.WriteChildBegin();
            response.WriteNodeWithValue("id", "allVerticalProject");
            response.WriteNodeWithValue("text", "所有纵向项目");
            response.WriteNodeWithValue("checked", user.CanManageProjectsOf(PermissionOperation.Edit, PermissionItem.ManageAllVerticalProject, database) ? "true" : "");
            response.WriteLeaf();
            response.WriteChildEnd(false);

            foreach (var projectRank in projectRankList)
            {
                var projectTypeList = database.ProjectTypes.Get(projectRank.ID);
                response.WriteChildBegin();
                response.WriteNodeWithValue("id", "rank-" + projectRank.ID.ToString());
                response.WriteNodeWithValue("text", projectRank.Name);
                if (projectTypeList.Count() == 0)
                    response.WriteLeaf();
                else
                {
                    response.WriteChildrenWithNoValue();
                    projectTypeList.ShowAsTreeForPermissionEdit(user, database, response);
                }
                response.WriteChildEnd(projectRank.ID == projectRankList.Last().ID);
            }
            response.WriteEnd();
        }
        /// <summary>
        /// 项目类型节点（临时授权）
        /// </summary>
        /// <param name="projectRankList"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowAsTreeForUserTemporaryAuthorization(this IList<ProjectRank> projectRankList, IDatabase database, HttpResponse response)
        {
            response.WriteBegin();

            response.WriteChildBegin();
            response.WriteNodeWithValue("id", "allHorizontalProject");
            response.WriteNodeWithValue("text", "所有横向项目");
            response.WriteLeaf();
            response.WriteChildEnd(false);

            response.WriteChildBegin();
            response.WriteNodeWithValue("id", "allVerticalProject");
            response.WriteNodeWithValue("text", "所有纵向项目");
            response.WriteLeaf();
            response.WriteChildEnd(false);

            foreach (var projectRank in projectRankList)
            {
                var projectTypeList = database.ProjectTypes.Get(projectRank.ID);
                response.WriteChildBegin();
                response.WriteNodeWithValue("id", "rank-" + projectRank.ID.ToString());
                response.WriteNodeWithValue("text", projectRank.Name);
                if (projectTypeList.Count() == 0)
                    response.WriteLeaf();
                else
                {
                    response.WriteChildrenWithNoValue();
                    projectTypeList.ShowAsTreeForUserTemporaryAuthorization(response);
                }
                response.WriteChildEnd(projectRank.ID == projectRankList.Last().ID);
            }
            response.WriteEnd();
        }
    }
}
