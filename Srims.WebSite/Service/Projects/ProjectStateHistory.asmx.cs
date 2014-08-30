using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;


using Srims.Server.UI;
using Srims.Server.UI.Projects;
using Srims.Server.UI.Users;
using Srims.Server.UI.HttpExtension;

namespace Srims.WebSite.Service.Projects
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectStateHistoryService : WebServiceBase
    {
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            if (!User.CanShowProjectStateHistory(project, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .ProjectStateHistories
                .GetByProject(project)
                .Show(Response);
        }
    }
}
