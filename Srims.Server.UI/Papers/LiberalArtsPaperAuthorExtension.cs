using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Papers;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business;
using Srims.Server.Business.Experts;
namespace Srims.Server.UI.Papers
{
    public static class LiberalArtsPaperAuthorExtension
    {
        /// <summary>
        /// 论文作者列表的显示扩展
        /// </summary>
        /// <param name="author"></param>
        /// <param name="response"></param>
        public static void ShowInfor(LiberalArtsPaperAuthor author, HttpResponse response)
        {
            response.WriteTagWithValue("ID", author.ID);
            response.WriteTagWithValue("LiberalArtsPaperID", author.LiberalArtsPaperID);
            response.WriteTagWithValue("Order", author.Order);
            response.WriteTagWithValue("Name", author.Name);
            response.WriteTagWithValue("EnglishName", author.EnglishName);
            response.WriteTagWithValue("ExpertID", author.ExpertID);
            response.WriteTagWithValue("ExpertNumber", author.ExpertID.HasValue ? author.Expert.Number : string.Empty);
            response.WriteTagWithValue("IsLinkMan", author.IsLinkMan);
        }
        /// <summary>
        /// 论文作者的显示扩展
        /// </summary>
        /// <param name="authorList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<LiberalArtsPaperAuthor> authorList, HttpResponse response)
        {
            ShowDelegate<LiberalArtsPaperAuthor> showDelegate = new ShowDelegate<LiberalArtsPaperAuthor>(ShowInfor);
            authorList.Show<LiberalArtsPaperAuthor>(response, showDelegate);
        }
        /// <summary>
        /// 取得论文作者信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        public static LiberalArtsPaperAuthor GetLiberalArtsPaperAuthor(this HttpRequest request, IDatabase database)
        {
            var paperAuthor = request.getLiberalArtsPaperAuthor(database);

            paperAuthor.LiberalArtsPaper = request.GetEntity<LiberalArtsPaper>(database.LiberalArtsPapers, "LiberalArtsPaperID");
            paperAuthor.EnglishName = request.GetString("EnglishName");
            paperAuthor.Order = request.GetInt("Order").Value;
            paperAuthor.IsLinkMan = request.GetBoolean("IsLinkMan").Value;
            paperAuthor.Expert = null;
            if (request.GetInt("ExpertID").HasValue)
            {
                paperAuthor.Expert = request.GetEntity<Expert>(database.Experts, "ExpertID");
                paperAuthor.Name = paperAuthor.Expert.Name;
            }
            else paperAuthor.Name = request.GetString("Name");
            return paperAuthor;
        }
        private static LiberalArtsPaperAuthor getLiberalArtsPaperAuthor(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.LiberalArtsPaperAuthors.GetByID(id.Value);

            return new LiberalArtsPaperAuthor();
        }
        /// <summary>
        /// 取得新建的空PaperAuthor或者编辑之前的旧PaperAuthor
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldLiberalArtsPaperAuthor(this HttpRequest request, IDatabase database)
        {
            Object oldPaperAuthor = new Object();
            oldPaperAuthor = request.getLiberalArtsPaperAuthor(database).Clone();
            return oldPaperAuthor;
        }
    }
}
