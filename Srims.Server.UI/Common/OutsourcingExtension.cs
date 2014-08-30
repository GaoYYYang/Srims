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


namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 外协单位显示扩展
    /// </summary>
    public static class OutsourcingExtension
    {
        /// <summary>
        /// 显示外协单位
        /// </summary>
        /// <param name="outsourcing"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowOutsourcing(this Outsourcing outsourcing, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", outsourcing.ID);
            response.WriteTagWithValue("Name", outsourcing.Name);
            response.WriteTagWithValue("Address", outsourcing.Address);
            response.WriteTagWithValue("Director", outsourcing.Director);
            response.WriteTagWithValue("Phone", outsourcing.Phone);
            response.WriteTagWithValue("DirectorEmail", outsourcing.DirectorEmail);
            response.WriteTagWithValue("Remark", outsourcing.Remark);
            response.WriteTagWithValue("CreateDateTime", outsourcing.CreateDateTime);

            //permission
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditOutsourcing(database));
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_DeleteOutsourcing(database));

            //can
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
            ShowDelegateWithUserAndDatabase<Outsourcing> showDelegate = new ShowDelegateWithUserAndDatabase<Outsourcing>(ShowOutsourcing);
            outsourcingResult.Show(response, user, database, showDelegate);
        }       
        /// <summary>
        /// 取得request中外协单位
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Outsourcing GetOutsourcing(this HttpRequest request, IDatabase database, User user)
        {
            var outsourcing = request.getOutsourcing(database, user);

            outsourcing.Name = request.GetString("Name");
            outsourcing.Address = request.GetString("Address");
            outsourcing.Director = request.GetString("Director");
            outsourcing.Phone = request.GetString("Phone");
            outsourcing.DirectorEmail = request.GetString("DirectorEmail");
            outsourcing.Remark = request.GetString("Remark");
            outsourcing.CreateDateTime = System.DateTime.Now;

            return outsourcing;
        }
        /// <summary>
        /// 根据ID取得外协单位
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Outsourcing GetOutsourcingByID(this HttpRequest request, IDatabase database)
        {
            return request.GetEntity<Outsourcing>(database.Outsourcings, "id");
        }
        private static Outsourcing getOutsourcing(this HttpRequest request, IDatabase database, User user)
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
        public static Object GetOldOutsourcing(this HttpRequest request, IDatabase database, User user)
        {
            Object oldOutsourcing = new Object();
            oldOutsourcing = request.getOutsourcing(database, user);
            return oldOutsourcing;
        }
    }
}
