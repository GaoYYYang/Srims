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
using Srims.Server.Business.Common;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 文印材料扩展
    /// </summary>
    public static class StuffExtension
    {
        /// <summary>
        /// 显示文印材料
        /// </summary>
        /// <param name="stampStuff"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStuff(Stuff stampStuff, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stampStuff.ID);
            response.WriteTagWithValue("StampApplicationID", stampStuff.StampApplicationID);
            response.WriteTagWithValue("StuffType", stampStuff.StuffType);
            response.WriteTagWithValue("StuffName", stampStuff.StuffName);
            response.WriteTagWithValue("StuffDocument", stampStuff.StuffDocument);

            IList<string> stampTypes = stampStuff.GetAllStampTypeAndNumbers(database.StuffStamps);
            response.WriteTagWithValue("StampTypes", stampTypes.ToArray().ToString(","));
            //has
            response.WriteTagWithValue("Haspermission_Edit", user.Haspermission_EditStampStuff(stampStuff, database));
            response.WriteTagWithValue("HasPermission_ManageStampType", user.HasPermission_ManageStampType(stampStuff, database));
            //can
            response.WriteTagWithValue("CanEdit", user.CanEditStampStuff(stampStuff, database));
            response.WriteTagWithValue("CanManageStampType", user.CanManageStampType(stampStuff, database));
        }
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stampStuffList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Stuff> stampStuffList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Stuff> showDelegate = new ShowDelegateWithUserAndDatabase<Stuff>(ShowStuff);
            stampStuffList.Show<Stuff>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得用印文件编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Stuff GetStuff(this HttpRequest request, IDatabase database, User user)
        {
            var stampStuff = request.getStuff(database, user);

            stampStuff.StuffName = request.GetString("stuffName");
            stampStuff.StuffType = request.getStuffType(database);
            stampStuff.StampApplication = request.GetEntity<StampApplication>(database.StampApplications, "stampApplicationID");
            stampStuff.StuffDocument = request.GetGuid("stuffDocument").Value;
            if (stampStuff.StampApplication.CurrentState.State == StampState.CensorReject && !user.IsExpert)
                stampStuff.StampApplication.CensorPass(user, database);
            return stampStuff;
        }
        private static string getStuffType(this HttpRequest request, IDatabase database)
        {
            IList<string> stuffTypes = database.NoticeTexts.GetNoticeTextValue(NoticeTextType.StuffType);
            string stuffType = request.GetString("stuffType").Trim();
            if (stuffTypes != null && stuffTypes.Count > 0)
                if (stuffTypes.Contains(stuffType))
                    return stuffType;
            var stampType = new NoticeText();
            stampType.Type = NoticeTextType.StuffType;
            stampType.Value = stuffType;
            stampType.Save(database);
            return stuffType;
        }
        private static Stuff getStuff(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Stuffs.GetByID(id.Value);
            var stampStuff = new Stuff();
            return stampStuff;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStuff(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStuff(database, user).Clone();
            return oldEntity;
        }
    }
}
