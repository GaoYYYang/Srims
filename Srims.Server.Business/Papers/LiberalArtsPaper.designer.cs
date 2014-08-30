using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文(文科)
    /// </summary>
    public partial class LiberalArtsPaper
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

        private int _PublishDateYear;
        private string _SerialNumbe;
        private string _ResultsName;
        private ResultsType _Type;
        private string _EnglishName;
        private string _Degree;
        private string _ResultsForm;
        private string _Fund;
        private string _Publisher;
        private string _ISSN;
        private string _FirstOrganization;
        private int? _OurSchoolSignRank;
        private string _OrganizationName;
        private string _Region;
        private string _SubjectClass;
        private int? _CollegeID;
        private EntityRef<Department> _College;
        private string _CODEN;
        private string _IssuesDate;
        private string _KeyWord;
        private string _Mark;
        private string _DegreeType;
        private string _FundType;
        private string _References;
        private int? _CiteTime;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置发表年
        /// </summary>
        public int PublishDateYear
        {
            get { return _PublishDateYear; }
            set { _PublishDateYear = value; }
        }
        /// <summary>
        /// 取得或设置序列号
        /// </summary>
        public string SerialNumbe
        {
            get { return _SerialNumbe; }
            set { _SerialNumbe = value; }
        }
        /// <summary>
        /// 取得或设置成果名
        /// </summary>
        public string ResultsName
        {
            get { return _ResultsName; }
            set { _ResultsName = value; }
        }
        /// <summary>
        /// 取得或设置成果类别
        /// </summary>
        public ResultsType Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置英文篇名
        /// </summary>
        public string EnglishName
        {
            get { return _EnglishName; }
            set { _EnglishName = value; }
        }
        /// <summary>
        /// 取得或设置文章等级
        /// </summary>
        public string Degree
        {
            get { return _Degree; }
            set { _Degree = value; }
        }
        /// <summary>
        /// 取得或设置成果形式
        /// </summary>
        public string ResultsForm
        {
            get { return _ResultsForm; }
            set { _ResultsForm = value; }
        }
        /// <summary>
        /// 取得或设置基金
        /// </summary>
        public string Fund
        {
            get { return _Fund; }
            set { _Fund = value; }
        }
        /// <summary>
        /// 取得或设置期刊名或出版社
        /// </summary>
        public string Publisher
        {
            get { return _Publisher; }
            set { _Publisher = value; }
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
        /// 取得或设置第一机构
        /// </summary>
        public string FirstOrganization
        {
            get { return _FirstOrganization; }
            set { _FirstOrganization = value; }
        }
        /// <summary>
        /// 取得或设置我校署名位次
        /// </summary>
        public int? OurSchoolSignRank
        {
            get { return _OurSchoolSignRank; }
            set { _OurSchoolSignRank = value; }
        }
        /// <summary>
        /// 取得或设置机构名称
        /// </summary>
        public string OrganizationName
        {
            get { return _OrganizationName; }
            set { _OrganizationName = value; }
        }
        /// <summary>
        /// 取得或设置地区
        /// </summary>
        public string Region
        {
            get { return _Region; }
            set { _Region = value; }
        }
        /// <summary>
        /// 取得或设置学科分类
        /// </summary>
        public string SubjectClass
        {
            get { return _SubjectClass; }
            set { _SubjectClass = value; }
        }
        /// <summary>
        /// 取得对应所属院系的ID
        /// </summary>
        public int? CollegeID
        {
            get { return _CollegeID; }
        }
        /// <summary>
        /// 取得对应的所属院系
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
        /// 取得或设置期刊代码
        /// </summary>
        public string CODEN
        {
            get { return _CODEN; }
            set { _CODEN = value; }
        }
        /// <summary>
        /// 取得或设置年代卷期
        /// </summary>
        public string IssuesDate
        {
            get { return _IssuesDate; }
            set { _IssuesDate = value; }
        }
        /// <summary>
        /// 取得或设置关键词
        /// </summary>
        public string KeyWord
        {
            get { return _KeyWord; }
            set { _KeyWord = value; }
        }
        /// <summary>
        /// 取得或设置标志
        /// </summary>
        public string Mark
        {
            get { return _Mark; }
            set { _Mark = value; }
        }
        /// <summary>
        /// 取得或设置学位分类
        /// </summary>
        public string DegreeType
        {
            get { return _DegreeType; }
            set { _DegreeType = value; }
        }
        /// <summary>
        /// 取得或设置基金类别
        /// </summary>
        public string FundType
        {
            get { return _FundType; }
            set { _FundType = value; }
        }
        /// <summary>
        /// 取得或设置参考文献
        /// </summary>
        public string References
        {
            get { return _References; }
            set { _References = value; }
        }
        /// <summary>
        /// 取得或设置总被引次数
        /// </summary>
        public int? CiteTime
        {
            get { return _CiteTime; }
            set { _CiteTime = value; }
        }

        #endregion
    }
}
