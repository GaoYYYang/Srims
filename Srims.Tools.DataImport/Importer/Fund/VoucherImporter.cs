using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class VoucherImporter : ImporterBase<Voucher_Old, Voucher>
    {
        protected override bool IsUseSaveAction
        {
            get { return false; }
        }
        protected override string EntityName
        {
            get { return "经费凭单"; }
        }

        protected override string GetEntityDescription(Voucher_Old oldEntity)
        {
            return oldEntity.VoucherNumber;
        }

        protected override IQueryable<Voucher_Old> GetOldEntities()
        {
            return OldDatabase
                .Voucher_Olds
                .Where(v => v.FundAllocation_Old.FundDescendID.HasValue);
        }

        protected override Voucher GetNewEntity(Voucher_Old oldEntity)
        {
            var voucher = new Voucher();

            voucher.AccountBookNumber = oldEntity.AccountBookNumber;
            voucher.AllocationHardware = oldEntity.AllocationHardware;
            voucher.AllocationIn = oldEntity.AllocationIn;
            voucher.AllocationOut = oldEntity.AllocationOut;
            voucher.FundAllocation = NewDatabase.FundAllocations.Single(fa => fa.OldID == oldEntity.FundAllocationID);
            voucher.FundMember = NewDatabase.FundMembers.Single(fm => fm.OldID == oldEntity.FundMemberID);
            voucher.IsRead = oldEntity.IsRead;
            voucher.OldID = oldEntity.ID;
            voucher.OverheadExpensesIn = oldEntity.OverheadExpensesIn;
            voucher.OverheadExpensesOut = oldEntity.OverheadExpensesOut;
            voucher.VoucherNumber = oldEntity.VoucherNumber;
            voucher.FinanceNumber = oldEntity.FinanceNumber;

            return voucher;
        }
    }
}
