using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 短消息
    /// </summary>
    public partial class Message
    {
        #region ID和时间戳

        private int _ID = NEW_ENTITY_ID;
        private byte[] _TimeStamp = new byte[] { };

        /// <summary>
        /// 取得ID
        /// </summary>
        public override int ID
        {
            get { return _ID; }
        }
        /// <summary>
        /// 取得时间戳
        /// </summary>
        public override byte[] TimeStamp
        {
            get { return _TimeStamp; }
        }

        #endregion

        #region 成员

        private int? _SenderID;
        private EntityRef<User> _Sender;
        private int _ReceiverID;
        private EntityRef<User> _Receiver;
        private string _Title;
        private string _Content;
        private DateTime _DateTime;
        private bool _IsRead;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应发送人的ID
        /// </summary>
        public int? SenderID
        {
            get { return _SenderID; }
        }
        /// <summary>
        /// 取得对应的发送人
        /// </summary>
        public User Sender
        {
            get { return _Sender.Entity; }
            set
            {
                _Sender.Entity = value;
                _SenderID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应收信人的ID
        /// </summary>
        public int ReceiverID
        {
            get { return _ReceiverID; }
        }
        /// <summary>
        /// 取得对应的收信人
        /// </summary>
        public User Receiver
        {
            get { return _Receiver.Entity; }
            set
            {
                _Receiver.Entity = value;
                _ReceiverID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置标题
        /// </summary>
        public string Title
        {
            get { return _Title; }
            set { _Title = value; }
        }
        /// <summary>
        /// 取得或设置内容
        /// </summary>
        public string Content
        {
            get { return _Content; }
            set { _Content = value; }
        }
        /// <summary>
        /// 取得或设置发送时间
        /// </summary>
        public DateTime DateTime
        {
            get { return _DateTime; }
            set { _DateTime = value; }
        }
        /// <summary>
        /// 取得或设置是否已读
        /// </summary>
        public bool IsRead
        {
            get { return _IsRead; }
            set { _IsRead = value; }
        }

        #endregion
    }
}
