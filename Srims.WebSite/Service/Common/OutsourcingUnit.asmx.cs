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
using Srims.Server.UI.Users;
using Srims.Server.UI.MISExtension;


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
    public class OutsourcingUnitService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            
        }
        [WebMethod]
        public void GetById()
        {
          
        }
        [WebMethod]
        public void Save()
        {
            var oldOutsourcing = Request.GetOldOutsourcingUnit(Database, User);
            var outsourcing = Request.GetOutsourcingUnit(Database, User);

            using (TransactionScope ts = new TransactionScope())
            {
                var description = outsourcing.IsNew ? "新建" : "编辑";
                description += string.Format("外协单位名称为：{0}", outsourcing.Name)
                    + Log.GetEditOperationDescription(oldOutsourcing, outsourcing, OutsourcingUnit.GetDescriptionItems(), outsourcing.IsNew);
                Log.Write(User.Name, outsourcing.IsNew ? (int)LogType.OutsourcingAdd : (int)LogType.OutsourcingEdit, description, Request.UserHostAddress, outsourcing.IsNew ? "添加外协单位" : "编辑外协单位", Database);
                outsourcing.Save(Database);
                Response.WriteXmlHead();
                outsourcing.ShowInList(Response, User, Database, OutsourcingUnitExtension.ShowOutsourcingUnit);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
           
        }
    }
}
