using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class AnnouncementImporter : ImporterBase<Announcement_Old, Announcement>
    {
        protected override string EntityName
        {
            get { return "通知"; }
        }

        protected override string GetEntityDescription(Announcement_Old oldEntity)
        {
            return oldEntity.Title;
        }

        protected override Announcement GetNewEntity(Announcement_Old oldEntity)
        {
            var announcement = new Announcement();

            announcement.Content = oldEntity.Content;
            announcement.DateTime = oldEntity.DateTime;
            announcement.State = getState(oldEntity);
            announcement.Title = oldEntity.Title;
            announcement.UserName = oldEntity.UserName;

            return announcement;
        }

        private AnnouncementState getState(Announcement_Old oldEntity)
        {
            if (oldEntity.IsTop)
                return AnnouncementState.Top;
            else
                return AnnouncementState.Normal;
        }
    }
}
