using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目查询条件-状态
    /// </summary>
    public class ProjectQueryInformation_State
    {
        /// <summary>
        /// 取得或设置项目状态
        /// </summary>
        public ProjectState[] ProjectStates { get; set; }
    }
}
