using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.DataExchange.MagazineImport
{
    /// <summary>
    /// 杂志年度信息导入帮助
    /// </summary>
    public static class MagazineInformationImportHelper
    {
        private const int Unit = 1000;
        /// <summary>
        /// 转为影响因子的显示扩展
        /// </summary>
        /// <param name="influenceFactor"></param>
        /// <returns></returns>
        public static int? ToInFluenceFactor(this string influenceFactor)
        {
            if (influenceFactor == null || string.IsNullOrEmpty(influenceFactor.Trim()))
                return null;

            return Convert.ToInt32(Convert.ToDouble(influenceFactor) * Unit);
        }
        /// <summary>
        /// 转为即时指数的显示扩展
        /// </summary>
        /// <param name="instantExponent"></param>
        /// <returns></returns>
        public static int? ToInstantExpnoent(this string instantExponent)
        {
            if (instantExponent == null || string.IsNullOrEmpty(instantExponent.Trim()))
                return null;

            return Convert.ToInt32(Convert.ToDouble(instantExponent) * Unit);
        }
    }
}
