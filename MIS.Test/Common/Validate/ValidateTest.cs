using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

using MIS.Common.Validate;

namespace MIS.Test.Common
{
    /// <summary>
    /// 验证器的测试
    /// </summary>
    [TestClass()]
    public class ValidateTest
    {
        /// <summary>
        /// 不进行任何验证测试。默认验证结果为通过。
        /// </summary>
        [TestMethod(), Description("不进行任何验证测试。默认验证结果为通过。")]
        public void NoValidateTest()
        {
            Validater validater = new Validater();

            ValidateResult validateResult = validater.Validate();
            Assert.IsTrue(validateResult.IsValidated);
            Assert.AreEqual<int>(0, validateResult.ErrorMessage.Length);
        }
        /// <summary>
        /// 验证通过测试
        /// </summary>
        [TestMethod(), Description("验证通过测试")]
        public void ValidatePassTest()
        {
            Validater validater = new Validater()
                .AddCondition(true, "Error");

            ValidateResult validateResult = validater.Validate();
            Assert.IsTrue(validateResult.IsValidated);
            Assert.AreEqual<int>(0, validateResult.ErrorMessage.Length);
        }

        /// <summary>
        /// 验证失败测试
        /// </summary>
        [TestMethod(), Description("验证失败测试")]
        public void ValidateFailTest()
        {
            Validater validater = new Validater()
                .AddCondition(true, "Error1")
                .AddCondition(false, "Error2")
                .AddCondition(false, "Error3");

            ValidateResult validateResult = validater.Validate();
            Assert.IsFalse(validateResult.IsValidated);

            //Validate error message
            Assert.AreEqual<int>(2, validateResult.ErrorMessage.Length);
            Assert.AreEqual<string>("Error2", validateResult.ErrorMessage[0]);
            Assert.AreEqual<string>("Error3", validateResult.ErrorMessage[1]);
        }
        /// <summary>
        /// 验证失败测试
        /// </summary>
        [TestMethod(), Description("验证失败测试--同时添加多条错误信息")]
        public void ValidateFailWithMutipleErrorMessageTest()
        {
            Validater validater = new Validater()
                .AddCondition(false, new string[] { "Error2", "Error3" });

            ValidateResult validateResult = validater.Validate();
            Assert.IsFalse(validateResult.IsValidated);

            //Validate error message
            Assert.AreEqual<int>(2, validateResult.ErrorMessage.Length);
            Assert.AreEqual<string>("Error2", validateResult.ErrorMessage[0]);
            Assert.AreEqual<string>("Error3", validateResult.ErrorMessage[1]);
        }
        /// <summary>
        /// 验证失败测试
        /// </summary>
        [TestMethod(), Description("验证失败测试--用验证器作为验证条件")]
        public void ValidateFailWithValidaterAsCondtionTest()
        {
            Validater validater = new Validater()
                .AddCondition(new Validater().AddCondition(false, new string[] { "Error2", "Error3" }));

            ValidateResult validateResult = validater.Validate();
            Assert.IsFalse(validateResult.IsValidated);

            //Validate error message
            Assert.AreEqual<int>(2, validateResult.ErrorMessage.Length);
            Assert.AreEqual<string>("Error2", validateResult.ErrorMessage[0]);
            Assert.AreEqual<string>("Error3", validateResult.ErrorMessage[1]);
        }

        /// <summary>
        /// Validater和ValidateResult的ToSring()方法测试
        /// </summary>
        [TestMethod(), Description("Validater和ValidateResult的ToSring()方法测试")]
        public void ToSringTest()
        {
            Validater validater;
            ValidateResult validateResult;

            //验证通过
            validater = new Validater();
            validateResult = validater.Validate();
            Assert.AreEqual<string>("验证通过", validateResult.ToString());
            Assert.AreEqual<string>("验证通过", validater.ToString());

            //验证失败
            validater = new Validater();
            validater.AddCondition(false, "Error1");
            validater.AddCondition(false, "Error2");
            validateResult = validater.Validate();
            Assert.AreEqual<string>("验证失败：\r\nError1\r\nError2\r\n", validateResult.ToString());
            Assert.AreEqual<string>("验证失败：\r\nError1\r\nError2\r\n", validater.ToString());

        }


    }
}
