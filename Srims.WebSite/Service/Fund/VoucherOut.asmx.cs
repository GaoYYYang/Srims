using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

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
    public class VoucherOutWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByVoucherID()
        {
            var voucherID = Request.GetInt("VoucherID").HasValue ? Request.GetInt("VoucherID").Value : 0;

            Response.WriteXmlHead();
            Database
                .VoucherOuts
                .GetByVoucherID(voucherID)
                .Show(Response);
        }
        //返回经费分配时外协单位基本信息
        [WebMethod]
        public void GetOutInfo()
        {
            var fundAllocationID = Request.GetInt("FundAllocationID").HasValue ? Request.GetInt("FundAllocationID").Value : 0;
            Response.WriteXmlHead();
            Database
                .ProjectOuts
                .GetByFundAllocationID(Database,fundAllocationID)
                .ShowForAllcation(Response,Database);
        }
    }
}
