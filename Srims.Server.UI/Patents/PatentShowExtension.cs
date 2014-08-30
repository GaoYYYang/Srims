using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;
using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Patents;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Experts;

namespace Srims.Server.UI.Patents
{
    /// <summary>
    /// 专利的显示扩展
    /// </summary>
    public static class PatentShowExtension
    {
        /// <summary>
        /// 显示专利
        /// </summary>
        /// <param name="patent">要显示的专利</param>
        /// <param name="response">输出</param>
        /// <param name="user">用户</param>
        /// <param name="database">数据库</param>
        public static void ShowPatent(Patent patent, HttpResponse response, User user, IDatabase database)
        {
            //basic
            response.WriteTagWithValue("ID", patent.ID);
            response.WriteTagWithValue("Introduction", patent.Introduction);
            response.WriteTagWithValue("LawState", patent.LawState);
            response.WriteTagWithValue("LawStateTime", patent.LawStateTime);
            response.WriteTagWithValue("Level", patent.Level);
            response.WriteTagWithValue("MainCategoryNumber", patent.MainCategoryNumber);
            response.WriteTagWithValue("AllCategoryNumber", patent.AllCategoryNumber);
            response.WriteTagWithValue("Name", patent.Name);
            response.WriteTagWithValue("Number", patent.Number);
            response.WriteTagWithValue("Remark", patent.Remark);
            response.WriteTagWithValue("Type", patent.Type);
            response.WriteTagWithValue("ApplicationDateTime", patent.ApplicationDateTime);
            response.WriteTagWithValue("AuthorizeDateTime", patent.AuthorizeDateTime);
            response.WriteTagWithValue("Category", patent.Category);
            response.WriteTagWithValue("Country", patent.Country);
            response.WriteTagWithValue("Agent", patent.Agent);
            //college
            var college = patent.College;
            response.WriteTagWithValue("CollegeID", college == null ? string.Empty : college.ID.ToString());
            response.WriteTagWithValue("CollegeName", college == null ? string.Empty : college.Name);
            //agency
            var agency = patent.Agency;
            response.WriteTagWithValue("AgencyID", agency == null ? string.Empty : agency.ID.ToString());
            response.WriteTagWithValue("AgencyName", agency == null ? string.Empty : agency.Name);
            response.WriteTagWithValue("Contract", agency == null ? string.Empty : agency.Contract);
            //principal
            var patentPrincipal = patent.GetPatentPrincipal(database.PatentInventers);
            response.WriteTagWithValue("PatentPrincipalName", patentPrincipal == null ? string.Empty : patentPrincipal.Name);
            response.WriteTagWithValue("PatentPrincipalNameSpell", patentPrincipal == null ? string.Empty :
                                                                                                    (patentPrincipal.Expert == null ? string.Empty : patentPrincipal.Expert.NameSpell));
            //inventers
            IList<PatentInventer> inventers = patent.GetPatentIntenvers(database.PatentInventers);
            if (inventers.Count() > 0)
            {
                string inventerString = "";
                foreach (var inventer in inventers) inventerString += inventer.Name + ",";
                response.WriteTagWithValue("PatentInventersName", inventerString);
            }
            //hasPower
            response.WriteTagWithValue("HasPermission_ShowPatent", user.HasPermission_ShowPatent(patent, database));
            response.WriteTagWithValue("HasPermission_EditPatent", user.HasPermission_EditPatent(database));
            //can
            response.WriteTagWithValue("CanShowPatent", user.CanShowPatent(patent, database));
            response.WriteTagWithValue("CanEditPatent", user.CanEditPatent(database));
        }
        /// <summary>
        /// 专利显示代理
        /// </summary>
        /// <param name="patentQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Patent> patentQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Patent> showDelegate = new ShowDelegateWithUserAndDatabase<Patent>(ShowPatent);
            patentQueryResult.Show<Patent>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 显示专利列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Patent> list, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("List");
            foreach (var patent in list)
            {
                response.WriteTagBegin("Record");
                ShowPatent(patent, response, user, database);
                response.WriteTagEnd("Record");
            }
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示专利（专家）
        /// </summary>
        /// <param name="patent"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowPatentForExpert(this Patent patent, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("ID", patent.ID);
            response.WriteTagWithValue("Name", patent.Name);
            response.WriteTagWithValue("Number", patent.Number);
            response.WriteTagWithValue("LawState", patent.LawState.ToString());
            response.WriteTagWithValue("Type", patent.Type);
            response.WriteTagWithValue("Order", expert.GetMyPatentOrder(database.PatentInventers, patent.ID));
            response.WriteTagWithValue("Principal", patent.GetPatentPrincipal(database.PatentInventers) == null ? "" : patent.GetPatentPrincipal(database.PatentInventers).Name);
            response.WriteTagWithValue("AuthorizeDateTime", patent.AuthorizeDateTime);

            response.WriteTagWithValue("CanShowPatent", user.CanShowPatent(patent, database));

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 显示专利（专家）
        /// </summary>
        /// <param name="list"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowForExpert(this IList<Patent> list, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("List");

            foreach (var patent in list)
                patent.ShowPatentForExpert(expert, user, response, database);

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 保存专利
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Patent GetPatent(this HttpRequest request, IDatabase database)
        {
            var patent = request.getPatent(database);

            patent.Name = request.GetString("Name");
            patent.College = request.GetEntity<Department>(database.Departments, "CollegeID");
            patent.Agency = request.GetEntity<PatentAgency>(database.PatentAgencys, "AgencyID");
            patent.Agent = request.GetString("Agent");
            patent.AllCategoryNumber = request.GetString("AllCategoryNumber");
            patent.ApplicationDateTime = request.GetDateTime("ApplicationDateTime");
            patent.AuthorizeDateTime = request.GetDateTime("AuthorizeDateTime");
            patent.LawStateTime = request.GetDateTime("LawStateTime");

            patent.Category = request.GetString("Category");
            patent.Country = request.GetString("Country");

            patent.LawState = request.GetEnum<PatentLawState>("LawState");
            patent.Type = request.GetEnum<PatentType>("Type");
            patent.Level = request.GetEnum<PatentLevel>("Level");

            patent.Introduction = request.GetString("Introduction");
            patent.Remark = request.GetString("Remark");

            patent.MainCategoryNumber = request.GetString("MainCategoryNumber");
            patent.Number = request.GetString("Number");

            return patent;
        }
        private static Patent getPatent(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");
            if (id.HasValue)
                return database.Patents.GetByID(id.Value);
            return new Patent();
        }
        /// <summary>
        /// 取得新建的空Patent或者编辑之前的旧Patent
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldPatent(this HttpRequest request, IDatabase database)
        {
            Object oldPatent = new Object();
            oldPatent = request.getPatent(database).Clone();
            return oldPatent;
        }
    }
}
