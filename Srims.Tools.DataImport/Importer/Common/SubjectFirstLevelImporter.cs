using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class SubjectFirstLevelImporter : ImporterBase<SubjectFirstLevel_Old, SubjectFirstLevel>
    {
        protected override string EntityName
        {
            get { return "一级学科代码"; }
        }

        protected override string GetEntityDescription(SubjectFirstLevel_Old oldEntity)
        {
            return String.Format("{0}({1}),", oldEntity.Name, oldEntity.Code);
        }

        protected override SubjectFirstLevel GetNewEntity(SubjectFirstLevel_Old oldEntity)
        {
            var subjectFirstLevel = new SubjectFirstLevel();

            subjectFirstLevel.Name = oldEntity.Name;
            subjectFirstLevel.Code = oldEntity.Code;

            return subjectFirstLevel;
        }
    }
}
