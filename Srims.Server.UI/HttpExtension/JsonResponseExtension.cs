using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Srims.Server.UI.HttpExtension
{
    /// <summary>
    /// json相应扩展
    /// </summary>
    public static class JsonResponseExtension
    {
        /// <summary>
        /// 字符串扩展
        /// </summary>
        /// <param name="stringList"></param>
        /// <param name="response"></param>
        public static void ShowAsJson(this IList<string> stringList, HttpResponse response)
        {
            response.WriteJsonBegin();
            response.WriteJosnWithNoValue("values");
            response.WriteArrayBegin();

            int i = 1;
            foreach (var s in stringList)
            {
                if (string.IsNullOrEmpty(s))
                    continue;

                response.WriteJsonBegin();

                response.WriteJsonWithValue("id", i++.ToString(), false);
                response.WriteJsonWithValue("value", s.ToString(), true);

                response.WriteJsonEnd(stringList.Last() == s);

            }
            response.WriteArrayEnd();
            response.WriteJsonEnd(true);
        }
        /// <summary>
        /// 数组头
        /// </summary>
        /// <param name="response"></param>
        public static void WriteArrayBegin(this HttpResponse response)
        {
            response.Write("[");
        }
        /// <summary>
        /// 数组尾
        /// </summary>
        /// <param name="response"></param>
        public static void WriteArrayEnd(this HttpResponse response)
        {
            response.Write("]");
        }
        /// <summary>
        /// json头
        /// </summary>
        /// <param name="response"></param>
        public static void WriteJsonBegin(this HttpResponse response)
        {
            response.Write("{");
        }
        /// <summary>
        /// json尾
        /// </summary>
        /// <param name="response"></param>
        /// <param name="isLast"></param>
        public static void WriteJsonEnd(this HttpResponse response, bool isLast)
        {
            if (isLast)
                response.Write("}");
            else
                response.Write("},");
        }
        /// <summary>
        /// 键值对
        /// </summary>
        /// <param name="response"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="isLast"></param>
        public static void WriteJsonWithValue(this HttpResponse response, string key, string value, bool isLast)
        {
            if (isLast)
                response.Write(string.Format("{0}:'{1}'", key, value));
            else
                response.Write(string.Format("{0}:'{1}',", key, value));
        }
        /// <summary>
        /// 键
        /// </summary>
        /// <param name="response"></param>
        /// <param name="key"></param>
        public static void WriteJosnWithNoValue(this HttpResponse response, string key)
        {
            response.Write(string.Format("{0}:", key));
        }
    }
}
