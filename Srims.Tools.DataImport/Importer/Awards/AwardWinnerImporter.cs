using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Awards;

namespace Srims.Tools.DataImport.Importer.Awards
{
    public class AwardWinnerImporter : ImporterBase<AwardWinner_Old, AwardWinner>
    {
        protected override string EntityName
        {
            get { return "获奖人"; }
        }

        protected override string GetEntityDescription(AwardWinner_Old oldEntity)
        {
            return oldEntity.Award_Old.Name + " - " + oldEntity.Name;
        }

        protected override AwardWinner GetNewEntity(AwardWinner_Old oldEntity)
        {
            var awardWinner = new AwardWinner();

            awardWinner.Award = NewDatabase.Awards.Single(a => a.OldID == oldEntity.AwardID);
            awardWinner.Expert = GetNewExpertByOld(oldEntity.ExpertID);
            awardWinner.Name = oldEntity.Name;
            awardWinner.Order = oldEntity.Order;

            if (awardWinner.Order == 1)
            {
                awardWinner.Save(NewDatabase);
                awardWinner.Award.FirstWinner = awardWinner;
                awardWinner.Award.Save(NewDatabase);
            }

            return awardWinner;
        }
    }
}
