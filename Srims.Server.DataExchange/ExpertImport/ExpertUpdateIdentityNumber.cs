using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.ExpertUpdate
{
    public static class ExpertUpdateIdentityNumber
    {
        /// <summary>
        /// 导入专家
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string UpdateExpertIdentityNumber(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ExpertUpdateLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();

            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Expert";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder ExpertImportLog = new StringBuilder();
            StringBuilder ExpertImportId = new StringBuilder();
            StringBuilder ExpertUpdateLog = new StringBuilder();
            StringBuilder ExpertDepartmentNotMatchLog = new StringBuilder();
            StringBuilder ExpertNumberAndNameNotMatchLog = new StringBuilder();

           
            int updateExpertCount = 0;//更新专家个数

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                database = Database.New();

                string expertNumber = row[5].ToString().Trim();
                
                string idNumber = row[13].ToString().Trim();

                try
                {
                    var  experts = database.Experts.Where(c => c.Number == expertNumber).ToList();
                    foreach (var expert in experts)
                    {
                        expert.IDCardNumber = idNumber;
                        expert.Save(database);
                        
                    }
                    updateExpertCount++;

                }

                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入专家发生错误，错误信息为：{0}",  e.Message));
                }
            }
            ExpertImportLog.AppendFormat("成功更新专家{0}位\n", updateExpertCount );


        

            writer.WriteLine("成功更新专家{0}位\n",  updateExpertCount);
            writer.WriteLine();
            writer.WriteLine();
            
            writer.WriteLine();
            writer.WriteLine();
           


            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}