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
    /// Summary description for MailTest
    /// </summary>
    [TestClass]
    public class MailTest
    {
        Mail mail = new Mail("xuyy56@gmail.com", "nihao", "huanyingguanglin", "xu222ying@yahoo.com.cn");

        [TestMethod, Description("构造函数测试")]
        public void CtorTest()
        {
            var mail_accessor = Mail_Accessor.AttachShadow(mail);

            Assert.AreEqual<string>("xuyy56@gmail.com", mail_accessor._ReceiverMailAddress);
            Assert.AreEqual<string>("nihao", mail_accessor._Title);
            Assert.AreEqual<string>("huanyingguanglin", mail_accessor._Content);
            Assert.AreEqual<string>("xu222ying@yahoo.com.cn", mail_accessor._sendMailAddress);
        }

        [TestMethod, Description("添加附件测试")]
        public void AddAttachmentTest()
        {
            byte[] bytes = new byte[] { 123, 222 };
            Attachment attachment = new Attachment("nihao", bytes);
            mail.AddAttachment(attachment);
            var mail_accessor = Mail_Accessor.AttachShadow(mail);

            Assert.AreEqual<Attachment>(attachment, mail_accessor._Attachments[0]);

            attachment = new Attachment("nihaoma", bytes);
            mail.AddAttachment(attachment);
            Assert.AreEqual<Attachment>(attachment, mail_accessor._Attachments[1]);
        }
        [TestMethod, Description("构造邮件异常测试"), ExpectedException(typeof(ArgumentNullException))]
        public void CreateMailExceptionTest()
        {
            Mail mail = new Mail(null, null, null, null);
        }
        [TestMethod, Description("发送邮件测试"), ExpectedException(typeof(System.Net.Mail.SmtpException))]
        public void SendTest()
        {
            mail.Send();
        }
    }
}
