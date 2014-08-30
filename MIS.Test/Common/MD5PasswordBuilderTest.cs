using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace MIS.Test.Common
{
    [TestClass]
    public class MD5PasswordBuilderTest
    {
        [TestMethod, Description("密码构造测试")]
        public void BuildPasswordTest()
        {
            Assert.AreEqual<string>(null, PasswordBuilder.BuildPassword(null));
            Assert.AreEqual<string>(string.Empty, PasswordBuilder.BuildPassword(string.Empty));
            Assert.AreEqual<string>("a0b923820dcc509a", PasswordBuilder.BuildPassword("1"));
            Assert.AreEqual<string>("93e62ff34ca0fbd9", PasswordBuilder.BuildPassword("yuandong"));
        }
    }
}
