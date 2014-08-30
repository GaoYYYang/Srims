using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Common;
using System.Transactions;
using Srims.Server.Business.Users;
using System.Collections;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 盖章材料
    /// </summary>
    public partial class Stuff : Entity<Stuff>
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
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "StampApplicationID", Title = "对应的文印的ID" });
            list.Add(new LogDescriptionItem { Name = "StuffName", Title = "材料名称" });
            list.Add(new LogDescriptionItem { Name = "StuffType", Title = "材料类型" });

            return list.ToArray();
        }
        /// <summary>
        /// 取得此文件的所有盖章类型(string)
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<string> GetAllStampTypes(IQueryable<StuffStamp> query)
        {
            return query.Where(st => st.StuffID == _ID).Select(st => st.Stamp.Type).Distinct().ToList();
        }
        /// <summary>
        /// 取得此文件的所有盖章类型及数量(type+number)
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<string> GetAllStampTypeAndNumbers(IQueryable<StuffStamp> query)
        {
            List<StuffStamp> stuffStamps = query.GetStuffStampsByStuff(_ID).ToList();
            List<string> typeAndNumbers = new List<string> { };
            foreach (var stuffStamp in stuffStamps)
                typeAndNumbers.Add(stuffStamp.Stamp.Type + ("(" + stuffStamp.Pagination.ToString() + "页," + stuffStamp.Number.ToString() + "份" + ")"));
            return typeAndNumbers;
        }
        /// <summary>
        /// 取得此文件的所有盖章类型(entity)
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Stamp> GetAllStamps(IQueryable<StuffStamp> query)
        {
            return query.Where(st => st.StuffID == _ID).Select(st => st.Stamp).Distinct().ToList();
        }
        /// <summary>
        /// 盖我负责的章
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        public void StampMyStamp(IQueryable<StuffStamp> query, IDatabase database, User user)
        {
            IList<StuffStamp> myStampStuff = query.Where(st => st.StuffID == _ID && st.Stamp.Owner == user).ToList();
            foreach (var stuffStamp in myStampStuff)
            {
                stuffStamp.IsStamped = true;
                stuffStamp.Save(database);
            }
        }
        /// <summary>
        /// 此文件是否盖章完毕
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public bool AllIsStamped(IQueryable<StuffStamp> query, IDatabase database)
        {
            bool isAllStamped = true;
            IList<StuffStamp> myStampStuff = query.Where(st => st.StuffID == _ID).ToList();
            foreach (var stuffStamp in myStampStuff)
            {
                if (!stuffStamp.IsStamped)
                {
                    isAllStamped = false;
                    break;
                }
            }
            return isAllStamped;
        }
        /// <summary>
        /// 取得某一章型的数量
        /// </summary>
        /// <param name="query"></param>
        /// <param name="stampId"></param>
        /// <returns></returns>
        public int GetStampNumber(IQueryable<StuffStamp> query, int stampId)
        {
            StuffStamp stuffStamp = query.SingleOrDefault(ss => ss.StampID == stampId && ss.StuffID == _ID);
            if (stuffStamp != null)
                return stuffStamp.Number;
            return 0;
        }

        /// <summary>
        /// 取得某一章型的盖章页
        /// </summary>
        public string GetStampPagination(IQueryable<StuffStamp> query, int stampId)
        {
            StuffStamp stuffStamp = query.SingleOrDefault(ss => ss.StampID == stampId && ss.StuffID == _ID);
            if (stuffStamp != null)
                return stuffStamp.Pagination;

            return string.Empty;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_StuffType), "材料类型不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_StuffName), "材料名称不能为空");
            validater.AddCondition(_StampApplication.Entity != null, "对应文印不能为空");
        }
        /// <summary>
        /// 删除操作
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (var stampType in database.StuffStamps.GetStuffStampsByStuff(_ID))
                    stampType.Delete(database);

                base.DeleteAction(database);
                ts.Complete();
            }
        }
    }

    /// <summary>
    /// 盖章材料的业务扩展
    /// </summary>
    public static class StuffBusinessExtension
    {
    }
    /// <summary>
    /// 盖章材料的查询扩展
    /// </summary>
    public static class StuffQueryExtension
    {
        /// <summary>
        /// 取得某一文印的盖章材料
        /// </summary>
        /// <param name="query"></param>
        /// <param name="stampApplicationID"></param>
        /// <returns></returns>
        public static IList<Stuff> GetStampStuffs(this IQueryable<Stuff> query, int stampApplicationID)
        {
            return query.Where(ss => ss.StampApplicationID == stampApplicationID).ToList();
        }
        /// <summary>
        /// 取得材料类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetStuffType(this IQueryable<Stuff> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Select(ss => ss.StuffType).Where(ss => ss != null).Distinct().OrderBy(ss => ss).ToList();
        }
        /// <summary>
        /// 根据guid取得盖章材料
        /// </summary>
        /// <param name="query"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static Stuff GetByGuid(this IQueryable<Stuff> query, Guid guid)
        {
            return query
                .SingleOrDefault(q => q.StuffDocument == guid);
        }
    }
    /// <summary>
    /// 盖章材料的权限扩展
    /// </summary>
    public static class StuffPermissionExtension
    {
        /// <summary>
        /// 有编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stuff"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool Haspermission_EditStampStuff(this User user, Stuff stuff, IDatabase database)
        {
            var stamp = stuff.StampApplication;
            if (user.IsExpert)
                return stamp.Principal.User == user;
            return user.HasPermission(PermissionItem.ManageStamp, database);
        }
        /// <summary>
        /// 能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stuff"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditStampStuff(this User user, Stuff stuff, IDatabase database)
        {
            var stamp = stuff.StampApplication;
            if (user.IsExpert)
                return user == stamp.Principal.User && stamp.CurrentState.State != StampState.Stamp && stamp.CurrentState.State != StampState.CensorPass;
            else if (user.HasPermission(PermissionItem.ManageStamp, database))
                return stamp.CurrentState.State != StampState.Stamp;

            return false;
        }
        /// <summary>
        /// 有管理盖章类型权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stuff"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ManageStampType(this User user, Stuff stuff, IDatabase database)
        {
            return user.Haspermission_EditStampStuff(stuff, database);
        }
        /// <summary>
        /// 能够管理盖章类型
        /// </summary>
        /// <param name="user"></param>
        /// <param name="stuff"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanManageStampType(this User user, Stuff stuff, IDatabase database)
        {
            return user.CanEditStampStuff(stuff, database);
        }
    }
}
