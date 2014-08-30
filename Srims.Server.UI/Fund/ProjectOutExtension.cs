using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Common;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;
using System.Web;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 外协分配扩展
    /// </summary>
    public static class ProjectOutExtension
    {
        /// <summary>
        /// 项目-外协列表的显示扩展
        /// </summary>
        /// <param name="projectout"></param>
        /// <param name="response"></param>
        public static void ShowInfor(ProjectOut projectout, HttpResponse response)
        {
            response.WriteTagWithValue("ID", projectout.ID);
            double amount = (double)(((double)projectout.Amount) / 1000000.0);
            response.WriteTagWithValue("Amount", amount);
            response.WriteTagWithValue("ProjectID", projectout.ProjectID);
            response.WriteTagWithValue("ProjectName", projectout.Project.Name);
            response.WriteTagWithValue("OutsourcingID",  projectout.Outsourcing.ID.ToString());
            response.WriteTagWithValue("OutsourcingName", projectout.Outsourcing.Name);
        }
        /// <summary>
        /// 外协分配的显示扩展
        /// </summary>
        /// <param name="projectOutList"></param>
        /// <param name="response"></param>
        /// <param name="response"></param>
        public static void Show(this IList<ProjectOut> projectOutList, HttpResponse response)
        {
            ShowDelegate<ProjectOut> showDelegate = new ShowDelegate<ProjectOut>(ShowInfor);
            projectOutList.Show<ProjectOut>(response, showDelegate);
        }
        /// <summary>
        /// 获得项目外协部分
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static List<ProjectOut> GetProjectOuts(this HttpRequest request, IDatabase database)
        {
            string projectOutsString = request.GetString("projectOutString");
            List<ProjectOut> projectOutList = new List<ProjectOut>();


            if (projectOutsString == null || string.IsNullOrEmpty(projectOutsString.Trim()))
                return projectOutList;

            var projectOutStringArray = projectOutsString.Split(new string[] { "|||" }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var projectOutString in projectOutStringArray)
            {
                var projectOutArray = projectOutString.Split(new string[] { "###" }, StringSplitOptions.RemoveEmptyEntries);

                ProjectOut projectOut = new ProjectOut();

                projectOut.Amount = Convert.ToInt64(projectOutArray[0]);
                projectOut.Outsourcing = database.Outsourcings.GetOutsourcingByName(projectOutArray[1]);
                projectOutList.Add(projectOut);
            }

            return projectOutList;

        }
    }
}
