using Microsoft.VisualStudio.TestTools.UnitTesting;
using MIS.Common.Validate;

namespace MIS.Test.Common
{
    [TestClass()]
    public class ValidateFailExceptionTest
    {
        [TestMethod(), Description("验证异常测试")]
        public void ValidateResultTest()
        {
            ValidateResult validateResult = new Validater().Validate();
            ValidateFailException validateFailException = new ValidateFailException(validateResult);

            Assert.AreSame(validateResult, validateFailException.ValidateResult);
        }
    }
}
