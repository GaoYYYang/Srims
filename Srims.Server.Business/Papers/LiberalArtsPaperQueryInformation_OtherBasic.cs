using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common;
namespace Srims.Server.Business.Papers
{
    public class LiberalArtsPaperQueryInformation_OtherBasic
    {
        /// <summary>
        /// 序列号
        /// </summary>
        public string SerialNumbe { get; set; }
        /// <summary>
        /// 英文篇名
        /// </summary>
        public string EnglishName { get; set; }
        /// <summary>
        /// 基金
        /// </summary>
        public string Fund { get; set; }
        /// <summary>
        /// ISSN
        /// </summary>
        public string ISSN { get; set; }
        /// <summary>
        /// 第一机构
        /// </summary>
        public string FirstOrganization { get; set; }
        /// <summary>
        /// 机构名称
        /// </summary>
        public string OrganizationName { get; set; }
        /// <summary>
        /// 地区
        /// </summary>
        public string Region { get; set; }
        /// <summary>
        /// 学科分类
        /// </summary>
        public string SubjectClass { get; set; }
        /// <summary>
        /// CODEN
        /// </summary>
        public string CODEN { get; set; }
        /// <summary>
        /// 年代卷期
        /// </summary>
        public string IssuesDate { get; set; }
        /// <summary>
        /// 关键词
        /// </summary>
        public string KeyWord { get; set; }
        /// <summary>
        /// 标志
        /// </summary>
        public string Mark { get; set; }
        /// <summary>
        /// 学位分类
        /// </summary>
        public string DegreeType { get; set; }
        /// <summary>
        /// 引用频次
        /// </summary>
        public Range<Int32> CiteTime { get; set; }
        /// <summary>
        /// 所属学院名称
        /// </summary>
        public string CollegeName { get; set; }
      
    }
}
