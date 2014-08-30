using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Patents
{
    public class PatentQueryInformation_Agency
    {
        /// <summary>
        ///代理机构名称
        /// </summary>
        public string AgencyName { get; set; }
        /// <summary>
        ///代理人
        /// </summary>
        public string Agent { get; set; }
        /// <summary>
        ///代理人联系方式
        /// </summary>
        public string Contract { get; set; } 
    }
}
