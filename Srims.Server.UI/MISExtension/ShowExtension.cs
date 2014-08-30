using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;

using MIS.Common.Query;

namespace Srims.Server.UI.MISExtension
{
    /// <summary>
    /// 显示代理
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="entity"></param>
    /// <param name="response"></param>
    public delegate void ShowDelegate<T>(T entity, HttpResponse response) where T : Entity<T>;
    /// <summary>
    /// 显示代理（带database）
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="entity"></param>
    /// <param name="database"></param>
    /// <param name="response"></param>
    public delegate void ShowDelegateWithDatabase<T>(T entity, HttpResponse response, IDatabase database) where T : Entity<T>;
    /// <summary>
    /// 显示代理（带user）
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="entity"></param>
    /// <param name="response"></param>
    /// <param name="user"></param>
    public delegate void ShowDelegateWithUser<T>(T entity, HttpResponse response, User user) where T : Entity<T>;
    /// <summary>
    /// 显示代理（database和User）
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="entity"></param>
    /// <param name="response"></param>
    /// <param name="user"></param>
    /// <param name="database"></param>
    public delegate void ShowDelegateWithUserAndDatabase<T>(T entity, HttpResponse response, User user, IDatabase database) where T : Entity<T>;
    /// <summary>
    /// 显示扩展
    /// </summary>
    public static class ShowExtension
    {

        /// <summary>
        /// 显示实体列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityList"></param>
        /// <param name="response"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this IList<T> entityList, HttpResponse response, ShowDelegate<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("List");

            foreach (var entity in entityList)
            {
                response.WriteTagBegin("Record");
                showEntity(entity, response);
                response.WriteTagEnd("Record");

            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this IList<T> entityList, HttpResponse response, User user, ShowDelegateWithUser<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("List");

            foreach (var entity in entityList)
            {
                response.WriteTagBegin("Record");
                showEntity(entity, response, user);
                response.WriteTagEnd("Record");

            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityList"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this IList<T> entityList, HttpResponse response, IDatabase database, ShowDelegateWithDatabase<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("List");

            foreach (var entity in entityList)
            {
                response.WriteTagBegin("Record");
                showEntity(entity, response, database);
                response.WriteTagEnd("Record");

            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示实体列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this IList<T> entityList, HttpResponse response, User user, IDatabase database, ShowDelegateWithUserAndDatabase<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("List");

            foreach (var entity in entityList)
            {
                response.WriteTagBegin("Record");
                showEntity(entity, response, user, database);
                response.WriteTagEnd("Record");
            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 将实体包含在列表中显示
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <param name="showEntity"></param>
        public static void ShowInList<T>(this T entity, HttpResponse response, User user, IDatabase database, ShowDelegateWithUserAndDatabase<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("List");
            response.WriteTagBegin("Record");
            showEntity(entity, response, user, database);
            response.WriteTagEnd("Record");
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 查询显示
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryResult"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this QueryResult<T> queryResult, HttpResponse response, User user, IDatabase database, ShowDelegateWithUserAndDatabase<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", queryResult.Total);
            queryResult.ResultList.Show<T>(response, user, database, showEntity);

            response.WriteTagEnd("QueryResult");

            var b = response.ToString();
        }
        /// <summary>
        /// 查询显示
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryResult"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this QueryResult<T> queryResult, HttpResponse response, IDatabase database, ShowDelegateWithDatabase<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", queryResult.Total);
            queryResult.ResultList.Show<T>(response, database, showEntity);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 查询显示
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryResult"></param>
        /// <param name="response"></param>
        /// <param name="showEntity"></param>
        public static void Show<T>(this QueryResult<T> queryResult, HttpResponse response, ShowDelegate<T> showEntity)
            where T : Entity<T>
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", queryResult.Total);
            queryResult.ResultList.Show<T>(response, showEntity);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 对整形的显示扩展
        /// </summary>
        /// <param name="count"></param>
        /// <param name="response"></param>
        public static void Show(this int count, HttpResponse response)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("Count", count);

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 对字符串的现实扩展
        /// </summary>
        /// <param name="value"></param>
        /// <param name="name"></param>
        /// <param name="response"></param>
        public static void Show(this string value, string name, HttpResponse response)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue(name, value);

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 字符串的显示扩展（IDValue）
        /// </summary>
        /// <param name="stringList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<string> stringList, HttpResponse response)
        {
            response.WriteTagBegin("List");

            foreach (var s in stringList)
            {
                if (string.IsNullOrEmpty(s))
                    continue;

                response.WriteTagBegin("Record");

                response.WriteTagWithValue("ID", s);
                response.WriteTagWithValue("Value", s);

                response.WriteTagEnd("Record");
            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 连接数组各个元素构成字符串
        /// </summary>
        /// <param name="array">要连接的数组</param>
        /// <param name="separater">分隔符</param>
        /// <returns>连接后组成的字符串</returns>
        public static string ToString(this Array array, string separater)
        {
            if (array == null)
                return null;

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < array.Length; i++)
            {
                if (array.GetValue(i) != null)
                {
                    builder.Append(array.GetValue(i).ToString());
                    builder.Append(separater);
                }
            }

            if (builder.Length > 0 && !String.IsNullOrEmpty(separater))
                builder.Remove(builder.Length - 1, 1);

            return builder.ToString();
        }
    }
}
