using System;
using System.Collections;
using System.Collections.Generic;
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
using MIS.Common.Query;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class LogService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Logs
                .Query(Request.GetLogQueryInformation())
                .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var systemsetting = new SystemSetting();
            var logSets = Request.GetEnumList<LogType>("LogType");

            systemsetting.SetNeedWriteLoyTypeString(logSets, Database);
        }
        [WebMethod]
        public void GetLogType()
        {
            Response.WriteXmlHead();
            Database
                .Logs
                .GetLogType()
                .Show(Response);
        }
    }
}
