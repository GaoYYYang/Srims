using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 部门
    /// </summary>
    public partial class Department : Entity<Department>
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

            list.Add(new LogDescriptionItem { Name = "NameSpell", Title = "名称拼音首字母缩写" });
            list.Add(new LogDescriptionItem { Name = "ShortName", Title = "简称" });
            list.Add(new LogDescriptionItem { Name = "Code", Title = "代码" });
            list.Add(new LogDescriptionItem { Name = "IsCollege", Title = "是否是学院" });

            return list.ToArray();
        }
        /// <summary>
        /// 院系的字符串表示
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return _Name;
        }
        /// <summary>
        /// 取得或设置部门名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set
            {
                _Name = value;
                _NameSpell = Spell.GetSpell(value);
            }
        }
    }
    /// <summary>
    /// 部门的业务扩展
    /// </summary>
    public static class DepartmentBusinessExtension
    {
    }
    /// <summary>
    /// 部门的查询扩展
    /// </summary>
    public static class DepartmentQueryExtension
    {
        /// <summary>
        /// 取得所有学院
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static List<Department> GetColleges(this IQueryable<Department> query)
        {
            return query.Where(q => q.IsCollege).Distinct().ToList();
        }
        /// <summary>
        /// 取得部门查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<Department> Query(this IQueryable<Department> query, DepartmentQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            //查询
            var q = query.GetDepartment(queryInformation);
            q = sortQuery(q, queryInformation.sortInfor);

            return new QueryResult<Department>(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                q.Count());
        }
        /// <summary>
        /// 排序
        /// </summary>
        /// <param name="query"></param>
        /// <param name="sortInfo"></param>
        /// <returns></returns>
        private static IQueryable<Department> sortQuery(IQueryable<Department> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query.OrderBy(e => e.Name);
            else if (sortInfo.Field.EqualIgnoreCase("Code"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(e => e.Code) : query.OrderByDescending(e => e.Code);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(e => e.Name) : query.OrderByDescending(e => e.Name);
            else
                return query.OrderBy(e => e.Name);
        }
        /// <summary>
        /// 取得部门
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        private static IQueryable<Department> GetDepartment(this IQueryable<Department> query, DepartmentQueryInformation queryInformation)
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

            if (queryInformation.ShortName != null)
                queryInformation.ShortName = queryInformation.ShortName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ShortName))
                q = q.Where(a => a.ShortName.StartsWith(queryInformation.ShortName));

            return q;
        }
        /// <summary>
        /// 部门代码是否被占用
        /// </summary>
        /// <param name="query"></param>
        /// <param name="code"></param>
        /// <param name="departmentID"></param>
        /// <returns></returns>
        public static bool IsDepartmentCodeUsed(this IQueryable<Department> query, string code, int? departmentID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (departmentID.HasValue)
                return query.Count(q => q.Code == code && q.ID != departmentID.Value) != 0;

            return query.Count(q => q.Code == code) != 0;
        }
        /// <summary>
        /// 部门名称是否被占用
        /// </summary>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <param name="departmentID"></param>
        /// <returns></returns>
        public static bool IsDepartmentNameExist(this IQueryable<Department> query, string name, int? departmentID)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (departmentID.HasValue)
                return query.Count(q => q.ID != departmentID.Value && q.Name == name.Replace(" ", "")) != 0;

            return query.Count(q => q.Name == name.Replace(" ", "")) != 0;
        }
    }
    /// <summary>
    /// 部门的权限扩展
    /// </summary>
    public static class DepartmentPermissionExtension
    {
        /// <summary>
        /// 部门新建权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool Haspermissin_AddDepartment(this User user, IDatabase database) { return user.IsSuper; }
        /// <summary>
        /// 部门新建权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanaddDepartment(this User user, IDatabase database) { return user.IsSuper; }
        /// <summary>
        /// 部门编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool Haspermission_EditDepartment(this User user, IDatabase database) { return user.IsSuper; }
        /// <summary>
        /// 部门编辑权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditDepartment(this User user, IDatabase database) { return user.IsSuper; }
        /// <summary>
        ///  是否是学院权限设置
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool Haspermission_ClearCollege(this User user) { return user.IsSuper; }
        /// <summary>
        /// 判断“是否是学院”是否可以编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="department"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanClearCollege(this  User user, Department department, IDatabase database)
        {
            if (!user.Haspermission_ClearCollege())
                return false;

            if (!department.IsCollege)
                return true;

            if (database.Experts.Count(q => q.CollegeID == department.ID) != 0)
                return false;
            if (database.Patents.Count(q => q.CollegeID == department.ID) != 0)
                return false;
            if (database.Papers.Count(q => q.CollegeID == department.ID) != 0)
                return false;

            return true;
        }
    }
}
