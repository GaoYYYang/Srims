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
    /// 经费下拨状态历史
    /// </summary>
    public partial class FundDescendStateHistory : Entity<FundDescendStateHistory>
    {
        /// <summary>
        /// 输出经费下拨状态历史关联的状态的字符串表示
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return this.State.ToString();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_FundDescend.Entity != null, "对应的经费下拨不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(Operator), "操作人不能为空");
            validater.AddCondition(_DateTime != null, "操作时间不能为空");
        }
    }

    /// <summary>
    /// 经费下拨状态历史的业务扩展
    /// </summary>
    public static class FundDescendStateHistoryBusinessExtension
    {
    }
    /// <summary>
    /// 经费下拨状态历史的查询扩展
    /// </summary>
    public static class FundDescendStateHistoryQueryExtension
    {
        /// <summary>
        /// 取得经费下拨的状态历史
        /// </summary>
        /// <param name="query"></param>
        /// <param name="fundDescendID"></param>
        /// <returns></returns>
        public static IList<FundDescendStateHistory> GetByFundDescend(this IQueryable<FundDescendStateHistory> query, int fundDescendID)
        {
            return query
                .Where(q => q.FundDescendID == fundDescendID)
                .OrderBy(q => q.ID)
                .ToList();
        }
    }
    /// <summary>
    /// 经费下拨状态历史的权限扩展
    /// </summary>
    public static class FundDescendStateHistoryPermissionExtension
    {
    }
}
