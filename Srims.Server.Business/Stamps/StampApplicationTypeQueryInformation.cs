using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 项目类型查询信息
    /// </summary>
    public class StampApplicationTypeQueryInformation : QueryInformation
    {
        /// <summary>
        /// 是否项目相关
        /// </summary>
        public bool? IsProjectRelated { get; set; }
        /// <summary>
        /// 文印类型组
        /// </summary>
        public int? StampApplicationTypeGroupID { get; set; }
        /// <summary>
        /// 文印类型ID
        /// </summary>
        public int? ID { get; set; }
        /// <summary>
        /// 是否二级审核
        /// </summary>
        public bool? IsTwiceCancer { get; set; }
        /// <summary>
        /// 取得或设置排序信息
        /// </summary>
        public SortInfo SortInfor { get; set; }
    }
}