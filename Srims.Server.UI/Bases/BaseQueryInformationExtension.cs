using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Bases
{
    /// <summary>
    /// 基地查询扩展
    /// </summary>
    public static class BaseQueryInformationExtension
    {
        /// <summary>
        /// 取得基地的查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static BaseQueryInformation GetBaseQueryInformation(this HttpRequest request)
        {
            var baseQueryInformation = new BaseQueryInformation();

            baseQueryInformation.Start = request.GetQueryInformation_Start();
            baseQueryInformation.Limit = request.GetQueryInformation_Limit();
            baseQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            baseQueryInformation.Name = request.GetString("Name");
            baseQueryInformation.Ranks = request.GetList<string>("Rank");

            return baseQueryInformation;
        }
    }
}
