using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 视图的相关扩展
    /// </summary>
    public static class ViewExtension
    {
        /// <summary>
        /// 视图的现实扩展
        /// </summary>
        /// <param name="view"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowView(this View view, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", view.ID);
            response.WriteTagWithValue("Definition", view.Definition);
            response.WriteTagWithValue("IsPublic", view.IsPublic);
            response.WriteTagWithValue("Name", view.Name);
            response.WriteTagWithValue("Order", view.Order);
            response.WriteTagWithValue("Type", view.Type);
            response.WriteTagWithValue("UserID", view.UserID);
            response.WriteTagWithValue("UserName", view.User.Name);

            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(view));
            response.WriteTagWithValue("CanDelete", user.CanDelete(view));
            response.WriteTagWithValue("HasPermission_Rename", user.HasPermission_Rename(view));
            response.WriteTagWithValue("CanRename", user.CanRename(view));
        }
        /// <summary>
        /// 取得视图
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static View GetView(this HttpRequest request, User user, IDatabase database)
        {
            View view = request.GetEntity(database.Views, "viewId");
            if (view == null)
                view = new View();

            view.Definition = request.GetString("Definition");
            view.IsPublic = request.GetBoolean("IsPublic").Value;
            view.Name = request.GetString("Name");
            view.Type = request.GetEnum<ViewType>("ViewType");
            view.User = user;
            //TODO
            view.Order = 0;

            return view;
        }
    }
}
