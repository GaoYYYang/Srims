using System;
using System.Collections.Generic;
using System.Text;

namespace MIS.Util.Data.EntityPrase
{
    /// <summary>
    /// 实体
    /// </summary>
    public class Entity
    {
        private List<Item> _ItemList = new List<Item>();

        /// <summary>
        /// 取得或设置实体名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 取得或设置实体标题
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 取得或设置实体所属的模块
        /// </summary>
        public string Module { get; set; }
        /// <summary>
        /// 实体所包含内容的集合
        /// </summary>
        public List<Item> ItemList
        {
            get { return _ItemList; }
            set { _ItemList = value; }
        }

    }
}
