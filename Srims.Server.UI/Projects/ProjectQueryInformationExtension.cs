using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Type;

using Srims.Server.UI.Experts;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Projects
{
    /// <summary>
    /// 项目查询相关扩展
    /// </summary>
    public static class ProjectQueryInformationExtension
    {
        /// <summary>
        /// 取得项目查询条件
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ProjectQueryInformation GetProjectQueryInformation(this HttpRequest request, User user)
        {
            var projectQueryInformation = new ProjectQueryInformation();

            projectQueryInformation.Start = request.GetQueryInformation_Start();
            projectQueryInformation.Limit = request.GetQueryInformation_Limit();
            projectQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            projectQueryInformation.Basic = request.getProjectQueryInformation_Basic();
            projectQueryInformation.Fund = request.getProjectQueryInformation_Fund();
            projectQueryInformation.Type = request.getProjectQueryInformation_Type();
            projectQueryInformation.Member = request.getProjectQueryInformation_Member();
            projectQueryInformation.State = request.getProjectQueryInformation_State(user);

            return projectQueryInformation;
        }
        private static ProjectQueryInformation_Basic getProjectQueryInformation_Basic(this HttpRequest request)
        {
            var queryInformation = new ProjectQueryInformation_Basic();

            queryInformation.Number = request.GetString("Number");
            queryInformation.Name = request.GetString("Name");
            queryInformation.Principal = request.GetString("Principal");
            queryInformation.IsHorizontal = request.GetBoolean("IsHorizontal");
            queryInformation.ExpertAttendType = request.GetEnum<ExpertAttendType>("ExpertAttendType");
            queryInformation.EndDate = request.GetDateRange("EndDate");
            queryInformation.CooperationTypes = request.GetList<String>("CooperationType");
            queryInformation.CorporationPlace = request.GetString("CorporationPlace");
            queryInformation.IsSecret = request.GetBoolean("IsSecret");
            queryInformation.PrincipalCollege = request.GetString("PrincipalCollege");
            queryInformation.ProjectLevels = request.GetEnumList<ProjectLevel>("Level");
            queryInformation.SearchTypes = request.GetList<String>("SearchType");
            queryInformation.StartDate = request.GetDateRange("StartDate");
            queryInformation.SubjectCode = request.GetString("SubjectCode");
            queryInformation.TaskFroms = request.GetString("TaskFroms");
            queryInformation.IsCensor = request.GetBoolean("IsCensor");

            if (queryInformation.isSetQueryInformation())
                return queryInformation;

            return null;
        }
        private static bool isSetQueryInformation(this ProjectQueryInformation_Basic queryInformation)
        {
            return !queryInformation.CooperationTypes.IsEmptyOrNull()
                || !queryInformation.CorporationPlace.IsEmptyOrNull()
                || !queryInformation.EndDate.IsEmptyOrNull()
                || !queryInformation.IsCensor.IsEmptyOrNull()
                || !queryInformation.IsHorizontal.IsEmptyOrNull()
                || !queryInformation.IsSecret.IsEmptyOrNull()
                || !queryInformation.Name.IsEmptyOrNull()
                || !queryInformation.Number.IsEmptyOrNull()
                || !queryInformation.Principal.IsEmptyOrNull()
                || !queryInformation.PrincipalCollege.IsEmptyOrNull()
                || !queryInformation.ProjectLevels.IsEmptyOrNull()
                || !queryInformation.SearchTypes.IsEmptyOrNull()
                || !queryInformation.StartDate.IsEmptyOrNull()
                || !queryInformation.SubjectCode.IsEmptyOrNull()
                || !queryInformation.TaskFroms.IsEmptyOrNull()
                || queryInformation.ExpertAttendType != ExpertAttendType.Unknown;
        }
        private static ProjectQueryInformation_State getProjectQueryInformation_State(this HttpRequest request, User user)
        {
            var queryInformation = new ProjectQueryInformation_State();
            queryInformation.ProjectStates = request.GetEnumList<ProjectState>("State");

            if (user.IsExpert)
                return queryInformation;

            if (queryInformation.ProjectStates != null && queryInformation.ProjectStates.Length != 0)
                return queryInformation;

            queryInformation.ProjectStates = Project.AvailableProjectStates;
            return queryInformation;
        }
        private static ProjectQueryInformation_Fund getProjectQueryInformation_Fund(this HttpRequest request)
        {
            var queryInformation = new ProjectQueryInformation_Fund();

            queryInformation.FundTotal = request.GetMoneyRange("FundTotal");
            queryInformation.FundContract = request.GetMoneyRange("FundContract");
            queryInformation.FundReceived = request.GetMoneyRange("FundReceived");
            queryInformation.FundFroms = request.GetList<String>("FundFroms");
            queryInformation.IsBorrowMoney = request.GetBoolean("IsBorrowMoney");
            queryInformation.IsNotReturnAll = request.GetBoolean("IsNotReturnAll");

            if (queryInformation.isSetQueryInformation())
                return queryInformation;

            return null;
        }
        private static bool isSetQueryInformation(this ProjectQueryInformation_Fund queryInformation)
        {
            return !queryInformation.FundContract.IsEmptyOrNull()
                || !queryInformation.FundFroms.IsEmptyOrNull()
                || !queryInformation.FundTotal.IsEmptyOrNull()
                || !queryInformation.FundReceived.IsEmptyOrNull()
                || !queryInformation.IsBorrowMoney.IsEmptyOrNull()
                || !queryInformation.IsNotReturnAll.IsEmptyOrNull();
        }
        private static ProjectQueryInformation_Type getProjectQueryInformation_Type(this HttpRequest request)
        {
            var queryInformation = new ProjectQueryInformation_Type();

            queryInformation.projectRanks = request.GetList<String>("RankName");
            queryInformation.projectTypes = request.GetList<String>("TypeName");
            queryInformation.projectSupportCategories = request.GetList<String>("SupportCategoryName");
            queryInformation.projectSupportFields = request.GetList<String>("SupportFieldName");
            queryInformation.projcectSubjectNature = request.GetEnum<SubjectNature>("subjectNature");
            queryInformation.projectSupportSubFields = request.GetList<String>("SupportSubFieldName");
            if (queryInformation.projectTypes == null || queryInformation.projectTypes.Length == 0)
                queryInformation.projectTypes = request.GetList<String>("TypeShortName");

            if (queryInformation.isSetQueryInformation())
                return queryInformation;

            return null;
        }
        private static bool isSetQueryInformation(this ProjectQueryInformation_Type queryInformation)
        {
            return !queryInformation.projectRanks.IsEmptyOrNull()
                || !queryInformation.projectSupportCategories.IsEmptyOrNull()
                || !queryInformation.projectSupportFields.IsEmptyOrNull()
                || !queryInformation.projectSupportSubFields.IsEmptyOrNull()
                || !queryInformation.projectTypes.IsEmptyOrNull()
                || queryInformation.projcectSubjectNature != SubjectNature.Unknown;
        }
        private static ProjectQueryInformation_Member getProjectQueryInformation_Member(this HttpRequest request)
        {
            var queryInformation = new ProjectQueryInformation_Member();

            queryInformation.projectMemberQueryInformation = request.GetExpertQueryInformation_Basic();

            if (queryInformation.projectMemberQueryInformation != null)
                return queryInformation;

            return null;
        }
    }
}
