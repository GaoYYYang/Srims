using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文查询信息--作者信息
    /// </summary>
    public class PaperQueryInformation_Author
    {
        /// <summary>
        /// 作者姓名
        /// </summary>
        public string PaperAuthorName { get; set; }
        /// <summary>
        /// 作者位次
        /// </summary>
        public int? AuthorOrder { get; set; }
        /// <summary>
        /// 是否是通讯作者
        /// </summary>
        public bool? IsLinkMan { get; set; }
        /// <summary>
        /// 取得或设置论文作者的专家查询信息
        /// </summary>
        public ExpertQueryInformation_Basic ExpertAuthorQueryInformation { get; set; }
    }
}
