using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

using MIS.Common;

namespace MIS.Test.Common
{
    [TestClass]
    public class InvalidDataExceptionTest
    {
        [TestMethod]
        public void CtorTest()
        {
            InvalidDataException exception;

            exception = new InvalidDataException();
            Assert.AreEqual<string>(InvalidDataException.DEFAULT_ERROR_MESSAGE, exception.Message);

            exception = new InvalidDataException("m");
            Assert.AreEqual<string>("m", exception.Message);
        }
    }
}
