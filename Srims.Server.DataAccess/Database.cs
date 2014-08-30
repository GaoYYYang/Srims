using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

using MIS.Common;

using Srims.Server.Business;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Statistics;
using Srims.Server.Business.Stamps;

namespace Srims.Server.DataAccess
{
    /// <summary>
    /// 数据库
    /// </summary>
    public class Database : DataContext, IDatabase
    {
        private const string DATABASE_CONNECTION_CONFIGURATION_NAME = "SrimsDatabase";

        #region Singelton Pattern

        private const string MAPPING_SOURCE_RESOURCE_NAME = "Srims.Server.DataAccess.MappingSource.Xml";
        private static MappingSource _MappingSource;
        private static object _Locker = new object();

        private string _ConnectionString;

        private Database(string connectionString, MappingSource mappingSource)
            : base(connectionString, mappingSource)
        {
            this._ConnectionString = connectionString;
        }

        private static MappingSource getMappingSource()
        {
            if (_MappingSource == null)
            {
                lock (_Locker)
                {
                    if (_MappingSource == null)
                    {
                        Stream mapingSourceStream = Assembly.GetAssembly(typeof(Database)).GetManifestResourceStream(MAPPING_SOURCE_RESOURCE_NAME);
                        if (mapingSourceStream == null)
                            throw new System.IO.InvalidDataException("映射文件不存在！您确定已经将其编译属性设置为\"嵌入资源（Embedded Resource）\"?");
                        _MappingSource = XmlMappingSource.FromStream(mapingSourceStream);
                    }
                }
            }
            return _MappingSource;
        }

        #endregion

        /// <summary>
        /// 构造新的数据库
        /// </summary>
        /// <param name="connectionString">数据库连接字符串</param>
        /// <returns>数据库实例</returns>
        public static Database New(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException("connectionString");

            return new Database(connectionString, getMappingSource());
        }
        /// <summary>
        /// 根据配置文件，构造新数据库
        /// </summary>
        /// <returns></returns>
        public static Database New()
        {
            var database = Database.New(ConfigurationManager.ConnectionStrings[DATABASE_CONNECTION_CONFIGURATION_NAME].ConnectionString);

            var loadOptions = new DataLoadOptions();

            loadOptions.LoadWith<Project>(p => p.Fund);
            loadOptions.LoadWith<Project>(p => p.Type);
            loadOptions.LoadWith<Project>(p => p.FirstLevelSubject);
            loadOptions.LoadWith<Project>(p => p.SecondLevelSubject);
            loadOptions.LoadWith<Project>(p => p.CurrentState);

            loadOptions.LoadWith<Expert>(e => e.User);

            loadOptions.LoadWith<ProjectInfo_Type>(pit => pit.Type);
            loadOptions.LoadWith<ProjectInfo_Type>(pit => pit.Rank);
            loadOptions.LoadWith<ProjectInfo_Type>(pit => pit.SupportCategory);
            loadOptions.LoadWith<ProjectInfo_Type>(pit => pit.SupportField);
            loadOptions.LoadWith<ProjectInfo_Type>(pit => pit.SupportSubField);

            loadOptions.LoadWith<UserPermission>(up => up.Permission);

            database.LoadOptions = loadOptions;

            return database;
        }

        /// <summary>
        /// 执行Sql语句
        /// </summary>
        /// <param name="command">Sql命令</param>
        /// <param name="parameters">参数</param>
        /// <returns>受影响的条数</returns>
        public int Execute(string command, params object[] parameters)
        {
            return base.ExecuteCommand(command, parameters);
        }

        #region Common

        /// <summary>
        /// 取得提示文本数据访问
        /// </summary>
        public IEntityDataAccess<NoticeText> NoticeTexts
        {
            get { return new EntityDataAccessAdapter<NoticeText>(this); }
        }
        /// <summary>
        /// 取得通知数据访问
        /// </summary>
        public IEntityDataAccess<Announcement> Announcements
        {
            get { return new EntityDataAccessAdapter<Announcement>(this); }
        }
        /// <summary>
        /// 取得系统设置数据访问
        /// </summary>
        public IEntityDataAccess<SystemSetting> SystemSettings
        {
            get { return new EntityDataAccessAdapter<SystemSetting>(this); }
        }
        /// <summary>
        /// 取得计数器设置数据访问
        /// </summary>
        public IEntityDataAccess<Count> Counts
        {
            get { return new EntityDataAccessAdapter<Count>(this); }
        }
        /// <summary>
        /// 取得日志数据访问
        /// </summary>
        public IEntityDataAccess<Log> Logs
        {
            get { return new EntityDataAccessAdapter<Log>(this); }
        }

