using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 统计
    /// </summary>
    public static class Statistic
    {
        /// <summary>
        /// 第一列（首列）的名称
        /// </summary>
        public const string HEAD_COLUMN_NAME = "HeadColumn";
        /// <summary>
        /// Null行的名称
        /// </summary>
        public const string NULL_ROW_HEAD = "未知";

        internal static DataTable ExecuteStatistic(IDatabase database, string statisticItem, int[] idArray, Dictionary<string, string[]> dimensionDictionary, Dimension columnDimension, Dimension rowDimension)
        {
            if (!_IsDimensionAvailable(dimensionDictionary, columnDimension))
                throw new ArgumentOutOfRangeException("columnDimension");
            if (!_IsDimensionAvailable(dimensionDictionary, rowDimension))
                throw new ArgumentOutOfRangeException("rowDimension");

            if (idArray != null && idArray.Length == 0)
                return null;

            return database.Statistic(statisticItem, idArray, columnDimension, rowDimension);
        }
        private static bool _IsDimensionAvailable(Dictionary<string, string[]> dimensionDictionary, Dimension dimension)
        {
            return dimensionDictionary.ContainsKey(dimension.Name)
                && dimensionDictionary[dimension.Name].Contains(dimension.Size);
        }

    }
}
