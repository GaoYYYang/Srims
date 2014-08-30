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
using Srims.Server.Business.Common;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 公司管理类型显示
    /// </summary>
    public static class CompanyManageTypeExtension
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="response"></param>
        /// <param name="i"></param>
        public static void ShowManageType(HttpResponse response, int i)
        {
            response.WriteTagWithValue("ID", i);
            response.WriteTagWithValue("Name", i);
            response.WriteTagWithValue("Type", i);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="response"></param>
        public static void Show(this CompanyManangeType companyMannangeType, HttpResponse response)
        {
            for (int i = 1; i < 6; i++)
            {
                ShowManageType(response, i);
            }
        }

    }
}
