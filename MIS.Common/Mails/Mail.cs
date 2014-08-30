using System.Net;
using System.Net.Mail;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Timers;

using jmail;

namespace MIS.Common.Mails
{
    /// <summary>
    /// 邮件
    /// </summary>
    public class Mail
    {
        #region 服务器相关设置

        /// <summary>
        /// 服务器地址
        /// </summary>
        public static string MailServerAddress;
        /// <summary>
        /// 服务器端口
        /// </summary>
        public static int Port;
        /// <summary>
        /// 用户名
        /// </summary>
        public static string UserName;
        /// <summary>
        /// 密码
        /// </summary>
        public static string Password;

        #endregion

        private string _sendMailAddress;
        private string _ReceiverMailAddress;
        private string _Title;
        private string _Content;
        private List<Attachment> _Attachments = new List<Attachment>();

        /// <summary>
        /// 构造邮件
        /// </summary>
        /// <param name="receiverMailAddress">接收方的邮件地址</param>
        /// <param name="title">邮件标题</param>
        /// <param name="content">邮件内容</param>
        /// <param name="sendMailAddress">发送方邮件地址</param>
        public Mail(string receiverMailAddress, string title, string content, string sendMailAddress)
        {
            if (String.IsNullOrEmpty(receiverMailAddress))
                throw new ArgumentNullException("receiverMailAddress");

            _ReceiverMailAddress = receiverMailAddress;
            _Title = title;
            _Content = content;
            _sendMailAddress = sendMailAddress;
        }

        /// <summary>
        /// 添加附件
        /// </summary>
        /// <param name="attachment"></param>
        public void AddAttachment(Attachment attachment)
        {
            _Attachments.Add(attachment);
        }

        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <returns>是否发送成功</returns>
        public void Send()
        {
            jmail.Message m = new jmail.Message();

            m.Charset = "gb2312";

            m.From = _sendMailAddress;

            m.Subject = _Title;

            m.AddRecipient(_ReceiverMailAddress, null, null);
            m.MailServerUserName = UserName;
            #region password

            m.MailServerPassWord = Password;

            #endregion
            m.ContentType = "text/html";
            m.Body = _Content;

            m.Send("mail.ouc.edu.cn", false);


            //.net自带发送组件

            //MailAddress from = new MailAddress(_sendMailAddress);
            //MailAddress to = new MailAddress(_ReceiverMailAddress);
            //MailMessage mailMessage = new MailMessage(from, to);

            //mailMessage.Subject = _Title;
            //mailMessage.Body = _Content;
            //mailMessage.SubjectEncoding = System.Text.Encoding.Default;
            //mailMessage.BodyEncoding = System.Text.Encoding.Default;
            //mailMessage.IsBodyHtml = true;

            //SmtpClient smtp = new SmtpClient(MailServerAddress, Port);
            //smtp.UseDefaultCredentials = false;

            //NetworkCredential basicAuthenticationInfo = new NetworkCredential();
            //basicAuthenticationInfo.UserName = UserName;
            //basicAuthenticationInfo.Password = Password;

            //smtp.Credentials = basicAuthenticationInfo;
            //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            //smtp.Send(mailMessage);
        }
    }
}
