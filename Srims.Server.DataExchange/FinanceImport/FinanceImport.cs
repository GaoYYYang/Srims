using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;
using System.Threading;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Type;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

using Srims.Server.DataAccess;


namespace Srims.Server.DataExchange.FinanceImport
{
    public static class FinanceImport
    {
        
        /// <summary>
        /// 导入暂存数据
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string ImportFinance(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {

            IDatabase database = Database.New();
            string logName = "FinanceImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();

            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Finance";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            int count = 0, updateCount = 0;
            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                FinanceBak financeBak = new FinanceBak();
                Finance finance = new Finance();

                string date =  row[0].ToString().Trim();
                string dateString = date.ToString().Substring(0, 4) + "/" + date.ToString().Substring(4, 2) + "/" + date.ToString().Substring(6, 2);
                DateTime dateTime = new DateTime();
                if (!DateTime.TryParse(dateString, out dateTime))
                    continue;

                finance.ReceivedDate = Convert.ToDateTime(dateString);
                financeBak.ReceivedDate = finance.ReceivedDate;

                finance.Abstract =  row[3].ToString().Trim();
                financeBak.Abstract = finance.Abstract;

                if (string.IsNullOrEmpty( row[2].ToString().Trim()))
                    continue;

                finance.VoucherNumber =  row[2].ToString().Trim();
                financeBak.VoucherNumber = finance.VoucherNumber;

                if (string.IsNullOrEmpty( row[10].ToString().Trim()) || (!string.IsNullOrEmpty( row[10].ToString().Trim()) && Convert.ToInt64(Convert.ToDecimal( row[10].ToString().Trim()) * 100) <= 0))
                    continue;

                finance.Amount = Convert.ToInt64(Convert.ToDecimal( row[10].ToString().Trim()) * 100);
                financeBak.Amount = finance.Amount;
                finance.IsInvoiced = false;

                //暂存备注
                //if ( row[4].ToString().Trim() != null &&  row[4].ToString().Trim() != "")
                //{
                //    finance.Remarks =  row[4].ToString().Trim();
                //    financeBak.Remarks = finance.Remarks;
                //}
                //else
                //{
                //    finance.Remarks = null;
                //    financeBak.Remarks = finance.Remarks;
                //}

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


            

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
      
       
    }

}
