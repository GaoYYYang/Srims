using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Common;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;
using System.Web;

namespace Srims.Server.UI.Fund
{
    /// <summary>
    /// 外协分配扩展
    /// </summary>
    public static class VoucherOutExtension
    {
        /// <summary>
        /// 外协分配列表的显示扩展
        /// </summary>
        /// <param name="voucherOut"></param>
        /// <param name="response"></param>
        public static void ShowInfor(VoucherOut voucherOut, HttpResponse response)
        {
            response.WriteTagWithValue("ID", voucherOut.ID);
            response.WriteTagWithValue("Amount", voucherOut.Amount);
            //response.WriteTagWithValue("Corporation", voucherOut.Corporation);
            response.WriteTagWithValue("VoucherID", voucherOut.VoucherID);
            response.WriteTagWithValue("OutsourcingID", voucherOut.Outsourcing == null ? "" : voucherOut.Outsourcing.ID.ToString());
            response.WriteTagWithValue("Corporation", voucherOut.Outsourcing == null ? voucherOut.Corporation : voucherOut.Outsourcing.Name);
        }
        /// <summary>
        /// 显示经费分配的外协 carlsirce2013.2.27
        /// </summary>
        /// <param name="voucherOut"></param>
        /// <param name="response"></param>
        public static void ShowInforAllocation(ProjectOut projectOut, HttpResponse response, IDatabase database)
        {
            response.WriteTagWithValue("ID", projectOut.ID);
            response.WriteTagWithValue("Amount", projectOut.Amount);
            response.WriteTagWithValue("OutsourcingName", projectOut.Outsourcing.Name);
            response.WriteTagWithValue("OutsourcingID", projectOut.Outsourcing.ID);
            var voucherlist = database.VoucherOuts.GetByProjectOut(projectOut);
            long AlreadyAllocated = 0;
            foreach (var item in voucherlist)
                AlreadyAllocated += item.Amount;
            response.WriteTagWithValue("AlreadyAllocated", AlreadyAllocated);
            response.WriteTagWithValue("WantAllocated", 0);
            response.WriteTagWithValue("RemainAllocated", projectOut.Amount-AlreadyAllocated);
        }
        /// <summary>
        /// 外协分配的显示扩展
        /// </summary>
        /// <param name="voucherOutList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<VoucherOut> voucherOutList, HttpResponse response)
        {
            ShowDelegate<VoucherOut> showDelegate = new ShowDelegate<VoucherOut>(ShowInfor);
            voucherOutList.Show<VoucherOut>(response, showDelegate);
        }
        /// <summary>
        ///显示经费分配的外协 carlsirce2013.2.27
        /// </summary>
        /// <param name="voucherOutList"></param>
        /// <param name="response"></param>
        public static void ShowForAllcation(this IList<ProjectOut> projectOutList, HttpResponse response, IDatabase database)
        {
            ShowDelegateWithDatabase<ProjectOut> showDelegate = new ShowDelegateWithDatabase<ProjectOut>(ShowInforAllocation);
            projectOutList.Show<ProjectOut>(response, database, showDelegate);
        }
        /// <summary>
        /// 获得凭单外协部分
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static List<VoucherOut> GetVoucherOuts(this HttpRequest request, IDatabase database)
        {
            string voucherOutsString = request.GetString("voucherOutString");
            List<VoucherOut> voucherOutList = new List<VoucherOut>();


            if (voucherOutsString == null || string.IsNullOrEmpty(voucherOutsString.Trim()))
                return voucherOutList;

            var voucherOutStringArray = voucherOutsString.Split(new string[] { "|||" }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var voucherOutString in voucherOutStringArray)
            {
                var voucherOutArray = voucherOutString.Split(new string[] { "###" }, StringSplitOptions.RemoveEmptyEntries);

                VoucherOut voucherOut = new VoucherOut();

                voucherOut.Amount = Convert.ToInt64(voucherOutArray[0]);
                voucherOut.Corporation = voucherOutArray[1];
                voucherOut.Outsourcing = database.Outsourcings.GetOutsourcingByName(voucherOutArray[1]);

                voucherOutList.Add(voucherOut);
            }

            return voucherOutList;

        }
    }
}
