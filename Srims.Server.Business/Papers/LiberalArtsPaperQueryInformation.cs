using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Query;

namespace Srims.Server.Business.Papers
{
    public class LiberalArtsPaperQueryInformation : QueryInformation
    {
        /// <summary>
        /// 取得或设置基本查询信息
        /// </summary>
        public LiberalArtsPaperQueryInformation_Basic Basic { get; set; }
        /// <summary>
        /// 取得或设置基本其他基本信息
        /// </summary>
        public LiberalArtsPaperQueryInformation_OtherBasic OtherBasic { get; set; }
        /// <summary>
        /// 取得或设置作者查询信息
        /// </summary>
        public PaperQueryInformation_Author Author { get; set; }
       
        public SortInfo SortInfo { get; set; }
    }
}
