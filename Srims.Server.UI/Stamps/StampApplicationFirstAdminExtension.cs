using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using System.Web;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 文印申请一级审核权限扩展
    /// </summary>
    public static class StampApplicationFirstAdminExtension
    {
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stampApplication"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStampApplicationFirstAdmin(StampApplicationFirstAdmin stampApplicationFirstAdmin, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stampApplicationFirstAdmin.ID);
            response.WriteTagWithValue("UserName", stampApplicationFirstAdmin.User.Name);

        }
        /// <summary>
        /// 显示扩展
        /// </summary>
        /// <param name="stampApplicationQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<StampApplicationFirstAdmin> showStampApplicationFirstAdminQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<StampApplicationFirstAdmin> showDelegate = new ShowDelegateWithUserAndDatabase<StampApplicationFirstAdmin>(ShowStampApplicationFirstAdmin);
            showStampApplicationFirstAdminQueryResult.Show<StampApplicationFirstAdmin>(response, user, database, showDelegate);
        }

        /// <summary>
        /// 取得编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static StampApplicationFirstAdmin GetStampApplicationFirstAdmin(this HttpRequest request, IDatabase database, User user)
        {
            var stampApplicationFirstAdmin = request.getStampApplicationFirstAdmin(database, user);
            if (request.GetInt("UserID").HasValue)
                stampApplicationFirstAdmin.User = database.Users.GetByID(request.GetInt("UserID").Value);
            if (request.GetInt("StampApplicationTypeID").HasValue)
                stampApplicationFirstAdmin.StampApplicationType = database.StampApplicationTypes.GetByID(request.GetInt("StampApplicationTypeID").Value);
            return stampApplicationFirstAdmin;
        }

        private static StampApplicationFirstAdmin getStampApplicationFirstAdmin(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.StampApplicationFirstAdmins.GetByID(id.Value);
            var stamp = new StampApplicationFirstAdmin();
            return stamp;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStampApplicationFirstAdmin(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStampApplicationFirstAdmin(database, user).Clone();
            return oldEntity;
        }

    }
}
