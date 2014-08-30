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
    /// 项目资助类别
    /// </summary>
    public partial class ProjectSupportCategory
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
        private bool _IsGetOverheadExpense;
        private bool _IsAvailable;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应类别的ID
        /// </summary>
        public int ProjectTypeID
        {
            get { return _ProjectTypeID; }
        }
        /// <summary>
        /// 取得对应的对应类别
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
        /// 取得或设置资助类别名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 取得或设置是否收取管理费
        /// </summary>
        public bool IsGetOverheadExpense
        {
            get { return _IsGetOverheadExpense; }
            set { _IsGetOverheadExpense = value; }
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
