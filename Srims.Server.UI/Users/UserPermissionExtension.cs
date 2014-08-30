using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 用户-权限记录扩展
    /// </summary>
    public static class UserPermissionExtension
    {
        /// <summary>
        /// 显示用户-权限记录
        /// </summary>
        /// <param name="userPermission"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowUserPermission(UserPermission userPermission, HttpResponse response, IDatabase database)
        {
            response.WriteTagWithValue("ID", userPermission.ID);
            response.WriteTagWithValue("PermissionID", userPermission.Permission.ID);
            if (userPermission.Permission.PermissionItem == PermissionItem.ManageHorizontalProjectByType || userPermission.Permission.PermissionItem == PermissionItem.ManageVerticalProjectByType)
            {
                string typeName = database.ProjectTypes.GetByID(userPermission.Permission.Params.Value).Name;
                string operation = userPermission.Permission.PermissionOperation == PermissionOperation.Show ? "查看" : "编辑";
                response.WriteTagWithValue("PermissionName", operation + typeName + "类型的项目");
            }
            else if (userPermission.Permission.PermissionItem == PermissionItem.ManageAllHorizontalProject || userPermission.Permission.PermissionItem == PermissionItem.ManageAllVerticalProject)
            {
                string operation = userPermission.Permission.PermissionOperation == PermissionOperation.Show ? "查看" : "编辑";
                string rankName = userPermission.Permission.PermissionItem == PermissionItem.ManageAllHorizontalProject ? "所有横向项目" : "所有纵向项目";
                response.WriteTagWithValue("PermissionName", operation + rankName);
            }
            else
                response.WriteTagWithValue("PermissionName", userPermission.Permission.PermissionItem.ToString());
            response.WriteTagWithValue("AccreditDateTime", userPermission.Permission.AccreditDateTime);
            response.WriteTagWithValue("EndDateTime", userPermission.Permission.EndDateTime);
        }
        /// <summary>
        /// 显示用户-权限记录
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this IList<UserPermission> list, HttpResponse response, IDatabase database)
        {
            ShowDelegateWithDatabase<UserPermission> showDelegate = new ShowDelegateWithDatabase<UserPermission>(ShowUserPermission);
            list.Show<UserPermission>(response, database, showDelegate);
        }
    }
}
