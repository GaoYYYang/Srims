using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Projects;

namespace Srims.Tools.DataImport.Importer.Projects
{
    public class ProjectMemberImporter : ImporterBase<ProjectMember_Old, ProjectMember>
    {
        protected override string EntityName
        {
            get { return "项目成员"; }
        }

        protected override string GetEntityDescription(ProjectMember_Old oldEntity)
        {
            return String.Format("{0} - {1}", oldEntity.Project_Old.Name, oldEntity.Name);
        }

        protected override ProjectMember GetNewEntity(ProjectMember_Old oldEntity)
        {
            var projectMember = new ProjectMember();

            projectMember.Expert = GetNewExpertByOld(oldEntity.ExpertID);
            projectMember.Order = oldEntity.Order.Value;
            projectMember.Project = GetNewProjectByOld(oldEntity.ProjectID);
            projectMember.TaskName = oldEntity.TaskName;
            projectMember.TaskNo = oldEntity.TaskNo;

            return projectMember;
        }
    }
}
