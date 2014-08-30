using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Experts;
using Srims.Server.Business;

namespace Srims.Server.UI.Patents
{
    /// <summary>
    /// 显示专利发明人
    /// </summary>
    public static class PatentInventerExtension
    {
        /// <summary>
        /// 显示发明人
        /// </summary>
        /// <param name="inventer"></param>
        /// <param name="response"></param>
        public static void ShowPatentInventer(PatentInventer inventer, HttpResponse response)
        {
            response.WriteTagWithValue("ID", inventer.ID);
            response.WriteTagWithValue("Name", inventer.Name);
            response.WriteTagWithValue("Order", inventer.Order);
            response.WriteTagWithValue("ExpertID", inventer.ExpertID);
            response.WriteTagWithValue("IsPrincipal", inventer.IsPrincipal);

            if (inventer.ExpertID != null)
                response.WriteTagWithValue("ExpertNumber", inventer.Expert.Number);

        }
        /// <summary>
        /// 显示专利的发明人
        /// </summary>
        /// <param name="inventerList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<PatentInventer> inventerList, HttpResponse response)
        {
            ShowDelegate<PatentInventer> showDelegate = new ShowDelegate<PatentInventer>(ShowPatentInventer);
            inventerList.Show<PatentInventer>(response, showDelegate);
        }
        /// <summary>
        /// 保存专利发明人
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static PatentInventer GetPatentInventer(this HttpRequest request, IDatabase database)
        {
            var patentInventer = request.getPatentInventer(database);

            patentInventer.Patent = request.GetEntity<Patent>(database.Patents, "PatentID");
            patentInventer.Expert = request.GetEntity<Expert>(database.Experts, "ExpertID");
            if (patentInventer.Expert != null)
                patentInventer.Name = patentInventer.Expert.Name;
            else
                patentInventer.Name = request.GetString("Name");
            patentInventer.Order = request.GetInt("Order").Value;
            patentInventer.IsPrincipal = request.GetBoolean("isPrincipal").HasValue ? request.GetBoolean("IsPrincipal").Value : false;

            return patentInventer;
        }
        private static PatentInventer getPatentInventer(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");
            if (id.HasValue)
                return database.PatentInventers.GetByID(id.Value);

            return new PatentInventer();
        }
        /// <summary>
        /// 取得新建的空PatentInventer或者编辑之前的旧PatentInventer
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldPatentInventer(this HttpRequest request, IDatabase database)
        {
            Object oldPatentInventer = new Object();
            oldPatentInventer = request.getPatentInventer(database).Clone();
            return oldPatentInventer;
        }
    }
}
