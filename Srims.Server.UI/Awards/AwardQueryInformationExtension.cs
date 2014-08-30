using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Awards;
using System.Web;
using Srims.Server.UI.Experts;
using Srims.Server.Business.Experts;
using Srims.Server.Business;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Awards
{
    /// <summary>
    /// 奖励查询信息扩展
    /// </summary>
    public static class AwardQueryInformationExtension
    {
        /// <summary>
        /// 取得奖励的查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static AwardQueryInformation GetAwardQueryInformation(this HttpRequest request)
        {
            AwardQueryInformation awardQueryInformation = new AwardQueryInformation();
            awardQueryInformation.Start = request.GetQueryInformation_Start();
            awardQueryInformation.Limit = request.GetQueryInformation_Limit();
            awardQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();
            awardQueryInformation.BasicInformation = request.getAwardQueryInformation_Basic();
            awardQueryInformation.WinnerInformation = request.getAwardQueryInformation_Winner();

            return awardQueryInformation;
        }
        /// <summary>
        /// 取得奖励的基本查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private static AwardQueryInformation_Basic getAwardQueryInformation_Basic(this HttpRequest request)
        {
            AwardQueryInformation_Basic queryInfomation = new AwardQueryInformation_Basic();

            queryInfomation.Name = request.GetString("Name");
            queryInfomation.ProjectName = request.GetString("ProjectName");
            queryInfomation.AuthorisedUnit = request.GetList<String>("AuthorisedUnit");
            queryInfomation.Ranks = request.GetList<String>("Rank");
            queryInfomation.Classes = request.GetList<String>("Class");
            queryInfomation.AttendType = request.GetList<String>("AttendType");
            queryInfomation.Classification = request.GetList<String>("Classification");
            queryInfomation.Year = request.GetIntRange("Year");
            queryInfomation.CollegeName = request.GetString("CollegeName");
            queryInfomation.AwardSubjectNature = request.GetEnum<SubjectNature>("subjectNature");

            if (queryInfomation.isSetQueryInformation())
                return queryInfomation;

            return null;
        }
        /// <summary>
        /// 判断基本查询信息是否不为空
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static bool isSetQueryInformation(this AwardQueryInformation_Basic queryInformation)
        {
            return !queryInformation.AttendType.IsEmptyOrNull()
                || !queryInformation.AuthorisedUnit.IsEmptyOrNull()
                || !queryInformation.Classes.IsEmptyOrNull()
                || !queryInformation.Classification.IsEmptyOrNull()
                || !queryInformation.CollegeName.IsEmptyOrNull()
                || !queryInformation.Introduction.IsEmptyOrNull()
                || !queryInformation.Name.IsEmptyOrNull()
                || !queryInformation.ProjectName.IsEmptyOrNull()
                || !queryInformation.Ranks.IsEmptyOrNull()
                || !queryInformation.Year.IsEmptyOrNull()
                || !queryInformation.CollegeName.IsEmptyOrNull()
                || queryInformation.AwardSubjectNature != SubjectNature.Unknown;
        }
        /// <summary>
        /// 取得奖励的获奖者查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private static AwardQueryInformation_Winner getAwardQueryInformation_Winner(this HttpRequest request)
        {
            AwardQueryInformation_Winner queryInformation = new AwardQueryInformation_Winner();

            string awardFirstWinnerName = request.GetString("AwardFirstWinnerName");

            queryInformation.AwardWinnerName = awardFirstWinnerName.IsEmptyOrNull() ? request.GetString("AwardWinnerName") : awardFirstWinnerName;
            queryInformation.AwardWinnerOrder = awardFirstWinnerName.IsEmptyOrNull() ? request.GetInt("AwardWinnerOrder") : 1;
            queryInformation.WinnerQueryInformation = request.GetExpertQueryInformation_Basic();

            if (queryInformation.isSetQueryInformation())
                return queryInformation;

            return null;
        }
        /// <summary>
        /// 判断获奖者查询信息是否不为空
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static bool isSetQueryInformation(this AwardQueryInformation_Winner queryInformation)
        {
            return !queryInformation.AwardWinnerName.IsEmptyOrNull()
                || !queryInformation.AwardWinnerOrder.IsEmptyOrNull()
                || queryInformation.WinnerQueryInformation != null;
        }
    }
}
