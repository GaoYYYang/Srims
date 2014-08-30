using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Patents;

namespace Srims.Tools.DataImport.Importer.Patents
{
    public class PatentAgencyImporter : ImporterBase<PatentAgency_Old, PatentAgency>
    {
        protected override string EntityName
        {
            get { return "专利代理"; }
        }

        protected override string GetEntityDescription(PatentAgency_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override PatentAgency GetNewEntity(PatentAgency_Old oldEntity)
        {
            var patentAgency = new PatentAgency();

            patentAgency.Contract = oldEntity.Contract;
            patentAgency.Name = oldEntity.Name;

            return patentAgency;
        }
    }
}
