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
    /// 绩效状态历史
    /// </summary>
    public partial class PerformanceAllocationStateHistory : Entity<PerformanceAllocationStateHistory>
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
            validater.AddCondition(_DateTime != null, "状态时间不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Operator), "对应的操作人不能为空");
        }
    }

    /// <summary>
    /// 绩效状态历史的业务扩展
    /// </summary>
    public static class PerformanceStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 绩效状态历史的查询扩展
    /// </summary>
    public static class PerformanceStateHistoryQueryExtension
    {
        /// <summary>
        /// 取得经费分配的状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="performanceAllocationID"></param>
        /// <returns></returns>
        public static IList<PerformanceAllocationStateHistory> GetByPerformanceAllocation(this IQueryable<PerformanceAllocationStateHistory> query, int performanceAllocationID)
        {
            return query
                .Where(q => q.PerformanceAllocationID == performanceAllocationID)
                .OrderBy(q => q.ID)
                .ToList();
        }
        /// <summary>
        /// 取得绩效分配的审核通过状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="performanceAllocationID"></param>
        /// <returns></returns>
        public static PerformanceAllocationStateHistory GetPassedFundAllocation(this IQueryable<PerformanceAllocationStateHistory> query, int performanceAllocationID)
        {
            return query
                .SingleOrDefault(q => q.PerformanceAllocationID == performanceAllocationID && q.State == PerformanceAllocationState.Passed);
        }

    }
    /// <summary>
    /// 绩效状态历史的权限扩展
    /// </summary>
    public static class PerformanceStateHistoryPermissionExtension
    {
    }
}
