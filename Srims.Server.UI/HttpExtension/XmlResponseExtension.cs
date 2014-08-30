using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

namespace Srims.Server.UI.HttpExtension
{
    /// <summary>
    /// Xml相应扩展
    /// </summary>
    public static class XmlResponseExtension
    {
        /// <summary>
        /// Xml头
        /// </summary>
        public const string XML_HEAD = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

        /// <summary>
        /// 写入Xml响应的头信息
        /// </summary>
        /// <param name="response">Http响应</param>
        public static void AppendXmlHeader(this HttpResponse response)
        {
            response.AppendHeader("Content-Type", "text/xml; charset=UTF-8");
        }
        /// <summary>
        /// 写入Xml文件头
        /// </summary>
        /// <param name="response">Http响应</param>
        public static void WriteXmlHead(this HttpResponse response)
        {
            response.AppendXmlHeader();
            response.Write(XML_HEAD);
        }
        /// <summary>
        /// 写入开始标签
        /// </summary>
        /// <param name="response">Http响应</param>
        /// <param name="tag">标签名称</param>
        public static void WriteTagBegin(this HttpResponse response, string tag)
        {
            response.Write(String.Format("<{0}>", tag));
        }
        /// <summary>
        /// 写入结束标签
        /// </summary>
        /// <param name="response">Http响应</param>
        /// <param name="tag">标签名称</param>
        public static void WriteTagEnd(this HttpResponse response, string tag)
        {
            response.Write(String.Format("</{0}>", tag));
        }
        /// <summary>
        /// 写入Xml响应的头信息
        /// </summary>
        /// <param name="response">Http响应</param>
        /// <param name="tag"> 标签名称</param>
        /// <param name="value">标签值</param>
        public static void WriteTagWithValue(this HttpResponse response, string tag, object value)
        {
            if (value == null)
                response.Write(String.Format("<{0}></{0}>", tag));
            else if (value.GetType() == typeof(System.DateTime))
                response.Write(String.Format("<{0}>{1}</{0}>", tag, ((DateTime)value).ToString("yyyy/MM/dd", CultureInfo.InvariantCulture)));
            else
                response.Write(String.Format("<{0}>{1}</{0}>", tag, HttpUtility.HtmlEncode(value.ToString())));
        }
    }
}
