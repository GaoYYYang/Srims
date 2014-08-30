using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Data;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Reflection;
using System.IO;
using System.Web;
using Microsoft.Office.Interop.Excel;

namespace Srims.Server.DataExchange
{
    /// <summary>
    /// 文件上传帮助
    /// </summary>
    public static class FileUpLoadHelper
    {
        /// <summary>
        /// 上传文档保存路径
        /// </summary> 
        public const string POSTED_FILE_ROOT_DIRECTORY = @"/SrimsDocument\";
        /// <summary>
        /// 从EXCEL中获取数据(放入dataset中)
        /// </summary>
        /// <param name="postedFile"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static DataSet GetDataFromUploadFile(this HttpPostedFile postedFile, HttpContext context, string tableName)
        {
            string directory = context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            string filename = postedFile.FileName;
            //将文件上传至服务器
            postedFile.SaveAs(context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY) + filename);

            string conn = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY) + filename + ";Extended Properties='Excel 8.0;HDR=YES;IMEX=1'";

            // string workSheetName = GetExcelWorkSheet(context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY) + filename);
            string sqlin = "SELECT * FROM [" + "Sheet1" + "$]";
            OleDbCommand oleCommand = new OleDbCommand(sqlin, new OleDbConnection(conn));
            OleDbDataAdapter adapterIn = new OleDbDataAdapter(oleCommand);
            DataSet dsIn = new DataSet();
            adapterIn.Fill(dsIn, tableName);

            return dsIn;
        }

        public static void SaveUploadFile(this HttpPostedFile postedFile, HttpContext context, string fileDirectoryName)
        {
            string directory = context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY + "\\" + fileDirectoryName);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            string filename = postedFile.FileName;
            //将文件上传至服务器
            postedFile.SaveAs(context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY + "\\" + fileDirectoryName) + "\\" + filename);
        }
        public static void MoveDirectory(string copyFileDirectory, HttpContext context, string fileDirectoryName)
        {
            string directory = context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY + "\\" + copyFileDirectory);
            if (!Directory.Exists(directory))
                return;
            string desDirectory = context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY + "\\" + fileDirectoryName);
            if (!Directory.Exists(desDirectory))
                Directory.CreateDirectory(directory);
            Directory.Move(directory, desDirectory);
            if (Directory.Exists(directory))
                Directory.Delete(directory);

        }
        // 返回给定路径 Excel文件的workSheet名字  
        private static string GetExcelWorkSheet(string filePath)
        {
            Microsoft.Office.Interop.Excel.ApplicationClass myExcel = new ApplicationClass();
            string xlName;

            //'得到worksheet名字   
            myExcel.Workbooks.Open(filePath, Missing.Value, false, Missing.Value, null, null, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);
            Microsoft.Office.Interop.Excel.Sheets mySh = myExcel.Sheets;
            Microsoft.Office.Interop.Excel.Worksheet myWs = (Microsoft.Office.Interop.Excel.Worksheet)mySh.get_Item(1);
            xlName = myWs.Name;

            //'关闭excel处理   
            myExcel.Workbooks.Close();
            myExcel.Quit();
            System.Runtime.InteropServices.Marshal.ReleaseComObject(myExcel);
            System.Runtime.InteropServices.Marshal.ReleaseComObject(mySh);
            System.Runtime.InteropServices.Marshal.ReleaseComObject(myWs);
            mySh = null;
            myWs = null;
            myExcel = null;
            GC.Collect();
            //'返回名字字符串   
            return xlName;
        }
        /// <summary>
        /// 删除上传的文件
        /// </summary>
        /// <param name="page"></param>
        /// <param name="filename"></param>
        public static void DeleteFile(this HttpContext context, string filename)
        {
            FileInfo file = new FileInfo(context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY) + filename);
            if (file.Exists)
                file.Delete();
        }
    }
}

