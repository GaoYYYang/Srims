using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Type;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Performances;
using System.Data;
using Srims.Server.Business.Statistics;
using Srims.Server.Business.Stamps;

namespace Srims.Server.Business
{
    /// <summary>
    /// 数据库接口
    /// </summary>
    public interface IDatabase
    {
        /// <summary>
        /// 取得某一个实体的数据访问
        /// </summary>
        /// <typeparam name="T">实体类型</typeparam>
        /// <returns>该实体的数据访问</returns>
        IEntityDataAccess<T> GetDataAccess<T>() where T : class;

        /// <summary>
        /// 提交数据库变更
        /// </summary>
        void Submit();
        /// <summary>
        /// 执行sql语句
        /// </summary>
        /// <param name="command">sql语句</param>
        /// <param name="parameters">参数</param>
        /// <returns></returns>
        int Execute(string command, params object[] parameters);

        #region Common

        /// <summary>
        /// 取得计数器数据访问
        /// </summary>
        IEntityDataAccess<Count> Counts { get; }
        /// <summary>
        /// 取得事件数据访问
        /// </summary>
        IEntityDataAccess<Event> Events { get; }
        /// <summary>
        /// 取得日志数据访问
        /// </summary>
        IEntityDataAccess<Log> Logs { get; }
        /// <summary>
        /// 取得提示文本数据访问
        /// </summary>
        IEntityDataAccess<NoticeText> NoticeTexts { get; }
        /// <summary>
        /// 取得通知数据访问
        /// </summary>
        IEntityDataAccess<Announcement> Announcements { get; }
        /// 取得外协单位数据访问
        /// </summary>
        IEntityDataAccess<OutsourcingUnit> OutsourcingUnits { get; }
        /// 取得外协单位数据访问
        /// </summary>
        IEntityDataAccess<Outsourcing> Outsourcings { get; }
        /// <summary>
        /// 取得资源数据访问
        /// </summary>
        IEntityDataAccess<Resource> Resources { get; }
        /// <summary>
        /// 取得一级学科代码数据访问
        /// </summary>
        IEntityDataAccess<SubjectFirstLevel> SubjectFirstLevels { get; }
        /// <summary>
        /// 取得二级学科代码数据访问
        /// </summary>
        IEntityDataAccess<SubjectSecondLevel> SubjectSecondLevels { get; }
        /// <summary>
        /// 取得系统设置数据访问
        /// </summary>
        IEntityDataAccess<SystemSetting> SystemSettings { get; }
        /// <summary>
        /// 取得短信息
        /// </summary>
        IEntityDataAccess<Message> Messages { get; }
        /// <summary>
        /// 取得视图的数据访问
        /// </summary>
        IEntityDataAccess<View> Views { get; }

        #endregion

        #region Bases

        /// <summary>
        /// 取得基地数据访问
        /// </summary>
        IEntityDataAccess<Base> Bases { get; }

        #endregion

        #region Users

        /// <summary>
        /// 取得用户数据访问
        /// </summary>
        IEntityDataAccess<User> Users { get; }
        /// <summary>
        /// 取得用户角色数据访问
        /// </summary>
        IEntityDataAccess<UserRole> UserRoles { get; }
        /// <summary>
        /// 取得用户登陆日志数据访问
        /// </summary>
        IEntityDataAccess<UserLoginLog> UserLoginLogs { get; }
        /// <summary>
        /// 取得用户锁定日志数据访问
        /// </summary>
        IEntityDataAccess<UserLockLog> UserLockLogs { get; }
        /// <summary>
        /// 取得权限
        /// </summary>
        IEntityDataAccess<Permission> Permissions { get; }
        /// <summary>
        /// 取得用户权限
        /// </summary>
        IEntityDataAccess<UserPermission> UserPermissions { get; }
        /// <summary>
        /// 取得角色权限
        /// </summary>
        IEntityDataAccess<UserRolePermission> UserRolePermissions { get; }

        #endregion

        #region Experts

        /// <summary>
        /// 取得部门数据访问
        /// </summary>
        IEntityDataAccess<Department> Departments { get; }
        /// <summary>
        /// 取得专家数据访问
        /// </summary>
        IEntityDataAccess<Expert> Experts { get; }
        /// <summary>
        /// 取得专家的动态信息
        /// </summary>
        IEntityDataAccess<ExpertInfoHistory> ExpertCensorInfos { get; }
        /// <summary>
        /// 取得专家的统计信息
        /// </summary>
        IExpertAchieveStatisticDataAccess ExpertAchieveStatistics { get; }

        #endregion

        #region Projcts

        /// <summary>
        /// 取得项目数据访问
        /// </summary>
        IEntityDataAccess<Project> Projects { get; }
        /// <summary>
        /// 取得项目状态历史数据访问
        /// </summary>
        IEntityDataAccess<ProjectStateHistory> ProjectStateHistories { get; }
        /// <summary>
        /// 取得项目成员数据访问
        /// </summary>
        IEntityDataAccess<ProjectMember> ProjectMemebers { get; }
        /// <summary>
        /// 取得项目质量负责人数据访问
        /// </summary>
        IEntityDataAccess<ProjectQualityPrincipal> ProjectQualityPrincipals { get; }

