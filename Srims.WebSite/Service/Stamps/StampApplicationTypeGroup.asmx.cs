using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.UI.Stamps;
using Srims.Server.Business;
using Srims.Server.Business.Stamps;
using System.Transactions;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;


namespace Srims.WebSite.Service.Stamps
{
    /// <summary>
    /// Summary description for StampApplicationTypeGroupWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class StampApplicationTypeGroupWebService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
              .StampApplicationTypeGroups
              .Query(Request.GetQueryInformation())
              .Show(Response, User, Database);
        }
        [WebMethod]
        public void Save()
        {
            var oldStampApplicationType = Request.GetOldStampApplicationTypeGroup(Database, User);
            var stampApplicationType = Request.GetStampApplicationTypeGroup(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = stampApplicationType.IsNew ? "新建" : "编辑";
                description += string.Format("文印申请类型组信息\n ：{0}。\n", stampApplicationType.Name);
                Log.Write(User.Name, stampApplicationType.IsNew ? (int)LogType.AddStamp : (int)LogType.EditStamp, description, Request.UserHostAddress, stampApplicationType.IsNew ? "新建文印申请类型组信息" : "编辑文印申请类型组信息", Database);

                stampApplicationType.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var stampApplicationType = Request.GetEntity<StampApplicationTypeGroup>(Database.StampApplicationTypeGroups, "ID");

            if (stampApplicationType != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除文印申请类型组信息\n对应为：{0}。", stampApplicationType.Name);
                    Log.Write(User.Name, (int)LogType.DeleteStamp, description, Request.UserHostAddress, "删除文印申请类型组", Database);
                   
                    stampApplicationType.Delete(Database);
                    ts.Complete();
                }
        }
    }
}
