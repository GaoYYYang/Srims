using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 基地日志类型
    /// </summary>
    public enum LogType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 添加基地
        /// </summary>
        BaseAdd = 1,
        /// <summary>
        /// 修改基地
        /// </summary>
        BaseEdit = 2,
        /// <summary>
        /// 删除基地
        /// </summary>
        BaseDelete = 3,



        /// <summary>
        /// 添加奖励
        /// </summary>
        AwardAdd = 4,
        /// <summary>
        /// 修改奖励
        /// </summary>
        AwardEdit = 5,
        /// <summary>
        /// 删除奖励
        /// </summary>
        AwardDelete = 6,
        /// <summary>
        /// 添加专利
        /// </summary>
        PatentAdd = 7,
        /// <summary>
        /// 修改专利
        /// </summary>
        PatentEdit = 8,
        /// <summary>
        /// 删除专利
        /// </summary>
        PatentDelete = 9,
        /// <summary>
        /// 添加论文
        /// </summary>
        PaperAdd = 10,
        /// <summary>
        /// 修改论文
        /// </summary>
        PaperEdit = 11,
        /// <summary>
        /// 删除论文
        /// </summary>
        PaperDelete = 12,


        /// <summary>
        /// 新经费到帐
        /// </summary>
        FinanceNew = 13,
        /// <summary>
        /// 编辑经费到帐信息
        /// </summary>
        FinanceEdit = 14,
        /// <summary>
        /// 删除经费到帐信息
        /// </summary>
        FinanceDelete = 15,
        /// <summary>
        /// 经费下拨
        /// </summary>
        FundDescend = 16,

        /// <summary>
        /// 删除经费下拨
        /// </summary>
        FinanceDescendDelete = 17,

        /// <summary>
        /// 提交经费分配
        /// </summary>
        FundAllocationSubmit = 18,
        /// <summary>
        /// 经费分配审核通过
        /// </summary>
        FundAllocationCensorPass = 19,
        /// <summary>
        /// 经费分配审核驳回
        /// </summary>
        FundAllocationCensorReject = 20,
        /// <summary>
        /// 经费分配作废
        /// </summary>
        FundAllocationCancel = 21,


        /// <summary>
        /// 凭单打印
        /// </summary>
        VoucherPrint = 22,
        /// <summary>
        /// 凭单打印计数归零
        /// </summary>
        VoucherSetPrint = 23,

        ///// <summary>
        ///// 添加项目等级
        ///// </summary>
        //ProjectRankNew = 24,
        ///// <summary>
        ///// 修改项目等级
        ///// </summary>
        //ProjectRankEdit = 25,
        ///// <summary>
        ///// 删除项目等级
        ///// </summary>
        //ProjectRankDelete = 26,
        /// <summary>
        /// 添加项目类型
        /// </summary>
        ProjectTypeNew = 27,
        /// <summary>
        /// 编辑项目类型
        /// </summary>
        ProjectTypeEdit = 28,
        /// <summary>
        /// 删除项目类型
        /// </summary>
        ProjectTypeDelete = 29,
        /// <summary>
        /// 添加项目资助类别
        /// </summary>
        ProjectSupportCategoryNew = 30,
        /// <summary>
        /// 修改项目资助类别
        /// </summary>
        ProjectSupportCategoryEdit = 31,
        /// <summary>
        /// 删除项目资助类别
        /// </summary>
        ProjectSupportCategoryDelete = 32,
        /// <summary>
        /// 添加项目资助领域
        /// </summary>
        ProjectSupportFieldNew = 33,
        /// <summary>
        /// 删除项目资助领域
        /// </summary>
        ProjectSupportFiedDelete = 34,
        /// <summary>
        /// 修改项目资助领域
        /// </summary>
        ProjectSupportFieldEdit = 35,
        /// <summary>
        /// 添加项目资助子领域
        /// </summary>
        ProjectSupportSubFieldNew = 36,
        /// <summary>
        /// 修改项目资助子领域
        /// </summary>
        ProjectSupportSubFieldEdit = 37,
        /// <summary>
        /// 删除项目资助子领域
        /// </summary>
        ProjectSupportSubFieldDelete = 38,

        ///// <summary>
        ///// 提交项目主合同
        ///// </summary>
        //ProjectContractSubmit = 39,
        ///// <summary>
        ///// 提交项目外协合同
        ///// </summary>
        //ProjectOutContractSubmit = 40,
        ///// <summary>
        ///// 项目合同审核通过
        ///// </summary>
        //ProjectContractCensorPass = 41,
        ///// <summary>
        ///// 项目合同设和驳回
        ///// </summary>
        //ProjectContractCensorReject = 42,

        /// <summary>
        /// 删除项目合同
        /// </summary>
        ProjectContractDelete = 43,
        /// <summary>
        /// 提交项目文档
        /// </summary>
        ProjectDocumentSubmit = 44,
        /// <summary>
        /// 催缴项目文档
        /// </summary>
        ProjectDocumentRequire = 45,
        /// <summary>
        /// 项目文档审核通过
        /// </summary>
        ProjectDocumentCensorPass = 46,
        /// <summary>
        /// 项目文档审核驳回
        /// </summary>
        ProjectDocumentCensorReject = 47,
        /// <summary>
        /// 删除项目文档
        /// </summary>
        ProjectDocumentDelete = 48,

        /// <summary>
        /// 新建项目
        /// </summary>
        ProjectNew = 49,
        ///// <summary>
        ///// 编辑项目信息
        ///// </summary>
        //ProjectInformationEdit = 50,
        /// <summary>
        /// 新建项目成员
        /// </summary>
        ProjectMemberNew = 51,
        /// <summary>
        /// 编辑项目成员
        /// </summary>
        ProjectMemberEdit = 52,
        /// <summary>
        /// 删除项目成员
        /// </summary>
        ProjectMemberDelete = 53,

        /// <summary>
        /// 提交项目立项申请
        /// </summary>
        ProjectStartSubmit = 54,
        /// <summary>
        /// 撤销项目立项申请
        /// </summary>
        ProjectStartCancel = 55,
        /// <summary>
        /// 通过项目立项申请
        /// </summary>
        ProjectStartPass = 56,
        /// <summary>
        /// 驳回项目立项申请
        /// </summary>
        ProjectStartReject = 57,
        /// <summary>
        /// 提交项目结项申请
        /// </summary>
        ProjectEndSubmit = 58,
        /// <summary>
        /// 撤销项目结项申请
        /// </summary>
        ProjectEndCancel = 59,
        /// <summary>
        /// 通过项目结项申请
        /// </summary>
        ProjectEndPass = 60,
        /// <summary>
        /// 驳回项目结项申请
        /// </summary>
        ProjectEndReject = 61,
        /// <summary>
        /// 删除项目
        /// </summary>
        ProjectDelete = 62,


        /// <summary>
        /// 新建用户
        /// </summary>
        UserNew = 63,
        /// <summary>
        /// 编辑用户信息
        /// </summary>
        UserEdit = 64,
        /// <summary>
        /// 删除用户
        /// </summary>
        UserDelete = 65,


        /// <summary>
        /// 专家自动导入
        /// </summary>
        ExpertAutoImport = 66,
        /// <summary>
        /// 经费自动导入
        /// </summary>
        FundAutoImport = 67,
        /// <summary>
        /// 专利费自动提醒
        /// </summary>
        PatentFeeAutoRemind = 68,
        /// <summary>
        /// 清空项目的账本号
        /// </summary>
        ClearProjectAccountBookNumber = 69,


        /// <summary>
        /// 添加获奖人
        /// </summary>
        AwardWinnerAdd = 70,
        /// <summary>
        /// 编辑获奖人
        /// </summary>
        AwardWinnerEdit = 71,
        /// <summary>
        /// 删除获奖人
        /// </summary>
        AwardWinnerDelete = 72,
        /// <summary>
        /// 添加专利发明者
        /// </summary>
        PatentInventerAdd = 73,
        /// <summary>
        /// 编辑专利发明者
        /// </summary>
        PatentInventerEdit = 74,
        /// <summary>
        /// 删除专利发明者
        /// </summary>
        PatentInventerDelete = 75,
        /// <summary>
        /// 添加论文作者
        /// </summary>
        PaperAuthorAdd = 76,
        /// <summary>
        /// 编辑论文作者
        /// </summary>
        PaperAuthorEdit = 77,
        /// <summary>
        /// 删除论文作者
        /// </summary> 
        PaperAuthorDelete = 78,


        /// <summary>
        /// 添加专利代理机构
        /// </summary>
        PatentAgencyAdd = 82,
        /// <summary>
        /// 编辑专利代理机构
        /// </summary>
        PatentAgencyEdit = 83,
        /// <summary>
        /// 删除专利代理机构
        /// </summary>
        PatentAgencyDelete = 84,
        /// <summary>
        /// 添加杂志
        /// </summary>
        MagazineAdd = 85,
        /// <summary>
        /// 编辑杂志
        /// </summary>
        MagazineEdit = 86,
        /// <summary>
        /// 删除杂志
        /// </summary>
        MagazineDelete = 87,
        /// <summary>
        /// 添加杂志信息
        /// </summary>
        MagazineInformationAdd = 88,
        /// <summary>
        /// 编辑杂志信息
        /// </summary>
        MagazineInformationEdit = 89,
        /// <summary>
        ///删除杂志信息
        /// </summary>
        MagazineInformationDelete = 90,
        /// <summary>
        /// 新建通知
        /// </summary>
        AnnouncementAdd = 91,
        /// <summary>
        /// 编辑通知
        /// </summary>
        AnnouncementEdit = 92,
        /// <summary>
        /// 删除通知
        /// </summary>
        AnnouncementDelete = 93,
        /// <summary>
        /// 通知置顶
        /// </summary>
        AnnouncementSetTop = 94,
        /// <summary>
        /// 取消通知置顶
        /// </summary>
        AnnouncementCancelTop = 95,
        /// <summary>
        /// 设置通知过期
        /// </summary>
        AnnouncementSetOverdue = 96,
        /// <summary>
        /// 取消设置通知过期
        /// </summary>
        AnnouncementCancelOverdue = 97,
        /// <summary>
        /// 添加杂志学科分类信息
        /// </summary>
        MagazineSubjectClassAdd = 98,
        /// <summary>
        /// 删除杂志学科分类信息
        /// </summary>
        MagazineSubjectClassDelete = 99,
        /// <summary>
        /// 添加论文收录信息
        /// </summary>
        PaperIndexAdd = 100,
        /// <summary>
        /// 删除论文收录信息
        /// </summary>
        PaperIndexDelete = 101,
        /// <summary>
        /// 添加一级学科分类
        /// </summary>
        SubjectFirstLevelAdd = 102,
        /// <summary>
        /// 编辑一级学科分类
        /// </summary>
        SubjectFirstLevelEdit = 103,
        /// <summary>
        /// 添加二级学科分类
        /// </summary>
        SubjectSecondLevelAdd = 104,
        /// <summary>
        /// 编辑二级学科分类
        /// </summary>
        SubjectSecondLevelEdit = 105,
        /// <summary>
        /// 编辑系统设置
        /// </summary>
        SystemSettingEdit = 106,
        /// <summary>
        /// 添加学院
        /// </summary>
        DepartmentAdd = 107,
        /// <summary>
        /// 编辑学院
        /// </summary>
        DepartmentEdit = 108,
        /// <summary>
        /// 上传项目合同
        /// </summary>
        UpLoadContract = 109,
        /// <summary>
        /// 发送邮件
        /// </summary>
        SendEmail = 111,
        /// <summary>
        /// 上传文档模板
        /// </summary>
        UpLoadDocumentModel = 112,
        /// <summary>
        /// 删除文档模板
        /// </summary>
        DeleteDocumentModel = 113,

        /// <summary>
        /// 删除催缴文档记录
        /// </summary>
        RequiredDocumentRecordDelete = 116,
        /// <summary>
        /// 编辑项目
        /// </summary>
        ProjectEdit = 117,
        /// <summary>
        /// 撤销项目
        /// </summary>
        ProjectWithDraw = 118,
        /// <summary>
        /// 终止项目
        /// </summary>
        ProjectTerminate = 119,
        /// <summary>
        /// 设置项目委托负责人
        /// </summary>
        SetDelegatePrincipal = 120,
        /// <summary>
        /// 取消项目委托负责人
        /// </summary>
        ClearDelegatePrincipal = 121,
        /// <summary>
        /// 新建项目经费的发票
        /// </summary>
        FinanceInvoiceNew = 122,
        /// <summary>
        /// 删除项目经费的发票
        /// </summary>
        FinanceInvoiceDelete = 123,
        /// <summary>
        /// 新建借款
        /// </summary>
        fundDescendLent = 124,
        /// <summary>
        /// 经费下拨审核通过
        /// </summary>
        FinanceDescendCensorPass = 125,
        /// <summary>
        /// 经费下拨审核驳回
        /// </summary>
        FinanceDescendCensorReject = 126,
        /// <summary>
        /// 经费分配撤销
        /// </summary>
        FundAllocationUndoSubmit = 127,


        /// <summary>
        /// 新建经费到账计划
        /// </summary>
        PayPlanNew = 128,
        /// <summary>
        /// 编辑经费到账计划
        /// </summary>
        PayPlanEdit = 129,
        /// <summary>
        /// 删除经费到账计划
        /// </summary>
        PayPlanDelete = 130,

        /// <summary>
        /// 财务分配
        /// </summary>
        VoucherAllocate = 131,
        /// <summary>
        /// 新建凭单
        /// </summary>
        VoucherNew = 132,
        /// <summary>
        /// 编辑凭单
        /// </summary>
        VoucherEdit = 133,
        /// <summary>
        /// 删除凭单
        /// </summary>
        VoucherDelete = 134,
        /// <summary>
        /// 修改凭单账本号
        /// </summary>
        SetAccountBookNumber = 135,
        /// <summary>
        /// 归还欠款
        /// </summary>
        FinanceFundDescend = 136,
        /// <summary>
        /// 删除还款记录
        /// </summary>
        FinanceFundDescendDelete = 137,
        /// <summary>
        /// 凭单状态设置为签收
        /// </summary>
        VoucherSignIn = 138,
        /// <summary>
        /// 凭单状态设置为退回
        /// </summary>
        VoucherReturn = 139,
        /// <summary>
        /// 凭单状态设置为取消分配
        /// </summary>
        VoucherCancelAllocate = 140,

        /// <summary>
        /// 用户登录锁定
        /// </summary>
        UserLockLog = 141,
        /// <summary>
        /// 权限保存
        /// </summary>
        SaveForPermission = 142,
        /// <summary>
        /// 保存用户院系相关授权
        /// </summary>
        SaveForCollegeRelatedPermission = 143,
        /// <summary>
        /// 保存用户临时授权
        /// </summary>
        SaveForTemporaryAuthorizationPermissions = 144,
        /// <summary>
        /// 取消临时授权
        /// </summary>
        DeleteTemporaryAuthorizationPermissions = 145,
        /// <summary>
        /// 删除用户所有权限
        /// </summary>
        DeleteAllPermissions = 146,
        /// <summary>
        /// 解除用户登录锁定
        /// </summary>
        CancelUserLockLog = 147,

        /// <summary>
        /// 提交文印
        /// </summary>
        SubmitStamp = 148,
        /// <summary>
        /// 文印审核通过
        /// </summary>
        CensorPassStamp = 149,
        /// <summary>
        /// 文印审核驳回
        /// </summary>
        CensorRejectStamp = 150,
        /// <summary>
        /// 文印已盖章
        /// </summary>
        StampStamp = 151,
        /// <summary>
        /// 删除印章
        /// </summary>
        DeleteStamp = 152,
        /// <summary>
        /// 添加印章
        /// </summary>
        AddStamp = 153,
        /// <summary>
        /// 修改印章
        /// </summary>
        EditStamp = 154,



        /// <summary>
        /// 新建盖章材料
        /// </summary>
        NewStampStuff = 155,
        /// <summary>
        /// 编辑盖章材料
        /// </summary>
        EditStampStuff = 156,
        /// <summary>
        /// 删除盖章材料
        /// </summary>
        DeleteStampStuff = 157,

        /// <summary>
        /// 新建材料章型
        /// </summary>
        NewStampType = 158,
        /// <summary>
        /// 编辑材料章型
        /// </summary>
        EditStampType = 159,
        /// <summary>
        /// 删除材料章型
        /// </summary>
        DeleteStampType = 160,
        /// <summary>
        /// 论文导入
        /// </summary>
        paperImport = 161,
        /// <summary>
        /// 清空专家账本号
        /// </summary>
        ClearExpertAccountNumber = 162,
        /// <summary>
        /// 上传奖励文档
        /// </summary>
        AwardDocumentSubmit = 163,
        /// <summary>
        /// 删除奖励文档
        /// </summary>
        AwardDocumentDelete = 164,
        /// <summary>
        /// 奖励文档审核通过
        /// </summary>
        AwardDocumentCensorPass = 165,
        /// <summary>
        /// 奖励文档审核驳回
        /// </summary>
        AwardDocumentCensorReject = 166,
        /// <summary>
        /// 新建文印状态历史
        /// </summary>
        NewStampStateHistory = 167,
        /// <summary>
        /// 审核通过项目的合同
        /// </summary>
        CensorPassProjectContract = 168,
        /// <summary>
        /// 审核驳回项目合同
        /// </summary>
        CensorRejectProjectContract = 169,

        /// <summary>
        /// 项目结项提醒
        /// </summary>
        ProjectEndRemind = 170,
        /// <summary>
        /// 凭单打印提醒
        /// </summary>
        VoucherPrintRemind = 171,
        /// <summary>
        /// 经费分配提醒
        /// </summary>
        FundAllocationRemind = 172,
        /// <summary>
        /// 管理员工作提醒
        /// </summary>
        AdminWorkRemind = 173,
        /// <summary>
        /// 删除专家（逻辑删除）
        /// </summary>
        ExpertDelete = 174,
        /// <summary>
        /// 杂志导入
        /// </summary>
        MagazineImport = 175,
        /// <summary>
        /// 杂志年度信息导入
        /// </summary>
        MagazineInformationImport = 176,
        /// <summary>
        /// 专家导入
        /// </summary>
        ExpertImport = 177,
        /// <summary>
        /// 专家审核提醒
        /// </summary>
        ExpertCensorRemind = 178,
        /// <summary>
        /// 凭单已经打印提醒
        /// </summary>
        VoucherPrintedRemind = 179,
        /// <summary>
        /// 审核纵向项目提醒
        /// </summary>
        CensorVerticalProjectRemind = 180,
        /// <summary>
        /// 审核横向项目提醒
        /// </summary>
        CensorHorizontalProjectRemind = 181,
        /// <summary>
        /// 审核文档提醒
        /// </summary>
        CensorDocumentRemaind = 182,
        /// <summary>
        /// 审核合同提醒
        /// </summary>
        CensorContractRemaind = 183,
        /// <summary>
        /// 审核经费分配提醒
        /// </summary>
        CensorFundAllocationRemaind = 184,
        /// <summary>
        /// 审核项目立项提醒
        /// </summary>
        CensorProjectRemaind = 185,
        /// <summary>
        /// 审核经费下拨
        /// </summary>
        CensorFundDescendRemaind = 186,
        /// <summary>
        /// 文科项目经费导入
        /// </summary>
        ArtsImport = 177,
        /// <summary>
        /// 文印部门审核通过
        /// </summary>
        DepartmentCensorPassStamp = 149,
        /// <summary>
        /// 文印部门审核驳回
        /// </summary>
        DepartmentCensorRejectStamp = 150,
        /// <summary>
        /// 邮件发送失败
        /// </summary>
        EmailSendFail = 151,

        /// <summary>
        /// 添加管理费收取类别
        /// </summary>
        ManagementFeeNew = 152,
        /// <summary>
        /// 编辑管理费类别
        /// </summary>
        ManagementFeeEdit = 153,
        /// <summary>
        /// 删除管理费类别
        /// </summary>
        ManagementDelete = 154,
        /// <summary>
        /// 添加外协单位
        /// </summary>
        OutsourcingAdd = 155,
        /// <summary>
        /// 编辑外协单位
        /// </summary>
        OutsourcingEdit = 156,
        /// <summary>
        /// 删除外协单位
        /// </summary>
        OutsourcingDelete = 157,
        /// <summary>
        /// 审核外协单位
        /// </summary>
        OutsourcingVerfy = 158,

        /// <summary>
        /// 提交绩效分配
        /// </summary>
        PerformanceAllocationSubmit = 159,
        /// <summary>
        /// 绩效分配审核通过
        /// </summary>
        PerformanceAllocationCensorPass = 160,
        /// <summary>
        /// 绩效分配审核驳回
        /// </summary>
        PerformanceAllocationCensorReject = 161,
        /// <summary>
        /// 绩效分配作废
        /// </summary>
        PerformanceAllocationCancel = 162,
        /// <summary>
        /// 绩效分配撤销
        /// </summary>
        PerformanceAllocationUndoSubmit = 127,
    }
}
