using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 一级学科
    /// </summary>
    public partial class SubjectFirstLevel : Entity<SubjectFirstLevel>, ISubject
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
            list.Add(new LogDescriptionItem { Name = "Code", Title = "代码" });

            return list.ToArray();
        }
        /// <summary>
        /// 取得属于该一级学科的所有的二级学科
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<SubjectSecondLevel> GetSubjectSecendLevel(IQueryable<SubjectSecondLevel> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.SubjectFirstLevelID == _ID).OrderBy(q => q.Code).ToList();
        }

        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "学科名称不能为空");
            validater.AddCondition(!string.IsNullOrEmpty(_Code), "学科代码不能为空");
        }
        /// <summary>
        ///保存操作
        /// </summary>
        /// <param name="database"></param>
        protected override void SaveAction(IDatabase database)
        {
            using (TransactionScope ts = new TransactionScope())
            {
                foreach (SubjectSecondLevel subjectSecendLevel in GetSubjectSecendLevel(database.SubjectSecondLevels))
                    subjectSecendLevel.Code = this._Code + subjectSecendLevel.ChildCode;

                base.SaveAction(database);
                ts.Complete();
            }
        }
        /// <summary>
        /// 字符串表示
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return _Code;
        }
    }

    /// <summary>
    /// 一级学科的业务扩展
    /// </summary>
    public static class SubjectFirstLevelBusinessExtension
    {
    }
    /// <summary>
    /// 一级学科的查询扩展
    /// </summary>
    public static class SubjectFirstLevelQueryExtension
    {
        /// <summary>
        /// 取得一级学科的查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<SubjectFirstLevel> Query(this IQueryable<SubjectFirstLevel> query, SubjectFirstLevelQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            //查询
            var q = query.GetSubjectFirstLevels(queryInformation);
            return new QueryResult<SubjectFirstLevel>(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                q.Count());
        }
        /// <summary>
        /// 取得一级学科
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<SubjectFirstLevel> GetSubjectFirstLevels(this IQueryable<SubjectFirstLevel> query, SubjectFirstLevelQueryInformation queryInformation)
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

            return q;

        }
        /// <summary>
        /// 根据学科的代码或名称取得学科
        /// </summary>
        /// <param name="query"></param>
        /// <param name="condition"></param>
        /// <returns></returns>
        public static IList<SubjectFirstLevel> GetSubjectFirstLevel(this IQueryable<SubjectFirstLevel> query, string condition)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.Where(q => q.Name.Contains(condition) || q.Code.Contains(condition))
                        .ToList();
        }
        /// <summary>
        /// 根据Code取得一级学科代码
        /// </summary>
        /// <param name="query"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public static SubjectFirstLevel getSubjectFirstLevelByCode(this IQueryable<SubjectFirstLevel> query, string code)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            return query.SingleOrDefault(q => q.Code == code);
        }
        /// <summary>
        /// 判断学科代码是否被占用
        /// </summary>
        /// <param name="query"></param>
        /// <param name="code"></param>
        /// <param name="sujectID"></param>
        /// <returns></returns>
        public static bool IsFirstLevelCodeUsed(this IQueryable<SubjectFirstLevel> query, string code, int? sujectID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (sujectID.HasValue)
                return query.Count(q => q.Code == code && q.ID != sujectID.Value) != 0;

            return query.Count(q => q.Code == code) != 0;
        }
        /// <summary>
        /// 判断学科名称是否已经存在
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <param name="subjectID"></param>
        /// <returns></returns>
        public static bool IsSubjectFirstLevelNameExist(this IQueryable<SubjectFirstLevel> query, string name, int? subjectID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (subjectID.HasValue)
                return query.Count(q => q.ID != subjectID.Value && q.Name == name.Replace(" ", "")) != 0;

            return query.Count(q => q.Name == name.Replace(" ", "")) != 0;
        }
        /// <summary>
        /// 取得一级学科
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static SubjectFirstLevel GetByName(this IQueryable<SubjectFirstLevel> query, string name)
        {
            if (string.IsNullOrEmpty(name))
                return null;

            return query.SingleOrDefault(q => q.Name == name);
        }
    }
    /// <summary>
    /// 一级学科的权限扩展
    /// </summary>
    public static class SubjectFirstLevelPermissionExtension
    {
        //public static bool Haspermissin_AddSubject(this User user, IDatabase database) { return user.IsSuper; }
        //public static bool CanaddSubject(this User user, IDatabase database) { return user.IsSuper; }
        //public static bool Haspermission_EditSubject(this User user, IDatabase database) { return user.IsSuper; }
        //public static bool CanEditSubject(this User user, IDatabase database) { return user.IsSuper; }

    }
}
