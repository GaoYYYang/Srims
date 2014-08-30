using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 图章扩展
    /// </summary>
    public static class StampExtension
    {
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stamp"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this Stamp stamp, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stamp.ID);
            response.WriteTagWithValue("Type", stamp.Type);
            var owner = stamp.Owner;
            response.WriteTagWithValue("OwnerID", stamp.OwnerID);
            response.WriteTagWithValue("Owner", owner == null ? string.Empty : stamp.Owner.Name);

            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditStamp());
            response.WriteTagWithValue("CanEdit", user.CanEditStamp());
        }
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stampList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Stamp> stampList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Stamp> showDelegate = new ShowDelegateWithUserAndDatabase<Stamp>(Show);
            stampList.Show<Stamp>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="stuffId"></param>
        public static void Show(this List<Stamp> list, HttpResponse response, User user, IDatabase database, int stuffId)
        {
            response.WriteTagBegin("List");

            foreach (var stamp in list)
            {
                response.WriteTagBegin("Record");
                ShowStampWithNumber(stamp, response, user, database, stuffId);
                response.WriteTagEnd("Record");
            }

            response.WriteTagEnd("List");
        }

        private static void ShowStampWithNumber(Stamp stamp, HttpResponse response, User user, IDatabase database, int stuffId)
        {
            response.WriteTagWithValue("ID", stamp.ID);
            response.WriteTagWithValue("Type", stamp.Type);
            if (stuffId > 0)
            {
                var stuff = database.Stuffs.GetByID(stuffId);
                response.WriteTagWithValue("Number", stuff.GetStampNumber(database.StuffStamps, stamp.ID) > 0 ? stuff.GetStampNumber(database.StuffStamps, stamp.ID).ToString() : string.Empty);
                response.WriteTagWithValue("Pagination", stuff.GetStampPagination(database.StuffStamps, stamp.ID));

            }
        }
        /// <summary>
        /// 取得图章编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Stamp GetStamp(this HttpRequest request, IDatabase database, User user)
        {
            var stamp = request.getStamp(database, user);

            stamp.Type = request.GetString("type");
            stamp.Owner = request.GetEntity<User>(database.Users, "ownerID");
            stamp.IsDelete = false;
            return stamp;
        }

        private static Stamp getStamp(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Stamps.GetByID(id.Value);
            var stamp = new Stamp();
            return stamp;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStamp(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStamp(database, user).Clone();
            return oldEntity;
        }
    }
}
