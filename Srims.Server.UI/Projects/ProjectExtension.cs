using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Experts;

using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using MIS.Common;

namespace Srims.Server.UI.Projects
{
    /// <summary>
    /// 项目扩展
    /// </summary>
    public static class ProjectShowExtension
    {
        /// <summary>
        /// 显示项目
        /// </summary>
        /// <param name="project"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this Project project, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("Record");

            //Base
            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("Principal", project.Principal);
            response.WriteTagWithValue("IsPrincipalSecondCollege", project.IsPrincipalSecondCollege);
            response.WriteTagWithValue("PrincipalNumber", project.Principal.Number);
            response.WriteTagWithValue("PrincipalCollege", project.Principal.College == null ? string.Empty : project.Principal.College.Name);
            response.WriteTagWithValue("PrincipalID", project.PrincipalID);
            response.WriteTagWithValue("Level", project.Level);

            //Type
            var type = project.Type;
            response.WriteTagWithValue("TypeID", type.TypeID);
            response.WriteTagWithValue("TypeName", type.Type.Name);
            response.WriteTagWithValue("TypeShortName", type.Type.ShortName);
            //Recovery re = database.Recovery.SingleOrDefault(c => c.Project == project);
            //Recovery
            //response.WriteTagWithValue("RecoveryvoucherNumber", re.VoucherNumber);
            //response.WriteTagWithValue("RoverheadExpensesAmount", re.OverheadExpensesAmount);
            //response.WriteTagWithValue("RecoveryAmount", re.OverheadExpensesAmount - re.ReceivedOverheadExpenses);
            //response.WriteTagWithValue("Rremark", re.Remark);
            //response.WriteTagWithValue("RecoveryPrintState", re.IsPrint == true ? "已打印" : "未打印");
            //response.WriteTagWithValue("RecoveryPrintDate", re.PrintDateTime);

