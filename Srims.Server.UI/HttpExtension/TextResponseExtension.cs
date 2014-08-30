using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Srims.Server.UI.HttpExtension
{
    /// <summary>
    /// 文本相应扩展
    /// </summary>
    public static class TextResponseExtension
    {
        /// <summary>
        /// 显示Bool类型
        /// </summary>
        /// <param name="value"></param>
        /// <param name="response"></param>
        public static void Show(this bool value, HttpResponse response)
        {
            response.Write(value);
        }
    }
}
