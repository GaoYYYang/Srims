using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Statistics;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Statistic
{
    /// <summary>
    /// 维度显示扩展
    /// </summary>
    public static class DimensionExtension
    {
        /// <summary>
        /// 取得请求中的维度
        /// </summary>
        /// <param name="request"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static Dimension GetDimension(this HttpRequest request, string name)
        {
            return new Dimension
            {
                Name = request.GetString(name + "Dimension"),
                Size = request.GetString(name + "DimensionSize")
            };
        }
    }
}
