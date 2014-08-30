using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 项目权限类型
    /// </summary>
    public enum PermissionItem
    {
        /// <summary>
        ///  基本权限，包括短消息、修改密码等
        /// </summary>
        Base = 0,
        /// <summary>
        /// 管理经费信息
        /// </summary>
        ManageFund = 2,
        /// <summary>
        /// 管理分类信息
        /// </summary>
        ManageType = 3,
        /// <summary>
        /// 结项项目管理
        /// </summary>
        ManageFinishProject = 4,
        /// <summary>
        /// 论文信息管理
        /// </summary>
        ManagePaper = 5,
        /// <summary>
        /// 专利信息管理
        /// </summary>
        ManagePatent = 6,
        /// <summary>
        /// 理科奖励信息管理
        /// </summary>
        ManageScienceAward = 7,
        /// <summary>
        /// 基地信息管理
        /// </summary>
        ManageBase = 8,
        /// <summary>
        /// 通知信息管理
        /// </summary>
        ManageAnnouncement = 9,
        /// <summary>
        /// 管理所有横向项目的权限
        /// </summary>
        ManageAllHorizontalProject = 10,
        /// <summary>
        /// 管理所有纵向项目的权限
        /// </summary>
        ManageAllVerticalProject = 11,
        /// <summary>
        /// 财务管理权限
        /// </summary>
        ManageFinance = 12,
        /// <summary>
        /// 管理某一个类别的横向项目
        /// </summary>
        ManageHorizontalProjectByType = 13,
        /// <summary>
        /// 管理某一个类别的纵向项目
        /// </summary>
        ManageVerticalProjectByType = 14,
        /// <summary>
        /// 学科管理
        /// </summary>
        MangageSubjectLevel = 17,
        /// <summary>
        /// 统计
        /// </summary>
        Statistic = 18,
        /// <summary>
        /// 导出财务数据
        /// </summary>
        ExportFinanceData = 19,
        /// <summary>
        /// 专家查看权限
        /// </summary>
        ExpertShow = 20,
        /// <summary>
        /// 专家编辑权限
        /// </summary>
        ExpertEdit = 21,
        /// <summary>
        /// 管理文印
        /// </summary>
        ManageStamp = 22,
        /// <summary>
        /// 管理用印反馈
        /// </summary>
        ManageStampFeedback = 23,
        /// <summary>
        /// 专家联系方式管理权限
        /// </summary>
        ExpertLinkWayEdit = 24,
        /// <summary>
        /// 重置用户密码
        /// </summary>
        ResetUserPassword = 25,
        /// <summary>
        /// 经费分配数据纠错权限
        /// </summary>
        FundAllocationDataCorrection = 26,
        /// <summary>
        /// 文科奖励管理权限
        /// </summary>
        ManageLiteralAward = 27,
       /// <summary>
       /// 文印部门负责人权限
       /// </summary>
        StampDepartmentPrincipal=28,

    }
}
