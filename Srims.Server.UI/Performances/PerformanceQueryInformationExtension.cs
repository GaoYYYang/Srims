using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Common;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Performances;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效查询条件扩展
    /// </summary>
    public static class PerformanceQueryInformationExtension
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static PerformanceQueryInformation GetPerformanceQueryInformation(this HttpRequest request, User user)
        {
            var performanceQueryInformation = new PerformanceQueryInformation();
            performanceQueryInformation.Start = request.GetQueryInformation_Start();
            performanceQueryInformation.Limit = request.GetQueryInformation_Limit();


            performanceQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();
            performanceQueryInformation.TypeName = request.GetString("TypeName");

            performanceQueryInformation.ProjectName = request.GetString("ProjectName");
            performanceQueryInformation.PrincipalName = request.GetString("ExpertName");
            performanceQueryInformation.IsCanceled = request.GetBoolean("IsCanceled");
            performanceQueryInformation.IsAllocated = request.GetBoolean("IsAllocated");
            performanceQueryInformation.IsCanceled2 = request.GetBoolean("IsCanceled2");
            performanceQueryInformation.IsAllocated2 = request.GetBoolean("IsAllocated2");
            performanceQueryInformation.ProjectNumber = request.GetString("ProjectNumber");

            performanceQueryInformation.StartDate = request.GetDateRange("StartDate");
            performanceQueryInformation.AllocationDate = request.GetDateRange("AllocationDate");
            performanceQueryInformation.AdjustDate = request.GetDateRange("AdjustDate");
            return performanceQueryInformation;
        }
    }
}