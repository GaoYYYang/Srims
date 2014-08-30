using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    ///论文查询信息
    /// </summary>
    public class PaperQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置基本查询信息
        /// </summary>
        public PaperQueryInformation_Basic Basic { get; set; }
        /// <summary>
        /// 取得或设置论文收录信息
        /// </summary>
        public PaperQueryInformation_Indexed Indexed { get; set; }
        /// <summary>
        /// 取得或设置作者查询信息
        /// </summary>
        public PaperQueryInformation_Author Author { get; set; }
        /// <summary>
        /// 取得或设置杂志查询信息
        /// </summary>
        public PaperQueryInformation_Magazine Magazine { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}

