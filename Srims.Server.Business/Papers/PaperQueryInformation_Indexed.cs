using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文查询信息--收录信息
    /// </summary>
    public class PaperQueryInformation_Indexed
    {
        /// <summary>
        /// 论文收录
        /// </summary>
        public PaperIndexedType[] Indexed { get; set; }
    }
}
