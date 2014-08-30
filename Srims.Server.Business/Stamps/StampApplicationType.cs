using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Stamps
{
    /// <summary>
    /// 文印申请类型
    /// </summary>
    public partial class StampApplicationType : Entity<StampApplicationType>
    {
        /// <summary>
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
            var stampApplications = database.StampApplications.Where(c => c.StampApplicationType == this).ToList();
            if (stampApplications.Count == 0)
                return true;
            else
                return false;

        }
    }

    /// <summary>
    /// 文印申请类型的业务扩展
    /// </summary>
    public static class StampApplicationTypeBusinessExtension
    {
    }
    /// <summary>
    /// 文印申请类型的查询扩展
    /// </summary>
    public static class StampApplicationTypeQueryExtension
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static QueryResult<StampApplicationType> Query(this IQueryable<StampApplicationType> query, StampApplicationTypeQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            if (queryInformation.IsProjectRelated != null)
                query = query.Where(c => c.IsProjectRelated == queryInformation.IsProjectRelated);
            if (queryInformation.StampApplicationTypeGroupID != null)
                query = query.Where(c => c.StampApplicationTypeGroupID == queryInformation.StampApplicationTypeGroupID);

            if (queryInformation.IsTwiceCancer != null)
                query = query.Where(c => c.IsProjectRelated == queryInformation.IsTwiceCancer);

            if (queryInformation.ID != null)
                query = query.Where(c => c.ID == queryInformation.ID);
            query = SortQuery(query, queryInformation.SortInfor);

            return new QueryResult<StampApplicationType>(query.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), query.Count());
        }
        private static IQueryable<StampApplicationType> SortQuery(IQueryable<StampApplicationType> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(v => v.Name);
            else if (sortInfo.Field.EqualIgnoreCase("IsProjectRelated"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.IsProjectRelated)
                    : query.OrderByDescending(pt => pt.IsProjectRelated);
            else if (sortInfo.Field.EqualIgnoreCase("IsTwiceCancer"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(pt => pt.IsTwiceCancer)
                    : query.OrderByDescending(pt => pt.IsTwiceCancer);
            else return query = query.OrderByDescending(v => v.Name);
        }
    }

    /// <summary>
    /// 文印申请类型的权限扩展
    /// </summary>
    public static class StampApplicationTypePermissionExtension
    {
    }
}
