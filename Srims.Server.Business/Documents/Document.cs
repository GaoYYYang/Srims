using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 文档
    /// </summary>
    public partial class Document : Entity<Document>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "ProjectID", Title = "对应项目的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "文档名称" });
            list.Add(new LogDescriptionItem { Name = "Author", Title = "提交人" });
            list.Add(new LogDescriptionItem { Name = "SubmitDateTime", Title = "提交日期" });
            list.Add(new LogDescriptionItem { Name = "Deadline", Title = "截止日期" });
            list.Add(new LogDescriptionItem { Name = "State", Title = "状态" });
            list.Add(new LogDescriptionItem { Name = "CensorDateTime", Title = "审核日期" });
            list.Add(new LogDescriptionItem { Name = "IsRequire", Title = "是否必须" });

            return list.ToArray();
        }
        /// <summary>
        /// 审核人
        /// </summary>
        public string Censor
        {
            get { return this._Censor; }
            set { this._Censor = value; }
        }

        /// <summary>
        /// 上传文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Upload(User user, IDatabase database)
        {
            if (!user.CanEditDocument(this.Project, database))
                throw new HasNoPermissionException();

            this.Author = user.Name;
            this.SubmitDateTime = DateTime.Now;

            if (user.IsExpert)
                this.State = CensorState.WaitingCensor;
            else
            {
                this.State = CensorState.Passed;
                this.Censor = user.Name;
                this.CensorDateTime = DateTime.Now;
            }

            this.Save(database);
            if (user.IsExpert)
                sendMessageToAdmin(user, "上传文档", database);
        }
        /// <summary>
        /// 催缴文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Require(User user, IDatabase database)
        {
            if (!user.CanRequireDocument(this.Project, database))
                throw new HasNoPermissionException();

            this.State = CensorState.UnSubmited;

            this.Save(database);
            sendMessageToPrincipal(user, "催缴文档", "催缴文档", database, true);
            sendEmailToPrincipal(user, "催缴文档", "催缴文档", database, true);
        }
        /// <summary>
        /// 审核通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorPass(User user, IDatabase database)
        {
            if (!user.CanCensorDocument(this.Project, database))
                throw new HasNoPermissionException();

            saveForChangeState(CensorState.Passed, user, database);
            sendMessageToPrincipal(user, "审核通过", "审核通过", database, false);
            sendEmailToPrincipal(user, "审核通过", "审核通过", database, false);
        }
        /// <summary>
        /// 审核驳回
        /// </summary>
        /// <param name="remark"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorReject(string remark, User user, IDatabase database)
        {
            if (!user.CanCensorDocument(this.Project, database))
                throw new HasNoPermissionException();

            saveForChangeState(CensorState.Reject, user, database);
            sendMessageToPrincipal(user, "审核驳回", "审核驳回。驳回理由：" + remark, database, false);
            sendEmailToPrincipal(user, "审核驳回", "审核驳回。驳回理由：" + remark, database, false);
        }
        private void saveForChangeState(CensorState censorState, User user, IDatabase database)
        {
            this.Censor = user.Name;
            this.CensorDateTime = DateTime.Now;
            this.State = censorState;

            this.Save(database);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Project.Entity != null, "对应项目不能为空");
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "文档名称不能为空！");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                //当提交文档时，将催缴该文档的催缴信息全部删除
                if (_DocumentResource.HasValue)
                {
                    var unSubmitDocuments = database.Documents.GetUnSubmitDoucment(_ProjectID, _Name);

                    foreach (var document in unSubmitDocuments)
                        document.Delete(database);
                }

                base.SaveAction(database);
                ts.Complete();
            }
        }
        private void sendMessageToPrincipal(User sender, string action, string description, IDatabase database, bool isRequire)
        {
            var title = String.Format("{0}：{1}（项目：{2}）", action, _Name, Project.Name);

            string content = string.Empty;
            if (!isRequire)
                content = String.Format(@"您提交的项目：{0}的文档：{1}，已由管理员{2}，于{3}，{4}。{5}。", Project.Name, _Name, sender.Name, DateTime.Now, description, this.Project.GetHyperLinkString(true, false, "点击查看项目文档"));
            else
                content = String.Format(@"您需要在{0}前提交项目：{1}的文档：{2}。{3}。", Deadline, Project.Name, Name, this.Project.GetHyperLinkString(true, false, "点击提交文档"));


            Message.SendMessage(title, content, sender, this.Project.Principal.User, database);
            if (this.Project.PrincipalDelegate != null)
                Message.SendMessage(title, content, sender, this.Project.PrincipalDelegate.User, database);
        }
        private void sendMessageToAdmin(User sender, string action, IDatabase database)
        {
            var title = String.Format("{0}：{1}（项目：{2}", action, _Name, Project.Name);
            var content = String.Format(@"项目：{0}的负责人：{1}，于{2}，{3}：{4}。{5}。", Project.Name, sender.Name, DateTime.Now, action, _Name, this.Project.GetHyperLinkString(true, false, "点击审核文档"));

            var administrators = Project.getAdminCanSendMessage(database);
            foreach (var administrator in administrators)
                Message.SendMessage(title, content, sender, administrator, database);
        }
        private void sendEmailToPrincipal(User sender, string action, string remark, IDatabase database, bool isRequire)
        {
            var title = String.Format("{0}--{1}(项目：{2})", action, _Name, Project.Name);
            string body = string.Empty;
            if (!isRequire)
                body = String.Format(@"您提交的项目：{0}的文档：{1}，已由管理员{2}，于{3}，{4}。请及时登录中国海洋大学科研管理系统查看该项目的文档。", Project.Name, _Name, sender.Name, DateTime.Now, remark);
            else
                body = String.Format(@"您需要在{0}前提交项目：{1}的文档：{2}。请及时登录中国海洋大学科研管理系统提交该项目的文档。", Deadline, Project.Name, Name);

            string content = EmailContentModel.GetExpertEmailContentModel(this.Project.Principal.Name, body);

            sender.SendMail(this.Project.Principal.Email, title, content, database);
            if (this.Project.PrincipalDelegate != null)
                sender.SendMail(this.Project.PrincipalDelegate.Email, title, content, database);
        }
    }

    /// <summary>
    /// 文档的业务扩展
    /// </summary>
    public static class DocumentBusinessExtension
    {
    }
    /// <summary>
    /// 文档的查询扩展
    /// </summary>
    public static class DocumentQueryExtension
    {
        /// <summary>
        /// 根据项目取得文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectID"></param>
        /// <returns></returns>
        public static IList<Document> GetByProjectID(this IQueryable<Document> query, int projectID)
        {
            return query
                .Where(q => q.ProjectID == projectID)
                .OrderBy(q => q.SubmitDateTime)
                .ToList();
        }
        /// <summary>
        /// 取得未提交的催缴文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectID"></param>
        /// <param name="documentName"></param>
        /// <returns></returns>
        public static IList<Document> GetUnSubmitDoucment(this IQueryable<Document> query, int projectID, string documentName)
        {
            return query
                .Where(q => !q.DocumentResource.HasValue && q.ProjectID == projectID && q.Name.Trim() == documentName.Trim())
                .ToList();
        }
        /// <summary>
        /// 根据guid取得文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static Document GetByGuid(this IQueryable<Document> query, Guid guid)
        {
            return query.SingleOrDefault(q => q.DocumentResource.HasValue && q.DocumentResource.Value == guid);
        }
        /// <summary>
        /// 取得等待审核的文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<Document> GetWaitingCensorDocument(this IQueryable<Document> query, bool isHorizontal, User user, IDatabase database)
        {
            List<int> projectTypesID = new List<int>();
            if (!isHorizontal)
                projectTypesID = user.GetCanEditVerticalTypes(database).Select(q => q.ID).ToList();
            else
                projectTypesID = user.GetCanEditHorizontalTypes(database).Select(q => q.ID).ToList();

            return query.Where(q => q.State == CensorState.WaitingCensor
                && q.Project.CurrentState.State != ProjectState.WaitingStartInformation
                && q.Project.CurrentState.State != ProjectState.Deleted
                && projectTypesID.Contains(q.Project.Type.Type.ID))
                .ToList();
        }
        /// <summary>
        /// 取得用户的催缴文档信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<Document> GetExpertUnsubmitDocument(this IQueryable<Document> query, User user)
        {
            return query.Where(q => q.State == CensorState.UnSubmited
                && (q.Project.Principal.UserID == user.ID || q.Project.PrincipalDelegate.UserID == user.ID)).ToList();
        }
        /// <summary>
        /// 根据项目ID取得相应项目的文档个数
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static int GetCountByProjectID(this IQueryable<Document> query, int projectId)
        {
            return query.Where(p => p.ProjectID == projectId).Count();
        }
        /// <summary>
        /// 审核文档提示    
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CeasorDocumentRemaind(this IQueryable<Document> query, IDatabase database)
        {
            var admins = database.Users.Where(p => p.UserRole.Type == UserRoleType.Administrator && (!p.IsSuper));
            var user = database.Users.First(u => u.IsSuper);

            string title = "审核文件提示";
            string content = string.Empty;
            string body = string.Empty;
            int count = 0;

            foreach (var admin in admins)
            {

                var hDocumentCount = database.Documents.GetWaitingCensorDocument(true, admin, database).Count();
                var vDocumentCount = database.Documents.GetWaitingCensorDocument(false, admin, database).Count();
                if ((hDocumentCount <= 0 && vDocumentCount <= 0) || admin.IsLocked(database.UserLockLogs))
                    continue;

                try
                {
                    if (hDocumentCount > 0)
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("现有：{0}个横向文档提交，需要进行审核。请及时登录科研管理系统审核文档信息。", hDocumentCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);
                        user.SendMail(admin.Email, title, content, database);

                        count++;
                        var PrincipalDescription = string.Format("自动发送横向文档审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorDocumentRemaind, PrincipalDescription, "自动发送横向文档审核提醒邮件", database);

                    }
                    if (vDocumentCount > 0)
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("现有：{0}纵向个文档提交，需要进行审核。请及时登录科研管理系统审核文档信息。", vDocumentCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);
                        user.SendMail(admin.Email, title, content, database);

                        count++;
                        var PrincipalDescription = string.Format("自动发送纵向文档审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorDocumentRemaind, PrincipalDescription, "自动发送纵向文档审核提醒邮件", database);

                    }
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送纵向文档审核提醒邮件失败，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.CensorDocumentRemaind, PrincipalDescriptions, "自动发送纵向文档审核提醒邮件失败", database);
                    continue;
                }

            }
            Log.Write("系统", (int)LogType.CensorDocumentRemaind, "共发送自动提醒邮件" + count + "封", "自动发送文档审核提醒邮件", database);

        }
    }
    /// <summary>
    /// 文档的权限扩展
    /// </summary>
    public static class DocumentPermissionExtension
    {
        /// <summary>
        /// 是否具有删除文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="document"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, Document document, IDatabase database)
        {
            return user.HasPermission_EditDocument(document.Project, database);
        }
        /// <summary>
        /// 能够删除文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="document"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, Document document, IDatabase database)
        {
            if (!user.HasPermission_Delete(document, database))
                return false;

            if (user.IsExpert)
                return document.State == CensorState.WaitingCensor || document.State == CensorState.Reject;

            return true;
        }
        /// <summary>
        /// 判断用户是否具有文档的查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowDocumet(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 判断文档能够被当前用户查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowDocument(this User user, Project project, IDatabase database)
        {
            return user.CanShow(project, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditDocument(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断文档能否被用户编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditDocument(this User user, Project project, IDatabase database)
        {
            if (user.IsExpert)
            {
                var projectCurrentState = project.CurrentState.State;
                return project.IsPrincipal(user)
                    && (projectCurrentState == ProjectState.ProjectProcessing || projectCurrentState == ProjectState.WaitingStartInformation);
            }

            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能否审核文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorDocument(this User user, Project project, IDatabase database)
        {
            return !user.IsExpert && user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够催缴项目文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanRequireDocument(this User user, Project project, IDatabase database)
        {
            return !user.IsExpert && user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够审核纵向项目的文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorVerticalProjectDocuments(this User user, IDatabase database)
        {
            return !user.IsExpert && user.HasPermission_EditVerticalProject(database);
        }
        /// <summary>
        /// 判断用户能够审核纵向项目的文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorHorizontalProjectDocuments(this User user, IDatabase database)
        {
            return !user.IsExpert && user.HasPermission_EditHorizontalProject(database);
        }
    }
}
