using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 文档模型
    /// </summary>
    public partial class DocumentModel
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

        private int _ProjectTypeID;
        private EntityRef<ProjectType> _ProjectType;
        private string _Name;
        private Guid _Resource;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应项目类型的ID
        /// </summary>
        public int ProjectTypeID
        {
            get { return _ProjectTypeID; }
        }
        /// <summary>
        /// 取得对应的对应项目类型
        /// </summary>
        public ProjectType ProjectType
        {
            get { return _ProjectType.Entity; }
            set
            {
                _ProjectType.Entity = value;
                _ProjectTypeID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置文档模板名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置文档模板资源
        /// </summary>
        public Guid Resource
        {
            get { return _Resource; }
            set { _Resource = value; }
        }

        #endregion
    }
}
