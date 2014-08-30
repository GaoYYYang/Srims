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
    /// 通知
    /// </summary>
    public partial class Announcement
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

        private string _Title;
        private DateTime _DateTime;
        private string _UserName;
        private string _Content;
        private AnnouncementState _State;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置标题
        /// </summary>
        public string Title
        {
            get { return _Title; }
            set { _Title = value; }
        }
        /// <summary>
        /// 取得或设置时间
        /// </summary>
        public DateTime DateTime
        {
            get { return _DateTime; }
            set { _DateTime = value; }
        }
        /// <summary>
        /// 取得或设置发布人
        /// </summary>
        public string UserName
        {
            get { return _UserName; }
            set { _UserName = value; }
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
        /// 取得或设置状态
        /// </summary>
        public AnnouncementState State
        {
            get { return _State; }
            set { _State = value; }
        }

        #endregion
    }
}
