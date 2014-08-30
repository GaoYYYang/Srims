using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using System.Data;

using Srims.Server.Business;
using Srims.Server.DataAccess;
using Srims.Server.Business.Users;
using Srims.Server.DataExchange;

namespace Srims.Server.DataExchange.OutsourcingImport
{
    /// <summary>
    /// 外协导入
    /// </summary>
    public static class OutsourcingImport
    {
        public static string ImportOutsourcing(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            string fileName = "OutsourcingTemp";
            postedFile.SaveUploadFile(httpContext, fileName);
            return "";
        }
        public static void MoveFile(this HttpContext httpContext, string outsourcingID)
        {
            string copyFileDirectory = "OutsourcingTemp";
            string fileName = "Outsourcing" + outsourcingID;
            FileUpLoadHelper.MoveDirectory(copyFileDirectory, httpContext, fileName);
        }
    }


    public static class OutsourcingImportExtension
    {
        public static string OutsourcingNameUpdate(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);
            string fileName = "OutsourcingNameUpdate";
            StringBuilder UpdateLog = new StringBuilder();
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);
            database = Database.New();
            int count = 0;
            int relation = 0;

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                string OldName = row[0].ToString().Trim();
                string NewName = row[1].ToString().Trim();
                if (NewName == "北京北方通泰科技有限公司")
                {
                    var a = 1;
                }
                if (NewName != null && NewName != "")
                {
                    try
                    {
                        var outsourcing = database.Outsourcings.SingleOrDefault(c => c.Name == NewName);
                        var voucherouts = database.VoucherOuts.Where(c => c.Corporation == OldName && c.Outsourcing == null).ToList();
                        foreach (var item in voucherouts)
                        {

                            item.Corporation = NewName;
                            UpdateLog.AppendFormat("外协单位：{0}更名为{1}", OldName, NewName);
                            count++;
                            if (outsourcing != null)
                            {
                                item.Outsourcing = outsourcing;
                                UpdateLog.Append(",并与数据库中已存在的外协公司产生关联!");
                                relation++;
                            }
                            UpdateLog.Append("。\n");
                            item.Save(database);


                        }
                    }
                    catch (Exception e)
                    {
                        writer.WriteLine(string.Format("导入发生错误，外协名称为{0}，错误信息为：{1}", OldName, e.Message));
                    }
                }
            }

            UpdateLog.AppendFormat("成功更新外协名称{0}条,", count);
            UpdateLog.AppendFormat("成功与数据库中外协单位建立关联{0}条。\n", relation);
            writer.WriteLine();
            writer.WriteLine("详细信息为：\n{0}", UpdateLog.ToString());
            writer.WriteLine();

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();
            return logName;
        }


        /// <summary>
        /// 判断字符串是否是null或者Empty
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        private static bool IsEmptyOrNull(this string s)
        {
            if (s == null)
                return true;

            return string.IsNullOrEmpty(s.Trim());
        }
    }


}
