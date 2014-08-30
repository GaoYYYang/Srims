using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Papers;

namespace Srims.Server.DataExchange.PaperImport
{
    /// <summary>
    /// 论文导入帮助
    /// </summary>
    public static class PaperImportHelper
    {
        /// <summary>
        /// 取得论文类型
        /// </summary>
        /// <param name="paperType"></param>
        /// <returns></returns>
        public static PaperType GetPaperType(this string paperType)
        {
            paperType = paperType.Trim();

            switch (paperType)
            {
                case "Article": return PaperType.Article;
                case "Correction": return PaperType.Correction;
                case "Editorial Material": return PaperType.Editiorial_Material;
                case "Letter": return PaperType.Letter;
                case "Meeting Abstract": return PaperType.Meeting_Abstract;
                case "Note": return PaperType.Note;
                case "Review": return PaperType.Riview;
                case "Proceedings Paper": return PaperType.ProceedingsPaper;
                default: return PaperType.Unknown;
            }
        }
        /// <summary>
        /// 取得杂志语言类型
        /// </summary>
        /// <param name="MagazineLanguage"></param>
        /// <returns></returns>
        public static Language GetLanguage(this string MagazineLanguage)
        {
            MagazineLanguage = MagazineLanguage.Trim();
            switch (MagazineLanguage)
            {
                case "Catalan": return Language.others;
                case "Chinese": return Language.Chinese;
                case "English": return Language.English;
                case "GerMan": return Language.GerMan;
                case "Japanese": return Language.Japanese;
                case "Rumanian": return Language.Rumanian;
                case "Spanish": return Language.Spanish;
                default: return Language.Unknown;
            }
        }
        /// <summary>
        /// 取得杂志出版类型
        /// </summary>
        /// <param name="MagazinePublishType"></param>
        /// <returns></returns>
        public static PublishType GetPublishType(this string MagazinePublishType)
        {
            MagazinePublishType = MagazinePublishType.Trim();
            switch (MagazinePublishType)
            {
                case "Book": return PublishType.B;
                case "Journal": return PublishType.J;
                case "Book in Series": return PublishType.S;
                case "Conference": return PublishType.C;
                default: return PublishType.Unkown;
            }
        }
        /// <summary>
        /// 取得作者署名单位
        /// </summary>
        /// <param name="signUnit"></param>
        /// <returns></returns>
        public static SignUnit GetSignUnit(this string signUnit)
        {
            switch (signUnit.Trim())
            {
                case "中国海洋大学": return SignUnit.School;
                case "外单位": return SignUnit.UnitOut;
                case "中国海洋大学+外单位": return SignUnit.SchoolUnitOut;
                case "外单位+中国海洋大学": return SignUnit.UnitOutSchool;
                default: return SignUnit.UnKnown;

            }
        }
        /// <summary>
        /// 取得论文收录
        /// </summary>
        /// <param name="paperEmbody"></param>
        /// <returns></returns>
        public static List<PaperIndexedType> GetPaperIndex(this string paperEmbody)
        {
            List<PaperIndexedType> paperIndexTypeList = new List<PaperIndexedType>();
            switch (paperEmbody.Trim())
            {
                case "SCI":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.SCI);
                    return paperIndexTypeList;
                case "SCI光盘":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.SCI);
                    paperIndexTypeList.Add(PaperIndexedType.SCICD);
                    return paperIndexTypeList;
                case "SCI网络":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.SCI);
                    paperIndexTypeList.Add(PaperIndexedType.SCINetWork);
                    return paperIndexTypeList;
                case "EI":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.EI);
                    return paperIndexTypeList;
                case "EI核心":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.EI);
                    paperIndexTypeList.Add(PaperIndexedType.EICore);
                    return paperIndexTypeList;
                case "EI网络":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.EI);
                    paperIndexTypeList.Add(PaperIndexedType.EINetWork);
                    return paperIndexTypeList;
                case "ISTP":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.ISTP);
                    return paperIndexTypeList;
                case "SSCI":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.SSCI);
                    return paperIndexTypeList;
                case "ISTP-S":
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.ISTP_S);
                    return paperIndexTypeList;
                default:
                    paperIndexTypeList.Clear();
                    paperIndexTypeList.Add(PaperIndexedType.Unknown);
                    return paperIndexTypeList;
            }
        }
        /// <summary>
        /// 取得通信作者
        /// </summary>
        /// <param name="linkMan"></param>
        /// <returns></returns>
        public static string GetLinkMan(this string linkMan)
        {
            int FirstComma = linkMan.IndexOf(',', 0);
            if (FirstComma < 0)
                return linkMan;

            int SecoundComma = linkMan.IndexOf(',', FirstComma + 1);
            if (SecoundComma < 0)
                return linkMan;

            return linkMan.Substring(0, SecoundComma);
        }
    }
}
