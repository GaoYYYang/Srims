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
    public class PaperQueryInformation_Basic
    {
        /// <summary>
        /// 论文名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 论文关键词
        /// </summary>
        public string PaoerKeyWord { get; set; }
        /// <summary>
        /// 文章类型
        /// </summary>
        public PaperType[] Type { get; set; }
        /// <summary>
        /// 发表年份
        /// </summary>
        public Range<Int32> PulishDateTimeYear { get; set; }
        /// <summary>
        /// 开始影响因子
        /// </summary>
        public Range<Int32> InfluenceFactor { get; set; }
        /// <summary>
        /// 引用频率
        /// </summary>
        public Range<Int32> CiteFrequency { get; set; }
        /// <summary>
        /// 所属分区
        /// </summary>
        public Range<Int32> SubAirer { get; set; }
        /// <summary>
        /// 所属学院
        /// </summary>
        public string College { get; set; }
        /// <summary>
        /// 所属实验室
        /// </summary>
        public string Lab { get; set; }
        /// <summary>
        /// 通讯作者的署名单位
        /// </summary>
        public SignUnit[] LinkManSingUnit { get; set; }
        /// <summary>
        /// 第一作者的署名单位
        /// </summary>
        public SignUnit[] FistAuthorSignUnit { get; set; }
        /// <summary>
        /// 专家的职称和学历是否是或的关系
        /// </summary>
        public bool? IsFistAuthorOrLinkManSignUnit { get; set; }
    }
}
