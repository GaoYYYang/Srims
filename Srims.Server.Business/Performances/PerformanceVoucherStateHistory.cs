using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Performances;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效凭单状态历史
    /// </summary>
    public partial class PerformanceVoucherStateHistory : Entity<PerformanceVoucherStateHistory>
    {
    }

    /// <summary>
    /// 绩效凭单状态历史的业务扩展
    /// </summary>
    public static class PerformanceVoucherStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 绩效凭单状态历史的查询扩展
    /// </summary>
    public static class PerformanceVoucherStateHistoryQueryExtension
    {
        /// <summary>
        /// 取得凭单的状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="performanceVoucherId"></param>
        /// <returns></returns>
        public static IList<PerformanceVoucherStateHistory> GetByPerformanceVoucherID(this IQueryable<PerformanceVoucherStateHistory> query, int performanceVoucherId)
        {
            return query.Where(q => q.PerformanceVoucherID == performanceVoucherId).OrderByDescending(q => q.DateTime).ToList();
        }
    }
    /// <summary>
    /// 绩效凭单状态历史的权限扩展
    /// </summary>
    public static class PerformanceVoucherStateHistoryPermissionExtension
    {
    }
}
