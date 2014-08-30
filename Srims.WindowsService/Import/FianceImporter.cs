using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Common;


namespace Srims.WindowsService.Import
{
    public class FianceImporter
    {
        /// <summary>
        ///导入经费
        /// </summary>
        /// <param name="database"></param>
        public static void ImportFinance(IDatabase database)
        {
            List<EntityImport> financeList = new List<EntityImport>();
            financeList = getFinanceList(database);
            int count = 0;

            foreach (var financeImport in financeList)
            {
                FinanceBak financeBak = new FinanceBak();
                Finance finance = new Finance();

                string date = financeImport.ItemList[0].Value;
                string dateString = date.ToString().Substring(0, 4) + "/" + date.ToString().Substring(4, 2) + "/" + date.ToString().Substring(6, 2);
                DateTime dateTime = new DateTime();
                if (!DateTime.TryParse(dateString, out dateTime))
                    continue;

                finance.ReceivedDate = Convert.ToDateTime(dateString);
                financeBak.ReceivedDate = finance.ReceivedDate;

                finance.Abstract = financeImport.ItemList[3].Value;
                financeBak.Abstract = finance.Abstract;

                if (string.IsNullOrEmpty(financeImport.ItemList[1].Value))
                    continue;

                finance.VoucherNumber = financeImport.ItemList[1].Value;
                financeBak.VoucherNumber = finance.VoucherNumber;

                if (string.IsNullOrEmpty(financeImport.ItemList[2].Value) || (!string.IsNullOrEmpty(financeImport.ItemList[2].Value) && Convert.ToInt64(Convert.ToDecimal(financeImport.ItemList[2].Value) * 100) <= 0))
                    continue;

                finance.Amount = Convert.ToInt64(Convert.ToDecimal(financeImport.ItemList[2].Value) * 100);
                financeBak.Amount = finance.Amount;
                finance.IsInvoiced = false;

                if (!database.FinanceBaks.IsFinanceExist(finance.VoucherNumber, finance.ReceivedDate, finance.Amount, finance.Abstract))
                {
                    financeBak.Save(database);

                    if (!database.Finances.IsFinanceExist(finance.VoucherNumber, finance.ReceivedDate, finance.Amount, finance.Abstract))
                    {
                        finance.Save(database);
                        // Log.Write("系统", (int)LogFund.FundAutoImport, string.Format("导入经费，凭单号为：{0}，金额为：{1}万元，到款日期为{2}，说明为：{3}", finance.VoucherNumber, (float)finance.Amount / 100 / 10000, finance.ReceivedDate, finance.Abstract), "经费导入成功", database);
                        count++;
                    }
                }
            }
            // Log.Write("系统", (int)LogFund.FundAutoImport, count > 0 ? string.Format("共导入{0}条经费信息", count) : "共导入0条财务经费信息", "自动导入财务经费信息", database);
        }
        private static List<EntityImport> getFinanceList(IDatabase database)
        {
            List<EntityImport> financeList = new List<EntityImport>();
            financeList = XmlDocParse.parseXmlDocument(GetXmlDocFromWeb.LoadXMLDocument(database.SystemSettings.GetSystemSetting().FinanceWebAddress), "Finances");
            return financeList;
        }
    }
}

