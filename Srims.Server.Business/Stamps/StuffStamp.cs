using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 材料章型
    /// </summary>
    public partial class StuffStamp : Entity<StuffStamp>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "StuffID", Title = "对应的盖章材料的ID" });
            list.Add(new LogDescriptionItem { Name = "StampID", Title = "对应图章的ID" });
            list.Add(new LogDescriptionItem { Name = "Number", Title = "数量" });
            list.Add(new LogDescriptionItem { Name = "Pagination", Title = "盖章页" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Stamp.Entity != null, "对应图章不能为空");
            validater.AddCondition(_Number >= 1, "材料份数不能小于1");
            validater.AddCondition(_Stuff.Entity != null, "对应文印材料不能为空");
        }
    }

    /// <summary>
    /// 材料章型的业务扩展
    /// </summary>
    public static class StuffStampBusinessExtension
    {
    }
    /// <summary>
    /// 材料章型的查询扩展
    /// </summary>
    public static class StuffStampQueryExtension
    {
        /// <summary>
        /// 取得某一盖章材料的材料章型
        /// </summary>
        /// <param name="query"></param>
        /// <param name="stampStuffID"></param>
        /// <returns></returns>
        public static IList<StuffStamp> GetStuffStampsByStuff(this IQueryable<StuffStamp> query, int stampStuffID)
        {
            return query.Where(st => st.StuffID == stampStuffID).ToList();
        }
        /// <summary>
        /// 取得材料盖章类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetStampType(this IQueryable<StuffStamp> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(st => st.Stamp.Type).Where(st => st != null).Distinct().OrderBy(st => st).ToList();
        }
        /// <summary>
        /// 取得某一章型的材料章型
        /// </summary>
        /// <param name="query"></param>
        /// <param name="stampID"></param>
        /// <returns></returns>
        public static IList<StuffStamp> GetStuffStampsByStamp(this IQueryable<StuffStamp> query, int stampID)
        {
            return query.Where(st => st.StampID == stampID).ToList();
        }
    }
    /// <summary>
    /// 材料章型的权限扩展
    /// </summary>
    public static class StuffStampPermissionExtension
    {
        /// <summary>
        /// 有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool Haspermission_EditStuffStamp(this User user, StuffStamp stuffStamp, IDatabase database)
        {
            var stamp = stuffStamp.Stuff.StampApplication;
            if (user.IsExpert)
                return stamp.Principal.User == user;
            return user.HasPermission(PermissionItem.ManageStamp, database);
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stuffStamp"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditStuffStamp(this User user, StuffStamp stuffStamp, IDatabase database)
        {
            var stamp = stuffStamp.Stuff.StampApplication;
            if (user.IsExpert)
                return user == stamp.Principal.User && stamp.CurrentState.State != StampState.Stamp && stamp.CurrentState.State != StampState.CensorPass;
            else if (user.HasPermission(PermissionItem.ManageStamp, database))
                return stamp.CurrentState.State != StampState.Stamp;

            return false;
        }
    }
}
