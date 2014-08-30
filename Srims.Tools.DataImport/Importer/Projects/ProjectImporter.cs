using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;

namespace Srims.Tools.DataImport.Importer.Projects
{
    public class ProjectImporter : ImporterBase<Project_Old, Project>
    {
        protected override bool IsUseSaveAction
        {
            get { return false; }
        }
        protected override string EntityName
        {
            get { return "项目"; }
        }

        protected override string GetEntityDescription(Project_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override Project GetNewEntity(Project_Old oldEntity)
        {
            var project = new Project();

            project.CooperationType = oldEntity.CooperationType;
            project.CorporationPlace = oldEntity.CorporationPlace;
            project.CreateDate = oldEntity.CreateDate;
            project.Creator = oldEntity.Creator;
            project.EndDate = oldEntity.EndDate;
            project.IsSecret = oldEntity.IsSecret;
            project.Level = (ProjectLevel)oldEntity.Level;
            project.Name = oldEntity.Name;
            project.NameSpell = String.IsNullOrEmpty(oldEntity.NameSpell) ? project.NameSpell : oldEntity.NameSpell;
            project.Number = oldEntity.Number;
            project.Principal = GetNewExpertByOld(oldEntity.PrincipalID);
            project.PrincipalDelegate = GetNewExpertByOld(oldEntity.PrincipalDelegateID);
            project.Remark = oldEntity.Remark;
            project.ResearchType = oldEntity.ResearchType;
            project.StartDate = oldEntity.StartDate;
            project.SecondLevelSubject = GetSubjectSecondLevelByOld(oldEntity.SubjectCodeID);
            project.FirstLevelSubject = project.SecondLevelSubject == null ? null : project.SecondLevelSubject.SubjectFirstLevel;
            project.TaskComingFrom = oldEntity.TaskComingFrom;
            project.Base = GetNewBaseByOld(oldEntity.Base_Old);
            project.OldID = oldEntity.ID;

            if (oldEntity.IsHorizontal && string.IsNullOrEmpty(oldEntity.Number) && (new int[] { 4, 6 }).Contains(oldEntity.State))
                project.Number = project.GetHorizontalProjectNumber(NewDatabase);

            return project;
        }
    }
}
