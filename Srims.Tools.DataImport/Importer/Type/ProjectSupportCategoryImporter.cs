using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Type;

namespace Srims.Tools.DataImport.Importer.Type
{
    public class ProjectSupportCategoryImporter : ImporterBase<ProjectSupportCategory_Old, ProjectSupportCategory>
    {
        protected override string EntityName
        {
            get { return "项目资助类别"; }
        }

        protected override string GetEntityDescription(ProjectSupportCategory_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override ProjectSupportCategory GetNewEntity(ProjectSupportCategory_Old oldEntity)
        {
            var category = new ProjectSupportCategory();

            category.Name = oldEntity.Name;
            category.ProjectType = getProjectType(oldEntity);
            category.IsGetOverheadExpense = oldEntity.IsGetOverheadExpense;
            category.IsAvailable = true;

            return category;
        }

        private ProjectType getProjectType(ProjectSupportCategory_Old oldEntity)
        {
            return NewDatabase
                .ProjectTypes
                .Single(pt => pt.Name == oldEntity.ProjectType_Old.Name);
        }
    }
}
