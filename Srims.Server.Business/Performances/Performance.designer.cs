using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效
    /// </summary>
    public partial class Performance
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

        private int? _FundAllocationID;
        private EntityRef<FundAllocation> _FundAllocation;
        private int _ProjectID;
        private EntityRef<Project> _Project;
        private int? _RecoveryID;
        private EntityRef<Recovery> _Recovery;
        private long _ArrivedPerformance;
        private long _DescendPerformance;
        private bool _IsAllocated;
        private bool _IsCancel;
        private DateTime _FoundationTime;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应经费分配的ID
        /// </summary>
        public int? FundAllocationID
        {
            get { return _FundAllocationID; }
        }
        /// <summary>
        /// 取得对应对应项目的ID
        /// </summary>
        /// <remarks>本次数据导入绩效需要跟项目直接关联，不跟FundAllocation关联，从而不影响项目数据的准确性。之后的绩效生成时，需要跟FundAllocation关联。</remarks>
        public int ProjectID
        {
            get { return _ProjectID; }
        }
        /// <summary>
        /// 取得对应的对应项目
        /// </summary>
        /// <remarks>本次数据导入绩效需要跟项目直接关联，不跟FundAllocation关联，从而不影响项目数据的准确性。之后的绩效生成时，需要跟FundAllocation关联。</remarks>
        public Project Project
        {
            get { return _Project.Entity; }
            set
            {
                _Project.Entity = value;
                _ProjectID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应对应调整单的ID
        /// </summary>
        public int? RecoveryID
        {
            get { return _RecoveryID; }
        }
        /// <summary>
        /// 取得对应的对应调整单
        /// </summary>
        public Recovery Recovery
        {
            get { return _Recovery.Entity; }
            set
            {
                _Recovery.Entity = value;
                _RecoveryID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置已到课题组间接费用及绩效
        /// </summary>
        public long ArrivedPerformance
        {
            get { return _ArrivedPerformance; }
            set { _ArrivedPerformance = value; }
        }
        /// <summary>
        /// 取得或设置已下拨课题组间接费用及绩效
        /// </summary>
        public long DescendPerformance
        {
            get { return _DescendPerformance; }
            set { _DescendPerformance = value; }
        }
        /// <summary>
        /// 取得或设置是否分配完成
        /// </summary>
        public bool IsAllocated
        {
            get { return _IsAllocated; }
            set { _IsAllocated = value; }
        }
        /// <summary>
        /// 取得或设置是否作废
        /// </summary>
        public bool IsCancel
        {
            get { return _IsCancel; }
            set { _IsCancel = value; }
        }
        /// <summary>
        /// 取得或设置产生时间
        /// </summary>
        public DateTime FoundationTime
        {
            get { return _FoundationTime; }
            set { _FoundationTime = value; }
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
