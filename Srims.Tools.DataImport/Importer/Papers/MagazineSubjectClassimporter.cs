using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class MagazineSubjectClassimporter : ImporterBase<MagazineSubjectClass_Old, MagazineSubjectClass>
    {
        protected override string EntityName
        {
            get { return "杂志学科分类"; }
        }

        protected override string GetEntityDescription(MagazineSubjectClass_Old oldEntity)
        {
            return oldEntity.Magazine_Old.FullName;
        }

        protected override MagazineSubjectClass GetNewEntity(MagazineSubjectClass_Old oldEntity)
        {
            var magazineSubjectClass = new MagazineSubjectClass();

            magazineSubjectClass.Magazine = NewDatabase.Magazines.Single(m => m.ISSN == oldEntity.Magazine_Old.ISSN);
            magazineSubjectClass.SubjectClass = oldEntity.SubjectClass;

            return magazineSubjectClass;
        }
    }
}
