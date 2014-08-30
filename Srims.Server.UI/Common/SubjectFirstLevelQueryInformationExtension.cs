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
    /// 一级学科查询相关扩展
    /// </summary>
    public static class SubjectFirstLevelQueryInformationExtension
    {
        /// <summary>
        /// 一级学科查询条件显示扩展
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static SubjectFirstLevelQueryInformation GetSubjectFirstQueryInformation(this HttpRequest request)
        {
            var subjectFirstLevelQueryInformation = new SubjectFirstLevelQueryInformation();

            subjectFirstLevelQueryInformation.Start = request.GetQueryInformation_Start();
            subjectFirstLevelQueryInformation.Limit = request.GetQueryInformation_Limit();

            subjectFirstLevelQueryInformation.Name = request.GetString("Name");
            subjectFirstLevelQueryInformation.Code = request.GetString("Code");

            return subjectFirstLevelQueryInformation;
        }

    }
}

