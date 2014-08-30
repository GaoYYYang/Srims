using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Patents
{
    /// <summary>
    /// 专利代理机构
    /// </summary>
    public partial class PatentAgency : Entity<PatentAgency>
    {

        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(_Name), "名称不能为空");
        }
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetpatentAgencyDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "Name", Title = "专利机构名称" });
            list.Add(new LogDescriptionItem { Name = "Contract", Title = "联系方式" });

            return list.ToArray();
        }
    }

    /// <summary>
    /// 专利代理机构的业务扩展
    /// </summary>
    public static class PatentAgencyBusinessExtension
    {
    }
    /// <summary>
    /// 专利代理机构的查询扩展
    /// </summary>
    public static class PatentAgencyQueryExtension
    {
        /// <summary>
        /// 取得所有代理机构
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static List<PatentAgency> GetPatentAgencys(this IQueryable<PatentAgency> query)
        {
            return query.Distinct().ToList();
        }
        /// <summary>
        /// 筛选专利代理机构
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<PatentAgency> GetPatentAgency(this IQueryable<PatentAgency> query, PatentAgencyQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            query = query.AsQueryable();

            if (queryInformation.AgencyName != null) queryInformation.AgencyName = queryInformation.AgencyName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.AgencyName))
                query = query.Where(pa => pa.Name.StartsWith(queryInformation.AgencyName));

            if (queryInformation.Contract != null) queryInformation.Contract = queryInformation.Contract.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Contract))
                query = query.Where(pa => pa.Contract.StartsWith(queryInformation.Contract));

            query = SortQuery(query, queryInformation.SortInfo);

            return new QueryResult<PatentAgency>(query.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), query.Count());
        }
        private static IQueryable<PatentAgency> SortQuery(IQueryable<PatentAgency> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(v => v.ID);
            else if (sortInfo.Field.EqualIgnoreCase("Contract"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.Contract)
                    : query.OrderByDescending(v => v.Contract);
            else if (sortInfo.Field.EqualIgnoreCase("AgencyName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(v => v.Name)
                    : query.OrderByDescending(v => v.Name);

            else
                return query = query.OrderByDescending(v => v.ID);
        }
        /// <summary>
        /// 取得机构名称相同的机构
        /// </summary>
        /// <param name="query"></param>
        /// <param name="AgencyName"></param>
        /// <param name="agencyId"></param>
        /// <returns></returns>
        public static int GetPatentAgencyOfSameName(this IQueryable<PatentAgency> query, string AgencyName, int? agencyId)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (agencyId != null)
                return query.Where(q => q.Name == AgencyName && (agencyId.HasValue && agencyId > 0 ? q.ID != agencyId : true)).Count();
            else
                return query.Where(q => q.Name == AgencyName).Count();
        }

    }
    /// <summary>
    /// 专利代理机构的权限扩展
    /// </summary>
    public static class PatentAgencyPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有编辑该专利代理机构的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditPatentAgency(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManagePatent, database);
        }
        /// <summary>
        /// 用户能够编辑
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditPatentAgency(this User user, IDatabase database)
        {
            return user.HasPermission_EditPatentAgency(database);
        }
    }
}
