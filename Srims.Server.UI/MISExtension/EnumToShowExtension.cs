using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Documents;

namespace Srims.Server.UI.MISExtension
{
    /// <summary>
    /// 枚举显示扩展
    /// </summary>
    public static class EnumToShowExtension
    {
        /// <summary>
        /// 合同类型显示扩展
        /// </summary>
        /// <param name="contractType"></param>
        /// <returns></returns>
        public static string ToShow(this ContractType contractType)
        {
            switch (contractType)
            {
                case ContractType.MainContract: return "主合同";
                case ContractType.OutContract: return "外协合同";
                default: return "未知";
            }
        }
    }
}
