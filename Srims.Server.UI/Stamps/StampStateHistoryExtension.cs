using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Stamps;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 文印状态历史扩展
    /// </summary>
    public static class StampStateHistoryExtension
    {
        /// <summary>
        /// 显示
        /// </summary>
        /// <param name="stampStateHistory"></param>
        /// <param name="response"></param>
        public static void Show(this StampStateHistory stampStateHistory, HttpResponse response)
        {
            response.WriteTagWithValue("ID", stampStateHistory.ID);
            response.WriteTagWithValue("DateTime", stampStateHistory.DateTime.ToString());
            response.WriteTagWithValue("Operator", stampStateHistory.Operator);
            response.WriteTagWithValue("Remark", stampStateHistory.Remark);
            response.WriteTagWithValue("State", stampStateHistory.State);
        }
    }
}
