using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;

using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.DataExchange;
using Srims.Server.DataExchange.DataAutoImport;
using Srims.Server.DataExchange.ArtsImport;
using Srims.Server.DataExchange.ExpertImport;
using Srims.Server.DataExchange.FinanceImport;

using Srims.Server.UI;
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Fund
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class FinanceWebService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Finances
                .GetFinances(Request.GetFinanceQueryInformation())
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void Search()
        {
            string keyWord = Request.GetString("query");
            Response.WriteXmlHead();
            Database
                .Finances
                .Search(keyWord)
                .Show(Response, FinanceExtension.ShowForSearch);
        }
        [WebMethod]
        public void Save()
        {
            var oldFinance = Request.GetOldFinance(Database, User);
            var finance = Request.GetFinance(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = Log.GetEditOperationDescription(oldFinance, finance, Finance.GetDescriptionItems(), finance.IsNew);
                Log.Write(User.Name, finance.IsNew ? (int)LogType.FinanceNew : (int)LogType.FinanceEdit, description, Request.UserHostAddress, finance.IsNew ? "添加经费到帐" : "编辑经费到帐", Database);

                finance.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetByID()
        {
            Response.WriteXmlHead();
            List<Finance> listFiance = new List<Finance>();
            listFiance.Add(Request.GetEntity(Database.Finances, "FinanceId"));
            listFiance.Show(Response, User, Database);

        }
        [WebMethod]
        public void Delete()
        {
            var finance = Request.GetEntity<Finance>(Database.Finances, "financeID");

            if (finance != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    string description = string.Format("删除经费到帐，凭单号为：{0}，描述为{1}。", finance.VoucherNumber, finance.Abstract);
                    Log.Write(User.Name, (int)LogType.AwardDelete, description, Request.UserHostAddress, "删除经费", Database);
                    finance.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void SaveInvoice()
        {
            var oldFinance = Request.GetOldFinance(Database, User);
            var finance = Request.GetFinanceWithInvoice(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                string description = string.Format("经费到帐开发票：\n 经费到帐凭单号为：{0}；\n经费到帐描述为：{1}；\n", finance.VoucherNumber, finance.Abstract) + Log.GetEditOperationDescription(oldFinance, finance, Finance.GetDescriptionItems(), finance.IsNew);
                Log.Write(User.Name, (int)LogType.FinanceInvoiceNew, description, Request.UserHostAddress, "经费到帐开发票", Database);

                finance.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void DeleteInvoice()
        {
            var finance = Request.GetEntity<Finance>(Database.Finances, "financeID");
            finance.InvoiceType = null;
            finance.InvoiceNumber = null;
            finance.IsInvoiced = false;
            finance.InvoiceTime = null;
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除凭单号为：{0}，描述为{1}的经费到帐的发票的信息。", finance.VoucherNumber, finance.Abstract);
                Log.Write(User.Name, (int)LogType.FinanceInvoiceDelete, description, Request.UserHostAddress, "删除经费到帐的发票信息", Database);

                finance.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void AutoImportFinance()
        {
            FinanceImporter.ImportFinance(Database);
        }
        [WebMethod]
        public void GetVouchers()
        {
            var finance = Request.GetEntity<Finance>(Database.Finances, "financeID");
            var fundDescends = finance.GetAllDescends(Database.FinanceFundDescends);
            var voucherList = new List<Voucher>();

            foreach (var fundDescend in fundDescends)
            {
                var financeFundDescend = fundDescend.GetSingleFinanceFundDescend(Database.FinanceFundDescends);
                voucherList = voucherList
                     .Union(financeFundDescend.GetVouchers(Database.Vouchers))
                     .ToList();
            }

            Response.WriteXmlHead();
            voucherList.Show(Response, User, Database, VoucherExtension.ShowVoucher);
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportArts(postedFiles[0], Request, User);


            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }

        [WebMethod]
        public void ImportFinance()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportFinance(postedFiles[0], Request, User);


            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }

    }
}
