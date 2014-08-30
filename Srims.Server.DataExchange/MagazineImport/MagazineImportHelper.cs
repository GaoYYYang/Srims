using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Papers;

namespace Srims.Server.DataExchange.MagazineImport
{
    /// <summary>
    /// 杂志导入帮助
    /// </summary>
    public static class MagazineImportHelper
    {
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
    }
}
