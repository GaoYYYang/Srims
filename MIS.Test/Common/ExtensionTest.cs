using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

using MIS.Common;

namespace MIS.Test.Common
{
    [TestClass]
    public class ExtensionTest
    {
        [TestMethod, Description("连接字符串测试")]
        public void ToStringTest()
        {
            string[] stringNull = null;
            string[] stringNotEmpty = { "ni", "wo", "ta" };
            string[] stringMulti = { "12", "#", "%45" };

            Assert.AreEqual(null, stringNull.ToString("-"));
            Assert.AreEqual("ni-wo-ta", stringNotEmpty.ToString("-"));
            Assert.AreEqual("12%#%%45", stringMulti.ToString("%"));

            Assert.AreEqual("niwota", stringNotEmpty.ToString(string.Empty));
            Assert.AreEqual("ni wo ta", stringNotEmpty.ToString(" "));
        }
    }
}
