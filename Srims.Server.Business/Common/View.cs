using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Patents;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 视图
    /// </summary>
    public partial class View : Entity<View>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "视图名称不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Definition), "视图定义不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Type.ToString()), "视图类型不能为空");
            validater.AddCondition(_User.Entity != null, "定义用户不能为空");
        }
    }

    /// <summary>
    /// 视图的业务扩展
    /// </summary>
    public static class ViewBusinessExtension
    {
    }
    /// <summary>
    /// 视图的查询扩展
    /// </summary>
    public static class ViewQueryExtension
    {
        /// <summary>
        /// 取得用户的视图
        /// </summary>
        /// <param name="query"></param>
        /// <param name="viewType"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<View> GetByUser(this IQueryable<View> query, ViewType viewType, User user)
        {
            return query
                .Where(q => (q.UserID == user.ID || q.IsPublic) && q.Type == viewType)
                .OrderBy(q => q.User.Name)
                .ToList();
        }
        /// <summary>
        /// 取得用户的所有视图
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<View> GetUserViews(this IQueryable<View> query, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.User == user).ToList();
        }
    }
    /// <summary>
    /// 视图的权限扩展
    /// </summary>
    public static class ViewPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有删除视图的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="view"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, View view)
        {
            return view.User == user;
        }
        /// <summary>
        /// 判断用户能够删除视图
        /// </summary>
        /// <param name="user"></param>
        /// <param name="view"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, View view)
        {
            return user.HasPermission_Delete(view);
        }
        /// <summary>
        /// 判断用户是否具有重命名视图的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="view"></param>
        /// <returns></returns>
        public static bool HasPermission_Rename(this User user, View view)
        {
            return view.User == user;
        }
        /// <summary>
        /// 判断用户能够重命名视图
        /// </summary>
        /// <param name="user"></param>
        /// <param name="view"></param>
        /// <returns></returns>
        public static bool CanRename(this User user, View view)
        {
            return user.HasPermission_Delete(view);
        }
    }
}
