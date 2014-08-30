using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Patents;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using System.Web;
using Srims.Server.Business.Users;
using Srims.Server.Business;
using MIS.Common.Query;

namespace Srims.Server.UI.Patents
{
    /// <summary>
    /// 专利代理机构扩展
    /// </summary>
    public static class PatentAgencyExtension
    {
        /// <summary>
        /// 专利代理机构列表的显示扩展
        /// </summary>
        /// <param name="patentAgency"></param>
        /// <param name="response"></param>
        public static void ShowPatentAgency(PatentAgency patentAgency, HttpResponse response)
        {
            response.WriteTagWithValue("ID", patentAgency.ID);
            response.WriteTagWithValue("AgencyName", patentAgency.Name);
            response.WriteTagWithValue("Contract", patentAgency.Contract);
        }
        /// <summary>
        /// 专利代理机构列表的显示扩展
        /// </summary>
        /// <param name="patentAgency"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        public static void ShowPatentAgency(PatentAgency patentAgency, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", patentAgency.ID);
            response.WriteTagWithValue("AgencyName", patentAgency.Name);
            response.WriteTagWithValue("Contract", patentAgency.Contract);

            response.WriteTagWithValue("HasPermission_EditPatentAgency", user.HasPermission_EditPatentAgency(database));
            response.WriteTagWithValue("CanEditPatentAgency", user.CanEditPatentAgency(database));
        }
        /// <summary>
        /// 专利代理机构的显示扩展
        /// </summary>
        /// <param name="patentAgencyQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<PatentAgency> patentAgencyQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<PatentAgency> showDelegate = new ShowDelegateWithUserAndDatabase<PatentAgency>(ShowPatentAgency);
            patentAgencyQueryResult.Show<PatentAgency>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 专利代理机构的显示扩展
        /// </summary>
        /// <param name="patentAgencyQueryResult"></param>
        /// <param name="response"></param>
        public static void Show(this IList<PatentAgency> patentAgencyQueryResult, HttpResponse response)
        {
            ShowDelegate<PatentAgency> showDelegate = new ShowDelegate<PatentAgency>(ShowPatentAgency);
            patentAgencyQueryResult.Show<PatentAgency>(response, showDelegate);
        }
        /// <summary>
        /// 取得专利代理机构信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        public static PatentAgency GetPatentAgency(this HttpRequest request, IDatabase database)
        {
            var patentAgency = request.getPatentAgency(database);

            patentAgency.Name = request.GetString("AgencyName");
            patentAgency.Contract = request.GetString("Contract");

            return patentAgency;
        }
        private static PatentAgency getPatentAgency(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.PatentAgencys.GetByID(id.Value);

            return new PatentAgency();
        }
        /// <summary>
        /// 取得新建的空PatentAgency或者编辑之前的旧PatentAgency
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldPatentAgency(this HttpRequest request, IDatabase database)
        {
            Object oldPatentAgency = new Object();
            oldPatentAgency = request.getPatentAgency(database).Clone();
            return oldPatentAgency;
        }
    }
}
