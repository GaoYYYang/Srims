using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Users
{
    /// <summary>
    /// 登陆结果
    /// </summary>
    public class LoginResult
    {
        private LoginResultState _State;
        private UserLoginLog _UserLoginLog;

        /// <summary>
        /// 取得登陆的结果状态
        /// </summary>
        public LoginResultState State
        {
            get { return _State; }
        }
        /// <summary>
        /// 取得该次登陆的日志。当登录失败时，不能读取此值，否则会抛出异常。
        /// </summary>
        public UserLoginLog UserLoginLog
        {
            get
            {
                if (_State != LoginResultState.Succeed)
                    throw new InvalidOperationException("登陆失败，无法读取登录用户。");
                return _UserLoginLog;
            }
        }

        /// <summary>
        /// 构造登陆结果
        /// </summary>
        /// <param name="state">登陆结果状态</param>
        /// <param name="userLoginLog">该次登陆的日志</param>
        public LoginResult(LoginResultState state, UserLoginLog userLoginLog)
        {
            this._State = state;
            this._UserLoginLog = userLoginLog;
        }
    }
}
