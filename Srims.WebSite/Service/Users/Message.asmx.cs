using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.ComponentModel;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Users;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Users
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class MessageService : WebServiceBase
    {
        [WebMethod]
        public void GetMessages()
        {
            Response.WriteXmlHead();
            Database.Messages
                .GetMessagesByUser(User, Request.GetQueryInformation())
                .Show(Response, User);
        }
        [WebMethod]
        public void GetUnReadMessages()
        {
            Response.WriteXmlHead();
            Database
                .Messages
                .GetUnReadMessagesByUser(User)
                .Show(Response, User, MessageExtension.ShowMessage);
        }
        [WebMethod]
        public void Sender()
        {
            var message = Request.GetMessage(Database, User);
            message.Save(Database);
        }
        [WebMethod]
        public void MarkAsRead()
        {
            var message = Request.GetEntity<Message>(Database.Messages, "id");
            message.MarkAsRead(Database);
        }
        [WebMethod]
        public void MarkAllAsRead()
        {
            var messages = Database.Messages.GetUnReadMessagesByUser(User);
            foreach (Message message in messages)
                message.MarkAsRead(Database);
        }
        [WebMethod]
        public void Delete()
        {
            var message = Request.GetEntity<Message>(Database.Messages, "messageID");
            message.Delete(Database);
        }
        [WebMethod]
        public void GetUnReadMessageCount()
        {
            Response.WriteXmlHead();
            Database
                .Messages
                .CountUnReadMessages(User).Show(Response);
        }
    }
}
