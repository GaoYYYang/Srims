using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Users;

namespace Srims.Server.UI.HttpExtension
{
    /// <summary>
    /// 子节点代理（带用户）
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="database"></param>
    /// <param name="user"></param>
    /// <param name="response"></param>
    /// <param name="parameters"></param>
    public delegate void DelegateAddChildrenWithUser<T>(IDatabase database, User user, HttpResponse response, List<T> parameters) where T : Entity<T>;
    /// <summary>
    /// 子节点代理
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="database"></param>
    /// <param name="response"></param>
    /// <param name="parameters"></param>
    public delegate void DelegateAddChildren<T>(IDatabase database, HttpResponse response, List<T> parameters) where T : Entity<T>;
    /// <summary>
    /// 树的扩展方法
    /// </summary>
    public static class TreeLoaderResponseExtension
    {
        /// <summary>
        /// 开始
        /// </summary>
        /// <param name="response"></param>
        public static void WriteBegin(this HttpResponse response)
        {
            response.Write("[");
        }
        /// <summary>
        /// 结束
        /// </summary>
        /// <param name="response"></param>
        public static void WriteEnd(this HttpResponse response)
        {
            response.Write("]");
        }
        /// <summary>
        /// 节点开始
        /// </summary>
        /// <param name="response"></param>
        public static void WriteChildBegin(this HttpResponse response)
        {
            response.Write("{");
        }
        /// <summary>
        /// 节点结束
        /// </summary>
        /// <param name="response"></param>
        /// <param name="isLast"></param>
        public static void WriteChildEnd(this HttpResponse response, bool isLast)
        {
            if (isLast)
                response.Write("}");
            else
                response.Write("},");
        }
        /// <summary>
        /// 叶子
        /// </summary>
        /// <param name="response"></param>
        public static void WriteLeaf(this HttpResponse response)
        {
            response.Write(" leaf:true");
        }
        /// <summary>
        /// id和text
        /// </summary>
        /// <param name="response"></param>
        /// <param name="id"></param>
        /// <param name="text"></param>
        public static void WriteIdAndText(this HttpResponse response, string id, string text)
        {
            response.Write(string.Format("id:'{0}',", id));
            response.Write(string.Format("text:'{0}',", text));
        }
        /// <summary>
        /// children（没有值）
        /// </summary>
        /// <param name="response"></param>
        public static void WriteChildrenWithNoValue(this HttpResponse response)
        {
            response.Write("children:");
        }
        /// <summary>
        /// 写入键值
        /// </summary>
        /// <param name="response"></param>
        /// <param name="tag"></param>
        /// <param name="value"></param>
        public static void WriteNodeWithValue(this HttpResponse response, string tag, string value)
        {
            response.Write(string.Format("{0}:'{1}',", tag, value));
        }
        /// <summary>
        /// 写入键值
        /// </summary>
        /// <param name="response"></param>
        /// <param name="tag"></param>
        /// <param name="value"></param>
        public static void WriteNodeWithValue(this HttpResponse response, string tag, bool value)
        {
            response.Write(string.Format("{0}:{1},", tag, value));
        }
    }
}
