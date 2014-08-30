using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Patents;

namespace Srims.Tools.DataImport.Importer.Patents
{
    public class PatentInventerImporter : ImporterBase<PatentInventer_Old, PatentInventer>
    {
        protected override string EntityName
        {
            get { return "专利发明人"; }
        }

        protected override string GetEntityDescription(PatentInventer_Old oldEntity)
        {
            return oldEntity.Patent_Old.Name + " - " + oldEntity.Name;
        }

        protected override PatentInventer GetNewEntity(PatentInventer_Old oldEntity)
        {
            var patentInventer = new PatentInventer();

            patentInventer.Expert = GetNewExpertByOld(oldEntity.ExpertID);
            patentInventer.IsPrincipal = oldEntity.IsPrincipal;
            patentInventer.Name = oldEntity.Name;
            patentInventer.Order = oldEntity.Order;
            patentInventer.Patent = NewDatabase.Patents.Single(p => p.OldID == oldEntity.Patent_Old.ID);

            return patentInventer;
        }
    }
}
