using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文查询信息--杂志信息
    /// </summary>
    public class PaperQueryInformation_Magazine
    {
        /// <summary>
        /// 取得或设置论文杂志基本查询信息
        /// </summary>
        public MagazineQueryInformation_Basic MagazineBasic { get; set; }
        /// <summary>
        /// 取得或设置论文杂志信息的查询信息
        /// </summary>
        public MagazineQueryInformation_Infor MagazineInfor { get; set; }
        /// <summary>
        /// 取得或设置学科类查询信息
        /// </summary>
        public MagazineQueryInformation_SubjectClass SubjectClass { get; set; }
    }
}
