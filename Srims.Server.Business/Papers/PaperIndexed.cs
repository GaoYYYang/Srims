using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文收录信息
    /// </summary>
    public partial class PaperIndexed : Entity<PaperIndexed>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "PaperID", Title = "对应论文的ID" });
            list.Add(new LogDescriptionItem { Name = "Indexed", Title = "收录" });

            return list.ToArray();
        }
    }

    /// <summary>
    /// 论文收录信息的业务扩展
    /// </summary>
    public static class PaperIndexedBusinessExtension
    {
    }
    /// <summary>
    /// 论文收录信息的查询扩展
    /// </summary>
    public static class PaperIndexedQueryExtension
    {
    }
    /// <summary>
    /// 论文收录信息的权限扩展
    /// </summary>
    public static class PaperIndexedPermissionExtension
    {
    }
}
