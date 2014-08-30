using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;
using Srims.Server.Business;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using System.Web;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 文件用印扩展
    /// </summary>
    public static class StuffStampExtension
    {
        /// <summary>
        /// 显示文印材料章型
        /// </summary>
        /// <param name="stuffStamp"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStuffStamp(StuffStamp stuffStamp, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stuffStamp.ID);
            response.WriteTagWithValue("StuffID", stuffStamp.StuffID);
            response.WriteTagWithValue("Type", stuffStamp.Stamp.Type);
            response.WriteTagWithValue("StampID", stuffStamp.Stamp.ID);
            response.WriteTagWithValue("StampOwner", stuffStamp.Stamp.Owner.Name);
            response.WriteTagWithValue("Number", stuffStamp.Number);
            response.WriteTagWithValue("Pagination", stuffStamp.Pagination);
            //has
            response.WriteTagWithValue("Haspermission_Edit", user.Haspermission_EditStuffStamp(stuffStamp, database));
            //can
            response.WriteTagWithValue("CanEdit", user.CanEditStuffStamp(stuffStamp, database));
        }
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stampTypeList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<StuffStamp> stampTypeList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<StuffStamp> showDelegate = new ShowDelegateWithUserAndDatabase<StuffStamp>(ShowStuffStamp);
            stampTypeList.Show<StuffStamp>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得文件用印编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static StuffStamp GetStuffStamp(this HttpRequest request, IDatabase database, User user)
        {
            var stampType = request.getStuffStamp(database, user);

            stampType.Number = request.GetInt("number").Value;
            stampType.Pagination = request.GetString("pagination");
            stampType.Stamp = request.GetEntity<Stamp>(database.Stamps, "stampID");
            stampType.Stuff = request.GetEntity<Stuff>(database.Stuffs, "stuffID");
            if (stampType.Stuff.StampApplication.CurrentState.State == StampState.CensorReject && !user.IsExpert)
                stampType.Stuff.StampApplication.CensorPass(user, database);
            return stampType;
        }

        private static StuffStamp getStuffStamp(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.StuffStamps.GetByID(id.Value);
            var stampType = new StuffStamp();
            return stampType;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStuffStamp(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStuffStamp(database, user).Clone();
            return oldEntity;
        }
    }
}
