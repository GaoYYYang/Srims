using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Win32;

using Srims.Server.Business;
using Srims.Server.DataAccess;

namespace Srims.WindowsService
{
    /// <summary>
    /// 取得数据库
    /// </summary>
    public class GetDataBase
    {
        private const string RegPath = @"SOFTWARE\SrimsV5DatabaseConnectionString";
        private const string ConnectionStringKey = "connectionString";
        /// <summary>
        /// 取得数据库
        /// </summary>
        /// <returns></returns>
        public static Database GetNewDataBase()
        {
            string connectionString = getConnectionString();
            Database database = Database.New(connectionString);
            return database;
        }
        private static string getConnectionString()
        {
            return Registry
                   .LocalMachine
                   .OpenSubKey(RegPath)
                   .GetValue(ConnectionStringKey)
                   .ToString();
        }
    }
}
