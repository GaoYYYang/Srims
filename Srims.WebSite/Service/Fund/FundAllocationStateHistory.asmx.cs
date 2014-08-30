using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Collections.Generic;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Fund
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class FundAllocationStateHistoryWebService : WebServiceBase
    {
        [WebMethod]
        public void GetByFundAllocation()
        {
            Response.WriteXmlHead();
            Database
                .FundAllocationStateHistories
                .GetByFundAllocation(Request.GetInt("FundAllocationID").Value)
                .Show(Response, FundAllocationStateHistoryExtension.Show);
        }
    }
}
