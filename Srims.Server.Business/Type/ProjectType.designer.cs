using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目类别
    /// </summary>
    public partial class ProjectType
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

        private int _ProjectRankID;
        private EntityRef<ProjectRank> _ProjectRank;
        private string _Name;
        private string _NameSpell;
        private string _ShortName;
        private string _Administration;
        private string _Code;
        private string _PerCode;
        private string _BakCode;
        private ProjectFrom _ProjectComingFrom;
        private bool _IsBudget;
        private bool _IsExploit;
        private int _OverheadExpenseInRate;
        private int _OverheadExpenseOutRate;
        private SubjectNature _SubjectNature;
        private string _ManagementFeesType;
        private bool _IsAvailable;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应级别的ID
        /// </summary>
        public int ProjectRankID
        {
            get { return _ProjectRankID; }
        }
        /// <summary>
        /// 取得对应的对应级别
        /// </summary>
        public ProjectRank ProjectRank
        {
            get { return _ProjectRank.Entity; }
            set
            {
                _ProjectRank.Entity = value;
                _ProjectRankID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置类别名称拼音缩写
        /// </summary>
        public string NameSpell
        {
            get { return _NameSpell; }
            set { _NameSpell = value; }
        }
        /// <summary>
        /// 取得或设置专管部门
        /// </summary>
        public string Administration
        {
            get { return _Administration; }
            set { _Administration = value; }
        }
        /// <summary>
        /// 取得或设置分类代码
        /// </summary>
        public string Code
        {
            get { return _Code; }
            set { _Code = value; }
        }
        /// <summary>
        /// 取得或设置原来代码
        /// </summary>
        public string PerCode
        {
            get { return _PerCode; }
            set { _PerCode = value; }
        }
        /// <summary>
        /// 取得或设置分类备用代码
        /// </summary>
        public string BakCode
        {
            get { return _BakCode; }
            set { _BakCode = value; }
        }
        /// <summary>
        /// 取得或设置对应项目来源
        /// </summary>
        public ProjectFrom ProjectComingFrom
        {
            get { return _ProjectComingFrom; }
            set { _ProjectComingFrom = value; }
        }
        /// <summary>
        /// 取得或设置是否预算制
        /// </summary>
        public bool IsBudget
        {
            get { return _IsBudget; }
            set { _IsBudget = value; }
        }
        /// <summary>
        /// 取得或设置是否是同年单账本号（横向）
        /// </summary>
        public bool IsExploit
        {
            get { return _IsExploit; }
            set { _IsExploit = value; }
        }
        /// <summary>
        /// 取得或设置校内管理费率
        /// </summary>
        public int OverheadExpenseInRate
        {
            get { return _OverheadExpenseInRate; }
            set { _OverheadExpenseInRate = value; }
        }
        /// <summary>
        /// 取得或设置外协管理费率
        /// </summary>
        public int OverheadExpenseOutRate
        {
            get { return _OverheadExpenseOutRate; }
            set { _OverheadExpenseOutRate = value; }
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
        /// 取得或设置管理费收取类别
        /// </summary>
        public string ManagementFeesType
        {
            get { return _ManagementFeesType; }
            set { _ManagementFeesType = value; }
        }
        /// <summary>
        /// 取得或设置是否有效
        /// </summary>
        public bool IsAvailable
        {
            get { return _IsAvailable; }
            set { _IsAvailable = value; }
        }

        #endregion
    }
}
