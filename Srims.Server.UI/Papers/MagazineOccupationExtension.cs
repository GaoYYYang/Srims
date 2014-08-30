using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using System.Web;
using Srims.Server.Business.Users;
using MIS.Common.Query;


namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 杂志任职扩展
    /// </summary>
    public static class MagazineOccupationExtension
    {
        /// <summary>
        /// 取得查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static QueryInformation GetQueryInformation(this HttpRequest request)
        {
            var queryInformation = new QueryInformation();

            queryInformation.Start = request.GetQueryInformation_Start();
            queryInformation.Limit = request.GetQueryInformation_Limit();

            return queryInformation;
        }
        /// <summary>
        /// 杂志任职信息显示
        /// </summary>
        /// <param name="magazineOccupation"></param>
        /// <param name="response"></param>
        public static void ShowInfor(MagazineOccupation magazineOccupation, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", magazineOccupation.ID);
            response.WriteTagWithValue("ExpertID", magazineOccupation.ExpertID);
            response.WriteTagWithValue("ExpertName", magazineOccupation.Expert.Name);
            response.WriteTagWithValue("ExpertDepartment", magazineOccupation.Expert.Department == null ? string.Empty : magazineOccupation.Expert.Department.Name);
            response.WriteTagWithValue("MagazineID", magazineOccupation.MagazineID);
            response.WriteTagWithValue("MagazineName", magazineOccupation.Magazine.FullName);
            response.WriteTagWithValue("MagazineISSN", magazineOccupation.Magazine.ISSN);
            response.WriteTagWithValue("MagazinePublishCompanyCity", magazineOccupation.Magazine.PublishCompanyCity);
            response.WriteTagWithValue("Occupation", magazineOccupation.Occupation);
            response.WriteTagWithValue("EngageStartYear", magazineOccupation.EngageStartYear);
            response.WriteTagWithValue("EngageEndYear", magazineOccupation.EngageEndYear);

            response.WriteTagWithValue("HasPermission_EditMagazineOccupation", user.HasPermission_EditMagazineOccupation(database));
            response.WriteTagWithValue("CanEdit_MagazineOccupation", user.CanEdit_MagazineOccupation(database));
        }
        /// <summary>
        /// 杂志任职列表显示扩展
        /// </summary>
        /// <param name="result"></param>
        /// <param name="response"></param>
        public static void Show(this QueryResult<MagazineOccupation> result, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<MagazineOccupation> showDelegate = new ShowDelegateWithUserAndDatabase<MagazineOccupation>(ShowInfor);
            result.Show<MagazineOccupation>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 杂志任职列表显示扩展
        /// </summary>
        /// <param name="occcupationList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<MagazineOccupation> occcupationList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<MagazineOccupation> showDelegate = new ShowDelegateWithUserAndDatabase<MagazineOccupation>(ShowInfor);
            occcupationList.Show<MagazineOccupation>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得杂志任职信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static MagazineOccupation GetMagazineOccupation(this HttpRequest request, IDatabase database)
        {
            var magazineOccupation = request.getMagazineOccupation(database);

            magazineOccupation.Magazine = request.GetEntity<Magazine>(database.Magazines, "MagazineID");
            magazineOccupation.Occupation = request.GetString("Occupation");
            magazineOccupation.EngageStartYear = request.GetInt("EngageStartYear").Value;
            magazineOccupation.EngageEndYear = request.GetString("EngageEndYear");
            magazineOccupation.Expert = request.GetEntity<Expert>(database.Experts, "ExpertID");
            return magazineOccupation;
        }
        private static MagazineOccupation getMagazineOccupation(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.MagazineOccupations.GetByID(id.Value);

            return new MagazineOccupation();
        }
    }
}
