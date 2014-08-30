using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 总经费统计
    /// </summary>
    public static class FundTotalStatistic
    {
        private const string FUND_TOTAL_STATISTIC_ITEM = "FundTotal";

        private static Dictionary<string, string[]> _GetFundTotalDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("StartDate", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("Principal", new string[] { "Expert", "College" });
            dimensionDictionary.Add("ProjectType", new string[] { "Rank", "Type" });
            dimensionDictionary.Add("ProjectState", new string[] { "State" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 统计项目总经费
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">查询条件</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticFundTotal(this IDatabase database, ProjectQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            var idList = database.Projects.GetProject(queryInformation, null, database).Select(p => p.ID).ToArray();

            return Statistic.ExecuteStatistic(database, FUND_TOTAL_STATISTIC_ITEM, idList, _GetFundTotalDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 总经费统计的权限扩展
    /// </summary>
    public static class FundTotalStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有项目数目统计权限
        /// </summary>
        public static bool HasPermission_FundTotalStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database)
                || user.HasPermission_ShowHorizontalProject(database)
                || user.HasPermission_ShowVerticalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有项目数目统计视图管理权限
        /// </summary>
        public static bool HasPermission_FundTotalStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission_ShowHorizontalProject(database)
                || user.HasPermission_ShowVerticalProject(database);
        }
    }
}
