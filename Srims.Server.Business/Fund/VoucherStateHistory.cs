using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费凭单状态历史
    /// </summary>
    public partial class VoucherStateHistory : Entity<VoucherStateHistory>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Voucher.Entity != null, "对应的凭单不能为空");
            validater.AddCondition(_DateTime != null, "状态时间不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Operator), "对应的操作人不能为空");
        }
    }

    /// <summary>
    /// 经费凭单状态历史的业务扩展
    /// </summary>
    public static class VoucherStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 经费凭单状态历史的查询扩展
    /// </summary>
    public static class VoucherStateHistoryQueryExtension
    {
        /// <summary>
        /// 取得凭单的状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="voucherId"></param>
        /// <returns></returns>
        public static IList<VoucherStateHistory> GetByVoucherID(this IQueryable<VoucherStateHistory> query, int voucherId)
        {
            return query.Where(q => q.VoucherID == voucherId).OrderByDescending(q=>q.DateTime).ToList();
        }
    }
    /// <summary>
    /// 经费凭单状态历史的权限扩展
    /// </summary>
    public static class VoucherStateHistoryPermissionExtension
    {
    }
}
