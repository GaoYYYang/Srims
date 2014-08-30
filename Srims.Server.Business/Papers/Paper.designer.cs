using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文
    /// </summary>
    public partial class Paper
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
        private int? _MagazineID;
        private EntityRef<Magazine> _Magazine;
        private string _ResourceName;
        private PaperType _Type;
        private int? _CiteFrequency;
        private int? _PublishDateYear;
        private string _PublishDate;
        private string _DocumentNumber;
        private string _Volume;
        private int? _StartPage;
        private int? _EndPage;
        private int? _Pages;
        private int? _SubAirer;
        private int? _InfluenceFactor;
        private string _AuthorKeyWord;
        private string _KeyWord;
        private string _Abstract;
        private string _LinkManAddress;
        private string _LinkManEmail;
        private SignUnit _LinkManSignUnit;
        private SignUnit _FirstAuthorSignUnit;
        private int? _SignOrder;
        private int? _CollegeID;
        private EntityRef<Department> _College;
        private string _Lab;
        private string _ISIUniqueArticleIdentifier;
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
        /// 取得对应发表杂志的ID
        /// </summary>
        public int? MagazineID
        {
            get { return _MagazineID; }
        }
        /// <summary>
        /// 取得或设置来源名称
        /// </summary>
        public string ResourceName
        {
            get { return _ResourceName; }
            set { _ResourceName = value; }
        }
        /// <summary>
        /// 取得或设置文章类型
        /// </summary>
        public PaperType Type
        {
            get { return _Type; }
            set { _Type = value; }
        }
        /// <summary>
        /// 取得或设置被引频次
        /// </summary>
        public int? CiteFrequency
        {
            get { return _CiteFrequency; }
            set { _CiteFrequency = value; }
        }
        /// <summary>
        /// 取得或设置发表年份
        /// </summary>
        public int? PublishDateYear
        {
            get { return _PublishDateYear; }
            set { _PublishDateYear = value; }
        }
        /// <summary>
        /// 取得或设置发表日期
        /// </summary>
        public string PublishDate
        {
            get { return _PublishDate; }
            set { _PublishDate = value; }
        }
        /// <summary>
        /// 取得或设置期次
        /// </summary>
        public string DocumentNumber
        {
            get { return _DocumentNumber; }
            set { _DocumentNumber = value; }
        }
        /// <summary>
        /// 取得或设置卷号
        /// </summary>
        public string Volume
        {
            get { return _Volume; }
            set { _Volume = value; }
        }
        /// <summary>
        /// 取得或设置起始页码
        /// </summary>
        public int? StartPage
        {
            get { return _StartPage; }
            set { _StartPage = value; }
        }
        /// <summary>
        /// 取得或设置终止页码
        /// </summary>
        public int? EndPage
        {
            get { return _EndPage; }
            set { _EndPage = value; }
        }
        /// <summary>
        /// 取得或设置页数
        /// </summary>
        public int? Pages
        {
            get { return _Pages; }
            set { _Pages = value; }
        }
        /// <summary>
        /// 取得或设置分区
        /// </summary>
        public int? SubAirer
        {
            get { return _SubAirer; }
            set { _SubAirer = value; }
        }
        /// <summary>
        /// 取得或设置影响因子
        /// </summary>
        public int? InfluenceFactor
        {
            get { return _InfluenceFactor; }
            set { _InfluenceFactor = value; }
        }
        /// <summary>
        /// 取得或设置作者关键词
        /// </summary>
        public string AuthorKeyWord
        {
            get { return _AuthorKeyWord; }
            set { _AuthorKeyWord = value; }
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
        /// 取得或设置摘要
        /// </summary>
        public string Abstract
        {
            get { return _Abstract; }
            set { _Abstract = value; }
        }
        /// <summary>
        /// 取得或设置通讯作者地址
        /// </summary>
        public string LinkManAddress
        {
            get { return _LinkManAddress; }
            set { _LinkManAddress = value; }
        }
        /// <summary>
        /// 取得或设置通讯作者Email
        /// </summary>
        public string LinkManEmail
        {
            get { return _LinkManEmail; }
            set { _LinkManEmail = value; }
        }
        /// <summary>
        /// 取得或设置通讯作者署名单位
        /// </summary>
        public SignUnit LinkManSignUnit
        {
            get { return _LinkManSignUnit; }
            set { _LinkManSignUnit = value; }
        }
        /// <summary>
        /// 取得或设置第一作者署名单位
        /// </summary>
        public SignUnit FirstAuthorSignUnit
        {
            get { return _FirstAuthorSignUnit; }
            set { _FirstAuthorSignUnit = value; }
        }
        /// <summary>
        /// 取得或设置我校署名位次
        /// </summary>
        public int? SignOrder
        {
            get { return _SignOrder; }
            set { _SignOrder = value; }
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
        /// 取得或设置所属实验室
        /// </summary>
        public string Lab
        {
            get { return _Lab; }
            set { _Lab = value; }
        }
        /// <summary>
        /// 取得或设置ISIUniqueArticleIdentifier
        /// </summary>
        public string ISIUniqueArticleIdentifier
        {
            get { return _ISIUniqueArticleIdentifier; }
            set { _ISIUniqueArticleIdentifier = value; }
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
