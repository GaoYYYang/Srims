using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 权限
    /// </summary>
    public partial class Permission : Entity<Permission>
    {
        /// <summary>
        /// 具有参数的权限类型
        /// </summary>
        public static readonly List<PermissionItem> HasParamPermissionItems = new List<PermissionItem>
        { 
            PermissionItem.ManageAllHorizontalProject,
            PermissionItem.ManageAllVerticalProject,
            PermissionItem.ManageHorizontalProjectByType, 
            PermissionItem.ManageVerticalProjectByType, 
            PermissionItem.ManageScienceAward,
            PermissionItem.ManageLiteralAward,
            PermissionItem.ManagePaper,
            PermissionItem.ManagePatent
        };
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            if (!HasParam(_PermissionItem))
                validater.AddCondition(!_Params.HasValue, "权限操作不能指定参数");
            validater.AddCondition(IsOperationCorrect(_PermissionItem, _PermissionOperation), "权限操作不合法");
        }
        /// <summary>
        /// 判断是否具有参数
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <returns></returns>
        public static bool HasParam(PermissionItem permissionItem)
        {
            return HasParamPermissionItems.Contains(permissionItem);
        }
        /// <summary>
        /// 判断权限操作是否合法
        /// </summary>
        /// <param name="permissionItem"></param>
        /// <param name="operation"></param>
        /// <returns></returns>
        public static bool IsOperationCorrect(PermissionItem permissionItem, PermissionOperation operation)
        {
            switch (permissionItem)
            {
                case PermissionItem.Base:
                case PermissionItem.ManageAnnouncement:
                case PermissionItem.ManageBase:
                case PermissionItem.ManageFinance:
                case PermissionItem.ManageFinishProject:
                case PermissionItem.ManageFund:
                case PermissionItem.ManageType:
                case PermissionItem.MangageSubjectLevel:
                    return operation == PermissionOperation.Unknown;

                case PermissionItem.ManageScienceAward:
                case PermissionItem.ManageLiteralAward:
                case PermissionItem.ManagePaper:
                case PermissionItem.ManagePatent:
                    return operation == PermissionOperation.Unknown || operation == PermissionOperation.College;


                case PermissionItem.ManageHorizontalProjectByType:
                case PermissionItem.ManageVerticalProjectByType:
                    return operation != PermissionOperation.Unknown && operation != PermissionOperation.College;

                case PermissionItem.ManageAllHorizontalProject:
                case PermissionItem.ManageAllVerticalProject:
                    return operation != PermissionOperation.Unknown;

                default: return true;
            }
        }
    }

    /// <summary>
    /// 权限的业务扩展
    /// </summary>
    public static class PermissionBusinessExtension
    {
    }
    /// <summary>
    /// 权限的查询扩展
    /// </summary>
    public static class PermissionQueryExtension
    {
        /// <summary>
        /// 根据用户判断用户是否具有某种权限
        /// </summary>
        /// <param name="userPermissionList"></param>
        /// <param name="permissionItem"></param>
        /// <param name="operation"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static bool HasPermission(this IList<Permission> userPermissionList, PermissionItem permissionItem, PermissionOperation operation, int? param)
        {
            if (!Permission.IsOperationCorrect(permissionItem, operation))
                throw new ArgumentException("对该类型权限的权限操作错误");

            if (!Permission.HasParam(permissionItem) && param.HasValue)
                throw new ArgumentException("该权限类型没有参数");

            //权限类型
            var q = userPermissionList.Where(p => p.PermissionItem == permissionItem);
            //权限时间
            q = q.Where(p => p.EndDateTime.HasValue && p.EndDateTime.Value >= DateTime.Now || !p.EndDateTime.HasValue);
            //权限操作
            q = q.Where(p => p.PermissionOperation == operation);
            //权限参数
            if (param.HasValue)
                q = q.Where(p => p.Params == param);

            return q.Count() > 0;
        }
        /// <summary>
        /// 根据权限类型取得用户具有的该类型的所有权限
        /// </summary>
        /// <param name="UserpermissionList"></param>
        /// <param name="permissionItem"></param>
        /// <returns></returns>
        public static IList<Permission> GetPermissions(this IList<Permission> UserpermissionList, PermissionItem permissionItem)
        {
            //权限类型
            var q = UserpermissionList.Where(p => p.PermissionItem == permissionItem);
            //权限时间
            q = q.Where(p => p.EndDateTime.HasValue && p.EndDateTime.Value >= DateTime.Now || !p.EndDateTime.HasValue);

            return q.ToList();
        }
        //public static IList<Permission> GetPermanentPermissions(this User user)
        /// <summary>
        /// 获取用户的一般权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static string GetNormalPermission(this User user, IDatabase database)
        {
            string normalPermission = "";
            var permissionList = user.GetPermissions(database.UserPermissions);
            List<PermissionItem> permissionItems = new List<PermissionItem>();
            foreach (var permission in permissionList)
                permissionItems.Add(permission.PermissionItem);

            //if (permissionItems.Contains(PermissionItem.Base))
            //    normalPermission = normalPermission + PermissionItem.Base + ",";
            if (permissionItems.Contains(PermissionItem.ManageAnnouncement))
                normalPermission = normalPermission + PermissionItem.ManageAnnouncement + ",";
            if (permissionItems.Contains(PermissionItem.ManageScienceAward))
                normalPermission = normalPermission + PermissionItem.ManageScienceAward + ",";
            if (permissionItems.Contains(PermissionItem.ManageLiteralAward))
                normalPermission = normalPermission + PermissionItem.ManageLiteralAward + ",";
            if (permissionItems.Contains(PermissionItem.ManageBase))
                normalPermission = normalPermission + PermissionItem.ManageBase + ",";
            if (permissionItems.Contains(PermissionItem.ManageFinance))
                normalPermission = normalPermission + PermissionItem.ManageFinance + ",";
            if (permissionItems.Contains(PermissionItem.ManageFinishProject))
                normalPermission = normalPermission + PermissionItem.ManageFinishProject + ",";
            if (permissionItems.Contains(PermissionItem.ManageFund))
                normalPermission = normalPermission + PermissionItem.ManageFund + ",";
            if (permissionItems.Contains(PermissionItem.ManagePaper))
                normalPermission = normalPermission + PermissionItem.ManagePaper + ",";
            if (permissionItems.Contains(PermissionItem.ManagePatent))
                normalPermission = normalPermission + PermissionItem.ManagePatent + ",";
            if (permissionItems.Contains(PermissionItem.ManageType))
                normalPermission = normalPermission + PermissionItem.ManageType + ",";
            if (permissionItems.Contains(PermissionItem.MangageSubjectLevel))
                normalPermission = normalPermission + PermissionItem.MangageSubjectLevel + ",";
            if (permissionItems.Contains(PermissionItem.Statistic))
                normalPermission = normalPermission + PermissionItem.Statistic + ",";
            if (permissionItems.Contains(PermissionItem.ExportFinanceData))
                normalPermission = normalPermission + PermissionItem.ExportFinanceData + ",";
            if (permissionItems.Contains(PermissionItem.ExpertShow))
                normalPermission = normalPermission + PermissionItem.ExpertShow + ",";
            if (permissionItems.Contains(PermissionItem.ExpertEdit))
                normalPermission = normalPermission + PermissionItem.ExpertEdit + ",";
            if (permissionItems.Contains(PermissionItem.ExpertLinkWayEdit))
                normalPermission = normalPermission + PermissionItem.ExpertLinkWayEdit + ",";
            if (permissionItems.Contains(PermissionItem.ManageStamp))
                normalPermission = normalPermission + PermissionItem.ManageStamp + ",";
            if (permissionItems.Contains(PermissionItem.ResetUserPassword))
                normalPermission = normalPermission + PermissionItem.ResetUserPassword + ",";
            if (permissionItems.Contains(PermissionItem.StampDepartmentPrincipal))
                normalPermission = normalPermission + PermissionItem.StampDepartmentPrincipal + ",";

            return normalPermission;
        }
    }
    /// <summary>
    /// 权限的权限扩展
    /// </summary>
    public static class PermissionPermissionExtension
    {
    }
}
