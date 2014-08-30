using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Bases
{
    /// <summary>
    /// 基地
    /// </summary>
    public partial class Base
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
        private string _Address;
        private string _Zip;
        private string _Phone;
        private string _Fax;
        private string _Administration;
        private string _Rank;
        private int? _DirectorID;
        private EntityRef<Expert> _Director;
        private string _DirectorName;
        private int? _AcademyDirectorID;
        private EntityRef<Expert> _AcademyDirector;
        private string _AcademyDirectorName;

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
        /// 取得或设置地址
        /// </summary>
        public string Address
        {
            get { return _Address; }
            set { _Address = value; }
        }
        /// <summary>
        /// 取得或设置邮编
        /// </summary>
        public string Zip
        {
            get { return _Zip; }
            set { _Zip = value; }
        }
        /// <summary>
        /// 取得或设置电话
        /// </summary>
        public string Phone
        {
            get { return _Phone; }
            set { _Phone = value; }
        }
        /// <summary>
        /// 取得或设置传真
        /// </summary>
        public string Fax
        {
            get { return _Fax; }
            set { _Fax = value; }
        }
        /// <summary>
        /// 取得或设置主管部门
        /// </summary>
        public string Administration
        {
            get { return _Administration; }
            set { _Administration = value; }
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
        /// 取得对应负责人的ID
        /// </summary>
        public int? DirectorID
        {
            get { return _DirectorID; }
        }
        /// <summary>
        /// 取得或设置负责人姓名
        /// </summary>
        public string DirectorName
        {
            get { return _DirectorName; }
            set { _DirectorName = value; }
        }
        /// <summary>
        /// 取得对应学术负责人的ID
        /// </summary>
        public int? AcademyDirectorID
        {
            get { return _AcademyDirectorID; }
        }
        /// <summary>
        /// 取得对应的学术负责人
        /// </summary>
        public Expert AcademyDirector
        {
            get { return _AcademyDirector.Entity; }
            set
            {
                _AcademyDirector.Entity = value;
                _AcademyDirectorID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置学术负责人姓名
        /// </summary>
        public string AcademyDirectorName
        {
            get { return _AcademyDirectorName; }
            set { _AcademyDirectorName = value; }
        }

        #endregion
    }
}
