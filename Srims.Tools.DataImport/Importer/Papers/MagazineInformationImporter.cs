using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class MagazineInformationImporter : ImporterBase<MagazineInformation_Old, MagazineInformation>
    {
        protected override string EntityName
        {
            get { return "杂志信息"; }
        }

        protected override string GetEntityDescription(MagazineInformation_Old oldEntity)
        {
            return oldEntity.Magazine_Old.FullName;
        }

        protected override MagazineInformation GetNewEntity(MagazineInformation_Old oldEntity)
        {
            var magazineInformation = new MagazineInformation();

            magazineInformation.CiteFrequency = oldEntity.CiteFrequency;
            magazineInformation.CiteHalfLife = oldEntity.CiteHalfLife;
            magazineInformation.InfluenceFactor = oldEntity.InfluenceFactor;
            magazineInformation.InstantExponent = oldEntity.InstantExponent;
            magazineInformation.Magazine = NewDatabase.Magazines.Single(m => m.ISSN == oldEntity.Magazine_Old.ISSN);
            magazineInformation.PaperCount = oldEntity.PaperCount;
            magazineInformation.SubAirer = oldEntity.SubAirer;
            magazineInformation.Year = oldEntity.Year;

            return magazineInformation;
        }
    }
}
