using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Experts
{
    /// <summary>
    /// 部门相关扩展
    /// </summary>
    public static class DepartmentExtension
    {
        /// <summary>
        /// 部门显示扩展
        /// </summary>
        /// <param name="department"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowDepartment(Department department, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", department.ID);
            response.WriteTagWithValue("Name", department.Name);
            response.WriteTagWithValue("Code", department.Code);
            response.WriteTagWithValue("ShortName", department.ShortName);
            response.WriteTagWithValue("IsCollege", department.IsCollege);

            response.WriteTagWithValue("Haspermissin_Add", user.Haspermissin_AddDepartment(database));
            response.WriteTagWithValue("HasPermission_Edit", user.Haspermission_EditDepartment(database));

            response.WriteTagWithValue("Canadd", user.CanaddDepartment(database));
            response.WriteTagWithValue("CanEdit", user.CanEditDepartment(database));
        }
        /// <summary>
        ///  显示部门查询结果
        /// </summary>
        /// <param name="departmentResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Department> departmentResult, HttpResponse response, User user, IDatabase database)
        {
            //ShowDelegate<Department> showDelegate = new ShowDelegate<Department>(ShowDepartment);
            //departmentResult.Show<Department>(response,showDelegate);
            ShowDelegateWithUserAndDatabase<Department> showDelegate = new ShowDelegateWithUserAndDatabase<Department>(ShowDepartment);
            departmentResult.Show(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得部门
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Department GetDepartment(this HttpRequest request, IDatabase database, User user)
        {
            var department = request.getDepartment(database, user);
            department.Name = request.GetString("Name").Replace(" ", "");
            department.Code = request.GetString("Code");
            department.ShortName = request.GetString("ShortName").Replace(" ", "") == "" ? null : request.GetString("ShortName").Replace(" ", "");
            department.IsCollege = request.GetBoolean("IsCollege").Value;

            return department;
        }
        private static Department getDepartment(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Departments.GetByID(id.Value);
            var department = new Department();
            return department;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldEntity(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getDepartment(database, user).Clone();
            return oldEntity;
        }
    }
}
