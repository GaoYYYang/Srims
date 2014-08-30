using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.Business;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Awards;
using Srims.Server.UI.HttpExtension;

namespace Srims.WebSite.Service.Awards
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class AwardWinnerService : WebServiceBase
    {
        [WebMethod]
        public void GetByAwardID()
        {
            var awardID = Request.GetInt("awardId").Value;

            var award = Database.Awards.GetByID(awardID);
            if (!User.CanShowAwardMember(award, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .AwardWinners
                .GetByAwardID(awardID)
                .Show(Response);
        }

        [WebMethod]
        public void SaveAwardWinner()
        {
            var oldWinner = Request.GetOldAwardWinner(Database);
            var awardWinner = Request.GetAwardWinner(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var award = Database.Awards.GetByID(Request.GetInt("awardId").Value);
                var description = "";
                if (awardWinner.IsNew)
                    description = string.Format("添加奖励‘{0}’的获奖者：{1}。", award.Name, awardWinner.Name)
                        + Log.GetEditOperationDescription(oldWinner, awardWinner, AwardWinner.GetAwardWinnerDescriptionItems(), awardWinner.IsNew);
                else
                    description = string.Format("对ID为：{0}的获奖者做如下修改：\n", awardWinner.ID)
                       + Log.GetEditOperationDescription(oldWinner, awardWinner, AwardWinner.GetAwardWinnerDescriptionItems(), awardWinner.IsNew)
                       + string.Format("\n此获奖人对应的奖励为：{0}，ID为：{1}。", award.Name, award.ID);

                Log.Write(User.Name, awardWinner.IsNew ? (int)LogType.AwardWinnerAdd : (int)LogType.AwardWinnerEdit, description, Request.UserHostAddress, awardWinner.IsNew ? "添加获奖人" : "编辑获奖人", Database);

                awardWinner.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void DeleteAwardWinner()
        {
            var awardWinner = Request.GetEntity<AwardWinner>(Database.AwardWinners, "AwardWinnerID");
            awardWinner.Award.FirstWinner = null;
            if (awardWinner != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var awardID = Request.GetInt("awardId").Value;
                    var award = Database.Awards.GetByID(awardID);
                    var description = string.Format("删除奖励：{0}(ID:{1})的获奖人；\n删除的获奖人名称为:{2}，位次为:{3}。", award.Name, award.ID, awardWinner.Name, awardWinner.Order);
                    Log.Write(User.Name, (int)LogType.AwardWinnerDelete, description, Request.UserHostAddress, "删除奖励获奖人", Database);

                    awardWinner.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
