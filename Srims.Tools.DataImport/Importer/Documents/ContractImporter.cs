using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.DataAccess;
using Srims.Server.Business;

namespace Srims.Tools.DataImport.Importer.Documents
{
    public class ContractImporter : ImporterBase<Contract_Old, Contract>
    {
        protected override string EntityName
        {
            get { return "合同"; }
        }

        protected override string GetEntityDescription(Contract_Old oldEntity)
        {
            return oldEntity.Project_Old.Name;
        }

        protected override string ResourceColumn
        {
            get { return "ContractResource"; }
        }

        protected override Contract GetNewEntity(Contract_Old oldEntity)
        {
            var contract = new Contract();
            var oldDatebase = new SrimsV4DataContext(OldDatabaseConnectionString);
            var oldContract = oldDatebase.Contract_Olds.Single(c => c.ID == oldEntity.ID);

            contract.ContractNumber = oldContract.ContractNumber;
            contract.ContractResource = getResource(oldContract);
            contract.Project = GetNewProjectByOld(oldContract.ProjectID);
            contract.Type = (ContractType)oldContract.Type;
            contract.State = (CensorState)oldEntity.State;
            if (contract.State == CensorState.Passed || contract.State == CensorState.Reject)
            {
                contract.SubmitDateTime = oldEntity.Project_Old.CreateDate;
                contract.Censor = oldEntity.Project_Old.Creator;
            }


            oldDatebase.Dispose();
            oldDatebase = null;
            System.GC.Collect();

            return contract;
        }

        private Guid? getResource(Contract_Old oldEntity)
        {
            if (oldEntity.Content == null)
                return null;

            var resource = new Resource();
            resource.Content = oldEntity.Content;
            resource.Guid = Guid.NewGuid();
            resource.Type = oldEntity.FileType;

            resource.Save(NewDatabase);

            return resource.Guid;
        }
    }
}
