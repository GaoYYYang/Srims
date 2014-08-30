using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费扩展
    /// </summary>
    public static class FinanceExtension
    {
        /// <summary>
        /// 经费的显示扩展
        /// </summary>
        /// <param name="finance"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowFinance(this Finance finance, HttpResponse response, User user, IDatabase database)
        {
            if (finance != null)
            {
                response.WriteTagBegin("Record");

                //basic
                response.WriteTagWithValue("ID", finance.ID);
                response.WriteTagWithValue("ReceivedDate", finance.ReceivedDate);
                response.WriteTagWithValue("VoucherNumber", finance.VoucherNumber);
                response.WriteTagWithValue("IsInvoiced", finance.IsInvoiced);
                response.WriteTagWithValue("InvoiceType", finance.InvoiceType);
                response.WriteTagWithValue("InvoiceTime", finance.InvoiceTime);
                response.WriteTagWithValue("InvoiceNumber", finance.InvoiceNumber);
                response.WriteTagWithValue("DescendAmount", finance.DescendAmount);
                response.WriteTagWithValue("Amount", finance.Amount);
                response.WriteTagWithValue("Abstract", finance.Abstract);
                response.WriteTagWithValue("Remarks", finance.Remarks);
                //hasPermission
                response.WriteTagWithValue("HasPermission_Show", user.HasPermission_ShowFinance(database));
                response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteFinance(database));
                response.WriteTagWithValue("HasPermission_Descend", user.HasPermission_Descend(database));
                response.WriteTagWithValue("HasPermission_Invoice", user.HasPermission_Invoice(database));
                response.WriteTagWithValue("HasPermission_DeleteInvoice", user.HasPermission_DeleteInvoice(database));
                response.WriteTagWithValue("HasPermission_EditInvoice", user.HasPermission_EditInvoice(database));
                response.WriteTagWithValue("HasPermisson_ShowVouchers", user.HasPermisson_ShowVouchers(database));

                //can
                response.WriteTagWithValue("CanShow", user.CanShowFinance(database));
                response.WriteTagWithValue("CanDelete", user.CanDelete(finance, database));
                response.WriteTagWithValue("CanDescend", user.CanDescend(finance, database));
                response.WriteTagWithValue("CanInvoice", user.CanInvoice(finance, database));
                response.WriteTagWithValue("CanDeleteInvoice", user.CanDeleteInvoice(finance, database));
                response.WriteTagWithValue("CanEditInvoice", user.CanEditInvoice(finance, database));
                response.WriteTagWithValue("CanShowVouchers", user.CanShowVouchers(database));

                response.WriteTagEnd("Record");
            }
        }
        /// <summary>
        /// 显示经费到帐信息（检索）
        /// </summary>
        /// <param name="finance"></param>
        /// <param name="response"></param>
        public static void ShowForSearch(this Finance finance, HttpResponse response)
        {
            //basic
            response.WriteTagWithValue("ID", finance.ID);
            response.WriteTagWithValue("VoucherNumber", finance.VoucherNumber);
            response.WriteTagWithValue("ReceivedDate", finance.ReceivedDate);
            response.WriteTagWithValue("DescendAmount", finance.DescendAmount);
            response.WriteTagWithValue("Amount", finance.Amount);
            response.WriteTagWithValue("Abstract", finance.Abstract);
        }
        /// <summary>
        /// 显示经费列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Finance> list, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("List");
            foreach (Finance finance in list)
                finance.ShowFinance(response, user, database);
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示经费查询结果
        /// </summary>
        /// <param name="financeQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this FinanceQueryResult financeQueryResult, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("QueryResult");
            response.WriteTagWithValue("Total", financeQueryResult.Total);
            response.WriteTagWithValue("FinanceSum", financeQueryResult.SumFinanceTotal);
            response.WriteTagWithValue("FinanceDescendSum", financeQueryResult.SumFinanceDescend);

            financeQueryResult.ResultList.Show(response, user, database);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 取得新建或编辑经费信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Finance GetFinance(this HttpRequest request, IDatabase database, User user)
        {
            var finance = request.getFinance(database, user);

            finance.VoucherNumber = request.GetString("VoucherNumber");
            finance.Amount = request.GetMoney("Amount").Value;
            finance.Abstract = request.GetString("Abstract");
            finance.ReceivedDate = request.GetDateTime("ReceivedDate").Value;

            return finance;
        }
        /// <summary>
        /// 获得开发票的经费信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Finance GetFinanceWithInvoice(this HttpRequest request, IDatabase database, User user)
        {
            var finance = request.GetEntity<Finance>(database.Finances, "id");

            finance.InvoiceType = request.GetString("InvoiceType");
            finance.InvoiceNumber = request.GetString("InvoiceNumber");
            finance.InvoiceTime = DateTime.Now;
            finance.IsInvoiced = true;

            return finance;
        }
        private static Finance getFinance(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Finances.GetByID(id.Value);

            var finance = new Finance();
            return finance;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldFinance(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getFinance(database, user).Clone();
            return oldEntity;
        }
    }
}
