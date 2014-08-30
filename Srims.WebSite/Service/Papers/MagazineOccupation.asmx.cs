using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.Business.Papers;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Papers;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Papers
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class MagazineOccupationWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .MagazineOccupations
                .Query(Request.GetQueryInformation(),Database)
                .Show(Response,User,Database);
        }
        [WebMethod]
        public void GetByMagazineID()
        {
            var magazineID = Request.GetInt("MagazineID").HasValue ? Request.GetInt("MagazineID").Value : 0;

            Response.WriteXmlHead();
            Database
                .MagazineOccupations
                .GetByMagazineID(magazineID)
                .Show(Response,User,Database);
        }
        [WebMethod]
        public void Delete()
        {
            var magazineOccupation = Request.GetEntity<MagazineOccupation>(Database.MagazineOccupations, "magazineOccupationID");

            if (magazineOccupation != null)
            {
                //log
                magazineOccupation.Delete(Database);
            }
        }
        [WebMethod]
        public void Save()
        {
            var magazineOccupation = Request.GetMagazineOccupation(Database);
            //log
            magazineOccupation.Save(Database);
        }
    }
}
