using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利发明人查询信息
    /// </summary>
    public class PatentQueryInformation_Inventer
    {
        /// <summary>
        /// 专利发明人
        /// </summary>
        public string PatentInventer { get; set; }
        /// <summary>
        /// 发明人位次
        /// </summary>
        public int? InventOrder { get; set; }
        /// <summary>
        /// 是否负责人
        /// </summary>
        public bool? IsPrincipal { get; set; }
        /// <summary>
        /// 作者信息
        /// </summary>
        public ExpertQueryInformation_Basic AuthorQueryInformation { get; set; }
    }
}
