using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利查询信息
    /// </summary>
    public class PatentQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置专利基本查询信息
        /// </summary>
        public PatentQueryInformation_Basic BasicInformation { get; set; }
        /// <summary>
        /// 取得或设置专利的发明人查询信息
        /// </summary>
        public PatentQueryInformation_Inventer InventerInformation { get; set; }        
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
