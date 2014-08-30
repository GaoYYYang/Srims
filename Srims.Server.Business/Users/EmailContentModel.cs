using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 邮件发送模板
    /// </summary>
    public class EmailContentModel
    {
        /// <summary>
        /// 获得专家邮件内容模板
        /// </summary>
        /// <param name="receiverName"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        public static string GetExpertEmailContentModel(string receiverName, string action)
        {
            return string.Format(@"尊敬的{0}老师，您好！<div style=text-indent:2em;margin-top:10px>{1}<a href={2}>点击此处登录中国海洋大学科研管理系统</a></div><div style=text-indent:2em;margin-top:5px>感谢您对我们工作的支持</div><div style=margin-top:30px;margin-left:25px>中国海洋大学 科研信息管理系统(此邮件为系统自动发送，请勿回复）</div><div style=margin-left:40px>{3}</div>", receiverName, action, "http://121.251.234.119", DateTime.Now.Render());
        }

        /// <summary>
        /// 获得管理员邮件内容模板
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        public static string GetAdminEmailContentModel(string action)
        {
            return string.Format(@"尊敬的管理员，您好！<div style=text-indent:2em;margin-top:10px>{0}请您尽快登陆系统完成操作。<a href={1}>点击此处登录中国海洋大学科研管理系统</a></div><div style=margin-top:30px;margin-left:25px>中国海洋大学 科研信息管理系统(此邮件为系统自动发送，请勿回复）</div><div style=margin-left:40px>{2}</div>", action, "http://121.251.234.119", DateTime.Now.Render());
        }
    }
}
