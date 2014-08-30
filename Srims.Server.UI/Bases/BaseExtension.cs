using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Bases
{
    /// <summary>
    /// 基地的相关扩展
    /// </summary>
    public static class BaseExtension
    {
        /// <summary>
        /// 基地列表扩展
        /// </summary>
        /// <param name="currentBase"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowBase(this Base currentBase, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", currentBase.ID);
            response.WriteTagWithValue("Name", currentBase.Name);
            response.WriteTagWithValue("AcademyDirectorID", currentBase.AcademyDirectorID);
            response.WriteTagWithValue("AcademyDirectorName", currentBase.AcademyDirectorID.HasValue ? currentBase.AcademyDirector.Name : currentBase.AcademyDirectorName);
            response.WriteTagWithValue("IsAcademyDirectorSchoolExpert", currentBase.AcademyDirectorID.HasValue);
            response.WriteTagWithValue("Address", currentBase.Address);
            response.WriteTagWithValue("Administration", currentBase.Administration);
            response.WriteTagWithValue("DirectorID", currentBase.DirectorID);
            response.WriteTagWithValue("DirectorName", currentBase.DirectorID.HasValue ? currentBase.Director.Name : currentBase.DirectorName);
            response.WriteTagWithValue("IsDirectorSchoolExpert", currentBase.DirectorID.HasValue);
            response.WriteTagWithValue("Fax", currentBase.Fax);
            response.WriteTagWithValue("Phone", currentBase.Phone);
            response.WriteTagWithValue("Rank", currentBase.Rank);
            response.WriteTagWithValue("Zip", currentBase.Zip);

            //Haspermission
            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(currentBase, database));
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(currentBase, database));
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show(currentBase, database));

            //can
            response.WriteTagWithValue("CanDelete", user.CanDelete(currentBase, database));
            response.WriteTagWithValue("CanShow", user.CanShow(currentBase, database));
            response.WriteTagWithValue("CanEdit", user.CanEdit(currentBase, database));
        }
        /// <summary>
        /// 用于基地下拉表
        /// </summary>
        /// <param name="currentBase"></param>
        /// <param name="response"></param>
        public static void ShowBaseForDropdownList(this Base currentBase, HttpResponse response)
        {
            response.WriteTagWithValue("ID", currentBase.ID);
            response.WriteTagWithValue("Name", currentBase.Name);
        }
        /// <summary>
        /// 取得基地
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Base GetBase(this HttpRequest request, IDatabase database)
        {
            var currentBase = request.getBase(database);

            currentBase.AcademyDirector = request.GetEntity(database.Experts, "AcademyDirectorId");
            currentBase.Director = request.GetEntity(database.Experts, "DirectorId");

            currentBase.AcademyDirectorName = request.GetString("AcademyDirectorName");
            currentBase.DirectorName = request.GetString("DirectorName");


            currentBase.Address = request.GetString("Address");
            currentBase.Administration = request.GetString("Administration");
            currentBase.Fax = request.GetString("Fax");
            currentBase.Name = request.GetString("Name");
            currentBase.Phone = request.GetString("Phone");
            currentBase.Rank = request.GetString("Rank");
            currentBase.Zip = request.GetString("Zip");

            return currentBase;
        }
        private static Base getBase(this HttpRequest request, IDatabase database)
        {
            var currentBase = request.GetEntity(database.Bases, "Id");
            if (currentBase == null)
                currentBase = new Base();

            return currentBase;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldEntity(this HttpRequest request, IDatabase database)
        {
            Object oldEntity = new Object();
            oldEntity = request.getBase(database).Clone();
            return oldEntity;
        }
    }
}
