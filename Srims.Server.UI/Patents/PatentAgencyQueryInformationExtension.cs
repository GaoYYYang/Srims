using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Patents;
using System.Web;

using Srims.Server.UI.Experts;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Patents
{
    /// <summary>
    /// 专利代理机构查询扩展
    /// </summary>
    public static class PatentAgencyQueryInformationExtension
    {
        /// <summary>
        /// 取得专利代理机构查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static PatentAgencyQueryInformation GetPatentAgencyQueryInformation(this HttpRequest request)
        {
            PatentAgencyQueryInformation patentAgencyQueryInformation = new PatentAgencyQueryInformation();
            patentAgencyQueryInformation.Start = request.GetQueryInformation_Start();
            patentAgencyQueryInformation.Limit = request.GetQueryInformation_Limit();
            patentAgencyQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            patentAgencyQueryInformation.AgencyName = request.GetString("AgencyName");
            patentAgencyQueryInformation.Contract = request.GetString("Contract");

            return patentAgencyQueryInformation;

        }
    }
}
