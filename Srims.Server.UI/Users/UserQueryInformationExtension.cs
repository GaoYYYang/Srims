using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Users
{
    /// <summary>
    /// 用户查询相关扩展
    /// </summary>
    public static class UserQueryInformationExtension
    {
        /// <summary>
        /// 用户查询条件的显示扩展
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static UserQueryInformation GetUserQueryInformation(this HttpRequest request)
        {
            var userQueryInformation = new UserQueryInformation();

            userQueryInformation.Start = request.GetQueryInformation_Start();
            userQueryInformation.Limit = request.GetQueryInformation_Limit();
            userQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            userQueryInformation.Name = request.GetString("Name");
            userQueryInformation.LoginID = request.GetString("LoginID");
            userQueryInformation.UserRoleID = request.GetList<int>("UserRole");
            userQueryInformation.IsSuper = request.GetBoolean("IsSuper");

            return userQueryInformation;
        }
    }
}
