using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Bases
{
    /// <summary>
    /// 基地
    /// </summary>
    public partial class Base : Entity<Base>
    {
        /// <summary>
        /// 取得对应的负责人
        /// </summary>
        public Expert Director
        {
            get { return _Director.Entity; }
            set
            {
                _Director.Entity = value;
                _DirectorID = value == null ? null : new int?(value.ID);
                _DirectorName = value == null ? null : value.Name;
            }
        }
        /// <summary>
        /// 取得项目编辑的基地日志记录信息
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return "ID：" + this.ID + "、名称：" + this.Name + ";";
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

            list.Add(new LogDescriptionItem { Name = "Name", Title = "基地名称" });
            list.Add(new LogDescriptionItem { Name = "Address", Title = "基地地址" });
            list.Add(new LogDescriptionItem { Name = "Zip", Title = "邮编" });
            list.Add(new LogDescriptionItem { Name = "Phone", Title = "联系电话" });
            list.Add(new LogDescriptionItem { Name = "Fax", Title = "传真" });
            list.Add(new LogDescriptionItem { Name = "Administration", Title = "主管部门" });
            list.Add(new LogDescriptionItem { Name = "Rank", Title = "级别" });
            list.Add(new LogDescriptionItem { Name = "Director", Title = "负责人" });
            list.Add(new LogDescriptionItem { Name = "AcademyDirector", Title = "学术负责人" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(Name), "基地名称不能为空");
        }
        /// <summary>
        /// 取得属于该基地的项目
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<Project> GetProject(IQueryable<Project> query)
        {
            return query
                .Where(q => q.BaseID == this.ID)
                .ToList();
        }
        /// <summary>
        /// 判断该基地是否拥有项目
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool IsHaveProject(IQueryable<Project> query)
        {
            return query
                .Count(q => q.BaseID == this.ID) > 0;
        }
    }

    /// <summary>
    /// 基地的业务扩展
    /// </summary>
    public static class BaseBusinessExtension
    {

    }
    /// <summary>
    /// 基地的查询扩展
    /// </summary>
    public static class BaseQueryExtension
    {
        /// <summary>
        /// 基地查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<Base> Query(this IQueryable<Base> query, BaseQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            query = query.GetBases(queryInformation, user, database);
            query = sortQuery(query, queryInformation);

            int total = query.Count();

            return new QueryResult<Base>(
                query.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                total);
        }
        /// <summary>
        /// 基地排序
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Base> sortQuery(this IQueryable<Base> query, BaseQueryInformation queryInformation)
        {
            SortInfo sortInfo = queryInformation.SortInfo;

            if (sortInfo == null)
                return query.OrderBy(p => p.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Name)
                    : query.OrderByDescending(p => p.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Rank"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Rank)
                    : query.OrderByDescending(q => q.Rank);
            else
                return query.OrderByDescending(p => p.Name);
        }
        /// <summary>
        /// 基地查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static IQueryable<Base> GetBases(this IQueryable<Base> query, BaseQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            var q = query;
            q = q.Intersect(query.getBasesByUser(user, database));
            q = q.Intersect(query.getBasesByQueryInformaion(queryInformation));

            return q;
        }
        private static IQueryable<Base> getBasesByUser(this IQueryable<Base> query, User user, IDatabase database)
        {
            if (user == null)
                return query;

            if (!user.HasPermission(PermissionItem.ManageBase, database))
                return null;

            return query;
        }
        private static IQueryable<Base> getBasesByQueryInformaion(this IQueryable<Base> query, BaseQueryInformation queryInformation)
        {
            var q = query;

            if (queryInformation.Name != null)
                queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(b => b.Name.Contains(queryInformation.Name));

            if (queryInformation.Ranks != null && queryInformation.Ranks.Length > 0)
                q = q.Where(b => queryInformation.Ranks.Contains(b.Rank));

            return q;
        }
        /// <summary>
        /// 根据基地的名称取得基地
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static Base GetByName(this IQueryable<Base> query, string name)
        {
            if (string.IsNullOrEmpty(name))
                return null;

            return query.SingleOrDefault(q => q.Name == name);
        }
    }
    /// <summary>
    /// 基地的权限扩展
    /// </summary>
    public static class BasePermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有对某个基地进行查看的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="currentBase"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Show(this User user, Base currentBase, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageBase, database);
        }
        /// <summary>
        /// 判断用户能否查看某个基地
        /// </summary>
        /// <param name="user"></param>
        /// <param name="currentBase"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShow(this User user, Base currentBase, IDatabase database)
        {
            return user.HasPermission_Show(currentBase, database);
        }
        /// <summary>
        /// 判断用户是否具有编辑某一基地的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="currentBase"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Edit(this User user, Base currentBase, IDatabase database)
        {
            return user.HasPermission_Show(currentBase, database);
        }
        /// <summary>
        /// 判断用户能否对某一基地进行编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="currentBase"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEdit(this User user, Base currentBase, IDatabase database)
        {
            return user.HasPermission_Edit(currentBase, database);
        }
        /// <summary>
        /// 判断用户是否具有删除某一基地的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="currenBase"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Delete(this User user, Base currenBase, IDatabase database)
        {
            return user.HasPermission_Edit(currenBase, database);
        }
        /// <summary>
        /// 判断用户能够删除某一基地
        /// </summary>
        /// <param name="user"></param>
        /// <param name="currentBase"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, Base currentBase, IDatabase database)
        {
            if (!user.HasPermission_Delete(currentBase, database))
                return false;

            return !currentBase.IsHaveProject(database.Projects);
        }
    }
}
