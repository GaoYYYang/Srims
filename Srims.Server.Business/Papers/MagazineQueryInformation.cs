using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志查询信息
    /// </summary>
    public class MagazineQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置杂志基本查询信息
        /// </summary>
        public MagazineQueryInformation_Basic Basic { get; set; }
        /// <summary>
        /// 取得或设置杂志信息的查询信息
        /// </summary>
        public MagazineQueryInformation_Infor Infor { get; set; }
        /// <summary>
        /// 取得或设置杂志学科分类查询信息
        /// </summary>
        public MagazineQueryInformation_SubjectClass SubjectClass { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}

