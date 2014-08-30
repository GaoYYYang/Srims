using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading;
using System.Transactions;
using System.Xml;

using MIS.Common;
using MIS.Common.Mails;
using MIS.Common.Query;
using MIS.Common.Validate;

using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Stamps;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 用户
    /// </summary>
    public partial class User : Entity<User>
    {
        #region
        private IList<Permission> _PermissionList;
        public const string _USER_RESET_PASSWORD = "123456";
        /// <summary>
        /// 取得用户权限
        /// </summary>
        /// <param name="database"></param>
        private void GetPermissionList(IDatabase database)
        {
            if (_PermissionList != null)
                return;

            if (_IsCustomPermission)
                _PermissionList = this.GetAllPermissions(database.UserPermissions);
            else
                _PermissionList = UserRole.GetPermissions(database.UserRolePermissions);
        }
        #endregion
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "UserRoleID", Title = "用户角色的ID" });
            list.Add(new LogDescriptionItem { Name = "LoginID", Title = "登录名" });
            list.Add(new LogDescriptionItem { Name = "NameSpell", Title = "用户名拼音首字母" });
            list.Add(new LogDescriptionItem { Name = "Email", Title = "电子邮件" });
            list.Add(new LogDescriptionItem { Name = "HomePhone", Title = "家庭电话" });
            list.Add(new LogDescriptionItem { Name = "OfficePhone", Title = "办公电话" });
            list.Add(new LogDescriptionItem { Name = "MobilePhone", Title = "移动电话" });
            list.Add(new LogDescriptionItem { Name = "Fax", Title = "传真" });
            list.Add(new LogDescriptionItem { Name = "IsSuper", Title = "是否超级用户" });
            list.Add(new LogDescriptionItem { Name = "AllowMultiLogin", Title = "是否允许多人登陆" });
            list.Add(new LogDescriptionItem { Name = "IsCustomPermission", Title = "是否自定义权限" });
            list.Add(new LogDescriptionItem { Name = "ExtClientState", Title = "Ext客户端状态" });

            return list.ToArray();
        }
        /// <summary>
        /// 取得或设置名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set
            {
                _Name = value;
                _NameSpell = Spell.GetSpell(value);
            }
        }
        /// <summary>
        /// 取得或设置该专家的密码
        /// </summary>
        public string Password
        {
            get { return _Password; }
            set
            {
                _Password = PasswordBuilder.BuildPassword(value);
            }
        }

        /// <summary>
        /// 判断用户是否是专家
        /// </summary>
        /// <returns></returns>
        public bool IsExpert
        {
            get { return _UserRole.Entity.Type == UserRoleType.Expert; }
        }
        /// <summary>
        /// 重置用户密码
        /// </summary>
        public void ResetUserPassword()
        {
            this.Password = _USER_RESET_PASSWORD;
        }
        /// <summary>
        /// 判断是否需要修改密码
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool IsNeedEditPassword(IDatabase database)
        {
            //当重置密码时
            if (this.Password == PasswordBuilder.BuildPassword(_USER_RESET_PASSWORD))
                return true;

            //当第一次登录时
            if (database.UserLoginLogs.Count(q => q.UserID == this.ID) <= 1)
                return true;

            return false;
        }
        /// <summary>
        /// 取得该用户对应的专家
        /// </summary>
        /// <param name="query">查询</param>
        /// <returns>该用户对应的专家</returns>
        public Expert GetExpert(IQueryable<Expert> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (!IsExpert)
                throw new InvalidOperationException("该用户不是专家用户");

            return query.Single(e => e.UserID == _ID);
        }
        /// <summary>
        /// 判断该用户当前是否已被锁定
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool IsLocked(IQueryable<UserLockLog> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.GetActiveLockLog(this) != null;
        }
        /// <summary>
        /// 注销在线用户
        /// </summary>
        /// <param name="database"></param>
        public void Logout(IDatabase database)
        {
            IList<UserLoginLog> userLoginLogs = database.UserLoginLogs.GetActiveUesrLoginLog(this);

            foreach (UserLoginLog userLoginLog in userLoginLogs)
                userLoginLog.Logout(database);
        }
        /// <summary>
        /// 设置ExtJs的客户端状态
        /// </summary>
        /// <param name="key">键</param>
        /// <param name="value">值</param>
        /// <param name="database">数据库</param>
        public void SetExtClientState(string key, string value, IDatabase database)
        {
            if (String.IsNullOrEmpty(_ExtClientState))
                _ExtClientState = getEmptyClientState();

            XmlDocument document = new XmlDocument();
            document.LoadXml(_ExtClientState);

            var node = document.SelectSingleNode("//ExtClientState//" + key);
            if (node == null)
                node = document.SelectSingleNode("//ExtClientState").AppendChild(document.CreateElement(key));
            node.InnerText = value;

            _ExtClientState = document.OuterXml;
            this.Save(database);
        }
        private static string getEmptyClientState()
        {
            return "<?xml version=\"1.0\" encoding=\"utf-8\"?><ExtClientState></ExtClientState>";
        }
        /// <summary>
        /// 判断用户是否具有某一权限
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool HasPermission(PermissionItem permissionItem, IDatabase database)
        {
            return HasPermission(permissionItem, PermissionOperation.Unknown, null, database);
        }
        /// <summary>
        /// 判断用户是否具有某一权限
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="operation"></param>
        /// <param name="param"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool HasPermission(PermissionItem permissionItem, PermissionOperation operation, int? param, IDatabase database)
        {
            if (_IsSuper)
                return true;

            this.GetPermissionList(database);

            return _PermissionList.HasPermission(permissionItem, operation, param);
        }
        /// <summary>
        /// 判断用户是否具有某一权限类型的相关权限
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool HasRelatePerssionsOf(PermissionItem permissionItem, IDatabase database)
        {
            if (_IsSuper)
                return true;

            this.GetPermissionList(database);

            return _PermissionList.GetPermissions(permissionItem).Count() > 0;
        }
        /// <summary>
        /// 取得用户具有的某一类型的权限
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public IList<Permission> GetRelatePermissionsOf(PermissionItem permissionItem, IDatabase database)
        {
            this.GetPermissionList(database);

            return _PermissionList.GetPermissions(permissionItem);
        }
        /// <summary>
        /// 判断用户是否是某一项权限的院系管理员
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool IsCollegeManagerOf(PermissionItem permissionItem, IDatabase database)
        {
            this.GetPermissionList(database);

            return _PermissionList
                .Where(q => q.PermissionOperation == PermissionOperation.College && q.Params.HasValue)
                .Count() > 0;
        }
        /// <summary>
        /// 如果用户是院系管理员，根据权限类型取得该用户所能管理的院系
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public List<int> GetCanManageCollegesID(PermissionItem permissionItem, IDatabase database)
        {
            this.GetPermissionList(database);

            return _PermissionList
                .Where(q => q.PermissionOperation == PermissionOperation.College && q.Params.HasValue)
                .Select(q => q.Params.Value)
                .Distinct()
                .ToList();
        }
        /// <summary>
        /// 判断用户能否被删除
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool CanDelete(IDatabase database)
        {
            if (this.IsExpert)
                return false;

            if (this.IsSuper && database.Users.CountSuperUsers() == 1)
                return false;

            return true;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(UserRole != null, "用户角色不能为空！");
            validater.AddCondition(!String.IsNullOrEmpty(_LoginID), "用户登陆ID不能为空！");
            validater.AddCondition(!database.Users.IsUserExist(_LoginID, _ID), "用户登陆ID不能重复");
            validater.AddCondition(!String.IsNullOrEmpty(_Name), "用户姓名不能为空！");
            if (this.IsNew)
                validater.AddCondition(!String.IsNullOrEmpty(_Password), "用户密码不能为空！");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            if (IsExpert)
                throw new InvalidOperationException("不能删除专家用户！");
            if (IsSuper && database.Users.CountSuperUsers() == 1)
                throw new InvalidOperationException("当前只存在一个超级用户，不能删除！");
            if (database.Stamps.GetUserStamps(this).Count() != 0)
                throw new InvalidOperationException("该用户拥有印章不能删除！");
            if (database.AwardDocuments.GetUserAwardDocuments(this).Count() != 0)
                throw new InvalidOperationException("该用户上传过奖励文档不能删除！");


            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var message in database.Messages.Where(m => m.ReceiverID == _ID))
                    message.Delete(database);

                foreach (var message in database.Messages.Where(m => m.SenderID == _ID))
                {
                    message.Sender = null;
                    message.Save(database);
                }

                var userPermissions = this.GetAllUserPermission(database.UserPermissions);
                foreach (var userPermission in userPermissions)
                    userPermission.Delete(database);

                var permissions = this.GetAllPermissions(database.UserPermissions);
                foreach (var permission in permissions)
                    permission.Delete(database);

                var userLoginLogs = database.UserLoginLogs.GetUserLoginLog(this);
                foreach (var userLoginLog in userLoginLogs)
                    userLoginLog.Delete(database);

                var userLockLogs = database.UserLockLogs.GetUserLockLog(this);
                foreach (var userLockLog in userLockLogs)
                    userLockLog.Delete(database);

                var views = database.Views.GetUserViews(this);
                foreach (var view in views)
                    view.Delete(database);

                base.DeleteAction(database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="receiveMailAddress">收件人地址</param>
        /// <param name="mailSubject">邮件标题</param>
        /// <param name="mailBody">邮件内容</param>
        /// <param name="database">数据库</param>
        public void SendMail(string receiveMailAddress, string mailSubject, string mailBody, IDatabase database)
        {
            if (database == null)
                throw new ArgumentNullException("database");
            if (mailSubject == null)
                throw new ArgumentNullException("mailSubject");
            if (mailBody == null)
                throw new ArgumentNullException("mailBody");

            SystemSetting systemSetting = database.SystemSettings.GetSystemSetting();
            Mail.MailServerAddress = systemSetting.SmtpHost;
            Mail.Port = systemSetting.SmtpPort.HasValue ? systemSetting.SmtpPort.Value : 25;
            Mail.UserName = systemSetting.SmtpUsername;
            Mail.Password = systemSetting.SmtpPassword;
            Mail mail;
            if (string.IsNullOrEmpty(receiveMailAddress))
                mail = new Mail(systemSetting.EmailAddress, mailSubject, mailBody, systemSetting.EmailAddress);
            else
                mail = new Mail(receiveMailAddress, mailSubject, mailBody, systemSetting.EmailAddress);

            try
            {

                mail.Send();
            }
            catch (Exception e)
            {
                var description = string.Format("邮件发送失败，发送内容为：{0}。\n错误信息为：{1}。", "收信箱" + receiveMailAddress + ",主题:" + mailSubject, e.Message);
                Log.Write("发送邮件", (int)LogType.EmailSendFail, description, "邮件发送失败", database);
            }
        }
        /// <summary>
        /// 发短消息
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="reciver">收件人</param>
        /// <param name="messageContent">消息内容</param>
        public void SendMessage(IDatabase database, User reciver, MessageContent messageContent)
        {
            if (database == null)
                throw new ArgumentNullException("database");
            if (reciver == null)
                throw new ArgumentNullException("reciver");
            if (messageContent == null)
                throw new ArgumentNullException("messageContent");

            Message message = new Message
            {
                Sender = this,
                Receiver = reciver,
                Title = messageContent.Title,
                Content = messageContent.Content,
                DateTime = DateTime.Now,
                IsRead = false,
            };
            message.Save(database);
        }
    }

    /// <summary>
    /// 用户的业务扩展
    /// </summary>
    public static class UserBusinessExtension
    {
        /// <summary>
        /// 用户登陆
        /// </summary>
        /// <param name="dataAccess">用户数据访问</param>
        /// <param name="loginID">登陆ID</param>
        /// <param name="password">密码</param>
        /// <param name="loginIP">登陆IP</param>
        /// <returns></returns>
        public static LoginResult Login(this IEntityDataAccess<User> dataAccess, string loginID, string password, string loginIP)
        {
            if (dataAccess == null)
                throw new ArgumentNullException("dataAccess");
            var userLoginLogsQuery = dataAccess.Database.UserLoginLogs;

            //判断用户名为空 
            if (String.IsNullOrEmpty(loginID))
                return new LoginResult(LoginResultState.NullUserName, null);

            //判断密码为空
            if (String.IsNullOrEmpty(password))
                return new LoginResult(LoginResultState.NullPassword, null);

            //取得用户
            var user = dataAccess.SingleOrDefault(u => u.LoginID == loginID);

            //判断用户存在
            if (user == null)
                return new LoginResult(LoginResultState.UserNotFound, null);

            //判断是否已锁定
            if (user.IsLocked(dataAccess.Database.UserLockLogs))
                return new LoginResult(LoginResultState.Locked, null);

            //判断专家用户的逻辑删除            
            if (user.IsExpert && user.GetExpert(dataAccess.Database.Experts).IsDeleted)
                return new LoginResult(LoginResultState.UserNotFound, null);

            //判断密码
            if (user.Password != PasswordBuilder.BuildPassword(password))
                return new LoginResult(LoginResultState.WrongPassword, null);

            //判断多人登陆
            if (!user.AllowMultiLogin && userLoginLogsQuery.GetActiveUesrLoginLog(user).Count > 0)
                return new LoginResult(LoginResultState.DenyMultiLogin, null);

            //判断是否已同意用户协议
            if (user.IsExpert && !user.GetExpert(dataAccess.Database.Experts).IsAgreeLicence)
                return new LoginResult(LoginResultState.NotAgreeLicence, null);

            //建立该次登陆日志
            var userLoginLog = UserLoginLog.New(user, loginIP);
            userLoginLog.Active(dataAccess.Database);

            return new LoginResult(LoginResultState.Succeed, userLoginLog);
        }
        /// <summary>
        /// 标记用户活动
        /// </summary>
        /// <param name="dataAccess">用户数据访问</param>
        /// <param name="token">身份令牌</param>
        /// <param name="loginIP">登陆IP</param>
        /// <returns></returns>
        public static LoginResult Active(this IEntityDataAccess<User> dataAccess, Guid token, string loginIP)
        {
            if (dataAccess == null)
                throw new ArgumentNullException("dataAccess");

            var userLoginLog = dataAccess.Database.UserLoginLogs.GetActiveUserLoginLog(token, loginIP);
            if (userLoginLog == null)
                return new LoginResult(LoginResultState.InvalidToken, null);

            var user = userLoginLog.User;
            if (user.IsLocked(dataAccess.Database.UserLockLogs))
                return new LoginResult(LoginResultState.Locked, null);

            if (user.IsExpert && user.GetExpert(dataAccess.Database.Experts).IsDeleted)
                return new LoginResult(LoginResultState.UserNotFound, null);

            userLoginLog.Active(dataAccess.Database);
            return new LoginResult(LoginResultState.Succeed, userLoginLog);
        }
        /// <summary>
        /// 管理员工作提醒（提醒规则：给非超管管理员每天发送一封审核工作的邮件）
        /// </summary>
        /// <param name="query"></param>
        public static void WorkRemind(this IEntityDataAccess<User> query)
        {
            var database = query.Database;
            var admins = query.Where(q => !q.IsExpert && !q.IsSuper).ToList();
            foreach (var admin in admins)
            {
                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                int waitingStartCensorHorizontalProjectCount = database.Projects.GetWaitingCensorProjectCount(admin, true, ProjectState.WaitingStartCensor);
                int waitingStartCensorVerticalProjectCount = database.Projects.GetWaitingCensorProjectCount(admin, false, ProjectState.WaitingStartCensor);
                int waitingEndCensorHorizontalProjectCount = database.Projects.GetWaitingCensorProjectCount(admin, true, ProjectState.WaitingEndCensor);
                int waitingEndCensorVerticalProjectCount = database.Projects.GetWaitingCensorProjectCount(admin, false, ProjectState.WaitingEndCensor);

                int waitingCenorHorizontalProjectDocumentCount = database.Documents.GetWaitingCensorDocument(true, admin, database).Count();
                int waitingCenorVerticalProjectDocumentCount = database.Documents.GetWaitingCensorDocument(false, admin, database).Count();

                int waitingCenorHorizontalProjectContractCount = database.Contracts.GetWaitingCensorContract(true, admin, database).Count();
                int waitingCenorVerticalProjectContractCount = database.Contracts.GetWaitingCensorContract(false, admin, database).Count();

                int waitingCensorFundDescendCount = database.FundDescends.GetWaitingAllocationFundDescendCount(true, admin);

                int waitingCensorHorizontalProjectFundAllocationCount = database.FundAllocations.GetWaitingCensorFundAllocationCount(true, admin);
                int waitingCensorVerticalProjectFundAllocationCount = database.FundAllocations.GetWaitingCensorFundAllocationCount(false, admin);

                string title = "中国海洋大学科研管理系统审核工作提醒";

                StringBuilder body = new StringBuilder();
                body.AppendFormat("您目前没有完成的审核工作为：\n");
                if (waitingStartCensorHorizontalProjectCount > 0)
                    body.AppendFormat("横向项目立项审核{0}项；\n", waitingStartCensorHorizontalProjectCount);

                if (waitingStartCensorVerticalProjectCount > 0)
                    body.AppendFormat("纵向项目立项审核{0}项；\n", waitingStartCensorVerticalProjectCount);

                if (waitingEndCensorHorizontalProjectCount > 0)
                    body.AppendFormat("横向项目结项审核{0}项；\n", waitingEndCensorHorizontalProjectCount);

                if (waitingEndCensorVerticalProjectCount > 0)
                    body.AppendFormat("纵向项目结项审核{0}项；\n", waitingEndCensorVerticalProjectCount);

                if (waitingCenorHorizontalProjectDocumentCount > 0)
                    body.AppendFormat("横向项目待审核的文档{0}项；\n", waitingCenorHorizontalProjectDocumentCount);

                if (waitingCenorVerticalProjectDocumentCount > 0)
                    body.AppendFormat("纵向项目待审核的文档{0}项；\n", waitingCenorVerticalProjectDocumentCount);

                if (waitingCenorHorizontalProjectContractCount > 0)
                    body.AppendFormat("横向项目待审核的合同{0}项；\n", waitingCenorHorizontalProjectContractCount);

                if (waitingCenorVerticalProjectContractCount > 0)
                    body.AppendFormat("纵向项目带审核的合同{0}项；\n", waitingCenorVerticalProjectContractCount);

                if (waitingCensorFundDescendCount > 0)
                    body.AppendFormat("横向项目待审核的经费下拨{0}项；\n", waitingCensorFundDescendCount);

                if (waitingCensorHorizontalProjectFundAllocationCount > 0)
                    body.AppendFormat("横向项目待审核的经费分配{0}项；\n", waitingCensorHorizontalProjectFundAllocationCount);

                if (waitingCensorVerticalProjectFundAllocationCount > 0)
                    body.AppendFormat("纵向项目待审核的经费分配{0}项；\n", waitingCensorVerticalProjectFundAllocationCount);

                string content = EmailContentModel.GetAdminEmailContentModel(body.ToString());

                var user = database.Users.First(u => u.IsSuper);
                if (!string.IsNullOrEmpty(admin.Email))
                    user.SendMail(admin.Email, title, content, database);

                var description = string.Format("中国海洋大学科研管理系统审核工作提醒，发送管理员为：{0},内容为{1}", admin.Name, content);
                Log.Write("系统", (int)LogType.AdminWorkRemind, description, "自动发送中国海洋大学科研管理系统审核工作提醒邮件", database);
            }
        }

    }
    /// <summary>
    /// 用户的查询扩展
    /// </summary>
    public static class UserQueryExtension
    {
        /// <summary>
        /// 取得用户查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<User> Query(this IQueryable<User> query, UserQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //查询
            var q = query.GetUsers(queryInformation);
            //排序
            q = q.sortUsers(queryInformation.SortInfo);

            return new QueryResult<User>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
        /// <summary>
        /// 取得用户
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static IQueryable<User> GetUsers(this IQueryable<User> query, UserQueryInformation queryInformation)
        {
            if (queryInformation.Name != null) queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name))
                query = query.Where(q => q.Name.StartsWith(queryInformation.Name) || q.NameSpell.Equals(queryInformation.Name));

            if (queryInformation.LoginID != null) queryInformation.LoginID = queryInformation.LoginID.Trim();
            if (!string.IsNullOrEmpty(queryInformation.LoginID))
                query = query.Where(q => q.LoginID == queryInformation.LoginID);

            if (queryInformation.UserRoleID != null && queryInformation.UserRoleID.Length != 0)
                query = query.Where(q => queryInformation.UserRoleID.Contains(q.UserRoleID));

            if (queryInformation.IsCustomPermission.HasValue)
                query = query.Where(q => q.IsCustomPermission == queryInformation.IsCustomPermission.Value);
            if (queryInformation.IsSuper.HasValue)
                query = query.Where(q => q.IsSuper == queryInformation.IsSuper.Value);

            return query;
        }
        /// <summary>
        /// 用户列表排序
        /// </summary>
        /// <param name="users"></param>
        /// <param name="sortInro"></param>
        /// <returns></returns>
        private static IQueryable<User> sortUsers(this IQueryable<User> users, SortInfo sortInro)
        {
            if (sortInro == null)
                users = users.OrderBy(u => u.UserRole.Name);
            else if (sortInro.Field.EqualIgnoreCase("Name"))
                users = sortInro.Direction == SortDirection.ASC
                    ? users.OrderBy(u => u.Name)
                    : users.OrderByDescending(u => u.Name);
            else if (sortInro.Field.EqualIgnoreCase("UserRoleName"))
                users = sortInro.Direction == SortDirection.ASC
                    ? users.OrderBy(u => u.UserRole.Name)
                    : users.OrderByDescending(u => u.UserRole.Name);
            return users;
        }
        /// <summary>
        /// 用户查询
        /// </summary>
        /// <param name="users"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public static IList<User> SearchUser(this IQueryable<User> users, string keyword)
        {
            if (keyword != null) keyword = keyword.Trim();

            return users.Where(u => u.Name.StartsWith(keyword) || u.NameSpell.Equals(keyword)).ToList();
        }
        /// <summary>
        /// 管理员查询
        /// </summary>
        /// <param name="users"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public static IList<User> SearchAdministrator(this IQueryable<User> users, string keyword)
        {
            if (keyword != null) keyword = keyword.Trim();

            return users.Where(u => (u.Name.StartsWith(keyword) || u.NameSpell.Equals(keyword) && u.UserRole.Type == UserRoleType.Administrator)).ToList();
        }
        /// <summary>
        /// 取得用户角色
        /// </summary>
        /// <param name="users"></param>
        /// <returns></returns>
        public static IList<UserRole> GetUserRoles(this IQueryable<User> users)
        {
            return users.Select(u => u.UserRole).Distinct().ToList();
        }
        /// <summary>
        /// 判断用户名是否存在
        /// </summary>
        /// <param name="users"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static bool IsUserNameExist(this IQueryable<User> users, string name)
        {
            return users.Where(u => u.Name == name).ToList().Count != 0;
        }
        /// <summary>
        /// 判断用户是否已经存在
        /// </summary>
        /// <param name="users"></param>
        /// <param name="loginID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public static bool IsUserExist(this IQueryable<User> users, string loginID, int? userID)
        {
            if (users == null)
                throw new ArgumentNullException("users");

            if (userID.HasValue)
                return users.Count(u => u.ID != userID && u.LoginID.Trim() == loginID.Trim()) != 0;
            return users.Count(u => u.LoginID.Trim() == loginID.Trim()) != 0;
        }
        /// <summary>
        /// 统计当前超级用户数目
        /// </summary>
        /// <param name="users"></param>
        /// <returns></returns>
        public static int CountSuperUsers(this IQueryable<User> users)
        {
            return users.Count(u => u.IsSuper == true);
        }
        /// <summary>
        /// 取得所有的管理员
        /// </summary>
        /// <param name="query">用户查询</param>
        /// <returns></returns>
        public static IList<User> GetAllAdministrators(this IQueryable<User> query)
        {
            return query.Where(u => u.UserRole.Type == UserRoleType.Administrator).ToList();
        }
    }
    /// <summary>
    /// 用户的权限扩展
    /// </summary>
    public static class UserPermissionExtension
    {
        /// <summary>
        /// 查看用户权限
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowUser(this User userLogin)
        {
            return userLogin.IsSuper;
        }
        /// <summary>
        /// 是否具有编辑用户的权限
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        public static bool HasPermission_EditUser(this User userLogin)
        {
            return userLogin.IsSuper;
        }
        /// <summary>
        /// 是否具有删除用户的权限
        /// </summary>
        /// <param name="userLogin"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteUser(this User userLogin, User user, IDatabase database)
        {
            return userLogin.IsSuper && user.CanDelete(database);
        }
        /// <summary>
        /// 能否查看用户
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        public static bool CanShowUser(this User userLogin)
        {
            return userLogin.HasPermission_ShowUser();
        }
        /// <summary>
        /// 能否编辑用户
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        public static bool CanEditUser(this User userLogin)
        {
            return userLogin.HasPermission_EditUser();
        }
        /// <summary>
        /// 能否删除用户
        /// </summary>
        /// <param name="userLogin"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDeleteUser(this User userLogin, User user, IDatabase database)
        {
            if (user.IsExpert || database.AwardDocuments.GetUserAwardDocuments(user).Count() != 0 || database.Stamps.GetUserStamps(user).Count() != 0)
                return false;
            return userLogin.HasPermission_DeleteUser(user, database);
        }
    }
}
