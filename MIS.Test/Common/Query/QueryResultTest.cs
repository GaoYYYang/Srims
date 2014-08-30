using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

using MIS.Common.Query;

namespace MIS.Test.Common.Query
{
    [TestClass]
    public class QueryResultTest
    {
        [TestMethod, Description("查询结果的属性测试")]
        public void QueryResultPropertyTest()
        {
            List<Int32> list = new List<int>();
            int totalCount = 20;

            QueryResult<Int32> querResult = new QueryResult<Int32>(list, totalCount);
            Assert.AreSame(list, querResult.ResultList);
            Assert.AreEqual<int>(totalCount, querResult.Total);
        }
    }
}