            if (!user.IsExpert || project.IsPrincipal(user))
            {
                response.WriteTagWithValue("State", project.CurrentState);
                response.WriteTagWithValue("Subject", project.Subject);
                response.WriteTagWithValue("SubjectName", project.SubjectName);
                response.WriteTagWithValue("SubjectCode", project.SubjectCode);
                response.WriteTagWithValue("FirstLevelSubjectID", project.FirstLevelSubjectID);
                response.WriteTagWithValue("FirstLevelSubjectName", project.FirstLevelSubjectID.HasValue ? project.FirstLevelSubject.Name : String.Empty);
                response.WriteTagWithValue("SecondLevelSubjectID", project.SecondLevelSubjectID);
                response.WriteTagWithValue("SecondLevelSubjectName", project.SecondLevelSubjectID.HasValue ? project.SecondLevelSubject.Name : String.Empty);
                response.WriteTagWithValue("ResearchType", project.ResearchType);
                response.WriteTagWithValue("CooperationType", project.CooperationType);
                response.WriteTagWithValue("StartDate", project.StartDate);
                response.WriteTagWithValue("EndDate", project.EndDate);
                response.WriteTagWithValue("IsSecret", project.IsSecret);
                response.WriteTagWithValue("PrincipalDelegate", project.PrincipalDelegate);
                response.WriteTagWithValue("PrincipalDelegateID", project.PrincipalDelegateID);
                response.WriteTagWithValue("Creator", project.Creator);
                response.WriteTagWithValue("CreateDate", project.CreateDate);
                response.WriteTagWithValue("CorporationPlace", project.CorporationPlace);
                response.WriteTagWithValue("BaseID", project.BaseID);
                response.WriteTagWithValue("BaseName", project.BaseID.HasValue ? project.Base.Name : String.Empty);
                response.WriteTagWithValue("Remark", project.Remark);
                response.WriteTagWithValue("TaskComingFrom", project.TaskComingFrom);


                //Type            
                response.WriteTagWithValue("IsHorizontal", type.Rank.IsHorizontal);
                response.WriteTagWithValue("RankID", type.RankID);
                response.WriteTagWithValue("RankName", type.Rank.Name);
                response.WriteTagWithValue("SupportCategoryID", type.SupportCategoryID);
                response.WriteTagWithValue("SupportCategoryName", type.SupportCategoryID.HasValue ? type.SupportCategory.Name : null);
                response.WriteTagWithValue("SupportFieldID", type.SupportFieldID);
                response.WriteTagWithValue("SupportFieldName", type.SupportFieldID.HasValue ? type.SupportField.Name : null);
                response.WriteTagWithValue("SupportSubFieldID", type.SupportSubFieldID);
                response.WriteTagWithValue("SupportSubFieldName", type.SupportSubFieldID.HasValue ? type.SupportSubField.Name : null);

                //Fund
                var fund = project.Fund;
                response.WriteTagWithValue("AccountBookNumber", fund.AccountBookNumber);
                response.WriteTagWithValue("FundAlreadyHardware", fund.FundAlreadyHardware);
                response.WriteTagWithValue("FundAlreadyIn", fund.FundAlreadyIn);
                response.WriteTagWithValue("FundAlreadyOut", fund.FundAlreadyOut);
                response.WriteTagWithValue("FundAlreadyTotal", fund.FundAlreadyOut + fund.FundAlreadyIn + fund.FundAlreadyHardware);
                response.WriteTagWithValue("FundContract", fund.FundContract);
                response.WriteTagWithValue("FundFrom", fund.FundFrom);
                response.WriteTagWithValue("FundFromUnit", fund.FundFromUnit);
                response.WriteTagWithValue("FundFromUnitAddress", fund.FundFromUnitAddress);
                response.WriteTagWithValue("FundPlanIn", fund.FundPlanIn);
                response.WriteTagWithValue("FundPlanHardware", fund.FundPlanHardware);
                response.WriteTagWithValue("FundPlanOut", fund.FundPlanOut);
                response.WriteTagWithValue("FundReceived", fund.FundReceived);
                response.WriteTagWithValue("FundTotal", fund.FundTotal);

                response.WriteTagWithValue("OverheadExpenseInTotal", fund.OverheadExpenseInTotal < 0 ? 0 : fund.OverheadExpenseInTotal);
                response.WriteTagWithValue("OverheadExpenseOutTotal", fund.OverheadExpenseOutTotal);
                response.WriteTagWithValue("OverheadExpenseMiddleTotal", fund.OverheadExpenseMiddleTotal);
                response.WriteTagWithValue("OverheadExpenseExpertTotal", fund.OverheadExpenseExpertTotal);
                response.WriteTagWithValue("OverheadExpensesAlreadyIn", project.GetOverheadExpensesInAlready(database));
                response.WriteTagWithValue("OverheadExpensesAlreadyOut", fund.OverheadExpensesAlreadyOut);
                response.WriteTagWithValue("OverheadExpensesAlreadyMiddle", fund.OverheadExpensesAlreadyMiddle);

                response.WriteTagWithValue("CampusIndirectCosts", fund.CampusIndirectCosts);

                response.WriteTagWithValue("FundManageProportion", fund.FundManageProportion);
                response.WriteTagWithValue("PerformancePay", fund.PerformancePay < 0 ? 0 : fund.PerformancePay);
                response.WriteTagWithValue("PerformancePayAlready", project.GetPerformancePayAlready(database));
                response.WriteTagWithValue("BorrowAmount", fund.BorrowAmount);
                response.WriteTagWithValue("ReturnAmount", fund.ReturnAmount);
                response.WriteTagWithValue("ProjectAccountNumber", fund.AccountBookNumber);
                response.WriteTagWithValue("FundCanDescend", fund.FundTotal - fund.FundReceived - fund.BorrowAmount + fund.ReturnAmount);
                response.WriteTagWithValue("EquipmentCost", fund.EquipmentCost == null ? 0 : fund.EquipmentCost);

                //carlsirce2013.5.13
                response.WriteTagWithValue("AllocatedPerformance", project.GetDescendPormance(database));
                response.WriteTagWithValue("TrueOverheadExpensesAlreadyIn", project.GetAllocatedOverheadExpensesIn(database));

                response.WriteTagWithValue("IndirectCosts", fund.IndirectCosts == null ? 0 : fund.IndirectCosts);

                response.WriteTagWithValue("ProjectPerformancePay", fund.ProjectPerformancePay);
                response.WriteTagWithValue("OverheadExpensesInStandard", fund.OverHeadExpenseInStandard);
                response.WriteTagWithValue("PerformancePayStandard", fund.PerformanceInStandard);

                response.WriteTagWithValue("OutsourcingPlanAmountString", project.GetProjectOutsourcingPlanAmountString(database));
                response.WriteTagWithValue("OutsourcingAlreadyAmountString", project.GetProjectOutsourcingAlreadyAmountString(database));


            }

            ////Permission
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(project, database));
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show(project, database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(project, database));
            response.WriteTagWithValue("HasPermission_EditProjectMember", user.HasPermission_EditProjectMember(project, database));
            response.WriteTagWithValue("HasPermission_ShowProejectMember", user.HasPermission_ShowProjectMember(project, database));
            response.WriteTagWithValue("HasPermission_EditProjectPayPlanItem", user.HasPermission_EditProjectPayPlanItem(project, database));
            response.WriteTagWithValue("HasPermission_ShowProejectPayPlanItem", user.HasPermission_ShowProjectPayPlanItem(project, database));
            response.WriteTagWithValue("HasPermission_EditProjectContract", user.HasPermission_EditContract(project, database));
            response.WriteTagWithValue("HasPermission_ShowProejectContract", user.HasPermission_ShowContract(project, database));
            response.WriteTagWithValue("HasPermission_EditProjectDoucment", user.HasPermission_EditDocument(project, database));
            response.WriteTagWithValue("HasPermission_ShowProejectDocument", user.HasPermission_ShowDocumet(project, database));
            response.WriteTagWithValue("HasPermission_WithDraw", user.HasPermission_WithDraw(project, database));
            response.WriteTagWithValue("HasPermission_Terminate", user.HasPermission_Terminate(project, database));

