using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.UI.MISExtension
{
    /// <summary>
    /// 判断是否为空的显示扩展
    /// </summary>
    public static class IsEmptyOrNullExtension
    {
        /// <summary>
        /// 判断字符串是否是null或者Empty
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static bool IsEmptyOrNull(this string s)
        {
            if (s == null)
                return true;

            return string.IsNullOrEmpty(s.Trim());
        }
        /// <summary>
        /// 判断可空bool是否为空
        /// </summary>
        /// <param name="b"></param>
        /// <returns></returns>
        public static bool IsEmptyOrNull(this bool? b)
        {
            return !b.HasValue;
        }
        /// <summary>
        /// 判断可空整形是否为空
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        public static bool IsEmptyOrNull(this int? i)
        {
            return !i.HasValue;
        }
        /// <summary>
        /// 判断数组是否为Null或Empty
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public static bool IsEmptyOrNull(this Array array)
        {
            if (array == null)
                return true;

            return array.Length == 0;
        }
        /// <summary>
        /// 判断range是否为null或Empty
        /// </summary>
        /// <param name="range"></param>
        /// <returns></returns>
        public static bool IsEmptyOrNull<T>(this Range<T> range)
            where T : struct
        {
            if (range == null)
                return true;

            return !range.Start.HasValue && !range.End.HasValue;
        }
    }
}
