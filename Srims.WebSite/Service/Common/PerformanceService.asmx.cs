using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.HttpExtension;
using MIS.Common.Query;

namespace Srims.WebSite.Service.Common
{
    /// <summary>
    /// Summary description for Outsourcing
    /// </summary>
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class PerformanceService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {

        }
        [WebMethod]
        public void Save()
        {

        }
        [WebMethod]
        public void Delete()
        {

        }
    }
}
