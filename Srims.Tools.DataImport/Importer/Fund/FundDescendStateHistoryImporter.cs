using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Fund;
using Srims.Server.Business;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FundDescendStateHistoryImporter : ImporterBase<FundDescend_Old, FundDescendStateHistory>
    {
        protected override bool IsUseSaveAction
        {
            get { return false; }
        }
        protected override string EntityName
        {
            get { return "经费下拨状态"; }
        }

        protected override string GetEntityDescription(FundDescend_Old oldEntity)
        {
            return String.Format(@"{0} - {1}({2})", oldEntity.ProjectInfo_Fund_Old.Project_Old.Name, oldEntity.Finance_Old.Description, oldEntity.DescendDateTime);
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("UPDATE [FundDescend] SET [CurrentStateID] = Null");
            NewDatabase.ExecuteCommand("DELETE FROM [FundDescendStateHistory]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override FundDescendStateHistory GetNewEntity(FundDescend_Old oldEntity)
        {
            FundDescendStateHistory fundDescendStateHistory = null;

            if (oldEntity.State >= Convert.ToInt32(FundDescendState.WaitingCensor))
                fundDescendStateHistory = insertFundDescendStateHistory(oldEntity, FundDescendState.WaitingCensor);

            if (oldEntity.State == Convert.ToInt32(FundDescendState.Reject))
                fundDescendStateHistory = insertFundDescendStateHistory(oldEntity, FundDescendState.Reject);

            if (oldEntity.State == Convert.ToInt32(FundDescendState.Passed))
                fundDescendStateHistory = insertFundDescendStateHistory(oldEntity, FundDescendState.Passed);

            if (oldEntity.IsAllocated)
                fundDescendStateHistory = insertFundDescendStateHistory_AllocationCompleted(oldEntity);

            updateFundDescend(fundDescendStateHistory);
            return fundDescendStateHistory;
        }

        private FundDescendStateHistory insertFundDescendStateHistory(FundDescend_Old oldEntity, FundDescendState fundDescendState)
        {
            var fundDescendStateHistory = new FundDescendStateHistory();
            fundDescendStateHistory.DateTime = oldEntity.DescendDateTime;
            fundDescendStateHistory.Operator = oldEntity.Operator;
            fundDescendStateHistory.FundDescend = NewDatabase.FundDescends.Single(fd => fd.OldID == oldEntity.ID);
            fundDescendStateHistory.State = fundDescendState;

            NewDatabase.FundDescendStateHistories.Add(fundDescendStateHistory);
            NewDatabase.Submit();
            return fundDescendStateHistory;
        }

        private FundDescendStateHistory insertFundDescendStateHistory_AllocationCompleted(FundDescend_Old oldEntity)
        {
            var fundAllocation = OldDatabase
                .FundAllocation_Olds
                .Single(fa => fa.FundDescend_Old == oldEntity && fa.CensorState == Convert.ToInt32(CensorState.Passed));

            var fundDescendStateHistory = new FundDescendStateHistory();
            fundDescendStateHistory.DateTime = fundAllocation.CensorDateTime.Value;
            fundDescendStateHistory.Operator = fundAllocation.Censor;
            fundDescendStateHistory.FundDescend = NewDatabase.FundDescends.Single(fd => fd.OldID == oldEntity.ID);
            fundDescendStateHistory.State = FundDescendState.AllocationCompleted;

            NewDatabase.FundDescendStateHistories.Add(fundDescendStateHistory);
            NewDatabase.Submit();
            return fundDescendStateHistory;
        }

        private void updateFundDescend(FundDescendStateHistory fundDescendStateHistory)
        {
            fundDescendStateHistory.FundDescend.CurrentState = fundDescendStateHistory;
            NewDatabase.Submit();

            var financeFundDescend = NewDatabase
                .FinanceFundDescends
                .SingleOrDefault(q => q.FundDescendID == fundDescendStateHistory.FundDescendID);

            if (financeFundDescend != null)
            {
                financeFundDescend.UpdateStatistic(NewDatabase);
                NewDatabase.Submit();
            }
        }
    }
}
