using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

namespace Srims.Server.UI.MISExtension
{
    /// <summary>
    /// 查询相关扩展
    /// </summary>
    public static class QueryInformationExtension
    {
        /// <summary>
        /// 默认分页大小
        /// </summary>
        public const int QUERY_CONDITION_DEFAULT_LIMIT = 40;

        /// <summary>
        /// 取得查询信息
        /// </summary>
        /// <param name="request"> Http请求</param>
        /// <returns></returns>
        public static QueryInformation GetQueryInformation(this HttpRequest request)
        {
            return new QueryInformation
            {
                Start = request.GetQueryInformation_Start(),
                Limit = request.GetQueryInformation_Limit(),
            };
        }
        /// <summary>
        /// 取得分页起始值
        /// </summary>
        /// <param name="request"> Http请求</param>
        /// <returns></returns>
        public static int GetQueryInformation_Start(this HttpRequest request)
        {
            var start = request["start"];
            return string.IsNullOrEmpty(start) ? 0 : Convert.ToInt32(start);
        }
        /// <summary>
        /// 取得分页大小
        /// </summary>
        /// <param name="request"> Http请求</param>
        /// <returns>如果未定义分页大小，则返回默认值</returns>
        public static int GetQueryInformation_Limit(this HttpRequest request)
        {
            var start = request["limit"];
            return string.IsNullOrEmpty(start) ? QUERY_CONDITION_DEFAULT_LIMIT : Convert.ToInt32(start);
        }

        /// <summary>
        /// 取得排序信息
        /// </summary>
        /// <param name="request"> Http请求</param>
        /// <returns></returns>
        public static SortInfo GetQueryCondition_SortInfo(this HttpRequest request)
        {
            var field = request["sort"];
            if (string.IsNullOrEmpty(field))
                return null;

            var sortInfo = new SortInfo();
            sortInfo.Field = field;
            sortInfo.Direction = request["dir"] == "ASC" ? SortDirection.ASC : SortDirection.DESC;

            return sortInfo;
        }
    }
}
