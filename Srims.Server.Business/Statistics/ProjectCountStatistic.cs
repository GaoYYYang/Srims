using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 项目数目统计
    /// </summary>
    public static class ProjectCountStatistic
    {
        private const string PROJECT_COUNT_STATISTIC_ITEM = "ProjectCount";

        private static Dictionary<string, string[]> _GetProjectCountDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("StartDate", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("Principal", new string[] { "Expert", "College" });
            dimensionDictionary.Add("ProjectType", new string[] { "Rank", "Type" });
            dimensionDictionary.Add("ProjectState", new string[] { "State" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 统计项目数目
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">查询条件</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticProjectCount(this IDatabase database, ProjectQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            var idList = database.Projects.GetProject(queryInformation, null, database).Select(p => p.ID).ToArray();

            return Statistic.ExecuteStatistic(database, PROJECT_COUNT_STATISTIC_ITEM, idList, _GetProjectCountDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 项目数目统计的权限扩展
    /// </summary>
    public static class ProjectCountStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有项目数目统计权限
        /// </summary>
        public static bool HasPermission_ProjectCountStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database)
                || user.HasPermission_ShowHorizontalProject(database)
                || user.HasPermission_ShowVerticalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有项目数目统计视图管理权限
        /// </summary>
        public static bool HasPermission_ProjectCountStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission_ShowHorizontalProject(database)
                || user.HasPermission_ShowVerticalProject(database);
        }
    }
}
