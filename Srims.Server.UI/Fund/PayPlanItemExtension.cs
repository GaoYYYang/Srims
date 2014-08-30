using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Fund;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 到帐计划的显示扩展
    /// </summary>
    public static class PayPlanItemExtension
    {
        /// <summary>
        /// 经费到帐计划的显示扩展
        /// </summary>
        /// <param name="payPlanItem"></param>
        /// <param name="response"></param>
        public static void ShowPayPlanItem(PayPlanItem payPlanItem, HttpResponse response)
        {
            response.WriteTagWithValue("ID", payPlanItem.ID);
            response.WriteTagWithValue("DateTime", payPlanItem.DateTime);
            response.WriteTagWithValue("Amount", payPlanItem.Amount);
        }
        /// <summary>
        /// 经费到帐计划列表的显示扩展
        /// </summary>
        /// <param name="payPlanItemList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<PayPlanItem> payPlanItemList, HttpResponse response)
        {
            ShowDelegate<PayPlanItem> showDelegate = new ShowDelegate<PayPlanItem>(ShowPayPlanItem);
            payPlanItemList.Show<PayPlanItem>(response, showDelegate);
        }
        /// <summary>
        /// 取得经费付款计划
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static PayPlanItem GetProjectPayPlanItem(this HttpRequest request, IDatabase database)
        {
            var payPlanItem = request.getProjectPlanItem(database);

            payPlanItem.Amount = request.GetLong("Amount").Value;
            payPlanItem.DateTime = request.GetDateTime("DateTime").Value;

            var project = request.GetEntity(database.Projects, "ProjectID");
            payPlanItem.ProjectInfo_Fund = project.Fund;

            return payPlanItem;

        }
        private static PayPlanItem getProjectPlanItem(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.PayPlanItems.GetByID(id.Value);

            return new PayPlanItem();
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldPayPlanItem(this HttpRequest request, IDatabase database)
        {
            Object oldEntity = new Object();
            oldEntity = request.getProjectPlanItem(database).Clone();
            return oldEntity;
        }
    }
}
