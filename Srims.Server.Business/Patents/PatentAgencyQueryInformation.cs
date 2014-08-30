using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Query;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利代理机构查寻信息
    /// </summary>
    public class PatentAgencyQueryInformation : QueryInformation
    {
        /// <summary>
        ///代理机构名称
        /// </summary>
        public string AgencyName { get; set; }
        /// <summary>
        ///代理人联系方式
        /// </summary>
        public string Contract { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
