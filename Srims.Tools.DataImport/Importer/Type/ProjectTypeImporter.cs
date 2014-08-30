using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Type;
using MIS.Common;

namespace Srims.Tools.DataImport.Importer.Type
{
    public class ProjectTypeImporter : ImporterBase<ProjectType_Old, ProjectType>
    {
        protected override string EntityName
        {
            get { return "项目类型"; }
        }

        protected override string GetEntityDescription(ProjectType_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override ProjectType GetNewEntity(ProjectType_Old oldEntity)
        {
            var type = new ProjectType();

            type.Administration = oldEntity.Administration;
            type.BakCode = oldEntity.BakCode;
            type.Code = oldEntity.Code;
            type.IsBudget = oldEntity.IsBudget;
            type.IsExploit = oldEntity.IsExploit.HasValue ? oldEntity.IsExploit.Value : false;
            type.PerCode = oldEntity.PreCode;
            type.IsAvailable = true;
            type.Name = oldEntity.Name;
            type.NameSpell = Spell.GetSpell(oldEntity.Name);
            type.OverheadExpenseInRate = oldEntity.OverheadExpenseInRate;
            type.OverheadExpenseOutRate = oldEntity.OverheadExpenseOutRate;
            type.ProjectComingFrom = (ProjectFrom)oldEntity.ProjectComingFrom;
            type.ProjectRank = getRank(oldEntity);
            type.ShortName = oldEntity.ShortName;

            return type;
        }

        private ProjectRank getRank(ProjectType_Old oldEntity)
        {
            return NewDatabase
                .ProjectRanks
                .Single(pr => pr.Name == oldEntity.ProjectRank_Old.Name);
        }
    }
}
