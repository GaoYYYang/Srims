using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Message
{
    /// <summary>
    /// 信息输出事件参数
    /// </summary>
    public class NewMessageEventArgs : EventArgs
    {
        private MesssageType _MessageType;
        private string _Message;

        /// <summary>
        /// 取得信息类型
        /// </summary>
        public MesssageType MessageType
        {
            get { return _MessageType; }
        }
        /// <summary>
        /// 取得信息内容
        /// </summary>
        public string Message
        {
            get { return _Message; }
        }

        /// <summary>
        /// 构造信息输出事件参数
        /// </summary>
        /// <param name="messageType">信息类型</param>
        /// <param name="message">信息内容</param>
        public NewMessageEventArgs(MesssageType messageType, string message)
        {
            this._MessageType = messageType;
            this._Message = message;
        }
    }
}
