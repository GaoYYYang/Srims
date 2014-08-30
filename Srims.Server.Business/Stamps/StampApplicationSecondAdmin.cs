using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 二级审核管理员
    /// </summary>
    public partial class StampApplicationSecondAdmin : Entity<StampApplicationSecondAdmin>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }

    /// <summary>
    /// 二级审核管理员的业务扩展
    /// </summary>
    public static class StampApplicationSecondAdminBusinessExtension
    {
    }
    /// <summary>
    /// 二级审核管理员的查询扩展
    /// </summary>
    public static class StampApplicationSecondAdminQueryExtension
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static QueryResult<StampApplicationSecondAdmin> Query(this IQueryable<StampApplicationSecondAdmin> query, int stampApplicationTypeID, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (stampApplicationTypeID == null)
                throw new ArgumentNullException("stampApplicationTypeID");
            query = query.Where(c => c.StampApplicationTypeID == stampApplicationTypeID);

            return new QueryResult<StampApplicationSecondAdmin>(query.ToList(), query.Count());
        }
    }
    /// <summary>
    /// 二级审核管理员的权限扩展
    /// </summary>
    public static class StampApplicationSecondAdminPermissionExtension
    {
    }
}
