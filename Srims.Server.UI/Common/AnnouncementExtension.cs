using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 通知的显示扩展
    /// </summary>
    public static class AnnouncementExtension
    {
        /// <summary>
        /// 显示通知
        /// </summary>
        /// <param name="announcement"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowAnnouncement(Announcement announcement, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("Content", announcement.Content);
            response.WriteTagWithValue("DateTime", announcement.DateTime);
            response.WriteTagWithValue("ID", announcement.ID);
            response.WriteTagWithValue("State", announcement.State);
            response.WriteTagWithValue("Title", announcement.Title);
            response.WriteTagWithValue("UserName", announcement.UserName);

            //permission
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditAnnouncement(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteAnnouncement(database));

            //can
            response.WriteTagWithValue("CanEdit", user.CanEditAnnouncement(database));
            response.WriteTagWithValue("CanDelete", user.CanDeleteAnnouncement(database));

        }
        /// <summary>
        /// 显示通知（登陆页面，不包含权限问题）
        /// </summary>
        /// <param name="announcement"></param>
        /// <param name="response"></param>
        public static void ShowAvailableAnnouncement(Announcement announcement, HttpResponse response)
        {
            response.WriteTagWithValue("Content", announcement.Content);
            response.WriteTagWithValue("DateTime", announcement.DateTime);
            response.WriteTagWithValue("ID", announcement.ID);
            response.WriteTagWithValue("State", announcement.State);
            response.WriteTagWithValue("Title", announcement.Title);
            response.WriteTagWithValue("UserName", announcement.UserName);
        }
        /// <summary>
        /// 显示通知
        /// </summary>
        /// <param name="list">要显示的通知列表</param>
        /// <param name="response">输出</param>
        public static void Show(this IList<Announcement> list, HttpResponse response)
        {
            ShowDelegate<Announcement> showDelegate = new ShowDelegate<Announcement>(ShowAvailableAnnouncement);
            list.Show<Announcement>(response, showDelegate);
        }
        /// <summary>
        ///  显示通知查询结果
        /// </summary>
        /// <param name="announcementResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Announcement> announcementResult, HttpResponse response, User user, IDatabase database)
        {
            //ShowDelegate<Announcement> showDelegate = new ShowDelegate<Announcement>(ShowAnnouncement);
            //announcementResult.Show<Announcement>(response, showDelegate);

            ShowDelegateWithUserAndDatabase<Announcement> showDelegate = new ShowDelegateWithUserAndDatabase<Announcement>(ShowAnnouncement);
            announcementResult.Show(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得通知
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Announcement GetAnnouncement(this HttpRequest request, IDatabase database, User user)
        {
            var announcement = request.getAnnouncement(database, user);

            announcement.Title = request.GetString("Title");
            announcement.DateTime = System.DateTime.Now;
            announcement.Content = request.GetString("Content");
            announcement.State = request.GetEnum<AnnouncementState>("State");

            return announcement;
        }
        /// <summary>
        /// 根据ID取得通知
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Announcement GetAnnouncementById(this HttpRequest request, IDatabase database)
        {
            return request.GetEntity<Announcement>(database.Announcements, "id");
        }
        private static Announcement getAnnouncement(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Announcements.GetByID(id.Value);

            var announcement = new Announcement();
            announcement.UserName = user.Name;

            return announcement;
        }
        /// <summary>
        /// 取得新建的空Announcement或者编辑之前的旧Announcement
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldAnnouncement(this HttpRequest request, IDatabase database, User user)
        {
            Object oldAnnouncement = new Object();
            oldAnnouncement = request.getAnnouncement(database, user).Clone();
            return oldAnnouncement;
        }
    }
}