        /// <summary>
        /// 取得外协单位数据访问
        /// </summary>
        public IEntityDataAccess<OutsourcingUnit> OutsourcingUnits
        {
            get { return new EntityDataAccessAdapter<OutsourcingUnit>(this); }
        }
        /// <summary>
        /// 取得外协单位数据访问
        /// </summary>
        public IEntityDataAccess<Outsourcing> Outsourcings
        {
            get { return new EntityDataAccessAdapter<Outsourcing>(this); }
        }
        /// <summary>
        /// 取得一级学科数据访问
        /// </summary>
        public IEntityDataAccess<SubjectFirstLevel> SubjectFirstLevels
        {
            get { return new EntityDataAccessAdapter<SubjectFirstLevel>(this); }
        }
        /// <summary>
        /// 取得二级学科数据访问
        /// </summary>
        public IEntityDataAccess<SubjectSecondLevel> SubjectSecondLevels
        {
            get { return new EntityDataAccessAdapter<SubjectSecondLevel>(this); }
        }
        /// <summary>
        /// 取得事件数据访问
        /// </summary>
        public IEntityDataAccess<Event> Events
        {
            get { return new EntityDataAccessAdapter<Event>(this); }
        }
        /// <summary>
        /// 取得资源数据访问
        /// </summary>
        public IEntityDataAccess<Resource> Resources
        {
            get { return new EntityDataAccessAdapter<Resource>(this); }
        }
        /// <summary>
        /// 取得短信息数据访问
        /// </summary>
        public IEntityDataAccess<Message> Messages
        {
            get { return new EntityDataAccessAdapter<Message>(this); }
        }
        /// <summary>
        /// 取得视图的数据访问
        /// </summary>
        public IEntityDataAccess<View> Views
        {
            get { return new EntityDataAccessAdapter<View>(this); }
        }

        #endregion

        #region Bases

        /// <summary>
        /// 取得基地数据访问
        /// </summary>
        public IEntityDataAccess<Base> Bases
        {
            get { return new EntityDataAccessAdapter<Base>(this); }
        }

        #endregion

        #region Users

        /// <summary>
        /// 取得用户数据访问
        /// </summary>
        public IEntityDataAccess<User> Users
        {
            get { return new EntityDataAccessAdapter<User>(this); }
        }
        /// <summary>
        /// 取得用户角色数据访问
        /// </summary>
        public IEntityDataAccess<UserRole> UserRoles
        {
            get { return new EntityDataAccessAdapter<UserRole>(this); }
        }
        /// <summary>
        /// 取得用户登陆日志数据访问
        /// </summary>
        public IEntityDataAccess<UserLoginLog> UserLoginLogs
        {
            get { return new EntityDataAccessAdapter<UserLoginLog>(this); }
        }
        /// <summary>
        /// 取得用户锁定日志数据访问
        /// </summary>
        public IEntityDataAccess<UserLockLog> UserLockLogs
        {
            get { return new EntityDataAccessAdapter<UserLockLog>(this); }
        }
        /// <summary>
        /// 取得权限数据访问
        /// </summary>
        public IEntityDataAccess<Permission> Permissions
        {
            get { return new EntityDataAccessAdapter<Permission>(this); }
        }
        /// <summary>
        ///取得用户权限访问
        /// </summary>
        public IEntityDataAccess<UserPermission> UserPermissions
        {
            get { return new EntityDataAccessAdapter<UserPermission>(this); }
        }
        /// <summary>
        ///取得用户角色权限访问
        /// </summary>
        public IEntityDataAccess<UserRolePermission> UserRolePermissions
        {
            get { return new EntityDataAccessAdapter<UserRolePermission>(this); }
        }

        #endregion

        #region Experts

