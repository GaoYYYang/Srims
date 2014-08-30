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
using Srims.Server.Business.Experts;

namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 论文扩展
    /// </summary>
    public static class LiberalArtsPaperExtension
    {
        /// <summary>
        /// 论文显示
        /// </summary>
        /// <param name="paper"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowPaper(LiberalArtsPaper paper, HttpResponse response, User user, IDatabase database)
        {
            //basic
            response.WriteTagWithValue("ID", paper.ID);
            response.WriteTagWithValue("PublishDateYear", paper.PublishDateYear);//
            response.WriteTagWithValue("SerialNumbe", paper.SerialNumbe == null ? string.Empty : paper.SerialNumbe);
            response.WriteTagWithValue("ResultsName", paper.ResultsName);//
            response.WriteTagWithValue("ResultsType", paper.Type);//
            response.WriteTagWithValue("EnglishName", paper.EnglishName == null ? string.Empty : paper.EnglishName);
            response.WriteTagWithValue("ResultsForm", paper.ResultsForm == null ? string.Empty : paper.ResultsForm);
            response.WriteTagWithValue("Fund", paper.Fund == null ? string.Empty : paper.Fund);
            response.WriteTagWithValue("Publisher", paper.Publisher);//
            response.WriteTagWithValue("ISSN", paper.ISSN == null ? string.Empty : paper.ISSN);
            response.WriteTagWithValue("FirstOrganization", paper.FirstOrganization == null ? string.Empty : paper.FirstOrganization);
            response.WriteTagWithValue("OurSchoolSignRank", paper.OurSchoolSignRank == null ? string.Empty : paper.OurSchoolSignRank.ToString());
            response.WriteTagWithValue("OrganizationName", paper.OrganizationName == null ? string.Empty : paper.OrganizationName);
            response.WriteTagWithValue("Region", paper.Region == null ? string.Empty : paper.Region);
            response.WriteTagWithValue("CollegeID", paper.College == null ? string.Empty : paper.College.ID.ToString());
            response.WriteTagWithValue("CollegeName", paper.College == null ? string.Empty : paper.College.Name);
            response.WriteTagWithValue("CODEN", paper.CODEN == null ? string.Empty : paper.CODEN);
            response.WriteTagWithValue("IssuesDate", paper.IssuesDate == null ? string.Empty : paper.IssuesDate);
            response.WriteTagWithValue("KeyWord", paper.KeyWord == null ? string.Empty : paper.KeyWord);
            response.WriteTagWithValue("Mark", paper.Mark == null ? string.Empty : paper.Mark);
            response.WriteTagWithValue("DegreeType", paper.DegreeType);
            response.WriteTagWithValue("FundType", paper.FundType);
            response.WriteTagWithValue("References", paper.References);
            response.WriteTagWithValue("CiteTime", paper.CiteTime);
            response.WriteTagWithValue("Degree",paper.Degree);

            var firstAuthor = paper.GetPaperFirstAuthor(database.LiberalArtsPaperAuthors);
            response.WriteTagWithValue("FirstAuthorID", firstAuthor == null ? string.Empty : firstAuthor.ID.ToString());
            response.WriteTagWithValue("FirstAuthorName", firstAuthor == null ? string.Empty : firstAuthor.Name);
            //Authors
            response.WriteTagWithValue("Authors", paper.GetPaperAuthorsName(database.LiberalArtsPaperAuthors).ToArray().ToString("/"));
            //permission
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show2(paper, database));
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit2(paper, database));
            response.WriteTagWithValue("HasPermission_EditPaperAuhtor", user.HasPermission_EditPaperAuthor2(paper, database));

            //Can
            response.WriteTagWithValue("CanEdit", user.CanEdit2(paper, database));
            response.WriteTagWithValue("CanEditPaperAuthor", user.CanEditPaperAuthor2(paper, database));
            response.WriteTagWithValue("CanShow", user.CanShow2(paper, database));
        }
        /// <summary>
        /// 论文查询的显示扩展
        /// </summary>
        /// <param name="paperQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<LiberalArtsPaper> paperQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<LiberalArtsPaper> showDelegate = new ShowDelegateWithUserAndDatabase<LiberalArtsPaper>(ShowPaper);
            paperQueryResult.Show<LiberalArtsPaper>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 显示论文列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this List<LiberalArtsPaper> list, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("List");

            foreach (var paper in list)
            {
                response.WriteTagBegin("Record");
                ShowPaper(paper, response, user, database);
                response.WriteTagEnd("Record");
            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示论文（专家）
        /// </summary>
        /// <param name="paper"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        //public static void ShowPaperForExpert(this LiberalArtsPaper paper, Expert expert, User user, HttpResponse response, IDatabase database)
        //{
        //    response.WriteTagBegin("Record");

        //    response.WriteTagWithValue("ID", paper.ID);
        //    response.WriteTagWithValue("Name", paper.Name);
        //    response.WriteTagWithValue("MagazineShortName", paper.MagazineID.HasValue ? paper.Magazine.ShortName : string.Empty);
        //    response.WriteTagWithValue("PublishDateYear", paper.PublishDateYear);
        //    response.WriteTagWithValue("InfluenceFactor", paper.InfluenceFactor);
        //    response.WriteTagWithValue("PaperIndexeds", paper.GetPaperIndexedsName(database.PaperIndexeds).Show());
        //    response.WriteTagWithValue("AuthorLink", paper.GetPaperAuthorLink(database.PaperAuthors) != null ? paper.GetPaperAuthorLink(database.PaperAuthors).Name : String.Empty);
        //    response.WriteTagWithValue("FirstAuthor", paper.GetPaperFirstAuthor(database.PaperAuthors) != null ? paper.GetPaperFirstAuthor(database.PaperAuthors).Name : String.Empty);
        //    response.WriteTagWithValue("Order", expert.GetMyPaperOrder(database.PaperAuthors, paper.ID));

        //    response.WriteTagWithValue("CanShow", user.CanShow(paper, database));

        //    response.WriteTagEnd("Record");
        //}
        /// <summary>
        /// 显示论文（专家）
        /// </summary>
        /// <param name="list"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        ///// <param name="database"></param>
        //public static void ShowForExpert(this IList<Paper> list, Expert expert, User user, HttpResponse response, IDatabase database)
        //{
        //    response.WriteTagBegin("List");

        //    foreach (var paper in list)
        //        paper.ShowPaperForExpert(expert, user, response, database);

        //    response.WriteTagEnd("List");
        //}
        /// <summary>
        /// 取得新建或编辑的论文信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static LiberalArtsPaper GetLiberalArtsPaper(this HttpRequest request, IDatabase database)
        {
            var paper = request.getLiberalArtsPaper(database);

            paper.PublishDateYear = request.GetInt("PublishDateYear").Value;
            paper.SerialNumbe = request.GetString("SerialNumbe");
            paper.ResultsName = request.GetString("ResultsName");
            paper.Type = request.GetEnum<ResultsType>("ResultsType");
            paper.EnglishName = request.GetString("EnglishName");

            paper.ResultsForm = request.GetString("ResultsForm");
            paper.Fund = request.GetString("Fund");
            paper.Publisher = request.GetString("Publisher");
            paper.ISSN = request.GetString("ISSN");
            paper.FirstOrganization = request.GetString("FirstOrganization");
            paper.OurSchoolSignRank = request.GetInt("OurSchoolSignRank");
            paper.OrganizationName = request.GetString("OrganizationName");
            paper.Region = request.GetString("Region");
            paper.College = request.GetEntity<Department>(database.Departments, "CollegeID");
            paper.SubjectClass = request.GetString("SubjectClass");
            paper.CODEN = request.GetString("CODEN");
            paper.IssuesDate = request.GetString("IssuesDate");
            paper.KeyWord = request.GetString("KeyWord");
            paper.Mark = request.GetString("Mark");
            paper.DegreeType = request.GetString("DegreeType");
            paper.KeyWord = request.GetString("keyWord");
            paper.FundType = request.GetString("FundType");
            paper.References = request.GetString("References");
            paper.CiteTime = request.GetInt("CiteTime");
            paper.Degree = request.GetString("Degree");
            return paper;
        }

        private static LiberalArtsPaper getLiberalArtsPaper(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.LiberalArtsPapers.GetByID(id.Value);
            var paper = new LiberalArtsPaper();
            return paper;
        }
        /// <summary>
        /// 取得新建的空Paper或者编辑之前的旧Paper
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldLiberalArtsPaper(this HttpRequest request, IDatabase database)
        {
            Object oldPaper = new Object();
            oldPaper = request.getLiberalArtsPaper(database).Clone();
            return oldPaper;
        }
        ///// <summary>
        ///// 取得编辑或新建的论文收录情况
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //public static List<PaperIndexedType> GetIndexedTypeList(this HttpRequest request)
        //{
        //    List<PaperIndexedType> indexedList = request.GetEnumList<PaperIndexedType>("IndexedString") == null ? null : request.GetEnumList<PaperIndexedType>("IndexedString").ToList();
        //    if (indexedList != null && indexedList.Count > 0)
        //    {
        //        if ((indexedList.Contains(PaperIndexedType.EICore) || indexedList.Contains(PaperIndexedType.EINetWork)))
        //            indexedList.Add(PaperIndexedType.EI);
        //        if ((indexedList.Contains(PaperIndexedType.SCICD) || indexedList.Contains(PaperIndexedType.SCINetWork)))
        //            indexedList.Add(PaperIndexedType.SCI);
        //    }
        //    return indexedList;
        //}
        /// <summary>
        /// 显示论文（专家）
        /// </summary>
        /// <param name="list"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowForExpert(this IList<LiberalArtsPaper> list, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("List");

            foreach (var paper in list)
                paper.ShowPaperForExpert(expert, user, response, database);

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示论文（专家）
        /// </summary>
        /// <param name="paper"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowPaperForExpert(this LiberalArtsPaper paper, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("Record");

            //basic
            response.WriteTagWithValue("ID", paper.ID);
            response.WriteTagWithValue("PublishDateYear", paper.PublishDateYear);//
            response.WriteTagWithValue("SerialNumbe", paper.SerialNumbe == null ? string.Empty : paper.SerialNumbe);
            response.WriteTagWithValue("ResultsName", paper.ResultsName);//
            response.WriteTagWithValue("ResultsType", paper.Type);//
            response.WriteTagWithValue("EnglishName", paper.EnglishName == null ? string.Empty : paper.EnglishName);
            response.WriteTagWithValue("ResultsForm", paper.ResultsForm == null ? string.Empty : paper.ResultsForm);
            response.WriteTagWithValue("Fund", paper.Fund == null ? string.Empty : paper.Fund);
            response.WriteTagWithValue("Publisher", paper.Publisher);//
            response.WriteTagWithValue("ISSN", paper.ISSN == null ? string.Empty : paper.ISSN);
            response.WriteTagWithValue("FirstOrganization", paper.FirstOrganization == null ? string.Empty : paper.FirstOrganization);
            response.WriteTagWithValue("OurSchoolSignRank", paper.OurSchoolSignRank == null ? string.Empty : paper.OurSchoolSignRank.ToString());
            response.WriteTagWithValue("OrganizationName", paper.OrganizationName == null ? string.Empty : paper.OrganizationName);
            response.WriteTagWithValue("Region", paper.Region == null ? string.Empty : paper.Region);
            response.WriteTagWithValue("CollegeID", paper.College == null ? string.Empty : paper.College.ID.ToString());
            response.WriteTagWithValue("CollegeName", paper.College == null ? string.Empty : paper.College.Name);
            response.WriteTagWithValue("CODEN", paper.CODEN == null ? string.Empty : paper.CODEN);
            response.WriteTagWithValue("IssuesDate", paper.IssuesDate == null ? string.Empty : paper.IssuesDate);
            response.WriteTagWithValue("KeyWord", paper.KeyWord == null ? string.Empty : paper.KeyWord);
            response.WriteTagWithValue("Mark", paper.Mark == null ? string.Empty : paper.Mark);
            response.WriteTagWithValue("DegreeType", paper.DegreeType);
            response.WriteTagWithValue("FundType", paper.FundType);
            response.WriteTagWithValue("References", paper.References);
            response.WriteTagWithValue("CiteTime", paper.CiteTime);
            response.WriteTagWithValue("Degree",paper.Degree);

            var firstAuthor = paper.GetPaperFirstAuthor(database.LiberalArtsPaperAuthors);
            response.WriteTagWithValue("FirstAuthorID", firstAuthor == null ? string.Empty : firstAuthor.ID.ToString());
            response.WriteTagWithValue("FirstAuthorName", firstAuthor == null ? string.Empty : firstAuthor.Name);
            //Authors
            response.WriteTagWithValue("Authors", paper.GetPaperAuthorsName(database.LiberalArtsPaperAuthors).ToArray().ToString("，"));
            //permission
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show2(paper, database));
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit2(paper, database));
            response.WriteTagWithValue("HasPermission_EditPaperAuhtor", user.HasPermission_EditPaperAuthor2(paper, database));


            response.WriteTagWithValue("CanShow", user.CanShow2(paper, database));

            response.WriteTagEnd("Record");
        }
    }

}
