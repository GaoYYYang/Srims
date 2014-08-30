using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.Business.Type;

using Srims.Server.UI;
using Srims.Server.UI.Type;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Type
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectRankService : WebServiceBase
    {
        [WebMethod]
        public void GetForQuery()
        {
            Response.WriteXmlHead();
            Database
                .ProjectRanks
                .GetForQuery(Request.GetBoolean("IsHorizontal"), User)
                .Show(Response);
        }
        [WebMethod]
        public void GetVerticalRanksForEdit()
        {
            Response.WriteXmlHead();
            Database
                .ProjectRanks
                .GetVerticalRanksForEdit(User)
                .Show(Response);
        }
        [WebMethod]
        public void GetRankString()
        {
            Response.WriteXmlHead();
            Database
                .ProjectRanks
                .GetProjectRankString()
                .Show(Response);
        }
        [WebMethod]
        public void GetTypeString()
        {
            bool isNeedPermission = Request.GetBoolean("isPermission").Value;
            var currentUser = isNeedPermission ? User : null;
            Database
                .ProjectRanks
                .GetForQuery(Request.GetBoolean("node"), currentUser)
                .ShowRankNodeData(currentUser, Database, Response);
        }
        [WebMethod]
        public void GetAllRanks()
        {
            Response.WriteXmlHead();
            Database.ProjectRanks.GetProjectRanks().Show(Response, ProjectRankExtension.ShowProjectRank);
        }
        [WebMethod]
        public void GetAllRanksForFilter()
        {
            Response.WriteXmlHead();
            Database.ProjectRanks.GetProjectRanks().ShowForFilter(Response);
        }
    }
}
