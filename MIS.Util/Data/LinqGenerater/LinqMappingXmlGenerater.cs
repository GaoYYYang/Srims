using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Xml.Linq;

namespace MIS.Util.Data.LinqGenerater
{
    /// <summary>
    /// 用于生成Linq的外部映射文件
    /// </summary>
    public class LinqMappingXmlGenerater
    {
        private const string COMMAND_LINE_SHELL_NAME = "cmd";
        private const string WORK_DIRECTORY = @"C:\Program Files\Microsoft SDKs\Windows\v6.0A\Bin";
        private const string COMMAND_LINE_EXIT_COMMAND = "exit";
        private const string LINQ_MAPPING_FILE_NAMESPACE = @"http://schemas.microsoft.com/linqtosql/mapping/2007";

        private string userName;
        private string password;
        private string connectionString;

        /// <summary>
        /// 用于生成Linq的外部映射文件
        /// </summary>
        /// <param name="userName">执行该构造的系统用户名，通常指定为该机器的管理员（Administrator）</param>
        /// <param name="password">对应用户的密码</param>
        /// <param name="connectionString">数据库的连接字符串</param>
        public LinqMappingXmlGenerater(string userName, string password, string connectionString)
        {
            this.userName = userName;
            this.password = password;
            this.connectionString = connectionString;
        }

        /// <summary>
        /// 构造Xml映射文件
        /// </summary>
        /// <param name="typeList">要被构造的类型集合。</param>
        /// <param name="outputFileName">生成文件保存的路径及文件名</param>
        public void BuildMappingXml(Type[] typeList, string outputFileName)
        {
            if (typeList == null || typeList.Length == 0) return;

            string tempFileName = Path.GetTempFileName();
            callSqlMetal(tempFileName, typeList[0].Namespace);
            processMappingXml(typeList, tempFileName, outputFileName);
        }
        private Process getProcess()
        {
            Process process = new Process();
            process.StartInfo.FileName = COMMAND_LINE_SHELL_NAME;
            process.StartInfo.RedirectStandardOutput = false;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.WorkingDirectory = WORK_DIRECTORY;

            //在Server系统中，需要取消以下注释
            process.StartInfo.UserName = userName;
            SecureString pwd = new System.Security.SecureString();
            foreach (var c in password.ToCharArray()) pwd.AppendChar(c);
            process.StartInfo.Password = pwd;

            process.Start();

            return process;
        }
        private void callSqlMetal(string tempFileName, string nameSpace)
        {
            Process process = getProcess();
            string sqlMetalCommandText = String.Format(
                "SqlMetal /conn:\"{0}\" /map:\"{1}\" /namespace:{2} /code:\"{3}\"",
                connectionString.Replace('"', '\''),
                tempFileName,
                nameSpace,
                Path.GetTempFileName()
            );
            process.StandardInput.WriteLine(sqlMetalCommandText);

            process.StandardInput.WriteLine(@COMMAND_LINE_EXIT_COMMAND);
            process.WaitForExit();
            if (!process.HasExited) process.Kill();
        }

        private void processMappingXml(Type[] typeList, string tempFileName, string outputFileName)
        {
            XDocument xDocument = XDocument.Load(tempFileName);
            var typeNameList = from t in typeList
                               select t.Name;

            xDocument.Descendants()
                .Where(node => node.Name == getXmlNodeName("Table") && !typeNameList.Contains(node.Attribute("Member").Value))
                .Remove();

            foreach (var node in xDocument.Descendants().Where(n => n.Name == getXmlNodeName("Association") && n.Attribute("IsForeignKey") != null && n.Attribute("IsForeignKey").Value == "true"))
            {
                string value = node.Attribute("ThisKey").Value;
                value = value.Substring(0, value.Length - 2);

                node.Attribute("Member").Value = value;
                node.Attribute("Storage").Value = "_" + value;
            }

            foreach (var type in typeList)
            {
                var tableNode = xDocument.Descendants().SingleOrDefault(n => n.Name == getXmlNodeName("Table") && n.Attribute("Member").Value == type.Name);
                if (tableNode == null) continue;

                var typeNode = tableNode.Descendants().SingleOrDefault(n => n.Name == getXmlNodeName("Type"));
                typeNode.Attribute("Name").Value = type.FullName;
            }

            xDocument.Save(outputFileName);
        }
        private XName getXmlNodeName(string nodeName)
        {
            return "{" + LINQ_MAPPING_FILE_NAMESPACE + "}" + nodeName;
        }
    }
}
