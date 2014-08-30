using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;

namespace MIS.Util.Data.EntityPrase
{
    /// <summary>
    /// Xml实体解析器
    /// </summary>
    public static class EntityXmlParser
    {
        private const string XmlNameSpace = @"http://it.ouc.edu.cn/DatabaseDescription/V2";

        /// <summary>
        /// 解析Xml
        /// </summary>
        /// <param name="document">要解析的Xml文档</param>
        /// <returns>对应的实体集合</returns>
        public static Entity[] ParseXml(XmlDocument document)
        {
            if (document == null)
                throw new ArgumentNullException("document");

            List<Entity> entityList = new List<Entity>();

            XmlNamespaceManager xmlNamespaceManager = new XmlNamespaceManager(document.NameTable);
            xmlNamespaceManager.AddNamespace("p", XmlNameSpace);
            foreach (XmlNode xmlNode in document.SelectSingleNode("//p:Entities", xmlNamespaceManager).ChildNodes)
            {
                setHasManyAttributeToTrue(xmlNode);
                buildEntityList(entityList, null, xmlNode);
            }

            return entityList.ToArray();
        }

        private static void setHasManyAttributeToTrue(XmlNode xmlNode)
        {
            XmlAttribute hasmanyAttribute = xmlNode.OwnerDocument.CreateAttribute("hasmany");
            hasmanyAttribute.Value = "true";

            xmlNode.Attributes.RemoveNamedItem("hasmany");
            xmlNode.Attributes.Append(hasmanyAttribute);
        }

        private static void buildEntityList(List<Entity> entityList, Entity parentEntity, XmlNode entityNode)
        {
            Entity currentEntity = parentEntity;

            //此节点对应表的情况
            if (getStringFromAttribute(entityNode, "hasmany") == "true")
            {
                currentEntity = new Entity();
                currentEntity.Name = Convert.ToString(getStringFromAttribute(entityNode, "name"));
                currentEntity.Title = Convert.ToString(getStringFromAttribute(entityNode, "title"));
                currentEntity.Module = Convert.ToString(getStringFromAttribute(entityNode, "module"));
                entityList.Add(currentEntity);

                //加入主键
                Item idItem = new Item { Require = true };
                idItem.ItemType = ItemType.PrimaryKey;
                idItem.Name = "ID";
                currentEntity.ItemList.Add(idItem);

                //加入外键
                if (parentEntity != null)
                {
                    Item foreignKeyColumn = new Item { Require = true };
                    foreignKeyColumn.Name = parentEntity.Name;
                    foreignKeyColumn.ItemType = ItemType.ForeignKey;
                    currentEntity.ItemList.Add(foreignKeyColumn);
                }
            }

            //解析列和表
            foreach (XmlNode node in entityNode)
            {
                if (node.Name == "Entity")
                    buildEntityList(entityList, currentEntity, node);
                if (node.Name == "Item")
                    currentEntity.ItemList.Add(getItemFromNode(node));

            }
        }

        private static Item getItemFromNode(XmlNode node)
        {
            Item item = new Item { Require = true };
            buildTypeFromNode(node, item);
            buildPropertyTypeFromNode(node, item);

            item.Description = getStringFromAttribute(node, "description");
            item.Name = getStringFromAttribute(node, "name");
            item.Title = getStringFromAttribute(node, "title");
            item.EnumName = getStringFromAttribute(node, "enumName");
            item.EntityName = getStringFromAttribute(node, "entityName");

            if (!string.IsNullOrEmpty(getStringFromAttribute(node, "require")))
                item.Require = Convert.ToBoolean(getStringFromAttribute(node, "require"));

            return item;
        }

        private static void buildTypeFromNode(XmlNode node, Item column)
        {
            string typeStirng = getStringFromAttribute(node, "type");

            //实体用外键
            if (string.Equals("entity", typeStirng))
            {
                column.ItemType = ItemType.ForeignKey;
                return;
            }

            column.ItemType = (ItemType)Enum.Parse(typeof(ItemType), typeStirng, true);

            if (column.ItemType == ItemType.Text || column.ItemType == ItemType.LongText) column.Require = false;
        }
        private static void buildPropertyTypeFromNode(XmlNode node, Item item)
        {
            string typeStirng = getStringFromAttribute(node, "property");
            if (String.IsNullOrEmpty(typeStirng))
                item.PropertyType = PropertyType.Both;
            else
                item.PropertyType = (PropertyType)Enum.Parse(typeof(PropertyType), typeStirng, true);
        }
        private static string getStringFromAttribute(XmlNode node, string arrtibuteName)
        {
            if (node.Attributes[arrtibuteName] == null)
                return string.Empty;
            else
                return node.Attributes[arrtibuteName].Value;
        }
    }
}
