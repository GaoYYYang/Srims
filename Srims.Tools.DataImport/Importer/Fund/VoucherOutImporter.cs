using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class VoucherOutImporter : ImporterBase<VoucherItemOut_Old, VoucherOut>
    {
        protected override bool IsUseSaveAction
        {
            get { return false; }
        }
        protected override string EntityName
        {
            get { return "外协分配"; }
        }

        protected override string GetEntityDescription(VoucherItemOut_Old oldEntity)
        {
            return String.Format("{0} - {1}", oldEntity.Voucher_Old.VoucherNumber, oldEntity.Corporation);
        }

        protected override IQueryable<VoucherItemOut_Old> GetOldEntities()
        {
            return OldDatabase
                .VoucherItemOut_Olds
                .Where(vio => vio.Voucher_Old.FundAllocation_Old.FundDescendID.HasValue);
        }

        protected override VoucherOut GetNewEntity(VoucherItemOut_Old oldEntity)
        {
            var voucherOut = new VoucherOut();

            voucherOut.Amount = oldEntity.Amount;
            voucherOut.Corporation = oldEntity.Corporation;
            voucherOut.Voucher = NewDatabase.Vouchers.Single(v => v.OldID == oldEntity.VoucherID);

            return voucherOut;
        }
    }
}
