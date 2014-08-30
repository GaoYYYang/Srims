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
    public static class StampApplicationTypeQueryInformationExtension
    {
        /// <summary>
        /// 取得文印查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static StampApplicationTypeQueryInformation GetStampApplicationTypeQueryInformation(this HttpRequest request)
        {
            var queryInformation = new StampApplicationTypeQueryInformation();

            queryInformation.Start = request.GetQueryInformation_Start();
            queryInformation.Limit = request.GetQueryInformation_Limit();
            queryInformation.SortInfor = request.GetQueryCondition_SortInfo();

            queryInformation.ID = request.GetInt("ID");
            queryInformation.StampApplicationTypeGroupID = request.GetInt("StampApplicationTypeGroupID");
            queryInformation.IsTwiceCancer = request.GetBoolean("IsTwiceCancer");
            queryInformation.IsProjectRelated = request.GetBoolean("IsProjectRelated");
          

            return queryInformation;
        }
    }
}