            //Can
            response.WriteTagWithValue("CanEdit", user.CanEdit(project, database));
            response.WriteTagWithValue("CanShow", user.CanShow(project, database));
            response.WriteTagWithValue("CanDelete", user.CanDelete(project, database));
            response.WriteTagWithValue("CanWithDraw", user.CanWithDraw(project, database));
            response.WriteTagWithValue("CanTerminate", user.CanTerminate(project, database));
            response.WriteTagWithValue("CanEdit_ProjectMember", user.CanEditProjectMember(project, database));
            response.WriteTagWithValue("CanShow_ProjectMember", user.CanShowProjectMember(project, database));
            response.WriteTagWithValue("CanEdit_ProjectPayPlanItem", user.CanEditProjectPayPlanItem(project, database));
            response.WriteTagWithValue("CanShow_ProjectPayPlanItem", user.CanShowProjectPayPlanItem(project, database));
            response.WriteTagWithValue("CanEdit_ProjectContract", user.CanEditContract(project, database));
            response.WriteTagWithValue("CanEdit_ProjectMainContract", user.CanEditMainContract(project, database));
            response.WriteTagWithValue("CanShow_ProjectContract", user.CanShowContract(project, database));
            response.WriteTagWithValue("CanEdit_ProjectDocument", user.CanEditDocument(project, database));
            response.WriteTagWithValue("CanShow_ProjectDocument", user.CanShowDocument(project, database));
            response.WriteTagWithValue("CanCensor_ProjectDocument", user.CanCensorDocument(project, database));
            response.WriteTagWithValue("CanCensor_ProjectContract", user.CanCensorContract(project, database));
            response.WriteTagWithValue("CanRequire_ProjectDocument", user.CanRequireDocument(project, database));
            response.WriteTagWithValue("CanSubmitStart", user.CanSubmitStart(project));
            response.WriteTagWithValue("CanSubmitEnd", user.CanSubmitEnd(project));
            response.WriteTagWithValue("CanUndoStart", user.CanUndoStart(project));
            response.WriteTagWithValue("CanUndoEnd", user.CanUndoEnd(project));
            response.WriteTagWithValue("CanCensorStart", user.CanCensorStart(project, database));
            response.WriteTagWithValue("CanCensorEnd", user.CanCensorEnd(project, database));
            response.WriteTagWithValue("CanSetDelegatePrincipal", user.CanSetDelegatePrincipal(project, database));
            response.WriteTagWithValue("CanClearDelegatePrincipal", user.CanClearDelegatePrincipal(project, database));
            response.WriteTagWithValue("CanClearProjectAccountBookNumber", user.CanClearProjectAccountBookNumber());
            response.WriteTagWithValue("CanCompleteIn", user.CanCompeteIn(project, database));

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 显示项目列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Project> list, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("List");
            foreach (var project in list)
                project.Show(response, user, database);
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示项目查询结果
        /// </summary>
        /// <param name="projectQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this ProjectQueryResult projectQueryResult, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", projectQueryResult.Total);
            response.WriteTagWithValue("FundSum", projectQueryResult.FundSum);
            response.WriteTagWithValue("FundReceivedSum", projectQueryResult.FundReceivedSum);

            projectQueryResult.ResultList.Show(response, user, database);

