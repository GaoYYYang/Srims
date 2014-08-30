using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Query;
using MIS.Common;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Projects
{
    public class RecoveryProjectQueryInformation:QueryInformation
    {

        /// <summary>
        /// 取得或设置项目的名称或名称首字母
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置项目的编号
        /// </summary>
        public string Number { get; set; }
        /// <summary>
        /// 取得或设置项目负责任的名称或名称首字母
        /// </summary>
        public string Principal { get; set; }
        /// <summary>
        /// 取得或设置项目负责人所在学院的名称
        /// </summary>
        public string PrincipalCollege { get; set; }
        /// <summary>
        /// 取得或设置查询的已分配校内经费
        /// </summary>
        public Range<long> FundAlreadyIn { get; set; }
        /// <summary>
        /// 取得或设置查询的校内已收间接费用(系统)
        /// </summary>
        public Range<long> OverheadExpensesAlreadyIn { get; set; }       
        /// <summary>
        /// 专家的参与方式（负责人，参与，被委托人），仅当用户为专家的时候有用
        /// </summary>
        public ExpertAttendType ExpertAttendType { get; set; }
        /// <summary>
        /// 取得或设置查询的排序方式
        /// </summary>
        public SortInfo SortInfo { get; set; }

    }
}
