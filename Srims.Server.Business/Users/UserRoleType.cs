using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 用户角色类型
    /// </summary>
    public enum UserRoleType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 管理员
        /// </summary>
        Administrator = 1,
        /// <summary>
        /// 专家
        /// </summary>
        Expert = 2,
        /// <summary>
        /// 企业
        /// </summary>
        Corporation = 2,
    }
}
