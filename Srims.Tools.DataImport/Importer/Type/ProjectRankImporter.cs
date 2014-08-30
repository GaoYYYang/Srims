using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Type;

namespace Srims.Tools.DataImport.Importer.Type
{
    public class ProjectRankImporter : ImporterBase<ProjectRank_Old, ProjectRank>
    {
        protected override string EntityName
        {
            get { return "项目等级"; }
        }

        protected override string GetEntityDescription(ProjectRank_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override ProjectRank GetNewEntity(ProjectRank_Old oldEntity)
        {
            var rank = new ProjectRank();

            rank.IsHorizontal = oldEntity.IsHorizontal;
            rank.Name = oldEntity.Name;
            rank.IsAvailable = true;

            return rank;
        }
    }
}
