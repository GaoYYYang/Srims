using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FundDescendImporter : ImporterBase<FundDescend_Old, FundDescend>
    {
        protected override bool IsUseSaveAction
        {
            get { return false; }
        }

        public override void Clear()
        {
            NewDatabase.ExecuteCommand("DELETE FROM FinanceFundDescend");
            base.Clear();
        }

        public const string LoanFinance_VoucherNumber = "*****";

        protected override string EntityName
        {
            get { return "经费下拨"; }
        }

        protected override string GetEntityDescription(FundDescend_Old oldEntity)
        {
            return String.Format(@"{0} - {1}({2})", oldEntity.ProjectInfo_Fund_Old.Project_Old.Name, oldEntity.Finance_Old.Description, oldEntity.DescendDateTime);
        }

        protected override FundDescend GetNewEntity(FundDescend_Old oldEntity)
        {
            var fundDescend = new FundDescend();

            fundDescend.Amount = getAmount(oldEntity);
            fundDescend.DescendDateTime = oldEntity.DescendDateTime;
            fundDescend.OldID = oldEntity.ID;
            fundDescend.Operator = oldEntity.Operator;
            fundDescend.ProjectInfo_Fund = GetNewProjectInfo_FundByOld(oldEntity.ProjectInfo_FundID);

            NewDatabase.FundDescends.Add(fundDescend);
            NewDatabase.Submit();
            importFinanceFundDescend(fundDescend, oldEntity);

            return fundDescend;
        }

        private long getAmount(FundDescend_Old oldEntity)
        {
            var fundAllocation = OldDatabase.FundAllocation_Olds.FirstOrDefault(fa => fa.FundDescendID == oldEntity.ID);
            if (fundAllocation == null)
                return oldEntity.Amount;
            else
                return fundAllocation.Amount;
        }

        private void importFinanceFundDescend(FundDescend fundDescend, FundDescend_Old oldEntity)
        {
            var oldFinance = oldEntity.Finance_Old;
            if (oldFinance.VoucherNumber == LoanFinance_VoucherNumber)
                return;

            var financeFundDescend = new FinanceFundDescend();
            financeFundDescend.Amount = fundDescend.Amount;
            financeFundDescend.Finance = NewDatabase.Finances.Single(f => f.OldID == oldFinance.ID);
            financeFundDescend.FundDescend = fundDescend;
            financeFundDescend.IsReturn = false;
            financeFundDescend.OperateDateTime = fundDescend.DescendDateTime;
            financeFundDescend.Operator = fundDescend.Operator;

            NewDatabase.FinanceFundDescends.Add(financeFundDescend);
            NewDatabase.Submit();
        }
    }
}
