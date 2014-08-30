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
    /// 绩效分配
    /// </summary>
    public partial class PerformanceAllocation
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

        private int _PerformanceID;
        private EntityRef<Performance> _Performance;
        private long _ArrivedPerformance;
        private long _ArrivedOverheadexpensesExpert;
        private bool _CanAllocate;
        private int? _CurrentStateID;
        private EntityRef<PerformanceAllocationStateHistory> _CurrentState;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应绩效的ID
        /// </summary>
        public int PerformanceID
        {
            get { return _PerformanceID; }
        }
        /// <summary>
        /// 取得对应的对应绩效
        /// </summary>
        public Performance Performance
        {
            get { return _Performance.Entity; }
            set
            {
                _Performance.Entity = value;
                _PerformanceID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置下达绩效
        /// </summary>
        public long ArrivedPerformance
        {
            get { return _ArrivedPerformance; }
            set { _ArrivedPerformance = value; }
        }
        /// <summary>
        /// 取得或设置下达课题组间接费用及绩效
        /// </summary>
        public long ArrivedOverheadexpensesExpert
        {
            get { return _ArrivedOverheadexpensesExpert; }
            set { _ArrivedOverheadexpensesExpert = value; }
        }
        /// <summary>
        /// 取得或设置是否可分配
        /// </summary>
        public bool CanAllocate
        {
            get { return _CanAllocate; }
            set { _CanAllocate = value; }
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
        public PerformanceAllocationStateHistory CurrentState
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
