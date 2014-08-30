using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 杂志的相关扩展
    /// </summary>
    public static class MagazineExtension
    {
        /// <summary>
        /// 显示筛选杂志
        /// </summary>
        /// <param name="magazine"></param>
        /// <param name="response"></param>
        public static void ShowAsMagazineSearchRecord(Magazine magazine, HttpResponse response)
        {
            response.WriteTagWithValue("ID", magazine.ID);
            response.WriteTagWithValue("FullName", magazine.FullName);
            response.WriteTagWithValue("ShortName", magazine.ShortName);
            response.WriteTagWithValue("ISSN", magazine.ISSN);
        }
        /// <summary>
        /// 显示筛选杂志列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        public static void ShowAsSearchRecord(this IList<Magazine> list, HttpResponse response)
        {
            ShowDelegate<Magazine> showDelegate = new ShowDelegate<Magazine>(ShowAsMagazineSearchRecord);
            list.Show<Magazine>(response, showDelegate);
        }
        /// <summary>
        /// 杂志的显示扩展
        /// </summary>
        /// <param name="magazine"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowMagazine(Magazine magazine, HttpResponse response, User user, IDatabase database)
        {
            if (magazine != null)
            {
                //basic
                response.WriteTagWithValue("ID", magazine.ID);
                response.WriteTagWithValue("FullName", magazine.FullName);
                response.WriteTagWithValue("ShortName", magazine.ShortName);
                response.WriteTagWithValue("IsDelete", magazine.IsDelete);
                response.WriteTagWithValue("ISSN", magazine.ISSN);
                response.WriteTagWithValue("Language", magazine.Language);
                response.WriteTagWithValue("PublishCompany", magazine.PublishCompany);
                response.WriteTagWithValue("PublishCompanyAddress", magazine.PublishCompanyAddress);
                response.WriteTagWithValue("PublishCompanyCity", magazine.PublishCompanyCity);
                response.WriteTagWithValue("PublishType", magazine.PublishType);
                response.WriteTagWithValue("SubjectRank", magazine.SubjectRank);

                //SubjectClass
                IList<string> subjectClasses = magazine.GetSubjectClasses(database.MagazineSubjectClasses);
                response.WriteTagWithValue("SubjectClass", subjectClasses.Count > 0 ? subjectClasses.ToArray().ToString(",") + "," : subjectClasses.ToArray().ToString(","));

                //hasPermission
                response.WriteTagWithValue("HasPermission_Show", user.HasPermission_ShowMagazine(database));
                response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditMagazine(database));
                response.WriteTagWithValue("HasPermission_ShowMagazineInformation", user.HasPermission_ShowMagazineInformation(database));
                response.WriteTagWithValue("HasPermission_EditMagazineInformation", user.HasPermission_EditMagazineInformation(database));
                response.WriteTagWithValue("HasPermission_EditMagazineOccupation", user.HasPermission_EditMagazineOccupation(database));

                //can
                response.WriteTagWithValue("CanShow", user.CanShowMagazine(database));
                response.WriteTagWithValue("CanEdit", user.CanEditMagazine(database));
                response.WriteTagWithValue("CanShow_MagazineInformation", user.CanShow_MagazineInformation(database));
                response.WriteTagWithValue("CanEdit_MagazineInformation", user.CanEdit_MagazineInformation(database));
                response.WriteTagWithValue("CanEdit_MagazineOccupation", user.CanEdit_MagazineOccupation(database));

            }
        }
        /// <summary>
        /// 杂志查询的显示扩展
        /// </summary>
        /// <param name="magazineQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Magazine> magazineQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Magazine> showDelegate = new ShowDelegateWithUserAndDatabase<Magazine>(ShowMagazine);
            magazineQueryResult.Show<Magazine>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得新建或编辑的杂志信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Magazine GetMagazine(this HttpRequest request, IDatabase database)
        {
            var magazine = request.getMagazine(database);

            magazine.FullName = request.GetString("FullName");
            magazine.ShortName = request.GetString("ShortName");
            magazine.Language = request.GetEnum<Language>("Language");
            magazine.ISSN = request.GetString("ISSN");
            magazine.PublishType = request.GetEnum<PublishType>("PublishType");
            magazine.SubjectRank = request.GetString("SubjectRank");
            magazine.PublishCompany = request.GetString("PublishCompany");
            magazine.PublishCompanyAddress = request.GetString("PublishCompanyAddress");
            magazine.PublishCompanyCity = request.GetString("PublishCompanyCity");
            magazine.IsDelete = false;
            return magazine;
        }

        private static Magazine getMagazine(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Magazines.GetByID(id.Value);
            var magazine = new Magazine();
            return magazine;
        }
        /// <summary>
        /// 取得新建的空Magazine或者编辑之前的旧Magazine
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldMagazine(this HttpRequest request, IDatabase database)
        {
            Object oldMagazine = new Object();
            oldMagazine = request.getMagazine(database).Clone();
            return oldMagazine;
        }
    }
}