        /// <summary>
        /// 取得部门数据访问
        /// </summary>
        public IEntityDataAccess<Department> Departments
        {
            get { return new EntityDataAccessAdapter<Department>(this); }
        }
        /// <summary>
        /// 取得专家数据访问
        /// </summary>
        public IEntityDataAccess<Expert> Experts
        {
            get { return new EntityDataAccessAdapter<Expert>(this); }
        }
        /// <summary>
        /// 取得专家信息历史访问
        /// </summary>
        public IEntityDataAccess<ExpertInfoHistory> ExpertCensorInfos
        {
            get { return new EntityDataAccessAdapter<ExpertInfoHistory>(this); }
        }
        /// <summary>
        /// 取得专家统计信息
        /// </summary>
        public IExpertAchieveStatisticDataAccess ExpertAchieveStatistics
        {
            get { return new ExpertAchieveStatisticDataAccess(this); }
        }

        #endregion

        #region Project

        /// <summary>
        /// 取得项目数据访问
        /// </summary>
        public IEntityDataAccess<Project> Projects
        {
            get { return new EntityDataAccessAdapter<Project>(this); }
        }
        /// <summary>
        /// 取得项目状态历史数据访问
        /// </summary>
        public IEntityDataAccess<ProjectStateHistory> ProjectStateHistories
        {
            get { return new EntityDataAccessAdapter<ProjectStateHistory>(this); }
        }
        /// <summary>
        /// 取得项目成员数据访问
        /// </summary>
        public IEntityDataAccess<ProjectMember> ProjectMemebers
        {
            get { return new EntityDataAccessAdapter<ProjectMember>(this); }
        }
        /// <summary>
        /// 取得项目成员数据访问
        /// </summary>
        public IEntityDataAccess<ProjectQualityPrincipal> ProjectQualityPrincipals
        {
            get { return new EntityDataAccessAdapter<ProjectQualityPrincipal>(this); }
        }

        #endregion

        #region Recovery
        /// <summary>
        /// 取得追缴单数据访问
        /// </summary>
        public IEntityDataAccess<Recovery> Recovery
        {
            get { return new EntityDataAccessAdapter<Recovery>(this); }
        }
        #endregion

        #region Type

        /// <summary>
        /// 取得项目分类信息数据访问
        /// </summary>
        public IEntityDataAccess<ProjectInfo_Type> ProjectInfo_Types
        {
            get { return new EntityDataAccessAdapter<ProjectInfo_Type>(this); }
        }
        /// <summary>
        /// 取得项目等级数据访问
        /// </summary>
        public IEntityDataAccess<ProjectRank> ProjectRanks
        {
            get { return new EntityDataAccessAdapter<ProjectRank>(this); }
        }
        /// <summary>
        /// 取得项目分类数据访问
        /// </summary>
        public IEntityDataAccess<ProjectType> ProjectTypes
        {
            get { return new EntityDataAccessAdapter<ProjectType>(this); }
        }
        /// <summary>
        /// 取得项目资助类型数据访问
        /// </summary>
        public IEntityDataAccess<ProjectSupportCategory> ProjectSupportCategories
        {
            get { return new EntityDataAccessAdapter<ProjectSupportCategory>(this); }
        }
        /// <summary>
        /// 取得项目资助领域数据访问
        /// </summary>
        public IEntityDataAccess<ProjectSupportField> ProjectSupportFields
        {
            get { return new EntityDataAccessAdapter<ProjectSupportField>(this); }
        }
        /// <summary>
        /// 取得项目资助子领域数据访问
        /// </summary>
        public IEntityDataAccess<ProjectSupportSubField> ProjectSupportSubFields
        {
            get { return new EntityDataAccessAdapter<ProjectSupportSubField>(this); }
        }

        ///<summary>
        ///取得管理费比例数据访问
        ///</summary>
        public IEntityDataAccess<ManagementFees> ManagementFees
        {
            get { return new EntityDataAccessAdapter<ManagementFees>(this); }
        }

        #endregion

        #region Fund
        /// <summary>
        /// 取得追缴单信息数据访问
        /// </summary>
        public IEntityDataAccess<Recovery> Recoverys
        {
            get { return new EntityDataAccessAdapter<Recovery>(this); }
        }

