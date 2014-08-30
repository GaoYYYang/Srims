using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class EmailWebService : WebServiceBase
    {
        [WebMethod]
        public void SendEmail()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var description = Request.GetMailDetail();
                Log.Write(User.Name, (int)LogType.SendEmail, description, Request.UserHostAddress, "发送邮件", Database);

                Request.SendMail(User, Database);
                ts.Complete();
            }
        }
    }
}
