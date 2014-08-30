using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家成果统计更新参数
    /// </summary>
    public class ExpertAchieveStatisticUpdateParameters
    {
        /// <summary>
        /// 项目ID
        /// </summary>
        public int[] Project_IDArray { get; set; }

        /// <summary>
        /// 论文ID
        /// </summary>
        public int[] Paper_IDArray { get; set; }
        /// <summary>
        /// 是否通讯作者
        /// </summary>
        public bool? Paper_IsLinkMan { get; set; }
        /// <summary>
        /// 论文作者位次
        /// </summary>
        public Range<Int32> Paper_AuthorOrder { get; set; }

        /// <summary>
        /// 专利ID
        /// </summary>
        public int[] Patent_IDArray { get; set; }
        /// <summary>
        /// 是否专利负责人
        /// </summary>
        public bool? Patent_IsPrincipal { get; set; }
        /// <summary>
        /// 专利发明人位次
        /// </summary>
        public Range<Int32> Patent_InvertorOrder { get; set; }

        /// <summary>
        /// 奖励ID
        /// </summary>
        public int[] Award_IDArray { get; set; }
        /// <summary>
        /// 奖励获得人位次
        /// </summary>
        public Range<Int32> Award_WinnerOrder { get; set; }
    }
}
