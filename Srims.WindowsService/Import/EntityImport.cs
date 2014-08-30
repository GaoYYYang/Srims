using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.WindowsService.Import
{
    /// <summary>
    /// 要导入的数据
    /// </summary>
    public class EntityImport
    {
        private List<ItemImport> _ItemList = new List<ItemImport>();
        /// <summary>
        /// 导入数据的详细信息
        /// </summary>
        public List<ItemImport> ItemList
        {
            get { return _ItemList; }
            set { _ItemList = value; }
        }
    }
}
