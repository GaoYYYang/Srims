using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 权限扩展
    /// </summary>
    public static class PermissionExtension
    {
        /// <summary>
        /// 取得权限
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static List<Permission> GetPermissions(this HttpRequest request, IDatabase database)
        {
            List<Permission> permissions = new List<Permission> { };

            permissions.AddRange(getNormalPermission(request, database));
            permissions.AddRange(getPermissionShowByType(request, database));
            permissions.AddRange(getPermissionEditByTpye(request, database));
            permissions.AddRange(getManageAllHorizontalProjects(request, database));
            permissions.AddRange(getManageAllVerticalProjects(request, database));
            foreach (var permission in permissions)
                permission.AccreditDateTime = DateTime.Now;

            return permissions;
        }
        /// <summary>
        /// 取得学院相关权限
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static List<Permission> GetCollegeRelatedPermissions(this HttpRequest request, IDatabase database)
        {
            List<Permission> permissions = new List<Permission> { };
            if (!string.IsNullOrEmpty(request.GetString("permissionValues")))
                permissions = getCollegeRelatedPermissions(request, database);

            return permissions;
        }
        /// <summary>
        /// 取得临时授权权限
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static List<Permission> GetTemporaryAuthorizationPermissions(this HttpRequest request, IDatabase database)
        {
            List<Permission> permissions = new List<Permission>();

            permissions = GetPermissions(request, database);
            var date = request.GetDateTime("permissionEndDate");
            foreach (var permission in permissions)
            {
                permission.EndDateTime = request.GetDateTime("permissionEndDate");
                if (request.GetDateTime("accreditDateTime").HasValue)
                    permission.AccreditDateTime = request.GetDateTime("accreditDateTime").Value;
            }
            return permissions;
        }
        private static List<Permission> getNormalPermission(HttpRequest request, IDatabase database)
        {
            var normalPermissionItems = request.GetEnumList<PermissionItem>("customPermission_PermissionNormal");
            List<Permission> permissions = new List<Permission> { };
            if (normalPermissionItems != null && normalPermissionItems.Length > 0)
                foreach (var permissionItem in normalPermissionItems)
                {
                    Permission permission = new Permission();
                    //permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = permissionItem;
                    permissions.Add(permission);
                }
            return permissions;
        }
        private static List<Permission> getPermissionShowByType(HttpRequest request, IDatabase database)
        {
            var hasPermissionShowTypes = request.GetList<int>("typeID_hasPermissionShow");
            List<Permission> permissions = new List<Permission> { };
            if (hasPermissionShowTypes != null && hasPermissionShowTypes.Length > 0)
                foreach (var typeID in hasPermissionShowTypes)
                {
                    bool isHorizontal = database.ProjectTypes.GetByID(typeID).IsHorizontalType;
                    Permission permission = new Permission();

                    if (isHorizontal)
                        permission.PermissionItem = PermissionItem.ManageHorizontalProjectByType;
                    else
                        permission.PermissionItem = PermissionItem.ManageVerticalProjectByType;
                    permission.PermissionOperation = PermissionOperation.Show;
                    //permission.AccreditDateTime = DateTime.Now;
                    permission.Params = typeID;

                    permissions.Add(permission);
                }
            return permissions;
        }
        private static List<Permission> getPermissionEditByTpye(HttpRequest request, IDatabase database)
        {
            var hasPermissionEditTypes = request.GetList<int>("typeID_hasPermissionEdit");
            List<Permission> permissions = new List<Permission> { };
            if (hasPermissionEditTypes != null && hasPermissionEditTypes.Length > 0)
                foreach (var typeID in hasPermissionEditTypes)
                {
                    bool isHorizontal = database.ProjectTypes.GetByID(typeID).IsHorizontalType;
                    Permission permission = new Permission();

                    if (isHorizontal)
                        permission.PermissionItem = PermissionItem.ManageHorizontalProjectByType;
                    else
                        permission.PermissionItem = PermissionItem.ManageVerticalProjectByType;
                    permission.PermissionOperation = PermissionOperation.Edit;
                    //permission.AccreditDateTime = DateTime.Now;
                    permission.Params = typeID;

                    permissions.Add(permission);
                }
            return permissions;
        }
        private static List<Permission> getManageAllHorizontalProjects(HttpRequest request, IDatabase database)
        {
            var allHorizontalProject_PermissionShow = request.GetBoolean("allHorizontalProject_PermissionShow");
            var allHorizontalProject_PermissionEdit = request.GetBoolean("allHorizontalProject_PermissionEdit");
            List<Permission> permissions = new List<Permission> { };
            if (allHorizontalProject_PermissionShow.HasValue)
                if (allHorizontalProject_PermissionShow.Value)
                {
                    Permission permission = new Permission();
                    //permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageAllHorizontalProject;
                    permission.PermissionOperation = PermissionOperation.Show;
                    permissions.Add(permission);
                }
            if (allHorizontalProject_PermissionEdit.HasValue)
                if (allHorizontalProject_PermissionEdit.Value)
                {
                    Permission permission = new Permission();
                    // permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageAllHorizontalProject;
                    permission.PermissionOperation = PermissionOperation.Edit;
                    permissions.Add(permission);
                }
            return permissions;
        }
        private static List<Permission> getManageAllVerticalProjects(HttpRequest request, IDatabase database)
        {
            var allVerticalProject_PermissionShow = request.GetBoolean("allVerticalProject_PermissionShow");
            var allVerticalProject_PermissionEdit = request.GetBoolean("allVerticalProject_PermissionEdit");
            List<Permission> permissions = new List<Permission> { };
            if (allVerticalProject_PermissionShow.HasValue)
                if (allVerticalProject_PermissionShow.Value)
                {
                    Permission permission = new Permission();
                    //permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageAllVerticalProject;
                    permission.PermissionOperation = PermissionOperation.Show;
                    permissions.Add(permission);
                }
            if (allVerticalProject_PermissionEdit.HasValue)
                if (allVerticalProject_PermissionEdit.Value)
                {
                    Permission permission = new Permission();
                    //permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageAllVerticalProject;
                    permission.PermissionOperation = PermissionOperation.Edit;
                    permissions.Add(permission);
                }

            return permissions;
        }
        private static List<Permission> getCollegeRelatedPermissions(HttpRequest request, IDatabase database)
        {
            List<Permission> permissions = new List<Permission>();
            var permissionValues = request.GetString("permissionValues").Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var item in permissionValues)
            {
                var checkedvalues = item.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                int collegeID = Convert.ToInt32(checkedvalues[0]);

                if (checkedvalues[1] == "1")
                {
                    Permission permission = new Permission();
                    permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageAllHorizontalProject;
                    permission.PermissionOperation = PermissionOperation.College;
                    permission.Params = collegeID;
                    permissions.Add(permission);
                }
                if (checkedvalues[2] == "1")
                {
                    Permission permission = new Permission();
                    permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageAllVerticalProject;
                    permission.PermissionOperation = PermissionOperation.College;
                    permission.Params = collegeID;
                    permissions.Add(permission);
                }
                if (checkedvalues[3] == "1")
                {
                    Permission permission = new Permission();
                    permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageScienceAward;
                    permission.PermissionOperation = PermissionOperation.College;
                    permission.Params = collegeID;
                    permissions.Add(permission);
                }
                if (checkedvalues[4] == "1")
                {
                    Permission permission = new Permission();
                    permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManagePaper;
                    permission.PermissionOperation = PermissionOperation.College;
                    permission.Params = collegeID;
                    permissions.Add(permission);
                }
                if (checkedvalues[5] == "1")
                {
                    Permission permission = new Permission();
                    permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManagePatent;
                    permission.PermissionOperation = PermissionOperation.College;
                    permission.Params = collegeID;
                    permissions.Add(permission);
                }
                if (checkedvalues[6] == "1")
                {
                    Permission permission = new Permission();
                    permission.AccreditDateTime = DateTime.Now;
                    permission.PermissionItem = PermissionItem.ManageLiteralAward;
                    permission.PermissionOperation = PermissionOperation.College;
                    permission.Params = collegeID;
                    permissions.Add(permission);
                }
            }
            return permissions;
        }
    }
}
