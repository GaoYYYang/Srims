using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 管理费比例查询信息
    /// </summary>
    public class ManagementFeesQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置管理费收取类别
        /// </summary>
        public string[] managementFeesType { get; set; }
        /// <summary>
        /// 取得或设置排序信息
        /// </summary>
        public SortInfo SortInfor { get; set; }
    }
}
