using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Experts;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Projects;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Experts
{
    /// <summary>
    /// 专家查询扩展
    /// </summary>
    public static class ExpertQueryInformationExtension
    {
        /// <summary>
        /// 获得专家的查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static ExpertQueryInformation GetExpertQueryInformation(this HttpRequest request)
        {
            ExpertQueryInformation expertQueryInformation = new ExpertQueryInformation();

            expertQueryInformation.sortInfo = request.GetQueryCondition_SortInfo();
            expertQueryInformation.Start = request.GetQueryInformation_Start();
            expertQueryInformation.Limit = request.GetQueryInformation_Limit();

            expertQueryInformation.IsOr = request.GetBoolean("IsOr");
            expertQueryInformation.Basic = request.GetExpertQueryInformation_Basic();

            expertQueryInformation.PaperQueryInformation = request.GetExpertQueryInformation_Paper();
            expertQueryInformation.PaperQueryInformation_Order = request.GetIntRange("AuthorOrder");
            expertQueryInformation.PaperQueryInformation_IsLinkMan = request.GetBoolean("IsLinkMan");
            expertQueryInformation.PaperQueryInformation_Count = request.GetIntRange("PaperCount");

            expertQueryInformation.PatentQueryInformation = request.GetExpertQueryInformation_Patent();
            expertQueryInformation.PatentQueryInformation_Order = request.GetIntRange("InventorOrder");
            expertQueryInformation.PatentQueryInformation_IsPrincipal = request.GetBoolean("IsPrincipal");
            expertQueryInformation.PatentQueryInformation_Count = request.GetIntRange("PatentCount");

            expertQueryInformation.AwardQueryInformation = request.GetExpertQueryInformation_Award();
            expertQueryInformation.AwardQueryInformation_Order = request.GetIntRange("AwardWinnerOder");
            expertQueryInformation.AwardQueryInformation_Count = request.GetIntRange("AwardCount");

            expertQueryInformation.ProjectQueryInformation = request.GetExpertQueryInformation_Project();
            expertQueryInformation.ProjectQueryInformation_Count = request.GetIntRange("ProjectCount");
            expertQueryInformation.ProjectQueryInformation_Fund_Count = request.GetMoneyRange("FundCount");
            expertQueryInformation.IsProjectCountOrFundTotal = request.GetBoolean("IsFundTotalOrProjectCount");

            return expertQueryInformation;
        }
        /// <summary>
        /// 获得专家的基本查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static ExpertQueryInformation_Basic GetExpertQueryInformation_Basic(this HttpRequest request)
        {
            ExpertQueryInformation_Basic expertqueryInformation_Basic = new ExpertQueryInformation_Basic();

            expertqueryInformation_Basic.Name = request.GetString("Name");
            expertqueryInformation_Basic.Number = request.GetString("Number");
            expertqueryInformation_Basic.ExpertCollege = request.GetString("College");
            expertqueryInformation_Basic.ExpertPostLevel = request.GetIntRange("PostLevel");
            expertqueryInformation_Basic.ExpertAcademyDegree = request.GetList<String>("AcademyDegree");
            expertqueryInformation_Basic.ExpertBirthday = request.GetDateRange("Birthday");
            expertqueryInformation_Basic.IsPostOrAcademyDegree = request.GetBoolean("IsPostOrAcademyDegree");
            expertqueryInformation_Basic.IsDotorDirector = request.GetBoolean("IsDoctorDirector");

            if (expertqueryInformation_Basic.isSetQueryInformation())
                return expertqueryInformation_Basic;

            return null;
        }
        /// <summary>
        /// 获得专家的奖励查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static AwardQueryInformation GetExpertQueryInformation_Award(this HttpRequest request)
        {
            AwardQueryInformation expertQueryInformaion_Award = new AwardQueryInformation();
            expertQueryInformaion_Award.BasicInformation = new AwardQueryInformation_Basic();

            expertQueryInformaion_Award.BasicInformation.Year = request.GetIntRange("AwardYear");
            expertQueryInformaion_Award.BasicInformation.Ranks = request.GetList<string>("AwardRank");
            expertQueryInformaion_Award.BasicInformation.Classes = request.GetList<string>("AwardClass");
            expertQueryInformaion_Award.BasicInformation.Classification = request.GetList<string>("AwardClassification");

            if (expertQueryInformaion_Award.isSetQueryInformation())
                return expertQueryInformaion_Award;

            return null;
        }
        /// <summary>
        /// 获得专家的论文查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static PaperQueryInformation GetExpertQueryInformation_Paper(this HttpRequest request)
        {
            PaperQueryInformation expertQueryInformation_Paper = new PaperQueryInformation();
            expertQueryInformation_Paper.Basic = new PaperQueryInformation_Basic();
            expertQueryInformation_Paper.Indexed = new PaperQueryInformation_Indexed();

            expertQueryInformation_Paper.Basic.PulishDateTimeYear = request.GetIntRange("PublishYear");
            expertQueryInformation_Paper.Indexed.Indexed = request.GetEnumList<PaperIndexedType>("PaperIndexed");
            expertQueryInformation_Paper.Basic.InfluenceFactor = request.GetIntRange("InfluenceFactor");

            if (expertQueryInformation_Paper.isSetQueryInformation())
                return expertQueryInformation_Paper;

            return null;
        }
        /// <summary>
        /// 取得专家的专利查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static PatentQueryInformation GetExpertQueryInformation_Patent(this HttpRequest request)
        {
            PatentQueryInformation expertQueryInformation_Patent = new PatentQueryInformation();
            expertQueryInformation_Patent.BasicInformation = new PatentQueryInformation_Basic();

            expertQueryInformation_Patent.BasicInformation.AuthorizeDateTime = request.GetDateRange("AuthorizedTime");
            expertQueryInformation_Patent.BasicInformation.ApplicationDateTime = request.GetDateRange("ApplicationTime");
            expertQueryInformation_Patent.BasicInformation.IsAccredited = request.GetBoolean("IsAccredited");
            expertQueryInformation_Patent.BasicInformation.LawStates = request.GetEnumList<PatentLawState>("PatentLawState");
            expertQueryInformation_Patent.BasicInformation.Types = request.GetEnumList<PatentType>("PatentTypes");

            if (expertQueryInformation_Patent.isSetQueryInformation())
                return expertQueryInformation_Patent;

            return null;
        }
        /// <summary>
        /// 取得专家的项目查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static ProjectQueryInformation GetExpertQueryInformation_Project(this HttpRequest request)
        {
            ProjectQueryInformation expertQueryInformation_Project = new ProjectQueryInformation();
            expertQueryInformation_Project.Basic = new ProjectQueryInformation_Basic();
            expertQueryInformation_Project.State = new ProjectQueryInformation_State();
            expertQueryInformation_Project.Fund = new ProjectQueryInformation_Fund();
            expertQueryInformation_Project.Type = new ProjectQueryInformation_Type();

            expertQueryInformation_Project.Basic.StartDate = request.GetDateRange("ProjectStartDate");
            expertQueryInformation_Project.Basic.EndDate = request.GetDateRange("ProjectEndDate");
            expertQueryInformation_Project.Fund.FundContract = request.GetMoneyRange("ProjectFundContract");
            expertQueryInformation_Project.Fund.FundTotal = request.GetMoneyRange("ProjectFundTotal");
            expertQueryInformation_Project.Fund.FundFroms = request.GetList<string>("ProjectFundFrom");
            expertQueryInformation_Project.Basic.IsSecret = request.GetBoolean("ProjectIsSecret");
            expertQueryInformation_Project.Basic.ProjectLevels = request.GetEnumList<ProjectLevel>("ProjectLevel");
            expertQueryInformation_Project.State.ProjectStates = request.GetEnumList<ProjectState>("ProjectState");
            expertQueryInformation_Project.Type.projectRanks = request.GetList<string>("ProjectRank");

            if (expertQueryInformation_Project.isSetQueryInformation())
                return expertQueryInformation_Project;

            return null;
        }
        /// <summary>
        /// 是否显示项目总数
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static bool ShowProjectCount(this HttpRequest request)
        {
            var queryInformation = request.GetExpertQueryInformation();
            if (queryInformation == null)
                return false;

            if (queryInformation.ProjectQueryInformation != null || queryInformation.ProjectQueryInformation_Count != null || queryInformation.ProjectQueryInformation_Fund_Count != null)
                return true;

            return false;
        }
        /// <summary>
        /// 是否显示论文总数
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static bool ShowPaperCount(this HttpRequest request)
        {
            var queryInformation = request.GetExpertQueryInformation();
            if (queryInformation == null)
                return false;

            if (queryInformation.PaperQueryInformation != null || queryInformation.PaperQueryInformation_Count != null || queryInformation.PaperQueryInformation_IsLinkMan != null || queryInformation.PaperQueryInformation_Order != null)
                return true;

            return false;
        }
        /// <summary>
        /// 是否显示专利总数
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static bool ShowPatentCount(this HttpRequest request)
        {
            var queryInformation = request.GetExpertQueryInformation();
            if (queryInformation == null)
                return false;

            if (queryInformation.PatentQueryInformation != null || queryInformation.PatentQueryInformation_Count != null || queryInformation.PatentQueryInformation_IsPrincipal != null || queryInformation.PatentQueryInformation_Order != null)
                return true;

            return false;
        }
        /// <summary>
        /// 是否显示奖励总数
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static bool ShowAwardCount(this HttpRequest request)
        {
            var queryInformation = request.GetExpertQueryInformation();
            if (queryInformation == null)
                return false;

            if (queryInformation.AwardQueryInformation != null || queryInformation.AwardQueryInformation_Count != null || queryInformation.AwardQueryInformation_Order != null)
                return true;

            return false;
        }
        private static bool isSetQueryInformation(this ExpertQueryInformation_Basic queryInformation)
        {
            return !queryInformation.Name.IsEmptyOrNull()
                || !queryInformation.Number.IsEmptyOrNull()
                || !queryInformation.ExpertCollege.IsEmptyOrNull()
                || !queryInformation.ExpertPostLevel.IsEmptyOrNull<int>()
                || !queryInformation.ExpertAcademyDegree.IsEmptyOrNull()
                || !queryInformation.ExpertBirthday.IsEmptyOrNull<DateTime>()
                || !queryInformation.IsPostOrAcademyDegree.IsEmptyOrNull()
                || !queryInformation.IsDotorDirector.IsEmptyOrNull();
        }
        private static bool isSetQueryInformation(this AwardQueryInformation queryInformation)
        {
            return !queryInformation.BasicInformation.Year.IsEmptyOrNull()
                || !queryInformation.BasicInformation.Classes.IsEmptyOrNull()
                || !queryInformation.BasicInformation.Ranks.IsEmptyOrNull()
                || !queryInformation.BasicInformation.Classification.IsEmptyOrNull();
        }
        private static bool isSetQueryInformation(this PaperQueryInformation paperQueryInformation)
        {
            return !paperQueryInformation.Indexed.Indexed.IsEmptyOrNull()
                || !paperQueryInformation.Basic.InfluenceFactor.IsEmptyOrNull()
                || !paperQueryInformation.Basic.PulishDateTimeYear.IsEmptyOrNull();
        }
        private static bool isSetQueryInformation(this PatentQueryInformation patentQueryInformation)
        {
            return !patentQueryInformation.BasicInformation.ApplicationDateTime.IsEmptyOrNull()
                || !patentQueryInformation.BasicInformation.AuthorizeDateTime.IsEmptyOrNull()
                || patentQueryInformation.BasicInformation.IsAccredited.HasValue
                || !patentQueryInformation.BasicInformation.LawStates.IsEmptyOrNull()
                || !patentQueryInformation.BasicInformation.Types.IsEmptyOrNull();
        }
        private static bool isSetQueryInformation(this ProjectQueryInformation projectQueryInformation)
        {
            return !projectQueryInformation.Basic.StartDate.IsEmptyOrNull()
                || !projectQueryInformation.Basic.EndDate.IsEmptyOrNull()
                || !projectQueryInformation.Fund.FundContract.IsEmptyOrNull()
                || !projectQueryInformation.Fund.FundTotal.IsEmptyOrNull()
                || !projectQueryInformation.Fund.FundFroms.IsEmptyOrNull()
                || projectQueryInformation.Basic.IsSecret.HasValue
                || !projectQueryInformation.Basic.ProjectLevels.IsEmptyOrNull()
                || !projectQueryInformation.State.ProjectStates.IsEmptyOrNull()
                || !projectQueryInformation.Type.projectRanks.IsEmptyOrNull();
        }
    }
}
