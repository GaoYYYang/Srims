using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.Stamps;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Stamps;

namespace Srims.WebSite.Service.Stamps
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StampStateHistoryWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByStampID()
        {
            var stampID = Request.GetInt("StampApplicationID").HasValue ? Request.GetInt("StampApplicationID").Value : 0;

            Response.WriteXmlHead();
            Database
                .StampStateHistories
                .GetStampStateHistory(stampID)
                .Show(Response, StampStateHistoryExtension.Show);
        }
    }
}
