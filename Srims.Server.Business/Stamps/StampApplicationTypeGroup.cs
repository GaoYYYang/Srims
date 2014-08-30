using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印申请类型组
    /// </summary>
    public partial class StampApplicationTypeGroup : Entity<StampApplicationTypeGroup>
    {
        // <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        // <summary>
        /// 是否可以删除
        /// </summary>
        /// <returns></returns>
        public bool Can_Delete(IDatabase database)
        {
            var stampAllicationTypes = database.StampApplicationTypes.Where(c => c.StampApplicationTypeGroup == this).ToList();
            if (stampAllicationTypes.Count == 0)
                return true;
            else
            {
                var stampApplications = database.StampApplications.Where(c => stampAllicationTypes.Contains(c.StampApplicationType)).ToList();
                if (stampApplications.Count == 0)
                    return true;
                else
                    return false;
            }
        }
    }

    /// <summary>
    /// 文印申请类型组的业务扩展
    /// </summary>
    public static class StampApplicationTypeGroupBusinessExtension
    {
    }
    /// <summary>
    /// 文印申请类型组的查询扩展
    /// </summary>
    public static class StampApplicationTypeGroupQueryExtension
    {
    }
    /// <summary>
    /// 文印申请类型组的权限扩展
    /// </summary>
    public static class StampApplicationTypeGroupPermissionExtension
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static QueryResult<StampApplicationTypeGroup> Query(this IQueryable<StampApplicationTypeGroup> query, QueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            return new QueryResult<StampApplicationTypeGroup>(query.OrderByDescending(c => c.Name).Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), query.Count());
        }

    }
}
