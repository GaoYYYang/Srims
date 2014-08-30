using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 外协单位
    /// </summary>
    public partial class OutsourcingUnit : Entity<OutsourcingUnit>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "Name", Title = "单位名称" });
            list.Add(new LogDescriptionItem { Name = "LegalRepresentativeName", Title = "法定代表人姓名" });
            list.Add(new LogDescriptionItem { Name = "RegisteredCapital", Title = "组册资本" });
            list.Add(new LogDescriptionItem { Name = "RegisteredCardNumber", Title = "注册号" });
            list.Add(new LogDescriptionItem { Name = "OrganizationCode", Title = "组织代码" });
            list.Add(new LogDescriptionItem { Name = "TaxNumber", Title = "税号" });
            list.Add(new LogDescriptionItem { Name = "CompanyType", Title = "公司类型" });
            list.Add(new LogDescriptionItem { Name = "ManagementType", Title = "管理类别" });
            list.Add(new LogDescriptionItem { Name = "BusinessScope", Title = "经营范围" });
            list.Add(new LogDescriptionItem { Name = "CreateDateTime", Title = "成立时间" });
            list.Add(new LogDescriptionItem { Name = "DealDateTimeStart", Title = "营业期限开始" });
            list.Add(new LogDescriptionItem { Name = "DealDateTimeEnd", Title = "营业期限结束" });
            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });

            return list.ToArray();
        }
    }

    /// <summary>
    /// 外协单位的业务扩展
    /// </summary>
    public static class OutsourcingUnitBusinessExtension
    {
    }
    /// <summary>
    /// 外协单位的查询扩展
    /// </summary>
    public static class OutsourcingUnitQueryExtension
    {
        /// <summary>
        /// 取得外协单位查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<OutsourcingUnit> Query(this IQueryable<OutsourcingUnit> query, OutsourcingUnitQueryInformation queryInformation)
        {
            if (query == null)
                throw new ArgumentException("query");
            if (queryInformation == null)
                throw new ArgumentException("queryInformation");

            //查询
            var q = query.GetOutsourcings(queryInformation);

            //排序
            q = q.SortOutsourcings(queryInformation);
            return new QueryResult<OutsourcingUnit>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList()
                , q.Count());

        }
        /// <summary>
        /// 获取外协单位
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        private static IQueryable<OutsourcingUnit> GetOutsourcings(this IQueryable<OutsourcingUnit> query, OutsourcingUnitQueryInformation queryInformation)
        {
            var q = query;
            return q;
        }
        private static IQueryable<OutsourcingUnit> SortOutsourcings(this IQueryable<OutsourcingUnit> outsourcings, OutsourcingUnitQueryInformation queryInformation)
        {
            if (queryInformation.SortInfo == null)
                outsourcings = outsourcings.OrderByDescending(a => a.CreateDateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("Name"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.Name) : outsourcings.OrderByDescending(a => a.Name);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("TaxNumber"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.TaxNumber) : outsourcings.OrderByDescending(a => a.TaxNumber);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("CreateDateTime"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.CreateDateTime) : outsourcings.OrderByDescending(a => a.CreateDateTime);

            return outsourcings;
        }
    }
    /// <summary>
    /// 外协单位的权限扩展
    /// </summary>
    public static class OutsourcingUnitPermissionExtension
    {
       
    }
}
