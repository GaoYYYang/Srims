using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class PayPlanItemImporter : ImporterBase<PayPlanItem_Old, PayPlanItem>
    {
        protected override string EntityName
        {
            get { return "到账计划"; }
        }

        protected override string GetEntityDescription(PayPlanItem_Old oldEntity)
        {
            return oldEntity.ProjectInfo_Fund_Old.Project_Old.Name;
        }

        protected override PayPlanItem GetNewEntity(PayPlanItem_Old oldEntity)
        {
            var payPlanItem = new PayPlanItem();

            payPlanItem.Amount = oldEntity.Amount;
            payPlanItem.DateTime = oldEntity.DateTime;
            payPlanItem.ProjectInfo_Fund = GetNewProjectInfo_FundByOld(oldEntity.ProjectInfo_FundID);

            return payPlanItem;
        }
    }
}
