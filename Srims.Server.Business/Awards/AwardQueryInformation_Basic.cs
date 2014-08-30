using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Awards
{
    /// <summary>
    /// 奖励查询信息--基本信息
    /// </summary>
    public class AwardQueryInformation_Basic
    {
        /// <summary>
        /// 获奖名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 奖励ID
        /// </summary>
        public int? ID { get; set; }
        /// <summary>
        /// 获奖年份
        /// </summary>
        public Range<int> Year { get; set; }
        /// <summary>
        /// 获奖级别
        /// </summary>
        public string[] Ranks { get; set; }
        /// <summary>
        /// 获奖等级
        /// </summary>
        public string[] Classes { get; set; }
        /// <summary>
        /// 所属学院
        /// </summary>
        public string CollegeName { get; set; }
        /// <summary>
        /// 奖励参与类型
        /// </summary>
        public string[] AttendType { get; set; }
        /// <summary>
        /// 获奖项目名称
        /// </summary>
        public string ProjectName { get; set; }
        /// <summary>
        /// 奖种
        /// </summary>
        public string[] Classification { get; set; }
        /// <summary>
        /// 授奖单位
        /// </summary> 
        public string[] AuthorisedUnit { get; set; }
        /// <summary>
        /// 奖励简介
        /// </summary>
        public string Introduction { get; set; }
        /// <summary>
        /// 奖励的学科分类（文理分科）
        /// </summary>
        public SubjectNature AwardSubjectNature { get; set; }
    }
}
