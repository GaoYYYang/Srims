using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 一级学科查询信息
    /// </summary>
    public class SubjectFirstLevelQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置一级学科名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置一级学科代码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 取得或设置一级学科的排序方式
        /// </summary>
        public SortInfo sortInfor { get; set; }

    }
}
