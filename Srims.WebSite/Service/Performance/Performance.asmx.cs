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
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Performances;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using System.Transactions;
using Srims.Server.Business.Common;

using Srims.Server.UI.Users;
using Srims.Server.DataExchange.OutsourcingImport;

namespace Srims.WebSite.Service.Performance
{
    /// <summary>
    /// Summary description for PerformanceWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class PerformanceWebService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Performances
                .Query(Request.GetPerformanceQueryInformation(User), User, Database)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetByID()
        {
            Response.WriteXmlHead();
            List<Srims.Server.Business.Performances.Performance> Performances = new List<Srims.Server.Business.Performances.Performance>();
            Performances.Add(Request.GetEntity(Database.Performances, "PerformanceId"));
            Performances.Show(Response, User, Database);

        }
        [WebMethod]
        public void DescendSelectedPerformance()
        {
            var performanceIDs = Request.GetString("PerformanceIds").Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var count = 0;
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var item in performanceIDs)
                {
                    var performance = Database.Performances.SingleOrDefault(c => c.ID.ToString() == item && c.IsCancel != true);
                    if (performance != null)
                    {
                        if (performance.ArrivedPerformance - performance.DescendPerformance > 0)
                        {
                            PerformanceAllocation performanceAllocation = new PerformanceAllocation();
                            performanceAllocation.ArrivedOverheadexpensesExpert = performance.ArrivedPerformance - performance.DescendPerformance;
                            performanceAllocation.ArrivedPerformance = 0;
                            performanceAllocation.CanAllocate = false;
                            performanceAllocation.Performance = performance;
                            performanceAllocation.Save(Database);

                            PerformanceAllocationStateHistory state = new PerformanceAllocationStateHistory();
                            state.State = PerformanceAllocationState.UnSubmit;
                            state.DateTime = System.DateTime.Now;
                            state.PerformanceAllocation = performanceAllocation;
                            state.Operator = User.Name;
                            state.Save(Database);

                            performanceAllocation.CurrentState = state;
                            performanceAllocation.Save(Database);

                            performanceAllocation.SendEmailToPrincipal();

                            performance.Save(Database);

                            count++;
                        }
                    }
                }
                ts.Complete();
            }
            Response.Write(count);
        }
        [WebMethod]
        public void CheckPositive()
        {
            var performanceIDs = Request.GetString("PerformanceIds").Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var item in performanceIDs)
            {
                var performance = Database.Performances.SingleOrDefault(c => c.ID.ToString() == item);
                if (performance != null)
                {
                    var project = performance.Project;
                    var positiveperformance = Database.Performances.Where(c => c.Project == project && c.ArrivedPerformance < 0).Count();
                    if (positiveperformance > 0)
                    {
                        Response.Write("true");
                        return;
                    }
                }
            }

        }

    }
}
