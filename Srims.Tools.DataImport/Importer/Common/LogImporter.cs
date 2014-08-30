using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class LogImporter : ImporterBase<Log_Old, Log>
    {
        protected override string EntityName
        {
            get { return "日志"; }
        }

        protected override string GetEntityDescription(Log_Old oldEntity)
        {
            return oldEntity.ID.ToString();
        }

        protected override Log GetNewEntity(Log_Old oldEntity)
        {
            Regex regex = new Regex("用户登陆IP为：(.*)<br/>");
            var userIP = string.Empty;
            if (regex.IsMatch(oldEntity.Description))
                userIP = regex.Match(oldEntity.Description).Groups[1].Value;

            var log = new Log();
            log.Action = oldEntity.Action;
            log.DateTime = oldEntity.DateTime;
            log.User = oldEntity.User;
            log.Description = regex.Replace(oldEntity.Description, String.Empty);
            log.UserIP = userIP;

            return log;
        }
    }
}
