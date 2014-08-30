using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using Srims.Server.Business.Users;
using Srims.Server.Business.Awards;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 日志
    /// </summary>
    public partial class Log : Entity<Log>
    {
        ///// <summary>
        ///// 取得自动运行的LogType
        ///// </summary>
        ///// <param name="database"></param>
        ///// <returns></returns>
        //public string GetAutoRunLogType(IDatabase database)
        //{
        //    var LogTypeArray = GetLogArray(database);
        //    string autoRenLogTypeString = string.Empty;

        //    for (int i = 0; i < LogTypeArray.Length; i++)
        //        if (LogTypeArray[i] == "1")
        //            autoRenLogTypeString += ((LogType.LogAward)Enum.Parse(typeof(LogType.LogAward), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogBase)Enum.Parse(typeof(LogType.LogBase), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogDocumet)Enum.Parse(typeof(LogType.LogDocumet), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogFund)Enum.Parse(typeof(LogType.LogFund), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogPaper)Enum.Parse(typeof(LogType.LogPaper), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogPatent)Enum.Parse(typeof(LogType.LogPatent), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogProject)Enum.Parse(typeof(LogType.LogProject), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogProjectType)Enum.Parse(typeof(LogType.LogProjectType), (i + 1).ToString())).ToString() + ","
        //                + ((LogType.LogUser)Enum.Parse(typeof(LogType.LogUser), (i + 1).ToString())).ToString() + ",";
        //    return autoRenLogTypeString;
        //}
        /// <summary>
        /// 判断日志是否需要记录
        /// </summary>
        /// <param name="logTypeValue">日志枚举值</param>
        /// <param name="database">数据库</param>
        /// <returns></returns>
        public bool NeedWrite(int logTypeValue, IDatabase database)
        {
            return needWrite(logTypeValue, database);
        }
        private bool needWrite(int logTypeValue, IDatabase database)
        {
            return getLogTypeValue(logTypeValue, database);
        }
        private bool getLogTypeValue(int logTypeValue, IDatabase database)
        {
            string[] logTypeArray = GetLogArray(database);
            if (logTypeValue > logTypeArray.Length)
                return false;

            if (logTypeArray[logTypeValue - 1] == "1")
                return true;

            return false;
        }
        /// <summary>
        /// 设置日志可以记录
        /// </summary>
        /// <param name="logTypeValue">日志枚举值</param>
        /// <param name="database">数据库</param>
        public void SetIsNeedWrite(int logTypeValue, IDatabase database)
        {
            setLogTypeValue(logTypeValue, database, true);
        }
        /// <summary>
        /// 清除日志可记录
        /// </summary>
        /// <param name="logTypeValue">日志枚举值</param>
        /// <param name="database">数据库</param>
        public void ClearNeedWrite(int logTypeValue, IDatabase database)
        {
            setLogTypeValue(logTypeValue, database, false);
        }

        private void setLogTypeValue(int logTypeValue, IDatabase database, bool needWrite)
        {
            string[] logTypeArray = GetLogArray(database);
            string[] newLogTypeArray = new string[] { };
            string logType;

            if (logTypeValue > logTypeArray.Length)
            {
                List<string> list = new List<string>();
                for (int i = 0; i < logTypeValue; i++)
                    list.Add("0");
                newLogTypeArray = list.ToArray();

                if (logTypeArray.Length != 0)
                    logTypeArray.CopyTo(newLogTypeArray, 0);

                logTypeArray = newLogTypeArray;
            }
            logTypeArray[logTypeValue - 1] = Convert.ToInt32(needWrite).ToString();
            logType = logTypeArray.ToString(",");

            saveLogType(database, logType);
        }
        private static void saveLogType(IDatabase database, string logType)
        {
            var systemSetting = database.SystemSettings.GetSystemSetting();
            systemSetting.LogType = logType;
            systemSetting.Save(database);
        }

        private string[] GetLogArray(IDatabase database)
        {
            string logString = database.SystemSettings.GetSystemSetting().LogType;
            return string.IsNullOrEmpty(logString) ? new string[] { } : logString.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        }
        /// <summary>
        /// 日志写入
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="logTypeValue"></param>
        /// <param name="description"></param>
        /// <param name="userIP"></param>
        /// <param name="action"></param>
        /// <param name="database"></param>
        public static void Write(string userName, int logTypeValue, string description, string userIP, string action, IDatabase database)
        {
            Log log = new Log();
            if (log.NeedWrite(logTypeValue, database))
            {
                log.User = userName;
                log.UserIP = string.IsNullOrEmpty(userIP) ? string.Empty : userIP;
                log.Description = description;
                log.DateTime = DateTime.Now;
                log.Action = action;
                log.Save(database);
            }
        }
        /// <summary>
        /// 日志写入
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="logTypeValue"></param>
        /// <param name="description"></param>
        /// <param name="action"></param>
        /// <param name="database"></param>
        public static void Write(string userName, int logTypeValue, string description, string action, IDatabase database)
        {
            Log log = new Log();
            if (log.NeedWrite(logTypeValue, database))
            {
                log.User = userName;
                log.UserIP = "";
                log.Description = description;
                log.DateTime = DateTime.Now;
                log.Action = action;
                log.Save(database);
            }
        }

        /// <summary>
        ///  取得日志描述
        /// </summary>
        /// <param name="oldEntity"></param>
        /// <param name="newEntity"></param>
        /// <param name="descriptionItems"></param>
        /// <param name="isNewAdd"></param>
        /// <returns></returns>
        public static string GetEditOperationDescription(object oldEntity, object newEntity, LogDescriptionItem[] descriptionItems, bool isNewAdd)
        {
            var stringBuilder = new StringBuilder();
            if (isNewAdd)
                writeNewAddDescription(stringBuilder, descriptionItems, oldEntity, newEntity);
            else
                writeEditDescription(stringBuilder, descriptionItems, oldEntity, newEntity);
            return stringBuilder.ToString();
        }
        /// <summary>
        /// 生成编辑日志记录文本
        /// </summary>
        /// <param name="stringBuilder"></param>
        /// <param name="descriptionItems"></param>
        /// <param name="oldEntity"></param>
        /// <param name="newEntity"></param>
        private static void writeEditDescription(StringBuilder stringBuilder, LogDescriptionItem[] descriptionItems, object oldEntity, object newEntity)
        {
            var eneityType = oldEntity.GetType();
            foreach (var item in descriptionItems)
            {
                var property = eneityType.GetProperty(item.Name);
                object oldValue = property.GetValue(oldEntity, null);
                object newValue = property.GetValue(newEntity, null);

                if (property.GetType() != typeof(string))
                    stringBuilder = getOtherTypeEditBuilder(oldValue, newValue, item, stringBuilder);
                else
                    stringBuilder = getStringTypeEditBuilder(oldValue, newValue, item, stringBuilder);
            }
        }
        private static StringBuilder getStringTypeEditBuilder(object oldValue, object newValue, LogDescriptionItem item, StringBuilder stringBuilder)
        {
            string oldString = (string)oldValue;
            string newString = (string)newValue;

            if (string.IsNullOrEmpty(oldString) && string.IsNullOrEmpty(newString))
            { }
            else if (string.IsNullOrEmpty(oldString) && !string.IsNullOrEmpty(newString))
                stringBuilder.AppendFormat("  {0}：由空改为＂{1}＂\n", item.Title, newValue.ToString());
            else if (!string.IsNullOrEmpty(oldString) && string.IsNullOrEmpty(newString))
                stringBuilder.AppendFormat("  {0}：由＂{1}＂改为空 \n", item.Title, oldValue.ToString());
            else if (!string.IsNullOrEmpty(oldString) && !string.IsNullOrEmpty(newString) && !oldValue.Equals(newValue))
                stringBuilder.AppendFormat("  {0}：由＂{1}＂改为＂{2}＂ \n", item.Title, oldValue, newValue);

            return stringBuilder;
        }
        private static StringBuilder getOtherTypeEditBuilder(object oldValue, object newValue, LogDescriptionItem item, StringBuilder stringBuilder)
        {
            if (oldValue == null && newValue != null)
                stringBuilder.AppendFormat("  {0}：由空改为＂{1}＂\n", item.Title, newValue.ToString());
            else if (oldValue != null && newValue == null)
                stringBuilder.AppendFormat("  {0}：由＂{1}＂改为空 \n", item.Title, oldValue.ToString());
            else if (oldValue != null && newValue != null && !oldValue.Equals(newValue))
                stringBuilder.AppendFormat("  {0}：由＂{1}＂改为＂{2}＂ \n", item.Title, oldValue, newValue);
            return stringBuilder;

        }
        /// <summary>
        /// 生成新建或添加日志记录文本
        /// </summary>
        /// <param name="stringBuilder"></param>
        /// <param name="descriptionItems"></param>
        /// <param name="oldEntity"></param>
        /// <param name="newEntity"></param>
        private static void writeNewAddDescription(StringBuilder stringBuilder, LogDescriptionItem[] descriptionItems, object oldEntity, object newEntity)
        {
            var eneityType = oldEntity.GetType();
            foreach (var item in descriptionItems)
            {
                var property = eneityType.GetProperty(item.Name);
                object oldValue = property.GetValue(oldEntity, null);
                object newValue = property.GetValue(newEntity, null);
                if (property.GetType() != typeof(string))
                    stringBuilder = getOtherTypeNewBuilder(oldValue, newValue, item, stringBuilder);
                else
                    stringBuilder = getStringTypeNewBuilder(oldValue, newValue, item, stringBuilder);
            }
        }
        private static StringBuilder getStringTypeNewBuilder(object oldValue, object newValue, LogDescriptionItem item, StringBuilder stringBuilder)
        {
            string oldString = (string)oldValue;
            string newString = (string)newValue;

            //if (string.IsNullOrEmpty(oldString) && string.IsNullOrEmpty(newString))
            //{ }
            if (string.IsNullOrEmpty(oldString) && !string.IsNullOrEmpty(newString))
                stringBuilder.AppendFormat("  {0}：＂{1}＂\n", item.Title, newValue.ToString());

            return stringBuilder;
        }
        private static StringBuilder getOtherTypeNewBuilder(object oldValue, object newValue, LogDescriptionItem item, StringBuilder stringBuilder)
        {
            // if (oldValue == null && newValue == null)
            if (newValue != null && oldValue != newValue)
                stringBuilder.AppendFormat("  {0}：＂{1}＂\n", item.Title, newValue.ToString());
            return stringBuilder;
        }

        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_DateTime.ToString()), "日志日期不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_User), "日志用户不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Action), "日志操作不能为空");
        }

        public static void Write(string p, int p_2, string p_3, IDatabase database)
        {
            throw new NotImplementedException();
        }


    }

    /// <summary>
    /// 日志的业务扩展
    /// </summary>
    public static class LogBusinessExtension
    {

    }
    /// <summary>
    /// 日志的查询扩展
    /// </summary>
    public static class LogQueryExtension
    {
        /// <summary>
        /// 日志查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<Log> Query(this IQueryable<Log> query, LogQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            //查询
            var q = query.GetLogs(queryInformation);
            //排序
            q = _SortLogs(queryInformation, q);

            return new QueryResult<Log>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
        /// <summary>
        /// 日志查询结果排序
        /// </summary>
        /// <param name="queryInformation"></param>
        /// <param name="log"></param>
        /// <returns></returns>
        public static IQueryable<Log> _SortLogs(LogQueryInformation queryInformation, IQueryable<Log> log)
        {
            if (queryInformation.SortInfo == null)
                log = log.OrderByDescending(a => a.DateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("DateTime"))
                log = queryInformation.SortInfo.Direction == SortDirection.ASC
                    ? log.OrderBy(a => a.DateTime)
                    : log.OrderByDescending(a => a.DateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("User"))
                log = queryInformation.SortInfo.Direction == SortDirection.ASC
                    ? log.OrderBy(a => a.User)
                    : log.OrderByDescending(a => a.User);

            return log;
        }

        /// <summary>
        /// 取得日志
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static IQueryable<Log> GetLogs(this IQueryable<Log> query, LogQueryInformation queryInformation)
        {
            var q = query;
            if (queryInformation.User != null) queryInformation.User = queryInformation.User.Trim();
            if (!string.IsNullOrEmpty(queryInformation.User))
                q = q.Where(a => a.User.StartsWith(queryInformation.User));

            if (queryInformation.Action != null && queryInformation.Action.Length != 0)
                q = q.Where(a => a.Description.Contains(queryInformation.Action[0]));

            if (queryInformation.WriteTime != null)
            {
                if (queryInformation.WriteTime.Start.HasValue)
                    q = q.Where(a => a.DateTime >= queryInformation.WriteTime.Start.Value);
                if (queryInformation.WriteTime.End.HasValue)
                    q = q.Where(a => a.DateTime <= queryInformation.WriteTime.End.Value);
            }

            return q;
        }
        /// <summary>
        /// 取得日志操作类型
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetLogType(this IQueryable<Log> query)
        {
            return query
                .Select(q => q.Action)
                .Distinct()
                .ToList();
        }
    }
    /// <summary>
    /// 日志的权限扩展
    /// </summary>
    public static class LogPermissionExtension
    {
    }
}
