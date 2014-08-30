using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Patents;

namespace Srims.Tools.DataImport.Importer.Patents
{
    public class PatentImporter : ImporterBase<Patent_Old, Patent>
    {
        protected override string EntityName
        {
            get { return "专利"; }
        }

        protected override string GetEntityDescription(Patent_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override Patent GetNewEntity(Patent_Old oldEntity)
        {
            var patent = new Patent();

            patent.Agency = getAgency(oldEntity);
            patent.AllCategoryNumber = oldEntity.AllCategoryNumber;
            patent.ApplicationDateTime = oldEntity.ApplicationDateTime;
            patent.AuthorizeDateTime = oldEntity.AuthorizeDateTime;
            patent.Category = oldEntity.Category;
            patent.College = GetNewCollegeByOld(oldEntity.CollegeID);
            patent.Country = oldEntity.Country;
            patent.Introduction = oldEntity.Introduction;
            patent.LawState = (PatentLawState)oldEntity.LawState;
            patent.LawStateTime = oldEntity.LawStateTime;
            patent.Level = (PatentLevel)oldEntity.Level;
            patent.MainCategoryNumber = oldEntity.MainCategoryNumber;
            patent.Name = oldEntity.Name;
            patent.Number = oldEntity.Number;
            patent.Remark = oldEntity.Remark;
            patent.Type = (PatentType)oldEntity.Type;
            patent.OldID = oldEntity.ID;

            return patent;
        }

        private PatentAgency getAgency(Patent_Old oldEntity)
        {
            if (!oldEntity.AgencyID.HasValue)
                return null;

            return NewDatabase
                .PatentAgencys
                .Single(pa => pa.Name == oldEntity.PatentAgency_Old.Name);
        }
    }
}
