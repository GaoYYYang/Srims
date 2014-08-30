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
using Srims.Server.UI.Users;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;
using System.Transactions;
using Srims.Server.Business.Projects;

namespace Srims.WebSite.Service.Type
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class ManagementFeesService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .ManagementFees
                .Query(Request.GetManagementFeesQueryInformation(), User)
                .ShowQueryResult(Response, User, Database);
        }

        [WebMethod]
        public void Save()
        {
            var oldManagementFee = Request.GetOldManagementFee(Database, User);
            var managementFee = Request.GetManagementFee(Database, User);

            using (TransactionScope ts = new TransactionScope())
            {
                var description = managementFee.IsNew ? "添加" : "编辑";
                description += string.Format("管理费收取类别\n对应管理费收取类别名称为：{0}。", managementFee.Type)
                    + Log.GetEditOperationDescription(oldManagementFee, managementFee, ManagementFees.GetDescriptionItems(), managementFee.IsNew)
                    + "\n附注：此处记录的管理费率的值是数据库中存储的值，该值除以100以后才是前台显示的值。";
                Log.Write(User.Name, managementFee.IsNew ? (int)LogType.ManagementFeeNew : (int)LogType.ManagementFeeEdit, description, Request.UserHostAddress, managementFee.IsNew ? "添加管理费收取类别" : "编辑管理费收取类别", Database);

                managementFee.Save(Database);
                Response.WriteXmlHead();
                managementFee.ShowInList(Response, User, Database, ManagementFeesExtension.ShowManagementFees);
                ts.Complete();
            }
        }

        [WebMethod]
        public void Delete()
        {
            var managementFee = Request.GetEntity<ManagementFees>(Database.ManagementFees, "managementFeeID");

            if (managementFee != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除管理费收取类别：{0}", managementFee.Type);
                    Log.Write(User.Name, (int)LogType.ManagementDelete, description, Request.UserHostAddress, "删除管理费收取类别", Database);

                    managementFee.Delete(Database);
                    ts.Complete();
                }
            }
        }

        [WebMethod]
        public void GetAllManagementFees()
        {
            Response.WriteXmlHead();
            Database
                .ManagementFees
                .GetAllManagementFees()
                .Show(Response);
        }

        [WebMethod]
        public void GetAllManagementFeesByType()
        {
            Database
                .ManagementFees
                .GetAllManagementFeesByType(
                 Request.GetString("ManagementFeeType"),
                 Request.GetInt("projectTypeId").Value,
                 Request.GetEnum<ProjectLevel>("projectLevel"),
                 Request.GetMoney("contractTotal").Value,
                 Request.GetMoney("fundTotal").Value,
                 Request.GetMoney("arriveSchoolFee").Value,
                 Request.GetMoney("deviceCost").Value,
                 Request.GetString("paraType")
                 ,Database)
                .ShowRate(Response);
            var a = Database
                .ManagementFees
                .GetAllManagementFeesByType(
                 Request.GetString("ManagementFeeType"),
                 Request.GetInt("projectTypeId").Value,
                 Request.GetEnum<ProjectLevel>("projectLevel"),
                 Request.GetMoney("contractTotal").Value,
                 Request.GetMoney("fundTotal").Value,
                 Request.GetMoney("arriveSchoolFee").Value,
                 Request.GetMoney("deviceCost").Value,
                 Request.GetString("paraType")
                 , Database);
        }
    }
}
