using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Awards;
using System.Web;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using Srims.Server.Business;

namespace Srims.Server.UI.Awards
{
    /// <summary>
    /// 显示奖励人
    /// </summary>
    public static class AwardWinnerExtension
    {
        /// <summary>
        /// 显示获奖者
        /// </summary>
        /// <param name="awardWinner"></param>
        /// <param name="response"></param>
        public static void ShowAwardWinner(AwardWinner awardWinner, HttpResponse response)
        {
            response.WriteTagWithValue("ID", awardWinner.ID);
            response.WriteTagWithValue("Name", awardWinner.Name);
            response.WriteTagWithValue("Order", awardWinner.Order);
            response.WriteTagWithValue("ExpertID", awardWinner.ExpertID);

            if (awardWinner.ExpertID != null)
                response.WriteTagWithValue("Number", awardWinner.Expert.Number);
        }
        /// <summary>
        /// 显示奖励的获奖人
        /// </summary>
        /// <param name="awardWinnerList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<AwardWinner> awardWinnerList, HttpResponse response)
        {
            ShowDelegate<AwardWinner> showDelegate = new ShowDelegate<AwardWinner>(ShowAwardWinner);
            awardWinnerList.Show<AwardWinner>(response, showDelegate);
        }

        /// <summary>
        /// 保存奖励的获奖人
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static AwardWinner GetAwardWinner(this HttpRequest request, IDatabase database)
        {
            var awardWinner = request.getAwardWinner(database);

            if (request.GetEntity<Expert>(database.Experts, "ExpertID") != null)
                awardWinner.Name = request.GetEntity<Expert>(database.Experts, "ExpertID").Name;
            else
                awardWinner.Name = request.GetString("Name");
            awardWinner.Expert = request.GetEntity<Expert>(database.Experts, "ExpertID");
            awardWinner.Award = request.GetEntity<Award>(database.Awards, "AwardID");
            awardWinner.Order = request.GetInt("Order").Value;
            awardWinner.Award.FirstWinner = awardWinner;

            return awardWinner;
        }
        private static AwardWinner getAwardWinner(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");
            if (id.HasValue)
                return database.AwardWinners.GetByID(id.Value);

            return new AwardWinner();
        }
        /// <summary>
        /// 取得新建的空AwardWinner或者编辑之前的旧AwardWinner
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldAwardWinner(this HttpRequest request, IDatabase database)
        {
            Object oldWinner = new Object();
            oldWinner = request.getAwardWinner(database).Clone();
            return oldWinner;
        }
    }
}
