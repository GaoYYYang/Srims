using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

using MIS.Common;

namespace MIS.Test.Common
{
    [TestClass]
    public class SpellTest
    {
        [TestMethod, Description("汉字转拼音首字母测试")]
        public void GetSpellTest()
        {
            Assert.AreEqual<string>(string.Empty, Spell.GetSpell(string.Empty));
            Assert.AreEqual<string>(null, Spell.GetSpell(null));
            Assert.AreEqual<string>("YD", Spell.GetSpell("袁冬"));
            Assert.AreEqual<string>("YDYUANDONG", Spell.GetSpell("袁冬yuandong"));
            Assert.AreEqual<string>("YDYUANDONG", Spell.GetSpell("袁冬YUANDONG"));
            Assert.AreEqual<string>("YDYUANDONG", Spell.GetSpell("袁冬YUANDONG@"));
        }
    }
}
