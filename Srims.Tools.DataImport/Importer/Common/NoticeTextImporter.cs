using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class NoticeTextImporter : ImporterBase<NoticeText_Old, NoticeText>
    {
        protected override string EntityName
        {
            get { return "提示文本"; }
        }

        protected override string GetEntityDescription(NoticeText_Old oldEntity)
        {
            return oldEntity.Value;
        }

        protected override NoticeText GetNewEntity(NoticeText_Old oldEntity)
        {
            var noticeText = new NoticeText();
            noticeText.Type = (NoticeTextType)oldEntity.Type;
            noticeText.Value = oldEntity.Value;
            noticeText.ValueSpell = oldEntity.ShortKey;

            return noticeText;
        }
    }
}
