using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Common;

namespace Srims.Server.DataExchange.DataAutoImport
{
    /// <summary>
    /// 经费到帐信息导入
    /// </summary>
    public class FinanceImporter
    {
        ///导入经费
        /// </summary>
        /// <param name="database"></param>
        public static void ImportFinance(IDatabase database)
        {
            List<EntityImport> financeList = new List<EntityImport>();
            financeList = getFinanceList(database);
            int count = 0, updateCount = 0;

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

                if (financeImport.ItemList[4].Value != null && financeImport.ItemList[4].Value != "")
                {
                    finance.Remarks = financeImport.ItemList[4].Value;
                    financeBak.Remarks = finance.Remarks;
                }
                else
                {
                    finance.Remarks = null;
                    financeBak.Remarks = finance.Remarks;
                }

                if (!database.FinanceBaks.IsFinanceExist(finance.VoucherNumber, finance.ReceivedDate, finance.Amount, finance.Abstract))
                {
                    financeBak.Save(database);

                    if (!database.Finances.IsFinanceExist(finance.VoucherNumber, finance.ReceivedDate, finance.Amount, finance.Abstract))
                    {
                        finance.Save(database);
                        Log.Write("系统", (int)LogType.FundAutoImport, string.Format("导入经费，凭单号为：{0}，金额为：{1}万元，到款日期为{2}，说明为：{3},备注为：{4}", finance.VoucherNumber, (float)finance.Amount / 100 / 10000, finance.ReceivedDate, finance.Abstract, finance.Remarks), string.Empty, "经费导入成功", database);
                        count++;
                    }
                }
                else
                {
                    var fianceBakForUpdate = database.FinanceBaks.GetFinanceBakForUpdate(finance.VoucherNumber, finance.ReceivedDate, finance.Amount, finance.Abstract);

                    if (fianceBakForUpdate != null && financeBak.Remarks != null && finance.Remarks != "" && (fianceBakForUpdate.Remarks == null || fianceBakForUpdate.Remarks == ""))
                    {

                        fianceBakForUpdate.Remarks = financeBak.Remarks;
                        fianceBakForUpdate.Save(database);



                        var financeForUpdate = database.Finances.GetFinanceForUpdate(finance.VoucherNumber, finance.ReceivedDate, finance.Amount, finance.Abstract);

                        if (financeForUpdate != null && finance.Remarks != null && finance.Remarks != "" && (financeForUpdate.Remarks == null || financeForUpdate.Remarks == ""))
                        {
                            financeForUpdate.Remarks = finance.Remarks;
                            financeForUpdate.Save(database);

                            Log.Write("系统", (int)LogType.FundAutoImport, string.Format("更新导入经费的备注，凭单号为：{0}，金额为：{1}万元，到款日期为{2}，说明为：{3},备注为：{4}", finance.VoucherNumber, (float)finance.Amount / 100 / 10000, finance.ReceivedDate, finance.Abstract, finance.Remarks), string.Empty, "更新导入经费备注成功", database);
                            updateCount++;
                        }
                    }


                }

            }
            Log.Write("系统", (int)LogType.FundAutoImport, (count > 0 ? string.Format("共导入{0}条经费信息", count) : "共导入0条财务经费信息。") + (updateCount > 0 ? string.Format("共更新{0}条经费的备注", updateCount) : "共更新0条财务经费的备注。"), string.Empty, "自动导入财务经费信息", database);
        }
        private static List<EntityImport> getFinanceList(IDatabase database)
        {
            List<EntityImport> financeList = new List<EntityImport>();

            financeList = XmlDocParse.parseXmlDocument(GetXmlDocFromWeb.LoadXMLDocument(database.SystemSettings.GetSystemSetting().FinanceWebAddress), "Finances");
            return financeList;
        }
    }
}

