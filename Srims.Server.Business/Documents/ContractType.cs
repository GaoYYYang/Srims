using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Documents
{
    /// <summary>
    /// 合同类型
    /// </summary>
    public enum ContractType
    {
        /// <summary>
        /// 未知类型
        /// </summary>
        Unkown = 0,
        /// <summary>
        /// 合同
        /// </summary>
        MainContract = 1,
        /// <summary>
        /// 外协合同
        /// </summary>
        OutContract = 2
    }
}
