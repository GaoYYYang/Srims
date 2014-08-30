using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 邮件的相关扩展
    /// </summary>
    public static class EmailExtension
    {
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void SendMail(this HttpRequest request, User user, IDatabase database)
        {
            string receiverAddresses = request.GetString("receiverAddresses");
            string subject = request.GetString("subject");
            string content = request.GetString("content");

            string[] receiverAddressArray = receiverAddresses.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var receiverAddress in receiverAddressArray)
                user.SendMail(receiverAddresses, subject, content, database);
        }
        /// <summary>
        /// 取得发送邮件的细节
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static string GetMailDetail(this HttpRequest request)
        {
            string detail = "receiverAddresses: " + request.GetString("receiverAddresses") + "\n";
            detail += "subject: " + request.GetString("subject") + "\n";
            detail += "content: " + request.GetString("content") + "\n";
            return detail;
        }
    }
}
