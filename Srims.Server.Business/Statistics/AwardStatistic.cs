using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Awards;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 奖励统计
    /// </summary>
    public static class AwardStatistic
    {
        private const string AWARD_STATISTIC_ITEM = "Award";

        private static Dictionary<string, string[]> _GetAwardDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("Year", new string[] { "Year" });
            dimensionDictionary.Add("RankClass", new string[] { "Rank", "Class", "Classification" });
            dimensionDictionary.Add("AttendType", new string[] { "AttendType" });
            dimensionDictionary.Add("AuthorisedUnit", new string[] { "AuthorisedUnit" });
            dimensionDictionary.Add("Classification", new string[] { "Classification" });
            dimensionDictionary.Add("Winner", new string[] { "Expert", "College" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 奖励统计
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">奖励查询信息</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticAward(this IDatabase database, AwardQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            var idList = database.Awards.GetAward(queryInformation, null, database).Select(p => p.ID).ToArray();

            return Statistic.ExecuteStatistic(database, AWARD_STATISTIC_ITEM, idList, _GetAwardDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 奖励统计的权限扩展
    /// </summary>
    public static class AwardStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有奖励统计权限
        /// </summary>
        public static bool HasPermission_AwardStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database)
                || user.HasPermission(PermissionItem.ManageScienceAward, database)
                || user.HasPermission(PermissionItem.ManageLiteralAward, database);
        }
        /// <summary>
        /// 判断用户是否具有奖励统计视图管理权限
        /// </summary>
        public static bool HasPermission_AwardStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageScienceAward, database) || user.HasPermission(PermissionItem.ManageLiteralAward, database);
        }
    }
}
