using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business;

namespace Srims.Tools.DataImport.Importer.Users
{
    public class UserRoleImporter : ImporterBase<UserRole_Old, UserRole>
    {
        protected override string EntityName
        {
            get { return "用户角色"; }
        }

        protected override string GetEntityDescription(UserRole_Old oldEntity)
        {
            return oldEntity.Name;
        }
        public override void Clear()
        {
            NewDatabase.ExecuteCommand("DELETE FROM [UserRolePermission]");
            NewDatabase.ExecuteCommand("DELETE FROM [Permission]");
            base.Clear();
        }

        protected override UserRole GetNewEntity(UserRole_Old oldEntity)
        {
            var userRole = new UserRole();

            userRole.Name = oldEntity.Name;
            userRole.Type = (UserRoleType)oldEntity.Type;

            userRole.Save(NewDatabase);
            importUserRolePermission(userRole, oldEntity);

            return userRole;

        }

        private void importUserRolePermission(UserRole userRole, UserRole_Old oldEntity)
        {
            if (!oldEntity.PowerID.HasValue)
                return;

            var permissions = GetNewPermissionPowers(oldEntity.Power_Old, OldDatabase, NewDatabase);
            foreach (var item in permissions)
            {
                var userRolePermission = new UserRolePermission();
                userRolePermission.Permission = item;
                userRolePermission.UserRole = userRole;
                userRolePermission.Save(NewDatabase);
            }

        }
        public static List<Permission> GetNewPermissionPowers(Power_Old oldPower, SrimsV4DataContext oldDatabase, IDatabase newDatabase)
        {
            var newPermissionList = new List<Permission>();

            if (!String.IsNullOrEmpty(oldPower.Powers))
            {
                var items = oldPower.Powers.Split(new char[] { ',' });
                for (int i = 0; i < items.Length; i++)
                {
                    if ((items[i] == "1") && Enum.IsDefined(typeof(PermissionItem), i))
                    {
                        var permissionOperation = (new int[] { 10, 11, 13, 14 }).Contains(i) ? PermissionOperation.Edit : PermissionOperation.Unknown;
                        newPermissionList.Add(new Permission { AccreditDateTime = DateTime.Now, PermissionItem = (PermissionItem)i, PermissionOperation = permissionOperation });
                    }
                }
            }
            if (!String.IsNullOrEmpty(oldPower.ProjectTypes))
            {
                var typeIDs = oldPower.Powers.Split(new char[] { ',' });
                foreach (var typeIDString in typeIDs)
                {
                    var oldType = oldDatabase.ProjectType_Olds.SingleOrDefault(t => t.ID == Convert.ToInt32(typeIDString));
                    if (oldType == null)
                        continue;

                    var newType = newDatabase.ProjectTypes.Single(t => t.Name == oldType.Name);
                    var permissionItem = newType.ProjectRank.IsHorizontal ? PermissionItem.ManageHorizontalProjectByType : PermissionItem.ManageVerticalProjectByType;

                    newPermissionList.Add(new Permission
                    {
                        AccreditDateTime = DateTime.Now,
                        PermissionItem = permissionItem,
                        PermissionOperation = PermissionOperation.Edit,
                        Params = newType.ID
                    });
                }
            }

            foreach (var item in newPermissionList)
                item.Save(newDatabase);

            return newPermissionList;
        }
    }
}
