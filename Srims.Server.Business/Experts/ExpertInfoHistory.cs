using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家信息历史
    /// </summary>
    public partial class ExpertInfoHistory : Entity<ExpertInfoHistory>
    {
        /// <summary>
        /// 取得该历史信息对应字段的旧值
        /// </summary>
        /// <param name="expert"></param>
        /// <param name="paramName"></param>
        /// <returns></returns>
        public object GetHistoryOldValue(Expert expert, string paramName)
        {
            var expertType = typeof(Expert);
            var property = expertType.GetProperty(paramName);
            object oldValue = property.GetValue(expert, null);

            if (PropertyName.Contains("Code"))
                return oldValue = (oldValue as SubjectSecondLevel) == null ? string.Empty : (oldValue as SubjectSecondLevel).Name;

            return oldValue;
        }
    }

    /// <summary>
    /// 专家信息历史的业务扩展
    /// </summary>
    public static class ExpertInfoHistoryBusinessExtension
    {
        /// <summary>
        /// 作废已有的等待审核的历史信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="expertId"></param>
        /// <param name="propertyName"></param>
        public static void Canceled(this IQueryable<ExpertInfoHistory> query, int expertId, string propertyName)
        {
            ExpertInfoHistory expertInfor = query.SingleOrDefault(ei => ei.ExpertID == expertId && ei.PropertyName == propertyName && ei.CensorState == CensorState.WaitingCensor);
            if (expertInfor != null)
                expertInfor.CensorState = CensorState.Canceled;
        }
        /// <summary>
        /// 提醒管理员有未审核的专家
        /// </summary>
        /// <param name="database"></param>
        public static void SendMailToAdmin(this IQueryable<ExpertInfoHistory> query, IDatabase database)
        {
            var user = database.Users.First(u => u.IsSuper);
            int expertCount = query
                 .Where(p => p.CensorState == CensorState.WaitingCensor)
                 .Count();
            IList<User> admins = database.Users.Where(u => u.UserRole.Type == UserRoleType.Administrator && (!u.IsSuper))
                .ToList();

            string title = string.Format("专家信息编辑提示");
            int count = 0;
            string content = string.Empty;
            string body = string.Empty;

            foreach (var admin in admins)
            {
                if (!admin.HasPermission_EditExpert(database) || expertCount <= 0 || admin.IsLocked(database.UserLockLogs))
                    continue;

                //一分钟发送一封邮件
                Thread.Sleep(1000 * 120);

                content = string.Empty;
                body = string.Format("现有：{0}个专家的信息已经修改，需要进行审核。请及时登录科研管理系统审核专家信息。", expertCount);
                content = EmailContentModel.GetAdminEmailContentModel(body);


                try
                {
                    user.SendMail(admin.Email, title, content, database);
                }
                catch (Exception e)
                {
                    var PrincipalDescriptions = string.Format("自动发送专家信息审核提醒邮件失败，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                    Log.Write("系统", (int)LogType.ExpertCensorRemind, PrincipalDescriptions, "自动发送专家审核提醒邮件失败", database);
                    continue;

                }

                count++;
                var PrincipalDescription = string.Format("自动发送专家信息审核提醒邮件，管理员：{0}，emal:{1}", admin.Name, admin.Email);
                Log.Write("系统", (int)LogType.ExpertCensorRemind, PrincipalDescription, "自动发送专家审核提醒邮件", database);


            }
            Log.Write("系统", (int)LogType.ExpertCensorRemind, "共发送自动提醒邮件" + count + "封", "自动发送专家审核提醒邮件", database);
        }
    }
    /// <summary>
    /// 专家信息历史的查询扩展
    /// </summary>
    public static class ExpertInfoHistoryQueryExtension
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="databse"></param>
        /// <returns></returns>
        public static QueryResult<ExpertInfoHistory> Query(this IQueryable<ExpertInfoHistory> query, ExpertInfoHistoryQueryInformation queryInformation, IDatabase databse)
        {
            query = query.Where(e => e.CensorState == CensorState.WaitingCensor);
            return new QueryResult<ExpertInfoHistory>(query.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), query.Count());
        }
        /// <summary>
        /// 去得未审核的专家信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static int GetUnCensorExpertCount(this IQueryable<ExpertInfoHistory> query)
        {
            return query.Where(q => q.CensorState == CensorState.WaitingCensor).Count();
        }
        /// <summary>
        /// 取得待审核的文档的数目
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static int GetWaitingCensorCount(this IQueryable<ExpertInfoHistory> query)
        {
            return query
            .Where(p => p.CensorState == CensorState.WaitingCensor)
            .Count();

        }
    }
    /// <summary>
    /// 专家信息历史的权限扩展
    /// </summary>
    public static class ExpertInfoHistoryPermissionExtension
    {
        /// <summary>
        /// 是否有察看专家编辑信息的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermisssion_ShowExpertInfoHistory(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ExpertEdit, database);
        }
        /// <summary>
        /// 是否能够察看专家编辑信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="expertInfoHistory"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowExpertInfoHistory(this User user, ExpertInfoHistory expertInfoHistory, IDatabase database)
        {
            return user.HasPermisssion_ShowExpertInfoHistory(database) && expertInfoHistory.CensorState == CensorState.WaitingCensor;
        }
        /// <summary>
        /// 是否有专家编辑信息审核驳回的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermisssion_CensorRejectExpertEdit(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ExpertEdit, database);
        }
        /// <summary>
        ///是否能够审核驳回专家编辑信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="expertInfoHistory"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorRejectExpertEdit(this User user, ExpertInfoHistory expertInfoHistory, IDatabase database)
        {
            return user.HasPermisssion_CensorRejectExpertEdit(database) && expertInfoHistory.CensorState == CensorState.WaitingCensor;
        }
        /// <summary>
        /// 是否有专家编辑信息审核通过的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermisssion_CensorPassExpertEdit(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ExpertEdit, database);
        }
        /// <summary>
        /// 是否能够审核通过专家编辑信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="expertInfoHistory"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanCensorPassExpertEdit(this User user, ExpertInfoHistory expertInfoHistory, IDatabase database)
        {
            return user.HasPermisssion_CensorPassExpertEdit(database) && expertInfoHistory.CensorState == CensorState.WaitingCensor;
        }
    }
}
