using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 部门的相关扩展
    /// </summary>
    public static class DepartmentExtension
    {
        /// <summary>
        /// 部门的显示扩展
        /// </summary>
        /// <param name="department"></param>
        /// <param name="response"></param>
        public static void ShowDepartment(Department department, HttpResponse response)
        {
            if (department == null)
                return;

            response.WriteTagWithValue("ID", department.ID);
            response.WriteTagWithValue("Code", department.Code);
            response.WriteTagWithValue("Name", department.Name);
            response.WriteTagWithValue("IsCollege", department.IsCollege);
            response.WriteTagWithValue("NameSpell", department.NameSpell);
            response.WriteTagWithValue("ShortName", department.ShortName);
        }
        /// <summary>
        /// 部门列表的显示扩展
        /// </summary>
        /// <param name="departmentList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<Department> departmentList, HttpResponse response)
        {
            ShowDelegate<Department> showDelegate = new ShowDelegate<Department>(ShowDepartment);
            departmentList.Show<Department>(response, showDelegate);
        }
        /// <summary>
        /// 院系权限相关显示
        /// </summary>
        /// <param name="department"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void ShowDepartmentRelated(this Department department, User user, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("AppointCollegeAdministrator");

            response.WriteTagWithValue("DeparmentID", department.ID);
            response.WriteTagWithValue("DeparmentName", department.Name);
            response.WriteTagWithValue("ManageAllHorizontalProjects", user.HasPermission(PermissionItem.ManageAllHorizontalProject, PermissionOperation.College, department.ID, database));
            response.WriteTagWithValue("ManageAllVerticalProjects", user.HasPermission(PermissionItem.ManageAllVerticalProject, PermissionOperation.College, department.ID, database));
            response.WriteTagWithValue("ManagePaper", user.HasPermission(PermissionItem.ManagePaper, PermissionOperation.College, department.ID, database));
            response.WriteTagWithValue("ManageLiteralAward", user.HasPermission(PermissionItem.ManageLiteralAward, PermissionOperation.College, department.ID, database));
            response.WriteTagWithValue("ManageScienceAward", user.HasPermission(PermissionItem.ManageScienceAward, PermissionOperation.College, department.ID, database));
            response.WriteTagWithValue("ManagePatent", user.HasPermission(PermissionItem.ManagePatent, PermissionOperation.College, department.ID, database));

            response.WriteTagEnd("AppointCollegeAdministrator");
        }
        /// <summary>
        /// 院系权限相关显示
        /// </summary>
        /// <param name="departmentList"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="response"></param>
        public static void Show(this IList<Department> departmentList, User user, IDatabase database, HttpResponse response)
        {
            response.WriteTagBegin("AppointCollegeAdministratorList");
            foreach (var department in departmentList)
                department.ShowDepartmentRelated(user, database, response);
            response.WriteTagEnd("AppointCollegeAdministratorList");
        }
    }
}
