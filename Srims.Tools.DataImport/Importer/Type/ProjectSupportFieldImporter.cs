using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Type;

namespace Srims.Tools.DataImport.Importer.Type
{
    public class ProjectSupportFieldImporter : ImporterBase<ProjectSupportField_Old, ProjectSupportField>
    {
        protected override string EntityName
        {
            get { return "项目资助领域"; }
        }

        protected override string GetEntityDescription(ProjectSupportField_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override ProjectSupportField GetNewEntity(ProjectSupportField_Old oldEntity)
        {
            var field = new ProjectSupportField();

            field.Name = oldEntity.Name;
            field.ProjectType = getProjectType(oldEntity);
            field.IsAvailable = true;

            return field;
        }

        private ProjectType getProjectType(ProjectSupportField_Old oldEntity)
        {
            return NewDatabase
                .ProjectTypes
                .Single(pt => pt.Name == oldEntity.ProjectType_Old.Name);
        }
    }
}
