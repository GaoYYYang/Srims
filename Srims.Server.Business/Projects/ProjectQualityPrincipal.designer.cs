using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Projects
{
    /// <summary>
    /// 项目质量负责人
    /// </summary>
    public partial class ProjectQualityPrincipal
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
        private int _ExpertID;
        private EntityRef<Expert> _Expert;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应项目的ID
        /// </summary>
        /// <remarks>只针对横向的环评类和海域类项目</remarks>
        public int ProjectID
        {
            get { return _ProjectID; }
        }
        /// <summary>
        /// 取得对应的对应项目
        /// </summary>
        /// <remarks>只针对横向的环评类和海域类项目</remarks>
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
        /// 取得对应对应专家的ID
        /// </summary>
        public int ExpertID
        {
            get { return _ExpertID; }
        }
        /// <summary>
        /// 取得对应的对应专家
        /// </summary>
        public Expert Expert
        {
            get { return _Expert.Entity; }
            set
            {
                _Expert.Entity = value;
                _ExpertID = value == null ? 0 : value.ID;
            }
        }

        #endregion
    }
}
