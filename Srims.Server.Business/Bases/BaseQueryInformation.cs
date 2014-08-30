using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Query;
namespace Srims.Server.Business.Bases
{
    /// <summary>
    /// 基地查询条件
    /// </summary>
    public class BaseQueryInformation : QueryInformation
    {
        /// <summary>
        /// 基地名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 基地等级
        /// </summary>
        public string[] Ranks { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
