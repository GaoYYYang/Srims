using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Patents;
using Srims.Server.UI.Experts;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Patents
{
    /// <summary>
    /// 专利查询信息扩展
    /// </summary>
    public static class PatentQueryInformationExtension
    {
        /// <summary>
        /// 取得专利的查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static PatentQueryInformation GetPatentQueryInformation(this HttpRequest request)
        {
            PatentQueryInformation patentQueryInformation = new PatentQueryInformation();
            patentQueryInformation.Start = request.GetQueryInformation_Start();
            patentQueryInformation.Limit = request.GetQueryInformation_Limit();
            patentQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();
            patentQueryInformation.BasicInformation = request.getPatentQueryInformation_Basic();
            patentQueryInformation.InventerInformation = request.getPatentQueryInformation_Inventer();

            return patentQueryInformation;
        }
        /// <summary>
        /// 取得专利的基本查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private static PatentQueryInformation_Basic getPatentQueryInformation_Basic(this HttpRequest request)
        {
            PatentQueryInformation_Basic queryInfomation = new PatentQueryInformation_Basic();

            queryInfomation.Name = request.GetString("Name");
            queryInfomation.CollegeName = request.GetString("CollegeName");
            queryInfomation.Number = request.GetString("Number");
            queryInfomation.ApplicationDateTime = request.GetDateRange("ApplicationDateTime");
            queryInfomation.AuthorizeDateTime = request.GetDateRange("AuthorizeDateTime");
            queryInfomation.LawStates = request.GetEnumList<PatentLawState>("LawStates");
            queryInfomation.LawStateTime = request.GetDateRange("LawStateTime");
            queryInfomation.Countrys = request.GetList<String>("Countrys");
            queryInfomation.Categorys = request.GetList<String>("Categorys");
            queryInfomation.Types = request.GetEnumList<PatentType>("Types");
            queryInfomation.Levels = request.GetEnumList<PatentLevel>("Levels");
            queryInfomation.IsAccredited = request.GetBoolean("IsAccredited");

            if (queryInfomation.isSetQueryInformation())
                return queryInfomation;

            return null;
        }
        /// <summary>
        /// 取得专利的发明人查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private static PatentQueryInformation_Inventer getPatentQueryInformation_Inventer(this HttpRequest request)
        {
            PatentQueryInformation_Inventer queryInformation = new PatentQueryInformation_Inventer();

            queryInformation.PatentInventer = request.GetString("PatentInventer");
            queryInformation.InventOrder = request.GetInt("InventerOrder");
            queryInformation.IsPrincipal = request.GetBoolean("IsPrincipal");
            queryInformation.AuthorQueryInformation = request.GetExpertQueryInformation_Basic();

            if (queryInformation.isSetQueryInformation())
                return queryInformation;

            return null;
        }

        /// <summary>
        /// 判断基本查询信息是否不为空
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static bool isSetQueryInformation(this PatentQueryInformation_Basic queryInformation)
        {
            return !queryInformation.Name.IsEmptyOrNull()
                || !queryInformation.CollegeName.IsEmptyOrNull()
                || !queryInformation.Number.IsEmptyOrNull()
                || !queryInformation.ApplicationDateTime.IsEmptyOrNull()
                || !queryInformation.AuthorizeDateTime.IsEmptyOrNull()
                || !queryInformation.LawStates.IsEmptyOrNull()
                || !queryInformation.LawStateTime.IsEmptyOrNull()
                || !queryInformation.Countrys.IsEmptyOrNull()
                || !queryInformation.Categorys.IsEmptyOrNull()
                || !queryInformation.Types.IsEmptyOrNull()
                || !queryInformation.Levels.IsEmptyOrNull()
                || !queryInformation.IsAccredited.IsEmptyOrNull();
        }

        /// <summary>
        /// 判断发明人查询信息是否不为空
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static bool isSetQueryInformation(this PatentQueryInformation_Inventer queryInformation)
        {
            return !queryInformation.PatentInventer.IsEmptyOrNull()
                || !queryInformation.InventOrder.IsEmptyOrNull()
                || queryInformation.IsPrincipal != null
                ||queryInformation.AuthorQueryInformation!=null;
        }
    }
}
