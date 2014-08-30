using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 项目信息—分类
    /// </summary>
    public partial class ProjectInfo_Type
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
        private int _RankID;
        private EntityRef<ProjectRank> _Rank;
        private int _TypeID;
        private EntityRef<ProjectType> _Type;
        private int? _SupportFieldID;
        private EntityRef<ProjectSupportField> _SupportField;
        private int? _SupportSubFieldID;
        private EntityRef<ProjectSupportSubField> _SupportSubField;
        private int? _SupportCategoryID;
        private EntityRef<ProjectSupportCategory> _SupportCategory;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应的项目的ID
        /// </summary>
        public int ProjectID
        {
            get { return _ProjectID; }
        }
        /// <summary>
        /// 取得对应的对应的项目
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
        /// 取得对应项目级别的ID
        /// </summary>
        public int RankID
        {
            get { return _RankID; }
        }
        /// <summary>
        /// 取得对应的项目级别
        /// </summary>
        public ProjectRank Rank
        {
            get { return _Rank.Entity; }
            set
            {
                _Rank.Entity = value;
                _RankID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应项目类别的ID
        /// </summary>
        public int TypeID
        {
            get { return _TypeID; }
        }
        /// <summary>
        /// 取得对应的项目类别
        /// </summary>
        public ProjectType Type
        {
            get { return _Type.Entity; }
            set
            {
                _Type.Entity = value;
                _TypeID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得对应资助领域的ID
        /// </summary>
        public int? SupportFieldID
        {
            get { return _SupportFieldID; }
        }
        /// <summary>
        /// 取得对应的资助领域
        /// </summary>
        public ProjectSupportField SupportField
        {
            get { return _SupportField.Entity; }
            set
            {
                _SupportField.Entity = value;
                _SupportFieldID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应资助子领域的ID
        /// </summary>
        public int? SupportSubFieldID
        {
            get { return _SupportSubFieldID; }
        }
        /// <summary>
        /// 取得对应的资助子领域
        /// </summary>
        public ProjectSupportSubField SupportSubField
        {
            get { return _SupportSubField.Entity; }
            set
            {
                _SupportSubField.Entity = value;
                _SupportSubFieldID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应资助类别的ID
        /// </summary>
        public int? SupportCategoryID
        {
            get { return _SupportCategoryID; }
        }
        /// <summary>
        /// 取得对应的资助类别
        /// </summary>
        public ProjectSupportCategory SupportCategory
        {
            get { return _SupportCategory.Entity; }
            set
            {
                _SupportCategory.Entity = value;
                _SupportCategoryID = value == null ? null : new int?(value.ID);
            }
        }

        #endregion
    }
}
