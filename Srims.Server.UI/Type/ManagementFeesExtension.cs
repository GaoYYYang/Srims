using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Documents;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using MIS.Common.Query;

namespace Srims.Server.UI.Type
{
    /// <summary>
    /// 管理费比例显示
    /// </summary>
    public static class ManagementFeesExtension
    {
        /// <summary>
        /// 取得查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static ManagementFeesQueryInformation GetManagementFeesQueryInformation(this HttpRequest request)
        {
            var queryInformation = new ManagementFeesQueryInformation();

            queryInformation.Start = request.GetQueryInformation_Start();
            queryInformation.Limit = request.GetQueryInformation_Limit();
            queryInformation.SortInfor = request.GetQueryCondition_SortInfo();

            queryInformation.managementFeesType = request.GetList<string>("Type");
            return queryInformation;
        }

        /// <summary>
        /// 显示管理费比例信息
        /// </summary>
        /// <param name="managementFees"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowManagementFees(ManagementFees managementFees, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", managementFees.ID);
            response.WriteTagWithValue("Type", managementFees.Type);
            response.WriteTagWithValue("FundTotal", managementFees.FundTotal);
            response.WriteTagWithValue("Fee", managementFees.Fee);
            response.WriteTagWithValue("PerformancePay", managementFees.PerformancePay);
            response.WriteTagWithValue("Remark", managementFees.Remark);

            //has

            //can
        }

        /// <summary>
        /// 显示整型数据扩展（管理费率,绩效工资费率）
        /// </summary>
        /// <param name="rate"></param>
        /// <param name="response"></param>
        public static void ShowRate(this int rate, HttpResponse response)
        {
            response.Write(rate);
        }

        /// <summary>
        /// 管理费比例查询的显示扩展
        /// </summary>
        /// <param name="managementFeesQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowQueryResult(this QueryResult<ManagementFees> managementFeesQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<ManagementFees> showDelegate = new ShowDelegateWithUserAndDatabase<ManagementFees>(ShowManagementFees);
            managementFeesQueryResult.Show<ManagementFees>(response, user, database, showDelegate);
        }

        /// <summary>
        /// 取得管理费收取类型编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="databse"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ManagementFees GetManagementFee(this HttpRequest request, IDatabase databse, User user)
        {
            var managementFee = request.getManagementFee(databse, user);

            managementFee.Type = request.GetString("type");
            managementFee.FundTotal = request.GetMoney("fundtotal").Value;
            managementFee.Fee = request.GetInt("fee").HasValue ? request.GetInt("fee").Value : 0;
            managementFee.PerformancePay = request.GetInt("performancepay").HasValue ? request.GetInt("performancepay").Value : 0;
            managementFee.Remark = request.GetString("remark").Trim();

            return managementFee;

        }

        private static ManagementFees getManagementFee(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.ManagementFees.GetByID(id.Value);
            var managementFee = new ManagementFees();
            return managementFee;
        }

        /// <summary>
        /// 取得新建空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldManagementFee(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getManagementFee(database, user).Clone();
            return oldEntity;
        }
    }
}
