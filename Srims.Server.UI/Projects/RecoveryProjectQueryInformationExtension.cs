using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business.Type;

using Srims.Server.UI.Experts;
using Srims.Server.UI.Fund;
using Srims.Server.UI.Projects;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Projects
{
    public static class RecoveryProjectQueryInformationExtension
    {
        /// <summary>
        /// 取得项目查询条件
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static RecoveryProjectQueryInformation GetRecoveryProjectQueryInformation(this HttpRequest request, User user)
        {
            var projectQueryInformation = new RecoveryProjectQueryInformation();

            projectQueryInformation.Start = request.GetQueryInformation_Start();
            projectQueryInformation.Limit = request.GetQueryInformation_Limit();
            projectQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            projectQueryInformation.Number = request.GetString("Number");
            projectQueryInformation.Name = request.GetString("Name");
            projectQueryInformation.Principal = request.GetString("Principal");
            projectQueryInformation.PrincipalCollege = request.GetString("PrincipalCollege");
            projectQueryInformation.FundAlreadyIn = request.GetMoneyRange("FundAlreadyIn");
            projectQueryInformation.OverheadExpensesAlreadyIn = request.GetMoneyRange("OverheadExpensesAlreadyIn");
            projectQueryInformation.ExpertAttendType = request.GetEnum<ExpertAttendType>("ExpertAttendType");
            return projectQueryInformation;
        }

    }
}
