using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 日志描述项
    /// </summary>
    public class LogDescriptionItem
    {
        private string _Name;
        private string _Title;
        /// <summary>
        /// 日志描述项的字段名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 日志描述项的字段名称对应的标题
        /// </summary>
        public string Title
        {
            get { return _Title; }
            set { _Title = value; }
        }
    }
}
