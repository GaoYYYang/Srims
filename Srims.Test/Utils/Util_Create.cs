using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;

using MIS.Common;
using MIS.Common.Message;

using MIS.Util.Data;
using MIS.Util.Data.DatabaseScriptGenerater;
using MIS.Util.Data.EntityPrase;
using MIS.Util.Data.LinqGenerater;
using MIS.Util.Deploy;

namespace Srims.Test.Utils
{
    /// <summary>
    /// 构造工具
    /// </summary>
    [TestClass]
    public class Util_Create
    {
        private const string LINQ_MAPPING_FILE_NAMESPACE = @"http://schemas.microsoft.com/linqtosql/mapping/2007";

        /// <summary>
        /// 构造实体代码
        /// </summary>
        [TestMethod, Description("构造实体代码")]
        public void Util_CreateEntityCodes()
        {
            var entities = getEntities();
            var baseSpace = "Srims.Server.Business";
            var path = Global.SolutionPath + @"/Srims.Server.Business";
            var usingNameSpace = new string[] { 
                "MIS.Common", 
                "MIS.Common.Validate", 
                "MIS.Common.Query" 
            };

            new LinqEntityCodeGenerater().Generate(path, baseSpace, entities, usingNameSpace, false);
        }
        ///<summary>
        /// 构造建库脚本
        /// </summary>
        [TestMethod, Description("构造建库脚本")]
        public void Util_CreateDatabaseScript()
        {
            var entities = getEntities();
            string sqlText = MsSqlServerScriptBuilder.GetSqlScript(entities);
            string sqlScript = GetSqlStript();

            Debug.WriteLine("");
            Debug.WriteLine("The following is the database creating script:");
            Debug.WriteLine("=============================彪悍的分割线==============================================================================");
            Debug.WriteLine("");
            Debug.WriteLine("");
            Debug.WriteLine(sqlText);
            Debug.WriteLine("");
            Debug.WriteLine(sqlScript);
            Debug.WriteLine("");
            Debug.WriteLine("");
            Debug.WriteLine("=============================又见彪悍的分割线==========================================================================");
        }
        ///<summary>
        /// 构造附加数据库脚本
        /// </summary>
        [TestMethod, Description("构造附加数据库脚本")]
        public void Util_CreateAdditionalDatabaseScript()
        {
            string sqlScript = GetSqlStript();

            Debug.WriteLine("");
            Debug.WriteLine("The following is the additional database creating script:");
            Debug.WriteLine("=============================彪悍的分割线==============================================================================");
            Debug.WriteLine("");
            Debug.WriteLine("");
            Debug.WriteLine(sqlScript);
            Debug.WriteLine("");
            Debug.WriteLine("");
            Debug.WriteLine("=============================又见彪悍的分割线==========================================================================");
        }

        private Entity[] getEntities()
        {
            XmlDocument document = new XmlDocument();
            document.Load(Global.EntityXmlFileName);
            return EntityXmlParser.ParseXml(document);
        }
        public static string GetSqlStript()
        {
            var sqlScriptPath = Global.SolutionPath + @"\Srims.Test\SqlScript";

            var fileNames = Directory
                .GetFiles(sqlScriptPath)
                .OrderBy(f => f)
                .ToArray();

            var sb = new StringBuilder();
            for (int i = 0; i < fileNames.Length; i++)
                sb.AppendLine(File.ReadAllText(fileNames[i], Encoding.GetEncoding("GB2312")));

            return sb.ToString();
        }
    }
}
