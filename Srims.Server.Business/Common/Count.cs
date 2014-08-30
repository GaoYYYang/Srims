using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 分年份计数器
    /// </summary>
    public partial class Count : Entity<Count>
    {
    }

    /// <summary>
    /// 分年份计数器的业务扩展
    /// </summary>
    public static class CountBusinessExtension
    {
        /// <summary>
        /// 取得新的合同计数
        /// </summary>
        /// <param name="dataAccess">数据访问</param>
        /// <param name="year">年份</param>
        /// <returns>新的合同计数</returns>
        public static int NewContractCount(this IEntityDataAccess<Count> dataAccess, int year)
        {
            int contractCount;
            using (TransactionScope ts = new TransactionScope())
            {
                var count = dataAccess.SingleOrDefault(c => c.Year == year);
                if (count == null)
                    count = new Count { Year = year };

                contractCount = ++count.Contract;

                count.Save(dataAccess.Database);

                ts.Complete();
            }
            return contractCount;
        }
        /// <summary>
        /// 取得新的横向项目计数
        /// </summary>
        /// <param name="dataAccess">数据访问</param>
        /// <param name="year">年份</param>
        public static int NewHorizontalProjectCount(this IEntityDataAccess<Count> dataAccess, int year)
        {
            int horizontalProjectCount;
            using (TransactionScope ts = new TransactionScope())
            {
                var count = dataAccess.SingleOrDefault(c => c.Year == year);
                if (count == null)
                    count = new Count { Year = year };

                horizontalProjectCount = ++count.HorizontalProject;

                count.Save(dataAccess.Database);

                ts.Complete();
            }

            return horizontalProjectCount;
        }
        /// <summary>
        /// 取得新的专家顺序码计数器
        /// </summary>
        /// <param name="dataAccess"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public static int NewExpertSerialCodeCount(this IEntityDataAccess<Count> dataAccess, int year)
        {
            int expertSerialCodeCount;
            using (TransactionScope ts = new TransactionScope())
            {
                var count = dataAccess.SingleOrDefault(c => c.Year == year);
                if (count == null)
                    count = new Count { Year = year, ExpertSerialCodeCount = 0 };

                expertSerialCodeCount = count.ExpertSerialCodeCount++;

                count.Save(dataAccess.Database);

                ts.Complete();
            }

            return expertSerialCodeCount;
        }
    }
    /// <summary>
    /// 分年份计数器的查询扩展
    /// </summary>
    public static class CountQueryExtension
    {
    }
    /// <summary>
    /// 分年份计数器的权限扩展
    /// </summary>
    public static class CountPermissionExtension
    {
    }
}
