using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Type;

namespace Srims.Tools.DataImport.Importer.Type
{
    public class ProjectSupportSubFieldImporter : ImporterBase<ProjectSupportSubField_Old, ProjectSupportSubField>
    {
        protected override string EntityName
        {
            get { return "项目资助子领域"; }
        }

        protected override string GetEntityDescription(ProjectSupportSubField_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override ProjectSupportSubField GetNewEntity(ProjectSupportSubField_Old oldEntity)
        {
            var subField = new ProjectSupportSubField();

            subField.Name = oldEntity.Name;
            subField.ProjectSupportField = getProjectSupportField(oldEntity);
            subField.IsAvailable = true;

            return subField;
        }

        private ProjectSupportField getProjectSupportField(ProjectSupportSubField_Old oldEntity)
        {
            return NewDatabase
                .ProjectSupportFields
                .Single(psf => psf.Name == oldEntity.ProjectSupportField_Old.Name && psf.ProjectType.Name == oldEntity.ProjectSupportField_Old.ProjectType_Old.Name);
        }
    }
}
