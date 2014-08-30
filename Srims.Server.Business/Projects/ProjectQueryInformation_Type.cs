using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Type;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询信息--类型信息
    /// </summary>
    public class ProjectQueryInformation_Type
    {
        /// <summary>
        /// 取得或设置项目等级
        /// </summary>
        public string[] projectRanks { get; set; }
        /// <summary>
        /// 取得或设置项目类别
        /// </summary>
        public string[] projectTypes { get; set; }
        /// <summary>
        /// 取得或设置项目资助领域
        /// </summary>
        public string[] projectSupportFields { get; set; }
        /// <summary>
        /// 取得或设置项目资助子领域
        /// </summary>
        public string[] projectSupportSubFields { get; set; }
        /// <summary>
        /// 取得或设置项目资助类别
        /// </summary>
        public string[] projectSupportCategories { get; set; }
        /// <summary>
        /// 取得或设置学科性质（文理分科）
        /// </summary>
        public SubjectNature projcectSubjectNature { get; set; }
    }
}
