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
    /// 日志
    /// </summary>
    public partial class Log
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

        private DateTime _DateTime;
        private string _User;
        private string _UserIP;
        private string _Action;
        private string _Description;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置时间
        /// </summary>
        public DateTime DateTime
        {
            get { return _DateTime; }
            set { _DateTime = value; }
        }
        /// <summary>
        /// 取得或设置用户
        /// </summary>
        public string User
        {
            get { return _User; }
            set { _User = value; }
        }
        /// <summary>
        /// 取得或设置用户IP
        /// </summary>
        public string UserIP
        {
            get { return _UserIP; }
            set { _UserIP = value; }
        }
        /// <summary>
        /// 取得或设置操作
        /// </summary>
        public string Action
        {
            get { return _Action; }
            set { _Action = value; }
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
