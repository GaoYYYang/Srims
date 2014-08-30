using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 追缴单
    /// </summary>
    public partial class Recovery
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

        private int _ProjectID;
        private EntityRef<Project> _Project;
        private string _VoucherNumber;
        private long _ReceivedOverheadExpensesIn;
        private long _PlanedOverheadExpensesIn;
        private long _ReceivedOverheadExpensesMiddle;
        private long _PlanedOverheadExpensesMiddle;
        private long? _ReceivedPerformancePay;
        private long? _PlanedPerformancePay;
        private long? _OldOverheadExpensesIn;
        private long? _NewOverheadExpensesIn;
        private long? _OldPerformancePay;
        private long? _NewPerformancePay;
        private long? _OldFundPlanIn;
        private long? _NewFundPlanIn;
        private long? _CurrentAllocationIn;
        private DateTime? _OperateTime;
        private DateTime? _PrintDateTime;
        private string _Operator;
        private bool _IsPrint;
        private bool? _IsCanceled;
        private string _Remark;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应项目的ID
        /// </summary>
        public int ProjectID
        {
            get { return _ProjectID; }
        }
        /// <summary>
        /// 取得对应的项目
        /// </summary>
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
        /// 取得或设置凭单号
        /// </summary>
        public string VoucherNumber
        {
            get { return _VoucherNumber; }
            set { _VoucherNumber = value; }
        }
        /// <summary>
        /// 取得或设置调整前已收学校间接费用（系统算的）
        /// </summary>
        public long ReceivedOverheadExpensesIn
        {
            get { return _ReceivedOverheadExpensesIn; }
            set { _ReceivedOverheadExpensesIn = value; }
        }
        /// <summary>
        /// 取得或设置调整后应收学校间接费用
        /// </summary>
        public long PlanedOverheadExpensesIn
        {
            get { return _PlanedOverheadExpensesIn; }
            set { _PlanedOverheadExpensesIn = value; }
        }
        /// <summary>
        /// 取得或设置调整前应收二级单位间接费用
        /// </summary>
        public long ReceivedOverheadExpensesMiddle
        {
            get { return _ReceivedOverheadExpensesMiddle; }
            set { _ReceivedOverheadExpensesMiddle = value; }
        }
        /// <summary>
        /// 取得或设置调整后应收二级单位间接费用
        /// </summary>
        public long PlanedOverheadExpensesMiddle
        {
            get { return _PlanedOverheadExpensesMiddle; }
            set { _PlanedOverheadExpensesMiddle = value; }
        }
        /// <summary>
        /// 取得或设置调整前已发放的课题组间接费用及绩效
        /// </summary>
        public long? ReceivedPerformancePay
        {
            get { return _ReceivedPerformancePay; }
            set { _ReceivedPerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置调整后应发放的课题组间接费用及绩效
        /// </summary>
        public long? PlanedPerformancePay
        {
            get { return _PlanedPerformancePay; }
            set { _PlanedPerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置调整前项目学校间接费用
        /// </summary>
        public long? OldOverheadExpensesIn
        {
            get { return _OldOverheadExpensesIn; }
            set { _OldOverheadExpensesIn = value; }
        }
        /// <summary>
        /// 取得或设置调整后项目学校间接费用
        /// </summary>
        public long? NewOverheadExpensesIn
        {
            get { return _NewOverheadExpensesIn; }
            set { _NewOverheadExpensesIn = value; }
        }
        /// <summary>
        /// 取得或设置调整前项目课题组管理费
        /// </summary>
        public long? OldPerformancePay
        {
            get { return _OldPerformancePay; }
            set { _OldPerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置调整后项目课题组管理费
        /// </summary>
        public long? NewPerformancePay
        {
            get { return _NewPerformancePay; }
            set { _NewPerformancePay = value; }
        }
        /// <summary>
        /// 取得或设置调整前校内计划分配
        /// </summary>
        public long? OldFundPlanIn
        {
            get { return _OldFundPlanIn; }
            set { _OldFundPlanIn = value; }
        }
        /// <summary>
        /// 取得或设置调整后校内计划分配
        /// </summary>
        public long? NewFundPlanIn
        {
            get { return _NewFundPlanIn; }
            set { _NewFundPlanIn = value; }
        }
        /// <summary>
        /// 取得或设置调整时项目已分配校内经费
        /// </summary>
        public long? CurrentAllocationIn
        {
            get { return _CurrentAllocationIn; }
            set { _CurrentAllocationIn = value; }
        }
        /// <summary>
        /// 取得或设置调整时间
        /// </summary>
        public DateTime? OperateTime
        {
            get { return _OperateTime; }
            set { _OperateTime = value; }
        }
        /// <summary>
        /// 取得或设置打印日期
        /// </summary>
        public DateTime? PrintDateTime
        {
            get { return _PrintDateTime; }
            set { _PrintDateTime = value; }
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
        /// 取得或设置是否打印
        /// </summary>
        public bool IsPrint
        {
            get { return _IsPrint; }
            set { _IsPrint = value; }
        }
        /// <summary>
        /// 取得或设置是否作废
        /// </summary>
        public bool? IsCanceled
        {
            get { return _IsCanceled; }
            set { _IsCanceled = value; }
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
