using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;
using System.Web;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Projects;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 凭单状态历史扩展
    /// </summary>
    public static class VoucherStateHistoryExtension
    {
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="voucherStateHistory"></param>
        /// <param name="response"></param>
        public static void Show(this VoucherStateHistory voucherStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("DateTime", voucherStateHistory.DateTime);
            response.WriteTagWithValue("Operator", voucherStateHistory.Operator);
            response.WriteTagWithValue("Remark", voucherStateHistory.Remark);
            response.WriteTagWithValue("State", voucherStateHistory.State);
        }
    }
}
