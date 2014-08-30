using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

using MIS.Common.Query;

namespace MIS.Test.Common.Query
{
    [TestClass]
    public class QueryInformationTest
    {
        [TestMethod, Description("查询信息的属性测试")]
        public void PropertyTest()
        {
            QueryInformation queryInformation = new QueryInformation();

            //Original Test
            Assert.AreEqual<int>(0, queryInformation.Start);
            Assert.AreEqual<int>(Int32.MaxValue, queryInformation.Limit);

            //Set Values
            queryInformation.Start = 40;
            queryInformation.Limit = 20;
            Assert.AreEqual<int>(40, queryInformation.Start);
            Assert.AreEqual<int>(20, queryInformation.Limit);

            //Set values less than zero
            queryInformation.Start = -1;
            queryInformation.Limit = -2;
            Assert.AreEqual<int>(0, queryInformation.Start);
            Assert.AreEqual<int>(0, queryInformation.Limit);
        }
    }
}