        /// <summary>
        /// 取得经费到帐信息数据访问
        /// </summary>
        public IEntityDataAccess<Finance> Finances
        {
            get { return new EntityDataAccessAdapter<Finance>(this); }
        }
        /// <summary>
        /// 取得经费到帐信息副本数据访问
        /// </summary>
        public IEntityDataAccess<FinanceBak> FinanceBaks
        {
            get { return new EntityDataAccessAdapter<FinanceBak>(this); }
        }
        /// <summary>
        /// 取得项目经费信息数据访问
        /// </summary>
        public IEntityDataAccess<ProjectInfo_Fund> ProjectInfo_Funds
        {
            get { return new EntityDataAccessAdapter<ProjectInfo_Fund>(this); }
        }
        /// <summary>
        /// 取得账本号计数器数据访问
        /// </summary>
        public IEntityDataAccess<AccountBookNumberCount> AccountBookNumberCounts
        {
            get { return new EntityDataAccessAdapter<AccountBookNumberCount>(this); }
        }
        /// <summary>
        /// 取得付款计划项目数据访问
        /// </summary>
        public IEntityDataAccess<PayPlanItem> PayPlanItems
        {
            get { return new EntityDataAccessAdapter<PayPlanItem>(this); }
        }
        /// <summary>
        /// 取得经费成员数据访问
        /// </summary>
        public IEntityDataAccess<FundMember> FundMembers
        {
            get { return new EntityDataAccessAdapter<FundMember>(this); }
        }
        /// <summary>
        /// 取得经费下拨数据访问
        /// </summary>
        public IEntityDataAccess<FundDescend> FundDescends
        {
            get { return new EntityDataAccessAdapter<FundDescend>(this); }
        }
        /// <summary>
        /// 取得经费下拨历史状态数据访问
        /// </summary>
        public IEntityDataAccess<FundDescendStateHistory> FundDescendStateHistories
        {
            get { return new EntityDataAccessAdapter<FundDescendStateHistory>(this); }
        }
        /// <summary>
        /// 取得经费分配数据访问
        /// </summary>
        public IEntityDataAccess<FundAllocation> FundAllocations
        {
            get { return new EntityDataAccessAdapter<FundAllocation>(this); }
        }
        /// <summary>
        /// 取得经费下拨历史状态数据访问
        /// </summary>
        public IEntityDataAccess<FundAllocationStateHistory> FundAllocationStateHistories
        {
            get { return new EntityDataAccessAdapter<FundAllocationStateHistory>(this); }
        }
        /// <summary>
        /// 取得凭单数据访问
        /// </summary>
        public IEntityDataAccess<Voucher> Vouchers
        {
            get { return new EntityDataAccessAdapter<Voucher>(this); }
        }
        /// <summary>
        /// 取得经费下拨历史状态数据访问
        /// </summary>
        public IEntityDataAccess<VoucherStateHistory> VoucherStateHistories
        {
            get { return new EntityDataAccessAdapter<VoucherStateHistory>(this); }
        }
        /// <summary>
        /// 取得项目-外协数据访问
        /// </summary>
        public IEntityDataAccess<ProjectOut> ProjectOuts
        {
            get { return new EntityDataAccessAdapter<ProjectOut>(this); }
        }
        /// <summary>
        /// 取得凭单项目-外协分配数据访问
        /// </summary>
        public IEntityDataAccess<VoucherOut> VoucherOuts
        {
            get { return new EntityDataAccessAdapter<VoucherOut>(this); }
        }
        /// <summary>
        /// 取得经费到帐信息--经费下拨
        /// </summary>
        public IEntityDataAccess<FinanceFundDescend> FinanceFundDescends
        {
            get { return new EntityDataAccessAdapter<FinanceFundDescend>(this); }
        }

        /// <summary>
        /// 取得项目外拨预算
        /// </summary>
        public IEntityDataAccess<ProjectOutsourcingBudget> ProjectOutsourcingBudgets
        {
            get { return new EntityDataAccessAdapter<ProjectOutsourcingBudget>(this); }
        }
        #endregion

        #region Document

