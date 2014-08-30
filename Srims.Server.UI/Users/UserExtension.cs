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
using Srims.Server.Business.Experts;
using Srims.Server.Business.Type;
using Srims.Server.Business.Statistics;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Stamps;
using Srims.Server.Business.Performances;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 用户扩展
    /// </summary>
    public static class UserExtension
    {
        /// <summary>
        /// 显示用户记录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="userLogin"></param>
        /// <param name="database"></param>
        public static void ShowUserRecord(this User user, HttpResponse response, User userLogin, IDatabase database)
        {
            response.WriteTagWithValue("ID", user.ID);
            response.WriteTagWithValue("UserRoleID", user.UserRole.ID);
            response.WriteTagWithValue("UserRole", user.UserRole);
            response.WriteTagWithValue("UserRoleType", user.UserRole.Type);
            response.WriteTagWithValue("LoginID", user.LoginID);
            response.WriteTagWithValue("ExpertID", user.IsExpert ? new Nullable<Int32>(user.GetExpert(database.Experts).ID) : null);
            response.WriteTagWithValue("Name", user.Name);
            response.WriteTagWithValue("NameSpell", user.NameSpell);
            response.WriteTagWithValue("Email", user.Email);
            response.WriteTagWithValue("HomePhone", user.HomePhone);
            response.WriteTagWithValue("OfficePhone", user.OfficePhone);
            response.WriteTagWithValue("MobilePhone", user.MobilePhone);
            response.WriteTagWithValue("Fax", user.Fax);
            response.WriteTagWithValue("AllowMultiLogin", user.AllowMultiLogin);
            response.WriteTagWithValue("IsCustomPermission", user.IsCustomPermission);
            response.WriteTagWithValue("ExtClientState", user.ExtClientState);
            response.WriteTagWithValue("IsSuper", user.IsSuper);
            //response.WriteTagWithValue("IsUserCanBeDeleted", user.CanDelete(database));
            response.WriteTagWithValue("NormalPermission", user.GetNormalPermission(database));
            response.WriteTagWithValue("IsLocked", user.IsLocked(database.UserLockLogs));

            //permission
            response.WriteTagWithValue("HasPermission_ShowUser", userLogin.HasPermission_ShowUser());
            response.WriteTagWithValue("HasPermission_EditUser", userLogin.HasPermission_EditUser());
            response.WriteTagWithValue("HasPermission_DeleteUser", userLogin.HasPermission_DeleteUser(user, database));

            //can
            response.WriteTagWithValue("CanShowUser", userLogin.CanShowUser());
            response.WriteTagWithValue("CanEditUser", userLogin.CanEditUser());
            response.WriteTagWithValue("CanDeleteUser", userLogin.CanDeleteUser(user, database));
        }
        /// <summary>
        /// 显示当前登陆用户
        /// </summary>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowUser(this User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagWithValue("ID", user.ID);
            response.WriteTagWithValue("UserRoleID", user.UserRole.ID);
            response.WriteTagWithValue("UserRole", user.UserRole);
            response.WriteTagWithValue("UserRoleType", user.UserRole.Type);
            response.WriteTagWithValue("LoginID", user.LoginID);
            response.WriteTagWithValue("ExpertID", user.IsExpert ? new Nullable<Int32>(user.GetExpert(database.Experts).ID) : null);
            response.WriteTagWithValue("HasSecondCollege", user.IsExpert ? (user.GetExpert(database.Experts).College2 != null) : false);
            response.WriteTagWithValue("Name", user.Name);
            response.WriteTagWithValue("NameSpell", user.NameSpell);
            response.WriteTagWithValue("Email", user.Email);
            response.WriteTagWithValue("HomePhone", user.HomePhone);
            response.WriteTagWithValue("OfficePhone", user.OfficePhone);
            response.WriteTagWithValue("MobilePhone", user.MobilePhone);
            response.WriteTagWithValue("Fax", user.Fax);
            response.WriteTagWithValue("AllowMultiLogin", user.AllowMultiLogin);
            response.WriteTagWithValue("IsCustomPermission", user.IsCustomPermission);
            response.WriteTagWithValue("ExtClientState", user.ExtClientState);
            response.WriteTagWithValue("IsSuper", user.IsSuper);
            response.WriteTagWithValue("IsLocked", user.IsLocked(database.UserLockLogs));
            response.WriteTagWithValue("IsExpert", user.IsExpert);
            response.WriteTagWithValue("IsNeedEditPassword", user.IsNeedEditPassword(database));


            if (!user.IsExpert)
            {
                response.WriteTagWithValue("HasPermission_ManageAnnouncement", user.HasPermission(PermissionItem.ManageAnnouncement, database));
                response.WriteTagWithValue("HasPermission_ManageAward", user.HasRelatePerssionsOf(PermissionItem.ManageScienceAward, database) || user.HasRelatePerssionsOf(PermissionItem.ManageLiteralAward, database));
                response.WriteTagWithValue("HasPermission_ManageBase", user.HasPermission(PermissionItem.ManageBase, database));
                response.WriteTagWithValue("HasPermission_ExpertShow", user.HasPermission(PermissionItem.ExpertShow, database));
                response.WriteTagWithValue("HasPermission_ExpertEdit", user.HasPermission(PermissionItem.ExpertEdit, database));
                response.WriteTagWithValue("HasPermission_ExpertLinkWayEdit", user.HasPermission(PermissionItem.ExpertLinkWayEdit, database));
                response.WriteTagWithValue("HasPermission_ResetUserPassword", user.HasPermission(PermissionItem.ResetUserPassword, database));

                response.WriteTagWithValue("HasPermission_ManageFinance", user.HasPermission(PermissionItem.ManageFinance, database));
                response.WriteTagWithValue("HasPermission_ManageFinishProject", user.HasPermission(PermissionItem.ManageFinishProject, database));
                response.WriteTagWithValue("HasPermission_ManageFund", user.HasPermission(PermissionItem.ManageFund, database));
                response.WriteTagWithValue("HasPermission_ManagePaper", user.HasRelatePerssionsOf(PermissionItem.ManagePaper, database));
                response.WriteTagWithValue("HasPermission_ManagePatent", user.HasRelatePerssionsOf(PermissionItem.ManagePatent, database));
                response.WriteTagWithValue("HasPermission_ManageType", user.HasPermission(PermissionItem.ManageType, database));
                response.WriteTagWithValue("HasPermission_ManageSubjectLevel", user.HasPermission(PermissionItem.MangageSubjectLevel, database));

                response.WriteTagWithValue("HasPermission_EditAnyHorizontalProject", user.HasPermission_EditHorizontalProject(database));
                response.WriteTagWithValue("HasPermission_EditAnyVerticalProject", user.HasPermission_EditVerticalProject(database));
                response.WriteTagWithValue("HasPermission_ShowAnyHorizontalProject", user.HasPermission_ShowHorizontalProject(database));
                response.WriteTagWithValue("HasPermission_ShowAnyVerticalProject", user.HasPermission_ShowVerticalProject(database));
                response.WriteTagWithValue("HasPermission_CensorAnyHorizontalProject", user.HasPermission_CensorHorizontalProject(database));
                response.WriteTagWithValue("HasPermission_CensorAnyVerticalProject", user.HasPermission_CensorVerticalProject(database));

                response.WriteTagWithValue("HasPermission_CensorVerticalProjectDocuments", user.HasPermission_CensorVerticalProjectDocuments(database));
                response.WriteTagWithValue("HasPermission_CensorHorizontalProjectDocuments", user.HasPermission_CensorHorizontalProjectDocuments(database));

                response.WriteTagWithValue("HasPermission_CensorVerticalProjectContracts", user.HasPermission_CensorVerticalProjectContracts(database));
                response.WriteTagWithValue("HasPermission_CensorHorizontalProjectContracts", user.HasPermission_CensorHorizontalProjectContracts(database));

                response.WriteTagWithValue("HasPermission_CensorHorizontalProjectFundDescends", user.HasPermission_CensorFundDescends(database, true));

                response.WriteTagWithValue("HasPermission_CensorVerticalProjectFundAllocation", user.HasPermission_CensorFundAllocation(database, false));
                response.WriteTagWithValue("HasPermission_CensorHorizontalProjectFundAllocation", user.HasPermission_CensorFundAllocation(database, true));

                response.WriteTagWithValue("HasPermission_AllocationVerticalProjectFundDescend", user.HasPermission_FundAllocation(database, false));
                response.WriteTagWithValue("HasPermission_AllocationHorizontalProjectFundDescend", user.HasPermission_FundAllocation(database, true));

                response.WriteTagWithValue("HasPermission_AddSecretProject", user.HasPermission_AddSecretProject());
                response.WriteTagWithValue("HasPermission_ExpertSimpleQuery_ShowDetail", user.HasPermission_ExpertSimpleQuery_ShowDetail());

                response.WriteTagWithValue("HasPermission_ProjectCountStatistic", user.HasPermission_ProjectCountStatistic(database));
                response.WriteTagWithValue("HasPermission_FundTotalStatistic", user.HasPermission_FundTotalStatistic(database));
                response.WriteTagWithValue("HasPermission_FundDescendStatistic", user.HasPermission_FundDescendStatistic(database));
                response.WriteTagWithValue("HasPermission_VoucherStatistic", user.HasPermission_VoucherStatistic(database));
                response.WriteTagWithValue("HasPermission_PaperStatistic", user.HasPermission_PaperStatistic(database));
                response.WriteTagWithValue("HasPermission_AwardStatistic", user.HasPermission_AwardStatistic(database));
                response.WriteTagWithValue("HasPermission_PatentStatistic", user.HasPermission_PatentStatistic(database));

                response.WriteTagWithValue("HasPermission_ProjectCountStatisticViewManage", user.HasPermission_ProjectCountStatisticViewManage(database));
                response.WriteTagWithValue("HasPermission_FundTotalStatisticViewManage", user.HasPermission_FundTotalStatisticViewManage(database));
                response.WriteTagWithValue("HasPermission_FundDescendStatisticViewManage", user.HasPermission_FundDescendStatisticViewManage(database));
                response.WriteTagWithValue("HasPermission_VoucherStatisticViewManage", user.HasPermission_VoucherStatisticViewManage(database));
                response.WriteTagWithValue("HasPermission_PaperStatisticViewManage", user.HasPermission_PaperStatisticViewManage(database));
                response.WriteTagWithValue("HasPermission_AwardStatisticViewManage", user.HasPermission_AwardStatisticViewManage(database));
                response.WriteTagWithValue("HasPermission_PatentStatisticViewManage", user.HasPermission_PatentStatisticViewManage(database));

                response.WriteTagWithValue("hasPermission_ExportFinanceData", user.HasPermission(PermissionItem.ExportFinanceData, database));

                response.WriteTagWithValue("HasPermissionFundlent", user.HasPermissionFundlent());
                response.WriteTagWithValue("HasPermissionFundReturn", user.HasPermissionFundReturn());

                response.WriteTagWithValue("HasPermission_ManageStamp", user.HasPermission(PermissionItem.ManageStamp, database));
                response.WriteTagWithValue("HasPermission_StampDepartmentPrincipal", user.HasPermission(PermissionItem.StampDepartmentPrincipal, database));
                response.WriteTagWithValue("HasPermission_ManageStampFeedback", user.HasPermission_Stamp(database));
                response.WriteTagWithValue("HasPermission_CensorStamp", user.HasPermission(PermissionItem.ManageStamp, database));

                response.WriteTagWithValue("HasPermission_EditPaper", user.HasPermission_EditPaper(database));
                response.WriteTagWithValue("HasPermission_EditLiteralAward", user.HasPermission(PermissionItem.ManageLiteralAward, database));
                response.WriteTagWithValue("HasPermission_EditScienceAward", user.HasPermission(PermissionItem.ManageScienceAward, database));
                response.WriteTagWithValue("HasPermission_EditPatent", user.HasPermission(PermissionItem.ManagePatent, database));

            }
        }
        /// <summary>
        /// 显示查询用户
        /// </summary>
        /// <param name="user"></param>
        /// <param name="response"></param>
        public static void ShowAsUserSearchRecord(User user, HttpResponse response)
        {
            response.WriteTagWithValue("ID", user.ID);
            response.WriteTagWithValue("Name", user.Name);
            response.WriteTagWithValue("LoginID", user.LoginID);
            response.WriteTagWithValue("Email", user.Email);
            response.WriteTagWithValue("OfficePhone", user.OfficePhone);
        }
        /// <summary>
        /// 显示查询用户列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        public static void ShowAsSearchRecord(this IList<User> list, HttpResponse response)
        {
            ShowDelegate<User> showDelegate = new ShowDelegate<User>(ShowAsUserSearchRecord);
            list.Show<User>(response, showDelegate);
        }
        /// <summary>
        /// 显示用户查询结果
        /// </summary>
        /// <param name="userQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="userLogin"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<User> userQueryResult, HttpResponse response, User userLogin, IDatabase database)
        {
            //ShowDelegateWithDatabase<User> showDelegate = new ShowDelegateWithDatabase<User>(ShowUser);
            //userQueryResult.Show<User>(response, database, showDelegate);
            ShowDelegateWithUserAndDatabase<User> showDelegate = new ShowDelegateWithUserAndDatabase<User>(ShowUserRecord);
            userQueryResult.Show<User>(response, userLogin, database, showDelegate);
        }
        /// <summary>
        /// 取得用户
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static User GetUser(this HttpRequest request, IDatabase database)
        {
            User user = request.getUser(database);
            user.LoginID = request.GetString("LoginID");
            user.Name = request.GetString("Name");
            if (!string.IsNullOrEmpty(request.GetString("Password")))
                user.Password = request.GetString("Password");
            user.MobilePhone = request.GetString("MobilePhone");
            user.OfficePhone = request.GetString("OfficePhone");
            user.HomePhone = request.GetString("HomePhone");
            user.UserRole = request.GetEntity(database.UserRoles, "UserRoleID");
            user.Fax = request.GetString("Fax");
            user.Email = request.GetString("Email");
            return user;
        }
        private static User getUser(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Users.GetByID(id.Value);

            User user = new User();
            return user;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldUser(this HttpRequest request, IDatabase database)
        {
            Object oldEntity = new Object();
            oldEntity = request.getUser(database).Clone();
            return oldEntity;
        }
        /// <summary>
        /// 取得用户（用于编辑权限）
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static User GetUserForPermission(this HttpRequest request, IDatabase database)
        {
            User user = database.Users.GetByID(request.GetInt("UserID").Value);
            user.IsSuper = request.GetBoolean("IsSuper").Value;
            user.IsCustomPermission = request.GetBoolean("IsCustomPermission").Value;
            user.AllowMultiLogin = request.GetBoolean("AllowMultiLogin").Value;
            return user;
        }
        /// <summary>
        /// 取得用户（用于指定院系管理员）
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static User GetUserForCustomPermission(this HttpRequest request, IDatabase database)
        {
            User user = database.Users.GetByID(request.GetInt("UserID").Value);
            user.IsCustomPermission = true;
            return user;
        }
    }
}
