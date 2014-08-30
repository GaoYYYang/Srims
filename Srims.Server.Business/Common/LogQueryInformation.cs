using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 日志查询信息
    /// </summary>
    public class LogQueryInformation : QueryInformation
    {
        /// <summary>
        /// 日志用户
        /// </summary>
        public string User { get; set; }
        /// <summary>
        /// 日志写入时间
        /// </summary>
        public Range<DateTime> WriteTime { get; set; }
        /// <summary>
        /// 日志操作
        /// </summary>
        public string[] Action { get; set; }
        /// <summary>
        /// 取得或设置日志的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
