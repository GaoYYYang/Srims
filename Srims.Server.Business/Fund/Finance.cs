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

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 经费到账记录（暂存）
    /// </summary>
    public partial class Finance : Entity<Finance>
    {
        /// <summary>
        /// 可忽略的金额上限（小于100）
        /// </summary>
        public static int CAN_IGNORE_AMOUNT = 9999;
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
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "VoucherNumber", Title = "凭单号" });
            list.Add(new LogDescriptionItem { Name = "Amount", Title = "到款金额(单位：分)" });
            list.Add(new LogDescriptionItem { Name = "ReceivedDate", Title = "到款日期" });
            list.Add(new LogDescriptionItem { Name = "Abstract", Title = "描述" });
            list.Add(new LogDescriptionItem { Name = "InvoiceTime", Title = "开发票日期" });
            list.Add(new LogDescriptionItem { Name = "InvoiceType", Title = "发票类型" });
            list.Add(new LogDescriptionItem { Name = "InvoiceNumber", Title = "发票号" });

            return list.ToArray();
        }
        /// <summary>
        /// 构造
        /// </summary>
        public Finance()
        {
            _ReceivedDate = DateTime.Now;
        }
        /// <summary>
        /// 取得该经费到帐信息对应的已经通过审核经费下拨
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FinanceFundDescend> GetDescends(IQueryable<FinanceFundDescend> query)
        {
            return query.Where(ffd => ffd.FinanceID == _ID
                && (ffd.FundDescend.CurrentState.State == FundDescendState.Passed || ffd.FundDescend.CurrentState.State == FundDescendState.AllocationCompleted))
                .ToList();
        }
        /// <summary>
        /// 取得还款记录
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FinanceFundDescend> GetReturns(IQueryable<FinanceFundDescend> query)
        {
            return query
                .Where(ffd => ffd.IsReturn && ffd.FinanceID == _ID)
                .ToList();
        }
        /// <summary>
        /// 取得该经费到帐信息对应的经费下拨
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IList<FundDescend> GetAllDescends(IQueryable<FinanceFundDescend> query)
        {
            return query
                .Where(ffd => ffd.FinanceID == _ID && !ffd.IsReturn && ffd.FundDescend.CurrentState.State != FundDescendState.Delete)
                .Select(ffd => ffd.FundDescend)
                .ToList();
        }
        /// <summary>
        /// 更新统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {
            //更新对应的经费到帐信息
            _DescendAmount = 0;
            var descends = GetDescends(database.FinanceFundDescends);
            foreach (var descend in descends)
                _DescendAmount += descend.Amount;
        }
        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Amount > 0, "金额必须大于零");
            validater.AddCondition(_Amount >= _DescendAmount, "经费到账的金额必须大于已下拨的金额");
            validater.AddCondition(!String.IsNullOrEmpty(_VoucherNumber), "凭单号不能为空");
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="database"></param>
        protected override void DeleteAction(IDatabase database)
        {
            if (_DescendAmount != 0)
                throw new InvalidOperationException("该经费已经下拨，不能删除！");

            base.DeleteAction(database);
        }
    }

    /// <summary>
    /// 经费到账记录（暂存）的业务扩展
    /// </summary>
    public static class FinanceBusinessExtension
    {
    }
    /// <summary>
    /// 经费到账记录（暂存）的查询扩展
    /// </summary>
    public static class FinanceQueryExtension
    {
        // private static DateTime finaceReceiveDateLimit = Convert.ToDateTime("2005/12/31");
        /// <summary>
        /// 取得经费的到账信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="financeQueryInformation"></param>
        /// <returns></returns>
        public static FinanceQueryResult GetFinances(this IQueryable<Finance> query, FinanceQueryInformation financeQueryInformation)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            // query = query.Where(q => q.ReceivedDate >= finaceReceiveDateLimit);

            if (financeQueryInformation.VoucherNumber != null) financeQueryInformation.VoucherNumber = financeQueryInformation.VoucherNumber.Trim();
            if (!string.IsNullOrEmpty(financeQueryInformation.VoucherNumber)) query = query.Where(p => p.VoucherNumber.StartsWith(financeQueryInformation.VoucherNumber));

            if (financeQueryInformation.ReceivedDate != null)
            {
                if (financeQueryInformation.ReceivedDate.End.HasValue)
                    query = query.Where(q => q.ReceivedDate <= financeQueryInformation.ReceivedDate.End.Value);
                if (financeQueryInformation.ReceivedDate.Start.HasValue)
                    query = query.Where(q => q.ReceivedDate >= financeQueryInformation.ReceivedDate.Start.Value);
            }

            if (financeQueryInformation.Amount != null)
            {
                if (financeQueryInformation.Amount.Start.HasValue)
                    query = query.Where(q => q.Amount >= financeQueryInformation.Amount.Start.Value);
                if (financeQueryInformation.Amount.End.HasValue)
                    query = query.Where(q => q.Amount <= financeQueryInformation.Amount.End.Value);
            }

            if (financeQueryInformation.IsDescendAll.HasValue)
                if (financeQueryInformation.IsDescendAll.Value)
                    query = query.Where(q => q.Amount == q.DescendAmount || q.Amount <= q.DescendAmount + Finance.CAN_IGNORE_AMOUNT);
                else
                    query = query.Where(q => q.Amount >= q.DescendAmount + Finance.CAN_IGNORE_AMOUNT);


            if (financeQueryInformation.IsInvoiced.HasValue)
                if (financeQueryInformation.IsInvoiced.Value)
                    query = query.Where(q => q.IsInvoiced == true);
                else
                    query = query.Where(q => q.IsInvoiced == false);

            if (financeQueryInformation.Abstract != null) financeQueryInformation.Abstract = financeQueryInformation.Abstract.Trim();
            if (!string.IsNullOrEmpty(financeQueryInformation.Abstract))
                query = query.Where(f => f.Abstract.Contains(financeQueryInformation.Abstract));

            query = SortQuery(query, financeQueryInformation.SortInfo);
            long sumFinanceTotal = 0;
            long sumFinanceDescend = 0;

            if (query.Count() > 0)
            {
                sumFinanceTotal = query.Sum(q => q.Amount);
                sumFinanceDescend = query.Sum(q => q.DescendAmount);
            }

            return new FinanceQueryResult(query.Skip(financeQueryInformation.Start).Take(financeQueryInformation.Limit).ToList(), query.Count(), sumFinanceTotal, sumFinanceDescend);
        }

        private static IQueryable<Finance> SortQuery(IQueryable<Finance> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(q => q.ReceivedDate);
            else if (sortInfo.Field.EqualIgnoreCase("ReceivedDate"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.ReceivedDate)
                    : query.OrderByDescending(p => p.ReceivedDate);
            else if (sortInfo.Field.EqualIgnoreCase("VoucherNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.VoucherNumber)
                    : query.OrderByDescending(p => p.VoucherNumber);
            else if (sortInfo.Field.EqualIgnoreCase("Amount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.Amount)
                    : query.OrderByDescending(p => p.Amount);
            else if (sortInfo.Field.EqualIgnoreCase("DescendAmount"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.DescendAmount)
                    : query.OrderByDescending(p => p.DescendAmount);
            else if (sortInfo.Field.EqualIgnoreCase("InvoiceNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.InvoiceNumber)
                    : query.OrderByDescending(p => p.InvoiceNumber);
            else if (sortInfo.Field.EqualIgnoreCase("IsInvoiced"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.IsInvoiced)
                    : query.OrderByDescending(p => p.IsInvoiced);
            else if (sortInfo.Field.EqualIgnoreCase("InvoiceType"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.InvoiceType)
                    : query.OrderByDescending(p => p.InvoiceType);
            else if (sortInfo.Field.EqualIgnoreCase("InvoiceTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(p => p.InvoiceTime)
                    : query.OrderByDescending(p => p.InvoiceTime);
            else
                return query = query.OrderByDescending(q => q.ReceivedDate);
        }
        /// <summary>
        ///  根据关键字对经费到帐信息进行筛选(用于专家下拨经费)
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyWord"></param>
        /// <returns></returns>
        public static IList<Finance> Search(this IQueryable<Finance> query, string keyWord)
        {
            long? amount = Money.ToMoney(keyWord);
            var q = query.AsQueryable();

            if (!amount.HasValue)
                q = query.Where(f => f.Abstract.Contains(keyWord));
            else
                q = query.Where(f => (f.Amount - f.DescendAmount) == amount.Value);

            return q.Union(query.Where(f => f.VoucherNumber.StartsWith(keyWord)))
                    .Distinct()
                    .OrderByDescending(f => f.ReceivedDate)
                    .ToList();
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
        public static bool IsFinanceExist(this IQueryable<Finance> query, string voucherNumber, DateTime receiveDate, long amount, string description)
        {
            if (query == null)
                throw new Exception("query");

            return query.Count(q => q.VoucherNumber == voucherNumber && q.Abstract.Trim() == description.Trim() && q.Amount == amount && q.ReceivedDate == receiveDate) != 0;
        }
        /// <summary>
        /// 取得经费信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="voucherNumber"></param>
        /// <param name="receiveDate"></param>
        /// <param name="amount"></param>
        /// <param name="description"></param>
        /// <returns></returns>
        public static Finance GetFinanceForUpdate(this IQueryable<Finance> query, string voucherNumber, DateTime receiveDate, long amount, string description)
        {
            if (query == null)
                throw new Exception("query");

            return query.SingleOrDefault(q => q.VoucherNumber == voucherNumber && q.Abstract.Trim() == description.Trim() && q.Amount == amount && q.ReceivedDate == receiveDate);
        }
    }
    /// <summary>
    /// 经费到账记录（暂存）的权限扩展
    /// </summary>
    public static class FinancePermissionExtension
    {
        /// <summary>
        /// 判断用户是否有还款权限
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermissionFundReturn(this User user)
        {
            return user.IsSuper;
        }
        /// <summary>
        /// 判断用户是否具有借款权限
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool HasPermissionFundlent(this User user)
        {
            return user.IsSuper;
        }
        /// <summary>
        /// 是否有察看权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowFinance(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageFund, database);

        }
        /// <summary>
        ///  判断能否察看
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowFinance(this User user, IDatabase database)
        {
            return user.HasPermission_ShowFinance(database);
        }
        /// <summary>
        /// 是否有删除权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteFinance(this User user, IDatabase database)
        {
            return user.HasPermission_ShowFinance(database);

        }
        /// <summary>
        /// 判断改经费到帐信息能否被删除
        /// </summary>
        /// <param name="user"></param>
        /// <param name="finance"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDelete(this User user, Finance finance, IDatabase database)
        {
            return user.HasPermission_DeleteFinance(database) && finance.DescendAmount == 0;
        }
        /// <summary>
        /// 是否有下拨权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Descend(this User user, IDatabase database)
        {
            return user.HasPermission_ShowFinance(database);

        }
        /// <summary>
        ///  判断经费是否还可以下拨
        /// </summary>
        /// <param name="user"></param>
        /// <param name="finance"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDescend(this User user, Finance finance, IDatabase database)
        {
            return user.HasPermission_Descend(database) && finance.Amount > finance.DescendAmount;
        }
        /// <summary>
        /// 是否有开发票权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_Invoice(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageFinance, database);
        }
        /// <summary>
        /// 能否开发票
        /// </summary>
        /// <param name="user"></param>
        /// <param name="finance"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanInvoice(this User user, Finance finance, IDatabase database)
        {
            return user.HasPermission_Invoice(database) && !finance.IsInvoiced;
        }
        /// <summary>
        /// 是否有删除发票权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_DeleteInvoice(this User user, IDatabase database)
        {
            return user.HasPermission_Invoice(database);
        }
        /// <summary>
        /// 能否删除发票
        /// </summary>
        /// <param name="user"></param>
        /// <param name="finance"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanDeleteInvoice(this User user, Finance finance, IDatabase database)
        {
            return user.HasPermission_DeleteInvoice(database) && finance.IsInvoiced;
        }
        /// <summary>
        /// 是否有编辑发票权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_EditInvoice(this User user, IDatabase database)
        {
            return user.HasPermission_Invoice(database);
        }
        /// <summary>
        /// 能否编辑发票
        /// </summary>
        /// <param name="user"></param>
        /// <param name="finance"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanEditInvoice(this User user, Finance finance, IDatabase database)
        {
            return user.HasPermission_EditInvoice(database) && finance.IsInvoiced;
        }
        /// <summary>
        /// 判断用户是否具有查看相应凭单的权限
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermisson_ShowVouchers(this User user, IDatabase database)
        {
            return user.HasPermission(PermissionItem.ManageFund, database);

        }
        /// <summary>
        /// 判断用户能够查看相应的凭单
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowVouchers(this User user, IDatabase database)
        {
            return user.HasPermisson_ShowVouchers(database);

        }
    }
}
