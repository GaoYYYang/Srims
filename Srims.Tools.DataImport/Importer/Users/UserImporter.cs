using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Users;

namespace Srims.Tools.DataImport.Importer.Users
{
    public class UserImporter : ImporterBase<User_Old, User>
    {
        protected override string EntityName
        {
            get { return "用户"; }
        }

        protected override string GetEntityDescription(User_Old oldEntity)
        {
            return String.Format("{0}({1})", oldEntity.Name, oldEntity.LoginID);
        }

        public override void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));
            NewDatabase.ExecuteCommand("DELETE FROM [UserLoginLog]");
            NewDatabase.ExecuteCommand("DELETE FROM [UserPermission]");
            NewDatabase.ExecuteCommand("DELETE FROM [User]");
            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        protected override User GetNewEntity(User_Old oldEntity)
        {
            var user = new User();

            user.Email = oldEntity.Email;
            user.Fax = oldEntity.Fax;
            user.HomePhone = oldEntity.HomePhone;
            user.IsCustomPermission = oldEntity.IsCustomPower;
            user.IsSuper = oldEntity.IsSuper;
            user.LoginID = oldEntity.LoginID;
            user.MobilePhone = oldEntity.MobilePhone;
            user.Name = oldEntity.Name;
            user.NameSpell = oldEntity.NameSpell;
            user.OfficePhone = oldEntity.OfficePhone;

            typeof(User).GetField("_Password", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance).SetValue(user, oldEntity.Password);
            if (String.IsNullOrEmpty(user.Password))
                user.Password = "123456";

            user.UserRole = getUserRole(oldEntity);

            user.Save(NewDatabase);
            importUserPermission(user, oldEntity);

            return user;
        }

        private UserRole getUserRole(User_Old oldEntity)
        {
            return NewDatabase
                .UserRoles
                .Single(ur => ur.Name == oldEntity.UserRole_Old.Name);
        }
        private void importUserPermission(User user, User_Old oldEntity)
        {
            if (!oldEntity.PowerID.HasValue)
                return;

            var permissions = UserRoleImporter.GetNewPermissionPowers(oldEntity.Power_Old, OldDatabase, NewDatabase);
            foreach (var item in permissions)
            {
                var userPermission = new UserPermission();
                userPermission.Permission = item;
                userPermission.User = user;
                userPermission.Save(NewDatabase);
            }
        }
    }
}
