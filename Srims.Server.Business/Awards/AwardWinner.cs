using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Awards;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Awards
{
    /// <summary>
    /// 获奖人
    /// </summary>
    public partial class AwardWinner : Entity<AwardWinner>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Award.Entity != null, "对应奖励不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Name.Trim()), "获奖人的姓名不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Order.ToString()), "获奖人的位次不能为空");
            validater.AddCondition(database.AwardWinners.Count(p => p.AwardID == _AwardID && p.Order == _Order && p.ID != _ID) == 0, "获奖人的位次不能相同");
        }
        /// <summary>
        /// 保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                base.SaveAction(database);
                this.Award.Save(database);
                ts.Complete();
            }
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
        /// 取得该实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetAwardWinnerDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "AwardID", Title = "对应奖励的ID" });
            list.Add(new LogDescriptionItem { Name = "ExpertID", Title = "对应专家的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "获奖人姓名" });
            list.Add(new LogDescriptionItem { Name = "Order", Title = "获奖人位次" });

            return list.ToArray();
        }
    }

    /// <summary>
    /// 获奖人的业务扩展
    /// </summary>
    public static class AwardWinnerBusinessExtension
    {
    }
    /// <summary>
    /// 获奖人的查询扩展
    /// </summary>
    public static class AwardWinnerQueryExtension
    {
        /// <summary>
        /// 取得奖励的获奖人
        /// </summary>
        /// <param name="query"></param>
        /// <param name="awardID">奖励的ID</param>
        /// <returns></returns>
        public static IList<AwardWinner> GetByAwardID(this IQueryable<AwardWinner> query, int awardID)
        {
            return query.Where(a => a.AwardID == awardID)
                .OrderBy(a => a.Order)
                .ToList();
        }
    }
    /// <summary>
    /// 获奖人的权限扩展
    /// </summary>
    public static class AwardWinnerPermissionExtension
    {

        /// <summary>
        /// 用户是否具有查看奖励成员的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowAwardWinner(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_ShowAward(award, database);
        }
        /// <summary>
        /// 用户是否具有编辑奖励成员的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditAwardWinner(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_EditAward(award, database);
        }
        /// <summary>
        /// 获奖成员是否可被用户查看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowAwardMember(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_ShowAwardWinner(award, database);
        }
        /// <summary>
        /// 获奖成员是否可被用户编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditAwardMember(this User user, Award award, IDatabase database)
        {
            return user.HasPermission_EditAwardWinner(award, database);
        }

    }
}
