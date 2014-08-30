using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.DataAutoImport;
using Srims.Server.DataExchange.ExpertImport;
using Srims.Server.DataExchange.ExpertUpdate;

using Srims.Server.UI;
using Srims.Server.UI.Awards;
using Srims.Server.UI.Experts;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Papers;
using Srims.Server.UI.Patents;
using Srims.Server.UI.Projects;

namespace Srims.WebSite.Service.Experts
{
    /// <summary>
    /// 专家相关服务
    /// </summary>
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    public class ExpertService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();

            Database
                .Experts
                .Query(Request.GetExpertQueryInformation(), Database)
                .Show(Response, User, Database);
            //Database.Experts.Query(Request.GetExpertQueryInformation(), Database).Show(Request, Response, User, Database);
        }
        [WebMethod]
        public void GetById()
        {
            Expert expert = Request.GetExpertById(Database);

            Response.WriteXmlHead();

            List<Expert> expertList = new List<Expert>();
            expertList.Add(expert);
            expertList.Show(Response, User, Database);
        }
        [WebMethod]
        public void GetExpertChargeProjects()
        {
            Response.WriteXmlHead();

            Expert expert = Request.GetExpertById(Database);
            expert.
                GetMyProjects(Database, true).
                ShowForExpert(User, expert, Database, Response);
        }
        [WebMethod]
        public void GetExpertParticipantProjects()
        {
            Response.WriteXmlHead();

            Expert expert = Request.GetExpertById(Database);
            expert.
                GetMyProjects(Database, false).
                ShowForExpert(User, expert, Database, Response);
        }
        [WebMethod]
        public void GetExpertPapers()
        {
            Response.WriteXmlHead();

            Expert expert = Request.GetExpertById(Database);
            expert.
                GetMyPapers(Database.PaperAuthors).
                ShowForExpert(expert, User, Response, Database);
        }
        [WebMethod]
        public void GetExpertLiberalArtsPapers()
        {
            Response.WriteXmlHead();

            Expert expert = Request.GetExpertById(Database);
            expert.
                GetMyLiberalArtsPapers(Database.LiberalArtsPaperAuthors).
                ShowForExpert(expert, User, Response, Database);
        }
        [WebMethod]
        public void GetExpertAwards()
        {
            Response.WriteXmlHead();

            Expert expert = Request.GetExpertById(Database);
            expert.
                GetMyAwards(Database.AwardWinners).
                ShowForExpert(Response, Database, expert, User);
        }
        [WebMethod]
        public void GetExpertPatents()
        {
            Response.WriteXmlHead();

            Expert expert = Request.GetExpertById(Database);
            expert.GetMyPatents(Database.PatentInventers).ShowForExpert(expert, User, Response, Database);
        }
        [WebMethod]
        public void SearchExpert()
        {
            Response.WriteXmlHead();
            Database
                .Experts
                .SearchExpert(Request.GetString("query"))
                .ShowAsSearchRecord(Response);
        }
        [WebMethod]
        public void SimpleQuery()
        {
            Response.WriteXmlHead();
            Database
                .Experts
                .SearchExpert(Request.GetString("keyword"))
                .ShowAsSimpleQueryRecord(Response, User);
        }
        [WebMethod]
        public void GetExpertAcademyDegree()
        {
            Response.WriteXmlHead();
            Database
                .Experts
                .GetExpertAcademyDegree()
                .Show(Response);
        }
        [WebMethod]
        public void GetExpertCollege()
        {
            Response.WriteXmlHead();
            Database
                .Experts
                .GetExpertCollege()
                .Show(Response);
        }
        [WebMethod]
        public void GetExpertPost()
        {
            Response.WriteXmlHead();
            Database
                .Experts
                .GetExpertPost()
                .Show(Response);
        }

        [WebMethod]
        public void SaveEditExpert()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                string field = Request.GetString("field");
                var expert = Request.GetExpert(Database, User, field);

                expert.Save(Database);
                Response.WriteXmlHead();
                ts.Complete();
            }
        }
        [WebMethod]
        public void SaveAddExpert()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                Expert expert = new Expert();
                expert = Request.GetNewExpert(Database, User);
                expert.Save(Database);

                ExpertInfoHistory mobilePhoneInforHistory = Request.buildNewExpertHistoryInformation(expert, "MobilePhone", expert.MobilePhone, User, Database);
                mobilePhoneInforHistory.Save(Database);
                ExpertInfoHistory departmentInforHistory = Request.buildNewExpertHistoryInformation(expert, "Department", expert.Department.Name, User, Database);
                departmentInforHistory.Save(Database);
                ExpertInfoHistory CollegeInforHistory = Request.buildNewExpertHistoryInformation(expert, "College", expert.College.Name, User, Database);
                CollegeInforHistory.Save(Database);
                ExpertInfoHistory College2InforHistory = Request.buildNewExpertHistoryInformation(expert, "College2", expert.College2.Name, User, Database);
                College2InforHistory.Save(Database);

                Response.WriteXmlHead();
                expert.ShowInList(Response, User, Database, ExpertExtension.ShowExpert);
                ts.Complete();
            }
        }
        [WebMethod]
        public void UpLoadImage()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var postedFiles = Request.GetHttpFiles();
                var guid = postedFiles[0].Save(HttpContext.Current, Database);

                Expert expert = Request.GetExpert_Label(Database, User, guid);
                expert.Save(Database);
                //其他操作可以在此处添加
                Response.Write("<html><body>{ success: true, guid: '" + guid.GetFilePath(Database) + "' }</body></html>");
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetExpertWithSameNumber()
        {
            string number = Request.GetString("Number");
            Response.Write(Database.Experts.GetExpertOfSameNumber(number));
        }
        [WebMethod]
        public void DeleteExpert()
        {
            var expert = Request.GetEntity<Expert>(Database.Experts, "ExpertID");
            int id = expert.ID;

            if (expert != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    expert.IsDeleted = true;
                    var description = string.Format("删除专家：{0}。\n专家职工号为：{1}\n将该专家的‘是否已删除’信息设置为True ", expert.Name, expert.Number);
                    Log.Write(User.Name, (int)LogType.ExpertDelete, description, Request.UserHostAddress, "删除专家", Database);

                    expert.Save(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportExpert(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }

        [WebMethod]
        public void Update()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.UpdateExpert(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
        [WebMethod]
        public void AutoImport()
        {
            DataBaseDelegate databaseDelegate = new DataBaseDelegate(Srims.Server.DataAccess.Database.New);
            ExpertImporter.ImportExperts(databaseDelegate);
            Response.Write("<html><body>{ success: true}</body></html>");
        }
        [WebMethod]
        public void UpdateIdCard()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.UpdateExpertIdentityNumber(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
        
    }
}
