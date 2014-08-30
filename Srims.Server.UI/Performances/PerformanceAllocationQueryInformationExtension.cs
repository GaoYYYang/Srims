using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;


namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效分配查询条件相关扩展
    /// </summary>
    public static class PerformanceAllocationQueryInformationExtension
    {
        /// <summary>
        /// 取得绩效分配查询条件
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static PerformanceAllocationQueryInformation GetPerformanceAllocationQueryInformation(this HttpRequest request, User user)
        {
            var performanceAllocationQueryInformation = new PerformanceAllocationQueryInformation();
            performanceAllocationQueryInformation.Start = request.GetQueryInformation_Start();
            performanceAllocationQueryInformation.Limit = request.GetQueryInformation_Limit();
            performanceAllocationQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            performanceAllocationQueryInformation.TypeName = request.GetString("TypeName");
            performanceAllocationQueryInformation.States = request.GetEnumList<PerformanceAllocationState>("PerformanceAllocationState");
            performanceAllocationQueryInformation.PrincipalName = request.GetString("ExpertName");
            performanceAllocationQueryInformation.ProjectName = request.GetString("ProjectName");
            performanceAllocationQueryInformation.ProjectNumber = request.GetString("ProjectNumber");

            performanceAllocationQueryInformation.CanAllocate = request.GetBoolean("CanAllocate");
            performanceAllocationQueryInformation.IsHorizontal = request.GetBoolean("IsHorizontal");
            return performanceAllocationQueryInformation;
        }
    }
}
