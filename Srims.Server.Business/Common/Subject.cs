using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 学科接口
    /// </summary>
    public interface ISubject
    {
        /// <summary>
        /// 取得或设置名称
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// 取得或设置代码
        /// </summary>
        string Code { get; set; }
    }
}
