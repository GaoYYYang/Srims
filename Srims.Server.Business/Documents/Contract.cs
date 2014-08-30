using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Threading;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Type;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 合同
    /// </summary>
    public partial class Contract : Entity<Contract>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "ProjectID", Title = "对应项目的ID" });
            list.Add(new LogDescriptionItem { Name = "ContractNumber", Title = "合同编号" });
            list.Add(new LogDescriptionItem { Name = "Type", Title = "合同类型" });
            list.Add(new LogDescriptionItem { Name = "Author", Title = "提交人" });
            list.Add(new LogDescriptionItem { Name = "SubmitDateTime", Title = "提交日期" });
            list.Add(new LogDescriptionItem { Name = "Censor", Title = "审核人" });
            list.Add(new LogDescriptionItem { Name = "State", Title = "状态" });
            list.Add(new LogDescriptionItem { Name = "CensorDateTime", Title = "审核日期" });

            return list.ToArray();
        }
        /// <summary>
        /// 取得或设置审核人
        /// </summary>
        public string Censor
        {
            get { return _Censor; }
            set { _Censor = value; }
        }
        /// <summary>
        /// 重写tostring方法
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return _Type.ToString();
        }
        /// <summary>
        /// 上传合同
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void UpLoad(User user, IDatabase database)
        {
            if (!user.CanEditContract(this.Project, database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                this.Save(database);

                this.BuildMainContractNumber(database);
                database.Contracts.BuildContractNumber(Project);

                if (user.IsExpert)
                    sendMessageToAdmin(user, "上传合同", database);

                ts.Complete();
            }
        }
        /// <summary>
        /// 审核通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorPass(User user, IDatabase database)
        {
            if (!user.CanCensorContract(this.Project, database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                saveForChangeState(CensorState.Passed, user, database);


                this.BuildMainContractNumber(database);
                database.Contracts.BuildContractNumber(Project);

                sendMessageToPrincipal(user, "审核通过", "审核通过", database);
                sendEmailToPrincipal(user, "审核通过", "审核通过", database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 审核驳回
        /// </summary>
        /// <param name="remark"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorReject(string remark, User user, IDatabase database)
        {
            if (!user.CanCensorContract(this.Project, database))
                throw new HasNoPermissionException();

            saveForChangeState(CensorState.Reject, user, database);
            sendMessageToPrincipal(user, "审核驳回", "审核驳回。驳回理由：" + remark, database);
            sendEmailToPrincipal(user, "审核驳回", "审核驳回。驳回理由：" + remark, database);
        }
        private void saveForChangeState(CensorState censorState, User user, IDatabase database)
        {
            this.Censor = user.Name;
            this.CensorDateTime = DateTime.Now;
            this.State = censorState;

            this.Save(database);
        }
        private void sendMessageToPrincipal(User sender, string action, string description, IDatabase database)
        {
            var title = String.Format("{0}：{1}（项目：{2}）", action, _Type == ContractType.MainContract ? "主合同" : "外协合同", Project.Name);

            string content = string.Empty;
            content = String.Format(@"您提交的项目：{0}的{1}，已由管理员{2}，于{3}，{4}。{5}。", Project.Name, _Type == ContractType.MainContract ? "主合同" : "外协合同", sender.Name, DateTime.Now, description, this.Project.GetHyperLinkString(false, true, "点击查看项目合同"));

            Message.SendMessage(title, content, sender, this.Project.Principal.User, database);
            if (this.Project.PrincipalDelegate != null)
                Message.SendMessage(title, content, sender, this.Project.PrincipalDelegate.User, database);
        }
        private void sendMessageToAdmin(User sender, string action, IDatabase database)
        {
            var title = String.Format("{0}：{1}（项目：{2})", action, _Type == ContractType.MainContract ? "主合同" : "外协合同", Project.Name);
            var content = String.Format(@"项目：{0}的负责人：{1}，于{2}，{3}：{4}。{5}。", Project.Name, sender.Name, DateTime.Now, action, _Type == ContractType.MainContract ? "主合同" : "外协合同", this.Project.GetHyperLinkString(false, true, "点击审核合同"));

            var administrators = Project.getAdminCanSendMessage(database);
            foreach (var administrator in administrators)
                Message.SendMessage(title, content, sender, administrator, database);
        }
        private void sendEmailToPrincipal(User sender, string action, string remark, IDatabase database)
        {
            var title = String.Format("{0}--{1}(项目：{2})", action, _Type == ContractType.MainContract ? "主合同" : "外协合同", Project.Name);

            string body = String.Format(@"您提交的项目：{0}的{1}，已由管理员{2}，于{3}，{4}。请及时登录中国海洋大学科研管理系统查看该项目的合同。", Project.Name, _Type == ContractType.MainContract ? "主合同" : "外协合同", sender.Name, DateTime.Now, remark);

            string content = EmailContentModel.GetExpertEmailContentModel(this.Project.Principal.Name, body);

            sender.SendMail(this.Project.Principal.Email, title, content, database);
            if (this.Project.PrincipalDelegate != null)
                sender.SendMail(this.Project.PrincipalDelegate.Email, title, content, database);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Project.Entity != null, "对应项目不能为空");
            if (Project != null && Type == ContractType.MainContract)
            {
                var mainContract = Project.GetMainContract(database.Contracts);
                validater.AddCondition(mainContract == null || mainContract.ID == _ID, "只能有一个主合同！");
            }
        }
        /// <summary>
        /// 删除合同
        /// </summary>
        /// <param name="database">数据库</param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var project = this.Project;

                base.DeleteAction(database);
                database.Contracts.BuildContractNumber(project);

                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 合同的业务扩展
    /// </summary>
    public static class ContractBusinessExtension
    {
        /// <summary>
        ///  构建主合同编号
        /// </summary>
        /// <param name="contract"></param>
        /// <param name="database"></param>
        public static void BuildMainContractNumber(this Contract contract, IDatabase database)
        {
            if (contract.Project.Type.Rank.IsHorizontal && contract.Type == ContractType.MainContract && contract.State == CensorState.Passed)
            {
                int year = DateTime.Now.Year;
                contract.ContractNumber = year.ToString() + database.Counts.NewContractCount(year).ToString("D4");
                contract.Save(database);
            }
        }
        /// <summary>
        /// 构造合同编号
        /// </summary>
        /// <param name="dataAccess">合同数据访问</param>
        /// <param name="project">项目</param>
        public static void BuildContractNumber(this IEntityDataAccess<Contract> dataAccess, Project project)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var mainContract = project.GetMainContract(dataAccess);
                if (mainContract == null)
                {
                    var contractList = project.GetContracts(dataAccess);
                    foreach (var item in contractList)
                        item.ContractNumber = null;
                }
                else if (mainContract.State == CensorState.Passed || !project.Type.Rank.IsHorizontal)
                {
                    var contractList = dataAccess
                        .Where(c => c.ProjectID == project.ID && c.Type == ContractType.OutContract)
                        .OrderBy(c => c.SubmitDateTime)
                        .ToList();

                    for (int i = 0; i < contractList.Count; i++)
                        contractList[i].ContractNumber = String.Format("{0}w{1:D2}", mainContract.ContractNumber, i + 1);
                }

                dataAccess.Database.Submit();
                ts.Complete();
            }
        }
    }
    /// <summary>
    /// 合同的查询扩展
    /// </summary>
    public static class ContractQueryExtension
    {
        /// <summary>
        /// 根据项目取得合同
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectID"></param>
        /// <returns></returns>
        public static IList<Contract> GetByProjectID(this IQueryable<Contract> query, int projectID)
        {
            return query
                .Where(q => q.ProjectID == projectID)
                .ToList();
        }
        /// <summary>
        /// 根据guid取得合同
        /// </summary>
        /// <param name="query"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static Contract getByGuid(this IQueryable<Contract> query, Guid guid)
        {
            return query.SingleOrDefault(q => q.ContractResource.HasValue && q.ContractResource.Value == guid);
        }
        /// <summary>
        /// 取得等待审核的合同
        /// </summary>
        /// <param name="query"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IList<Contract> GetWaitingCensorContract(this IQueryable<Contract> query, bool isHorizontal, User user, IDatabase database)
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
        /// 根据项目ID取得相应项目的主合同个数
        /// </summary>
        /// <param name="query"></param>
        /// <param name="projectID"></param>
        /// <returns></returns>
        public static int GetCountByProjectID(this IQueryable<Contract> query, int projectID)
        {
            return query.Where(p => p.ProjectID == projectID && p.Type == ContractType.MainContract).Count();

        }
        /// <summary>
        /// 合同审核提醒
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void CensorContractRemaind(this IQueryable<Contract> query, IDatabase database)
        {
            var user = database.Users.First(u => u.IsSuper);
            IList<User> admins = database.Users.Where(p => (!p.IsSuper) && p.UserRole.Type == UserRoleType.Administrator).ToList();

            string title = string.Format("合同审核提醒");
            string content = string.Empty;
            string body = string.Empty;

            int count = 0;
            foreach (var admin in admins)
            {
                List<int> idsHorizontal = admin.GetCanCensorHorizontalProjectTypes(database).Select(p => p.ID).ToList();
                List<int> idsVertical = admin.GetCanCensorVerticalProjectTypes(database).Select(p => p.ID).ToList();
                if ((idsHorizontal.Count <= 0 && idsVertical.Count <= 0) || admin.IsLocked(database.UserLockLogs))
                    continue;

                var contractHorizontalCount = query.Where(q => (q.State == CensorState.WaitingCensor)
                    && (q.Project.Type.Rank.IsHorizontal)
                      && q.Project.CurrentState.State != ProjectState.WaitingStartInformation
                && q.Project.CurrentState.State != ProjectState.Deleted
                    && (idsHorizontal.Contains(q.Project.Type.Type.ID)))
                    .Count();
                var contractVerticalCount = query.Where(q => (q.State == CensorState.WaitingCensor)
                    && (!q.Project.Type.Rank.IsHorizontal)
                      && q.Project.CurrentState.State != ProjectState.WaitingStartInformation
                && q.Project.CurrentState.State != ProjectState.Deleted
                    && (idsVertical.Contains(q.Project.Type.Type.ID)))
                       .Count();


                try
                {
                    if (contractHorizontalCount > 0 && admin.HasPermission_CensorHorizontalProjectContracts(database))
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("有横向项目合同{0}个已经提交，需要审核，请及时登录科研管理系统审核合同信息", contractHorizontalCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);


                        user.SendMail(admin.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送横向合同审核提醒邮件，管理员：{0},Email:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorContractRemaind, PrincipalDescription, "自动发送横向合同审核提醒邮件", database);

                    }
                    if (contractVerticalCount > 0 && admin.HasPermission_CensorVerticalProjectContracts(database))
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 120);
                        body = string.Format("有纵向项目合同{0}个已经提交，需要审核，请及时登录科研管理系统审核合同信息", contractVerticalCount);
                        content = EmailContentModel.GetAdminEmailContentModel(body);

                        user.SendMail(admin.Email, title, content, database);
                        count++;

                        var PrincipalDescription = string.Format("自动发送纵向合同审核提醒邮件，管理员：{0},Email:{1}", admin.Name, admin.Email);
                        Log.Write("系统", (int)LogType.CensorContractRemaind, PrincipalDescription, "自动发送纵向合同审核提醒邮件", database);
                    }
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送纵向合同审核提醒邮件失败，管理员：{0},Email:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.CensorContractRemaind, PrincipalDescriptions, "自动发送纵向合同审核提醒邮件失败", database);
                    continue;

                }
            }
            Log.Write("系统", (int)LogType.CensorContractRemaind, "共发送邮件自动提醒邮件" + count + "封", "自动发送合同审核提醒邮件 ", database);


        }
    }
    /// <summary>
    /// 合同的权限扩展
    /// </summary>
    public static class ContractPermissionExtension
    {
        /// <summary>
        /// 判断用户能够审核纵向项目的合同
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorVerticalProjectContracts(this User user, IDatabase database)
        {
            return user.HasPermission_EditVerticalProject(database);
        }
        /// <summary>
        /// 判断用户能够审核横向项目的合同
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorHorizontalProjectContracts(this User user, IDatabase database)
        {
            return user.HasPermission_EditHorizontalProject(database);
        }
        /// <summary>
        /// 判断用户是否具有合同的查看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowContract(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Show(project, database);
        }
        /// <summary>
        /// 判断合同能够被当前用户查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowContract(this User user, Project project, IDatabase database)
        {
            return user.CanShow(project, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑合同的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditContract(this User user, Project project, IDatabase database)
        {
            return user.HasPermission_Edit(project, database);
        }
        /// <summary>
        /// 判断合同能否被用户编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditContract(this User user, Project project, IDatabase database)
        {
            if (user.IsExpert)
                return project.IsPrincipal(user);

            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 判断用户能够编辑项目的主合同
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditMainContract(this User user, Project project, IDatabase database)
        {
            if (user.IsExpert)
                return project.IsPrincipal(user) && !project.hasMainContract(database.Contracts);

            return user.CanEdit(project, database) && !project.hasMainContract(database.Contracts);
        }
        /// <summary>
        /// 判断用户能否审核项目的合同
        /// </summary>
        /// <param name="user"></param>
        /// <param name="project"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorContract(this User user, Project project, IDatabase database)
        {
            if (user.IsExpert)
                return false;

            return user.CanEdit(project, database);
        }
        /// <summary>
        /// 是否具有删除文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="contract"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, Contract contract, IDatabase database)
        {
            return user.HasPermission_EditContract(contract.Project, database);
        }
        /// <summary>
        /// 是否具有删除文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="Contract"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, Contract Contract, IDatabase database)
        {
            if (!user.HasPermission_Delete(Contract, database))
                return false;

            if (user.IsExpert)
                return Contract.State == CensorState.WaitingCensor || Contract.State == CensorState.Reject;

            return true;
        }
    }
}
