using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class ProjectInfo_FundImporter : ImporterBase<ProjectInfo_Fund_Old, ProjectInfo_Fund>
    {
        protected override string EntityName
        {
            get { return "项目经费信息"; }
        }

        protected override string GetEntityDescription(ProjectInfo_Fund_Old oldEntity)
        {
            return oldEntity.Project_Old.Name;
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("UPDATE [Project] SET [FundID] = Null");
            NewDatabase.ExecuteCommand("DELETE FROM [ProjectInfo_Fund]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override ProjectInfo_Fund GetNewEntity(ProjectInfo_Fund_Old oldEntity)
        {
            var projectInfo_Fund = new ProjectInfo_Fund();

            projectInfo_Fund.AccountBookNumber = oldEntity.AccountBookNumber;
            projectInfo_Fund.AccountBookNumberCount = oldEntity.FundMemberCount;

            projectInfo_Fund.FundAlreadyHardware = oldEntity.FundAlreadyHardware;
            projectInfo_Fund.FundAlreadyIn = oldEntity.FundAlreadyIn;
            projectInfo_Fund.FundAlreadyOut = oldEntity.FundAlreadyOut;
            projectInfo_Fund.FundContract = oldEntity.FundContract;

            projectInfo_Fund.FundFrom = oldEntity.FundFrom;
            projectInfo_Fund.FundFromUnit = oldEntity.FundFromUnit;
            projectInfo_Fund.FundFromUnitAddress = oldEntity.FundFromUnitAddress;

            projectInfo_Fund.FundPlanHardware = oldEntity.FundPlanHardware.HasValue ? oldEntity.FundPlanHardware.Value : 0;
            projectInfo_Fund.FundPlanOut = oldEntity.FundPlanOutTotal.HasValue ? oldEntity.FundPlanOutTotal.Value : 0;
            projectInfo_Fund.FundReceived = oldEntity.FundReceived;
            projectInfo_Fund.FundTotal = oldEntity.FundTotal;

            projectInfo_Fund.OverheadExpenseInTotal = oldEntity.OverheadExpenseInTotal;
            projectInfo_Fund.OverheadExpenseOutTotal = oldEntity.OverheadExpenseOutTotal;

            projectInfo_Fund.OverheadExpensesAlreadyIn = oldEntity.OverheadExpensesIn;
            projectInfo_Fund.OverheadExpensesAlreadyOut = oldEntity.OverheadExpensesOut;

            projectInfo_Fund.Project = GetNewProjectByOld(oldEntity.ProjectID);

            updateProject(projectInfo_Fund);
            return projectInfo_Fund;
        }

        private void updateProject(ProjectInfo_Fund projectInfo_Fund)
        {
            projectInfo_Fund.Save(NewDatabase);
            projectInfo_Fund.Project.Fund = projectInfo_Fund;
            projectInfo_Fund.Project.Save(NewDatabase);
        }
    }
}
