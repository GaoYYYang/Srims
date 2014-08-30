using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家基本信息查询信息
    /// </summary>
    public class ExpertQueryInformation_Basic
    {
        /// <summary>
        /// 专家学院
        /// </summary>
        public string ExpertCollege { get; set; }
        /// <summary>
        /// 专家职称
        /// </summary>
        public string[] ExpertPost { get; set; }
        /// <summary>
        /// 专家职称
        /// </summary>
        public Range<Int32> ExpertPostLevel { get; set; }
        /// <summary>
        /// 专家学历
        /// </summary>
        public string[] ExpertAcademyDegree { get; set; }
        /// <summary>
        /// 专家出生日期
        /// </summary>
        public Range<DateTime> ExpertBirthday { get; set; }
        /// <summary>
        /// 专家的职称和学历是否是或的关系
        /// </summary>
        public bool? IsPostOrAcademyDegree { get; set; }
        /// <summary>
        /// 专家的工作正号
        /// </summary>
        public string Number { get; set; }
        /// <summary>
        /// 专家姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 专家是否是博导
        /// </summary>
        public bool? IsDotorDirector { get; set; }
        /// <summary>
        /// 专家是否是院士
        /// </summary>
        public bool? IsAcademician { get; set; }
    }
}

