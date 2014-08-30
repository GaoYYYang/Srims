using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Performances;
using System.Web;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Performances
{
    /// <summary>
    /// 绩效凭单状态历史扩展
    /// </summary>
    public static class PerformanceVoucherStateHistoryExtension
    {
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="performanceVoucherStateHistory"></param>
        /// <param name="response"></param>
        public static void Show(this PerformanceVoucherStateHistory performanceVoucherStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("DateTime", performanceVoucherStateHistory.DateTime);
            response.WriteTagWithValue("Operator", performanceVoucherStateHistory.Operator);
            response.WriteTagWithValue("Remark", performanceVoucherStateHistory.Remark);
            response.WriteTagWithValue("State", performanceVoucherStateHistory.State);
        }
    }
}
