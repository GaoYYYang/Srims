using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.HttpExtension;
using MIS.Common.Query;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class AnnouncementService : WebServiceBase
    {
        [WebMethod]
        public void GetAvailable()
        {
            Response.WriteXmlHead();
            Database
                .Announcements.GetAvailable()
                .Show(Response);
        }
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Announcements
                .Query(Request.GetAnnouncementQueryInformation())
               .Show(Response, User, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldAnnouncement = Request.GetOldAnnouncement(Database, User);
            var announcement = Request.GetAnnouncement(Database, User);

            using (TransactionScope ts = new TransactionScope())
            {
                var description = announcement.IsNew ? "新建" : "编辑";
                description += string.Format("通知\n   对应的通知标题为：{0}。", announcement.Title)
                    + Log.GetEditOperationDescription(oldAnnouncement, announcement, Announcement.GetAnnouncementDescriptionItems(), announcement.IsNew);
                Log.Write(User.Name, announcement.IsNew ? (int)LogType.AnnouncementAdd : (int)LogType.AnnouncementEdit, description, Request.UserHostAddress, announcement.IsNew ? "添加通知" : "编辑通知", Database);

                announcement.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var announcement = Request.GetAnnouncementById(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除通知: {0}。", announcement.Title);
                Log.Write(User.Name, (int)LogType.AnnouncementDelete, description, Request.UserHostAddress, "删除通知", Database);

                announcement.Delete(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SetTop()
        {
            var announcement = Request.GetAnnouncementById(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("通知置顶：{0}。 ", announcement.Title);
                Log.Write(User.Name, (int)LogType.AnnouncementSetTop, description, Request.UserHostAddress, "通知置顶", Database);

                announcement.SetTop(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CancelTop()
        {
            var announcement = Request.GetAnnouncementById(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("取消通知置顶：{0}。", announcement.Title);
                Log.Write(User.Name, (int)LogType.AnnouncementCancelTop, description, Request.UserHostAddress, "取消置顶", Database);

                announcement.CancelTop(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SetOverdue()
        {
            var announcement = Request.GetAnnouncementById(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("通知过期：{0} 。", announcement.Title);
                Log.Write(User.Name, (int)LogType.AnnouncementSetOverdue, description, Request.UserHostAddress, "设置通知过期", Database);

                announcement.SetOverdue(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CancelOverdue()
        {
            var announcement = Request.GetAnnouncementById(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("取消过期设置：{0} 。", announcement.Title);
                Log.Write(User.Name, (int)LogType.AnnouncementCancelOverdue, description, Request.UserHostAddress, "取消通知过期设置", Database);

                announcement.CancelOverdue(Database);
                ts.Complete();
            }
        }
    }
}
