using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common
{
    /// <summary>
    /// 日期
    /// </summary>
    public static class Date
    {
        /// <summary>
        /// 日期显示
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string Render(this DateTime dateTime)
        {
            if (dateTime == null)
                return string.Empty;

            return dateTime.ToLongDateString();
        }
    }
}
