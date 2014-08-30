using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 资源
    /// </summary>
    public partial class Resource : Entity<Resource>
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public Resource()
        {
            _Guid = Guid.NewGuid();
        }
    }

    /// <summary>
    /// 资源的业务扩展
    /// </summary>
    public static class ResourceBusinessExtension
    {
    }
    /// <summary>
    /// 资源的查询扩展
    /// </summary>
    public static class ResourceQueryExtension
    {
        /// <summary>
        /// 根据guid取得资源
        /// </summary>
        /// <param name="query"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static Resource GetByGuid(this IQueryable<Resource> query, Guid guid)
        {
            return query.SingleOrDefault(q => q.Guid == guid);
        }
    }
    /// <summary>
    /// 资源的权限扩展
    /// </summary>
    public static class ResourcePermissionExtension
    {
    }
}
