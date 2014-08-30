using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MIS.Common.Query;
using System.Web;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 经费备份扩展
    /// </summary>
   public static  class FinanceBakExtension
    {
        /// <summary>
        /// 获得经费备份查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static QueryInformation GetFinanceBakQueryInformation(this HttpRequest request)
        {
            var queryInformation = new QueryInformation();

            queryInformation.Start = request.GetQueryInformation_Start();
            queryInformation.Limit = request.GetQueryInformation_Limit();
            return queryInformation;
        }

               /// <summary>
        /// 凭单的显示扩展
        /// </summary>
        /// <param name="financeBak"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowFinanceBak(this FinanceBak financeBak, HttpResponse response, User user, IDatabase database)
        {
            if (financeBak != null)
            {
                response.WriteTagBegin("Record");

                //basic
                response.WriteTagWithValue("ID", financeBak.ID);
                response.WriteTagWithValue("Abstract", financeBak.Abstract);
                response.WriteTagWithValue("Amount", financeBak.Amount);
                response.WriteTagWithValue("ReceivedDate", financeBak.ReceivedDate);
                response.WriteTagWithValue("VoucherNumber", financeBak.VoucherNumber);
                response.WriteTagEnd("Record");
            }
        }
        /// <summary>
        /// 凭单财务查询的显示扩展
        /// </summary>
        /// <param name="financeBakQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<FinanceBak> financeBakQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<FinanceBak> showDelegate = new ShowDelegateWithUserAndDatabase<FinanceBak>(ShowFinanceBak);
            financeBakQueryResult.Show<FinanceBak>(response, user, database, showDelegate);
        }
          
    }
}
