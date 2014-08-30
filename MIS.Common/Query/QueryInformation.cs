using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Query
{
    /// <summary>
    /// 查询信息
    /// </summary>
    public class QueryInformation
    {
        private int _Start;
        private int _Limit = Int32.MaxValue;

        /// <summary>
        /// 取得或设置起始记录数
        /// </summary>
        public int Start
        {
            get
            {
                return _Start;
            }
            set
            {
                _Start = value;
                if (_Start < 0) _Start = 0;
            }
        }
        /// <summary>
        /// 取得或设置要取得的记录数
        /// </summary>
        public int Limit
        {
            get
            {
                return _Limit;
            }
            set
            {
                _Limit = value;
                if (_Limit < 0) _Limit = 0;
            }
        }
    }
}
