using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Validate
{
    /// <summary>
    /// 验证失败异常
    /// </summary>
    public class ValidateFailException : ApplicationException
    {
        private ValidateResult _ValidateResult;

        /// <summary>
        /// 取得验证结果
        /// </summary>
        public ValidateResult ValidateResult
        {
            get { return _ValidateResult; }
        }

        /// <summary>
        /// 构造验证失败异常
        /// </summary>
        /// <param name="validateResult">验证结果</param>
        public ValidateFailException(ValidateResult validateResult)
            : base(validateResult.ToString())
        {
            this._ValidateResult = validateResult;
        }
    }
}
