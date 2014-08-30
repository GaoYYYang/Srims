using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 部门查询信息
    /// </summary>
    public class DepartmentQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置部门名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置部门代码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 取得或设置部门简称
        /// </summary>
        public string ShortName { get; set; }
        /// <summary>
        /// 取得或设置是否是学院
        /// </summary>
        public bool IsCollege { get; set; }
        /// <summary>
        /// 取得或设置一级学科的排序方式
        /// </summary>
        public SortInfo sortInfor { get; set; }
    }
}
