using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;
using Srims.Server.Business.Awards;

namespace Srims.Server.Business.Awards
{
    /// <summary>
    /// 获奖情况
    /// </summary>
    public partial class Award
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
        private int? _Year;
        private string _Rank;
        private int? _CollegeID;
        private EntityRef<Department> _College;
        private int? _FirstWinnerID;
        private EntityRef<AwardWinner> _FirstWinner;
        private string _Class;
        private string _AttendType;
        private string _Project;
        private string _Introduction;
        private string _AuthorisedUnit;
        private string _Classification;
        private SubjectNature _SubjectNature;
        private string _Remark;
        private int? _OldID;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置奖项名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置获奖年份
        /// </summary>
        public int? Year
        {
            get { return _Year; }
            set { _Year = value; }
        }
        /// <summary>
        /// 取得或设置级别
        /// </summary>
        public string Rank
        {
            get { return _Rank; }
            set { _Rank = value; }
        }
        /// <summary>
        /// 取得对应所属学院的ID
        /// </summary>
        public int? CollegeID
        {
            get { return _CollegeID; }
        }
        /// <summary>
        /// 取得对应的所属学院
        /// </summary>
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
        /// 取得对应第一获奖人的ID
        /// </summary>
        public int? FirstWinnerID
        {
            get { return _FirstWinnerID; }
        }
        /// <summary>
        /// 取得对应的第一获奖人
        /// </summary>
        public AwardWinner FirstWinner
        {
            get { return _FirstWinner.Entity; }
            set
            {
                _FirstWinner.Entity = value;
                _FirstWinnerID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置等级
        /// </summary>
        public string Class
        {
            get { return _Class; }
            set { _Class = value; }
        }
        /// <summary>
        /// 取得或设置参与类型
        /// </summary>
        public string AttendType
        {
            get { return _AttendType; }
            set { _AttendType = value; }
        }
        /// <summary>
        /// 取得或设置对应项目
        /// </summary>
        public string Project
        {
            get { return _Project; }
            set { _Project = value; }
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
        /// 取得或设置授奖单位
        /// </summary>
        public string AuthorisedUnit
        {
            get { return _AuthorisedUnit; }
            set { _AuthorisedUnit = value; }
        }
        /// <summary>
        /// 取得或设置获奖种类
        /// </summary>
        public string Classification
        {
            get { return _Classification; }
            set { _Classification = value; }
        }
        /// <summary>
        /// 取得或设置学科性质
        /// </summary>
        public SubjectNature SubjectNature
        {
            get { return _SubjectNature; }
            set { _SubjectNature = value; }
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
