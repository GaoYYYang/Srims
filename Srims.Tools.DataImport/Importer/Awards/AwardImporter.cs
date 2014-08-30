using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Awards
{
    public class AwardImporter : ImporterBase<Award_Old, Award>
    {
        protected override string EntityName
        {
            get { return "奖励"; }
        }

        protected override string GetEntityDescription(Award_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override Award GetNewEntity(Award_Old oldEntity)
        {
            var award = new Award();

            award.AttendType = oldEntity.AttendType;
            award.AuthorisedUnit = oldEntity.AuthorisedUnit;
            award.Class = oldEntity.Class;
            award.Classification = oldEntity.Classification;
            award.Introduction = oldEntity.Introduction;
            award.Name = oldEntity.Name;
            award.OldID = oldEntity.ID;
            award.Project = oldEntity.ProjectName;
            award.Rank = oldEntity.Rank;
            award.Remark = oldEntity.Remark;
            award.Year = oldEntity.Year;

            NoticeText noticeText = NewDatabase.NoticeTexts.SingleOrDefault(nt => nt.Type == NoticeTextType.AwardName && nt.Value == award.Name);
            if (noticeText == null)
            {
                noticeText = new NoticeText();
                noticeText.Value = award.Name;
                noticeText.Type = NoticeTextType.AwardName;
                noticeText.Save(NewDatabase);
            }

            return award;
        }
    }
}
