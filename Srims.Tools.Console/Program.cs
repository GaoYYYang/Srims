using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.DataAccess;

using Srims.Tools.DataImport;
using Srims.Tools.DataUpdate;

namespace Srims.DatabaseTools
{
    /// <summary>
    /// 主程序
    /// </summary>
    public class Program
    {
        private const string IMPORT_DATA_ARG = "im";
        private const string UPDATE_DATA_ARG = "u";
        private const string SET_EXERPT_PASSWORD_TO_EXPERT_NUMBER_ARG = "s";

        private const string LOG_FILE_NAME = "Log.txt";
        private const string WARNING_LOG_FILE_NAME = "WarningLog.txt";
        private const string ERROR_LOG_FILE_NAME = "ErrorLog.txt";

        private static string _OldDatabaseConnectionString = ConfigurationManager.ConnectionStrings["OldDatabaseConnectionString"].ConnectionString;
        private static string _NewDatabaseConnectionString = ConfigurationManager.ConnectionStrings["NewDatabaseConnectionString"].ConnectionString;
        private static string _ResourceOutputDirectory = ConfigurationManager.AppSettings["ResourceOutputDirectory"];

        private static bool _IsImportData;
        private static bool _IsUpdateData;
        private static bool _IsSetExpertPasswordToExpertNumber;
        private static StreamWriter _LogFileWriter;
        private static StreamWriter _WarningLogFileWriter;
        private static StreamWriter _ErrorLogFileWriter;

        /// <summary>
        /// 程序入口
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            //判断参数
            foreach (var arg in args)
            {
                string argValue = arg.Replace("-", String.Empty);

                if (argValue.Equals(IMPORT_DATA_ARG))
                    _IsImportData = true;
                else if (argValue.Equals(UPDATE_DATA_ARG))
                    _IsUpdateData = true;
                else if (argValue.Equals(SET_EXERPT_PASSWORD_TO_EXPERT_NUMBER_ARG))
                    _IsSetExpertPasswordToExpertNumber = true;
            }
            if (!(_IsImportData || _IsUpdateData || _IsSetExpertPasswordToExpertNumber))
            {
                showHelp();
                return;
            }

            //确认操作
            if (confirmAction())
                Console.WriteLine();
            else
                return;

            //执行操作
            try
            {
                DateTime beginTime = DateTime.Now;

                if (File.Exists(LOG_FILE_NAME)) File.Delete(LOG_FILE_NAME);
                if (File.Exists(WARNING_LOG_FILE_NAME)) File.Delete(WARNING_LOG_FILE_NAME);
                if (File.Exists(ERROR_LOG_FILE_NAME)) File.Delete(ERROR_LOG_FILE_NAME);
                _LogFileWriter = File.CreateText(LOG_FILE_NAME);
                _WarningLogFileWriter = File.CreateText(WARNING_LOG_FILE_NAME);
                _ErrorLogFileWriter = File.CreateText(ERROR_LOG_FILE_NAME);

                if (_IsImportData) importData();
                if (_IsUpdateData) updateData();
                if (_IsSetExpertPasswordToExpertNumber) setExpertPasswordToExpertNumber();

                TimeSpan costTime = DateTime.Now - beginTime;
                onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, String.Format("所有操作完成,共用时:{0}.", costTime)));
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                if (_LogFileWriter != null)
                    _LogFileWriter.WriteLine(e.ToString());
            }
            finally
            {
                if (_LogFileWriter != null) _LogFileWriter.Close();
                if (_WarningLogFileWriter != null) _WarningLogFileWriter.Close();
                if (_ErrorLogFileWriter != null) _ErrorLogFileWriter.Close();
            }

        }

        private static bool confirmAction()
        {
            Console.WriteLine("源数据库的连接字符串为:" + _OldDatabaseConnectionString);
            Console.WriteLine("目标数据库的连接字符串为:" + _NewDatabaseConnectionString);
            Console.WriteLine("确定操作?(Y:确定,N:取消)");

            Char key = '?';
            while (key != 'Y' && key != 'N')
                key = Char.ToUpper(Console.ReadKey().KeyChar);

            return key == 'Y';
        }
        private static void showHelp()
        {
            Console.Write(@"
Usage: 
    Strims.DatabaseTools.exe [-in] [-s] [-u]

Args:
    -im: Import data to the new database from old database.
    -u: Update data for the new database.
    -s: Set all expert's password to his number.

No args to show this screen.
Database connection and file path infromation is defined in the .config file.
All information will be logged into LOG.TXT.
");
        }

        private static void importData()
        {
            ImportManager importManager = new ImportManager(_OldDatabaseConnectionString, _NewDatabaseConnectionString);
            importManager.NewMessage += new EventHandler<NewMessageEventArgs>(onNewMessage);

            DateTime beginTime = DateTime.Now;

            importManager.Clear();
            importManager.Import();

            TimeSpan costTime = DateTime.Now - beginTime;
            onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, String.Format("数据导入完成,共用时:{0}.", costTime)));
        }
        private static void updateData()
        {
            DateTime beginTime = DateTime.Now;

            UpdaterManager updaterManager = new UpdaterManager(_NewDatabaseConnectionString, _ResourceOutputDirectory);
            updaterManager.NewMessage += new EventHandler<NewMessageEventArgs>(onNewMessage);
            updaterManager.Update();

            TimeSpan costTime = DateTime.Now - beginTime;
            onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, String.Format("更新数据完成,共用时:{0}.", costTime)));
        }
        private static void setExpertPasswordToExpertNumber()
        {
            DateTime beginTime = DateTime.Now;

            onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, "将所有专家的密码设置为其工作证号。"));
            Database database = Database.New(_NewDatabaseConnectionString);
            foreach (var expert in database.Experts)
            {
                onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, String.Format("设置专家：{0}({1})", expert.Name, expert.Number)));
                expert.User.Password = expert.Number;
                database.SubmitChanges();
            }
            onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, "设置完成。"));

            TimeSpan costTime = DateTime.Now - beginTime;
            onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, String.Format("将所有专家的密码设置为其工作证号完成,共用时:{0}.", costTime)));
        }

        private static void onNewMessage(object sender, NewMessageEventArgs e)
        {
            string message = String.Format("{0} {1}:{2}", DateTime.Now, e.MessageType, e.Message);
            Console.WriteLine(message);

            _LogFileWriter.WriteLine(message);
            if (e.MessageType == MesssageType.Warning)
                _WarningLogFileWriter.WriteLine(message);
            if (e.MessageType == MesssageType.Error)
                _ErrorLogFileWriter.WriteLine(message);

            _LogFileWriter.Flush();
            _WarningLogFileWriter.Flush();
            _ErrorLogFileWriter.Flush();
        }
    }
}
