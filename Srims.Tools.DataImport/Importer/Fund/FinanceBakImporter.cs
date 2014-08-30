using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FinanceBakImporter : ImporterBase<FinanceBak_Old, FinanceBak>
    {
        protected override string EntityName
        {
            get { return "经费到账信息副本"; }
        }

        protected override string GetEntityDescription(FinanceBak_Old oldEntity)
        {
            return oldEntity.Description;
        }

        protected override FinanceBak GetNewEntity(FinanceBak_Old oldEntity)
        {
            var financeBak = new FinanceBak();

            financeBak.Abstract = oldEntity.Description;
            financeBak.Amount = oldEntity.Amount;
            financeBak.ReceivedDate = oldEntity.ReceivedDate;
            financeBak.VoucherNumber = oldEntity.VoucherNumber;

            return financeBak;
        }
    }
}
