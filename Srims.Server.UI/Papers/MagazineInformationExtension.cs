using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Papers;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business;

namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 杂志年度信息的相关扩展
    /// </summary>
    public static class MagazineInformationExtension
    {
        /// <summary>
        /// 杂志信息的显示扩展
        /// </summary>
        /// <param name="infor"></param>
        /// <param name="response"></param>
        public static void ShowInfor(MagazineInformation infor, HttpResponse response)
        {
            response.WriteTagWithValue("ID", infor.ID);
            response.WriteTagWithValue("Year", infor.Year);
            response.WriteTagWithValue("InfluenceFactor", infor.InfluenceFactor);
            response.WriteTagWithValue("CiteFrequency", infor.CiteFrequency);
            response.WriteTagWithValue("SubAirer", infor.SubAirer);
            response.WriteTagWithValue("InstantExponent", infor.InstantExponent);
            response.WriteTagWithValue("PaperCount", infor.PaperCount);
            response.WriteTagWithValue("CiteHalfLife", infor.CiteHalfLife);
        }
        /// <summary>
        /// 杂志信息列表的显示扩展
        /// </summary>
        /// <param name="inforList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<MagazineInformation> inforList, HttpResponse response)
        {
            ShowDelegate<MagazineInformation> showDelegate = new ShowDelegate<MagazineInformation>(ShowInfor);
            inforList.Show<MagazineInformation>(response, showDelegate);
        }
        /// <summary>
        /// 取得杂志信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        public static MagazineInformation GetMagazineInformation(this HttpRequest request, IDatabase database)
        {
            var magazineInformation = request.getMagazineInformation(database);

            magazineInformation.Magazine = request.GetEntity<Magazine>(database.Magazines, "MagazineID");
            magazineInformation.Year = request.GetInt("Year");
            magazineInformation.InfluenceFactor = request.GetInt("InfluenceFactor");
            magazineInformation.InstantExponent = request.GetInt("InstantExponent");
            magazineInformation.CiteFrequency = request.GetInt("CiteFrequency");
            magazineInformation.SubAirer = request.GetInt("SubAirer");
            magazineInformation.PaperCount = request.GetInt("PaperCount");
            magazineInformation.CiteHalfLife = request.GetString("CiteHalfLife");

            return magazineInformation;
        }
        private static MagazineInformation getMagazineInformation(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");

            if (id.HasValue)
                return database.MagazineInformations.GetByID(id.Value);

            return new MagazineInformation();
        }
        /// <summary>
        /// 取得新建的空MagazineInformation或者编辑之前的旧MagazineInformation
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldMagazineInformation(this HttpRequest request, IDatabase database)
        {
            Object oldMagazineInformation = new Object();
            oldMagazineInformation = request.getMagazineInformation(database).Clone();
            return oldMagazineInformation;
        }
    }
}
