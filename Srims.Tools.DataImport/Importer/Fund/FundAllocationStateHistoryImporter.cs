using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FundAllocationStateHistoryImporter : ImporterBase<FundAllocation_Old, FundAllocationStateHistory>
    {
        protected override string EntityName
        {
            get { return "经费分配状态"; }
        }

        protected override string GetEntityDescription(FundAllocation_Old oldEntity)
        {
            return string.Format(@"{0}({1}):{2}", oldEntity.ProjectName, oldEntity.SubmitDateTime, oldEntity.Amount);
        }
        protected override IQueryable<FundAllocation_Old> GetOldEntities()
        {
            return OldDatabase
                .FundAllocation_Olds
                .Where(fa => fa.FundDescendID.HasValue);
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("UPDATE [FundAllocation] SET [CurrentStateID] = Null");
            NewDatabase.ExecuteCommand("DELETE FROM [FundAllocationStateHistory]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override FundAllocationStateHistory GetNewEntity(FundAllocation_Old oldEntity)
        {
            FundAllocationStateHistory fundAllocationStateHistory = insertFundAllocationStateHistory_Unsubmit(oldEntity);

            if (oldEntity.CensorState >= Convert.ToInt32(FundAllocationState.WaitingCensor))
                fundAllocationStateHistory = insertFundAllocationStateHistory(oldEntity, FundAllocationState.WaitingCensor);

            if (oldEntity.CensorState == Convert.ToInt32(FundAllocationState.Reject))
                fundAllocationStateHistory = insertFundAllocationStateHistory(oldEntity, FundAllocationState.Reject);

            if (oldEntity.CensorState == Convert.ToInt32(FundAllocationState.Passed) || oldEntity.CensorState == Convert.ToInt32(FundAllocationState.Canceled))
                fundAllocationStateHistory = insertFundAllocationStateHistory(oldEntity, FundAllocationState.Passed);

            if (oldEntity.CensorState == Convert.ToInt32(FundAllocationState.Canceled))
                fundAllocationStateHistory = insertFundAllocationStateHistory(oldEntity, FundAllocationState.Canceled);

            updateFundAllocation(fundAllocationStateHistory);
            return fundAllocationStateHistory;
        }

        private FundAllocationStateHistory insertFundAllocationStateHistory_Unsubmit(FundAllocation_Old oldEntity)
        {
            var fundDescendState_Passed = NewDatabase
                .FundDescendStateHistories
                .Single(fdsh => fdsh.State == FundDescendState.Passed && fdsh.FundDescend.OldID == oldEntity.FundDescendID);

            var fundAllocationStateHistory = new FundAllocationStateHistory();
            fundAllocationStateHistory.DateTime = fundDescendState_Passed.DateTime;
            fundAllocationStateHistory.Operator = fundDescendState_Passed.Operator;
            fundAllocationStateHistory.FundAllocation = NewDatabase.FundAllocations.Single(fd => fd.OldID == oldEntity.ID);
            fundAllocationStateHistory.State = FundAllocationState.UnSubmit;

            fundAllocationStateHistory.Save(NewDatabase);
            return fundAllocationStateHistory;
        }

        private FundAllocationStateHistory insertFundAllocationStateHistory(FundAllocation_Old oldEntity, FundAllocationState fundAllocationState)
        {
            var fundAllocationStateHistory = new FundAllocationStateHistory();
            fundAllocationStateHistory.DateTime = oldEntity.CensorDateTime.HasValue ? oldEntity.CensorDateTime.Value : DateTime.Now;
            fundAllocationStateHistory.Operator = String.IsNullOrEmpty(oldEntity.Censor) ? oldEntity.ProjectName : oldEntity.Censor;
            fundAllocationStateHistory.FundAllocation = NewDatabase.FundAllocations.Single(fd => fd.OldID == oldEntity.ID);
            fundAllocationStateHistory.State = fundAllocationState;
            fundAllocationStateHistory.Remark = String.IsNullOrEmpty(oldEntity.CensorRemark) ? oldEntity.CensorRemark : String.Empty;

            fundAllocationStateHistory.Save(NewDatabase);
            return fundAllocationStateHistory;
        }

        private void updateFundAllocation(FundAllocationStateHistory fundDescendStateHistory)
        {
            fundDescendStateHistory.FundAllocation.CurrentState = fundDescendStateHistory;
            fundDescendStateHistory.FundAllocation.Save(NewDatabase);
        }
    }
}
