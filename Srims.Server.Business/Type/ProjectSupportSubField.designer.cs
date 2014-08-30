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
    /// 项目资助子领域
    /// </summary>
    public partial class ProjectSupportSubField
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

        private int _ProjectSupportFieldID;
        private EntityRef<ProjectSupportField> _ProjectSupportField;
        private string _Name;
        private bool _IsAvailable;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应资助领域的ID
        /// </summary>
        public int ProjectSupportFieldID
        {
            get { return _ProjectSupportFieldID; }
        }
        /// <summary>
        /// 取得对应的对应资助领域
        /// </summary>
        public ProjectSupportField ProjectSupportField
        {
            get { return _ProjectSupportField.Entity; }
            set
            {
                _ProjectSupportField.Entity = value;
                _ProjectSupportFieldID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置资助子领域名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
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
