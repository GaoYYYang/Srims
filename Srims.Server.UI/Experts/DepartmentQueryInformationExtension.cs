using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Experts;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Experts
{
    /// <summary>
    /// 部门查询相关扩展
    /// </summary>
    public static class DepartmentQueryInformationExtension
    {
        /// <summary>
        /// 部门查询条件显示扩展
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static DepartmentQueryInformation GetDepartmentQueryInformation(this HttpRequest request)
        {
            var departmentQueryInformation = new DepartmentQueryInformation();
            departmentQueryInformation.sortInfor = request.GetQueryCondition_SortInfo();
            departmentQueryInformation.Start = request.GetQueryInformation_Start();
            departmentQueryInformation.Limit = request.GetQueryInformation_Limit();

            departmentQueryInformation.Name = request.GetString("Name");
            departmentQueryInformation.Code = request.GetString("Code");

            return departmentQueryInformation;
        }
    }
}
