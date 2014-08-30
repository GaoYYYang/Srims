using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 通知
    /// </summary>
    public partial class Announcement : Entity<Announcement>
    {
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
        public static LogDescriptionItem[] GetAnnouncementDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "Title", Title = "标题" });
            list.Add(new LogDescriptionItem { Name = "DateTime", Title = "时间" });
            list.Add(new LogDescriptionItem { Name = "UserName", Title = "发布人" });
            list.Add(new LogDescriptionItem { Name = "Content", Title = "内容" });
            list.Add(new LogDescriptionItem { Name = "State", Title = "状态" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater">验证器</param>
        /// <param name="database">数据库</param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Title), "通知标题不能为空！");
            validater.AddCondition(!string.IsNullOrEmpty(_Content), "通知内容不能为空！");
        }
        /// <summary>
        /// 将通知置顶
        /// </summary>
        /// <param name="database"></param>
        public void SetTop(IDatabase database)
        {
            State = AnnouncementState.Top;
            Save(database);
        }
        /// <summary>
        /// 取消通知置顶
        /// </summary>
        /// <param name="database"></param>
        public void CancelTop(IDatabase database)
        {
            State = AnnouncementState.Normal;
            Save(database);
        }
        /// <summary>
        /// 过期
        /// </summary>
        /// <param name="database"></param>
        public void SetOverdue(IDatabase database)
        {
            State = AnnouncementState.Overdue;
            Save(database);
        }
        /// <summary>
        /// 取消过期
        /// </summary>
        /// <param name="database"></param>
        public void CancelOverdue(IDatabase database)
        {
            State = AnnouncementState.Normal;
            Save(database);
        }
    }

    /// <summary>
    /// 通知的业务扩展
    /// </summary>
    public static class AnnouncementBusinessExtension
    {
    }
    /// <summary>
    /// 通知的查询扩展
    /// </summary>
    public static class AnnouncementQueryExtension
    {
        /// <summary>
        /// 取得当前有效地通知
        /// </summary>
        /// <param name="query">通知查询</param>
        /// <returns></returns>
        public static List<Announcement> GetAvailable(this IQueryable<Announcement> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query
                .Where(a => a.State == AnnouncementState.Normal || a.State == AnnouncementState.Top)
                .OrderByDescending(a => a.State)
                .ThenByDescending(a => a.DateTime)
                .ToList();
        }
        /// <summary>
        /// 取得通知查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<Announcement> Query(this IQueryable<Announcement> query, AnnouncementQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            //查询
            var q = query.GetAnnouncements(queryInformation);

            //排序
            q = sortAnnouncements(queryInformation, q);

            return new QueryResult<Announcement>(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                q.Count());
        }

        private static IQueryable<Announcement> sortAnnouncements(AnnouncementQueryInformation queryInformation, IQueryable<Announcement> announcemnt)
        {
            if (queryInformation.SortInfo == null)
                announcemnt = announcemnt.OrderByDescending(a => a.DateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("DateTime"))
                announcemnt = queryInformation.SortInfo.Direction == SortDirection.ASC
                    ? announcemnt.OrderBy(a => a.DateTime)
                    : announcemnt.OrderByDescending(a => a.DateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("UserName"))
                announcemnt = queryInformation.SortInfo.Direction == SortDirection.ASC
                    ? announcemnt.OrderBy(a => a.UserName)
                    : announcemnt.OrderByDescending(a => a.UserName);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("State"))
                announcemnt = queryInformation.SortInfo.Direction == SortDirection.ASC
                    ? announcemnt.OrderBy(a => a.State)
                    : announcemnt.OrderByDescending(a => a.State);

            return announcemnt;
        }
        /// <summary>
        /// 取得通知
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Announcement> GetAnnouncements(this IQueryable<Announcement> query, AnnouncementQueryInformation queryInformation)
        {
            var q = query;

            if (queryInformation.UserName != null)
                queryInformation.UserName = queryInformation.UserName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.UserName))
                q = q.Where(a => a.UserName == queryInformation.UserName);

            if (queryInformation.DateTime != null)
            {
                if (queryInformation.DateTime.Start.HasValue)
                    q = q.Where(a => a.DateTime.Date >= queryInformation.DateTime.Start.Value);
                if (queryInformation.DateTime.End.HasValue)
                    q = q.Where(a => a.DateTime.Date <= queryInformation.DateTime.End.Value);
            }

            if (queryInformation.AnnouncementStates != null && queryInformation.AnnouncementStates.Length != 0)
                q = q.Where(a => queryInformation.AnnouncementStates.Contains(a.State));

            return q;
        }
    }
    /// <summary>
    /// 通知的权限扩展
    /// </summary>
    public static class AnnouncementPermissionExtension
    {
        /// <summary>
        /// 用户是否具有编辑通知的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditAnnouncement(this User user, IDatabase database)
        {
            if (user.IsSuper)
                return true;
            if (user.IsExpert)
                return false;

            return user.HasPermission(PermissionItem.ManageAnnouncement, database);
        }
        /// <summary>
        /// 用户能否编辑通知
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditAnnouncement(this User user, IDatabase database)
        {
            return user.HasPermission_EditAnnouncement(database);
        }
        /// <summary>
        /// 用户是否具有删除通知的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteAnnouncement(this User user, IDatabase database)
        {
            return user.HasPermission_EditAnnouncement(database);
        }
        /// <summary>
        /// 用户能否删除通知
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDeleteAnnouncement(this User user, IDatabase database)
        {
            return user.CanEditAnnouncement(database);
        }
    }
}
