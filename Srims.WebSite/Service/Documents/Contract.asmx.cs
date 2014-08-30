using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Documents;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Documents
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ContractService : WebServiceBase
    {
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            if (!User.CanShowContract(project, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                 .Contracts
                 .GetByProjectID(projectID)
                 .Show(Response, User, Database);
        }
        [WebMethod]
        public void UpLoad()
        {
            var postedFiles = Request.GetHttpFiles();

            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                var guid = postedFiles[iFile].Save(HttpContext.Current, Database);

                Contract contract = Request.GetContract(User, Database);
                contract.ContractResource = guid;
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("上传了项目：{0}的合同。\n", contract.Project.Name)
                        + Log.GetEditOperationDescription(new Contract(), contract, Contract.GetDescriptionItems(), true);
                    Log.Write(User.Name, (int)LogType.UpLoadContract, description, Request.UserHostAddress, "上传合同", Database);

                    contract.UpLoad(User, Database);
                    ts.Complete();
                }
            }
            Response.Write("<html><body>{ success: true}</body></html>");
            Response.End();
        }
        [WebMethod]
        public void Delete()
        {
            Guid guid = Request.GetGuid("guid").Value;

            Contract contract = Database.Contracts.getByGuid(guid);

            if (!User.CanEditContract(contract.Project, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除了项目：{0}的合同\n合同号为：{1}", contract.Project.Name, contract.ContractNumber);
                Log.Write(User.Name, (int)LogType.ProjectContractDelete, description, Request.UserHostAddress, "删除合同", Database);

                contract.Delete(Database);
                HttpPostedFileExtension.Delete(HttpContext.Current, guid, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CensorPass()
        {
            var contract = Request.GetEntity(Database.Contracts, "ContractId");
            using (TransactionScope ts = new TransactionScope())
            {
                contract.CensorPass(User, Database);

                var description = string.Format("项目：{0}的{1}审核通过，合同编号为：{2}", contract.Project.Name, contract.Type == ContractType.MainContract ? "主合同" : "外协合同", contract.ContractNumber);
                Log.Write(User.Name, (int)LogType.CensorPassProjectContract, description, Request.UserHostAddress, "项目合同审核通过", Database);

                ts.Complete();
            }
        }
        //审核文档驳回
        [WebMethod]
        public void CensorReject()
        {
            var contract = Request.GetEntity(Database.Contracts, "ContractId");
            string remark = Request.GetString("Remark");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("项目：{0}的{1}审核驳回。", contract.Project.Name, contract.Type == ContractType.MainContract ? "主合同" : "外协合同");
                Log.Write(User.Name, (int)LogType.CensorRejectProjectContract, description, Request.UserHostAddress, "项目合同审核驳回", Database);

                contract.CensorReject(remark, User, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetWaitingCensorContracts()
        {
            bool isHorizontal = Request.GetBoolean("isHorizontal").Value;

            if (isHorizontal && !User.HasPermission_CensorHorizontalProjectContracts(Database))
                throw new HasNoPermissionException();
            if (!isHorizontal && !User.HasPermission_CensorVerticalProjectContracts(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .Contracts
                .GetWaitingCensorContract(isHorizontal, User, Database)
                .Show(Response, User, Database);

        }
        [WebMethod]
        public void GetWaitingCensorContractsCountOfHorizonalProjects()
        {
            if (!User.HasPermission_CensorHorizontalProjectContracts(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
               .Contracts
               .GetWaitingCensorContract(true, User, Database)
                .Count()
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingCensorContractsCountOfVerticalProjects()
        {
            if (!User.HasPermission_CensorVerticalProjectContracts(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .Contracts
                .GetWaitingCensorContract(false, User, Database)
                .Count()
                .Show(Response);
        }
        [WebMethod]
        public void GetMainContractByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            if (!User.CanShowDocument(project, Database))
                throw new HasNoPermissionException();


            Response.Write(Database
                .Contracts
                .GetCountByProjectID(project.ID));

        }
    }
}
