using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class SubjectSecondLevelImporter : ImporterBase<SubjectSecondLevel_Old, SubjectSecondLevel>
    {
        protected override string EntityName
        {
            get { return "二级学科代码"; }
        }

        protected override string GetEntityDescription(SubjectSecondLevel_Old oldEntity)
        {
            return String.Format("{0}({1}),", oldEntity.Name, oldEntity.Code);
        }

        protected override SubjectSecondLevel GetNewEntity(SubjectSecondLevel_Old oldEntity)
        {
            var subjectSecondLevel = new SubjectSecondLevel();

            subjectSecondLevel.Name = oldEntity.Name;
            subjectSecondLevel.Code = oldEntity.Code;
            subjectSecondLevel.ChildCode = oldEntity.ChildCode;
            subjectSecondLevel.SubjectFirstLevel = getSubjectFirstLevel(oldEntity);

            return subjectSecondLevel;
        }

        private SubjectFirstLevel getSubjectFirstLevel(SubjectSecondLevel_Old oldEntity)
        {
            return NewDatabase
                .SubjectFirstLevels
                .Single(sfl => sfl.Code == oldEntity.SubjectFirstLevel_Old.Code);
        }
    }
}
