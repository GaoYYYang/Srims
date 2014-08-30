using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Collections.Generic;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Fund
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class FundAllocationService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();

            Database
                .FundAllocations
                .Query(Request.GetFundAllocationQueryInformation(User), User)
                .Show(Response, User, Database, FundAllocationExtension.ShowFundAllocation);
        }
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            Response.WriteXmlHead();
            Database
                .FundAllocations
                .GetByProject(project)
                .Show(Database, User, Response);
        }
        [WebMethod]
        public void GetById()
        {
            FundAllocation fundAllocation = Request.GetEntity(Database.FundAllocations, "FundAllocationId");

            Response.WriteXmlHead();
            fundAllocation
                .ShowInList(Response, User, Database, FundAllocationExtension.ShowFundAllocation);
        }
        [WebMethod]
        public void GetByFundDescend()
        {
            var fundAllocation = Request.Get(User, Database);
            var fundAllocationStateHistory = fundAllocation.CurrentState;

            if (fundAllocation.IsNew)
            {
                fundAllocation.CurrentState = null;
                fundAllocation.Save(Database);

                fundAllocationStateHistory.Save(Database);

                fundAllocation.CurrentState = fundAllocationStateHistory;
                fundAllocation.Save(Database);
            }

            List<FundAllocation> fundAllocationList = new List<FundAllocation>();
            fundAllocationList.Add(fundAllocation);

            Response.WriteXmlHead();
            fundAllocationList.Show(Database, User, Response);
        }
        [WebMethod]
        public void GetWaitingCensorHorizontalProjectFundAllcation()
        {
            if (!User.HasPermission_CensorFundAllocation(Database, true))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .FundAllocations
                .GetWaitingCensorFundAllocationCount(true, User)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingCensorVerticalProjectFundAllcation()
        {
            if (!User.HasPermission_CensorFundAllocation(Database, false))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .FundAllocations
                .GetWaitingCensorFundAllocationCount(false, User)
                .Show(Response);
        }
        //提交经费分配(项目)
        [WebMethod]
        public void Submit()
        {
            var fundAllocation = Request.GetEntity(Database.FundAllocations, "FundAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("提交项目：{0}的经费分配；\n对应ID为：{1}", fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, fundAllocation.ID);
                Log.Write(User.Name, (int)LogType.FundAllocationSubmit, description, Request.UserHostAddress, "提交经费分配", Database);
                fundAllocation.Submit(User, Database);
                ts.Complete();
            }
        }
        //撤销
        [WebMethod]
        public void UndoSubmit()
        {
            var fundAllocation = Request.GetEntity(Database.FundAllocations, "FundAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("撤销项目：{0}的经费分配；\n对应ID为：{1}", fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, fundAllocation.ID);
                Log.Write(User.Name, (int)LogType.FundAllocationUndoSubmit, description, Request.UserHostAddress, "撤销经费分配", Database);
                fundAllocation.UndoSubmit(User, Database);
                ts.Complete();
            }
        }
        //审核通过
        [WebMethod]
        public void CensorPass()
        {
            var fundAllocation = Request.GetEntity(Database.FundAllocations, "FundAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("审核通过项目：{0}的经费分配；\n对应ID为：{1}", fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, fundAllocation.ID);
                Log.Write(User.Name, (int)LogType.FundAllocationCensorPass, description, Request.UserHostAddress, "审核通过经费分配", Database);
                fundAllocation.CensorPass(User, Request.GetString("Remark"), Database);
                ts.Complete();
            }
        }
        //审核驳回
        [WebMethod]
        public void CensorReject()
        {
            var fundAllocation = Request.GetEntity(Database.FundAllocations, "FundAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("审核驳回项目：{0}的经费分配；\n对应ID为：{1}", fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, fundAllocation.ID);

                Log.Write(User.Name, (int)LogType.FundAllocationCensorReject, description, Request.UserHostAddress, "审核驳回经费分配", Database);
                fundAllocation.CensorReject(User, Request.GetString("Remark"), Database);
                ts.Complete();
            }
        }
        //作废
        [WebMethod]
        public void Cancel()
        {
            var fundAllocation = Request.GetEntity(Database.FundAllocations, "FundAllocationId");
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("作废项目：{0}的经费分配；\n对应ID为：{1}", fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name, fundAllocation.ID);
                Log.Write(User.Name, (int)LogType.FundAllocationCancel, description, Request.UserHostAddress, "作废经费分配", Database);
                fundAllocation.Cancel(User, Request.GetString("Remark"), Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CorrectDateTime()
        {
            var fundAllocation = Database.FundAllocations.GetByID(Request.GetInt("FundAllocationId").Value);
            var fundAllocationStateHistory = Request.GetCorrectFundAllocationHistory(User, fundAllocation, Database);

            if (!User.CanCorrect(fundAllocation, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {

                fundAllocationStateHistory.FundAllocation = fundAllocation;
                fundAllocationStateHistory.Save(Database);

                fundAllocation.CurrentState = fundAllocationStateHistory;
                fundAllocation.Save(Database);

                ts.Complete();
            }
        }
        //修改预分配外协金额
        [WebMethod]
        public void ChangeAllocationOut()
        {
            var fundAllocation = Database.FundAllocations.GetByID(Request.GetInt("FundAllocationId").Value);
            var allocationWantOut = Request.GetLong("AllocationWantOut").Value;
            fundAllocation.AllocationWantOut = allocationWantOut;
            fundAllocation.Save(Database);
        }
        //查看该专家是否在项目成员中
        [WebMethod]
        public void CheckExpertByID()
        {
            var fundAllocation = Database.FundAllocations.GetByID(Request.GetInt("FundAllocationId").Value);
            var expertID = Request.GetInt("ExpertId").Value;
            var projectMemebers = Database.ProjectMemebers.SingleOrDefault(c => c.Project == fundAllocation.FundDescend.ProjectInfo_Fund.Project && c.Expert.ID == expertID);
            if (projectMemebers == null)
                Response.Write(false);
            else
                Response.Write(true);
        }
        //判断经费分配的外协公司（三四级）是否分配超标
        [WebMethod]
        public void CheckOutsourcing()
        {
            var fundAllocation = Database.FundAllocations.GetByID(Request.GetInt("FundAllocationId").Value);
            var flag = true;
            string result = "";
            var voucherouts = Database.VoucherOuts.Where(c => c.Voucher.FundAllocation == fundAllocation).ToList();
            foreach (var item in voucherouts)
            {
                if (item.Outsourcing.GetRestAmountThisYear(Database) < item.Amount)
                {
                    result += "外协公司：" + item.Corporation + "即将分配超额，该公司最多可分配 <br/>" + (item.Outsourcing.GetRestAmountThisYear(Database) < 0 ? 0 : item.Outsourcing.GetRestAmountThisYear(Database)) / 1000000 + "万元。";
                    flag = false;
                }
            }
            if (flag)
            {
                result = "true";
            }

            Response.Write(result);
        }

    }
}
