using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business.Type;
using Srims.Server.Business.Fund;

namespace Srims.Server.Business.Statistics
{
    /// <summary>
    /// 经费下拨统计
    /// </summary>
    public static class VoucherStatistic
    {
        private const string VOUCHER_STATISTIC_ITEM = "Voucher";

        private static Dictionary<string, string[]> _GetVoucherDimensionDictionary()
        {
            var dimensionDictionary = new Dictionary<string, string[]>();
            dimensionDictionary.Add("DateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("Expert", new string[] { "Expert", "College" });
            dimensionDictionary.Add("ProjectType", new string[] { "Rank", "Type" });
            dimensionDictionary.Add("StartDate", new string[] { "Year", "YearMonth", "YearMonthDay" });
            dimensionDictionary.Add("FinanceDateTime", new string[] { "Year", "YearMonth", "YearMonthDay" });

            return dimensionDictionary;
        }
        /// <summary>
        /// 统计经费下拨
        /// </summary>
        /// <param name="database">数据库</param>
        /// <param name="queryInformation">查询信息</param>
        /// <param name="columnDimension">列维度</param>
        /// <param name="rowDimension">行维度</param>
        /// <returns></returns>
        public static DataTable StatisticVoucher(this IDatabase database, VoucherQueryInformation queryInformation, Dimension columnDimension, Dimension rowDimension)
        {
            queryInformation.FundAllocationStates = new FundAllocationState[] { FundAllocationState.Passed };
            var idList = database.Vouchers.GetVouchers(queryInformation, database, null).Select(fd => fd.ID).ToArray();

            return Statistic.ExecuteStatistic(database, VOUCHER_STATISTIC_ITEM, idList, _GetVoucherDimensionDictionary(), columnDimension, rowDimension);
        }
    }
    /// <summary>
    /// 总经费统计的权限扩展
    /// </summary>
    public static class VoucherStatisticPermissionExtension
    {
        /// <summary>
        /// 判断用户是否具有项目数目统计权限
        /// </summary>
        public static bool HasPermission_VoucherStatistic(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.Statistic, database)
                || user.HasPermission(PermissionItem.ManageFund, database);
        }
        /// <summary>
        /// 判断用户是否具有项目数目统计视图管理权限
        /// </summary>
        public static bool HasPermission_VoucherStatisticViewManage(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageFund, database);
        }
    }
}
