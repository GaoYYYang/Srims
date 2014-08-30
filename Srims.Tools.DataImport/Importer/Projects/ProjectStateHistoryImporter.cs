using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Projects;

namespace Srims.Tools.DataImport.Importer.Projects
{
    public class ProjectStateHistoryImporter : ImporterBase<Project_Old, ProjectStateHistory>
    {
        protected override string EntityName
        {
            get { return "项目状态"; }
        }

        protected override string GetEntityDescription(Project_Old oldEntity)
        {
            return oldEntity.Name;
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("UPDATE [Project] SET [CurrentStateID] = Null");
            NewDatabase.ExecuteCommand("DELETE FROM [ProjectStateHistory]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override ProjectStateHistory GetNewEntity(Project_Old oldEntity)
        {
            var projectStateHistory = new ProjectStateHistory();
            projectStateHistory.DateTime = oldEntity.CreateDate.HasValue ? oldEntity.CreateDate.Value : DateTime.Now;
            projectStateHistory.Operator = String.IsNullOrEmpty(oldEntity.Creator) ? "默认超级管理员" : oldEntity.Creator;
            projectStateHistory.Project = GetNewProjectByOld(oldEntity.ID);
            projectStateHistory.State = (ProjectState)oldEntity.State;

            updateProject(projectStateHistory);
            return projectStateHistory;
        }

        private void updateProject(ProjectStateHistory projectStateHistory)
        {
            projectStateHistory.Save(NewDatabase);
            projectStateHistory.Project.CurrentState = projectStateHistory;
            projectStateHistory.Project.Save(NewDatabase);
        }
    }
}
