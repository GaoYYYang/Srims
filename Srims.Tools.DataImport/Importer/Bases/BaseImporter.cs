using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Bases;

namespace Srims.Tools.DataImport.Importer.Bases
{
    public class BaseImporter : ImporterBase<Base_Old, Base>
    {
        protected override string EntityName
        {
            get { return "基地"; }
        }

        protected override string GetEntityDescription(Base_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override Base GetNewEntity(Base_Old oldEntity)
        {
            var newBase = new Base();

            newBase.AcademyDirector = GetNewExpertByOld(oldEntity.AcademyDirectorID);
            newBase.AcademyDirectorName = oldEntity.AcademyDirectorName;
            newBase.Address = oldEntity.Address;
            newBase.Administration = oldEntity.Administration;
            newBase.Director = GetNewExpertByOld(oldEntity.DirectorID);
            newBase.DirectorName = oldEntity.DirectorName;
            newBase.Fax = oldEntity.Fax;
            newBase.Name = oldEntity.Name;
            newBase.Phone = oldEntity.Phone;
            newBase.Rank = oldEntity.Rank;
            newBase.Zip = oldEntity.Zip;

            return newBase;
        }
    }
}
