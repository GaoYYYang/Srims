using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class PaperAuthorImporter : ImporterBase<PaperAuthor_Old, PaperAuthor>
    {
        protected override string EntityName
        {
            get { return "论文作者"; }
        }

        protected override string GetEntityDescription(PaperAuthor_Old oldEntity)
        {
            return oldEntity.Paper_Old.Name + " - " + oldEntity.Name;
        }

        protected override PaperAuthor GetNewEntity(PaperAuthor_Old oldEntity)
        {
            var paperAuthor = new PaperAuthor();

            paperAuthor.EnglishName = oldEntity.EnglishName;
            paperAuthor.Expert = GetNewExpertByOld(oldEntity.ExpertID);
            paperAuthor.IsLinkMan = oldEntity.IsLinkMan;
            paperAuthor.Name = oldEntity.Name;
            paperAuthor.Order = oldEntity.Order;
            paperAuthor.Paper = NewDatabase.Papers.Single(p => p.OldID == oldEntity.Paper_Old.ID);

            return paperAuthor;
        }
    }
}
