using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;
using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 消息的显示扩展
    /// </summary>
    public static class MessageExtension
    {
        /// <summary>
        /// 显示短消息
        /// </summary>
        /// <param name="message"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        public static void ShowMessage(Message message, HttpResponse response, User user)
        {
            response.WriteTagWithValue("ID", message.ID);
            response.WriteTagWithValue("Receiver", message.Receiver.Name);
            response.WriteTagWithValue("ReceiverID", message.ReceiverID);
            response.WriteTagWithValue("Sender", message.Sender == null ? string.Empty : message.Sender.Name);
            response.WriteTagWithValue("SenderID", message.SenderID);
            response.WriteTagWithValue("Title", message.Title);
            response.WriteTagWithValue("Content", message.Content);
            response.WriteTagWithValue("DateTime", message.DateTime);
            response.WriteTagWithValue("IsRead", message.IsRead);

            //permission
            response.WriteTagWithValue("HasPermission_ShowMessage", user.HasPermission_ShowMessage(message));
            response.WriteTagWithValue("HasPermission_EditMessage", user.HasPermission_EditMessage(message));
            response.WriteTagWithValue("HasPermission_DeleteMessage", user.HasPermission_DeleteMessage(message));

            //can
            response.WriteTagWithValue("CanShowMessage", user.CanShowMessage(message));
            response.WriteTagWithValue("CanEditMessage", user.CanEditMessage(message));
            response.WriteTagWithValue("CanDeleteMessage", user.CanDeleteMessage(message));
        }
        /// <summary>
        /// 显示查询短消息
        /// </summary>
        /// <param name="result"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        public static void Show(this QueryResult<Message> result, HttpResponse response, User user)
        {
            //ShowDelegate<Message> showDelegate = new ShowDelegate<Message>(ShowMessage);
            //result.Show<Message>(response, showDelegate);
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", result.Total);
            response.WriteTagBegin("List");
            foreach (var message in result.ResultList)
            {
                response.WriteTagBegin("Record");
                ShowMessage(message, response, user);
                response.WriteTagEnd("Record");
            }
            response.WriteTagEnd("List");
            response.WriteTagEnd("QueryResult");

        }
        /// <summary>
        /// 取得短信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Message GetMessage(this HttpRequest request, IDatabase database, User user)
        {
            Message message = request.getMessage(database, user);
            message.Receiver = request.GetEntity<User>(database.Users, "ReceiverID");
            message.Title = request.GetString("Title");
            message.Content = request.GetString("Content");
            return message;
        }
        private static Message getMessage(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Messages.GetByID(id.Value);

            Message message = new Message();
            message.Sender = user;
            message.DateTime = DateTime.Now;
            message.IsRead = false;
            return message;
        }
    }
}
