using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印申请
    /// </summary>
    public partial class StampApplication
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

        private int? _StampApplicationTypeID;
        private EntityRef<StampApplicationType> _StampApplicationType;
        private int? _StampStuffFromID;
        private EntityRef<Project> _StampStuffFrom;
        private string _StampStuffFromName;
        private int _StuffNumber;
        private string _StampReason;
        private string _KeyWord;
        private string _Manager;
        private string _ManagerPhone;
        private string _ManagerEmail;
        private int _PrincipalID;
        private EntityRef<Expert> _Principal;
        private bool _IsDuplexPrint;
        private bool _SealPerforation;
        private bool _ExpertPrint;
        private int? _CurrentStateID;
        private EntityRef<StampStateHistory> _CurrentState;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应文印申请类型的ID
        /// </summary>
        public int? StampApplicationTypeID
        {
            get { return _StampApplicationTypeID; }
        }
        /// <summary>
        /// 取得对应的文印申请类型
        /// </summary>
        public StampApplicationType StampApplicationType
        {
            get { return _StampApplicationType.Entity; }
            set
            {
                _StampApplicationType.Entity = value;
                _StampApplicationTypeID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应用印材料来源的ID
        /// </summary>
        public int? StampStuffFromID
        {
            get { return _StampStuffFromID; }
        }
        /// <summary>
        /// 取得对应的用印材料来源
        /// </summary>
        public Project StampStuffFrom
        {
            get { return _StampStuffFrom.Entity; }
            set
            {
                _StampStuffFrom.Entity = value;
                _StampStuffFromID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置用印材料来源名称
        /// </summary>
        public string StampStuffFromName
        {
            get { return _StampStuffFromName; }
            set { _StampStuffFromName = value; }
        }
        /// <summary>
        /// 取得或设置用印材料份数
        /// </summary>
        public int StuffNumber
        {
            get { return _StuffNumber; }
            set { _StuffNumber = value; }
        }
        /// <summary>
        /// 取得或设置盖章事由
        /// </summary>
        public string StampReason
        {
            get { return _StampReason; }
            set { _StampReason = value; }
        }
        /// <summary>
        /// 取得或设置关键词
        /// </summary>
        public string KeyWord
        {
            get { return _KeyWord; }
            set { _KeyWord = value; }
        }
        /// <summary>
        /// 取得或设置经办人
        /// </summary>
        public string Manager
        {
            get { return _Manager; }
            set { _Manager = value; }
        }
        /// <summary>
        /// 取得或设置经办人联系电话
        /// </summary>
        public string ManagerPhone
        {
            get { return _ManagerPhone; }
            set { _ManagerPhone = value; }
        }
        /// <summary>
        /// 取得或设置经办人邮箱
        /// </summary>
        public string ManagerEmail
        {
            get { return _ManagerEmail; }
            set { _ManagerEmail = value; }
        }
        /// <summary>
        /// 取得对应责任人的ID
        /// </summary>
        public int PrincipalID
        {
            get { return _PrincipalID; }
        }
        /// <summary>
        /// 取得对应的责任人
        /// </summary>
        public Expert Principal
        {
            get { return _Principal.Entity; }
            set
            {
                _Principal.Entity = value;
                _PrincipalID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置双面打印
        /// </summary>
        public bool IsDuplexPrint
        {
            get { return _IsDuplexPrint; }
            set { _IsDuplexPrint = value; }
        }
        /// <summary>
        /// 取得或设置骑缝章
        /// </summary>
        public bool SealPerforation
        {
            get { return _SealPerforation; }
            set { _SealPerforation = value; }
        }
        /// <summary>
        /// 取得或设置专家自己打印
        /// </summary>
        public bool ExpertPrint
        {
            get { return _ExpertPrint; }
            set { _ExpertPrint = value; }
        }
        /// <summary>
        /// 取得对应当前状态的ID
        /// </summary>
        public int? CurrentStateID
        {
            get { return _CurrentStateID; }
        }
        /// <summary>
        /// 取得对应的当前状态
        /// </summary>
        public StampStateHistory CurrentState
        {
            get { return _CurrentState.Entity; }
            set
            {
                _CurrentState.Entity = value;
                _CurrentStateID = value == null ? null : new int?(value.ID);
            }
        }

        #endregion
    }
}
