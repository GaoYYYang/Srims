using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class PaperIndexedImporter : ImporterBase<PaperIndexed_Old, PaperIndexed>
    {
        protected override string EntityName
        {
            get { return "论文收录"; }
        }

        protected override string GetEntityDescription(PaperIndexed_Old oldEntity)
        {
            return oldEntity.Paper_Old.Name;
        }

        protected override PaperIndexed GetNewEntity(PaperIndexed_Old oldEntity)
        {
            var paperIndexed = new PaperIndexed();

            paperIndexed.Paper = NewDatabase.Papers.Single(p => p.OldID == oldEntity.Paper_Old.ID);
            paperIndexed.Indexed = (PaperIndexedType)oldEntity.Embody;

            return paperIndexed;
        }
    }
}
