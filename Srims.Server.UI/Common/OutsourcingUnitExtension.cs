using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.DataExchange.OutsourcingImport;


namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 外协单位显示扩展
    /// </summary>
    public static class OutsourcingUnitExtension
    {

        /// <summary>
        /// 移动外协单位证书文件
        /// </summary>
        /// <param name="outsourcing"></param>
        public static void MoveOutsourcingFile(this Outsourcing outsourcing, HttpContext httpContext)
        {
            OutsourcingImport.MoveFile(httpContext, outsourcing.ID.ToString());
        }
        /// <summary>
        /// 显示外协单位
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowOutsourcingUnit(this Outsourcing outsourcing, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", outsourcing.ID);
            response.WriteTagWithValue("Name", outsourcing.Name);
            response.WriteTagWithValue("BusinessScope", outsourcing.BusinessScope);
            response.WriteTagWithValue("CompanyType", outsourcing.CompanyType);
            response.WriteTagWithValue("CreateDateTime", outsourcing.CreateDateTime);
            response.WriteTagWithValue("DealDateTimeEnd", outsourcing.DealDateTimeEnd);
            response.WriteTagWithValue("DealDateTimeStart", outsourcing.DealDateTimeStart);
            response.WriteTagWithValue("LegalRepresentativeName", outsourcing.LegalRepresentativeName);
            response.WriteTagWithValue("ManagementType", outsourcing.ManagementType);
            response.WriteTagWithValue("OrganizationCode", outsourcing.OrganizationCode);
            response.WriteTagWithValue("RegisteredCapital", outsourcing.RegisteredCapital);
            response.WriteTagWithValue("RegisteredCardNumber", outsourcing.RegisteredCardNumber);
            response.WriteTagWithValue("Remark", outsourcing.Remark);
            response.WriteTagWithValue("IsVerify", outsourcing.IsVerify);
            response.WriteTagWithValue("TaxNumber", outsourcing.TaxNumber);
            response.WriteTagWithValue("Address", outsourcing.Address);
            response.WriteTagWithValue("CurrentUserID", user.ID);
            //carlsirce2012.3.12
            response.WriteTagWithValue("CompanyCard", outsourcing.CompanyCard);
            response.WriteTagWithValue("TaxCard", outsourcing.TaxCard);
            response.WriteTagWithValue("GroupCard", outsourcing.GroupCard);
            //permission
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditOutsourcing(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteOutsourcing(database));

            //can
            response.WriteTagWithValue("Verfiy", user.HasPermission_Verfiy(database));
            response.WriteTagWithValue("CanEdit", user.CanEditOutsourcing(database));
            response.WriteTagWithValue("CanDelete", user.CanDeleteOutsourcing(database));

        }
        /// <summary>
        /// 显示外协单位查询结果
        /// </summary>
        /// <param name="outsourcingResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Outsourcing> outsourcingResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Outsourcing> showDelegate = new ShowDelegateWithUserAndDatabase<Outsourcing>(ShowOutsourcingUnit);
            outsourcingResult.Show(response, user, database, showDelegate);
        }
        /// <summary>
        /// 显示筛选外协
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="response"></param>
        public static void ShowAsOutsourcingSearchRecord(Outsourcing outsourcing, HttpResponse response)
        {
            response.WriteTagWithValue("ID", outsourcing.ID);
            response.WriteTagWithValue("Name", outsourcing.Name);
            response.WriteTagWithValue("LegalRepresentativeName", outsourcing.LegalRepresentativeName);
            response.WriteTagWithValue("TaxNumber", outsourcing.TaxNumber);
        }
        /// <summary>
        /// 显示筛选外协列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        public static void ShowAsSearchRecord(this IList<Outsourcing> list, HttpResponse response)
        {
            ShowDelegate<Outsourcing> showDelegate = new ShowDelegate<Outsourcing>(ShowAsOutsourcingSearchRecord);
            list.Show<Outsourcing>(response, showDelegate);
        }
        /// <summary>
        /// 取得request中外协单位
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Outsourcing GetOutsourcingUnit(this HttpRequest request, IDatabase database, User user)
        {
            var outsourcing = request.getOutsourcingUnit(database);

            outsourcing.Name = request.GetString("Name").Trim();
            outsourcing.BusinessScope = request.GetString("BusinessScope") == null ? "" : request.GetString("BusinessScope").Trim();
            outsourcing.CompanyType = request.GetString("CompanyType");
            if (request.GetString("CreateDateTime") != null)
            {
                outsourcing.CreateDateTime = DateTime.Parse(request.GetString("CreateDateTime"));
            }
            if (request.GetString("DealDateTimeEnd") != null)
            {
                outsourcing.DealDateTimeEnd = DateTime.Parse(request.GetString("DealDateTimeEnd"));
            }
            outsourcing.Remark = request.GetString("Remark") == null ? "" : request.GetString("Remark");
            if (request.GetString("DealDateTimeStart") != null)
            {
                outsourcing.DealDateTimeStart = DateTime.Parse(request.GetString("DealDateTimeStart"));
            }
            outsourcing.LegalRepresentativeName = request.GetString("LegalRepresentativeName");
            outsourcing.ManagementType = request.GetString("ManagementType");
            outsourcing.OrganizationCode = request.GetString("OrganizationCode").ToUpper();
            outsourcing.RegisteredCapital = request.GetString("RegisteredCapital");
            if (request.GetString("RegisteredCardNumber") != null)
            {
                outsourcing.RegisteredCardNumber = request.GetString("RegisteredCardNumber");
            }
            outsourcing.TaxNumber = request.GetString("TaxNumber");
            if (request.GetString("IsVerify") == "审核驳回" || request.GetString("IsVerify") == null)
                outsourcing.IsVerify = "未审核";
            else
                outsourcing.IsVerify = request.GetString("IsVerify");
            outsourcing.Adder = database.Experts.SingleOrDefault(c => c.User == user);
            outsourcing.Address = request.GetString("Address");
            //carlsirce2013.3.12 加入法人上传文件
            outsourcing.CompanyCard = request.GetString("CompanyCard") == null ? "" : request.GetString("CompanyCard");
            outsourcing.TaxCard = request.GetString("TaxCard") == null ? "" : request.GetString("TaxCard");
            outsourcing.GroupCard = request.GetString("GroupCard") == null ? "" : request.GetString("GroupCard");
            if (!user.IsExpert)
            {
                outsourcing.IsVerify = "审核通过";
            }
            return outsourcing;
        }
        public static Outsourcing GetOutsourcingUnit(this HttpRequest request, IDatabase database)
        {
            var outsourcing = request.getOutsourcingUnit(database);

            outsourcing.Name = request.GetString("Name");
            outsourcing.BusinessScope = request.GetString("BusinessScope") == null ? "" : request.GetString("BusinessScope");
            outsourcing.CompanyType = request.GetString("CompanyType");
            if (request.GetString("CreateDateTime") != null && request.GetString("CreateDateTime") != "")
            {
                outsourcing.CreateDateTime = DateTime.Parse(request.GetString("CreateDateTime"));
            }
            if (request.GetString("DealDateTimeEnd") != null && request.GetString("DealDateTimeEnd") != "")
            {
                outsourcing.DealDateTimeEnd = DateTime.Parse(request.GetString("DealDateTimeEnd"));
            }
            outsourcing.Remark = request.GetString("Remark") == null ? "" : request.GetString("Remark");
            if (request.GetString("DealDateTimeStart") != null && request.GetString("DealDateTimeStart") != "")
            {
                outsourcing.DealDateTimeStart = DateTime.Parse(request.GetString("DealDateTimeStart"));
            }
            outsourcing.LegalRepresentativeName = request.GetString("LegalRepresentativeName");
            outsourcing.ManagementType = request.GetString("ManagementType");
            outsourcing.OrganizationCode = request.GetString("OrganizationCode");
            outsourcing.RegisteredCapital = request.GetString("RegisteredCapital");
            if (request.GetString("RegisteredCardNumber") != null)
            {
                outsourcing.RegisteredCardNumber = request.GetString("RegisteredCardNumber");
            }
            outsourcing.TaxNumber = request.GetString("TaxNumber");
            outsourcing.IsVerify = request.GetString("IsVerify");
            outsourcing.Address = request.GetString("Address");
            return outsourcing;
        }
        /// <summary>
        /// 根据ID取得外协单位
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Outsourcing GetOutsourcingUnitByID(this HttpRequest request, IDatabase database)
        {
            return request.GetEntity<Outsourcing>(database.Outsourcings, "id");
        }
        private static Outsourcing getOutsourcingUnit(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Outsourcings.GetByID(id.Value);
            var outsourcing = new Outsourcing();
            return outsourcing;

        }
        /// <summary>
        /// 取得新建的空Outsourcing或编辑之前旧的Outsourcing
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldOutsourcingUnit(this HttpRequest request, IDatabase database, User user)
        {
            Object oldOutsourcing = new Object();
            oldOutsourcing = request.getOutsourcingUnit(database);
            return oldOutsourcing;
        }
    }
}
