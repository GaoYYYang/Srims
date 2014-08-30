using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 项目权限操作
    /// </summary>
    public enum PermissionOperation
    {
        /// <summary>
        /// 不指定
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 查看权限
        /// </summary>
        Show = 1,
        /// <summary>
        /// 管理权限
        /// </summary>
        Edit = 2,
        /// <summary>
        /// 院系管理员使用
        /// </summary>
        College = 3,
    }
}
