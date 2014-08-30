using System;
using System.Collections.Generic;
using System.Text;

namespace MIS.Util.Data.EntityPrase
{
    /// <summary>
    /// 实体项
    /// </summary>
    public class Item
    {
        /// <summary>
        /// 取得或设置项的名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置项的标题
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 取得或设置项对应的实体类型，当项的类型为实体时有效
        /// </summary>
        public string EntityName { get; set; }
        /// <summary>
        /// 取得或设置项对应的枚举类型，当项的类型为枚举时有效
        /// </summary>
        public string EnumName { get; set; }
        /// <summary>
        /// 取得或设置项的数据类型
        /// </summary>
        public ItemType ItemType { get; set; }
        /// <summary>
        /// 取得或设置生成属性的类型
        /// </summary>
        public PropertyType PropertyType { get; set; }
        /// <summary>
        /// 取得或设置项是否必填
        /// </summary>
        public bool Require { get; set; }
        /// <summary>
        /// 取得或设置项的描述
        /// </summary>
        public string Description { get; set; }
    }
}
