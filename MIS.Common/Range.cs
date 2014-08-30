using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common
{
    /// <summary>
    /// 表示一个数据段
    /// </summary>
    public class Range<T>
        where T : struct
    {
        /// <summary>
        /// 取得起始数据
        /// </summary>
        public T? Start { get; set; }
        /// <summary>
        /// 取得终止数据
        /// </summary>
        public T? End { get; set; }

        /// <summary>
        /// 构造一个数据段
        /// </summary>
        public Range() { }

        /// <summary>
        /// 构造一个数据段
        /// </summary>
        /// <param name="start">起始数据</param>
        /// <param name="end">终止数据</param>
        public Range(T? start, T? end)
        {
            Start = start;
            End = end;
        }
    }

}
