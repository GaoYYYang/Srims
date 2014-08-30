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
    public static class OutsourcingUnitQueryInformationExtension
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static OutsourcingUnitQueryInformation GetOutsourcingUnitQueryInformation(this HttpRequest request)
        {
            var outsourcingQueryInformation = new OutsourcingUnitQueryInformation();
            outsourcingQueryInformation.Start = request.GetQueryInformation_Start();
            outsourcingQueryInformation.Limit = request.GetQueryInformation_Limit();
            outsourcingQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            outsourcingQueryInformation.Name = request.GetString("name");
            outsourcingQueryInformation.FieldCompanyType = request.GetString("FieldCompanyType");
            outsourcingQueryInformation.ManagementType = request.GetString("ManagementType");
            outsourcingQueryInformation.OrganizationCode = request.GetString("OrganizationCode");
            outsourcingQueryInformation.RegisteredCapitalEnd = request.GetString("RegisteredCapitalEnd");
            outsourcingQueryInformation.RegisteredCapitalStart = request.GetString("RegisteredCapitalStart");
            outsourcingQueryInformation.RegisteredCardNumber = request.GetString("RegisteredCardNumber");
            outsourcingQueryInformation.RepresentativeName = request.GetString("legalRepresentativeName");
            outsourcingQueryInformation.TaxNumber = request.GetString("TaxNumber");
            outsourcingQueryInformation.IsVerify = request.GetString("isVerify");
            return outsourcingQueryInformation;
        }
    }
}
