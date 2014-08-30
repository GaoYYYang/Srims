using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common
{
    /// <summary>
    /// 非法数据异常
    /// </summary>
    public class InvalidDataException : ApplicationException
    {
        /// <summary>
        /// 默认错误消息
        /// </summary>
        public const string DEFAULT_ERROR_MESSAGE = "Invalid Data.";

        /// <summary>
        /// 构造非法数据异常
        /// </summary>
        public InvalidDataException()
            : base(DEFAULT_ERROR_MESSAGE)
        {
        }
        /// <summary>
        /// 构造非法数据异常
        /// </summary>
        /// <param name="message">异常信息</param>
        public InvalidDataException(string message)
            : base(message)
        {
        }
    }
}
