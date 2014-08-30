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
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Performances;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Common;

namespace Srims.WebSite.Service.Performance
{
    /// <summary>
    /// Summary description for PerformanceAllocationStateHistoryWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class PerformanceAllocationStateHistoryWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByPerformanceAllocation()
        {
            Response.WriteXmlHead();
            Database
                .PerformanceAllocationStateHistories
                .GetByPerformanceAllocation(Request.GetInt("performanceID").Value)
                .Show(Response, PerformanceAllocationStateHistoryExtension.Show);
        }
    }
}
