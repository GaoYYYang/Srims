using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FundAllocationImporter : ImporterBase<FundAllocation_Old, FundAllocation>
    {
        public static int[] ImportCensorStates = { 4, 6, 7, 8 };

        protected override string EntityName
        {
            get { return "经费分配"; }
        }

        protected override string GetEntityDescription(FundAllocation_Old oldEntity)
        {
            return string.Format(@"{0}({1}):{2}", oldEntity.ProjectName, oldEntity.SubmitDateTime, oldEntity.Amount);
        }
        protected override IQueryable<FundAllocation_Old> GetOldEntities()
        {
            return OldDatabase
                .FundAllocation_Olds
                .Where(fa => fa.FundDescendID.HasValue)
                .OrderBy(fa => fa.ID);
        }

        protected override FundAllocation GetNewEntity(FundAllocation_Old oldEntity)
        {
            var fundAllocation = new FundAllocation();

            fundAllocation.AllocationHardware = oldEntity.AllocationHardware;
            fundAllocation.AllocationIn = oldEntity.AllocationIn;
            fundAllocation.AllocationOut = oldEntity.AllocationOut;
            fundAllocation.FundDescend = NewDatabase.FundDescends.SingleOrDefault(fd => fd.OldID == oldEntity.FundDescendID);
            fundAllocation.OldID = oldEntity.ID;
            fundAllocation.OverheadExpensesIn = oldEntity.OverheadExpensesIn;
            fundAllocation.OverheadExpensesOut = oldEntity.OverheadExpensesOut;

            return fundAllocation;
        }
    }
}
