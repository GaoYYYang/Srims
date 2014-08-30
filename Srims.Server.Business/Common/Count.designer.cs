using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 分年份计数器
    /// </summary>
    public partial class Count
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

        private int _Year;
        private int _HorizontalProject;
        private int _Contract;
        private int _ExpertSerialCodeCount;

        #endregion

        #region 属性

        /// <summary>
        /// 取得或设置年份
        /// </summary>
        public int Year
        {
            get { return _Year; }
            set { _Year = value; }
        }
        /// <summary>
        /// 取得或设置年度横向项目数目
        /// </summary>
        public int HorizontalProject
        {
            get { return _HorizontalProject; }
            set { _HorizontalProject = value; }
        }
        /// <summary>
        /// 取得或设置年度合同数目
        /// </summary>
        public int Contract
        {
            get { return _Contract; }
            set { _Contract = value; }
        }
        /// <summary>
        /// 取得或设置专家数序码计数器
        /// </summary>
        public int ExpertSerialCodeCount
        {
            get { return _ExpertSerialCodeCount; }
            set { _ExpertSerialCodeCount = value; }
        }

        #endregion
    }
}
