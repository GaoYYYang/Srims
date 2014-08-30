using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common
{
    /// <summary>
    /// 取得金额
    /// </summary>
    public static class Money
    { /// <summary>
        /// 资金的单位
        /// </summary>
        public const long MONEY_UNIT = 10000 * 100;
        /// <summary>
        /// 转化为金额 
        /// </summary>
        /// <param name="amountString"></param>
        /// <returns></returns>
        public static long? ToMoney(this string amountString)
        {
            double amount = 0;
            if (!Double.TryParse(amountString, out amount))
                return null;

            return Convert.ToInt64(amount * MONEY_UNIT);
        }
    }
}
