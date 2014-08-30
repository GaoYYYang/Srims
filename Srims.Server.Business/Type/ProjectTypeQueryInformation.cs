using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目类型查询信息
    /// </summary>
    public class ProjectTypeQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置项目级别
        /// </summary>
        public int[] projectRanks { get; set; }
        /// <summary>
        /// 取得或设置排序信息
        /// </summary>
        public SortInfo SortInfor { get; set; }
    }
}
