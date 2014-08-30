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
    /// 杂志学科分类信息
    /// </summary>
    public partial class MagazineSubjectClass : Entity<MagazineSubjectClass>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "MagazineID", Title = "对应的杂志ID" });
            list.Add(new LogDescriptionItem { Name = "SubjectClass", Title = "学科分类" });

            return list.ToArray();
        }
    }

    /// <summary>
    /// 杂志学科分类信息的业务扩展
    /// </summary>
    public static class MagazineSubjectClassBusinessExtension
    {
    }
    /// <summary>
    /// 杂志学科分类信息的查询扩展
    /// </summary>
    public static class MagazineSubjectClassQueryExtension
    {
    }
    /// <summary>
    /// 杂志学科分类信息的权限扩展
    /// </summary>
    public static class MagazineSubjectClassPermissionExtension
    {
    }
}
