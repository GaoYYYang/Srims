using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 文档
    /// </summary>
    public partial class Document
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
        private string _Name;
        private string _Author;
        private DateTime? _SubmitDateTime;
        private DateTime? _Deadline;
        private CensorState _State;
        private string _Censor;
        private DateTime? _CensorDateTime;
        private bool _IsRequire;
        private Guid? _DocumentResource;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应项目的ID
        /// </summary>
        public int ProjectID
        {
            get { return _ProjectID; }
        }
        /// <summary>
        /// 取得对应的对应项目
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
        /// 取得或设置文档名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置提交人
        /// </summary>
        public string Author
        {
            get { return _Author; }
            set { _Author = value; }
        }
        /// <summary>
        /// 取得或设置提交日期
        /// </summary>
        public DateTime? SubmitDateTime
        {
            get { return _SubmitDateTime; }
            set { _SubmitDateTime = value; }
        }
        /// <summary>
        /// 取得或设置截止日期
        /// </summary>
        public DateTime? Deadline
        {
            get { return _Deadline; }
            set { _Deadline = value; }
        }
        /// <summary>
        /// 取得或设置状态
        /// </summary>
        public CensorState State
        {
            get { return _State; }
            set { _State = value; }
        }
        /// <summary>
        /// 取得或设置审核日期
        /// </summary>
        public DateTime? CensorDateTime
        {
            get { return _CensorDateTime; }
            set { _CensorDateTime = value; }
        }
        /// <summary>
        /// 取得或设置是否必须
        /// </summary>
        public bool IsRequire
        {
            get { return _IsRequire; }
            set { _IsRequire = value; }
        }
        /// <summary>
        /// 取得或设置文档资源
        /// </summary>
        public Guid? DocumentResource
        {
            get { return _DocumentResource; }
            set { _DocumentResource = value; }
        }

        #endregion
    }
}
