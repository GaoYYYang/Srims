using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Performances;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效分配状态历史
    /// </summary>
    public partial class PerformanceAllocationStateHistory
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

        private int _PerformanceAllocationID;
        private EntityRef<PerformanceAllocation> _PerformanceAllocation;
        private PerformanceAllocationState _State;
        private string _Operator;
        private DateTime _DateTime;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应绩效的ID
        /// </summary>
        public int PerformanceAllocationID
        {
            get { return _PerformanceAllocationID; }
        }
        /// <summary>
        /// 取得对应的对应绩效
        /// </summary>
        public PerformanceAllocation PerformanceAllocation
        {
            get { return _PerformanceAllocation.Entity; }
            set
            {
                _PerformanceAllocation.Entity = value;
                _PerformanceAllocationID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置状态
        /// </summary>
        public PerformanceAllocationState State
        {
            get { return _State; }
            set { _State = value; }
        }
        /// <summary>
        /// 取得或设置操作人
        /// </summary>
        public string Operator
        {
            get { return _Operator; }
            set { _Operator = value; }
        }
        /// <summary>
        /// 取得或设置操作时间
        /// </summary>
        public DateTime DateTime
        {
            get { return _DateTime; }
            set { _DateTime = value; }
        }
        /// <summary>
        /// 取得或设置备注
        /// </summary>
        public string Remark
        {
            get { return _Remark; }
            set { _Remark = value; }
        }

        #endregion
    }
}
