using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Projects;

using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Projects
{
    /// <summary>
    /// 项目状态历史相关扩展
    /// </summary>
    public static class ProjectStateHistoryExtension
    {
        /// <summary>
        /// 项目状态历史的显示扩展
        /// </summary>
        /// <param name="projectStateHistory"></param>
        /// <param name="response"></param>
        public static void ShowProjectStateHistory(ProjectStateHistory projectStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("ID", projectStateHistory.ID);
            response.WriteTagWithValue("DateTime", projectStateHistory.DateTime);
            response.WriteTagWithValue("Operator", projectStateHistory.Operator);
            response.WriteTagWithValue("Remark", projectStateHistory.Remark);
            response.WriteTagWithValue("State", projectStateHistory.State);
        }
        /// <summary>
        /// 项目状态历史列表的显示扩展
        /// </summary>
        /// <param name="projectStateHistoryList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<ProjectStateHistory> projectStateHistoryList, HttpResponse response)
        {
            ShowDelegate<ProjectStateHistory> showDelegate = new ShowDelegate<ProjectStateHistory>(ShowProjectStateHistory);
            projectStateHistoryList.Show<ProjectStateHistory>(response, showDelegate);
        }
    }
}
