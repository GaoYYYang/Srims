using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

using Srims.Server.UI;
using Srims.Server.UI.Experts;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using MIS.Common.Query;
using System.Transactions;

namespace Srims.WebSite.Service.Experts
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    public class ExpertInfoHistoryWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database.ExpertCensorInfos
                .Query(Request.GetExpertInfoHistoryQueryInformation(), Database)
                .Show(Response, User, Database);
        }

        [WebMethod]
        public void CensorExpertEditInformation()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                ExpertInfoHistory infor = Request.GetWaittingCensoeInfor(Database, User);
                bool? isSubject = Request.GetBoolean("isSubject");
                Expert expert = Request.GetWaittingCensorExpert(Database, User, infor, isSubject);
                infor.Save(Database);
                expert.Save(Database);
                Response.WriteXmlHead();
                ts.Complete();
            }
        }
        [WebMethod]
        public void RejectExpertEditInformation()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                ExpertInfoHistory infor = Request.GetEntity<ExpertInfoHistory>(Database.ExpertCensorInfos, "id");
                infor.CensorOperator = User.Name;
                infor.CensorState = CensorState.Reject;
                infor.CensorTime = DateTime.Now;
                infor.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetWaitingCensorExpertEdit()
        {
            Response.WriteXmlHead();
            Database
                .ExpertCensorInfos
                .GetWaitingCensorCount()
                .Show(Response);
        }
    }
}
