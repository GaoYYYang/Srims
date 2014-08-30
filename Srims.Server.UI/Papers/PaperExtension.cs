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
    public static class PaperExtension
    {
        /// <summary>
        /// 论文显示
        /// </summary>
        /// <param name="paper"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowPaper(Paper paper, HttpResponse response, User user, IDatabase database)
        {
            //basic
            response.WriteTagWithValue("ID", paper.ID);
            response.WriteTagWithValue("Name", paper.Name);
            response.WriteTagWithValue("InfluenceFactorOfPaper", paper.InfluenceFactor);
            response.WriteTagWithValue("Type", paper.Type);
            response.WriteTagWithValue("CiteFrequencyOfPaper", paper.CiteFrequency);
            response.WriteTagWithValue("PublishYear", paper.PublishDateYear);
            response.WriteTagWithValue("PublishDate", paper.PublishDate);
            response.WriteTagWithValue("DocumentNumber", paper.DocumentNumber);
            response.WriteTagWithValue("Volume", paper.Volume);
            response.WriteTagWithValue("StartPage", paper.StartPage);
            response.WriteTagWithValue("EndPage", paper.EndPage);
            response.WriteTagWithValue("Pages", paper.Pages);
            response.WriteTagWithValue("SubAirer", paper.SubAirer);
            response.WriteTagWithValue("AuthorKeyWord", paper.AuthorKeyWord);
            response.WriteTagWithValue("KeyWord", paper.KeyWord);
            response.WriteTagWithValue("Abstract", paper.Abstract);
            response.WriteTagWithValue("LinkManAddress", paper.LinkManAddress);
            response.WriteTagWithValue("LinkManEmail", paper.LinkManEmail);
            response.WriteTagWithValue("LinkManSignUnit", paper.LinkManSignUnit);
            response.WriteTagWithValue("FirstAuthorSignUnit", paper.FirstAuthorSignUnit);
            response.WriteTagWithValue("SignOrder", paper.SignOrder);
            response.WriteTagWithValue("Lab", paper.Lab);
            response.WriteTagWithValue("ISIUniqueArticleIdentifier", paper.ISIUniqueArticleIdentifier);
            response.WriteTagWithValue("Remark", paper.Remark);
            response.WriteTagWithValue("ResourceName", paper.ResourceName);

            //Magazine
            var magazine = paper.Magazine;
            response.WriteTagWithValue("MagazineID", magazine == null ? string.Empty : magazine.ID.ToString());
            response.WriteTagWithValue("FullName", magazine == null ? string.Empty : magazine.FullName);
            response.WriteTagWithValue("ShortName", magazine == null ? string.Empty : magazine.ShortName);
            response.WriteTagWithValue("ISSN", magazine == null ? string.Empty : magazine.ISSN);
            response.WriteTagWithValue("SubjectRank", magazine == null ? string.Empty : magazine.SubjectRank);
            response.WriteTagWithValue("SubjectClass", magazine == null ? string.Empty : magazine.GetSubjectClasses(database.MagazineSubjectClasses).ToArray().ToString("，"));
            response.WriteTagWithValue("PublishType", magazine == null ? string.Empty : magazine.PublishType.ToString());
            response.WriteTagWithValue("Language", magazine == null ? string.Empty : magazine.Language.ToString());
            //College
            var college = paper.College;
            response.WriteTagWithValue("CollegeID", college == null ? string.Empty : college.ID.ToString());
            response.WriteTagWithValue("CollegeName", college == null ? string.Empty : college.Name);

            //FirstAuthor
            var firstAuthor = paper.GetPaperFirstAuthor(database.PaperAuthors);
            response.WriteTagWithValue("FirstAuthorID", firstAuthor == null ? string.Empty : firstAuthor.ID.ToString());
            response.WriteTagWithValue("FirstAuthorName", firstAuthor == null ? string.Empty : firstAuthor.Name);

            //LinkMan
            var linkMan = paper.GetPaperAuthorLink(database.PaperAuthors);
            response.WriteTagWithValue("LinkManID", linkMan == null ? string.Empty : linkMan.ID.ToString());
            response.WriteTagWithValue("LinkManName", linkMan == null ? string.Empty : linkMan.Name);

            //Authors
            response.WriteTagWithValue("Authors", paper.GetPaperAuthorsName(database.PaperAuthors).ToArray().ToString("，"));

            //Indexed
            response.WriteTagWithValue("Indexed", paper.GetPaperIndexedsName(database.PaperIndexeds).Show());
            response.WriteTagWithValue("IndexedString", paper.GetPaperIndexedsName(database.PaperIndexeds).ShowStr());
            //permission
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_Show(paper, database));
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_Edit(paper, database));
            response.WriteTagWithValue("HasPermission_EditPaperAuhtor", user.HasPermission_EditPaperAuthor(paper, database));

            //Can
            response.WriteTagWithValue("CanEdit", user.CanEdit(paper, database));
            response.WriteTagWithValue("CanEditPaperAuthor", user.CanEditPaperAuthor(paper, database));
            response.WriteTagWithValue("CanShow", user.CanShow(paper, database));
        }
        /// <summary>
        /// 论文查询的显示扩展
        /// </summary>
        /// <param name="paperQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Paper> paperQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Paper> showDelegate = new ShowDelegateWithUserAndDatabase<Paper>(ShowPaper);
            paperQueryResult.Show<Paper>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 显示论文列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void Show(this List<Paper> list, User user, HttpResponse response, IDatabase database)
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
        public static void ShowPaperForExpert(this Paper paper, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("ID", paper.ID);
            response.WriteTagWithValue("Name", paper.Name);
            response.WriteTagWithValue("MagazineShortName", paper.MagazineID.HasValue ? paper.Magazine.ShortName : string.Empty);
            response.WriteTagWithValue("PublishDateYear", paper.PublishDateYear);
            response.WriteTagWithValue("InfluenceFactor", paper.InfluenceFactor);
            response.WriteTagWithValue("PaperIndexeds", paper.GetPaperIndexedsName(database.PaperIndexeds).Show());
            response.WriteTagWithValue("AuthorLink", paper.GetPaperAuthorLink(database.PaperAuthors) != null ? paper.GetPaperAuthorLink(database.PaperAuthors).Name : String.Empty);
            response.WriteTagWithValue("FirstAuthor", paper.GetPaperFirstAuthor(database.PaperAuthors) != null ? paper.GetPaperFirstAuthor(database.PaperAuthors).Name : String.Empty);
            response.WriteTagWithValue("Order", expert.GetMyPaperOrder(database.PaperAuthors, paper.ID));

            response.WriteTagWithValue("CanShow", user.CanShow(paper, database));

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 显示论文（专家）
        /// </summary>
        /// <param name="list"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowForExpert(this IList<Paper> list, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("List");

            foreach (var paper in list)
                paper.ShowPaperForExpert(expert, user, response, database);

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 取得新建或编辑的论文信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Paper GetPaper(this HttpRequest request, IDatabase database)
        {
            var paper = request.getPaper(database);

            paper.Name = request.GetString("name");
            paper.Magazine = request.GetEntity<Magazine>(database.Magazines, "magazineID");
            paper.ResourceName = request.GetString("resourceName");
            paper.Type = request.GetEnum<PaperType>("type");
            paper.PublishDateYear = request.GetInt("publishYear");
            paper.PublishDate = request.GetString("publishDate");
            paper.InfluenceFactor = request.GetInt("influenceFactorOfPaper");
            paper.CiteFrequency = request.GetInt("citeFrequencyOfPaper");
            paper.DocumentNumber = request.GetString("documentNumber");
            paper.Volume = request.GetString("volume");
            paper.StartPage = request.GetInt("startPage");
            paper.EndPage = request.GetInt("endPage");
            paper.Pages = request.GetInt("pages");
            paper.ISIUniqueArticleIdentifier = request.GetString("isiUniqueArticleIdentifier");
            paper.College = request.GetEntity<Department>(database.Departments, "collegeID");
            paper.Lab = request.GetString("lab");
            paper.LinkManSignUnit = request.GetEnum<SignUnit>("linkManSignUnit");
            paper.FirstAuthorSignUnit = request.GetEnum<SignUnit>("firstAuthorSignUnit");
            paper.SignOrder = request.GetInt("signOrder");
            paper.SubAirer = request.GetInt("subAirer");
            paper.LinkManEmail = request.GetString("linkManEmail");
            paper.LinkManAddress = request.GetString("linkManAddress");
            paper.AuthorKeyWord = request.GetString("authorKeyWord");
            paper.KeyWord = request.GetString("keyWord");
            paper.Remark = request.GetString("remark");
            paper.Abstract = request.GetString("abstract");
            return paper;
        }

        private static Paper getPaper(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.Papers.GetByID(id.Value);
            var paper = new Paper();
            return paper;
        }
        /// <summary>
        /// 取得新建的空Paper或者编辑之前的旧Paper
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldPaper(this HttpRequest request, IDatabase database)
        {
            Object oldPaper = new Object();
            oldPaper = request.getPaper(database).Clone();
            return oldPaper;
        }
        /// <summary>
        /// 取得编辑或新建的论文收录情况
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static List<PaperIndexedType> GetIndexedTypeList(this HttpRequest request)
        {
            List<PaperIndexedType> indexedList = request.GetEnumList<PaperIndexedType>("IndexedString") == null ? null : request.GetEnumList<PaperIndexedType>("IndexedString").ToList();
            if (indexedList != null && indexedList.Count > 0)
            {
                if ((indexedList.Contains(PaperIndexedType.EICore) || indexedList.Contains(PaperIndexedType.EINetWork)))
                    indexedList.Add(PaperIndexedType.EI);
                if ((indexedList.Contains(PaperIndexedType.SCICD) || indexedList.Contains(PaperIndexedType.SCINetWork)))
                    indexedList.Add(PaperIndexedType.SCI);
            }
            return indexedList;
        }
    }
}
