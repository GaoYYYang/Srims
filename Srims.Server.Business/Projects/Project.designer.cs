using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Common;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目
    /// </summary>
    public partial class Project
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

        private int? _TypeID;
        private EntityRef<ProjectInfo_Type> _Type;
        private int? _FundID;
        private EntityRef<ProjectInfo_Fund> _Fund;
        private string _Number;
        private string _SerialNumber;
        private string _Name;
        private string _NameSpell;
        private int _PrincipalID;
        private EntityRef<Expert> _Principal;
        private bool? _IsPrincipalSecondCollege;
        private int? _PrincipalDelegateID;
        private EntityRef<Expert> _PrincipalDelegate;
        private int? _PrincipalQualityID;
        private EntityRef<Expert> _PrincipalQuality;
        private ProjectLevel _Level;
        private int? _FirstLevelSubjectID;
        private EntityRef<SubjectFirstLevel> _FirstLevelSubject;
        private int? _SecondLevelSubjectID;
        private EntityRef<SubjectSecondLevel> _SecondLevelSubject;
        private string _ResearchType;
        private bool _IsSecret;
        private DateTime? _StartDate;
        private DateTime? _EndDate;
        private string _CooperationType;
        private int? _BaseID;
        private EntityRef<Base> _Base;
        private string _TaskComingFrom;
        private string _CorporationPlace;
        private int? _CurrentStateID;
        private EntityRef<ProjectStateHistory> _CurrentState;
        private string _Creator;
        private DateTime? _CreateDate;
        private string _Remark;
        private int? _OldID;
        private bool? _IsAdjust;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应项目分类信息的ID
        /// </summary>
        public int? TypeID
        {
            get { return _TypeID; }
        }
        /// <summary>
        /// 取得对应的项目分类信息
        /// </summary>
        public ProjectInfo_Type Type
        {
            get { return _Type.Entity; }
            set
            {
                _Type.Entity = value;
                _TypeID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应项目经费信息的ID
        /// </summary>
        public int? FundID
        {
            get { return _FundID; }
        }
        /// <summary>
        /// 取得对应的项目经费信息
        /// </summary>
        public ProjectInfo_Fund Fund
        {
            get { return _Fund.Entity; }
            set
            {
                _Fund.Entity = value;
                _FundID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置项目编号
        /// </summary>
        public string Number
        {
            get { return _Number; }
            set { _Number = value; }
        }
        /// <summary>
        /// 取得或设置项目流水号
        /// </summary>
        /// <remarks>上一版本中的信息，仅保留</remarks>
        public string SerialNumber
        {
            get { return _SerialNumber; }
            set { _SerialNumber = value; }
        }
        /// <summary>
        /// 取得或设置项目名称拼音首字母
        /// </summary>
        public string NameSpell
        {
            get { return _NameSpell; }
            set { _NameSpell = value; }
        }
        /// <summary>
        /// 取得对应项目负责人的ID
        /// </summary>
        public int PrincipalID
        {
            get { return _PrincipalID; }
        }
        /// <summary>
        /// 取得对应的项目负责人
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
        /// 取得或设置双聘单位
        /// </summary>
        public bool? IsPrincipalSecondCollege
        {
            get { return _IsPrincipalSecondCollege; }
            set { _IsPrincipalSecondCollege = value; }
        }
        /// <summary>
        /// 取得对应委托负责人的ID
        /// </summary>
        public int? PrincipalDelegateID
        {
            get { return _PrincipalDelegateID; }
        }
        /// <summary>
        /// 取得对应的委托负责人
        /// </summary>
        public Expert PrincipalDelegate
        {
            get { return _PrincipalDelegate.Entity; }
            set
            {
                _PrincipalDelegate.Entity = value;
                _PrincipalDelegateID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应项目质量负责人的ID
        /// </summary>
        public int? PrincipalQualityID
        {
            get { return _PrincipalQualityID; }
        }
        /// <summary>
        /// 取得对应的项目质量负责人
        /// </summary>
        public Expert PrincipalQuality
        {
            get { return _PrincipalQuality.Entity; }
            set
            {
                _PrincipalQuality.Entity = value;
                _PrincipalQualityID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置项目分级
        /// </summary>
        /// <remarks>主持、副主持、参加、附加</remarks>
        public ProjectLevel Level
        {
            get { return _Level; }
            set { _Level = value; }
        }
        /// <summary>
        /// 取得对应一级学科的ID
        /// </summary>
        public int? FirstLevelSubjectID
        {
            get { return _FirstLevelSubjectID; }
        }
        /// <summary>
        /// 取得对应的一级学科
        /// </summary>
        public SubjectFirstLevel FirstLevelSubject
        {
            get { return _FirstLevelSubject.Entity; }
            set
            {
                _FirstLevelSubject.Entity = value;
                _FirstLevelSubjectID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应二级学科的ID
        /// </summary>
        public int? SecondLevelSubjectID
        {
            get { return _SecondLevelSubjectID; }
        }
        /// <summary>
        /// 取得对应的二级学科
        /// </summary>
        public SubjectSecondLevel SecondLevelSubject
        {
            get { return _SecondLevelSubject.Entity; }
            set
            {
                _SecondLevelSubject.Entity = value;
                _SecondLevelSubjectID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置研究属性
        /// </summary>
        public string ResearchType
        {
            get { return _ResearchType; }
            set { _ResearchType = value; }
        }
        /// <summary>
        /// 取得或设置是否保密
        /// </summary>
        public bool IsSecret
        {
            get { return _IsSecret; }
            set { _IsSecret = value; }
        }
        /// <summary>
        /// 取得或设置起始年月
        /// </summary>
        public DateTime? StartDate
        {
            get { return _StartDate; }
            set { _StartDate = value; }
        }
        /// <summary>
        /// 取得或设置终止年月
        /// </summary>
        public DateTime? EndDate
        {
            get { return _EndDate; }
            set { _EndDate = value; }
        }
        /// <summary>
        /// 取得或设置合作方式
        /// </summary>
        public string CooperationType
        {
            get { return _CooperationType; }
            set { _CooperationType = value; }
        }
        /// <summary>
        /// 取得对应基地的ID
        /// </summary>
        public int? BaseID
        {
            get { return _BaseID; }
        }
        /// <summary>
        /// 取得对应的基地
        /// </summary>
        public Base Base
        {
            get { return _Base.Entity; }
            set
            {
                _Base.Entity = value;
                _BaseID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置任务来源
        /// </summary>
        /// <remarks>横向项目使用</remarks>
        public string TaskComingFrom
        {
            get { return _TaskComingFrom; }
            set { _TaskComingFrom = value; }
        }
        /// <summary>
        /// 取得或设置公司所在地
        /// </summary>
        /// <remarks>横向项目使用</remarks>
        public string CorporationPlace
        {
            get { return _CorporationPlace; }
            set { _CorporationPlace = value; }
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
        public ProjectStateHistory CurrentState
        {
            get { return _CurrentState.Entity; }
            set
            {
                _CurrentState.Entity = value;
                _CurrentStateID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置建立人
        /// </summary>
        public string Creator
        {
            get { return _Creator; }
            set { _Creator = value; }
        }
        /// <summary>
        /// 取得或设置建立时间
        /// </summary>
        public DateTime? CreateDate
        {
            get { return _CreateDate; }
            set { _CreateDate = value; }
        }
        /// <summary>
        /// 取得或设置备注
        /// </summary>
        public string Remark
        {
            get { return _Remark; }
            set { _Remark = value; }
        }
        /// <summary>
        /// 取得或设置原系统ID
        /// </summary>
        public int? OldID
        {
            get { return _OldID; }
            set { _OldID = value; }
        }
        /// <summary>
        /// 取得或设置追缴标示
        /// </summary>
        public bool? IsAdjust
        {
            get { return _IsAdjust; }
            set { _IsAdjust = value; }
        }

        #endregion
    }
}
