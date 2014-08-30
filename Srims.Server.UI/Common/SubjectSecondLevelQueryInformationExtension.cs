using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Common;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 二级学科代码查询条件相关扩展
    /// </summary>
    public static class SubjectSecondLevelQueryInformationExtension
    {
        /// <summary>
        /// 二级学科代码查询扩展
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static SubjectSecondLevelQueryInformation GetSubjectSecondQueryInformation(this HttpRequest request)
        {
            var subjectSecondtLevelQueryInformation = new SubjectSecondLevelQueryInformation();
            subjectSecondtLevelQueryInformation.Start = request.GetQueryInformation_Start();
            subjectSecondtLevelQueryInformation.Limit = request.GetQueryInformation_Limit();

            subjectSecondtLevelQueryInformation.Name = request.GetString("Name");
            subjectSecondtLevelQueryInformation.Code = request.GetString("Code");
            subjectSecondtLevelQueryInformation.SubjectFirstLevelID = request.GetString("SubjectFirstLevelName");

            return subjectSecondtLevelQueryInformation;
        }

    }
}
