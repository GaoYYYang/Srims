using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.Users;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class ViewWebService : WebServiceBase
    {
        [WebMethod]
        public void GetByUser()
        {
            var viewType = Request.GetEnum<ViewType>("ViewType");

            Response.WriteXmlHead();
            Database
              .Views
              .GetByUser(viewType, User)
              .Show(Response, User, Database, ViewExtension.ShowView);
        }
        [WebMethod]
        public void Save()
        {
            var view = Request.GetView(User, Database);
            using (TransactionScope ts = new TransactionScope())
            {
                //TODO 下面写日志
                view.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var view = Request.GetEntity(Database.Views, "ViewId");

            using (TransactionScope ts = new TransactionScope())
            {
                //TODO 下面写日志
                view.Delete(Database);
                ts.Complete();
            }
        }
    }
}
