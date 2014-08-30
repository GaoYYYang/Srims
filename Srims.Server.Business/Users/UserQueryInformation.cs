using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 用户查询信息
    /// </summary>
    public class UserQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置要查询用户的姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置要查询用户的登陆ID
        /// </summary>
        public string LoginID { get; set; }
        /// <summary>
        /// 取得或设置要查询用户的角色ID
        /// </summary>
        public int[] UserRoleID { get; set; }
        /// <summary>
        /// 取得或设置要查询用户是否自定义权限
        /// </summary>
        public bool? IsCustomPermission { get; set; }
        /// <summary>
        /// 取得或设置要查询用户是否超级用户
        /// </summary>
        public bool? IsSuper { get; set; }
        /// <summary>
        /// 取得用户列表的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
