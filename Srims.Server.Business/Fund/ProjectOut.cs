using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目-外协
    /// </summary>
    public partial class ProjectOut : Entity<ProjectOut>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Amount > 0, "外协金额必须大于零");
        }
    }

    /// <summary>
    /// 项目-外协的业务扩展
    /// </summary>
    public static class ProjectOutBusinessExtension
    {
    }
    /// <summary>
    /// 项目-外协的查询扩展
    /// </summary>
    public static class ProjectOutQueryExtension
    {
        /// <summary>
        /// 取得某一项目的外协
        /// </summary>
        /// <param name="query"></param>
        /// <param name="voucherID"></param>
        /// <returns></returns>
        public static IList<ProjectOut> GetByProjectID(this IQueryable<ProjectOut> query, int projectID)
        {
            return query.Where(po => po.ProjectID == projectID).ToList();
        }
        public static IList<ProjectOut> GetByFundAllocationID(this IQueryable<ProjectOut> query, IDatabase database, int fundAllocationID)
        {
            var fundAllocation = database.FundAllocations.Single(c => c.ID == fundAllocationID);
            return query.Where(po => po.Project == fundAllocation.FundDescend.ProjectInfo_Fund.Project).ToList();
        }
        /// <summary>
        /// 获取外协单位已分配给该项目的数额
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static long GetAllocatedAmount(this ProjectOut projectOut, IDatabase database)
        {
            var list = database.VoucherOuts.Where(c => c.Corporation == projectOut.Outsourcing.Name && c.Voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project == projectOut.Project).ToList();
            long allocatedAmount = 0;
            foreach (var item in list)
            {
                if (item.CheckPassed())
                {
                    allocatedAmount += item.Amount;
                }
            }
            return allocatedAmount;
        }
       
    }
    /// <summary>
    /// 项目-外协的权限扩展
    /// </summary>
    public static class ProjectOutPermissionExtension
    {
    }
}
