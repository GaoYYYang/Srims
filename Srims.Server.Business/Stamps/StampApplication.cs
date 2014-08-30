using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Stamps;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using System.Transactions;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印申请
    /// </summary>
    public partial class StampApplication : Entity<StampApplication>
    {
        public override string ToString()
        {
            return "用印材料来源名称：" + this._StampStuffFromName +
                "\n用印材料份数：" + this._StuffNumber +
                "\n盖章事由：" + this._StampReason +
                "\n关键词：" + this.KeyWord +
                "\n经办人：" + this.Manager +
                "\n责任人：" + this.Principal.Name +
                "\n当前状态：" + this.CurrentState.State;
        }
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

            list.Add(new LogDescriptionItem { Name = "StampStuffFromName", Title = "用印材料来源名称" });
            list.Add(new LogDescriptionItem { Name = "StampStuffFromID", Title = "用印材料来源的ID" });
            list.Add(new LogDescriptionItem { Name = "StuffNumber", Title = "用印材料份数" });
            list.Add(new LogDescriptionItem { Name = "StampReason", Title = "盖章事由" });
            list.Add(new LogDescriptionItem { Name = "KeyWord", Title = "关键词" });
            list.Add(new LogDescriptionItem { Name = "Manager", Title = "经办人" });
            list.Add(new LogDescriptionItem { Name = "ManagerPhone", Title = "经办人联系电话" });
            list.Add(new LogDescriptionItem { Name = "ManagerEmail", Title = "经办人邮箱" });
            list.Add(new LogDescriptionItem { Name = "PrincipalID", Title = "责任人的ID" });
            list.Add(new LogDescriptionItem { Name = "CurrentStateID", Title = "当前状态的ID" });

            return list.ToArray();
        }
        /// <summary>
        /// 取得盖章材料的文件类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<string> GetAllStampStuffTypes(IQueryable<Stuff> query)
        {
            return query.Where(ss => ss.StampApplicationID == _ID).Select(ss => ss.StuffType).Distinct().ToList();
        }
        /// <summary>
        /// 取得盖章材料的所有章型
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public IList<string> GetAllStampTypes(IDatabase database)
        {
            List<string> stampTypes = new List<string> { };
            foreach (var stampStuff in database.Stuffs.Where(ss => ss.StampApplicationID == _ID).Distinct().ToList())
                foreach (string type in stampStuff.GetAllStampTypes(database.StuffStamps))
                    stampTypes.Add(type);
            return stampTypes.Distinct().ToList();

        }
        /// <summary>
        /// 取得盖章材料的所有盖章人
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public IList<User> GetAllStampOwners(IDatabase database)
        {
            List<User> stampOwners = new List<User> { };
            foreach (var stampStuff in database.Stuffs.Where(ss => ss.StampApplicationID == _ID).Distinct().ToList())
                foreach (var stamp in stampStuff.GetAllStamps(database.StuffStamps))
                    stampOwners.Add(stamp.Owner);
            return stampOwners.Distinct().ToList();

        }
        /// <summary>
        /// 盖我负责的章
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        public void StampMyStamp(IQueryable<Stuff> query, IDatabase database, User user)
        {
            IList<Stuff> myStampStuff = query.Where(s => s.StampApplicationID == _ID).ToList();
            foreach (var stuff in myStampStuff)
                stuff.StampMyStamp(database.StuffStamps, database, user);
        }
        /// <summary>
        /// 所有文件是否盖章完毕
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool AllIsStamped(IQueryable<Stuff> query, IDatabase database)
        {
            bool isAllStamped = true;
            IList<Stuff> stuffs = query.Where(s => s.StampApplicationID == _ID).ToList();
            foreach (var stuff in stuffs)
            {
                if (!stuff.AllIsStamped(database.StuffStamps, database))
                {
                    isAllStamped = false;
                    break;
                }
            }
            return isAllStamped;

        }
        //carlsirce2013.6.24
        /// <summary>
        /// 将文印状态设置为审核最终通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorPassComplete(User user, IDatabase database)
        {
            if (!user.HasPermission_CensorCompleteStamp(database, this))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.CensorPassComplete, user, string.Empty, database);
            SendMessageToPrincipal(user, "审核通过", database);
            SendMessageToAdmin(user, "初审直接通过", database, PermissionItem.ManageStampFeedback);
        }
        /// <summary>
        /// 将文印状态设置为未提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CancleSubmit(User user, IDatabase database)
        {
            if (!user.HasPermission_CancleSubmitStamp(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.UnSubmit, user, string.Empty, database);
            SendMessageToAdmin(user, "撤销文印申请", database, PermissionItem.ManageStamp);
        }
        /// <summary>
        /// 将文印状态设置为提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Submit(User user, IDatabase database)
        {
            if (!user.HasPermission_SubmitStamp(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.Submit, user, string.Empty, database);
            SendMessageToAdmin(user, "提交文印申请", database, PermissionItem.ManageStamp);
        }
        /// <summary>
        /// 将文印状态设置为初审通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorPass(User user, IDatabase database)
        {
            if (!user.HasPermission_CensorStamp(database, this))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.CensorPass, user, string.Empty, database);
            SendMessageToPrincipal(user, "初审通过,提交部门审核", database);
            SendMessageToAdmin(user, "初审通过,提交部门审核", database, PermissionItem.ManageStampFeedback);
        }
        /// <summary>
        /// 将文印状态设置为审核驳回
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorReject(User user, string remark, IDatabase database)
        {
            if (!user.HasPermission_CensorStamp(database, this) && !user.HasPermission_CensorCompleteStamp(database, this))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.CensorReject, user, remark, database);
            SendMessageToPrincipal(user, "初审核驳回", database);
        }
        /// <summary>
        /// 将文印状态设置为部门审核通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void DepartmentCensorPass(User user, IDatabase database)
        {
            if (!user.HasPermission_DepartmentCensorStamp(database, this))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.DepartmentCensorPass, user, string.Empty, database);
            SendMessageToPrincipal(user, "部门审核通过", database);
            SendMessageToAdmin(user, "部门审核通过", database, PermissionItem.ManageStampFeedback);
        }
        /// <summary>
        /// 将文印状态设置为部门审核驳回
        /// </summary>
        /// <param name="user"></param>
        /// <param name="remark"></param>
        /// <param name="database"></param>
        public void DepartmentCensorReject(User user, string remark, IDatabase database)
        {
            if (!user.HasPermission_DepartmentCensorStamp(database, this))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.DepartmentCensorReject, user, remark, database);
            SendMessageToPrincipal(user, "部门审核驳回", database);
        }
        /// <summary>
        /// 将文印状态设置为已盖章
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Stamped(User user, IDatabase database)
        {
            if (!user.HasPermission_Stamp(database))
                throw new HasNoPermissionException();

            saveForChangeState(StampState.Stamp, user, string.Empty, database);
            SendMessageToPrincipal(user, "盖章完毕", database);
            SendMessageToAdmin(user, "盖章完毕", database, PermissionItem.ManageStamp);

            string title = string.Format("盖章完毕");
            string body = string.Format("您的文印申请已经盖章，其中项目来源为：{0}。", this.StampStuffFromName);
            string content = string.Empty;

            content = EmailContentModel.GetExpertEmailContentModel(this.Principal.Name, body);
            user.SendMail(this.Principal.Email, title, content, database);

            content = EmailContentModel.GetExpertEmailContentModel(this.Manager, body);
            user.SendMail(this.ManagerEmail, title, content, database);
        }
        private void saveForChangeState(StampState stampState, User user, string reamrk, IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var stampStateHistory = new StampStateHistory
                {
                    DateTime = DateTime.Now,
                    Operator = user.Name,
                    State = stampState,
                    Remark = reamrk,
                    StampApplication = this,
                };

                stampStateHistory.Save(database);
                this.CurrentState = stampStateHistory;
                this.Save(database);

                ts.Complete();
            }

        }
        /// <summary>
        /// 发送消息给专家
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="action"></param>
        /// <param name="database"></param>
        public void SendMessageToPrincipal(User sender, string action, IDatabase database)
        {
            var title = String.Format("{0}：文印申请（材料来源于{1}）", action, _StampStuffFromName);

            string content = string.Empty;
            content = String.Format(@"您提交的文印申请（材料来源于{0})，已由管理员{1}，于{2}，{3}。{4}", _StampStuffFromName, sender.Name, DateTime.Now, action, this.getHyperLinkString(true, "undefined", "点击查看文印"));
            if (action == "审核驳回")
                content = String.Format(@"您提交的文印申请（材料来源于{0})，由于{1}已由管理员{2}，于{3}，{4}。{5}", _StampStuffFromName, this.CurrentState.Remark, sender.Name, DateTime.Now, action, this.getHyperLinkString(true, "undefined", "点击查看文印"));

            Message.SendMessage(title, content, sender, this.Principal.User, database);
        }
        /// <summary>
        /// 发送消息给管理员
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="action"></param>
        /// <param name="database"></param>
        /// <param name="item"></param>
        public void SendMessageToAdmin(User sender, string action, IDatabase database, PermissionItem item)
        {
            var title = String.Format("{0}：材料来源于{1}", action, _StampStuffFromName);

            string content = string.Empty;
            if (action == "提交文印申请")
                content = String.Format(@"{0}于{1}，{2}（材料来源于{3})，请予以审核。{4}。", sender.Name, DateTime.Now, action, _StampStuffFromName, this.getHyperLinkString(false, "true", "点击审核文印"));
            if (action == "撤销文印申请")
                content = String.Format(@"{0}于{1}，{2}（材料来源于{3})。{4}。", sender.Name, DateTime.Now, action, _StampStuffFromName, this.getHyperLinkString(false, "undefined", "点击察看文印"));
            if (action == "审核通过")
                content = String.Format(@"{0}于{1}，{2}（材料来源于{3})，请予以盖章。{4}。", sender.Name, DateTime.Now, action, _StampStuffFromName, this.getHyperLinkString(false, "false", "点击反馈文印"));
            if (action == "盖章完毕")
                content = String.Format(@"{0}于{1}，{2}（材料来源于{3})。{4}。", sender.Name, DateTime.Now, action, _StampStuffFromName, this.getHyperLinkString(false, "undefined", "点击查看文印"));

            var administrators = getAdminCanSendMessage(item, database);
            foreach (var administrator in administrators)
                Message.SendMessage(title, content, sender, administrator, database);
        }
        /// <summary>
        /// 取得超链接
        /// </summary>
        /// <returns></returns>
        public string getHyperLinkString(bool isShowForExpert, string isForcensor, string literal)
        {
            return string.Format("<a href='#' onclick='Srims.MessageAction.showStamp({0},{1},{2});return false;'>{3}</a>", this.ID, isShowForExpert.ToString().ToLower(), isForcensor, literal);
        }
        /// <summary>
        /// 取得能受到短消息的的管理员列表
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public List<User> getAdminCanSendMessage(PermissionItem item, IDatabase database)
        {
            List<User> administratorList = new List<User>();
            List<User> superList = new List<User>();

            var allAdministrators = database.Users.GetAllAdministrators();
            foreach (var administrator in allAdministrators)
            {
                if (administrator.HasPermission(item, database) && !administrator.IsSuper)
                    administratorList.Add(administrator);

                if (administrator.IsSuper)
                    superList.Add(administrator);
            }

            if (administratorList.Count > 0)
                return administratorList;

            return superList;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Manager), "经办人不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_ManagerPhone), "经办人电话不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_ManagerEmail), "经办人邮箱不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_StampStuffFromName), "项目来源不能为空");
            validater.AddCondition(_Principal.Entity != null, "负责人不能为空");
            validater.AddCondition(_StuffNumber >= 1, "材料份数不能小于1");
            validater.AddCondition(_StampApplicationType.Entity != null, "文印类行不能为空");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var stampStuff in database.Stuffs.GetStampStuffs(_ID))
                    stampStuff.Delete(database);

                this.CurrentState = null;
                foreach (var stampState in database.StampStateHistories.GetStampStateHistory(_ID))
                    stampState.Delete(database);

                base.DeleteAction(database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 删除所有材料
        /// </summary>
        /// <param name="database"></param>
        public void DeleteAllStuffs(IDatabase database)
        {
            foreach (var stampStuff in database.Stuffs.GetStampStuffs(_ID))
                stampStuff.Delete(database);
        }
    }

    /// <summary>
    /// 文印申请的业务扩展
    /// </summary>
    public static class StampApplicationBusinessExtension
    {
    }
    /// <summary>
    /// 文印申请的查询扩展
    /// </summary>
    public static class StampApplicationQueryExtension
    {
        /// <summary>
        /// 文印查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<StampApplication> Query(this IQueryable<StampApplication> query, StampQueryInformation queryInformation, User user, IDatabase database, StampState? stampState, StampState? stampState2)
        {
            //carlsirce2013.3.5 外协迁移数据库临时使用的函数
            //foreach (var item in query.ToList())
            //{
            //    if (item.CurrentStateID == null)
            //    {
            //        StampStateHistory state = new StampStateHistory();
            //        state.State = StampState.UnSubmit;
            //        state.StampApplication = item;
            //        state.Operator = "系统迁移";
            //        state.Save(database);
            //        item.CurrentState = state;
            //        item.Save(database);
            //    }
            //}
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            var q = query.GetStampApplications(queryInformation, user, database, stampState, stampState2);

            return new QueryResult<StampApplication>(q.ToList().Distinct().Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
        /// <summary>
        /// 取得文印
        /// </summary>
        /// <param name="query"></param>
        /// <param name="information"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<StampApplication> GetStampApplications(this IQueryable<StampApplication> query, StampQueryInformation information, User user, IDatabase database, StampState? stampState, StampState? stampState2)
        {
            var q = query;
            q = q.Intersect(query.getStampApplications(information, stampState, database, stampState2));
            q = q.Intersect(query.getStampApplications(information, database.Stuffs, database.StuffStamps, user, stampState, stampState2));
            q = q.Intersect(query.getStampApplications(user, stampState, database));
            if (information.PrincipalQueryInformation != null)
                q = q.Intersect(query.getStampApplications(information.PrincipalQueryInformation, database));
            q = sortQuery(q, information.SortInfo, database);
            return q;
        }

        private static IQueryable<StampApplication> sortQuery(IQueryable<StampApplication> query, SortInfo sortInfo, IDatabase database)
        {
            if (sortInfo == null)
                return query.OrderByDescending(s => s.ID);
            else if (sortInfo.Field.EqualIgnoreCase("CurrentState"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.CurrentState.State)
                    : query.OrderByDescending(s => s.CurrentState.State);
            else if (sortInfo.Field.EqualIgnoreCase("CurrentStateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.CurrentState.DateTime)
                    : query.OrderByDescending(s => s.CurrentState.DateTime);
            else if (sortInfo.Field.EqualIgnoreCase("KeyWord"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.KeyWord)
                    : query.OrderByDescending(s => s.KeyWord);
            else if (sortInfo.Field.EqualIgnoreCase("Manager"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.Manager)
                    : query.OrderByDescending(s => s.Manager);
            else if (sortInfo.Field.EqualIgnoreCase("ManagerPhone"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.ManagerPhone)
                    : query.OrderByDescending(s => s.ManagerPhone);
            else if (sortInfo.Field.EqualIgnoreCase("ManagerEmail"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.ManagerEmail)
                    : query.OrderByDescending(s => s.ManagerEmail);
            else if (sortInfo.Field.EqualIgnoreCase("Principal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.Principal.Name)
                    : query.OrderByDescending(s => s.Principal.Name);
            else if (sortInfo.Field.EqualIgnoreCase("StampReason"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.StampReason)
                    : query.OrderByDescending(s => s.StampReason);
            else if (sortInfo.Field.EqualIgnoreCase("StampStuffFromName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.StampStuffFromName)
                    : query.OrderByDescending(s => s.StampStuffFromName);
            else if (sortInfo.Field.EqualIgnoreCase("StuffNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(s => s.StuffNumber)
                    : query.OrderByDescending(s => s.StuffNumber);
            else return query.OrderByDescending(s => s.ID);
        }
        private static IQueryable<StampApplication> getStampApplications(this IQueryable<StampApplication> query, StampQueryInformation information, StampState? stampState, IDatabase database, StampState? stampState2)
        {
            if (!string.IsNullOrEmpty(information.KeyWord)) information.KeyWord = information.KeyWord.Trim();
            if (!string.IsNullOrEmpty(information.KeyWord))
                query = query.Where(s => s.KeyWord.Contains(information.KeyWord));

            if (!string.IsNullOrEmpty(information.Manager)) information.Manager = information.Manager.Trim();
            if (!string.IsNullOrEmpty(information.Manager))
                query = query.Where(s => s.Manager.StartsWith(information.Manager));

            if (!string.IsNullOrEmpty(information.StampApplicationType)) information.StampApplicationType = information.StampApplicationType.Trim();
            if (!string.IsNullOrEmpty(information.StampApplicationType))
                query = query.Where(s => s.StampApplicationType.Name==information.StampApplicationType);

            if (!string.IsNullOrEmpty(information.StampApplicationTypeGroup)) information.StampApplicationTypeGroup = information.StampApplicationTypeGroup.Trim();
            if (!string.IsNullOrEmpty(information.StampApplicationTypeGroup))
                query = query.Where(s => s.StampApplicationType.StampApplicationTypeGroup.Name==information.StampApplicationTypeGroup);


            if (!string.IsNullOrEmpty(information.Principal)) information.Manager = information.Principal.Trim();
            if (!string.IsNullOrEmpty(information.Principal))
                query = query.Where(s => s.Principal.Name.StartsWith(information.Principal) || s.Principal.NameSpell.StartsWith(information.Principal));
            //carlsirce 2013.8.30 按初审管理员查询
            if (!string.IsNullOrEmpty(information.StampAdministrator))
            {
                information.StampAdministrator = information.StampAdministrator.Trim();
                var administrator = database.Users.FirstOrDefault(c => (c.Name == information.StampAdministrator || c.NameSpell == information.StampAdministrator) && c.UserRole.Type == UserRoleType.Administrator);
                if (administrator != null)
                {
                    var projectTypeIDList = administrator.GetCanCensorHorizontalProjectTypes(database)
                            .Union(administrator.GetCanCensorVerticalProjectTypes(database))
                            .Select(pt => pt.ID)
                            .ToList();
                    var stampTypeIDList = database.StampApplicationFirstAdmins.Where(c => c.User == administrator).Select(c => c.StampApplicationType.ID).ToList();
                    query = query.Where(s => (s.StampApplicationType != null && stampTypeIDList.Contains(s.StampApplicationTypeID.Value)) || (s.StampStuffFrom != null && projectTypeIDList.Contains(s.StampStuffFrom.Type.Type.ID)));
                }
            }
            //carlsirce 2013.8.30 按部门管理员查询
            if (!string.IsNullOrEmpty(information.StampDepartmentAdministrator))
            {
                information.StampAdministrator = information.StampAdministrator.Trim();
                var administrator = database.Users.FirstOrDefault(c => (c.Name == information.StampAdministrator || c.NameSpell == information.StampAdministrator) && c.UserRole.Type == UserRoleType.Administrator);
                if (administrator != null)
                {
                    var projectTypeIDList = administrator.GetCanCensorHorizontalProjectTypes(database)
                            .Union(administrator.GetCanCensorVerticalProjectTypes(database))
                            .Select(pt => pt.ID)
                            .ToList();
                    var stampTypeIDList = database.StampApplicationSecondAdmins.Where(c => c.User == administrator).Select(c => c.StampApplicationType.ID).ToList();
                    query = query.Where(s => (s.StampApplicationType != null && stampTypeIDList.Contains(s.StampApplicationTypeID.Value)) || (s.StampStuffFrom != null && projectTypeIDList.Contains(s.StampStuffFrom.Type.Type.ID)));
                }
            }
            if (!string.IsNullOrEmpty(information.Principal))
                if (!string.IsNullOrEmpty(information.StampStuffFromName)) information.StampStuffFromName = information.StampStuffFromName.Trim();
            if (!string.IsNullOrEmpty(information.StampStuffFromName))
                query = query.Where(s => s.StampStuffFromName.Contains(information.StampStuffFromName));

            if (information.StateDate != null)
            {
                if (information.StateDate.Start.HasValue)
                    query = query.Where(p => p.CurrentState.DateTime >= information.StateDate.Start);
                if (information.StateDate.End.HasValue)
                    query = query.Where(p => p.CurrentState.DateTime <= information.StateDate.End);
            }

            if (stampState == null)
            {
                if (information.CurrentState != null && information.CurrentState.Length > 0)
                    query = query.Where(s => information.CurrentState.Contains(s.CurrentState.State));
            }
            else
            {
                //加入对审核最终通过的判断。
                if (stampState2 != null)
                {
                    query = query.Where(s => s.CurrentState.State == stampState.Value || s.CurrentState.State == stampState2.Value);
                }
                else
                {
                    if (stampState.HasValue)
                        if (stampState == StampState.Submit)
                            query = query.Where(s => s.CurrentState.State == stampState.Value || s.CurrentState.State == StampState.DepartmentCensorReject);
                        else
                            query = query.Where(s => s.CurrentState.State == stampState.Value);
                }
            }
            if (information.StampReasons != null && information.StampReasons.Length > 0)
                query = query.Where(s => information.StampReasons.Contains(s.StampReason));

            return query;
        }
        private static IQueryable<StampApplication> getStampApplications(this IQueryable<StampApplication> query, StampQueryInformation information, IQueryable<Stuff> stuffQuery, IQueryable<StuffStamp> typeQuery, User user, StampState? stampState, StampState? stampState2)
        {
            bool hasQueryCondation = false;
            if (information.StampTypes != null && information.StampTypes.Length > 0)
            {
                hasQueryCondation = true;
                typeQuery = typeQuery.Where(st => information.StampTypes.Contains(st.Stamp.Type));
            }
            if (stampState2.HasValue)
            {
                hasQueryCondation = true;
                typeQuery = typeQuery.Where(st => st.Stamp.Owner == user && !st.IsStamped);
            }
            if (hasQueryCondation)
                stuffQuery = typeQuery.Select(st => st.Stuff);
            if (information.StampStuffs != null && information.StampStuffs.Length > 0)
            {
                hasQueryCondation = true;
                stuffQuery = stuffQuery.Where(ss => information.StampStuffs.Contains(ss.StuffType));
            }
            if (hasQueryCondation)
                query = stuffQuery.Select(ss => ss.StampApplication).Distinct();
            return query;
        }
        private static IQueryable<StampApplication> getStampApplications(this IQueryable<StampApplication> query, User user, StampState? stampState, IDatabase database)
        {
            if (user.IsExpert)
                query = query.Where(s => s.Principal.User == user);

            if (stampState != null && stampState == StampState.DepartmentCensorPass)
                return query;

            if (user.UserRole.Type == UserRoleType.Administrator && !user.IsSuper)
            {

                if (user.HasPermission(PermissionItem.StampDepartmentPrincipal, database))
                {
                    var projectTypeIDList = user.GetCanCensorHorizontalProjectTypes(database)
                            .Union(user.GetCanCensorVerticalProjectTypes(database))
                            .Select(pt => pt.ID)
                            .ToList();
                    var stampTypeIDList2 = database.StampApplicationFirstAdmins.Where(c => c.User == user).Select(c => c.StampApplicationType.ID).ToList();
                    var stampTypeIDList = database.StampApplicationSecondAdmins.Where(c => c.User == user).Select(c => c.StampApplicationType.ID).ToList();

                    query = query.Where(s => (s.StampApplicationType != null && stampTypeIDList.Contains(s.StampApplicationTypeID.Value)) || (s.StampApplicationType != null && stampTypeIDList2.Contains(s.StampApplicationTypeID.Value)) || (s.StampStuffFrom != null && projectTypeIDList.Contains(s.StampStuffFrom.Type.Type.ID)));
                    //query = query
                    //    .Where(sa => (sa.StampStuffFrom == null && sa.Administrator == null)
                    //        || sa.Administrator == user.Name || (sa.StampStuffFrom == null && sa.CurrentState.State == StampState.CensorPass)
                    //        || user.GetCanCensorHorizontalProjectTypes(database).Select(id => id.ID).ToList().Contains(sa.StampStuffFrom.Type.Type.ID)
                    //        || user.GetCanCensorVerticalProjectTypes(database).Select(id => id.ID).ToList().Contains(sa.StampStuffFrom.Type.Type.ID)
                    //        );
                }
                else
                {
                    //是否是图章拥有者
                    if (database.Stamps.GetUserStamps(user).Count() == 0)
                        query = query
                              .Where(sa => (sa.StampStuffFrom == null)
                                  || user.GetCanCensorHorizontalProjectTypes(database).Select(id => id.ID).ToList().Contains(sa.StampStuffFrom.Type.Type.ID)
                                  || user.GetCanCensorVerticalProjectTypes(database).Select(id => id.ID).ToList().Contains(sa.StampStuffFrom.Type.Type.ID)
                                  );



                }
            }
            return query;
        }
        private static IQueryable<StampApplication> getStampApplications(this IQueryable<StampApplication> query, ExpertQueryInformation_Basic queryInformation, IDatabase database)
        {
            if (queryInformation.ExpertBirthday != null)
            {
                if (queryInformation.ExpertBirthday.Start.HasValue)
                    query = query.Where(s => s.Principal.Birthday <= queryInformation.ExpertBirthday.Start);

                if (queryInformation.ExpertBirthday.End.HasValue)
                    query = query.Where(s => s.Principal.Birthday >= queryInformation.ExpertBirthday.End);
            }

            if (queryInformation.ExpertCollege != null && queryInformation.ExpertCollege.Length > 0)
                query = query.Where(s => queryInformation.ExpertCollege == s.Principal.College.Name);


            if (queryInformation.IsPostOrAcademyDegree == true && queryInformation.ExpertAcademyDegree != null
                && queryInformation.ExpertAcademyDegree.Length != 0 && queryInformation.ExpertPostLevel != null)
            {
                var qTemporary = query.Where(s => queryInformation.ExpertAcademyDegree.Contains(s.Principal.AcademyDegree));

                if (queryInformation.ExpertPostLevel.Start.HasValue)
                    query = query.Where(s => s.Principal.PostLevel >= queryInformation.ExpertPostLevel.Start.Value);
                if (queryInformation.ExpertPostLevel.End.HasValue)
                    query = query.Where(s => s.Principal.PostLevel <= queryInformation.ExpertPostLevel.End.Value);

                query = query.Union(qTemporary);
            }
            else
            {
                if (queryInformation.ExpertAcademyDegree != null && queryInformation.ExpertAcademyDegree.Length != 0)
                    query = query.Where(s => queryInformation.ExpertAcademyDegree.Contains(s.Principal.AcademyDegree));

                if (queryInformation.ExpertPostLevel != null)
                {
                    if (queryInformation.ExpertPostLevel.Start.HasValue)
                        query = query.Where(s => s.Principal.PostLevel >= queryInformation.ExpertPostLevel.Start.Value);
                    if (queryInformation.ExpertPostLevel.End.HasValue)
                        query = query.Where(s => s.Principal.PostLevel <= queryInformation.ExpertPostLevel.End.Value);
                }
            }
            return query;
        }
        /// <summary>
        /// 取得待审核的文印数
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static int GetWaitingCensorStampApplication(this IQueryable<StampApplication> query, User user, IDatabase database)
        {
            query = query.getStampApplications(user, StampState.Submit, database);
            query = query.Where(s => s.CurrentState.State == StampState.Submit || s.CurrentState.State == StampState.DepartmentCensorReject);
            if (user.IsExpert)
                query = query.Where(s => s.Principal.User == user);

            return query.Count();
        }

        /// <summary>
        /// 取得待部门审核的文印数
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static int GetWaitingDepartmentCensorStampApplication(this IQueryable<StampApplication> query, User user, IDatabase database)
        {
            query = query.getStampApplications(user, StampState.CensorPass, database);
            query = query.Where(s => s.CurrentState.State == StampState.CensorPass);
            if (user.IsExpert)
                query = query.Where(s => s.Principal.User == user);

            return query.Count();
        }
        /// <summary>
        /// 取得盖章事由
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> StampReasons(this IQueryable<StampApplication> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(s => s.StampReason).Where(s => s != null).Distinct().OrderBy(s => s).ToList();
        }
    }
    /// <summary>
    /// 文印申请的权限扩展
    /// </summary>
    public static class StampApplicationPermissionExtension
    {
        /// <summary>
        /// 有察看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            if (user.IsExpert)
                return stampApplication.Principal.User == user;
            return user.HasPermission(PermissionItem.ManageStamp, database);
        }
        /// <summary>
        /// 能够察看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_ShowStamp(stampApplication, database);
        }
        /// <summary>
        /// 有提交权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_SubmitStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.IsExpert && stampApplication.Principal.User == user;
        }
        /// <summary>
        ///  能够提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanSubmitStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_SubmitStamp(stampApplication, database) && stampApplication.CurrentState.State == StampState.UnSubmit;
        }
        /// <summary>
        /// 有撤销提交权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CancleSubmitStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.IsExpert && stampApplication.Principal.User == user;
        }
        /// <summary>
        /// 能够撤销提交
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCancleSubmitStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_CancleSubmitStamp(stampApplication, database) && stampApplication.CurrentState.State == StampState.Submit;
        }
        /// <summary>
        /// 有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditStampApplication(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_ShowStamp(stampApplication, database);
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditStampApplication(this User user, StampApplication stampApplication, IDatabase database)
        {
            if (user.IsExpert)
                return user == stampApplication.Principal.User && (stampApplication.CurrentState.State == StampState.CensorReject || stampApplication.CurrentState.State == StampState.UnSubmit);
            else if (user.HasPermission(PermissionItem.ManageStamp, database))
                return stampApplication.CurrentState.State != StampState.Stamp;

            return false;
        }
        /// <summary>
        /// 能够初审最终通过审核
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorCompleteStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            var firstAdmin = database.StampApplicationFirstAdmins.FirstOrDefault(c => c.StampApplicationType == stampApplication.StampApplicationType && c.User == user);
            return user.HasPermission(PermissionItem.ManageStamp, database) && stampApplication.CurrentState.State == StampState.Submit && firstAdmin != null && stampApplication.StampApplicationType.IsTwiceCancer == false;
        }
        /// <summary>
        /// 有一级审核权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorStamp(this User user, IDatabase database, StampApplication stampApplication)
        {
            var firstAdmin = database.StampApplicationFirstAdmins.FirstOrDefault(c => c.StampApplicationType == stampApplication.StampApplicationType && c.User == user);
            return user.HasPermission(PermissionItem.ManageStamp, database) && firstAdmin != null && stampApplication.StampApplicationType.IsTwiceCancer == true;
        }
        /// <summary>
        /// 能够一级审核审核
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_CensorStamp(database, stampApplication) && (stampApplication.CurrentState.State == StampState.Submit || stampApplication.CurrentState.State == StampState.DepartmentCensorReject);
        }
        /// <summary>
        /// 有初审直接通过权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorCompleteStamp(this User user, IDatabase database, StampApplication stampApplication)
        {
            var firstAdmin = database.StampApplicationFirstAdmins.FirstOrDefault(c => c.StampApplicationType == stampApplication.StampApplicationType && c.User == user);
            return user.HasPermission(PermissionItem.ManageStamp, database) && firstAdmin != null && stampApplication.StampApplicationType.IsTwiceCancer == false;
        }
        /// <summary>
        /// 有某类型的部门审核权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DepartmentCensorStamp(this User user, IDatabase database, StampApplication stampApplication)
        {
            var firstAdmin = database.StampApplicationSecondAdmins.FirstOrDefault(c => c.StampApplicationType == stampApplication.StampApplicationType && c.User == user);
            return user.HasPermission(PermissionItem.StampDepartmentPrincipal, database) && firstAdmin != null && stampApplication.StampApplicationType.IsTwiceCancer == true;
        }
        /// <summary>
        /// 能够部门审核
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDepartmentCensorStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_DepartmentCensorStamp(database, stampApplication) && stampApplication.CurrentState.State == StampState.CensorPass;
        }
        /// <summary>
        /// 有盖章权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Stamp(this User user, IDatabase database)
        {
            return database.Stamps.Select(s => s.Owner).ToList().Contains(user);
        }
        /// <summary>
        /// 能够盖章
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanStamp(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_Stamp(database) && (stampApplication.CurrentState.State == StampState.DepartmentCensorPass || stampApplication.CurrentState.State == StampState.CensorPassComplete);
        }
        /// <summary>
        /// 有管理盖章材料权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ManageStampStuff(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.HasPermission_EditStampApplication(stampApplication, database);
        }
        /// <summary>
        /// 能够管理盖章材料
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stampApplication"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanManageStampStuff(this User user, StampApplication stampApplication, IDatabase database)
        {
            return user.CanEditStampApplication(stampApplication, database);
        }
    }
}
