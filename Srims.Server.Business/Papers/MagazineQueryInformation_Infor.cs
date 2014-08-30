using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志查询信息--年度信息
    /// </summary>
    public class MagazineQueryInformation_Infor
    {
        /// <summary>
        /// 影响因子
        /// </summary>
        public Range<Int32> InfluenceFactor { get; set; }
        /// <summary>
        /// 引用频率
        /// </summary>
        public Range<Int32> CiteFrequency { get; set; }
        /// <summary>
        /// 分区
        /// </summary>
        public Range<Int32> SubAirer { get; set; }
        /// <summary>
        /// 年份（用于查询影响因子和引用频率）
        /// </summary>
        public int? Year { get; set; }
    }
}
