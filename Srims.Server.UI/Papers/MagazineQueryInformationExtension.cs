using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Papers;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 杂志查询信息扩展
    /// </summary>
    public static class MagazineQueryInformationExtension
    {
        /// <summary>
        /// 取得杂志查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static MagazineQueryInformation GetMagazineQueryInformation(this HttpRequest request)
        {
            var magazineQueryInformation = new MagazineQueryInformation();

            magazineQueryInformation.Start = request.GetQueryInformation_Start();
            magazineQueryInformation.Limit = request.GetQueryInformation_Limit();
            magazineQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            magazineQueryInformation.Basic = request.getMagazineQueryInformation_Basic();
            magazineQueryInformation.Infor = request.getMagazineQueryInformation_Infor();
            magazineQueryInformation.SubjectClass = request.getMagazineQueryInformation_SubjectClass();

            return magazineQueryInformation;
        }
        /// <summary>
        /// 取得杂志基本查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static MagazineQueryInformation_Basic getMagazineQueryInformation_Basic(this HttpRequest request)
        {
            var basic = new MagazineQueryInformation_Basic();
            basic.ISSN = request.GetString("ISSN");
            basic.Language = request.GetEnumList<Language>("Language");
            basic.Name = request.GetString("FullName");
            basic.SubjectRank = request.GetList<String>("SubjectRank");

            if (basic.isSetQueryInformation())
                return basic;

            return null;
        }
        private static bool isSetQueryInformation(this MagazineQueryInformation_Basic queryInformation)
        {
            return !queryInformation.ISSN.IsEmptyOrNull()
                || !queryInformation.Language.IsEmptyOrNull()
                || !queryInformation.Name.IsEmptyOrNull()
                || !queryInformation.SubjectRank.IsEmptyOrNull();
        }
        /// <summary>
        /// 取得杂志信息查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static MagazineQueryInformation_Infor getMagazineQueryInformation_Infor(this HttpRequest request)
        {
            var infor = new MagazineQueryInformation_Infor();
            infor.CiteFrequency = request.GetIntRange("CiteFrequency");
            infor.InfluenceFactor = request.GetIntRange("InfluenceFactor");
            infor.Year = request.GetInt("Year");
            infor.SubAirer = request.GetIntRange("SubAirer");

            if (infor.isSetQueryInformation())
                return infor;

            return null;
        }
        private static bool isSetQueryInformation(this MagazineQueryInformation_Infor queryInformation)
        {
            return !queryInformation.CiteFrequency.IsEmptyOrNull<int>()
                || !queryInformation.InfluenceFactor.IsEmptyOrNull<int>()
                || !queryInformation.Year.IsEmptyOrNull()
                || !queryInformation.SubAirer.IsEmptyOrNull<int>();
        }
        /// <summary>
        /// 取得杂志学科分类查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static MagazineQueryInformation_SubjectClass getMagazineQueryInformation_SubjectClass(this HttpRequest request)
        {
            var subjectClass = new MagazineQueryInformation_SubjectClass();
            subjectClass.SubjectClass = request.GetList<String>("SubjectClass");

            if (subjectClass.isSetQueryInformation())
                return subjectClass;

            return null;
        }
        private static bool isSetQueryInformation(this MagazineQueryInformation_SubjectClass queryInformation)
        {
            return !queryInformation.SubjectClass.IsEmptyOrNull();
        }
    }
}
