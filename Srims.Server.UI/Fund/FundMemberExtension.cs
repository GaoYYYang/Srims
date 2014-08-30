using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费成员的相关扩展
    /// </summary>
    public static class FundMemberExtension
    {
        /// <summary>
        ///  经费成员的显示扩展
        /// </summary>
        /// <param name="fundmember"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this  FundMember fundmember, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", fundmember.ID);
            response.WriteTagWithValue("AccountBookNumber", fundmember.AccountBookNumber);
            response.WriteTagWithValue("ExpertName", fundmember.Expert.Name);
            response.WriteTagWithValue("ExpertNumber", fundmember.Expert.Number);
            response.WriteTagWithValue("ExpertId", fundmember.ExpertID);
            response.WriteTagWithValue("IsExpertSecondCollege", fundmember.IsExpertSecondCollege);

            response.WriteTagWithValue("HasPermission_ResetAccountBookNumber", user.HasPermission_ResetAccountBookNumber(fundmember, database)); ;
            response.WriteTagWithValue("CanResetAccountBookNumber", user.CanResetAccountBookNumber(fundmember, database));
        }
    }
}
