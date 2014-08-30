using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Net;
using System.Xml;

namespace Srims.WindowsService.Import
{
    /// <summary>
    /// 从web中获得xml文档
    /// </summary>
    public class GetXmlDocFromWeb
    {
        /// <summary>
        /// 获得XML文档
        /// </summary>
        /// <returns></returns>
        public static XmlDocument LoadXMLDocument(string url)
        {
            StreamReader streamReader = GetWebContent(url);
            XmlDocument xdoc = new XmlDocument();
            xdoc.Load(streamReader);
            return xdoc;
        }
        private static StreamReader GetWebContent(string Url)
        {
            //声明一个HttpWebRequest请求
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
            //设置连接超时时间
            request.Timeout = 300000;

            request.Headers.Set("Pragma", "no-cache");
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream streamReceive = response.GetResponseStream();
            Encoding encoding = Encoding.GetEncoding("utf-8");
            StreamReader streamReader = new StreamReader(streamReceive, encoding);
            return streamReader;
        }
    }
}
