using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Validate
{
    /// <summary>
    /// 可验证接口
    /// </summary>
    public interface IValidatable
    {
        /// <summary>
        /// 验证
        /// </summary>
        /// <returns>验证结果</returns>
        ValidateResult Validate(params object[] obj);
    }
}
