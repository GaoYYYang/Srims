using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Validate
{
    /// <summary>
    /// 验证器
    /// </summary>
    public class Validater : IValidatable
    {
        private List<String> _ErrorMessageList = new List<string>();

        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="validateExpression">要验证的表达式</param>
        /// <param name="unValidatedMessage">验证失败的提示信息</param>
        public Validater AddCondition(bool validateExpression, string unValidatedMessage)
        {
            if (!validateExpression)
                _ErrorMessageList.Add(unValidatedMessage);

            return this;
        }
        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="validateExpression">要验证的表达式</param>
        /// <param name="unValidatedMessage">验证失败的提示信息</param>
        public Validater AddCondition(bool validateExpression, IEnumerable<String> unValidatedMessage)
        {
            if (!validateExpression)
                _ErrorMessageList.AddRange(unValidatedMessage);

            return this;
        }
        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="validater">验证器</param>
        public Validater AddCondition(IValidatable validater)
        {
            ValidateResult validateResult = validater.Validate();
            if (!validateResult.IsValidated)
                _ErrorMessageList.AddRange(validateResult.ErrorMessage);

            return this;
        }
        /// <summary>
        /// 取得验证结果
        /// </summary>
        /// <returns>验证结果</returns>
        public ValidateResult Validate()
        {
            return new ValidateResult(_ErrorMessageList.Count == 0, _ErrorMessageList.ToArray());
        }

        /// <summary>
        /// 验证器的字符表示
        /// </summary>
        /// <returns>验证器的字符表示</returns>
        public override string ToString()
        {
            return Validate().ToString();
        }

        #region IValidatable Members

        /// <summary>
        /// 实现验证器接口
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public ValidateResult Validate(params object[] obj)
        {
            return this.Validate();
        }

        #endregion
    }
}
