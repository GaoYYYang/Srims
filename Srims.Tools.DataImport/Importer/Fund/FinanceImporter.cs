using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FinanceImporter : ImporterBase<Finance_Old, Finance>
    {
        protected override string EntityName
        {
            get { return "经费到账信息（暂存）"; }
        }

        protected override string GetEntityDescription(Finance_Old oldEntity)
        {
            return oldEntity.Description;
        }

        protected override Finance GetNewEntity(Finance_Old oldEntity)
        {
            var finance = new Finance();

            finance.Abstract = oldEntity.Description;
            finance.Amount = oldEntity.Amount;
            finance.DescendAmount = oldEntity.DescendAmount;
            finance.InvoiceNumber = oldEntity.InvoiceNumber;
            finance.InvoiceTime = oldEntity.InvoiceTime;
            finance.InvoiceType = oldEntity.InvoiceType;
            finance.IsInvoiced = oldEntity.IsInvoiced;
            finance.ReceivedDate = oldEntity.ReceivedDate;
            finance.VoucherNumber = oldEntity.VoucherNumber;
            finance.OldID = oldEntity.ID;

            return finance;
        }
    }
}
