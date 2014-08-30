using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Papers;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 论文收录的相关扩展
    /// </summary>
    public static class PaperIndexedExtension
    {
        /// <summary>
        /// 论文收录的显示扩展
        /// </summary>
        /// <param name="indexedType"></param>
        /// <returns></returns>
        public static string Show(this PaperIndexedType indexedType)
        {
            switch (indexedType)
            {
                case PaperIndexedType.EI: return "EI";
                case PaperIndexedType.EICore: return "EI核心";
                case PaperIndexedType.EINetWork: return "EI网络";
                case PaperIndexedType.ISTP: return "ISTP";
                case PaperIndexedType.SCI: return "SCI";
                case PaperIndexedType.SCICD: return "SCI光盘";
                case PaperIndexedType.SCINetWork: return "SCI网络";
                case PaperIndexedType.SSCI: return "SSCI";
                case PaperIndexedType.ISTP_S: return "ISTP_S";
                default: return "未知";
            }
        }
        /// <summary>
        /// 取得论文收录情况的显示扩展
        /// </summary>
        /// <param name="indexedList"></param>
        /// <returns></returns>
        public static string Show(this IList<PaperIndexedType> indexedList)
        {
            if (indexedList == null || indexedList.Count == 0)
                return "未知";

            if (indexedList.Contains(PaperIndexedType.EI) && (indexedList.Contains(PaperIndexedType.EICore) || indexedList.Contains(PaperIndexedType.EINetWork)))
                indexedList.Remove(PaperIndexedType.EI);

            if (indexedList.Contains(PaperIndexedType.SCI) && (indexedList.Contains(PaperIndexedType.SCICD) || indexedList.Contains(PaperIndexedType.SCINetWork)))
                indexedList.Remove(PaperIndexedType.SCI);

            StringBuilder indexedStringBuilder = new StringBuilder();

            foreach (var embody in indexedList)
                indexedStringBuilder.Append(embody.Show() + ",");

            return indexedStringBuilder.Remove(indexedStringBuilder.Length - 1, 1).ToString();
        }
        /// <summary>
        ///  取得论文收录情况的字符串扩展
        /// </summary>
        /// <param name="indexedList"></param>
        /// <returns></returns>
        public static string ShowStr(this IList<PaperIndexedType> indexedList)
        {
            if (indexedList == null || indexedList.Count == 0)
                return "未知";

            if (indexedList.Contains(PaperIndexedType.EI) && (indexedList.Contains(PaperIndexedType.EICore) || indexedList.Contains(PaperIndexedType.EINetWork)))
                indexedList.Remove(PaperIndexedType.EI);

            if (indexedList.Contains(PaperIndexedType.SCI) && (indexedList.Contains(PaperIndexedType.SCICD) || indexedList.Contains(PaperIndexedType.SCINetWork)))
                indexedList.Remove(PaperIndexedType.SCI);

            StringBuilder indexedStringBuilder = new StringBuilder();

            foreach (var embody in indexedList)
                indexedStringBuilder.Append(embody + ",");

            return indexedStringBuilder.Remove(indexedStringBuilder.Length - 1, 1).ToString();
        }
    }
}
