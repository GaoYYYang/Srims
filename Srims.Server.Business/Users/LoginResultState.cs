using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 登陆的结果状态
    /// </summary>
    public enum LoginResultState
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 登陆成功
        /// </summary>
        Succeed = 1,

        /// <summary>
        /// 用户名为空
        /// </summary>
        NullUserName = 2,
        /// <summary>
        /// 用户不存在
        /// </summary>
        UserNotFound = 3,

        /// <summary>
        /// 密码为空
        /// </summary>
        NullPassword = 4,
        /// <summary>
        /// 密码错误
        /// </summary>
        WrongPassword = 5,

        /// <summary>
        /// 无效的令牌
        /// </summary>
        InvalidToken = 6,
        /// <summary>
        /// 不允许多人同时登陆
        /// </summary>
        DenyMultiLogin = 7,
        /// <summary>
        /// 用户已被锁定
        /// </summary>
        Locked = 8,
        /// <summary>
        /// 尚未同意用户协议
        /// </summary>
        NotAgreeLicence = 9,
    }
}
