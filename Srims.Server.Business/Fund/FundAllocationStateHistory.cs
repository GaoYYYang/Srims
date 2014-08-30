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
    /// 经费分配状态历史
    /// </summary>
    public partial class FundAllocationStateHistory : Entity<FundAllocationStateHistory>
    {
        /// <summary>
        /// 字符串表示
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return _State.ToString();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_FundAllocation.Entity != null, "对应经费下拨不能为空");
            validater.AddCondition(_DateTime != null, "状态时间不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Operator), "对应的操作人不能为空");
        }
    }

    /// <summary>
    /// 经费分配状态历史的业务扩展
    /// </summary>
    public static class FundAllocationStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 经费分配状态历史的查询扩展
    /// </summary>
    public static class FundAllocationStateHistoryQueryExtension
    {
        /// <summary>
        /// 取得经费分配的状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="fundAllocationID"></param>
        /// <returns></returns>
        public static IList<FundAllocationStateHistory> GetByFundAllocation(this IQueryable<FundAllocationStateHistory> query, int fundAllocationID)
        {
            return query
                .Where(q => q.FundAllocationID == fundAllocationID)
                .OrderBy(q => q.ID)
                .ToList();
        }
        /// <summary>
        /// 取得经费分配的审核通过状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="fundAllocationId"></param>
        /// <returns></returns>
        public static FundAllocationStateHistory GetPassedFundAllocation(this IQueryable<FundAllocationStateHistory> query, int fundAllocationId)
        {
            return query
                .SingleOrDefault(q => q.FundAllocationID == fundAllocationId && q.State == FundAllocationState.Passed);
        }
    }
    /// <summary>
    /// 经费分配状态历史的权限扩展
    /// </summary>
    public static class FundAllocationStateHistoryPermissionExtension
    {
    }
}
