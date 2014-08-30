using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Experts;

namespace Srims.Server.DataExchange.ExpertImport
{
    /// <summary>
    /// 专家导入帮助
    /// </summary>
    public static class ExpertImportHelper
    {
        /// <summary>
        /// 取得专家性别类型
        /// </summary>
        /// <param name="sexType"></param>
        /// <returns></returns>
        public static SexType GetSexType(this string sexType)
        {
            sexType = sexType.Trim();

            switch (sexType)
            {
                case "男": return SexType.Man;
                case "女": return SexType.Women;
                default: return SexType.Unknown;
            }
        }
    }
}