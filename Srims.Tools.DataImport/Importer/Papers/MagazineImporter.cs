using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class MagazineImporter : ImporterBase<Magazine_Old, Magazine>
    {
        protected override string EntityName
        {
            get { return "杂志"; }
        }

        protected override string GetEntityDescription(Magazine_Old oldEntity)
        {
            return oldEntity.FullName;
        }

        protected override Magazine GetNewEntity(Magazine_Old oldEntity)
        {
            var magazine = new Magazine();

            magazine.FullName = oldEntity.FullName;
            magazine.IsDelete = oldEntity.IsDelete;
            magazine.ISSN = oldEntity.ISSN;
            magazine.Language = (Language)oldEntity.Language;
            magazine.PublishCompany = oldEntity.PublishCompany;
            magazine.PublishCompanyAddress = oldEntity.PublishCompanyAddress;
            magazine.PublishCompanyCity = oldEntity.PublishCompanyCity;
            magazine.PublishType = (PublishType)oldEntity.PublishType;
            magazine.ShortName = oldEntity.ShortName;
            magazine.SubjectRank = oldEntity.SubjectRank;

            return magazine;
        }
    }
}