        #endregion

        #region Documents

        /// <summary>
        /// 取得合同数据访问
        /// </summary>
        IEntityDataAccess<Contract> Contracts { get; }
        /// <summary>
        /// 取得文档数据访问
        /// </summary>
        IEntityDataAccess<Document> Documents { get; }
        /// <summary>
        /// 取得文档模板数据访问
        /// </summary>
        IEntityDataAccess<DocumentModel> DocumentModels { get; }

        #endregion

        #region Type

        /// <summary>
        /// 取得项目分类信息数据访问
        /// </summary>
        IEntityDataAccess<ProjectInfo_Type> ProjectInfo_Types { get; }
        /// <summary>
        /// 取得项目等级数据访问
        /// </summary>
        IEntityDataAccess<ProjectRank> ProjectRanks { get; }
        /// <summary>
        /// 取得项目分类数据访问
        /// </summary>
        IEntityDataAccess<ProjectType> ProjectTypes { get; }
        /// <summary>
        /// 取得项目资助类型数据访问
        /// </summary>
        IEntityDataAccess<ProjectSupportCategory> ProjectSupportCategories { get; }
        /// <summary>
        /// 取得项目资助领域数据访问
        /// </summary>
        IEntityDataAccess<ProjectSupportField> ProjectSupportFields { get; }
        /// <summary>
        /// 取得项目资助子领域数据访问
        /// </summary>
        IEntityDataAccess<ProjectSupportSubField> ProjectSupportSubFields { get; }

        /// <summary>
        /// 取得管理费收取类型数据访问
        /// </summary>
        IEntityDataAccess<ManagementFees> ManagementFees { get; }

        #endregion

        #region Fund

        /// <summary>
        /// 取得经费到帐信息数据访问
        /// </summary>
        IEntityDataAccess<Finance> Finances { get; }
        /// <summary>
        /// 取得经费到帐信息副本数据访问
        /// </summary>
        IEntityDataAccess<FinanceBak> FinanceBaks { get; }
        /// <summary>
        /// 取得项目经费信息数据访问
        /// </summary>
        IEntityDataAccess<ProjectInfo_Fund> ProjectInfo_Funds { get; }
        /// <summary>
        /// 取得账本号计数器数据访问
        /// </summary>
        IEntityDataAccess<AccountBookNumberCount> AccountBookNumberCounts { get; }
        /// <summary>
        /// 取得付款计划项目数据访问
        /// </summary>
        IEntityDataAccess<PayPlanItem> PayPlanItems { get; }
        /// <summary>
        /// 取得经费成员数据访问
        /// </summary>
        IEntityDataAccess<FundMember> FundMembers { get; }
        /// <summary>
        /// 取得经费下拨数据访问
        /// </summary>
        IEntityDataAccess<FundDescend> FundDescends { get; }
        /// <summary>
        /// 取得经费下拨状态历史数据访问
        /// </summary>
        IEntityDataAccess<FundDescendStateHistory> FundDescendStateHistories { get; }
        /// <summary>
        /// 取得经费分配数据访问
        /// </summary>
        IEntityDataAccess<FundAllocation> FundAllocations { get; }
        /// <summary>
        /// 取得经费分配状态历史数据访问
        /// </summary>
        IEntityDataAccess<FundAllocationStateHistory> FundAllocationStateHistories { get; }
        /// <summary>
        /// 取得凭单数据访问
        /// </summary>
        IEntityDataAccess<Voucher> Vouchers { get; }
        /// <summary>
        /// 取得追缴单数据访问
        /// </summary>
        IEntityDataAccess<Recovery> Recovery { get; }
        /// <summary>
        /// 取得凭单状态历史数据访问
        /// </summary>
        IEntityDataAccess<VoucherStateHistory> VoucherStateHistories { get; }
        /// <summary>
        /// 取得项目-外协数据访问
        /// </summary>
        IEntityDataAccess<ProjectOut> ProjectOuts { get; }
        /// <summary>
        /// 取得凭单项目-外协分配数据访问
        /// </summary>
        IEntityDataAccess<VoucherOut> VoucherOuts { get; }
        /// <summary>
        /// 取得经费到帐信息--经费下拨
        /// </summary>
        IEntityDataAccess<FinanceFundDescend> FinanceFundDescends { get; }
        /// <summary>
        /// 取得项目外拨预算
        /// </summary>
        IEntityDataAccess<ProjectOutsourcingBudget> ProjectOutsourcingBudgets { get; }

        #endregion

        #region Awards

        /// <summary>
        /// 取得奖励数据访问
        /// </summary>
        IEntityDataAccess<Award> Awards { get; }
        /// <summary>
        /// 取得获奖人数据访问
        /// </summary>
        IEntityDataAccess<AwardWinner> AwardWinners { get; }
        /// <summary>
        /// 取得获奖文档数据访问
        /// </summary>
        IEntityDataAccess<AwardDocument> AwardDocuments { get; }

