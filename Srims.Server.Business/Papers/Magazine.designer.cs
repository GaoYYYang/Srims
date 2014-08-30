using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志
    /// </summary>
    public partial class Magazine
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

        private string _FullName;
        private string _ShortName;
        private string _ISSN;
        private string _SubjectRank;
        private PublishType _PublishType;
        private Language _Language;
        private string _PublishCompany;
        private string _PublishCompanyAddress;
        private string _PublishCompanyCity;
        private bool _IsDelete;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置全称
        /// </summary>
        public string FullName
        {
            get { return _FullName; }
            set { _FullName = value; }
        }
        /// <summary>
        /// 取得或设置简称
        /// </summary>
        public string ShortName
        {
            get { return _ShortName; }
            set { _ShortName = value; }
        }
        /// <summary>
        /// 取得或设置ISSN
        /// </summary>
        public string ISSN
        {
            get { return _ISSN; }
            set { _ISSN = value; }
        }
        /// <summary>
        /// 取得或设置学科等级
        /// </summary>
        public string SubjectRank
        {
            get { return _SubjectRank; }
            set { _SubjectRank = value; }
        }
        /// <summary>
        /// 取得或设置出版类型
        /// </summary>
        public PublishType PublishType
        {
            get { return _PublishType; }
            set { _PublishType = value; }
        }
        /// <summary>
        /// 取得或设置语种
        /// </summary>
        public Language Language
        {
            get { return _Language; }
            set { _Language = value; }
        }
        /// <summary>
        /// 取得或设置出版社
        /// </summary>
        public string PublishCompany
        {
            get { return _PublishCompany; }
            set { _PublishCompany = value; }
        }
        /// <summary>
        /// 取得或设置出版社地址
        /// </summary>
        public string PublishCompanyAddress
        {
            get { return _PublishCompanyAddress; }
            set { _PublishCompanyAddress = value; }
        }
        /// <summary>
        /// 取得或设置出版社所在城市
        /// </summary>
        public string PublishCompanyCity
        {
            get { return _PublishCompanyCity; }
            set { _PublishCompanyCity = value; }
        }
        /// <summary>
        /// 取得或设置是否删除
        /// </summary>
        public bool IsDelete
        {
            get { return _IsDelete; }
            set { _IsDelete = value; }
        }

        #endregion
    }
}
