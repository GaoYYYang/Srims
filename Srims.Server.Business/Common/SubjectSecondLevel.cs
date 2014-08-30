using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Common;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 二级学科
    /// </summary>
    public partial class SubjectSecondLevel : Entity<SubjectSecondLevel>, ISubject
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

            list.Add(new LogDescriptionItem { Name = "Name", Title = "名称" });
            list.Add(new LogDescriptionItem { Name = "SubjectFirstLevelID", Title = "对应一级学科的ID" });
            list.Add(new LogDescriptionItem { Name = "ChildCode", Title = "子代码" });
            list.Add(new LogDescriptionItem { Name = "Code", Title = "代码" });

            return list.ToArray();
        }
        /// <summary>
        /// 学科的字符串表示
        /// </summary>
        /// <returns>学科代码</returns>
        public override string ToString()
        {
            return _Code;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "学科代码不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_ChildCode), "学科子代码不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Code), "学科代码不能为空");
        }
    }

    /// <summary>
    /// 二级学科的业务扩展
    /// </summary>
    public static class SubjectSecondLevelBusinessExtension
    {
    }
    /// <summary>
    /// 二级学科的查询扩展
    /// </summary>
    public static class SubjectSecondLevelQueryExtension
    {
        /// <summary>
        /// 根据一级学科取得二级学科
        /// </summary>
        /// <param name="query">二级学科查询</param>
        /// <param name="firstLevelSubjectID">一级学科ID</param>
        /// <returns></returns>
        public static IList<SubjectSecondLevel> GetSubjectSecondLevel(this IQueryable<SubjectSecondLevel> query, int? firstLevelSubjectID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (!firstLevelSubjectID.HasValue)
                return query.ToList();

            return query
                .Where(ssl => ssl.SubjectFirstLevelID == firstLevelSubjectID)
                .ToList();
        }
        /// <summary>
        /// 取得二级学科
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<SubjectSecondLevel> Query(this IQueryable<SubjectSecondLevel> query, SubjectSecondLevelQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            //查询
            var q = query.GetSubjectSecondLevels(queryInformation);

            return new QueryResult<SubjectSecondLevel>(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                q.Count());
        }
        /// <summary>
        /// 取得二级学科代码
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<SubjectSecondLevel> GetSubjectSecondLevels(this IQueryable<SubjectSecondLevel> query, SubjectSecondLevelQueryInformation queryInformation)
        {
            var q = query;
            if (queryInformation.Name != null)
                queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(a => a.Name.StartsWith(queryInformation.Name));
            if (queryInformation.Code != null)
                queryInformation.Code = queryInformation.Code.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Code))
                q = q.Where(a => a.Code.StartsWith(queryInformation.Code));
            if (queryInformation.SubjectFirstLevelID != null)
                queryInformation.SubjectFirstLevelID = queryInformation.SubjectFirstLevelID.Trim();
            if (!string.IsNullOrEmpty(queryInformation.SubjectFirstLevelID))
                q = q.Where(a => a.SubjectFirstLevel.Name.ToString().StartsWith(queryInformation.SubjectFirstLevelID));
            return q;
        }
        /// <summary>
        /// 根据学科代码取得学科
        /// </summary>
        /// <param name="query"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public static SubjectSecondLevel getSubjectSecondLevelByCode(this IQueryable<SubjectSecondLevel> query, string code)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.Code == code);
        }
        /// <summary>
        /// 判断二级学科名称是否已经存在
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <param name="subjectID"></param>
        /// <returns></returns>
        public static bool IsSubjectSecondLevelNameExist(this IQueryable<SubjectSecondLevel> query, string name, int? subjectID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (subjectID.HasValue)
                return query.Count(q => q.ID != subjectID.Value && q.Name == name.Replace(" ", "")) != 0;

            return query.Count(q => q.Name == name.Replace(" ", "")) != 0;
        }
        /// <summary>
        ///  判断二级学科代码是否被占用
        /// </summary>
        /// <param name="query"></param>
        /// <param name="code"></param>
        /// <param name="sujectID"></param>
        /// <returns></returns>
        public static bool IsSecondLevelCodeUsed(this IQueryable<SubjectSecondLevel> query, string code, int? sujectID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (sujectID.HasValue)
                return query.Count(q => q.Code == code && q.ID != sujectID.Value) != 0;

            return query.Count(q => q.Code == code) != 0;
        }
        /// <summary>
        /// 根据一级专业名称和二级专业名称取得二级专业
        /// </summary>
        /// <param name="query"></param>
        /// <param name="firstLevelName"></param>
        /// <param name="secondLevelName"></param>
        /// <returns></returns>
        public static SubjectSecondLevel GetByFirstAndSecondName(this IQueryable<SubjectSecondLevel> query, string firstLevelName, string secondLevelName)
        {
            if (string.IsNullOrEmpty(firstLevelName))
                return null;

            if (string.IsNullOrEmpty(secondLevelName))
                return null;

            return query.SingleOrDefault(q => q.Name == secondLevelName && q.SubjectFirstLevel.Name == firstLevelName);
        }
    }
    /// <summary>
    /// 二级学科的权限扩展
    /// </summary>
    public static class SubjectSecondLevelPermissionExtension
    {
    }
}
