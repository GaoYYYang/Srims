using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Stamps;
using System.Web;

using Srims.Server.UI.Experts;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 文印查询信息扩展
    /// </summary>
    public static class StampQueryInformationExtension
    {
        /// <summary>
        /// 取得文印查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static StampQueryInformation GetStampQueryInformation(this HttpRequest request)
        {
            var queryInformation = new StampQueryInformation();

            queryInformation.Start = request.GetQueryInformation_Start();
            queryInformation.Limit = request.GetQueryInformation_Limit();
            queryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            queryInformation.CurrentState = request.GetEnumList<StampState>("CurrentState");
            queryInformation.KeyWord = request.GetString("KeyWord");
            queryInformation.Manager = request.GetString("Manager");
            queryInformation.Principal = request.GetString("Principal");
            queryInformation.StampAdministrator = request.GetString("StampAdministrator");
            queryInformation.StampDepartmentAdministrator = request.GetString("StampDepartmentAdministrator");
            queryInformation.StampStuffFromName = request.GetString("StampStuffFromName");
            queryInformation.StampStuffs = request.GetList<string>("StampStuffs");
            queryInformation.StampTypes = request.GetList<string>("StampTypes");
            queryInformation.StampReasons = request.GetList<string>("StampReasons");

            queryInformation.StateDate = request.GetDateRange("StateDate");

            queryInformation.StampApplicationTypeGroup = request.GetString("StampApplicationTypeGroup");
            queryInformation.StampApplicationType = request.GetString("StampApplicationType");

            queryInformation.PrincipalQueryInformation = request.GetExpertQueryInformation_Basic();

            return queryInformation;
        }
    }
}