        /// <summary>
        /// 取得合同数据访问
        /// </summary>
        public IEntityDataAccess<Contract> Contracts
        {
            get { return new EntityDataAccessAdapter<Contract>(this); }
        }
        /// <summary>
        /// 取得文档数据访问
        /// </summary>
        public IEntityDataAccess<Document> Documents
        {
            get { return new EntityDataAccessAdapter<Document>(this); }
        }
        /// <summary>
        /// 取得文档数据模板访问
        /// </summary>
        public IEntityDataAccess<DocumentModel> DocumentModels
        {
            get { return new EntityDataAccessAdapter<DocumentModel>(this); }
        }
        #endregion

        #region Awards

        /// <summary>
        /// 取得奖励数据访问
        /// </summary>
        public IEntityDataAccess<Award> Awards
        {
            get { return new EntityDataAccessAdapter<Award>(this); }
        }
        /// <summary>
        /// 取得获奖人数据访问
        /// </summary>
        public IEntityDataAccess<AwardWinner> AwardWinners
        {
            get { return new EntityDataAccessAdapter<AwardWinner>(this); }
        }
        /// <summary>
        /// 取得获奖文档数据访问
        /// </summary>
        public IEntityDataAccess<AwardDocument> AwardDocuments
        {
            get { return new EntityDataAccessAdapter<AwardDocument>(this); }
        }

        #endregion

        #region Patents

        /// <summary>
        /// 取得专利数据访问
        /// </summary>
        public IEntityDataAccess<Patent> Patents
        {
            get { return new EntityDataAccessAdapter<Patent>(this); }
        }
        /// <summary>
        /// 取得专利发明人数据访问
        /// </summary>
        public IEntityDataAccess<PatentInventer> PatentInventers
        {
            get { return new EntityDataAccessAdapter<PatentInventer>(this); }
        }
        /// <summary>
        /// 取得专利代理机构
        /// </summary>
        public IEntityDataAccess<PatentAgency> PatentAgencys
        {
            get { return new EntityDataAccessAdapter<PatentAgency>(this); }
        }
        #endregion

        #region Performances

        /// <summary>
        /// 取得绩效数据访问
        /// </summary>
        public IEntityDataAccess<Performance> Performances
        {
            get { return new EntityDataAccessAdapter<Performance>(this); }
        }
        /// <summary>
        /// 取得绩效分配数据访问
        /// </summary>
        public IEntityDataAccess<PerformanceAllocation> PerformanceAllocations
        {
            get { return new EntityDataAccessAdapter<PerformanceAllocation>(this); }
        }
        /// <summary>
        /// 取得绩效分配状态历史数据访问
        /// </summary>
        public IEntityDataAccess<PerformanceAllocationStateHistory> PerformanceAllocationStateHistories
        {
            get { return new EntityDataAccessAdapter<PerformanceAllocationStateHistory>(this); }
        }
        /// <summary>
        /// 取得绩效数凭单数据访问
        /// </summary>
        public IEntityDataAccess<PerformanceVoucher> PerformanceVouchers
        {
            get { return new EntityDataAccessAdapter<PerformanceVoucher>(this); }
        }
        /// <summary>
        /// 取得绩效数凭单状态历史数据访问
        /// </summary>
        public IEntityDataAccess<PerformanceVoucherStateHistory> PerformanceVoucherStateHistories
        {
            get { return new EntityDataAccessAdapter<PerformanceVoucherStateHistory>(this); }
        }

        #endregion

        #region Papers

        /// <summary>
        /// 取得论文数据访问
        /// </summary>
        public IEntityDataAccess<Paper> Papers
        {
            get { return new EntityDataAccessAdapter<Paper>(this); }
        }

        /// <summary>
        /// 取得文科论文数据访问
        /// </summary>
        public IEntityDataAccess<LiberalArtsPaper> LiberalArtsPapers
        {
            get { return new EntityDataAccessAdapter<LiberalArtsPaper>(this); }
        }


