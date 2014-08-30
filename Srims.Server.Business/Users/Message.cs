using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 短消息
    /// </summary>
    public partial class Message : Entity<Message>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            // validater.AddCondition(Sender != null, "发送人不能为空！");
            validater.AddCondition(Receiver != null, "收信人不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(Title), "短消息标题不能为空！");
            validater.AddCondition(DateTime != null, "发送时间不能为空！");
        }
        /// <summary>
        /// 标记为已读
        /// </summary>
        /// <param name="database"></param>
        public void MarkAsRead(IDatabase database)
        {
            IsRead = true;
            this.Save(database);
        }

        /// <summary>
        /// 发送短消息
        /// </summary>
        /// <param name="title"></param>
        /// <param name="body"></param>
        /// <param name="sender"></param>
        /// <param name="receiver"></param>
        /// <param name="database"></param>
        public static void SendMessage(string title, string body, User sender, User receiver, IDatabase database)
        {
            MessageContent messageContent;

            if (!receiver.IsExpert)
                messageContent = GetMessageContentModelToAdmin(title, body);
            else
                messageContent = GetMessageContentModelToExpert(title, body, receiver.Name);

            sender.SendMessage(database, receiver, messageContent);
        }
        private static MessageContent GetMessageContentModelToAdmin(string title, string body)
        {
            var content = String.Format(@"尊敬的管理员，您好！<div style=text-indent:2em;margin-top:10px>{0}</div><div style=margin-top:30px;margin-left:25px>中国海洋大学 科研信息管理系统</div><div style=margin-left:40px>{1}</div>", body, DateTime.Now.Render());
            return new MessageContent(title, content);
        }
        private static MessageContent GetMessageContentModelToExpert(string title, string body, string receiverName)
        {
            var content = String.Format(@"尊敬的{0}老师，您好！<div style=text-indent:2em;margin-top:10px>{1}</div><div style=text-indent:2em;margin-top:5px>感谢您对我们工作的支持</div><div style=margin-top:30px;margin-left:25px>中国海洋大学 科研信息管理系统</div><div style=margin-left:40px>{2}</div>", receiverName, body, DateTime.Now.Render());
            return new MessageContent(title, content);
        }
    }

    /// <summary>
    /// 短消息的业务扩展
    /// </summary>
    public static class MessageBusinessExtension
    {
    }
    /// <summary>
    /// 短消息的查询扩展
    /// </summary>
    public static class MessageQueryExtension
    {
        /// <summary>
        /// 统计用户未读短消息的数目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int CountUnReadMessages(this IQueryable<Message> query, User user)
        {
            return query.Where(m => m.ReceiverID == user.ID && m.IsRead == false).Count();
        }
        /// <summary>
        /// 统计用户所有短消息的数目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int CountMessages(this IQueryable<Message> query, User user)
        {
            return query.Where(m => m.ReceiverID == user.ID).Count();
        }
        /// <summary>
        /// 取得用户所有未读短消息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<Message> GetUnReadMessagesByUser(this IQueryable<Message> query, User user)
        {
            return query
                .Where(q => q.ReceiverID == user.ID && q.IsRead == false)
                .OrderByDescending(q => q.DateTime)
                .ToList();
        }
        /// <summary>
        /// 取得用户的所有短消息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<Message> GetMessagesByUser(this IQueryable<Message> query, User user, QueryInformation queryInformation)
        {
            var q = query.Where(m => m.ReceiverID == user.ID).OrderBy(m => m.IsRead).OrderByDescending(m => m.DateTime);

            return new QueryResult<Message>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
    }
    /// <summary>
    /// 短消息的权限扩展
    /// </summary>
    public static class MessagePermissionExtension
    {
        /// <summary>
        /// 用户是否具有查看短消息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowMessage(this User user, Message message)
        {
            return message.Receiver == user;
        }
        /// <summary>
        /// 用户是否具有编辑短消息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool HasPermission_EditMessage(this User user, Message message)
        {
            return message.Receiver == user;
        }
        /// <summary>
        /// 用户是否具有删除短消息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteMessage(this User user, Message message)
        {
            return message.Receiver == user;
        }
        /// <summary>
        /// 用户能否查看短消息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool CanShowMessage(this User user, Message message)
        {
            return user.HasPermission_ShowMessage(message);
        }
        /// <summary>
        /// 用户能否编辑短消息 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool CanEditMessage(this User user, Message message)
        {
            return user.HasPermission_EditMessage(message);
        }
        /// <summary>
        /// 用户能否删除短消息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool CanDeleteMessage(this User user, Message message)
        {
            if (!user.HasPermission_DeleteMessage(message))
                return false;

            return message.IsRead;
        }
    }
}
