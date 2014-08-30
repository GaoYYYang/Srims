using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Documents
{
    /// <summary>
    /// 奖励文档显示扩展
    /// </summary>
    public static class AwardDoucmentExtension
    {
        /// <summary>
        /// 奖励文档显示扩展
        /// </summary>
        /// <param name="response"></param>
        /// <param name="awardDoucment"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this  AwardDocument awardDoucment, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", awardDoucment.ID);
            response.WriteTagWithValue("AuthorName", awardDoucment.Author.Name);
            response.WriteTagWithValue("AuthorId", awardDoucment.AuthorID);
            response.WriteTagWithValue("AwardName", awardDoucment.Award.Name);
            response.WriteTagWithValue("AwardFirstWinnerName", awardDoucment.Award.GetFirstWinner(database.AwardWinners).Name);
            response.WriteTagWithValue("Censor", awardDoucment.Censor);
            response.WriteTagWithValue("CensorDateTime", awardDoucment.CensorDateTime);
            response.WriteTagWithValue("Name", awardDoucment.Name);
            response.WriteTagWithValue("State", awardDoucment.State);
            response.WriteTagWithValue("SubmitDateTime", awardDoucment.SubmitDateTime);
            response.WriteTagWithValue("Resource", awardDoucment.Resource);

            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(awardDoucment, database));
            response.WriteTagWithValue("HasPermission_CensorPass", user.HasPermission_CensorPass(awardDoucment, database));
            response.WriteTagWithValue("HasPermission_CensorReject", user.HasPermission_CensorReject(awardDoucment, database));

            response.WriteTagWithValue("CanDelete", user.CanDelete(awardDoucment, database));
            response.WriteTagWithValue("CanCensorReject", user.CanCensorReject(awardDoucment, database));
            response.WriteTagWithValue("CanCensorPass", user.CanCensorPass(awardDoucment, database));
        }
        /// <summary>
        /// 取得奖励文档
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static AwardDocument GetAwardDocument(this HttpRequest request, IDatabase database)
        {
            AwardDocument awardDocument = new AwardDocument();

            awardDocument.Award = request.GetEntity(database.Awards, "AwardId");
            awardDocument.Name = request.GetString("Name");

            return awardDocument;
        }
    }
}
