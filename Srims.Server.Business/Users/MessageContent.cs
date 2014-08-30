using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 短消息内容
    /// </summary>
    public class MessageContent
    {
        private string _Title;
        private string _Content;

        /// <summary>
        /// 取得标题
        /// </summary>
        public string Title
        {
            get { return _Title; }
        }
        /// <summary>
        /// 取得内容
        /// </summary>
        public string Content
        {
            get { return _Content; }
        }
        /// <summary>
        /// 构造短消息内容
        /// </summary>
        /// <param name="title">标题</param>
        /// <param name="content">内容</param>
        public MessageContent(string title, string content)
        {
            _Title = title;
            _Content = content;
        }
    }
}