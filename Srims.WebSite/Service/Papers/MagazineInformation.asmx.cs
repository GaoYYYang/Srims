using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;

using Srims.Server.Business.Common;
using Srims.Server.Business.Papers;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Papers;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.MagazineImport;

namespace Srims.WebSite.Service.Papers
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class MagazineInformationWebService : WebServiceBase
    {

        [WebMethod]
        public void GetByMagazineID()
        {
            var magazineID = Request.GetInt("MagazineID").HasValue ? Request.GetInt("MagazineID").Value : 0;

            Response.WriteXmlHead();
            Database
                .MagazineInformations
                .GetMagazineInformationByMagazineID(magazineID)
                .Show(Response);
        }
        [WebMethod]
        public void Delete()
        {
            var magazineInformation = Request.GetEntity<MagazineInformation>(Database.MagazineInformations, "magazineInforID");

            if (magazineInformation != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除杂志：{0}(ID:{1}) 的杂志信息。", magazineInformation.Magazine.FullName, magazineInformation.Magazine.ID);
                    Log.Write(User.Name, (int)LogType.MagazineInformationDelete, description, Request.UserHostAddress, "删除杂志信息", Database);

                    magazineInformation.Delete(Database);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void Save()
        {
            var oldMagazineInformation = Request.GetOldMagazineInformation(Database);
            var magazineInformation = Request.GetMagazineInformation(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("对杂志：{0}(ID:{1})的杂志信息做如下修改：\n", magazineInformation.Magazine.FullName, magazineInformation.Magazine.ID)
                    + Log.GetEditOperationDescription(oldMagazineInformation, magazineInformation, MagazineInformation.GetMagazineInformationDescriptionItems(), magazineInformation.IsNew);
                Log.Write(User.Name, magazineInformation.IsNew ? (int)LogType.MagazineInformationAdd : (int)LogType.MagazineInformationEdit, description, Request.UserHostAddress, magazineInformation.IsNew ? "添加杂志信息" : "编辑杂志信息", Database);

                magazineInformation.Save(Database);

                foreach (var paper in Database.Papers.GetPapersByMagazineAndYear(magazineInformation.MagazineID, magazineInformation.Year))
                {
                    paper.InfluenceFactor = magazineInformation.InfluenceFactor;
                    paper.SubAirer = magazineInformation.SubAirer;
                    paper.Save(Database);
                }
                ts.Complete();
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            int year = Request.GetInt("Year").Value;

            string logName = Context.ImportMagazineInformation(postedFiles[0], Request, User, year);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
