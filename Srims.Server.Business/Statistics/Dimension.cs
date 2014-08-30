using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 统计维度
    /// </summary>
    public class Dimension
    {
        /// <summary>
        /// 维度名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 维度的颗粒度
        /// </summary>
        public string Size { get; set; }
    }
}
