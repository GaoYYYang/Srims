using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利基本查询信息
    /// </summary>
    public class PatentQueryInformation_Basic
    {
        /// <summary> 
        /// 专利号
        /// </summary>
        public string Number { get; set; }
        /// <summary>
        /// 专利名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 专利ID
        /// </summary>
        public int? ID { get; set; }
        /// <summary>
        /// 所属学院
        /// </summary>
        public string CollegeName { get; set; }
        /// <summary>
        /// 申请时间
        /// </summary>
        public Range<DateTime> ApplicationDateTime { get; set; }
        /// <summary>
        /// 授权时间
        /// </summary>
        public Range<DateTime> AuthorizeDateTime { get; set; }
        /// <summary>
        /// 法律状态
        /// </summary>
        public PatentLawState[] LawStates { get; set; }
        /// <summary>
        /// 法律状态时间
        /// </summary>
        public Range<DateTime> LawStateTime { get; set; }
        /// <summary>
        /// 国别
        /// </summary>
        public string[] Countrys { get; set; }
        /// <summary>
        /// 专利分类
        /// </summary>
        public string[] Categorys { get; set; }
        /// <summary>
        /// 专利类型
        /// </summary>
        public PatentType[] Types { get; set; }
        /// <summary>
        /// 专利级别
        /// </summary>
        public PatentLevel[] Levels { get; set; }
        /// <summary>
        /// 是否已授权
        /// </summary>
        public bool? IsAccredited { get; set; }
    }
}
