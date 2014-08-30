using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;

namespace Srims.WindowsService.Import
{
    /// <summary>
    /// xml文档解析器
    /// </summary>
    public class XmlDocParse
    {
        /// <summary>
        /// 解析XML文档
        /// </summary>
        /// <param name="xdoc"></param>
        /// <param name="rootNode"></param>
        /// <returns></returns>
        public static List<EntityImport> parseXmlDocument(XmlDocument xdoc, string rootNode)
        {
            List<EntityImport> EntityImportList = new List<EntityImport>();

            foreach (XmlNode xmlNode in xdoc.SelectSingleNode(rootNode).ChildNodes)
            {
                if (xmlNode != null)
                {
                    EntityImport entityImport = new EntityImport();
                    EntityImportList.Add(entityImport);
                    foreach (XmlNode node in xmlNode.ChildNodes)
                        if (node != null)
                            entityImport.ItemList.Add(getItemFromNode(node));
                }

            }
            return EntityImportList;
        }

        private static ItemImport getItemFromNode(XmlNode node)
        {
            ItemImport item = new ItemImport();
            item.Title = getStringFromAttribute(node, "title");
            item.Value = getStringFromAttribute(node, "value");
            return item;
        }

        private static string getStringFromAttribute(XmlNode node, string AttributeName)
        {
            if (node.Attributes[AttributeName] == null)
                return string.Empty;
            else
                return node.Attributes[AttributeName].Value;
        }
    }
}
