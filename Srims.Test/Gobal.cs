using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Test
{
    /// <summary>
    /// 全局信息
    /// </summary>
    public class Global
    {
        /// <summary>
        /// 解决方案的绝对路径
        /// </summary>
        public const string SolutionPath = @"..\..\..";
        /// <summary>
        /// 发布目录的父路径
        /// </summary>
        public const string ReleaseBasePath = @"..\..\..\..\..\Release";
        /// <summary>
        /// 实体Xml
        /// </summary>
        public const string EntityXmlFileName = SolutionPath + @"\Srims.Test\Entity.xml";
        /// <summary>
        /// 数据库映射文件
        /// </summary>
        public const string LingMappingFile = SolutionPath + @"\Srims.Server.DataAccess\MappingSource.Xml";
        /// <summary>
        /// 上传文件目录
        /// </summary>
        public const string SrimsDocumentPath = SolutionPath + @"\Srims.WebSite\SrimsDocument\";
        ///// <summary>
        ///// 原数据库连接字符串
        ///// </summary>
        public const string OldDatabaseConnectionString = @"server=localhost\SQL2005;database=SrimsV5;uid=sa;pwd=pwd;Integrated Security=false;";
        ///// <summary>
        /// 数据库连接字符串
        /// </summary>
        public const string DatabaseConnectionString = @"server=222.195.149.106\SQL2005;database=SrimsV5PerformanceImport;uid=sa;pwd=pwd;Integrated Security=false;";
    }
}
