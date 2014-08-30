using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费到账记录副本
    /// </summary>
    public partial class FinanceBak : Entity<FinanceBak>
    {
    }

    /// <summary>
    /// 经费到账记录副本的业务扩展
    /// </summary>
    public static class FinanceBakBusinessExtension
    {
    }
    /// <summary>
    /// 经费到账记录副本的查询扩展
    /// </summary>
    public static class FinanceBakQueryExtension
    {
        /// <summary>
        /// 取得经费到帐
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <returns></returns>
        public static QueryResult<FinanceBak> GetFinanceBak(this IQueryable<FinanceBak> query, QueryInformation queryInformation)
        {
            query = query.OrderByDescending(q => q.ReceivedDate);
            return new QueryResult<FinanceBak>(query.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), query.Count());
        }
        /// <summary>
        /// 判断经费到帐是否存在
        /// </summary>
        /// <param name="query"></param>
        /// <param name="voucherNumber">凭单号</param>
        /// <param name="receiveDate">到帐日期</param>
        /// <param name="amount">金额</param>
        /// <param name="description">描述</param>
        /// <returns></returns>
        public static bool IsFinanceExist(this IQueryable<FinanceBak> query, string voucherNumber, DateTime receiveDate, long amount, string description)
        {
            if (query == null)
                throw new Exception("query");

            return query.Count(q => q.VoucherNumber == voucherNumber && q.Abstract.Trim() == description.Trim() && q.Amount == amount && q.ReceivedDate == receiveDate) != 0;
        }
        /// <summary>
        /// 取得经费到账记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="voucherNumber"></param>
        /// <param name="receiveDate"></param>
        /// <param name="amount"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        public static FinanceBak GetFinanceBakForUpdate(this IQueryable<FinanceBak> query, string voucherNumber, DateTime receiveDate, long amount, string description)
        {
            if (query == null)
                throw new Exception("query");

            return query.SingleOrDefault(q => q.VoucherNumber == voucherNumber && q.Abstract.Trim() == description.Trim() && q.Amount == amount && q.ReceivedDate == receiveDate);
        }
    }
    /// <summary>
    /// 经费到账记录副本的权限扩展
    /// </summary>
    public static class FinanceBakPermissionExtension
    {

    }
}
