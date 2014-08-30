using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Awards;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 奖励文档
    /// </summary>
    public partial class AwardDocument : Entity<AwardDocument>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "AwardID", Title = "对应奖励的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "文档名称" });
            list.Add(new LogDescriptionItem { Name = "AuthorID", Title = "提交人的ID" });
            list.Add(new LogDescriptionItem { Name = "SubmitDateTime", Title = "提交日期" });
            list.Add(new LogDescriptionItem { Name = "CensorDateTime", Title = "审核日期" });
            list.Add(new LogDescriptionItem { Name = "State", Title = "状态" });
            list.Add(new LogDescriptionItem { Name = "Censor", Title = "审核人" });

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
        /// 上传奖励文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Upload(User user, IDatabase database)
        {
            if (!user.CanUploadAwardDocument(this.Award, database))
                throw new HasNoPermissionException();

            this.Author = user;
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
        }
        /// <summary>
        /// 审核通过
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorPass(User user, IDatabase database)
        {
            if (!user.CanCensorPass(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(CensorState.Passed, user, database);
            sendMessageToAwardWinner(user, "审核通过", "审核通过", database);
        }
        /// <summary>
        /// 审核驳回
        /// </summary>
        /// <param name="remark"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void CensorReject(string remark, User user, IDatabase database)
        {
            if (!user.CanCensorReject(this, database))
                throw new HasNoPermissionException();

            saveForChangeState(CensorState.Reject, user, database);
            sendMessageToAwardWinner(user, "审核驳回", "审核驳回。驳回理由：" + remark, database);
        }
        private void saveForChangeState(CensorState censorState, User user, IDatabase database)
        {
            this.Censor = user.Name;
            this.CensorDateTime = DateTime.Now;
            this.State = censorState;

            this.Save(database);
        }
        private void sendMessageToAwardWinner(User sender, string action, string description, IDatabase database)
        {
            var title = String.Format("{0}奖励文档：{1}（奖励：{2}）", action, _Name, Award.Name);

            string content = string.Empty;
            content = String.Format(@"您提交的奖励：{0}的文档：{1}，已由管理员{2}，于{3}，{4}。{5}。", Award.Name, _Name, sender.Name, DateTime.Now, description, getHyperLinkString("点击查看奖励文档"));

            Message.SendMessage(title, content, sender, this.Author, database);
        }
        /// <summary>
        /// 取得超链接
        /// </summary>
        /// <returns></returns>
        private string getHyperLinkString(string literal)
        {
            return string.Format("<a href='#' onclick='Srims.MessageAction.showAwardDocument({0});return false;'>{1}</a>", this.Award.ID, literal);
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Award.Entity != null, "奖励名称不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "奖励文档名称不能为空");
        }
    }

    /// <summary>
    /// 奖励文档的业务扩展
    /// </summary>
    public static class AwardDocumentBusinessExtension
    {
    }
    /// <summary>
    /// 奖励文档的查询扩展
    /// </summary>
    public static class AwardDocumentQueryExtension
    {
        /// <summary>
        /// 根据奖励取得奖励文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="awardId"></param>
        public static IList<AwardDocument> GetByAward(this IQueryable<AwardDocument> query, int awardId)
        {
            return query
                .Where(q => q.AwardID == awardId)
                .ToList();
        }
        /// <summary>
        /// 根据guid取得奖励文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static AwardDocument GetByGuid(this IQueryable<AwardDocument> query, Guid guid)
        {
            return query
                .Single(q => q.Resource == guid);
        }
        /// <summary>
        /// 取得待审核的文档的数目
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static int GetWaitingCensorCount(this IQueryable<AwardDocument> query)
        {
            return query
                .Count(q => q.State == CensorState.WaitingCensor);
        }
        /// <summary>
        /// 取得待审核的奖励列表
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<AwardDocument> GetWaitingCensor(this IQueryable<AwardDocument> query)
        {
            return query
                .Where(q => q.State == CensorState.WaitingCensor)
                .ToList();
        }
        /// <summary>
        /// 取得用户提交的奖励文档
        /// </summary>
        /// <param name="query"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IList<AwardDocument> GetUserAwardDocuments(this IQueryable<AwardDocument> query, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.Author == user).ToList();
        }
    }
    /// <summary>
    /// 奖励文档的权限扩展
    /// </summary>
    public static class AwardDocumentPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有删除奖励文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="awardDocument"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, AwardDocument awardDocument, IDatabase database)
        {
            return user.HasPermission_UploadAwardDocument(awardDocument.Award, database);
        }
        /// <summary>
        /// 判断用户是否能够删除奖励文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="awardDocument"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, AwardDocument awardDocument, IDatabase database)
        {
            if (!user.HasPermission_Delete(awardDocument, database))
                return false;

            if (user.IsExpert)
                return awardDocument.State != CensorState.Passed;

            return true;
        }
        /// <summary>
        /// 判断换用户是否具有审核通过奖励文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="awardDocument"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorPass(this User user, AwardDocument awardDocument, IDatabase database)
        {
            if (awardDocument.Award.SubjectNature == SubjectNature.Science)
                return user.HasPermission(PermissionItem.ManageScienceAward, database);

            return user.HasPermission(PermissionItem.ManageLiteralAward, database);

        }
        /// <summary>
        /// 判断用户是否能够审核通过奖励文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="awardDocument"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorPass(this User user, AwardDocument awardDocument, IDatabase database)
        {
            if (!user.HasPermission_CensorPass(awardDocument, database))
                return false;

            return awardDocument.State == CensorState.WaitingCensor;
        }
        /// <summary>
        /// 判断用户是否具有审核驳回奖励文档的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="awardDocument"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_CensorReject(this User user, AwardDocument awardDocument, IDatabase database)
        {
            if (awardDocument.Award.SubjectNature == SubjectNature.Science)
                return user.HasPermission(PermissionItem.ManageScienceAward, database);

            return user.HasPermission(PermissionItem.ManageLiteralAward, database);
        }
        /// <summary>
        /// 判断用户是否能够审核驳回奖励文档
        /// </summary>
        /// <param name="user"></param>
        /// <param name="awardDocument"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorReject(this User user, AwardDocument awardDocument, IDatabase database)
        {
            if (!user.HasPermission_CensorReject(awardDocument, database))
                return false;

            return awardDocument.State == CensorState.WaitingCensor;
        }
    }
}
