using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

namespace Srims.Tools.DataUpdate
{
    /// <summary>
    /// 数据库更新器接口
    /// </summary>
    public interface IUpdater
    {
        /// <summary>
        /// 更新数据
        /// </summary>
        void Update();

        /// <summary>
        /// 设置或取得数据库连接字符串
        /// </summary>
        string ConnectionString { get; set; }

        /// <summary>
        /// 有信息产生时触发此事件。
        /// </summary>
        event EventHandler<NewMessageEventArgs> NewMessage;
    }
}
