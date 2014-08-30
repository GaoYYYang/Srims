using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志任职
    /// </summary>
    public partial class MagazineOccupation : Entity<MagazineOccupation>
    {
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Occupation), "职务不能为空");
            validater.AddCondition(_Magazine.Entity != null, "对应的期刊不能为空");
            validater.AddCondition(_Expert.Entity != null, "对应的专家不能为空");
        }
    }

    /// <summary>
    /// 杂志任职的业务扩展
    /// </summary>
    public static class MagazineOccupationBusinessExtension
    {
    }
    /// <summary>
    /// 杂志任职的查询扩展
    /// </summary>
    public static class MagazineOccupationQueryExtension
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static QueryResult<MagazineOccupation> Query(this IQueryable<MagazineOccupation> query, QueryInformation queryInformation, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query;

            return new QueryResult<MagazineOccupation>(q.ToList().Distinct().Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());
        }
        /// <summary>
        /// 取得期刊任职
        /// </summary>
        /// <param name="query"></param>
        /// <param name="magazineID"></param>
        /// <returns></returns>
        public static IList<MagazineOccupation> GetByMagazineID(this IQueryable<MagazineOccupation> query, int magazineID)
        {
            return query
                .Where(mo => mo.MagazineID == magazineID)
                .ToList();
        }
    }
    /// <summary>
    /// 杂志任职的权限扩展
    /// </summary>
    public static class MagazineOccupationPermissionExtension
    {
    }
}
