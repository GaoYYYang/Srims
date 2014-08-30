using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using MIS.Common;
using MIS.Common.Mails;

namespace MIS.Test.Common
{
    /// <summary>
    /// Summary description for AttachmentTest
    /// </summary>
    [TestClass]
    public class AttachmentTest
    {
        [TestMethod, Description("构造函数测试")]
        public void CtorTest()
        {
            byte[] bytes = new byte[] { 123, 112 };
            Attachment attachment = new Attachment("constructor", bytes);

            Assert.AreEqual<string>("constructor", attachment.Name);
            Assert.AreEqual<byte[]>(bytes, attachment.Data);

            attachment = new Attachment(null, bytes);
        }
        [TestMethod, Description("构造附件异常测试"), ExpectedException(typeof(ArgumentNullException))]
        public void CreateAttachmentTest()
        {
            Attachment attachment = new Attachment(null, null);
        }
    }
}
