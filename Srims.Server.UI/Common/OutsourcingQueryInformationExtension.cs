using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Common;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 外协单位查询条件扩展
    /// </summary>
    public static class OutsourcingQueryInformationExtension
    {
        public static OutsourcingQueryInformation GetOutsourcingQueryInformation(this HttpRequest request)
        {
            var outsourcingQueryInformation = new OutsourcingQueryInformation();

            outsourcingQueryInformation.Start = request.GetQueryInformation_Start();
            outsourcingQueryInformation.Limit = request.GetQueryInformation_Limit();
            outsourcingQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            outsourcingQueryInformation.Name = request.GetString("Name");
            outsourcingQueryInformation.Phone = request.GetString("Phone");
            outsourcingQueryInformation.Director = request.GetString("Director");
            outsourcingQueryInformation.DirectorEmail = request.GetString("DirectorEmail");
            outsourcingQueryInformation.Remark = request.GetString("Remark");
            outsourcingQueryInformation.CreateDateTime = request.GetDateRange("CreateDateTime");

            return outsourcingQueryInformation;
        }
    }
}
