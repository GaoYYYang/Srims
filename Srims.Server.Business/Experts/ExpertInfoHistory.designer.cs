using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家信息历史
    /// </summary>
    public partial class ExpertInfoHistory
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

        private int _ExpertID;
        private EntityRef<Expert> _Expert;
        private string _PropertyName;
        private ExpertInfoHistoryPropertyValueType _PropertyValueType;
        private string _PropertyStringValue;
        private int? _PropertyIntValue;
        private DateTime? _PropertyDateTimeValue;
        private Guid? _PropertyGuildValue;
        private bool? _PropertyBooleanValue;
        private string _PropertyLongStringValue;
        private DateTime _SubmitTime;
        private string _SubmitOperator;
        private DateTime? _CensorTime;
        private string _CensorOperator;
        private CensorState _CensorState;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应专家的ID
        /// </summary>
        public int ExpertID
        {
            get { return _ExpertID; }
        }
        /// <summary>
        /// 取得对应的对应专家
        /// </summary>
        public Expert Expert
        {
            get { return _Expert.Entity; }
            set
            {
                _Expert.Entity = value;
                _ExpertID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置属性名称
        /// </summary>
        public string PropertyName
        {
            get { return _PropertyName; }
            set { _PropertyName = value; }
        }
        /// <summary>
        /// 取得或设置属性值类型
        /// </summary>
        public ExpertInfoHistoryPropertyValueType PropertyValueType
        {
            get { return _PropertyValueType; }
            set { _PropertyValueType = value; }
        }
        /// <summary>
        /// 取得或设置属性字符串值
        /// </summary>
        public string PropertyStringValue
        {
            get { return _PropertyStringValue; }
            set { _PropertyStringValue = value; }
        }
        /// <summary>
        /// 取得或设置属性整型值
        /// </summary>
        public int? PropertyIntValue
        {
            get { return _PropertyIntValue; }
            set { _PropertyIntValue = value; }
        }
        /// <summary>
        /// 取得或设置属性日期值
        /// </summary>
        public DateTime? PropertyDateTimeValue
        {
            get { return _PropertyDateTimeValue; }
            set { _PropertyDateTimeValue = value; }
        }
        /// <summary>
        /// 取得或设置属性唯一标识符值
        /// </summary>
        public Guid? PropertyGuildValue
        {
            get { return _PropertyGuildValue; }
            set { _PropertyGuildValue = value; }
        }
        /// <summary>
        /// 取得或设置属性布尔值
        /// </summary>
        public bool? PropertyBooleanValue
        {
            get { return _PropertyBooleanValue; }
            set { _PropertyBooleanValue = value; }
        }
        /// <summary>
        /// 取得或设置属性长字符串值
        /// </summary>
        public string PropertyLongStringValue
        {
            get { return _PropertyLongStringValue; }
            set { _PropertyLongStringValue = value; }
        }
        /// <summary>
        /// 取得或设置提交时间
        /// </summary>
        public DateTime SubmitTime
        {
            get { return _SubmitTime; }
            set { _SubmitTime = value; }
        }
        /// <summary>
        /// 取得或设置提交人
        /// </summary>
        public string SubmitOperator
        {
            get { return _SubmitOperator; }
            set { _SubmitOperator = value; }
        }
        /// <summary>
        /// 取得或设置审核时间
        /// </summary>
        public DateTime? CensorTime
        {
            get { return _CensorTime; }
            set { _CensorTime = value; }
        }
        /// <summary>
        /// 取得或设置审核人
        /// </summary>
        public string CensorOperator
        {
            get { return _CensorOperator; }
            set { _CensorOperator = value; }
        }
        /// <summary>
        /// 取得或设置审核状态
        /// </summary>
        public CensorState CensorState
        {
            get { return _CensorState; }
            set { _CensorState = value; }
        }

        #endregion
    }
}
