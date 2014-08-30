using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询信息--成员信息
    /// </summary>
    public class ProjectQueryInformation_Member
    {
        /// <summary>
        /// 专家基本信息
        /// </summary>
        public ExpertQueryInformation_Basic projectMemberQueryInformation { get; set; }
    }
}
