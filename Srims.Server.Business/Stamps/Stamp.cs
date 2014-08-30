using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;
using System.Transactions;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 图章
    /// </summary>
    public partial class Stamp : Entity<Stamp>
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

            list.Add(new LogDescriptionItem { Name = "Type", Title = "对应的章型" });
            list.Add(new LogDescriptionItem { Name = "OwnerID", Title = "拥有者的ID" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Type), "章型不能为空");
            validater.AddCondition(_Owner.Entity != null, "拥有者不能为空");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                _IsDelete = true;
                this.Save(database);
                ts.Complete();
            }

        }
    }

    /// <summary>
    /// 图章的业务扩展
    /// </summary>
    public static class StampBusinessExtension
    {
    }
    /// <summary>
    /// 图章的查询扩展
    /// </summary>
    public static class StampQueryExtension
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<Stamp> GetUserStamps(this IQueryable<Stamp> query, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.Owner == user).ToList();
        }
    }
    /// <summary>
    /// 图章的权限扩展
    /// </summary>
    public static class StampPermissionExtension
    {
        /// <summary>
        /// 是否有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermission_EditStamp(this User user)
        {
            return user.IsSuper;
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool CanEditStamp(this User user)
        {
            return user.IsSuper;
        }
    }
}
