using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文查询信息--基本信息
    /// </summary>
    public class LiberalArtsPaperQueryInformation_Basic
    {
        /// <summary>
        /// 发表年
        /// </summary>
        public string PublishDateYear { get; set; }
        /// <summary>
        /// 文章等级
        /// </summary>
        public string Degree { get; set; }
        /// <summary>
        /// 成果名
        /// </summary>
        public string ResultsName { get; set; }
        /// <summary>
        /// 成果类别
        /// </summary>
        public ResultsType[] Type { get; set; }

        /// <summary>
        /// 成果形式
        /// </summary>
        public string ResultsForm { get; set; }
        /// <summary>
        /// 期刊名或出版社
        /// </summary>
        public string Publisher { get; set; }

        /// <summary>
        /// 我校署名位次
        /// </summary>
        public Range<Int32> OurSchoolSignRank { get; set; }


    }
}
