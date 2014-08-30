using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class SystemSettingImporter : ImporterBase<SystemSetting_Old, SystemSetting>
    {
        protected override string EntityName
        {
            get { return "系统设置"; }
        }

        protected override string GetEntityDescription(SystemSetting_Old oldEntity)
        {
            return "系统设置";
        }

        protected override SystemSetting GetNewEntity(SystemSetting_Old oldEntity)
        {
            var systemSetting = NewDatabase.SystemSettings.GetSystemSetting();

            systemSetting.DefaultOverheadExpenseInRateHorizonal = oldEntity.OverheadExpenseInRateHorizonal;
            systemSetting.DefaultOverheadExpenseInRateVertical = oldEntity.OverheadExpenseInRateVertical;
            systemSetting.DefaultOverheadExpenseOutRateHorizonal = oldEntity.OverheadExpenseOutRateHorizonal;
            systemSetting.DefaultOverheadExpenseOutRateVertical = oldEntity.OverheadExpenseOutRateVertical;

            systemSetting.EmailAddress = oldEntity.EmailAddress;
            systemSetting.FundOutRatio = oldEntity.FundOutRatio;
            systemSetting.LogType = oldEntity.LogType;

            systemSetting.SmtpHost = oldEntity.SmtpHost;
            systemSetting.SmtpPassword = oldEntity.SmtpPassword;
            systemSetting.SmtpPort = oldEntity.SmtpPort;
            systemSetting.SmtpUsername = oldEntity.SmtpUsername;

            return systemSetting;
        }
    }
}
