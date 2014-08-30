using System;
using System.Collections.Generic;
using System.Text;

namespace MIS.Common.Validate
{
    /// <summary>
    /// 验证结果
    /// </summary>
    public class ValidateResult
    {
        private bool _IsValidated;
        private String[] _ErrorMessage;

        /// <summary>
        /// 取得是否验证通过
        /// </summary>
        public bool IsValidated
        {
            get { return _IsValidated; }
        }
        /// <summary>
        /// 取得错误信息
        /// </summary>
        public String[] ErrorMessage
        {
            get { return _ErrorMessage; }
        }

        internal ValidateResult(bool isValidated, String[] errorMessage)
        {
            this._IsValidated = isValidated;
            this._ErrorMessage = errorMessage;
        }

        /// <summary>
        /// 验证结果的字符表示
        /// </summary>
        /// <returns>验证结果的字符表示</returns>
        public override string ToString()
        {
            if (_IsValidated) return "验证通过";

            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("验证失败：");

            foreach (var message in _ErrorMessage)
                stringBuilder.AppendLine(message);
            
            return stringBuilder.ToString();
        }
    }
}
