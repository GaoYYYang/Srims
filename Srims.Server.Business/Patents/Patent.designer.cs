using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;
using Srims.Server.Business.Patents;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利
    /// </summary>
    public partial class Patent
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

        private string _Number;
        private string _Name;
        private int? _CollegeID;
        private EntityRef<Department> _College;
        private DateTime? _ApplicationDateTime;
        private DateTime? _AuthorizeDateTime;
        private PatentLawState _LawState;
        private DateTime? _LawStateTime;
        private string _Country;
        private string _Category;
        private string _MainCategoryNumber;
        private string _AllCategoryNumber;
        private PatentType _Type;
        private PatentLevel _Level;
        private string _Introduction;
        private int? _AgencyID;
        private EntityRef<PatentAgency> _Agency;
        private string _Agent;
        private string _Remark;
        private int? _OldID;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得对应所属院系的ID
        /// </summary>
        /// <remarks>缓存负责人所属院系</remarks>
        public int? CollegeID
        {
            get { return _CollegeID; }
        }
        /// <summary>
        /// 取得对应的所属院系
        /// </summary>
        /// <remarks>缓存负责人所属院系</remarks>
        public Department College
        {
            get { return _College.Entity; }
            set
            {
                _College.Entity = value;
                _CollegeID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置申请时间
        /// </summary>
        public DateTime? ApplicationDateTime
        {
            get { return _ApplicationDateTime; }
            set { _ApplicationDateTime = value; }
        }
        /// <summary>
        /// 取得或设置授权时间
        /// </summary>
        public DateTime? AuthorizeDateTime
        {
            get { return _AuthorizeDateTime; }
            set { _AuthorizeDateTime = value; }
        }
        /// <summary>
        /// 取得或设置法律状态
        /// </summary>
        public PatentLawState LawState
        {
            get { return _LawState; }
            set { _LawState = value; }
        }
        /// <summary>
        /// 取得或设置法律状态时间
        /// </summary>
        public DateTime? LawStateTime
        {
            get { return _LawStateTime; }
            set { _LawStateTime = value; }
        }
        /// <summary>
        /// 取得或设置国别
        /// </summary>
        public string Country
        {
            get { return _Country; }
            set { _Country = value; }
        }
        /// <summary>
        /// 取得或设置专利分类
        /// </summary>
        public string Category
        {
            get { return _Category; }
            set { _Category = value; }
        }
        /// <summary>
        /// 取得或设置主分类号
        /// </summary>
        public string MainCategoryNumber
        {
            get { return _MainCategoryNumber; }
            set { _MainCategoryNumber = value; }
        }
        /// <summary>
        /// 取得或设置全部分类号
        /// </summary>
        public string AllCategoryNumber
        {
            get { return _AllCategoryNumber; }
            set { _AllCategoryNumber = value; }
        }
        /// <summary>
        /// 取得或设置类型
        /// </summary>
        public PatentType Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置级别
        /// </summary>
        public PatentLevel Level
        {
            get { return _Level; }
            set { _Level = value; }
        }
        /// <summary>
        /// 取得或设置简介
        /// </summary>
        public string Introduction
        {
            get { return _Introduction; }
            set { _Introduction = value; }
        }
        /// <summary>
        /// 取得对应代理机构的ID
        /// </summary>
        public int? AgencyID
        {
            get { return _AgencyID; }
        }
        /// <summary>
        /// 取得对应的代理机构
        /// </summary>
        public PatentAgency Agency
        {
            get { return _Agency.Entity; }
            set
            {
                _Agency.Entity = value;
                _AgencyID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置代理人
        /// </summary>
        public string Agent
        {
            get { return _Agent; }
            set { _Agent = value; }
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

        #endregion
    }
}
