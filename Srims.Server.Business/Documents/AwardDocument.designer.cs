using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Awards;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 奖励文档
    /// </summary>
    public partial class AwardDocument
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

        private string _Name;
        private int _AwardID;
        private EntityRef<Award> _Award;
        private int _AuthorID;
        private EntityRef<User> _Author;
        private DateTime? _SubmitDateTime;
        private CensorState _State;
        private string _Censor;
        private DateTime? _CensorDateTime;
        private Guid _Resource;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置文档名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得对应对应奖励的ID
        /// </summary>
        public int AwardID
        {
            get { return _AwardID; }
        }
        /// <summary>
        /// 取得对应的对应奖励
        /// </summary>
        public Award Award
        {
            get { return _Award.Entity; }
            set
            {
                _Award.Entity = value;
                _AwardID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应提交人的ID
        /// </summary>
        public int AuthorID
        {
            get { return _AuthorID; }
        }
        /// <summary>
        /// 取得对应的提交人
        /// </summary>
        public User Author
        {
            get { return _Author.Entity; }
            set
            {
                _Author.Entity = value;
                _AuthorID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置提交日期
        /// </summary>
        public DateTime? SubmitDateTime
        {
            get { return _SubmitDateTime; }
            set { _SubmitDateTime = value; }
        }
        /// <summary>
        /// 取得或设置审核状态
        /// </summary>
        public CensorState State
        {
            get { return _State; }
            set { _State = value; }
        }
        /// <summary>
        /// 取得或设置审核日期
        /// </summary>
        public DateTime? CensorDateTime
        {
            get { return _CensorDateTime; }
            set { _CensorDateTime = value; }
        }
        /// <summary>
        /// 取得或设置奖励文档资源
        /// </summary>
        public Guid Resource
        {
            get { return _Resource; }
            set { _Resource = value; }
        }

        #endregion
    }
}
