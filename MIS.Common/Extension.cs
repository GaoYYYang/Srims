using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace MIS.Common
{
    /// <summary>
    /// 通用扩展类
    /// </summary>
    public static class Extension
    {
        /// <summary>
        /// 资金的单位
        /// </summary>
        public const long MONEY_UNIT = 10000 * 100;
        /// <summary>
        /// <summary>
        /// 连接数组各个元素构成字符串
        /// </summary>
        /// <param name="array">要连接的数组</param>
        /// <param name="separater">分隔符</param>
        /// <returns>连接后组成的字符串</returns>
        public static string ToString(this Array array, string separater)
        {
            if (array == null || array.Length == 0)
                return null;

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < array.Length; i++)
            {
                builder.Append(array.GetValue(i).ToString());
                builder.Append(separater);
            }

            if (!string.IsNullOrEmpty(separater))
                builder.Remove(builder.Length - 1, 1);

            return builder.ToString();
        }
        /// <summary>
        /// 将一个字符串打散为一个数组
        /// </summary>
        /// <param name="value">要打散的字符串</param>
        /// <param name="separater">分隔符</param>
        /// <typeparam name="T">打散后的数据类型</typeparam>
        /// <returns>连接后组成的字符串</returns>
        public static T[] ToArray<T>(this string value, string separater)
        {
            if (string.IsNullOrEmpty(value))
                return new T[] { };

            var valueStrings = value.Split(new string[] { separater }, StringSplitOptions.RemoveEmptyEntries);

            var list = new List<T>();
            foreach (var valueString in valueStrings)
                list.Add((T)Convert.ChangeType(valueString, typeof(T)));

            return list.ToArray();
        }

        /// <summary>
        /// 忽略大小写比较字符串
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool EqualIgnoreCase(this string sender, string value)
        {
            if (sender == null)
                return value == null;
            else
                return sender.Equals(value, StringComparison.InvariantCultureIgnoreCase);
        }
        /// <summary>
        /// 对象的显示扩展
        /// </summary>
        /// <param name="o">对象</param>
        /// <returns>对应的字符串，如果为空，则显示nbsp;</returns>
        public static string ToShowAsHtmlString(this object o)
        {
            return o == null || String.IsNullOrEmpty(o.ToString().Trim()) ? "&nbsp;" : o.ToString();
        }
        /// <summary>
        /// 资金显示
        /// </summary>
        /// <param name="money"></param>
        /// <returns></returns>
        public static String ToShowAsMoney(this long money)
        {
            return (((double)money) / MONEY_UNIT).ToString();
        }
    }
}
