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
    /// 文印申请2级审核权限扩展
    /// </summary>
    public static class StampApplicationSecondAdminExtension
    {
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stampApplication"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStampApplicationSecondAdmin(StampApplicationSecondAdmin stampApplicationSecondAdmin, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stampApplicationSecondAdmin.ID);
            response.WriteTagWithValue("UserName", stampApplicationSecondAdmin.User.Name);

        }
        /// <summary>
        /// 显示扩展
        /// </summary>
        /// <param name="stampApplicationQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<StampApplicationSecondAdmin> showStampApplicationSecondAdminQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<StampApplicationSecondAdmin> showDelegate = new ShowDelegateWithUserAndDatabase<StampApplicationSecondAdmin>(ShowStampApplicationSecondAdmin);
            showStampApplicationSecondAdminQueryResult.Show<StampApplicationSecondAdmin>(response, user, database, showDelegate);
        }

        /// <summary>
        /// 取得编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static StampApplicationSecondAdmin GetStampApplicationSecondAdmin(this HttpRequest request, IDatabase database, User user)
        {
            var stampApplicationSecondAdmin = request.getStampApplicationSecondAdmin(database, user);
            if (request.GetInt("UserID").HasValue)
                stampApplicationSecondAdmin.User = database.Users.GetByID(request.GetInt("UserID").Value);
            if (request.GetInt("StampApplicationTypeID").HasValue)
                stampApplicationSecondAdmin.StampApplicationType = database.StampApplicationTypes.GetByID(request.GetInt("StampApplicationTypeID").Value);
            return stampApplicationSecondAdmin;
        }

        private static StampApplicationSecondAdmin getStampApplicationSecondAdmin(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.StampApplicationSecondAdmins.GetByID(id.Value);
            var stamp = new StampApplicationSecondAdmin();
            return stamp;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStampApplicationSecondAdmin(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStampApplicationSecondAdmin(database, user).Clone();
            return oldEntity;
        }

    }
}
