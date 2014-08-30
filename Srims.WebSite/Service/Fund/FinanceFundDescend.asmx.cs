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
using System.Transactions;

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
    public class FinanceFundDescendWebService : WebServiceBase
    {
        [WebMethod]
        public void GetByFinance()
        {
            Response.WriteXmlHead();
            var finance = Request.GetEntity(Database.Finances, "FinanceId");
            finance
                .GetReturns(Database.FinanceFundDescends)
                .Show(Response, User, Database, FinanceFundDescendExtension.ShowFinanceFundDescend);
        }
        [WebMethod]
        public void Save()
        {
            var project = Request.GetEntity(Database.Projects, "ProjectId");
            var amount = Request.GetMoney("Amount").Value;
            var unReturnFundDescendList = project.Fund.GetUnReturn(Database.FundDescends);

            if (!User.HasPermissionFundReturn())
                throw new HasNoPermissionException();

            if (amount > project.Fund.GetUnReturnAmount(Database.FundDescends))
                throw new ArgumentException("还款金额不能大于欠款金额");

            returnMoney(amount, unReturnFundDescendList);
        }
        //递归还款
        private void returnMoney(long amount, IList<FundDescend> unReturnFundDescendList)
        {
            var fundDescend = unReturnFundDescendList[0];
            FinanceFundDescend financeFundDescend = Request.GetFinanceFundDescend(true, User, Database);
            financeFundDescend.FundDescend = fundDescend;
            if (amount <= fundDescend.Amount - fundDescend.ReceivedAmount)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    financeFundDescend.Amount = amount;

                    writeReturnLog(financeFundDescend);

                    financeFundDescend.Save(Database);
                    returnFinance(financeFundDescend.Finance);
                    ts.Complete();
                }

                return;
            }
            else
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    financeFundDescend.Amount = fundDescend.Amount - fundDescend.ReceivedAmount;

                    writeReturnLog(financeFundDescend);

                    financeFundDescend.Save(Database);
                    unReturnFundDescendList.Remove(fundDescend);

                    ts.Complete();
                }
                returnMoney(amount - financeFundDescend.Amount, unReturnFundDescendList);
            }
        }
        private void writeReturnLog(FinanceFundDescend financeFundDescend)
        {
            var description = string.Format("归还欠款：\n还款项目为：{0}；\n还款金额为(单位：分)：{1}；\n还款经费到帐凭单号为：{2}，还款经费到帐描述为：{3}；\n还款日期为：{4}。", financeFundDescend.FundDescend.ProjectInfo_Fund.Project.Name, financeFundDescend.Amount, financeFundDescend.Finance.VoucherNumber, financeFundDescend.Finance.Abstract, DateTime.Now);
            Log.Write(User.Name, (int)LogType.FinanceFundDescend, description, Request.UserHostAddress, "还款", Database);
        }
        [WebMethod]
        public void Delete()
        {
            FinanceFundDescend financeFundDescend = Request.GetEntity(Database.FinanceFundDescends, "FinanceFundDescendId");
            if (!User.CanDeleteReturn(financeFundDescend))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除还款记录：\n还款项目为：{0}，\n 还款对应的经费到帐凭单号为：{1}，描述为：{2}。", financeFundDescend.FundDescend.ProjectInfo_Fund.Project.Name, financeFundDescend.Finance.VoucherNumber, financeFundDescend.Finance.Abstract);
                Log.Write(User.Name, (int)LogType.FinanceFundDescendDelete, description, Request.UserHostAddress, "删除还款记录", Database);

                Finance finance = financeFundDescend.Finance;
                financeFundDescend.Delete(Database);
                returnFinance(finance);

                ts.Complete();
            }
        }
        private void returnFinance(Finance finance)
        {
            Response.WriteXmlHead();
            List<Finance> listFiance = new List<Finance>();
            listFiance.Add(finance);
            listFiance.Show(Response, User, Database);
        }
        [WebMethod]
        public void GetReturnByProjectId()
        {
            int projectId = Request.GetInt("projectId").Value;

            Response.WriteXmlHead();

            Database.FinanceFundDescends
              .GetReturnByProjectId(projectId)
              .Show(Response, User, Database, FinanceFundDescendExtension.ShowFinanceFundDescend);
        }
    }
}