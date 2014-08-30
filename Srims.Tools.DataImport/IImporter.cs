using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

namespace Srims.Tools.DataImport
{
    /// <summary>
    /// 数据导入器接口
    /// </summary>
    public interface IImporter
    {
        /// <summary>
        /// 清空数据
        /// </summary>
        void Clear();
        /// <summary>
        /// 导入数据
        /// </summary>
        void Import();

        /// <summary>
        /// 设置或取得旧数据库连接字符串
        /// </summary>
        string NewDatabaseConnectionString { get; set; }
        /// <summary>
        /// 设置或取得新数据库连接字符串
        /// </summary>
        string OldDatabaseConnectionString { get; set; }

        /// <summary>
        /// 有信息产生时触发此事件。
        /// </summary>
        event EventHandler<NewMessageEventArgs> NewMessage;
    }
}
