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
    /// <summary>
    /// 论文作者的相关扩展
    /// </summary>
    public static class PaperAuthorExtension
    {
        /// <summary>
        /// 论文作者列表的显示扩展
        /// </summary>
        /// <param name="author"></param>
        /// <param name="response"></param>
        public static void ShowInfor(PaperAuthor author, HttpResponse response)
        {
            response.WriteTagWithValue("ID", author.ID);
            response.WriteTagWithValue("PaperID", author.PaperID);
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
        public static void Show(this IList<PaperAuthor> authorList, HttpResponse response)
        {
            ShowDelegate<PaperAuthor> showDelegate = new ShowDelegate<PaperAuthor>(ShowInfor);
            authorList.Show<PaperAuthor>(response, showDelegate);
        }
        /// <summary>
        /// 取得论文作者信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        public static PaperAuthor GetPaperAuthor(this HttpRequest request, IDatabase database)
        {
            var paperAuthor = request.getPaperAuthor(database);

            paperAuthor.Paper = request.GetEntity<Paper>(database.Papers, "PaperID");
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
        private static PaperAuthor getPaperAuthor(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.PaperAuthors.GetByID(id.Value);

            return new PaperAuthor();
        }
        /// <summary>
        /// 取得新建的空PaperAuthor或者编辑之前的旧PaperAuthor
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldPaperAuthor(this HttpRequest request, IDatabase database)
        {
            Object oldPaperAuthor = new Object();
            oldPaperAuthor = request.getPaperAuthor(database).Clone();
            return oldPaperAuthor;
        }
    }
}
