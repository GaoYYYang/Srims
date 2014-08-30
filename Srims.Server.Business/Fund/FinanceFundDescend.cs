using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;
using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 到帐下拨关联
    /// </summary>
    public partial class FinanceFundDescend : Entity<FinanceFundDescend>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Amount > 0, "金额必须大于零");
            validater.AddCondition(_Finance.Entity != null, "对应经费到帐不能为空");
            validater.AddCondition(_FundDescend.Entity != null, "对应经费下拨不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Operator), "操作人不能为空");
            validater.AddCondition(_OperateDateTime != null, "操作时间不能为空");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                base.SaveAction(database);

                Finance.Save(database);
                FundDescend.Save(database);

                ts.Complete();
            }
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var finance = this.Finance;
                var fundDescend = this.FundDescend;

                base.DeleteAction(database);

                finance.Save(database);
                fundDescend.Save(database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 取得对应凭单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Voucher> GetVouchers(IQueryable<Voucher> query)
        {
            return query
                .Where(q => q.FundAllocation.FundDescendID == this.FundDescendID)
                .ToList();
        }
    }

    /// <summary>
    /// 到帐下拨关联的业务扩展
    /// </summary>
    public static class FinanceFundDescendBusinessExtension
    {
    }
    /// <summary>
    /// 到帐下拨关联的查询扩展
    /// </summary>
    public static class FinanceFundDescendQueryExtension
    {
        /// <summary>
        /// 取得项目的还款记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static IList<FinanceFundDescend> GetReturnByProjectId(this IQueryable<FinanceFundDescend> query, int projectId)
        {
            return query.Where(q => q.IsReturn
                && q.FundDescend.ProjectInfo_Fund.ProjectID == projectId && q.FundDescend.CurrentState.State != FundDescendState.Delete)
                .ToList();
        }
    }
    /// <summary>
    /// 到帐下拨关联的权限扩展
    /// </summary>
    public static class FinanceFundDescendPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有编辑还款记录的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="financeFundDescend"></param>
        /// <returns></returns>
        public static bool HasPermission_EditReturn(this User user, FinanceFundDescend financeFundDescend)
        {
            if (!financeFundDescend.IsReturn)
                throw new ArgumentNullException("这不是还款记录");

            return user.IsSuper;
        }
        /// <summary>
        /// 判断用户是否能够编辑还款记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="financeFundDescend"></param>
        /// <returns></returns>
        public static bool CanEditReturn(this User user, FinanceFundDescend financeFundDescend)
        {
            return user.HasPermission_EditReturn(financeFundDescend);
        }
        /// <summary>
        /// 判断用户是否具有删除还款记录的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="financeFundDescend"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteReturn(this User user, FinanceFundDescend financeFundDescend)
        {
            if (!financeFundDescend.IsReturn)
                throw new ArgumentNullException("这不是还款记录");

            return user.IsSuper;
        }
        /// <summary>
        /// 判断用户是否能够删除还款记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="financeFundDescend"></param>
        /// <returns></returns>
        public static bool CanDeleteReturn(this User user, FinanceFundDescend financeFundDescend)
        {
            return user.HasPermission_DeleteReturn(financeFundDescend);
        }
    }
}
