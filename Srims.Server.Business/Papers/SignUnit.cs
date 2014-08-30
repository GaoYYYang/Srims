using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 署名单位
    /// </summary>
    public enum SignUnit
    {
        /// <summary>
        /// 未知
        /// </summary>
        UnKnown = 0,
        /// <summary>
        /// 本校
        /// </summary>
        School = 1,
        /// <summary>
        /// 外单位
        /// </summary>
        UnitOut = 2,
        /// <summary>
        /// 我校+外单位
        /// </summary>
        SchoolUnitOut = 3,
        /// <summary>
        /// 外单位+我校
        /// </summary>
        UnitOutSchool = 4,
    }
}
