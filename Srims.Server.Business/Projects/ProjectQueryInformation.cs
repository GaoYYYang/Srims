using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询信息
    /// </summary>
    public class ProjectQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置项目的基本查询信息
        /// </summary>
        public ProjectQueryInformation_Basic Basic { get; set; }
        /// <summary>
        /// 取得或设置项目的经费查询信息
        /// </summary>
        public ProjectQueryInformation_Fund Fund { get; set; }
        /// <summary>
        /// 取得或设置项目的类型查询信息
        /// </summary>
        public ProjectQueryInformation_Type Type { get; set; }
        /// <summary>
        /// 取得或设置项目成员的查询信息
        /// </summary>
        public ProjectQueryInformation_Member Member { get; set; }
        /// <summary>
        /// 取得或设置项目状态的查询信息
        /// </summary>
        public ProjectQueryInformation_State State { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
