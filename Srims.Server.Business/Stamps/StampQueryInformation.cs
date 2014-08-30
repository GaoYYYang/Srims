using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Query;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印查询条件
    /// </summary>
    public class StampQueryInformation : QueryInformation
    {
        /// <summary>
        /// 用印材料来源
        /// </summary>
        public string StampStuffFromName { get; set; }
        /// <summary>
        /// 经办人
        /// </summary>
        public string Manager { get; set; }
        public string StampApplicationType { get; set; }
        public string StampApplicationTypeGroup { get; set; }
        /// <summary>
        /// 关键字
        /// </summary>
        public string KeyWord { get; set; }
        /// <summary>
        /// 用印事由
        /// </summary>
        public string[] StampReasons { get; set; }
        /// <summary>
        /// 用印类型
        /// </summary>
        public string[] StampTypes { get; set; }
        /// <summary>
        /// 用印文件
        /// </summary>
        public string[] StampStuffs { get; set; }
        /// <summary>
        /// 当前状态
        /// </summary>
        public StampState[] CurrentState { get; set; }
        /// <summary>
        /// 负责人
        /// </summary>
        public string Principal { get; set; }
        /// <summary>
        /// 初审管理员
        /// </summary>
        public string StampAdministrator { get; set; }
        /// <summary>
        /// 部门管理员
        /// </summary>
        public string StampDepartmentAdministrator { get; set; }
        /// <summary>
        /// 取得或设置论文作者的专家查询信息
        /// </summary>
        public ExpertQueryInformation_Basic PrincipalQueryInformation { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }

        /// <summary>
        /// 取得或设置文印当前状态日期
        /// </summary>
        public Range<DateTime> StateDate { get; set; }

    }
}
