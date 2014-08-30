using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 项目经费成员
    /// </summary>
    public partial class FundMember
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

        private int? _ProjectInfo_FundID;
        private EntityRef<ProjectInfo_Fund> _ProjectInfo_Fund;
        private int? _ExpertID;
        private EntityRef<Expert> _Expert;
        private bool? _IsExpertSecondCollege;
        private string _AccountBookNumber;
        private int? _OldID;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应项目经费信息的ID
        /// </summary>
        public int? ProjectInfo_FundID
        {
            get { return _ProjectInfo_FundID; }
        }
        /// <summary>
        /// 取得对应的对应项目经费信息
        /// </summary>
        public ProjectInfo_Fund ProjectInfo_Fund
        {
            get { return _ProjectInfo_Fund.Entity; }
            set
            {
                _ProjectInfo_Fund.Entity = value;
                _ProjectInfo_FundID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应对应专家的ID
        /// </summary>
        public int? ExpertID
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
                _ExpertID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置双聘单位
        /// </summary>
        public bool? IsExpertSecondCollege
        {
            get { return _IsExpertSecondCollege; }
            set { _IsExpertSecondCollege = value; }
        }
        /// <summary>
        /// 取得或设置帐本号
        /// </summary>
        public string AccountBookNumber
        {
            get { return _AccountBookNumber; }
            set { _AccountBookNumber = value; }
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
