using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 二级学科查询信息
    /// </summary>
    public class SubjectSecondLevelQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置二级学科名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置二级学科代码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 取得或设置所属一级学科的名称
        /// </summary>
        public string SubjectFirstLevelID { get; set; }
    }
}