        /// <summary>
        /// 取得论文作者数据访问
        /// </summary>
        public IEntityDataAccess<PaperAuthor> PaperAuthors
        {
            get { return new EntityDataAccessAdapter<PaperAuthor>(this); }
        }
        /// <summary>
        /// 取得文科论文作者数据访问
        /// </summary>
        public IEntityDataAccess<LiberalArtsPaperAuthor> LiberalArtsPaperAuthors
        {
            get { return new EntityDataAccessAdapter<LiberalArtsPaperAuthor>(this); }
        }
        /// <summary>
        /// 取得论文收录的数据访问
        /// </summary>
        public IEntityDataAccess<PaperIndexed> PaperIndexeds
        {
            get { return new EntityDataAccessAdapter<PaperIndexed>(this); }
        }
        /// <summary>
        /// 取得杂志对应的数据访问
        /// </summary>
        public IEntityDataAccess<Magazine> Magazines
        {
            get { return new EntityDataAccessAdapter<Magazine>(this); }
        }
        /// <summary>
        /// 取得论文杂志信息
        /// </summary>
        public IEntityDataAccess<MagazineInformation> MagazineInformations
        {
            get { return new EntityDataAccessAdapter<MagazineInformation>(this); }
        }
        /// <summary>
        /// 取得论文杂志的学科分类信息
        /// </summary>
        public IEntityDataAccess<MagazineSubjectClass> MagazineSubjectClasses
        {
            get { return new EntityDataAccessAdapter<MagazineSubjectClass>(this); }
        }
        /// <summary>
        /// 取得论文杂志的学科分类的中英文对照表
        /// </summary>
        public IEntityDataAccess<SubjectClassChineseEnglish> SubjectClassChineseEnglishs
        {
            get { return new EntityDataAccessAdapter<SubjectClassChineseEnglish>(this); }
        }
        /// <summary>
        /// 取得杂志任职
        /// </summary>
        public IEntityDataAccess<MagazineOccupation> MagazineOccupations
        {
            get { return new EntityDataAccessAdapter<MagazineOccupation>(this); }
        }
        #endregion

        #region Statistics

        private const string STATISTIC_VIEW_PREFIX = "viewStatistic";

        /// <summary>
        /// 统计
        /// </summary>
        /// <param name="statisticItem">统计项目</param>
        /// <param name="IDArray">筛选ID</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public DataTable Statistic(string statisticItem, int[] IDArray, Dimension columnDimension, Dimension rowDimension)
        {
            if (IDArray.Length == 0)
                return null;

            var viewName = STATISTIC_VIEW_PREFIX + statisticItem;
            var columnColumnName = _GetDimensionColumnName(columnDimension);
            var rowColumnName = _GetDimensionColumnName(rowDimension);

            var command = _GetStatisticCommand(viewName, IDArray, columnColumnName, rowColumnName);
            return _ExecuteAsDataTable(command);
        }
        private string _GetDimensionColumnName(Dimension dimension)
        {
            return dimension.Name + "_" + dimension.Size;
        }

        private string _GetStatisticCommand(string viewName, int[] IDArray, string columnColumnName, string rowColumnName)
        {
            var columnValues = _GetColumnValues(viewName, IDArray, columnColumnName);
            var headColumnName = Srims.Server.Business.Statistics.Statistic.HEAD_COLUMN_NAME;
            var nullRowHead = Srims.Server.Business.Statistics.Statistic.NULL_ROW_HEAD;
            var commandBuilder = new StringBuilder();

            //SELECT & SELECT:Head
            commandBuilder.AppendFormat(" SELECT [{0}] AS [{1}] ", rowColumnName, headColumnName);

            //SELECT:Columns
            foreach (var columnValue in columnValues)
                if (columnValue != nullRowHead)
                    commandBuilder.AppendFormat(" ,SUM(CASE [{0}] WHEN '{1}' THEN Amount ELSE 0 END) AS [{1}] ", columnColumnName, columnValue);

            //SELECT:Null的情况
            if (columnValues.Contains(nullRowHead))
                commandBuilder.AppendFormat(" ,SUM(CASE [{0}] WHEN '{1}' THEN Amount ELSE 0 END) AS [{1}] ", columnColumnName, nullRowHead);

            //FROM
            commandBuilder.AppendFormat(" FROM [{0}] ", viewName);

            //筛选
            if (IDArray != null)
                commandBuilder.AppendFormat(" WHERE ID IN ({0}) ", IDArray.ToString(","));

            //GROUP
            commandBuilder.AppendFormat(" GROUP BY [{0}]", rowColumnName);
            commandBuilder.AppendFormat(" WITH CUBE ");

            //ORDER
            commandBuilder.AppendFormat(" ORDER BY [{0}] ", rowColumnName);

            return commandBuilder.ToString();
        }

