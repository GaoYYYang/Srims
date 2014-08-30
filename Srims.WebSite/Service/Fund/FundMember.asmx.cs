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
    public class FundMemberService : WebServiceBase
    {
        [WebMethod]
        public void GetByProject()
        {
            var project = Request.GetEntity(Database.Projects, "projectId");
            var isPerformance = Request.GetBoolean("isPerformance");
            isPerformance = isPerformance == null ? false : isPerformance;

            var fundMemberList = Database.FundMembers.GetByProject(project.FundID.Value, isPerformance.Value);

            Response.WriteXmlHead();
            fundMemberList.Show(Response, User, Database, FundMemberExtension.Show);
        }
        [WebMethod]
        public void ClearAccountBookNumber()
        {
            FundMember fundMember = Request.GetEntity(Database.FundMembers, "fundMemberId");

            if (!User.CanResetAccountBookNumber(fundMember, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                string description = string.Format("清空账本号。\n对应经费成员的姓名是：{0}；\n经费成员的工作证号为：{1}；\n原来账本号为：{2}。", fundMember.Expert.Name, fundMember.Expert.Number, fundMember.AccountBookNumber);
                Log.Write(User.Name, (int)LogType.ClearExpertAccountNumber, description, "清空专家账本号", Database);

                fundMember.AccountBookNumber = null;
                fundMember.Save(Database);
                ts.Complete();
            }
        }
    }
}
