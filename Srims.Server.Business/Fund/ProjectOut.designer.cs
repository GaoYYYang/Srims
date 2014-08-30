using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目-外协
    /// </summary>
    public partial class ProjectOut
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
        private long _Amount;
        private int _OutsourcingID;
        private EntityRef<Outsourcing> _Outsourcing;

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
        /// 取得或设置数额
        /// </summary>
        public long Amount
        {
            get { return _Amount; }
            set { _Amount = value; }
        }
        /// <summary>
        /// 取得对应外协的ID
        /// </summary>
        public int OutsourcingID
        {
            get { return _OutsourcingID; }
        }
        /// <summary>
        /// 取得对应的外协
        /// </summary>
        public Outsourcing Outsourcing
        {
            get { return _Outsourcing.Entity; }
            set
            {
                _Outsourcing.Entity = value;
                _OutsourcingID = value == null ? 0 : value.ID;
            }
        }

        #endregion
    }
}