        #endregion

        #region Patents

        /// <summary>
        /// 取得专利数据访问
        /// </summary>
        IEntityDataAccess<Patent> Patents { get; }
        /// <summary>
        /// 取得专利发明人数据访问
        /// </summary>
        IEntityDataAccess<PatentInventer> PatentInventers { get; }
        /// <summary>
        /// 取得专利发明人数据访问
        /// </summary>
        IEntityDataAccess<PatentAgency> PatentAgencys { get; }

        #endregion

        #region Performance

        /// <summary>
        /// 取得绩效数据访问
        /// </summary>
        IEntityDataAccess<Performance> Performances { get; }
        /// <summary>
        /// 取得绩效分配数据访问
        /// </summary>
        IEntityDataAccess<PerformanceAllocation> PerformanceAllocations { get; }
        /// <summary>
        /// 取得绩效分配状态历史数据访问
        /// </summary>
        IEntityDataAccess<PerformanceAllocationStateHistory> PerformanceAllocationStateHistories { get; }
        /// <summary>
        /// 取得绩效凭单数据访问
        /// </summary>
        IEntityDataAccess<PerformanceVoucher> PerformanceVouchers { get; }
        /// <summary>
        /// 取得绩效凭单状态历史数据访问
        /// </summary>
        IEntityDataAccess<PerformanceVoucherStateHistory> PerformanceVoucherStateHistories { get; }

        #endregion

        #region Papers

        /// <summary>
        /// 取得论文数据访问
        /// </summary>
        IEntityDataAccess<Paper> Papers { get; }
        /// <summary>
        /// 取得文科论文数据访问
        /// </summary>
        IEntityDataAccess<LiberalArtsPaper> LiberalArtsPapers { get; }
        /// <summary>
        /// 取得论文作者数据访问
        /// </summary>
        IEntityDataAccess<PaperAuthor> PaperAuthors { get; }
        /// <summary>
        /// 取得文科论文作者数据访问
        /// </summary>
        IEntityDataAccess<LiberalArtsPaperAuthor> LiberalArtsPaperAuthors { get; }
        /// <summary>
        /// 取得论文收录数据访问
        /// </summary>
        IEntityDataAccess<PaperIndexed> PaperIndexeds { get; }
        /// <summary>
        /// 取得论文对应的期刊数据访问
        /// </summary>
        IEntityDataAccess<Magazine> Magazines { get; }
        /// <summary>
        /// 取得期刊的信息数据访问
        /// </summary>
        IEntityDataAccess<MagazineInformation> MagazineInformations { get; }
        /// <summary>
        /// 取得期刊的学科分类数据访问
        /// </summary>
        IEntityDataAccess<MagazineSubjectClass> MagazineSubjectClasses { get; }
        /// <summary>
        /// 取得期刊学科分类的中英文对照表
        /// </summary>
        IEntityDataAccess<SubjectClassChineseEnglish> SubjectClassChineseEnglishs { get; }
        /// <summary>
        /// 取得期刊任职的数据访问
        /// </summary>
        IEntityDataAccess<MagazineOccupation> MagazineOccupations { get; }

        #endregion

        #region Statistic

        /// <summary>
        /// 统计
        /// </summary>
        /// <param name="statisticItem">统计项目</param>
        /// <param name="IDArray">筛选ID</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        DataTable Statistic(string statisticItem, int[] IDArray, Dimension columnDimension, Dimension rowDimension);

        #endregion
        #region Stamps
        /// <summary>
        /// 取得图章数据访问
        /// </summary>
        IEntityDataAccess<Stamp> Stamps { get; }
        /// <summary>
        /// 取得文印申请类型
        /// </summary>
        IEntityDataAccess<StampApplicationType> StampApplicationTypes { get; }
         /// <summary>
        /// 取得文印申请类型组
        /// </summary>
        IEntityDataAccess<StampApplicationTypeGroup> StampApplicationTypeGroups { get; }
        
        /// <summary>
        /// 取得文印申请一级审核权限
        /// </summary>
        IEntityDataAccess<StampApplicationFirstAdmin> StampApplicationFirstAdmins { get; }
        /// <summary>
        /// 取得文印申请二级审核权限
        /// </summary>
        IEntityDataAccess<StampApplicationSecondAdmin> StampApplicationSecondAdmins { get; }
        /// <summary>
        /// 取得文印状态历史数据访问
        /// </summary>
        IEntityDataAccess<StampStateHistory> StampStateHistories { get; }
        /// <summary>
        /// 取得文印材料数据访问
        /// </summary>
        IEntityDataAccess<Stuff> Stuffs { get; }
        /// <summary>
        /// 取得文印材料盖章类型数据访问
        /// </summary>
        IEntityDataAccess<StuffStamp> StuffStamps { get; }
        /// <summary>
        /// 取得文印申请数据访问
        /// </summary>
        IEntityDataAccess<StampApplication> StampApplications { get; }
        #endregion
    }
}