        private string[] _GetColumnValues(string viewName, int[] IDArray, string columnColumnName)
        {
            var commandBuilder = new StringBuilder();

            //SELECT & FROM
            commandBuilder.AppendFormat(" SELECT DISTINCT [{0}] FROM [{1}] ", columnColumnName, viewName);

            //筛选
            if (IDArray != null)
                commandBuilder.AppendFormat(" WHERE ID IN ({0}) ", IDArray.ToString(","));

            //ORDER
            commandBuilder.AppendFormat(" ORDER BY [{0}] ", columnColumnName);

            //查询
            var dataTable = this._ExecuteAsDataTable(commandBuilder.ToString());

            //将DataTable转换为字符串列表
            var columnValues = new List<String>();
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                var value = dataTable.Rows[i][0];
                columnValues.Add(value == null ? string.Empty : value.ToString());
            }

            return columnValues.ToArray();
        }

        private DataTable _ExecuteAsDataTable(string command)
        {
            using (var dataAdapter = new SqlDataAdapter(command, _ConnectionString))
            {
                var dataTable = new DataTable();

                dataAdapter.Fill(dataTable);
                return dataTable;
            }
        }

        #endregion
        #region Stamps

        /// <summary>
        /// 取得图章信息
        /// </summary>
        public IEntityDataAccess<Stamp> Stamps
        {
            get { return new EntityDataAccessAdapter<Stamp>(this); }
        }
        /// <summary>
        /// 取得文印状态历史信息
        /// </summary>
        public IEntityDataAccess<StampStateHistory> StampStateHistories
        {
            get { return new EntityDataAccessAdapter<StampStateHistory>(this); }
        }
        /// <summary>
        /// 取得文印材料信息
        /// </summary>
        public IEntityDataAccess<Stuff> Stuffs
        {
            get { return new EntityDataAccessAdapter<Stuff>(this); }
        }
        /// <summary>
        /// 取得文印材料盖章类型信息
        /// </summary>
        public IEntityDataAccess<StuffStamp> StuffStamps
        {
            get { return new EntityDataAccessAdapter<StuffStamp>(this); }
        }
        /// <summary>
        /// 取得图章信息
        /// </summary>
        public IEntityDataAccess<StampApplication> StampApplications
        {
            get { return new EntityDataAccessAdapter<StampApplication>(this); }
        }
        /// <summary>
        /// 取得文印申请类型
        /// </summary>
        public IEntityDataAccess<StampApplicationType> StampApplicationTypes
        {
            get { return new EntityDataAccessAdapter<StampApplicationType>(this); }
        }
        /// <summary>
        /// 取得文印申请类型组
        /// </summary>
        public IEntityDataAccess<StampApplicationTypeGroup> StampApplicationTypeGroups
        {
            get { return new EntityDataAccessAdapter<StampApplicationTypeGroup>(this); }
        }
        /// <summary>
        /// 取得文印申请审核一级权限
        /// </summary>
        public IEntityDataAccess<StampApplicationFirstAdmin> StampApplicationFirstAdmins
        {
            get { return new EntityDataAccessAdapter<StampApplicationFirstAdmin>(this); }
        }
        /// <summary>
        /// 取得文印申请审核2级权限
        /// </summary>
        public IEntityDataAccess<StampApplicationSecondAdmin> StampApplicationSecondAdmins
        {
            get { return new EntityDataAccessAdapter<StampApplicationSecondAdmin>(this); }
        }
        #endregion

        #region IDatabase Members

        /// <summary>
        /// 取得某一个实体的数据访问
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <returns>该实体的数据访问</returns>
        public IEntityDataAccess<T> GetDataAccess<T>() where T : class
        {
            return new EntityDataAccessAdapter<T>(this);
        }

        /// <summary>
        /// 提交数据库变更
        /// </summary>
        public void Submit()
        {
            base.SubmitChanges();
        }

        #endregion


    }
}
