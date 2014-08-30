using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using System.Text;
using System.IO;


using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Fund;

using Srims.Server.UI;
using Srims.Server.UI.Projects;
using Srims.Server.UI.Users;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Common;
using Srims.Server.DataExchange;

using System.Transactions;

namespace Srims.WebSite.Service.Projects
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ProjectMemberService : WebServiceBase
    {
        [WebMethod]
        public void GetByProjectID()
        {
            var projectID = Request.GetInt("ProjectID").Value;
            var project = Database.Projects.GetByID(projectID);

            if (!User.CanShowProjectMember(project, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .ProjectMemebers
                .GetByProjectID(projectID)
                .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var oldProjectMember = Request.GetOldProjectMember(Database);
            var projectMember = Request.GetProjectMember(Database);

            if (!User.CanEditProjectMember(projectMember.Project, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = projectMember.IsNew ? "添加" : "编辑";
                description += string.Format("项目：{0}的成员{1}", projectMember.Project.Name, projectMember.Expert.Name);
                description += Log.GetEditOperationDescription(oldProjectMember, projectMember, ProjectMember.GetAwardWinnerDescriptionItems(), projectMember.IsNew);
                Log.Write(User.Name, projectMember.IsNew ? (int)LogType.ProjectMemberNew : (int)LogType.ProjectMemberEdit, description, Request.UserHostAddress, projectMember.IsNew ? "添加项目成员" : "编辑项目成员", Database);

                projectMember.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var projectMember = Request.GetEntity<ProjectMember>(Database.ProjectMemebers, "projectMemberID");

            if (!User.CanEditProjectMember(projectMember.Project, Database))
                throw new HasNoPermissionException();

            if (projectMember != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除项目：{0}(ID:{1})的成员。\n删除的成员名称为:{2}, \n位次为：{3}。", projectMember.Project.Name, projectMember.Project.ID, projectMember.Expert.Name, projectMember.Order);
                    Log.Write(User.Name, (int)LogType.ProjectMemberDelete, description, Request.UserHostAddress, "删除项目成员", Database);

                    projectMember.Delete(Database);
                    ts.Complete();
                }
            }
        }

        [WebMethod]
        public void AdjustMembers()
        {
            string logName = "ProjectMember" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = Context.GetLogWriter(logName);
            StringBuilder importLog = new StringBuilder();
            int count = 0;
            foreach (var item in Database.Projects.Where(c => c.StartDate >= Convert.ToDateTime("2008-1-1") && c.StartDate < Convert.ToDateTime("2013-1-1")))
            {
                try
                {
                    int i = 999;
                   
                    var vouchers = Database.Vouchers.Where(c => c.FundAllocation.FundDescend.ProjectInfo_Fund.Project == item && (c.CurrentState.State == VoucherState.Allocated || c.CurrentState.State == VoucherState.NotSignIn | c.CurrentState.State == VoucherState.SignIn)).ToList();
                    if (vouchers.Count != 0)
                        foreach (var voucher in vouchers)
                        {
                            var projectmenbers = Database.ProjectMemebers.Where(c => c.Project == item).ToList();
                            
                            var members = projectmenbers.Where(c => c.Order > 500);
                            if (members.Count() > 0)
                                i = members.Min(c => c.Order)-1;

                            var experts = new List<Expert>();
                            foreach (var projectmember in projectmenbers)
                            {
                                experts.Add(projectmember.Expert);
                            }
                            if (!experts.Contains(voucher.FundMember.Expert))
                            {
                               
                                ProjectMember member = new ProjectMember();
                                member.Project = item;
                                member.Expert = voucher.FundMember.Expert;
                                member.IsExpertSecondCollege = voucher.FundMember.IsExpertSecondCollege;
                                member.Order = i--;
                                member.Save(Database);
                                count++;
                                importLog.AppendFormat("成功为项目【{0}】生成经费成员【{1}】，位次为【{2}】", item.Name, member.Expert.Name, member.Order);
                            }
                        }
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("发生错误，项目名称为{0}，错误信息为：{1}。\n", item.Name, e.Message));
                    Response.Write(string.Format("发生错误，项目名称为{0}，错误信息为：{1}。\n", item.Name, e.Message));
                }

            }
            writer.WriteLine(string.Format("共生成{0}条项目成员记录。\n", count));
            writer.WriteLine("详细信息为：\n{0}", importLog.ToString());
            writer.Close();

            Response.Write(string.Format("共生成{0}条项目成员记录。\n", count));
            Response.Write(importLog);
            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }


    }
}
