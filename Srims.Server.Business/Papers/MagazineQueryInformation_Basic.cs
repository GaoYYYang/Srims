using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志查询信息--基本信息
    /// </summary>
    public class MagazineQueryInformation_Basic
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 名称集合
        /// </summary>
        public string[] Names { get; set; }
        /// <summary>
        /// ISSN
        /// </summary>
        public string ISSN { get; set; }
        /// <summary>
        /// 语言
        /// </summary>
        public Language[] Language { get; set; }
        /// <summary>
        /// 学科等级
        /// </summary>
        public string[] SubjectRank { get; set; }
    }
}
