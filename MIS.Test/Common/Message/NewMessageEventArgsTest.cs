using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

using MIS.Common.Message;

namespace MIS.Test.Common.Message
{
    [TestClass]
    public class NewMessageEventArgsTest
    {
        [TestMethod]
        public void CtorTest()
        {
            NewMessageEventArgs newMessageEventArgs = new NewMessageEventArgs(MesssageType.Detail, "test");
            Assert.AreEqual<MesssageType>(MesssageType.Detail, newMessageEventArgs.MessageType);
            Assert.AreEqual<string>("test", newMessageEventArgs.Message);
        }
    }
}
