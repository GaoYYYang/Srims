using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Type;

namespace Srims.Tools.DataImport.Importer.Type
{
    public class ProjectInfo_TypeImporter : ImporterBase<ProjectInfo_Type_Old, ProjectInfo_Type>
    {
        protected override string EntityName
        {
            get { return "项目类别信息"; }
        }

        protected override string GetEntityDescription(ProjectInfo_Type_Old oldEntity)
        {
            return oldEntity.Project_Old.Name;
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("UPDATE [Project] SET [TypeID] = Null");
            NewDatabase.ExecuteCommand("DELETE FROM [ProjectInfo_Type]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override ProjectInfo_Type GetNewEntity(ProjectInfo_Type_Old oldEntity)
        {
            var projectInfo_Type = new ProjectInfo_Type();

            projectInfo_Type.Project = GetNewProjectByOld(oldEntity.ProjectID);
            projectInfo_Type.Rank = getRank(oldEntity);
            projectInfo_Type.Type = getType(oldEntity);
            projectInfo_Type.SupportCategory = getSupportCategory(oldEntity);
            projectInfo_Type.SupportField = getSupportField(oldEntity);
            projectInfo_Type.SupportSubField = getSupportSubField(oldEntity);

            updateProject(projectInfo_Type);
            return projectInfo_Type;
        }

        private ProjectRank getRank(ProjectInfo_Type_Old oldEntity)
        {
            if (oldEntity.RankID.HasValue)
                return NewDatabase
                    .ProjectRanks
                    .Single(pr => pr.Name == oldEntity.ProjectRank_Old.Name);

            var projectRank = NewDatabase
                    .ProjectRanks
                    .SingleOrDefault(pr => pr.Name == oldEntity.RankName);

            if (projectRank != null)
                return projectRank;

            projectRank = new ProjectRank();
            projectRank.IsAvailable = false;
            projectRank.IsHorizontal = false;
            projectRank.Name = oldEntity.RankName;
            projectRank.Save(NewDatabase);

            return projectRank;
        }
        private ProjectType getType(ProjectInfo_Type_Old oldEntity)
        {
            if (oldEntity.TypeID.HasValue)
                return NewDatabase
                    .ProjectTypes
                    .Single(pt => pt.Name == oldEntity.ProjectType_Old.Name);

            var typeName = String.IsNullOrEmpty(oldEntity.TypeName) ? "其它" : oldEntity.TypeName;

            var projectType = NewDatabase
                .ProjectTypes
                .SingleOrDefault(pt => pt.Name == typeName);

            if (projectType != null)
                return projectType;

            projectType = new ProjectType();
            projectType.Name = typeName;
            projectType.IsAvailable = false;
            projectType.ProjectRank = NewDatabase.ProjectRanks.Single(pr => pr.Name == oldEntity.RankName);
            projectType.Save(NewDatabase);

            return projectType;
        }
        private ProjectSupportCategory getSupportCategory(ProjectInfo_Type_Old oldEntity)
        {
            if (oldEntity.SupportCategoryID.HasValue)
                return NewDatabase
                    .ProjectSupportCategories
                    .Single(psc => psc.Name == oldEntity.ProjectSupportCategory_Old.Name
                        && psc.ProjectType.Name == oldEntity.ProjectSupportCategory_Old.ProjectType_Old.Name);

            if (String.IsNullOrEmpty(oldEntity.SupportCategoryName))
                return null;

            var projectSupportCategory = NewDatabase
                .ProjectSupportCategories
                .SingleOrDefault(psc => psc.Name == oldEntity.SupportCategoryName
                    && psc.ProjectType.Name == oldEntity.TypeName);

            if (projectSupportCategory != null)
                return projectSupportCategory;

            projectSupportCategory = new ProjectSupportCategory();
            projectSupportCategory.IsAvailable = false;
            projectSupportCategory.Name = oldEntity.SupportCategoryName;
            projectSupportCategory.ProjectType = NewDatabase.ProjectTypes.Single(pt => pt.Name == oldEntity.TypeName);
            projectSupportCategory.Save(NewDatabase);

            return projectSupportCategory;
        }
        private ProjectSupportField getSupportField(ProjectInfo_Type_Old oldEntity)
        {
            if (oldEntity.SupportFieldID.HasValue)
                return NewDatabase
                    .ProjectSupportFields
                    .Single(psf => psf.Name == oldEntity.ProjectSupportField_Old.Name
                        && psf.ProjectType.Name == oldEntity.ProjectSupportField_Old.ProjectType_Old.Name);

            if (String.IsNullOrEmpty(oldEntity.SupportFieldName))
                return null;

            var projectSupportField = NewDatabase
                .ProjectSupportFields
                .SingleOrDefault(psf => psf.Name == oldEntity.SupportFieldName
                    && psf.ProjectType.Name == oldEntity.TypeName);

            if (projectSupportField != null)
                return projectSupportField;

            projectSupportField = new ProjectSupportField();
            projectSupportField.IsAvailable = false;
            projectSupportField.Name = oldEntity.SupportFieldName;
            projectSupportField.ProjectType = NewDatabase.ProjectTypes.Single(pt => pt.Name == oldEntity.TypeName);
            projectSupportField.Save(NewDatabase);

            return projectSupportField;
        }
        private ProjectSupportSubField getSupportSubField(ProjectInfo_Type_Old oldEntity)
        {
            if (oldEntity.SupportSubFieldID.HasValue)
                return NewDatabase
                    .ProjectSupportSubFields
                    .Single(pssf => pssf.Name == oldEntity.ProjectSupportSubField_Old.Name
                        && pssf.ProjectSupportField.Name == oldEntity.ProjectSupportField_Old.Name
                        && pssf.ProjectSupportField.ProjectType.Name == oldEntity.ProjectType_Old.Name);

            if (String.IsNullOrEmpty(oldEntity.SupportSubFieldName))
                return null;

            var projectSupportSubField = NewDatabase
                .ProjectSupportSubFields
                .SingleOrDefault(pssf => pssf.Name == oldEntity.SupportSubFieldName
                    && pssf.ProjectSupportField.Name == oldEntity.SupportFieldName
                    && pssf.ProjectSupportField.ProjectType.Name == oldEntity.TypeName);

            if (projectSupportSubField != null)
                return projectSupportSubField;

            projectSupportSubField = new ProjectSupportSubField();
            projectSupportSubField.IsAvailable = false;
            projectSupportSubField.Name = oldEntity.SupportSubFieldName;
            projectSupportSubField.ProjectSupportField = NewDatabase
                .ProjectSupportFields.Single(psf => psf.Name == oldEntity.SupportFieldName
                    && psf.ProjectType.Name == oldEntity.TypeName);
            projectSupportSubField.Save(NewDatabase);

            return projectSupportSubField;
        }

        private void updateProject(ProjectInfo_Type projectInfo_Type)
        {
            projectInfo_Type.Save(NewDatabase);
            projectInfo_Type.Project.Type = projectInfo_Type;
            projectInfo_Type.Project.Save(NewDatabase);
        }
    }
}
