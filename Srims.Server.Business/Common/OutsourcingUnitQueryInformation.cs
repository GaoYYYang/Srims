using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 外协单位查询信息
    /// </summary>
    public class OutsourcingUnitQueryInformation : QueryInformation
    {
        /// <summary>
        /// 
        /// </summary>
        public string Name;

        /// <summary>
        /// 
        /// </summary>
        public string RegisteredCapitalStart;
        /// <summary>
        /// 
        /// </summary>
        public string RegisteredCapitalEnd;
        /// <summary>
        /// 
        /// </summary>
        public string RepresentativeName;
        /// <summary>
        /// 
        /// </summary>
        public string ManagementType;
        /// <summary>
        /// 
        /// </summary>
        public string RegisteredCardNumber;
        /// <summary>
        /// 
        /// </summary>
        public string OrganizationCode;
        /// <summary>
        /// 
        /// </summary>
        public string FieldCompanyType;
        /// <summary>
        /// 
        /// </summary>
        public string TaxNumber;
        /// <summary>
        /// 
        /// </summary>
        public string IsVerify;

        /// <summary>
        /// 取得或设置外协单位的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }
    }
}
