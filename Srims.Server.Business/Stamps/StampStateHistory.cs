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

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印状态历史
    /// </summary>
    public partial class StampStateHistory : Entity<StampStateHistory>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "StampApplicationID", Title = "文印申请的ID" });
            list.Add(new LogDescriptionItem { Name = "State", Title = "状态" });
            list.Add(new LogDescriptionItem { Name = "Operator", Title = "操作人" });
            list.Add(new LogDescriptionItem { Name = "DateTime", Title = "状态时间" });
            return list.ToArray();
        }
    }

    /// <summary>
    /// 文印状态历史的业务扩展
    /// </summary>
    public static class StampStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 文印状态历史的查询扩展
    /// </summary>
    public static class StampStateHistoryQueryExtension
    {
        /// <summary>
        /// 取得某一文印的所有状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="stampApplicationID"></param>
        /// <returns></returns>
        public static IList<StampStateHistory> GetStampStateHistory(this IQueryable<StampStateHistory> query, int stampApplicationID)
        {
            return query.Where(ssh => ssh.StampApplicationID == stampApplicationID).ToList();
        }
    }
    /// <summary>
    /// 文印状态历史的权限扩展
    /// </summary>
    public static class StampStateHistoryPermissionExtension
    {
    }
}
