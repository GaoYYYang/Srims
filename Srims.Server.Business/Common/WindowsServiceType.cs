using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// windows服务类型
    /// </summary>
    public enum WindowsServiceType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 专利的邮件提醒功能
        /// </summary>
        PatentEmailAutoSent = 1,
        /// <summary>
        /// 经费到帐信息的自动导入
        /// </summary>
        FinanceAutoImport = 2,
        /// <summary>
        /// 专家信息的自动导入
        /// </summary>
        ExpertAutoImport = 3,
        /// <summary>
        /// 项目结项提醒
        /// </summary>
        ProjectEndAwoke = 4,
        /// <summary>
        /// 凭单打印
        /// </summary>
        VoucherPrint = 5,
        /// <summary>
        /// 经费分配
        /// </summary>
        FundAllocation = 6,
        /// <summary>
        /// 管理员工作
        /// </summary>
        AdminWorkAwoke = 7,
        /// <summary>
        /// 专家审核提醒
        /// </summary>
        ExpertCensorRemind = 8,
        /// <summary>
        /// 凭单已经打印提醒
        /// </summary>
        VoucherPrintedRemind = 9,
        /// <summary>
        /// 审核纵向项目提醒
        /// </summary>
        CensorVerticalProjectRemind = 10,
        /// <summary>
        /// 审核横向项目提醒
        /// </summary>
        CensorHorizontalProjectRemind = 11,
        /// <summary>
        /// 审核文档提醒
        /// </summary>
        CensorDocumentRemaind = 12,
        /// <summary>
        /// 审核合同提醒
        /// </summary>
        CensorContractRemaind = 13,
        /// <summary>
        /// 审核经费分配
        /// </summary>
        CensorFundAllocationRemaind = 14,
        /// <summary>
        /// 审核项目立项提醒
        /// </summary>
        CensorProjectRemaind = 15,
        /// <summary>
        /// 审核经费下拨
        /// </summary>
        CensorFundDescendRemaind = 16,

        /// <summary>
        /// 绩效凭单打印
        /// </summary>
        PerformanceVoucherPrint = 17,
        /// <summary>
        /// 绩效分配
        /// </summary>
        PerformanceAllocation = 18,
        /// <summary>
        /// 绩效凭单已经打印提醒
        /// </summary>
        PerformanceVoucherPrintedRemind = 19,
    }
}