            response.WriteTagEnd("QueryResult");
        }


        /// <summary>
        /// 显示追缴项目查询结果
        /// </summary>
        /// <param name="projectQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void RecoveryShow(this ProjectQueryResult projectQueryResult, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", projectQueryResult.Total);
            response.WriteTagWithValue("FundSum", projectQueryResult.FundSum);
            response.WriteTagWithValue("FundReceivedSum", projectQueryResult.FundReceivedSum);

            projectQueryResult.ResultList.Show(response, user, database);

            response.WriteTagEnd("QueryResult");
        }

        /// <summary>
        /// 显示项目（email）
        /// </summary>
        /// <param name="project"></param>
        /// <param name="response"></param>
        public static void ShowProjectForEmail(Project project, HttpResponse response)
        {
            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Principal", project.Principal.Name);
            response.WriteTagWithValue("PrincipalNumber", project.Principal.Number);
            response.WriteTagWithValue("PrincipalEmail", project.Principal.Email);
        }
        /// <summary>
        /// 显示项目（email）
        /// </summary>
        /// <param name="project"></param>
        /// <param name="response"></param>
        public static void ShowProjectForSetDelegate(Project project, HttpResponse response)
        {
            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("TypeName", project.Type.Type.Name);
            response.WriteTagWithValue("PrincipalDelegate", project.PrincipalDelegate);
            response.WriteTagWithValue("PrincipalDelegateID", project.PrincipalDelegateID);
            response.WriteTagWithValue("PrincipalID", project.PrincipalID);
        }
        /// <summary>
        /// 显示项目（stamp）
        /// </summary>
        /// <param name="project"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowProjectForStamp(Project project, HttpResponse response, IDatabase database)
        {
            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("Principal", project.Principal != null ? project.Principal.Name : string.Empty);
        }
        /// <summary>
        /// 显示项目（经费下拨）
        /// </summary>
        /// <param name="project"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowForFundDescend(Project project, HttpResponse response, IDatabase database)
        {
            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("Principal", project.Principal.Name);
            response.WriteTagWithValue("FundTotal", project.Fund.FundTotal);
            response.WriteTagWithValue("FundReceived", project.Fund.FundReceived);
            response.WriteTagWithValue("BorrowAmount", project.Fund.BorrowAmount);
            response.WriteTagWithValue("ReturnAmount", project.Fund.ReturnAmount);
            response.WriteTagWithValue("FundCanDescend", project.Fund.FundTotal - project.Fund.FundReceived - project.Fund.BorrowAmount + project.Fund.ReturnAmount);
        }
        /// <summary>
        /// 显示项目
        /// </summary>
        /// <param name="project"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowForBase(Project project, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("Principal", project.Principal.Name);
            response.WriteTagWithValue("TypeName", project.TypeID.HasValue ? project.Type.Type.Name : String.Empty);
            response.WriteTagWithValue("Level", project.Level);

            response.WriteTagWithValue("CanShow", user.CanShow(project, database));

        }
        /// <summary>
        /// 显示项目（专家相关)
        /// </summary>
        /// <param name="project"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowProjectForExpert(this Project project, Expert expert, User user, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("ID", project.ID);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Principal", project.Principal.Name);
            response.WriteTagWithValue("Type", project.TypeID.HasValue ? project.Type.Type.Name : String.Empty);
            response.WriteTagWithValue("Level", project.Level);
            response.WriteTagWithValue("Order", project.PrincipalID == expert.ID ? null : new Nullable<Int32>(expert.GetMyProjectMemberOrder(database.ProjectMemebers, project.ID)));

            response.WriteTagWithValue("FundReceived", project.Fund.FundReceived);
            response.WriteTagWithValue("FundTotal", project.Fund.FundTotal);
            response.WriteTagWithValue("StartDate", project.StartDate);
            response.WriteTagWithValue("EndDate", project.EndDate);
            response.WriteTagWithValue("Rank", project.TypeID.HasValue ? project.Type.Rank.Name : String.Empty);
            response.WriteTagWithValue("CanShow", user.CanShow(project, database));


            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 显示项目（专家相关）
        /// </summary>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <param name="expert"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowForExpert(this IList<Project> list, User user, Expert expert, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("List");
            foreach (var project in list)
                project.ShowProjectForExpert(expert, user, database, response);
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示项目（外协相关)carlsirce2013.5.13
        /// </summary>
        /// <param name="project"></param>
        /// <param name="outsourcingID"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowProjectForOutsourcing(this Project project, int outsourcingID, User user, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("ProjectId", project.ID);
            response.WriteTagWithValue("Name", project.Name);
            response.WriteTagWithValue("Number", project.Number);
            response.WriteTagWithValue("Principal", project.Principal);
            response.WriteTagWithValue("IsPrincipalSecondCollege", project.IsPrincipalSecondCollege);
            response.WriteTagWithValue("PrincipalNumber", project.Principal.Number);
            response.WriteTagWithValue("PrincipalCollege", project.Principal.College == null ? string.Empty : project.Principal.College.Name);
            response.WriteTagWithValue("PrincipalID", project.PrincipalID);
            response.WriteTagWithValue("Level", project.Level);

            //Type
            var type = project.Type;
            response.WriteTagWithValue("TypeID", type.TypeID);
            response.WriteTagWithValue("TypeName", type.Type.Name);
            response.WriteTagWithValue("TypeShortName", type.Type.ShortName);

            response.WriteTagWithValue("State", project.CurrentState);
            response.WriteTagWithValue("Subject", project.Subject);
            response.WriteTagWithValue("SubjectName", project.SubjectName);
            response.WriteTagWithValue("SubjectCode", project.SubjectCode);
            response.WriteTagWithValue("FirstLevelSubjectID", project.FirstLevelSubjectID);
            response.WriteTagWithValue("FirstLevelSubjectName", project.FirstLevelSubjectID.HasValue ? project.FirstLevelSubject.Name : String.Empty);
            response.WriteTagWithValue("SecondLevelSubjectID", project.SecondLevelSubjectID);
            response.WriteTagWithValue("SecondLevelSubjectName", project.SecondLevelSubjectID.HasValue ? project.SecondLevelSubject.Name : String.Empty);
            response.WriteTagWithValue("ResearchType", project.ResearchType);
            response.WriteTagWithValue("CooperationType", project.CooperationType);
            response.WriteTagWithValue("StartDate", project.StartDate);
            response.WriteTagWithValue("EndDate", project.EndDate);
            response.WriteTagWithValue("IsSecret", project.IsSecret);
            response.WriteTagWithValue("PrincipalDelegate", project.PrincipalDelegate);
            response.WriteTagWithValue("PrincipalDelegateID", project.PrincipalDelegateID);
            response.WriteTagWithValue("Creator", project.Creator);
            response.WriteTagWithValue("CreateDate", project.CreateDate);
            response.WriteTagWithValue("CorporationPlace", project.CorporationPlace);
            response.WriteTagWithValue("BaseID", project.BaseID);
            response.WriteTagWithValue("BaseName", project.BaseID.HasValue ? project.Base.Name : String.Empty);
            response.WriteTagWithValue("Remark", project.Remark);
            response.WriteTagWithValue("TaskComingFrom", project.TaskComingFrom);


            //Type            
            response.WriteTagWithValue("IsHorizontal", type.Rank.IsHorizontal);
            response.WriteTagWithValue("RankID", type.RankID);
            response.WriteTagWithValue("RankName", type.Rank.Name);
            response.WriteTagWithValue("SupportCategoryID", type.SupportCategoryID);
            response.WriteTagWithValue("SupportCategoryName", type.SupportCategoryID.HasValue ? type.SupportCategory.Name : null);
            response.WriteTagWithValue("SupportFieldID", type.SupportFieldID);
            response.WriteTagWithValue("SupportFieldName", type.SupportFieldID.HasValue ? type.SupportField.Name : null);
            response.WriteTagWithValue("SupportSubFieldID", type.SupportSubFieldID);
            response.WriteTagWithValue("SupportSubFieldName", type.SupportSubFieldID.HasValue ? type.SupportSubField.Name : null);

            //Fund
            var fund = project.Fund;
            response.WriteTagWithValue("AccountBookNumber", fund.AccountBookNumber);
            response.WriteTagWithValue("FundAlreadyHardware", fund.FundAlreadyHardware);
            response.WriteTagWithValue("FundAlreadyIn", fund.FundAlreadyIn);
            response.WriteTagWithValue("FundAlreadyOut", fund.FundAlreadyOut);
            response.WriteTagWithValue("FundAlreadyTotal", fund.FundAlreadyOut + fund.FundAlreadyIn + fund.FundAlreadyHardware);
            response.WriteTagWithValue("FundContract", fund.FundContract);
            response.WriteTagWithValue("FundFrom", fund.FundFrom);
            response.WriteTagWithValue("FundFromUnit", fund.FundFromUnit);
            response.WriteTagWithValue("FundFromUnitAddress", fund.FundFromUnitAddress);
            response.WriteTagWithValue("FundPlanIn", fund.FundPlanIn);
            response.WriteTagWithValue("FundPlanHardware", fund.FundPlanHardware);
            response.WriteTagWithValue("FundPlanOut", fund.FundPlanOut);
            response.WriteTagWithValue("FundReceived", fund.FundReceived);
            response.WriteTagWithValue("FundTotal", fund.FundTotal);
            response.WriteTagWithValue("OverheadExpenseInTotal", fund.OverheadExpenseInTotal < 0 ? 0 : fund.OverheadExpenseInTotal);
            response.WriteTagWithValue("OverheadExpenseOutTotal", fund.OverheadExpenseOutTotal);
            response.WriteTagWithValue("OverheadExpensesAlreadyIn", fund.OverheadExpensesAlreadyIn);
            response.WriteTagWithValue("OverheadExpensesAlreadyOut", fund.OverheadExpensesAlreadyOut);
            response.WriteTagWithValue("OverheadExpensesInStandard", fund.OverHeadExpenseInStandard);
            response.WriteTagWithValue("FundManageProportion", fund.FundManageProportion);
            response.WriteTagWithValue("PerformancePay", fund.PerformancePay < 0 ? 0 : fund.PerformancePay);
            response.WriteTagWithValue("PerformancePayAlready", fund.PerformancePayAlready);
            response.WriteTagWithValue("BorrowAmount", fund.BorrowAmount);
            response.WriteTagWithValue("ReturnAmount", fund.ReturnAmount);
            response.WriteTagWithValue("ProjectAccountNumber", fund.AccountBookNumber);
            response.WriteTagWithValue("FundCanDescend", fund.FundTotal - fund.FundReceived - fund.BorrowAmount + fund.ReturnAmount);
            response.WriteTagWithValue("EquipmentCost", fund.EquipmentCost == null ? 0 : fund.EquipmentCost);

            //carlsirce2013.5.13
            response.WriteTagWithValue("AllocatedPerformance", project.GetAllocatedPormance(database));
            response.WriteTagWithValue("TrueOverheadExpensesAlreadyIn", project.GetAllocatedOverheadExpensesIn(database));

            response.WriteTagWithValue("IndirectCosts", fund.IndirectCosts == null ? 0 : fund.IndirectCosts);
            //carlsirce2013.6.23输出凭单信息
            var outsoucing = database.Outsourcings.SingleOrDefault(c => c.ID == outsourcingID);
            var voucherouts = database.VoucherOuts.Where(c => c.Voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project == project && c.Corporation == outsoucing.Name).ToList();
            int count = 0;
            StringBuilder voucherDetail = new StringBuilder();
            foreach (var item in voucherouts)
            {
                if (item.CheckPassed())
                {
                    count++;
                    voucherDetail.AppendFormat("凭单号：{0}，", item.Voucher.VoucherNumber);
                    voucherDetail.AppendFormat("账本号：{0}，", item.Voucher.AccountBookNumber);
                    voucherDetail.AppendFormat("校内分配：{0}万，", item.Voucher.AllocationIn.ToShowAsMoney());
                    voucherDetail.AppendFormat("外协分配：{0}万，", item.Voucher.AllocationOut.ToShowAsMoney());
                    voucherDetail.AppendFormat("校内管理费：{0}万，", item.Voucher.OverheadExpensesIn.ToShowAsMoney());
                    voucherDetail.AppendFormat("校内绩效：{0}万，", item.Voucher.OverheadPerformancePay.ToShowAsMoney());
                    voucherDetail.AppendFormat("外协管理费：{0}万，", item.Voucher.OverheadExpensesOut.ToShowAsMoney());
                    voucherDetail.AppendFormat("<b>本外协单位分配金额：{0}万</b>。<br/><br/>", item.Amount.ToShowAsMoney());
                }

            }
            response.WriteTagWithValue("VoucherCount", count);
            response.WriteTagWithValue("VoucherDetail", voucherDetail.ToString());

            response.WriteTagWithValue("ProjectPerformancePay", fund.ProjectPerformancePay);
            response.WriteTagWithValue("OverheadExpensesInStandard", fund.OverHeadExpenseInStandard);
            response.WriteTagWithValue("PerformancePayStandard", fund.PerformanceInStandard);

            response.WriteTagWithValue("ProjectOutAmount", database.ProjectOuts.SingleOrDefault(c => c.Project == project && c.OutsourcingID == outsourcingID).Amount);
            response.WriteTagWithValue("AllocatedAmount", database.ProjectOuts.SingleOrDefault(c => c.Project == project && c.OutsourcingID == outsourcingID).GetAllocatedAmount(database));

            response.WriteTagWithValue("CanShow", user.CanShow(project, database));

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 显示项目查询结果
        /// </summary>
        /// <param name="projectQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this ProjectQueryResult projectQueryResult, int outsourcingID, User user, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("QueryResult");
            long ProjectOutAllAmount = 0;
            long AllocatedAllAmount = 0;
            foreach (var project in projectQueryResult.ResultList)
            {
                ProjectOutAllAmount += database.ProjectOuts.Where(c => c.Project == project && c.OutsourcingID == outsourcingID).Sum(c => c.Amount);
                AllocatedAllAmount += database.ProjectOuts.SingleOrDefault(c => c.Project == project && c.OutsourcingID == outsourcingID).GetAllocatedAmount(database);
            }
            response.WriteTagWithValue("Total", projectQueryResult.Total);
            response.WriteTagWithValue("ProjectOutAllAmount", ProjectOutAllAmount);
            response.WriteTagWithValue("AllocatedAllAmount", AllocatedAllAmount);
            response.WriteTagBegin("List");
            foreach (var project in projectQueryResult.ResultList)
                project.ShowProjectForOutsourcing(outsourcingID, user, database, response);
            response.WriteTagEnd("List");

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 显示项目（外协相关）carlsirce2013.5.13
        /// </summary>
        /// <param name="list"></param>
        /// <param name="outsourcingID"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowForOutsourcing(this IList<Project> list, int outsourcingID, User user, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("List");
            foreach (var project in list)
                project.ShowProjectForOutsourcing(outsourcingID, user, database, response);
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 获得项目
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Project GetProject(this HttpRequest request, IDatabase database, User user)
        {
            var project = request.getProject(database, user);

            project.StartDate = request.GetDateTime("StartDateValue");
            project.Principal = request.GetEntity<Expert>(database.Experts, "PrincipalID");
            project.IsPrincipalSecondCollege = request.GetBoolean("IsPrincipalSecondCollege").Value;
            project.PrincipalDelegate = request.GetEntity<Expert>(database.Experts, "PrincipalDelegateID");
            project.Remark = request.GetString("Remark");
            project.ResearchType = request.GetString("ResearchType");
            project.SecondLevelSubject = request.GetEntity<SubjectSecondLevel>(database.SubjectSecondLevels, "SecondLevelSubjectID");
            if (request.getProject_IsHorizontal())
                project.Number = project.IsNew ? user.IsExpert ? string.Empty : project.GetHorizontalProjectNumber(database) : project.Number;
            else
                project.Number = request.GetString("Number");

            project.TaskComingFrom = request.GetString("TaskComingFrom");

            project.Base = request.GetEntity<Base>(database.Bases, "BaseID");
            project.CooperationType = request.GetString("CooperationType");
            project.CorporationPlace = request.GetString("CorporationPlace");
            project.CurrentState = getProjectCurrentState(request, project, user, database);
            project.EndDate = request.GetDateTime("EndDateValue");
            project.FirstLevelSubject = request.GetEntity<SubjectFirstLevel>(database.SubjectFirstLevels, "FirstLevelSubjectID");
            project.Type = request.getProjectInfo_Type(database, project, user);
            project.Fund = request.getProjectInfo_Fund(database, project, user);
            project.IsSecret = user.IsExpert ? false : request.GetBoolean("IsSecret").Value;
            project.Level = request.getProject_Level();
            project.Name = request.GetString("Name");

          


            


            return project;
        }

        private static Project getProject(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Projects.GetByID(id.Value);

            var project = new Project();
            project.Creator = user.Name;
            project.CreateDate = DateTime.Now;

            return project;
        }
        private static bool getProject_IsHorizontal(this HttpRequest request)
        {
            return request.GetBoolean("IsHorizontal").Value;
        }
        private static ProjectLevel getProject_Level(this HttpRequest request)
        {
            return request.getProject_IsHorizontal() ? ProjectLevel.Perside : request.GetEnum<ProjectLevel>("Level");
        }
        private static ProjectStateHistory getProjectCurrentState(this HttpRequest request, Project project, User user, IDatabase database)
        {
            var state = request.GetEnum<ProjectState>("State");
            if (project.IsNew)
            {
                return new ProjectStateHistory
                {
                    Project = project,
                    DateTime = DateTime.Now,
                    Operator = user.Name,
                    State = state,
                };
            }

            if (!user.CanChangeState(project, database))
                return project.CurrentState;


            if (state == project.CurrentState.State)
                return project.CurrentState;

            return request.getProjectNewState(project, user);
        }

        private static ProjectInfo_Fund getProjectInfo_Fund(this HttpRequest request, IDatabase database, Project project, User user)
        {
            var fund = project.Fund;
            if (project.IsNew)
            {
                fund = new ProjectInfo_Fund();
                fund.Project = project;
            }

            fund.FundContract = request.GetMoney("FundContract").Value;
            fund.FundFrom = request.GetString("FundFrom");
            fund.FundFromUnit = request.GetString("FundFromUnit");
            fund.FundFromUnitAddress = request.GetString("FundFromUnitAddress");
            fund.FundPlanOut = request.GetMoney("FundPlanOut").Value;
            fund.FundTotal = request.getProjectInfo_Fund_FundTotal();
            fund.FundManageProportion = request.GetInt("FundManageProportion").HasValue ? request.GetInt("FundManageProportion").Value : 0;
            fund.PerformancePay = request.GetMoney("PerformancePay").HasValue ? request.GetMoney("PerformancePay").Value : 0;
            fund.PerformancePayAlready = request.GetMoney("PerformancePayAlready").HasValue ? request.GetInt("PerformancePayAlready").Value : 0;
            fund.EquipmentCost = request.GetMoney("EquipmentCost").HasValue ? request.GetMoney("EquipmentCost") : 0;
            fund.ProjectPerformancePay = request.GetMoney("ProjectPerformancePay").HasValue ? request.GetMoney("ProjectPerformancePay") : 0;
            fund.IndirectCosts = request.GetMoney("IndirectCosts").HasValue ? request.GetMoney("IndirectCosts") : 0;


            fund.CampusIndirectCosts = (request.GetMoney("OverheadExpenseInTotal") == null ? 0 : request.GetMoney("OverheadExpenseInTotal").Value) + (request.GetMoney("PerformancePay") == null ? 0 : request.GetMoney("PerformancePay").Value);


            //以前管理费自动计算方式，现在不用了，现在由用户手动输入
            if (request.getProject_IsHorizontal())
            {
                fund.OverheadExpenseInTotal = request.getProjectInfo_Fund_OverheadExpenseInTotal(database, project, fund, user);
                fund.OverheadExpenseOutTotal = request.getProjectInfo_Fund_OverheadExpenseOutTotal(database, project, fund, user);
            }
            else
            {
                fund.OverheadExpenseInTotal = request.GetMoney("OverheadExpenseInTotal") == null ? 0 : request.GetMoney("OverheadExpenseInTotal").Value;
                fund.OverheadExpenseOutTotal = 0;
            }
            //2013.12.13 加入学院管理费，课题组管理费概念，预算制项目发生变化
            if ((fund.Project.Type.Type.IsBudget == true && project.Type.Type.Name != "公益性行业科研专项" && project.StartDate >= Convert.ToDateTime("2011-1-1")) || (fund.Project.Type.Type.IsBudget == true && project.Type.Type.Name == "公益性行业科研专项" && project.StartDate >= Convert.ToDateTime("2012-1-1")))
            {
                //对于预算值没有预算的项目：
                if (project.Level == ProjectLevel.Join && project.Fund.FundContract == project.Fund.FundTotal)
                {
                    project.Fund.OverheadExpenseInTotal = Convert.ToInt64(project.Fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE);
                    project.Fund.OverheadExpenseMiddleTotal = 0;
                    project.Fund.OverheadExpenseExpertTotal = 0;
                }
                else
                {
                    //对于课题经费高于2000万且设备购置费比例超过20%且到校经费大于课题经费50%，学校从课题组
                    if (fund.FundPlanIn > 2000000000 && fund.EquipmentCost > fund.FundPlanIn * 0.2 && fund.FundTotal > fund.FundContract * 0.5)
                    {
                        fund.OverheadExpenseInTotal = Convert.ToInt64(fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE - 0.01));
                        if (fund.CampusIndirectCosts <= fund.OverheadExpenseInTotal)
                        {
                            fund.OverheadExpenseMiddleTotal = 0;
                            fund.OverheadExpenseExpertTotal = 0;
                        }
                        if (fund.CampusIndirectCosts > fund.OverheadExpenseInTotal && fund.CampusIndirectCosts <= fund.OverheadExpenseInTotal + Convert.ToInt64(fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005)))
                        {
                            fund.OverheadExpenseMiddleTotal = fund.CampusIndirectCosts - fund.OverheadExpenseInTotal;
                            fund.OverheadExpenseExpertTotal = 0;
                        }
                        if (fund.CampusIndirectCosts > fund.OverheadExpenseInTotal + Convert.ToInt64(fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005)))
                        {
                            fund.OverheadExpenseMiddleTotal = Convert.ToInt64(fund.FundPlanIn * (ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE - 0.005));
                            fund.OverheadExpenseExpertTotal = fund.CampusIndirectCosts - fund.OverheadExpenseInTotal - fund.OverheadExpenseMiddleTotal;
                        }
                    }
                    else
                    {
                        fund.OverheadExpenseInTotal = Convert.ToInt64(fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_IN_ISBUDJET_RATE);
                        if (fund.CampusIndirectCosts <= fund.OverheadExpenseInTotal)
                        {
                            fund.OverheadExpenseMiddleTotal = 0;
                            fund.OverheadExpenseExpertTotal = 0;
                        }
                        if (fund.CampusIndirectCosts > fund.OverheadExpenseInTotal && fund.CampusIndirectCosts <= fund.OverheadExpenseInTotal + Convert.ToInt64(fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE))
                        {
                            fund.OverheadExpenseMiddleTotal = fund.CampusIndirectCosts - fund.OverheadExpenseInTotal;
                            fund.OverheadExpenseExpertTotal = 0;
                        }
                        if (fund.CampusIndirectCosts > fund.OverheadExpenseInTotal + Convert.ToInt64(fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE))
                        {
                            fund.OverheadExpenseMiddleTotal = Convert.ToInt64(fund.FundPlanIn * ProjectInfo_Fund.OVERHEAD_EXPENSE_MIDDLE_ISBUDJET_RATE);
                            fund.OverheadExpenseExpertTotal = fund.CampusIndirectCosts - fund.OverheadExpenseInTotal - fund.OverheadExpenseMiddleTotal;
                        }
                    }
                }
            }
            else
            {
                fund.OverheadExpenseMiddleTotal = 0;
                fund.OverheadExpenseExpertTotal = fund.PerformancePay;
            }
            return fund;

        }
        private static long getProjectInfo_Fund_FundTotal(this HttpRequest request)
        {
            return request.getProject_Level() == ProjectLevel.Perside ?
                request.GetMoney("FundContract").Value :
                request.GetMoney("FundTotal").Value;
        }
        private static long getProjectInfo_Fund_OverheadExpenseInTotal(this HttpRequest request, IDatabase database, Project project, ProjectInfo_Fund fund, User user)
        {
            if (user.CanCustomOverheadExpense(project))
                return request.GetMoney("OverheadExpenseInTotal").Value;

            var type = request.GetEntity<ProjectType>(database.ProjectTypes, "TypeID");
            var supportCategory = request.GetEntity<ProjectSupportCategory>(database.ProjectSupportCategories, "SupportCategoryID");
            var fundContract = request.GetMoney("FundContract").Value;
            var fundPlanIn = request.GetMoney("FundPlanIn").Value;

            return ProjectInfo_Fund.CalculateOverheadExpenseInTotal(type, supportCategory, fundContract, fundPlanIn);
        }
        private static long getProjectInfo_Fund_OverheadExpenseOutTotal(this HttpRequest request, IDatabase database, Project project, ProjectInfo_Fund fund, User user)
        {
            if (user.CanCustomOverheadExpense(project))
                return request.GetMoney("OverheadExpenseOutTotal").Value;

            var type = request.GetEntity<ProjectType>(database.ProjectTypes, "TypeID");
            var supportCategory = request.GetEntity<ProjectSupportCategory>(database.ProjectSupportCategories, "SupportCategoryID");
            var fundContract = request.GetMoney("FundContract").Value;
            var fundPlanOut = request.GetMoney("FundPlanOut").Value;

            return ProjectInfo_Fund.CalculateOverheadExpenseOutTotal(type, supportCategory, fundContract, fundPlanOut);
        }

        private static ProjectInfo_Type getProjectInfo_Type(this HttpRequest request, IDatabase database, Project project, User user)
        {
            var type = project.Type;
            if (project.IsNew)
            {
                type = new ProjectInfo_Type();
                type.Project = project;
            }


            type.Rank = request.getProject_IsHorizontal() ? database.ProjectRanks.GetHorizontlProjectRank() : request.GetEntity<ProjectRank>(database.ProjectRanks, "RankID");
            type.Type = request.GetEntity<ProjectType>(database.ProjectTypes, "TypeID");
            type.SupportCategory = request.GetEntity<ProjectSupportCategory>(database.ProjectSupportCategories, "SupportCategoryID");
            type.SupportField = request.GetEntity<ProjectSupportField>(database.ProjectSupportFields, "SupportFieldID");
            type.SupportSubField = request.GetEntity<ProjectSupportSubField>(database.ProjectSupportSubFields, "SupportSubFieldID");

            return type;
        }

        private static ProjectStateHistory getProjectNewState(this HttpRequest request, Project project, User user)
        {
            var newState = new ProjectStateHistory();

            newState.DateTime = DateTime.Now;
            newState.Operator = user.Name;
            newState.Project = project;
            newState.State = request.GetEnum<ProjectState>("State");
            newState.Remark = request.GetString("Remark");

            return newState;
        }
        /// <summary>
        /// 根据projectId取得项目
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Project getProjectByID(this HttpRequest request, IDatabase database)
        {
            return request.GetEntity(database.Projects, "projectId");
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldProject(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getProject(database, user).Clone();
            return oldEntity;
        }
    }
}
