using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 凭单项目-外协分配
    /// </summary>
    public partial class VoucherOut : Entity<VoucherOut>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Amount > 0, "外协金额必须大于零");
            validater.AddCondition(!string.IsNullOrEmpty(_Corporation), "外协公司不能为空");
            validater.AddCondition(_Voucher.Entity != null, "对应的凭单不能为空");
        }
        /// <summary>
        /// 取得对应的外协
        /// </summary>
        public Outsourcing Outsourcing
        {
            get { return _Outsourcing.Entity; }
            set
            {
                _Outsourcing.Entity = value;
                _OutsourcingID = value == null ? null : new int?(value.ID);
                _Corporation = value == null ? null : value.Name;
            }
        }
    }

    /// <summary>
    /// 凭单项目-外协分配的业务扩展
    /// </summary>
    public static class VoucherOutBusinessExtension
    {
    }
    /// <summary>
    /// 凭单项目-外协分配的查询扩展
    /// </summary>
    public static class VoucherOutQueryExtension
    {
        /// <summary>
        /// 取得某一凭单的外协
        /// </summary>
        /// <param name="query"></param>
        /// <param name="voucherID"></param>
        /// <returns></returns>
        public static IList<VoucherOut> GetByVoucherID(this IQueryable<VoucherOut> query, int voucherID)
        {
            return query.Where(vc => vc.VoucherID == voucherID).ToList();
        }
        //carlsirce
        /// <summary>
        /// 取得某一项目的某一外协单位的已分配外协
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectOut"></param>
        /// <returns></returns>
        public static IList<VoucherOut> GetByProjectOut(this IQueryable<VoucherOut> query, ProjectOut projectOut)
        {
            return query.Where(vc => vc.Voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project == projectOut.Project && (vc.Outsourcing == projectOut.Outsourcing || vc.Corporation == projectOut.Outsourcing.Name) && vc.Voucher.CurrentState.State != VoucherState.Canceled && vc.Voucher.CurrentState.State != VoucherState.Reject).ToList();
        }
        //carlsirce
        /// <summary>
        /// 取得该条目凭单是否审核通过（包括打印等状态）
        /// </summary>
        /// <param name="voucherout"></param>
        /// <returns></returns>
        public static bool CheckPassed(this VoucherOut voucherout)
        {
            return voucherout.Voucher.CurrentState.State == VoucherState.Allocated || voucherout.Voucher.CurrentState.State == VoucherState.NotSignIn || voucherout.Voucher.CurrentState.State == VoucherState.SignIn || voucherout.Voucher.CurrentState.State == VoucherState.UnPrinted;
        }

    }
    /// <summary>
    /// 凭单项目-外协分配的权限扩展
    /// </summary>
    public static class VoucherOutPermissionExtension
    {
    }
}
