using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;
using System.Web.UI;

using MIS.Common;
using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;

namespace Srims.Server.UI.HttpExtension
{
    /// <summary>
    /// 查询条件扩展
    /// </summary>
    public static class RequestExtension
    {
        /// <summary>
        /// 取得字符串查询条件
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static string GetString(this HttpRequest request, string name)
        {
            string value = request[name];

            var keys = request.getFilterKey(name, "string");
            if (keys.Length > 0)
                value = request[keys[0] + "[data][value]"];

            return value;
        }
        /// <summary>
        /// 取得整数查询条件
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static int? GetInt(this HttpRequest request, string name)
        {
            var valueString = request.GetString(name);
            return string.IsNullOrEmpty(valueString) ? null : new int?(Convert.ToInt32(valueString));
        }
        /// <summary>
        /// 取得日期
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static DateTime? GetDateTime(this HttpRequest request, string name)
        {
            var valueString = request.GetString(name);
            return string.IsNullOrEmpty(valueString) ? null : new DateTime?(Convert.ToDateTime(valueString));
        }
        /// <summary>
        /// 取得长整数
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static long? GetLong(this HttpRequest request, string name)
        {
            var valueString = request.GetString(name);
            return string.IsNullOrEmpty(valueString) ? null : new long?(Convert.ToInt64(valueString));
        }
        /// <summary>
        /// 取得金额
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static long? GetMoney(this HttpRequest request, string name)
        {
            return request.GetLong(name);
        }
        /// <summary>
        /// 取得guid
        /// </summary>
        /// <param name="request"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static Guid? GetGuid(this HttpRequest request, string name)
        {
            var valueString = request.GetString(name);

            return string.IsNullOrEmpty(valueString) ? null : new Nullable<Guid>(new Guid(valueString));
        }
        /// <summary>
        /// ..
        /// </summary>
        /// <param name="request"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string GetExportFileName(this HttpRequest request, string name)
        {
            var valueString = request.GetString(name);
            return string.IsNullOrEmpty(valueString) ? "" : "11";
        }
        /// <summary>
        /// 取得列表查询条件
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static T[] GetList<T>(this HttpRequest request, string name)
        {
            string value = request[name];

            var keys = request.getFilterKey(name, "list");
            if (keys.Length > 0)
                value = request[keys[0] + "[data][value]"];

            keys = request.getFilterKey(name, "string");
            if (keys.Length > 0)
                value = request[keys[0] + "[data][value]"];

            if (string.IsNullOrEmpty(value))
                return null;

            var strings = value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var result = new List<T>();
            foreach (var item in strings)
                result.Add((T)Convert.ChangeType(item, typeof(T)));

            return result.ToArray();
        }
        /// <summary>
        /// 取得实体
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="request"></param>
        /// <param name="query"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static T GetEntity<T>(this HttpRequest request, IQueryable<T> query, string name)
            where T : Entity<T>
        {
            var id = request.GetInt(name);
            if (!id.HasValue)
                return null;

            return query.GetByID(id.Value);
        }
        /// <summary>
        /// 取的枚举查询条件
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static T GetEnum<T>(this HttpRequest request, string name)
        {
            var enumString = request.GetString(name);
            if (enumString == null)
                return default(T);
            else if (string.IsNullOrEmpty(enumString))
                return default(T);

            return (T)Enum.Parse(typeof(T), enumString.ToString());
        }
        /// <summary>
        /// 取的枚举列表查询条件
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static T[] GetEnumList<T>(this HttpRequest request, string name)
        {
            var enums = request.GetList<String>(name);
            if (enums == null)
                return null;

            var list = new List<T>();
            foreach (var e in enums)
                list.Add((T)Enum.Parse(typeof(T), e));

            return list.ToArray();
        }
        /// <summary>
        /// 取得布尔查询条件
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static bool? GetBoolean(this HttpRequest request, string name)
        {
            string valueString = request[name];

            var keys = request.getFilterKey(name, "boolean");
            if (keys.Length > 0)
                valueString = request[keys[0] + "[data][value]"];

            if (valueString != null)
                valueString = valueString.Trim();

            return string.IsNullOrEmpty(valueString)
                ? null
                : new bool?(Convert.ToBoolean(valueString));
        }

        /// <summary>
        /// 取得日期区间
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static Range<DateTime> GetDateRange(this HttpRequest request, string name)
        {
            return request.GetRange<DateTime>(name, "date");
        }
        /// <summary>
        /// 取得金钱区间
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <returns></returns>
        public static Range<long> GetMoneyRange(this HttpRequest request, string name)
        {
            return request.GetRange<long>(name, "numeric");
        }
        /// <summary>
        /// 取得整形区间
        /// </summary>
        /// <param name="request"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static Range<Int32> GetIntRange(this HttpRequest request, string name)
        {
            return request.GetRange<Int32>(name, "numeric");
        }
        /// <summary>
        /// 取得区间
        /// </summary>
        /// <param name="request">Http请求</param>
        /// <param name="name">条件名称</param>
        /// <param name="type">区间的数据类型</param>
        /// <returns></returns>
        public static Range<T> GetRange<T>(this HttpRequest request, string name, string type)
            where T : struct
        {
            var startValueString = request[name + "Start"];
            var endValueString = request[name + "End"];

            var keys = request.getFilterKey(name, type);
            foreach (var key in keys)
            {
                if (request[key + "[data][comparison]"] == "gt")
                    startValueString = request[key + "[data][value]"];
                else if (request[key + "[data][comparison]"] == "lt")
                    endValueString = request[key + "[data][value]"];
                else if (request[key + "[data][comparison]"] == "eq")
                {
                    startValueString = request[key + "[data][value]"];
                    endValueString = request[key + "[data][value]"];
                }
            }

            Range<T> range = new Range<T>();
            if (!string.IsNullOrEmpty(startValueString))
                range.Start = (T)Convert.ChangeType(startValueString, typeof(T));
            if (!string.IsNullOrEmpty(endValueString))
                range.End = (T)Convert.ChangeType(endValueString, typeof(T));

            return range.End.HasValue || range.Start.HasValue ? range : null;
        }

        private static string[] getFilterKey(this HttpRequest request, string name, string valueType)
        {
            var list = new List<string>();
            foreach (var item in request.Params)
                if (request[item.ToString()].Equals(name, StringComparison.InvariantCultureIgnoreCase))
                    if (request[item.ToString().Replace("[field]", string.Empty) + "[data][type]"].EqualIgnoreCase(valueType))
                        list.Add(item.ToString().Replace("[field]", string.Empty));

            return list.ToArray<string>();
        }
        /// <summary>
        /// 取得上传文档
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static HttpFileCollection GetHttpFiles(this HttpRequest request)
        {
            return request.Files;
        }
    }
}

