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
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Fund
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class PayPlanItemService : WebServiceBase
    {
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            if (!User.CanShowProjectPayPlanItem(project, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .PayPlanItems
                .GetByProject(project)
                .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var oldPayPlanItem = Request.GetOldPayPlanItem(Database);
            var payPlanItem = Request.GetProjectPayPlanItem(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("对应项目名称为：{0}的经费到账计划。\n {1}", payPlanItem.ProjectInfo_Fund.Project.Name, Log.GetEditOperationDescription(oldPayPlanItem, payPlanItem, PayPlanItem.GetDescriptionItems(), payPlanItem.IsNew));
                Log.Write(User.Name, payPlanItem.IsNew ? (int)LogType.PayPlanNew : (int)LogType.PayPlanEdit, description, Request.UserHostAddress, payPlanItem.IsNew ? "新建付款计划" : "编辑付款计划", Database);

                if (!User.CanEditProjectPayPlanItem(payPlanItem.ProjectInfo_Fund.Project, Database))
                    throw new HasNoPermissionException();

                payPlanItem.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var payPlanItem = Request.GetEntity<PayPlanItem>(Database.PayPlanItems, "ProjetPayPlanItemID");
            if (!User.CanEditProjectPayPlanItem(payPlanItem.ProjectInfo_Fund.Project, Database))
                throw new HasNoPermissionException();

            if (payPlanItem != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目：{0}的付款计划。\n 对应的经费到账时间为：{1}，\n金额为：{2}。", payPlanItem.ProjectInfo_Fund.Project.Name, payPlanItem.DateTime, payPlanItem.Amount);
                    Log.Write(User.Name, (int)LogType.PayPlanDelete, description, Request.UserHostAddress, "删除付款计划", Database);
                    payPlanItem.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
