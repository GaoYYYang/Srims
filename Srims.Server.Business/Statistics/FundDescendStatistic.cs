using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 经费下拨统计
    /// </summary>
    public static class FundDescendStatistic
    {
        private const string FUND_DESCEND_STATISTIC_ITEM = "FundDescend";

        private static Dictionary<string, string[]> _GetFundDescendDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("StartDate", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("DescendDateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("FinanceDateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("Principal", new string[] { "Expert", "College" });
            dimensionDictionary.Add("ProjectType", new string[] { "Rank", "Type" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 统计经费下拨
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">查询信息</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticFundDescend(this IDatabase database, FundDescendQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            queryInformation.States = new FundDescendState[] { FundDescendState.Passed, FundDescendState.AllocationCompleted };
            var idList = database.FundDescends.GetFundDescend(queryInformation, null).Select(fd => fd.ID).ToArray();

            return Statistic.ExecuteStatistic(database, FUND_DESCEND_STATISTIC_ITEM, idList, _GetFundDescendDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 总经费统计的权限扩展
    /// </summary>
    public static class FundDescendStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有项目数目统计权限
        /// </summary>
        public static bool HasPermission_FundDescendStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database)
                || user.HasPermission(PermissionItem.ManageFund, database);
        }
        /// <summary>
        /// 判断用户是否具有项目数目统计视图管理权限
        /// </summary>
        public static bool HasPermission_FundDescendStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageFund, database);
        }
    }
}
