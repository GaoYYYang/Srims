using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataImport.Importer.Common
{
    public class CountImporter : ImporterBase<Count_Old, Count>
    {
        /// <summary>
        /// 用于记录凭单编号的年份
        /// </summary>
        public const int VOUCHER_NUMBER_YEAR = 2008;

        protected override string EntityName
        {
            get { return "计数器"; }
        }

        protected override string GetEntityDescription(Count_Old oldEntity)
        {
            return oldEntity.Year.ToString();
        }

        protected override Count GetNewEntity(Count_Old oldEntity)
        {
            var count = new Count();

            count.Contract = oldEntity.Contract;
            count.HorizontalProject = oldEntity.HorizontalProject;
            count.Year = oldEntity.Year;
            count.ExpertSerialCodeCount = oldEntity.ExpertSerialCodeCount;

            if (count.Year == VOUCHER_NUMBER_YEAR)
            {
                var systemSettings = NewDatabase.SystemSettings.GetSystemSetting();
                systemSettings.HorizontalVoucher = oldEntity.HorizontalVoucher;
                systemSettings.VerticalVoucher = oldEntity.VerticalVoucher;
                systemSettings.Save(NewDatabase);
            }

            return count;
        }
    }
}
