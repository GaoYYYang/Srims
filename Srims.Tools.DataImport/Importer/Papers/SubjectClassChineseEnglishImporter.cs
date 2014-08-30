using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class SubjectClassChineseEnglishImporter : ImporterBase<SubjectClassChineseEnglish_Old, SubjectClassChineseEnglish>
    {
        protected override string EntityName
        {
            get { return "学科分类中英文对照表"; }
        }

        protected override string GetEntityDescription(SubjectClassChineseEnglish_Old oldEntity)
        {
            return oldEntity.Chinese;
        }

        protected override SubjectClassChineseEnglish GetNewEntity(SubjectClassChineseEnglish_Old oldEntity)
        {
            var newSubjectClassChineseEnglish = new SubjectClassChineseEnglish();
            newSubjectClassChineseEnglish.ChineseName = oldEntity.Chinese;
            newSubjectClassChineseEnglish.EnglishName = oldEntity.Enlish;
            return newSubjectClassChineseEnglish;
        }
    }
}
