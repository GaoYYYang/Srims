using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 事件
    /// </summary>
    public partial class Event
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

        private Guid _Guid;
        private EventType _Type;
        private string _Parameter;
        private string _CreateUser;
        private DateTime _CreateDateTime;
        private bool _IsComplete;
        private string _CompleteUser;
        private DateTime? _CompleteDateTime;
        private string _Description;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置Guid
        /// </summary>
        public Guid Guid
        {
            get { return _Guid; }
            set { _Guid = value; }
        }
        /// <summary>
        /// 取得或设置类型
        /// </summary>
        public EventType Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置参数
        /// </summary>
        public string Parameter
        {
            get { return _Parameter; }
            set { _Parameter = value; }
        }
        /// <summary>
        /// 取得或设置创建用户
        /// </summary>
        public string CreateUser
        {
            get { return _CreateUser; }
            set { _CreateUser = value; }
        }
        /// <summary>
        /// 取得或设置创建时间
        /// </summary>
        public DateTime CreateDateTime
        {
            get { return _CreateDateTime; }
            set { _CreateDateTime = value; }
        }
        /// <summary>
        /// 取得或设置是否已完成
        /// </summary>
        public bool IsComplete
        {
            get { return _IsComplete; }
            set { _IsComplete = value; }
        }
        /// <summary>
        /// 取得或设置完成用户
        /// </summary>
        public string CompleteUser
        {
            get { return _CompleteUser; }
            set { _CompleteUser = value; }
        }
        /// <summary>
        /// 取得或设置完成时间
        /// </summary>
        public DateTime? CompleteDateTime
        {
            get { return _CompleteDateTime; }
            set { _CompleteDateTime = value; }
        }
        /// <summary>
        /// 取得或设置描述
        /// </summary>
        public string Description
        {
            get { return _Description; }
            set { _Description = value; }
        }

        #endregion
    }
}
