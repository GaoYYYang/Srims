using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading;

using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;

using Srims.Server.Business.Common;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利发明人
    /// </summary>
    public partial class PatentInventer : Entity<PatentInventer>
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
        /// 取得该实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetPatentInventerDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "PatentID", Title = "对应专利的ID" });
            list.Add(new LogDescriptionItem { Name = "ExpertID", Title = "对应专家的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "发明者姓名" });
            list.Add(new LogDescriptionItem { Name = "Order", Title = "发明者位次" });
            list.Add(new LogDescriptionItem { Name = "IsPrincipal", Title = "是否负责人" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Patent.Entity != null, "对应专利不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Name.Trim()), "发明人的姓名不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_IsPrincipal.ToString()), "发明人的位次不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Order.ToString()), "发明人的位次不能为空");
            validater.AddCondition(database.PatentInventers.Count(p => p.PatentID == _PatentID && p.Order == _Order && p.ID != _ID) == 0, "发明人的位次不能相同");
        }
    }

    /// <summary>
    /// 专利发明人的业务扩展
    /// </summary>
    public static class PatentInventerBusinessExtension
    {
        /// <summary>
        /// 专利费缴纳提醒功能
        /// </summary>
        /// <param name="query"></param>
        /// <param name="database"></param>
        public static void PayPatentFeeRemind(this IQueryable<PatentInventer> query, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            int countMail = 0;
            int countMessage = 0;

            var patentInventerNeedSendEmailList = query.Where(q => q.Patent.LawState == PatentLawState.Accredit && q.IsPrincipal).ToList();
            foreach (PatentInventer patentInventer in patentInventerNeedSendEmailList)
            {
                if (patentInventer.ExpertID.HasValue && patentInventer.Expert.IsOnjob == true && InTimeSpan(patentInventer.Patent.LawStateTime))
                {
                    User user = database.Users.FirstOrDefault(u => u.IsSuper == true);
                    sendMessageToPatentInventer(patentInventer, database, user);
                    if (!string.IsNullOrEmpty(patentInventer.Expert.Email))
                    {
                        //一分钟发送一封邮件
                        Thread.Sleep(1000 * 60);
                        sendEmailToPatentInventer(patentInventer, database, user);
                        countMail++;
                        var description = "自动发送专利费缴纳提醒邮件，专利名称为：" + patentInventer.Patent.Name + "收信人为：" + patentInventer.Name + "邮箱地址为：" + patentInventer.Expert.Email;
                        Log.Write("系统", (int)LogType.PatentFeeAutoRemind, description, "自动发送专利费缴纳提醒邮件", database);
                    }
                    else
                    {
                        foreach (var administrator in database.Users.GetAllAdministrators())
                            if (administrator.HasPermission_EditPatent(database) && !administrator.IsSuper)
                            {
                                //一分钟发送一封邮件
                                Thread.Sleep(1000 * 120);
                                sendMessageToPatentAdministrator(patentInventer, database, user, administrator);
                            }

                        countMessage++;
                        Log.Write("系统", (int)LogType.PatentFeeAutoRemind, string.Format("自动发送专利费缴纳提醒短信息，专利名称为：{0}，收信人为：专利管理员", patentInventer.Patent.Name), "自动发送短信息", database);
                    }
                }
            }
            Log.Write("系统", (int)LogType.PatentFeeAutoRemind, string.Format("成功发送{0}条邮件", countMail), "自动发送专利费缴纳提醒邮件成功", database);
            Log.Write("系统", (int)LogType.PatentFeeAutoRemind, string.Format("成功发送{0}条短信息", countMessage), "自动发送专利费缴纳提醒短信息成功", database);
        }

        private static void sendEmailToPatentInventer(PatentInventer patentInventer, IDatabase database, User user)
        {
            string receiveMailAddress = patentInventer.Expert.Email;

            string mailSubject = string.Format("专利费缴纳通知（专利：{0}）", patentInventer.Patent.Name);
            string mailBody = string.Format(@"您的专利{0}，需要在{1}前缴纳专利费。如果在规定的日期前没有缴纳，您将缴纳滞纳金。如果您已经缴纳了此专利的专利费，请您忽略这封邮件。", patentInventer.Patent.Name, DateTime.Now.Year.ToString() + "年" + patentInventer.Patent.ApplicationDateTime.Value.Month.ToString() + "月" + patentInventer.Patent.ApplicationDateTime.Value.Day.ToString() + "日");

            string title = EmailContentModel.GetExpertEmailContentModel(patentInventer.Name, mailBody);
            user.SendMail(receiveMailAddress, mailSubject, title, database);
        }

        private static void sendMessageToPatentInventer(PatentInventer patentInventer, IDatabase database, User user)
        {
            string title = string.Format("专利费缴纳通知（专利：{0}）", patentInventer.Patent.Name);
            var content = string.Format(@"您的专利{0}，需要在{1}前缴纳专利费。如果在规定的日期前没有缴纳，您将缴纳滞纳金。如果您已经缴纳了此专利的专利费，请您忽略这条短信息。", patentInventer.Patent.Name, DateTime.Now.Year.ToString() + "年" + patentInventer.Patent.ApplicationDateTime.Value.Month.ToString() + "月" + patentInventer.Patent.ApplicationDateTime.Value.Day.ToString() + "日");

            Message.SendMessage(title, content, user, patentInventer.Expert.User, database);
        }

        private static void sendMessageToPatentAdministrator(PatentInventer patentInventer, IDatabase database, User user, User admin)
        {
            string mailSubject = string.Format("专利费缴纳通知（专利：{0}）", patentInventer.Patent.Name);
            var content = string.Format(@"{0}老师的专利{1}，需要在{2}前缴纳专利费。但是此专家没有邮箱，故通知您。如果此专家已经缴纳了此专利的专利费，请您忽略这条信息。", patentInventer.Name, patentInventer.Patent.Name, DateTime.Now.Year.ToString() + "年" + patentInventer.Patent.ApplicationDateTime.Value.Month.ToString() + "月" + patentInventer.Patent.ApplicationDateTime.Value.Day.ToString() + "日");

            Message.SendMessage(content, content, user, admin, database);
        }
        private static bool InTimeSpan(DateTime? dateTime)
        {
            int todayOfYear;
            int dateTimeOfYear;

            if (dateTime.HasValue)
            {
                todayOfYear = DateTime.Now.Date.DayOfYear;
                dateTimeOfYear = dateTime.Value.DayOfYear;
                if (todayOfYear == (dateTimeOfYear - 30) || todayOfYear == (dateTimeOfYear - 15) || todayOfYear == dateTimeOfYear || todayOfYear == (dateTimeOfYear + 15) || todayOfYear == (dateTimeOfYear + 30))
                    return true;
                return false;
            }
            return false;
        }
    }
    /// <summary>
    /// 专利发明人的查询扩展
    /// </summary>
    public static class PatentInventerQueryExtension
    {
        /// <summary>
        /// 取得专利的发明者
        /// </summary>
        /// <param name="query"></param>
        /// <param name="patentID"></param>
        /// <returns></returns>
        public static IList<PatentInventer> GetByPatentID(this IQueryable<PatentInventer> query, int patentID)
        {
            return query.Where(p => p.PatentID == patentID)
                .OrderBy(p => p.Order)
                .ToList();
        }
    }
    /// <summary>
    /// 专利发明人的权限扩展
    /// </summary>
    public static class PatentInventerPermissionExtension
    {
        /// <summary>
        /// 用户是否有权限查看专利的发明者
        /// </summary>
        /// <param name="user"></param>
        /// <param name="patent"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowPatentInventer(this User user, Patent patent, IDatabase database)
        {
            return user.HasPermission_ShowPatent(patent, database);
        }
        /// <summary>
        /// 用户是否有编辑专利发明人的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPatentInventer(this User user, IDatabase database)
        {
            return user.HasPermission_EditPatent(database);
        }
        /// <summary>
        /// 能否查看专利发明人
        /// </summary>
        /// <param name="user"></param>
        /// <param name="patent"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowPatentInventer(this User user, Patent patent, IDatabase database)
        {
            return user.HasPermission_ShowPatentInventer(patent, database);
        }
        /// <summary>
        /// 能否编辑专利发明人
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditPatentInventer(this User user, IDatabase database)
        {
            return user.HasPermission_EditPatentInventer(database);
        }
    }
}
