using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Message;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class VoucherStateHistoryimporter : ImporterBase<Voucher_Old, VoucherStateHistory>
    {
        private const int OLD_VOUCHER_STATE_SIGN_IN = 1;
        private const int OLD_VOUCHER_STATE_ALLOCATE = 2;

        protected override bool IsUseSaveAction
        {
            get { return false; }
        }
        protected override string EntityName
        {
            get { return "凭单状态历史"; }
        }

        protected override string GetEntityDescription(Voucher_Old oldEntity)
        {
            return oldEntity.VoucherNumber;
        }

        protected override IQueryable<Voucher_Old> GetOldEntities()
        {
            //return OldDatabase
            //    .Voucher_Olds
            //    .Where(v => v.VoucherNumber != null && v.VoucherNumber.Length > 0);
            return OldDatabase
                .Voucher_Olds
                .Where(v => v.FundAllocation_Old.FundDescendID.HasValue && v.FundAllocation_Old.CensorState >= 4);
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("UPDATE [Voucher] SET [CurrentStateID] = Null");
            NewDatabase.ExecuteCommand("DELETE FROM [VoucherStateHistory]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override VoucherStateHistory GetNewEntity(Voucher_Old oldEntity)
        {
            VoucherStateHistory voucherStateHistory = insertVoucherStateHistory(oldEntity, VoucherState.Unknown);

            if ((new int[] { 4, 5 }).Contains(oldEntity.FundAllocation_Old.CensorState))
                voucherStateHistory = insertVoucherStateHistory(oldEntity, VoucherState.UnPrinted);

            if (oldEntity.IsPrinted)
                voucherStateHistory = insertVoucherStateHistory(oldEntity, VoucherState.NotSignIn);

            if (oldEntity.FinanceState == OLD_VOUCHER_STATE_SIGN_IN)
                insertVoucherStateHistory(oldEntity, VoucherState.NotSignIn);

            if (oldEntity.FinanceState == OLD_VOUCHER_STATE_ALLOCATE)
                voucherStateHistory = insertVoucherStateHistory(oldEntity, VoucherState.Allocated);

            if (oldEntity.FundAllocation_Old.CensorState == 5)
                voucherStateHistory = insertVoucherStateHistory(oldEntity, VoucherState.Canceled);

            updateVoucherState(voucherStateHistory);

            return voucherStateHistory;
        }

        private VoucherStateHistory insertVoucherStateHistory(Voucher_Old oldEntity, VoucherState voucherState)
        {
            var fundAllocationPassState = NewDatabase
                .FundAllocationStateHistories
                .Single(fash => fash.State == FundAllocationState.Passed && fash.FundAllocation.OldID == oldEntity.FundAllocationID);

            var voucherStateHistory = new VoucherStateHistory();
            voucherStateHistory.State = voucherState;
            voucherStateHistory.DateTime = voucherState == VoucherState.NotSignIn && oldEntity.PrintTime.HasValue ? oldEntity.PrintTime.Value : fundAllocationPassState.DateTime;
            voucherStateHistory.Operator = fundAllocationPassState.Operator;
            voucherStateHistory.Voucher = NewDatabase.Vouchers.Single(v => v.OldID == oldEntity.ID);

            NewDatabase.VoucherStateHistories.Add(voucherStateHistory);
            NewDatabase.Submit();

            return voucherStateHistory;
        }
        private void updateVoucherState(VoucherStateHistory voucherStateHistory)
        {
            voucherStateHistory.Voucher.CurrentState = voucherStateHistory;
            NewDatabase.Submit();
        }

    }
}
