using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费下拨状态历史相关扩展
    /// </summary>
    public static class FundDescendStateHistoryExtension
    {
        /// <summary>
        /// 经费分配状态的显示扩展
        /// </summary>
        /// <param name="fundDescendStateHistory"></param>
        /// <param name="response"></param>
        public static void Show(this FundDescendStateHistory fundDescendStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("DateTime", fundDescendStateHistory.DateTime);
            response.WriteTagWithValue("Operator", fundDescendStateHistory.Operator);
            response.WriteTagWithValue("Remark", fundDescendStateHistory.Remark);
            response.WriteTagWithValue("State", fundDescendStateHistory.State);
        }
    }
}

