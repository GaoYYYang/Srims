using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using Srims.Server.Business.Users;
using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 外协单位
    /// </summary>
    public partial class Outsourcing : Entity<Outsourcing>
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
            list.Add(new LogDescriptionItem { Name = "IsVerify", Title = "是否已经审核" });
            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });

            return list.ToArray();
        }



    }

    /// <summary>
    /// 外协单位的业务扩展
    /// </summary>
    public static class OutsourcingBusinessExtension
    {
    }
    /// <summary>
    /// 外协单位的查询扩展
    /// </summary>
    public static class OutsourcingQueryExtension
    {

        /// <summary>
        /// 取得外协单位查询结果
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<Outsourcing> Query(this IQueryable<Outsourcing> query, OutsourcingUnitQueryInformation queryInformation, IDatabase database, User user)
        {
            if (query == null)
                throw new ArgumentException("query");
            if (queryInformation == null)
                throw new ArgumentException("queryInformation");

            //查询
            var q = query.GetOutsourcings(queryInformation, database, user);

            //排序
            q = q.SortOutsourcings(queryInformation);
            return new QueryResult<Outsourcing>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList()
                , q.Count());

        }
        /// <summary>
        /// 获取外协单位
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        private static IQueryable<Outsourcing> GetOutsourcings(this IQueryable<Outsourcing> query, OutsourcingUnitQueryInformation queryInformation, IDatabase database, User user)
        {
            var q = query;
            if (queryInformation.TaxNumber != null ||
                queryInformation.RepresentativeName != null ||
                queryInformation.RegisteredCardNumber != null ||
                queryInformation.RegisteredCapitalStart != null ||
                queryInformation.RegisteredCapitalEnd != null ||
                queryInformation.OrganizationCode != null ||
                queryInformation.Name != null ||
                queryInformation.ManagementType != null ||
                queryInformation.FieldCompanyType != null ||
                 queryInformation.IsVerify != null
                )
            {
                if (queryInformation.Name != null)
                {
                    queryInformation.Name = queryInformation.Name.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.Name))
                        q = q.Where(e => e.Name.StartsWith(queryInformation.Name) || e.Name.Contains(queryInformation.Name));
                }
                if (queryInformation.RepresentativeName != null)
                {
                    queryInformation.RepresentativeName = queryInformation.RepresentativeName.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.RepresentativeName))
                        q = q.Intersect(database.Outsourcings.Where(e => e.LegalRepresentativeName == queryInformation.RepresentativeName));
                }
                if (queryInformation.IsVerify != null)
                {
                    queryInformation.IsVerify = queryInformation.IsVerify.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.IsVerify))
                        q = q.Intersect(database.Outsourcings.Where(e => e.IsVerify == queryInformation.IsVerify));
                }
                if (queryInformation.RegisteredCapitalStart != null)
                {
                    queryInformation.RegisteredCapitalStart = queryInformation.RegisteredCapitalStart.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.RegisteredCapitalStart))
                        q = q.Intersect(database.Outsourcings.Where(e => Convert.ToDouble(e.RegisteredCapital) >= Convert.ToDouble(queryInformation.RegisteredCapitalStart)));
                }
                if (queryInformation.RegisteredCapitalEnd != null)
                {
                    queryInformation.RegisteredCapitalEnd = queryInformation.RegisteredCapitalEnd.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.RegisteredCapitalEnd))
                        q = q.Intersect(database.Outsourcings.Where(e => Convert.ToDouble(e.RegisteredCapital) >= Convert.ToDouble(queryInformation.RegisteredCapitalEnd)));
                }
                if (queryInformation.RegisteredCardNumber != null)
                {
                    queryInformation.RegisteredCardNumber = queryInformation.RegisteredCardNumber.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.RegisteredCardNumber))
                        q = q.Intersect(database.Outsourcings.Where(e => e.RegisteredCardNumber == queryInformation.RegisteredCardNumber));
                }
                if (queryInformation.ManagementType != null)
                {
                    queryInformation.ManagementType = queryInformation.ManagementType.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.ManagementType))
                        q = q.Intersect(database.Outsourcings.Where(e => e.ManagementType == queryInformation.ManagementType));
                }
                if (queryInformation.OrganizationCode != null)
                {
                    queryInformation.OrganizationCode = queryInformation.OrganizationCode.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.OrganizationCode))
                        q = q.Intersect(database.Outsourcings.Where(e => e.OrganizationCode == queryInformation.OrganizationCode));
                }
                if (queryInformation.TaxNumber != null)
                {
                    queryInformation.TaxNumber = queryInformation.TaxNumber.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.TaxNumber))
                        q = q.Intersect(database.Outsourcings.Where(e => e.TaxNumber == queryInformation.TaxNumber));
                }
                if (queryInformation.FieldCompanyType != null)
                {
                    queryInformation.FieldCompanyType = queryInformation.FieldCompanyType.Trim();
                    if (!string.IsNullOrEmpty(queryInformation.FieldCompanyType))
                        q = q.Intersect(database.Outsourcings.Where(e => e.CompanyType == queryInformation.FieldCompanyType));
                }
            }
            if (user.IsExpert)
            {
                var expert = database.Experts.SingleOrDefault(c => c.User == user);
                q = q.Intersect(database.Outsourcings.Where(c => c.Adder == expert));
            }
            return q;
        }
        private static IQueryable<Outsourcing> SortOutsourcings(this IQueryable<Outsourcing> outsourcings, OutsourcingUnitQueryInformation queryInformation)
        {
            if (queryInformation.SortInfo == null)
                outsourcings = outsourcings.OrderByDescending(a => a.CreateDateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("Name"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.Name) : outsourcings.OrderByDescending(a => a.Name);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("TaxNumber"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.TaxNumber) : outsourcings.OrderByDescending(a => a.TaxNumber);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("CreateDateTime"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.CreateDateTime) : outsourcings.OrderByDescending(a => a.CreateDateTime);
            else if (queryInformation.SortInfo.Field.EqualIgnoreCase("IsVerify"))
                outsourcings = queryInformation.SortInfo.Direction == SortDirection.ASC ? outsourcings.OrderBy(a => a.IsVerify) : outsourcings.OrderByDescending(a => a.IsVerify);
            return outsourcings;
        }
        /// <summary>
        /// 搜索外协单位
        /// </summary>
        /// <param name="query">查询</param>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        public static IList<Outsourcing> SearchOutsourcing(this IQueryable<Outsourcing> query, string keyword)
        {
            if (keyword != null) keyword = keyword.Trim();

            var q = query
                .Where(e => e.Name.Contains(keyword)
                    || e.LegalRepresentativeName.Contains(keyword));
            //carlsirce2013.2.27 五级的外协不能分配经费
            q = q.Intersect(query
                .Where(e => e.ManagementType != "五级"));
            return q.ToList();
        }

        public static Outsourcing GetOutsourcingByName(this IQueryable<Outsourcing> query, string name)
        {
            if (name == null)
                return null;
            else
                name = name.Trim();

            return query.Where(e => e.Name == name).SingleOrDefault();
        }
        /// <summary>
        /// 获取外协单位当年已分配的数额
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static long GetAllocatedAmountThisYear(this Outsourcing outsourcing, IDatabase database)
        {
            var list = database.VoucherOuts.Where(c => c.Corporation == outsourcing.Name && c.Voucher.FundAllocation.CurrentState.DateTime.Year == System.DateTime.Now.Year).ToList();
            long allocatedAmount = 0;
            foreach (var item in list)
            {
                if (item.CheckPassed())
                {
                    allocatedAmount += item.Amount;
                }
            }
            return allocatedAmount;
        }
        /// <summary>
        /// 获取外协单位当年还可下拨的金额
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static long GetRestAmountThisYear(this Outsourcing outsourcing, IDatabase database)
        {
            if (outsourcing.ManagementType == "三级" || outsourcing.ManagementType == "四级")
                return Convert.ToInt64(Convert.ToDouble(outsourcing.RegisteredCapital) * 500000) - outsourcing.GetAllocatedAmountThisYear(database);
            else
                return 99999000000;
        }
        /// <summary>
        /// 是否外协单位本年已达到最大分配额度
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static string CheckOutsourcingReachMaxAmount(this Outsourcing outsourcing, IDatabase database)
        {
            if (outsourcing.ManagementType == "四级")
            {
                if (string.IsNullOrEmpty(outsourcing.RegisteredCapital))
                {
                    return "true";
                }
                long allocated = outsourcing.GetAllocatedAmountThisYear(database);
                if (allocated >= 2000000 * Convert.ToInt64(outsourcing.RegisteredCapital))
                {
                    return "true";
                }
                else
                {
                    return (2000000 * Convert.ToInt64(outsourcing.RegisteredCapital) - allocated).ToString();
                }
            }
            return "99999000000";
        }

    }
    /// <summary>
    /// 外协单位的权限扩展
    /// </summary>
    public static class OutsourcingPermissionExtension
    {
        /// <summary>
        /// 用户是否具有编辑外协单位的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditOutsourcing(this User user, IDatabase database)
        {
            if (user.IsExpert)
                return false;
            return true;
        }
        /// <summary>
        /// 用户是否具有编辑外协单位的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static int HasPermission_Verfiy(this User user, IDatabase database)
        {
            if (user.IsExpert)
                return 0;
            return 1;
        }
        /// <summary>
        /// 用户能否编辑外协单位
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditOutsourcing(this User user, IDatabase database)
        {
            return user.HasPermission_EditOutsourcing(database);
        }
        /// <summary>
        /// 用户是否具有删除外协单位的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteOutsourcing(this User user, IDatabase database)
        {
            return user.HasPermission_EditOutsourcing(database);
        }
        /// <summary>
        /// 用户能否删除外协单位
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDeleteOutsourcing(this User user, IDatabase database)
        {
            return user.HasPermission_DeleteOutsourcing(database);
        }
    }
}
