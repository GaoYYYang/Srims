using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;

namespace Srims.Test.Utils
{
    /// <summary>
    /// Js工具方法
    /// </summary>
    [TestClass]
    public class Util_Js
    {
        private const string JS_ROOT_PATH = Global.SolutionPath + @"\Srims.WebSite\javascript";
        private const string RELEASE_JS_PATH = JS_ROOT_PATH + @"\srims\release";
        private const string LOAD_JS_FILE_PATH = JS_ROOT_PATH + @"\srims\load.js";
        private const string JS_FILE_REGEX = "\"\\S*\"";

        /// <summary>
        /// 构造发布Js代码
        /// </summary>
        [TestMethod, Description("构造发布Js代码")]
        public void Util_JsRelease()
        {
            releaseJs("// load main js", "main.js");
            releaseJs("// load project js", "project.js");
            releaseJs("// load base js", "base.js");
            releaseJs("// load subject js", "subject.js");
            releaseJs("// load announcement js", "announcement.js");
            releaseJs("// load paper js", "paper.js");
            releaseJs("// load user js", "user.js");
            releaseJs("// load expert js", "expert.js");
            releaseJs("// load log js", "log.js");
            releaseJs("// load notice text js", "noticeText.js");
            releaseJs("// load message js", "message.js");
            releaseJs("// load award js", "award.js");
            releaseJs("// load statistic js", "statistic.js");
            releaseJs("// load fund js", "fund.js");
            releaseJs("// load finance js", "finance.js");
            releaseJs("// load system setting js", "systemSetting.js");
            releaseJs("// load patent js", "patent.js");
            releaseJs("// load department js", "department.js");
            releaseJs("// load type js", "typeManage.js");
            releaseJs("// load noticeText js", "noticeText.js");
            releaseJs("// load Stamp js", "stamps.js");
            releaseJs("// load Outsourcing js", "Outsourcing.js");
            releaseJs("// load Performance js", "Performance.js");
        }

        private void releaseJs(string startLineString, string outputJs)
        {
            var startLine = 0;
            var outputBuilder = new StringBuilder();
            var loadJsContent = File.ReadAllLines(LOAD_JS_FILE_PATH);

            for (startLine = 0; startLine < loadJsContent.Length; startLine++)
            {
                if (loadJsContent[startLine].Trim().StartsWith(startLineString.Trim()))
                    break;
            }

            if (startLine == loadJsContent.Length)
                return;

            for (int i = startLine; i <= loadJsContent.Length; i++)
            {
                if (loadJsContent[i].StartsWith("}"))
                    break;

                var match = Regex.Match(loadJsContent[i], JS_FILE_REGEX);
                if (!match.Success)
                    continue;

                var filePath = JS_ROOT_PATH + match.Value.Replace("\"", string.Empty);
                if (!File.Exists(filePath))
                    continue;

                var fileContent = File.ReadAllText(filePath);

                outputBuilder.Append(fileContent);
            }
            File.WriteAllText(RELEASE_JS_PATH + @"\" + outputJs, outputBuilder.ToString());
        }
    }
}
