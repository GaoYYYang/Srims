using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 用户角色扩展
    /// </summary>
    public static class UserRoleExtension
    {
        /// <summary>
        /// 用户角色显示
        /// </summary>
        /// <param name="userRole"></param>
        /// <param name="response"></param>
        public static void ShowUserRole(UserRole userRole, HttpResponse response)
        {
            response.WriteTagWithValue("ID", userRole.ID);
            response.WriteTagWithValue("Name", userRole.Name);
            response.WriteTagWithValue("Type", userRole.Type);
        }
        /// <summary>
        /// 用户角色显示
        /// </summary>
        /// <param name="userRole"></param>
        /// <param name="response"></param>
        public static void ShowFilterUserRole(UserRole userRole, HttpResponse response)
        {
            response.WriteTagWithValue("ID", userRole.ID);
            response.WriteTagWithValue("Value", userRole.Name);
        }
        /// <summary>
        /// 用户角色显示
        /// </summary>
        /// <param name="userRoleList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<UserRole> userRoleList, HttpResponse response)
        {
            ShowDelegate<UserRole> showDelegate = new ShowDelegate<UserRole>(ShowUserRole);
            userRoleList.Show<UserRole>(response, showDelegate);
        }
        /// <summary>
        /// 用户角色显示
        /// </summary>
        /// <param name="userRoleList"></param>
        /// <param name="response"></param>
        public static void ShowForFilter(this IList<UserRole> userRoleList, HttpResponse response)
        {
            ShowDelegate<UserRole> showDelegate = new ShowDelegate<UserRole>(ShowFilterUserRole);
            userRoleList.Show<UserRole>(response, showDelegate);
        }
    }
}
