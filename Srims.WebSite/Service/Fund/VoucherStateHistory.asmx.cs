using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

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
    public class VoucherStateHistoryWebService :WebServiceBase
    {

        [WebMethod]
        public void GetVoucherStateHistories()
        {
            Response.WriteXmlHead();
            Database
                .VoucherStateHistories
                .GetByVoucherID(Request.GetInt("VoucherID").Value)
                .Show(Response, VoucherStateHistoryExtension.Show);
        }
    }
}
