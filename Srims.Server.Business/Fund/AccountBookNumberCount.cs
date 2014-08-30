using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 账本号计数器
    /// </summary>
    public partial class AccountBookNumberCount : Entity<AccountBookNumberCount>
    {
        /// <summary>
        /// 取得该账本号特征码对应的个数最大的账本号
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public string GetMaxAccountAccountBookNumber(IQueryable<FundMember> query)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            var fundmembers = query.Where(q => q.AccountBookNumber.Length == 13 && q.AccountBookNumber.Substring(5, 5) == _CharacterNumber).ToList();
            int maxCount = 0;
            string accountBookNumber = string.Empty;

            foreach (var fundmember in fundmembers)
            {
                int count = Convert.ToInt32(fundmember.AccountBookNumber.Substring(10, 2));

                if (count >= maxCount)
                {
                    maxCount = count;
                    accountBookNumber = fundmember.AccountBookNumber;
                }
            }
            return accountBookNumber;
        }
    }

    /// <summary>
    /// 账本号计数器的业务扩展
    /// </summary>
    public static class AccountBookNumberCountBusinessExtension
    {
        /// <summary>
        /// 某一类型的项目数目
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <param name="characterNubmer">项目特征码</param>
        /// <returns></returns>
        public static int NewAccountBookNumberCount(this IEntityDataAccess<AccountBookNumberCount> dataAccess, string characterNubmer, bool isExploitAnd40000000)
        {
            if (dataAccess == null)
                throw new ArgumentNullException("查询条件不能为空");
            if (string.IsNullOrEmpty(characterNubmer))
                throw new ArgumentNullException("项目特征码不能为空");

            int result = 0;
            using (TransactionScope ts = new TransactionScope())
            {
                var accountBookNumber = dataAccess.SingleOrDefault(abn => abn.CharacterNumber == characterNubmer);
                if (accountBookNumber == null)
                {
                    accountBookNumber = new AccountBookNumberCount
                    {
                        CharacterNumber = characterNubmer,
                        Count = 1
                    };
                    //carlsirce2014.1.19修改
                    if (isExploitAnd40000000)
                        accountBookNumber.Count = 61;
                    dataAccess.Add(accountBookNumber);
                }
                //carlsirce2014.1.19修改
                if (isExploitAnd40000000 && accountBookNumber.Count < 61)
                    accountBookNumber.Count = 61;
                result = accountBookNumber.Count;
                accountBookNumber.Count++;

                accountBookNumber.Save(dataAccess.Database);
                ts.Complete();
            }
            return result;
        }
    }
    /// <summary>
    /// 账本号计数器的查询扩展
    /// </summary>
    public static class AccountBookNumberCountQueryExtension
    {
        /// <summary>
        /// 根据特征码取得账本号计数器
        /// </summary>
        /// <param name="query"></param>
        /// <param name="characterBookNumber"></param>
        /// <param name="begin"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public static IList<AccountBookNumberCount> GetAccountBookNumberCount(this IQueryable<AccountBookNumberCount> query, string characterBookNumber, int begin, int limit)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (characterBookNumber != null) characterBookNumber = characterBookNumber.Trim();
            if (!string.IsNullOrEmpty(characterBookNumber))
                query = query.Where(q => q.CharacterNumber == characterBookNumber);

            return query.Skip(begin).Take(limit).ToList();
        }
    }
    /// <summary>
    /// 账本号计数器的权限扩展
    /// </summary>
    public static class AccountBookNumberCountPermissionExtension
    {
    }
}
