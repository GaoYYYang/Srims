using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询信息-基本信息
    /// </summary>
    public class ProjectQueryInformation_Basic
    {
        /// <summary>
        /// 取得或设置是否横向项目
        /// </summary>
        public bool? IsHorizontal { get; set; }
        /// <summary>
        /// 取得或设置是否涉密
        /// </summary>
        public bool? IsSecret { get; set; }
        /// <summary>
        /// 取得或设置项目的名称或名称首字母
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置项目的编号
        /// </summary>
        public string Number { get; set; }
        /// <summary>
        /// 取得或设置项目负责任的名称或名称首字母
        /// </summary>
        public string Principal { get; set; }
        /// <summary>
        /// 取得或设置项目负责人所在学院的名称
        /// </summary>
        public string PrincipalCollege { get; set; }
        /// <summary>
        /// 取得或设置学科代码
        /// </summary>
        public string SubjectCode { get; set; }
        /// <summary>
        /// 取得或设置研究属性
        /// </summary>
        public string[] SearchTypes { get; set; }
        /// <summary>
        /// 取得或设置合作类型
        /// </summary>
        public string[] CooperationTypes { get; set; }
        /// <summary>
        /// 取得或设置项目来源单位
        /// </summary>
        public string TaskFroms { get; set; }
        /// <summary>
        /// 取得或设置项目的单位地址
        /// </summary>
        public string CorporationPlace { get; set; }
        /// <summary>
        /// 取得或设置项目级别
        /// </summary>
        public ProjectLevel[] ProjectLevels { get; set; }
        /// <summary>
        /// 取得或设置项目的开始日期
        /// </summary>
        public Range<DateTime> StartDate { get; set; }
        /// <summary>
        /// 取得或设置项目的结束日期
        /// </summary>
        public Range<DateTime> EndDate { get; set; }
        /// <summary>
        /// 专家的参与方式（负责人，参与，被委托人），仅当用户为专家的时候有用
        /// </summary>
        public ExpertAttendType ExpertAttendType { get; set; }
        /// <summary>
        /// 判断是否是取得待审核的项目
        /// </summary>
        public bool? IsCensor { get; set; }
    }
}
