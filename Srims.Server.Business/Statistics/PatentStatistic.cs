using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Patents;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 专利统计
    /// </summary>
    public static class PatentStatistic
    {
        private const string PATENT_STATISTIC_ITEM = "Patent";

        private static Dictionary<string, string[]> _GetPatentDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("ApplicationDateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("AuthorizeDateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("LawState", new string[] { "LawState" });
            dimensionDictionary.Add("LawStateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("Category", new string[] { "Category" });
            dimensionDictionary.Add("Type", new string[] { "Type" });
            dimensionDictionary.Add("Level", new string[] { "Level" });
            dimensionDictionary.Add("College", new string[] { "College" });
            dimensionDictionary.Add("Principal", new string[] { "Expert", "College" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 专利统计
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">专利查询信息</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticPatent(this IDatabase database, PatentQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            var idList = database.Patents.GetPatent(queryInformation, null, database).Select(p => p.ID).ToArray();

            return Statistic.ExecuteStatistic(database, PATENT_STATISTIC_ITEM, idList, _GetPatentDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 专利统计的权限扩展
    /// </summary>
    public static class PatentStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有专利统计权限
        /// </summary>
        public static bool HasPermission_PatentStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database) || user.HasPermission(PermissionItem.ManagePatent, database);
        }
        /// <summary>
        /// 判断用户是否具有专利统计视图管理权限
        /// </summary>
        public static bool HasPermission_PatentStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePatent, database);
        }
    }
}
