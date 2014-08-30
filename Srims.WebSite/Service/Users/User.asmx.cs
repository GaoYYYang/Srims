using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using MIS.Common;

using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.Users;
using Srims.Server.UI.Type;
using Srims.Server.UI.HttpExtension;
using System.Transactions;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Users
{
    /// <summary>
    /// 用户相关服务
    /// </summary>
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class UserWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();

            Database
                .Users
                .Query(Request.GetUserQueryInformation())
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void ActiveUsersQuery()
        {
            Response.WriteXmlHead();

            Database
                .UserLoginLogs
                .GetActiveUsers()
               .Show(Response, User, Database);
        }
        [WebMethod]
        public void SearchUser()
        {
            Response.WriteXmlHead();

            Database
                .Users
                .SearchUser(Request.GetString("query"))
                .ShowAsSearchRecord(Response);
        }
        [WebMethod]
        public void SearchAdministrator()
        {
            Response.WriteXmlHead();

            Database
                .Users
                .SearchAdministrator(Request.GetString("query"))
                .ShowAsSearchRecord(Response);
        }
        [WebMethod]
        public void GetUserRoles()
        {
            Response.WriteXmlHead();

            Database
                .UserRoles
                .GetUserRoles(Database)
                .Show(Response);
        }
        [WebMethod]
        public void GetUserRoleByType()
        {
            Response.WriteXmlHead();

            if (String.IsNullOrEmpty(Request.GetString("userRoleType")))
                Database.UserRoles.GetUserRoleByType(UserRoleType.Administrator).Show(Response);
            else
                Database
                    .UserRoles.GetUserRoleByType(Request.GetEnum<UserRoleType>("userRoleType"))
                    .Show(Response);
        }
        [WebMethod]
        public void GetUserRolesForFilter()
        {
            Response.WriteXmlHead();

            Database
                .UserRoles
                .GetUserRoles(Database)
                .ShowForFilter(Response);
        }
        [WebMethod]
        public void IsUserNameExist()
        {
            Database
                .Users
                .IsUserNameExist(Request.GetString("name"))
                .Show(Response);
        }
        [WebMethod]
        public void IsUserExist()
        {
            Database
                .Users
                .IsUserExist(Request.GetString("loginID"), Request.GetInt("userID"))
                .Show(Response);
        }
        //新建或编辑用户
        [WebMethod]
        public void Save()
        {
            var oldUser = Request.GetOldUser(Database);
            var user = Request.GetUser(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = user.IsNew ? "添加" : "编辑";
                description += string.Format("用户\n   对应的用户名称为：{0}。", user.Name)
                    + Log.GetEditOperationDescription(oldUser, user, User.GetDescriptionItems(), user.IsNew);
                Log.Write(User.Name, user.IsNew ? (int)LogType.UserNew : (int)LogType.UserEdit, description, Request.UserHostAddress, user.IsNew ? "添加用户" : "编辑用户", Database);

                user.Save(Database);
                ts.Complete();
            }

        }
        [WebMethod]
        public void ResetUserPassword()
        {
            var user = Request.GetEntity<User>(Database.Users, "userID");
            if (user != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("重置了用户{0}的登陆密码 ", user.Name);
                    Log.Write(User.Name, (int)LogType.UserEdit, description, Request.UserHostAddress, "重置用户密码", Database);
                    user.ResetUserPassword();
                    user.Save(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void SaveUserLockLog()
        {
            var userLockLog = Request.GetUserLockLog(Database);
            userLockLog.Operator = User.Name;
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("锁定用户：{0}的登录。", userLockLog.User.Name);
                Log.Write(User.Name, (int)LogType.UserLockLog, description, Request.UserHostAddress, "锁定用户登录", Database);

                userLockLog.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SaveForPermission()
        {
            var user = Request.GetUserForPermission(Database);
            user.Save(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                List<Permission> permissionList = Request.GetPermissions(Database);
                var description = string.Format("保存用户授权\n 是否超管：{0}\n 是否自定义权限：{1}。\n", user.IsSuper, user.IsCustomPermission);
                description += "保存后的授权项有：\n";
                if (permissionList.Count == 0) description += "0 项权限。";
                else
                    foreach (var permission in permissionList)
                        description += string.Format("权限分类：{0}  ，权限操作{1};\n", permission.PermissionItem, permission.PermissionOperation);
                Log.Write(User.Name, (int)LogType.SaveForPermission, description, Request.UserHostAddress, "保存授权", Database);

                user.SetPermissionList(permissionList, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SaveForCollegeRelatedPermission()
        {
            var user = Request.GetUserForCustomPermission(Database);
            user.Save(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                List<Permission> permissionList = Request.GetCollegeRelatedPermissions(Database);
                var description = "保存用户院系相关授权，授权项有：\n";
                foreach (var permission in permissionList)
                    description += string.Format("权限分类：{0} ，权限操作{1};\n", permission.PermissionItem, permission.PermissionOperation);
                Log.Write(User.Name, (int)LogType.SaveForCollegeRelatedPermission, description, Request.UserHostAddress, "保存用户院系相关授权", Database);

                user.SetCollegeRelatedPermisssionList(permissionList, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SaveForTemporaryAuthorizationPermissions()
        {
            var user = Request.GetUserForCustomPermission(Database);
            user.Save(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                List<Permission> permissionList = Request.GetTemporaryAuthorizationPermissions(Database);
                var description = "保存用户临时授权，授权项有：\n";
                foreach (var permission in permissionList)
                    description += string.Format("权限分类：{0} ，权限操作{1};\n", permission.PermissionItem, permission.PermissionOperation);
                Log.Write(User.Name, (int)LogType.SaveForTemporaryAuthorizationPermissions, description, Request.UserHostAddress, "保存用户临时授权", Database);
                user.SetTemporayAuthorizationPermissionList(permissionList, Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var user = Request.GetEntity<User>(Database.Users, "userID");
            if (user != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除用户：{0} ", user.Name);
                    Log.Write(User.Name, (int)LogType.UserDelete, description, Request.UserHostAddress, "删除用户", Database);
                    user.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void LogoutUser()
        {
            var user = Request.GetEntity<User>(Database.Users, "userID");
            user.Logout(Database);
        }
        [WebMethod]
        public void CancelLockUser()
        {
            var user = Request.GetEntity<User>(Database.Users, "userID");
            var userLockLog = Database.UserLockLogs.GetActiveLockLog(user);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("解除锁定用户：{0}的登录。", userLockLog.User.Name);
                Log.Write(User.Name, (int)LogType.CancelUserLockLog, description, Request.UserHostAddress, "解除用户登录锁定", Database);

                userLockLog.Delete(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void GetAllUserRoles()
        {
            Response.WriteXmlHead();

            Database
                .Users.GetUserRoles()
                .Show(Response);
        }
        [WebMethod]
        public void GetDataForTreePermissionShow()
        {
            var user = Request.GetEntity<User>(Database.Users, "userID");
            Database
                .ProjectRanks
                .ToList()
                .ShowAsTreeForPermissionShow(user, Database, Response);
        }
        [WebMethod]
        public void GetDataForTreePermissionEdit()
        {
            var user = Request.GetEntity<User>(Database.Users, "userID");
            Database
                .ProjectRanks
                .ToList()
                .ShowAsTreeForPermissionEdit(user, Database, Response);
        }
        [WebMethod]
        public void GetDataForTreeUserTemporaryAuthorization()
        {
            Database
                .ProjectRanks
                .ToList()
                .ShowAsTreeForUserTemporaryAuthorization(Database, Response);
        }
        [WebMethod]
        public void GetDataForAppointCollegeAdministrator()
        {
            Response.WriteXmlHead();

            var user = Request.GetEntity<User>(Database.Users, "userID");
            Database
                .Departments
                .GetColleges()
                .ToList()
                .Show(user, Database, Response);
        }
        [WebMethod]
        public void GetTemporaryUserPermissions()
        {
            Response.WriteXmlHead();

            var user = Request.GetEntity<User>(Database.Users, "userID");
            user
                .GetTemporaryUserPermissions(Database.UserPermissions)
                .Show(Response, Database);
        }
        [WebMethod]
        public void DeleteTemporaryPermission()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                UserPermission userPermission = Request.GetEntity(Database.UserPermissions, "id");
                var description = string.Format("删除用户：{0}的临时授权。", userPermission.User.Name);
                Log.Write(User.Name, (int)LogType.DeleteTemporaryAuthorizationPermissions, description, Request.UserHostAddress, "取消临时授权", Database);

                userPermission.Delete(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void ClearUserAllPermissions()
        {
            using (TransactionScope ts = new TransactionScope())
            {
                var user = Request.GetEntity<User>(Database.Users, "userID");
                var description = string.Format("删除用户：{0}的所有权限。", user.Name);
                Log.Write(User.Name, (int)LogType.DeleteAllPermissions, description, Request.UserHostAddress, "删除用户所有权限", Database);

                user.ClearUserPermissions(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void AgreeLicence(string loginID, string password)
        {
            Database
                .Experts
                .Get(loginID, password)
                .AgreeLicence(Database, UserIP);
        }

        [WebMethod]
        public void Active(string token)
        {
            Response.WriteXmlHead();

            Database
               .Users
               .Active(new Guid(token), UserIP)
               .Show(Response, Database);
        }

        [WebMethod]
        public void Login(string loginID, string password)
        {
            Response.WriteXmlHead();
            Database
               .Users
               .Login(loginID, password, UserIP)
               .Show(Response, Database);
        }

        [WebMethod]
        public void Logout()
        {
            GetUserLoginLog().Logout(Database);
        }

        [WebMethod]
        public void GetExtClientState()
        {
            //取消以下两行注释可以启用客户端控件状态保存

            Response.AppendXmlHeader();
            Response.Write(User.ExtClientState);
        }

        [WebMethod]
        public void SetExtClientState(string key, string value)
        {
            User.SetExtClientState(key, value, Database);
        }
        [WebMethod]
        public void IsOldPasswordWrong()
        {
            var oldPassword = PasswordBuilder.BuildPassword(Request.GetString("OldPassword"));
            var userPassword = User.Password;

            Response.Write(oldPassword == userPassword);
        }
        [WebMethod]
        public void SaveNewPassword()
        {
            var password = Request.GetString("NewPassword");

            User.Password = password;
            using (TransactionScope ts = new TransactionScope())
            {
                User.Save(Database);
                ts.Complete();
            }
        }
    }
}
