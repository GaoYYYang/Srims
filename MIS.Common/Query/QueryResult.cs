using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Query
{
    /// <summary>
    /// 查询结果
    /// </summary>
    /// <typeparam name="T">要查询的实体类</typeparam>
    public class QueryResult<T>
    {
        private IList<T> _ResultList;
        private int _Total;

        /// <summary>
        /// 取得结果列表
        /// </summary>
        public IList<T> ResultList
        {
            get { return _ResultList; }
        }
        /// <summary>
        /// 取得满足此次查询的总的记录数
        /// </summary>
        public int Total
        {
            get { return _Total; }
        }

        /// <summary>
        /// 构造查询结果
        /// </summary>
        /// <param name="resultList">返回的实体列表</param>
        /// <param name="total">满足查询条件的总数</param>
        public QueryResult(IList<T> resultList, int total)
        {
            this._ResultList = resultList;
            this._Total = total;
        }
    }
}
