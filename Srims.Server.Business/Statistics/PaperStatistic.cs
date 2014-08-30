using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Papers;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 论文统计
    /// </summary>
    public static class PaperStatistic
    {
        private const string PAPER_STATISTIC_ITEM = "Paper";

        private static Dictionary<string, string[]> _GetPaperDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("PublishDateYear", new string[] { "Year" });
            dimensionDictionary.Add("Indexed", new string[] { "Indexed" });
            dimensionDictionary.Add("College", new string[] { "College" });
            dimensionDictionary.Add("LinkMan", new string[] { "Expert", "College" });
            dimensionDictionary.Add("FirstAuthor", new string[] { "Expert", "College" });
            dimensionDictionary.Add("Type", new string[] { "Type" });
            dimensionDictionary.Add("SubAirer", new string[] { "SubAirer" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 统计论文
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">查询条件</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticPaper(this IDatabase database, PaperQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            var idList = database.Papers.GetPaper(queryInformation, null, database).Select(p => p.ID).ToArray();

            return Statistic.ExecuteStatistic(database, PAPER_STATISTIC_ITEM, idList, _GetPaperDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 总经费统计的权限扩展
    /// </summary>
    public static class PaperStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有论文统计权限
        /// </summary>
        public static bool HasPermission_PaperStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database)
                || user.HasPermission(PermissionItem.ManagePaper, database);
        }
        /// <summary>
        /// 判断用户是否具有论文统计视图管理权限
        /// </summary>
        public static bool HasPermission_PaperStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePaper, database);
        }
    }
}
