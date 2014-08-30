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
using System.Collections.Generic;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Fund
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class FundDescendWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .FundDescends
                .Query(Request.GetFundDescendQueryInformation(User), User)
                .Show(Response, User, Database, FundDescendExtension.ShowFundDescend);
        }
        [WebMethod]
        public void GetByFinance()
        {
            Response.WriteXmlHead();
            var finance = Request.GetEntity(Database.Finances, "FinanceId");
            finance
                .GetAllDescends(Database.FinanceFundDescends)
                .Show(Response, User, Database, FundDescendExtension.ShowFundDescend);
        }
        [WebMethod]
        public void GetMyWaitingAllocationFundDescend()
        {
            Response.WriteXmlHead();
            Database
                .FundDescends
                .GetMyWaitingAllocationFundDescend(User)
                .Show(Response, User, Database, FundDescendExtension.ShowFundDescend);
        }
        [WebMethod]
        public void Save()
        {
            var oldFundDescend = Request.GetOldFundDescend(Database);
            var fundDescend = Request.GetFundDescend(User, Database);
            var currentState = fundDescend.CurrentState;
            var newFundDescend = fundDescend.IsNew;
            bool isLent = Request.GetBoolean("IsLent").Value;
            var financeFundDescend = isLent ? null : newFundDescend ? Request.GetFinanceFundDescend(false, User, Database) : fundDescend.GetSingleFinanceFundDescend(Database.FinanceFundDescends);

            if (!User.CanEdit(fundDescend, Database))
                throw new HasNoPermissionException();
            if (isLent && !User.HasPermissionFundlent())
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                if (newFundDescend)
                    fundDescend.CurrentState = null;

                if (financeFundDescend != null)
                    financeFundDescend.Amount = 0;

                fundDescend.Save(Database);
                currentState.Save(Database);

                if (newFundDescend)
                {
                    fundDescend.CurrentState = currentState;
                    fundDescend.Save(Database);
                }

                if (!isLent)
                {
                    financeFundDescend.FundDescend = fundDescend;
                    financeFundDescend.Amount = fundDescend.Amount;
                    financeFundDescend.Save(Database);
                }
                if (isLent)
                {
                    var editDescription = string.Format("新建借款：\n经费借款ID为：{0}；\n 借款项目为：{1}；\n{2}", fundDescend.ID, fundDescend.ProjectInfo_Fund.Project.Name, Log.GetEditOperationDescription(oldFundDescend, fundDescend, FundDescend.GetDescriptionItems(), newFundDescend ? true : false));
                    Log.Write(User.Name, (int)LogType.fundDescendLent, editDescription, Request.UserHostAddress, "新建借款", Database);
                }
                else
                {
                    var editDescription = string.Format("{0}：\n编辑的经费下拨ID为：{1}；\n 下拨项目为：{2}；\n下拨经费到帐的凭单号为：{3}，描述为：{4}；\n{5}", newFundDescend ? "新建经费下拨" : "编辑经费下拨", fundDescend.ID, fundDescend.ProjectInfo_Fund.Project.Name, financeFundDescend.Finance.VoucherNumber, financeFundDescend.Finance.Abstract, Log.GetEditOperationDescription(oldFundDescend, fundDescend, FundDescend.GetDescriptionItems(), newFundDescend ? true : false));
                    Log.Write(User.Name, (int)LogType.FundDescend, editDescription, Request.UserHostAddress, newFundDescend ? "新建经费下拨" : "编辑经费下拨", Database);
                }
                var oldProject = Request.GetEntity(Database.Projects, "OldProjectId");
                if (oldProject != null)
                    oldProject.Fund.Save(Database);

                ts.Complete();
            }

            if (!isLent)
                returnFinance(financeFundDescend.Finance);
        }
        [WebMethod]
        public void Delete()
        {
            FundDescend fundDescend = Request.GetEntity(Database.FundDescends, "FundDescendId");
            var financeFundDescend = fundDescend.GetSingleFinanceFundDescend(Database.FinanceFundDescends);

            if (!User.CanDelete(fundDescend, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除经费下拨：\n下拨项目为{0}，对应金额为：{1}", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ReceivedAmount);
                Log.Write(User.Name, (int)LogType.FinanceDescendDelete, description, Request.UserHostAddress, "删除经费下拨", Database);

                fundDescend.LogicDelete(User, Database);

                if (financeFundDescend != null)
                    financeFundDescend.Finance.Save(Database);
                ts.Complete();
            }

            if (financeFundDescend != null)
                returnFinance(financeFundDescend.Finance);
        }
        [WebMethod]
        public void CensorPass()
        {
            FundDescend fundDescend = Request.GetEntity(Database.FundDescends, "FundDescendId");
            var financeFundDescend = fundDescend.GetSingleFinanceFundDescend(Database.FinanceFundDescends);

            if (!User.CanCensorPass(fundDescend, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("审核通过经费下拨：\n下拨项目为：{0}；\n下拨金额为：{1}；\n对应ID为：{2}", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ReceivedAmount, fundDescend.ID);
                Log.Write(User.Name, (int)LogType.FinanceDescendCensorPass, description, Request.UserHostAddress, "审核通过经费下拨", Database);

                fundDescend.CensorPass(User, Database);
                financeFundDescend.Finance.Save(Database);
                ts.Complete();
            }

            returnFinance(financeFundDescend.Finance);
        }
        //经费下拨
        [WebMethod]
        public void CensorReject()
        {
            FundDescend fundDescend = Request.GetEntity(Database.FundDescends, "FundDescendId");
            var financeFundDescend = fundDescend.GetSingleFinanceFundDescend(Database.FinanceFundDescends);

            if (!User.CanCensorReject(fundDescend, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("审核驳回经费下拨：\n下拨项目为：{0}；\n下拨金额为：{1}；\n对应ID为：{2}", fundDescend.ProjectInfo_Fund.Project.Name, fundDescend.ReceivedAmount, fundDescend.ID);
                Log.Write(User.Name, (int)LogType.FinanceDescendCensorPass, description, Request.UserHostAddress, "审核驳回经费下拨", Database);

                fundDescend.CensorReject(User, Request.GetString("Remark"), Database);
                financeFundDescend.Finance.Save(Database);
                ts.Complete();
            }

            returnFinance(financeFundDescend.Finance);
        }
        private void returnFinance(Finance finance)
        {
            Response.WriteXmlHead();
            List<Finance> listFiance = new List<Finance>();
            listFiance.Add(finance);
            listFiance.Show(Response, User, Database);
        }
        [WebMethod]
        public void GetWaitingCensorFundDescendCount_Horizontal()
        {
            if (!User.HasPermission_CensorFundDescends(Database, true))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .FundDescends
                .GetWaitingCensorFundDescendCount(true, User)
                .Show(Response);
        }
        [WebMethod]
        public void GetMyWaitingAllocationFundDescendCount()
        {
            if (!User.IsExpert)
                throw new ArgumentException("只有专家有这个权限");

            Response.WriteXmlHead();
            Database
                .FundDescends
                .GetWaitingAllocationFundDescendCount(null, User)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingAllocationFundDescendCount_Horizontal()
        {
            if (!User.HasPermission_FundAllocation(Database, true))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .FundDescends
                .GetWaitingAllocationFundDescendCount(true, User)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingAllocationFundDescendCount_Vertical()
        {
            if (!User.HasPermission_FundAllocation(Database, false))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .FundDescends
                .GetWaitingAllocationFundDescendCount(false, User)
                .Show(Response);
        }

        [WebMethod]
        public void GetBorrowByProjectId()
        {
            int projectId = Request.GetInt("ProjectId").Value;

            Response.WriteXmlHead();

            Database
                .FundDescends
                .GetBorrowByProjectId(projectId)
                .Show(Response, User, Database, FundDescendExtension.ShowFundDescend);
        }
        [WebMethod]
        public void GetOutsourcingAmountByProject()
        {
            int projectId = Request.GetInt("ProjectId").Value;
            var amount = Database.FundDescends.GetOutsourcingAmountByProject(projectId, Database);
            Response.Write(amount);
        }

    }
}
