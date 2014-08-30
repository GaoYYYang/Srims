using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.XPath;

namespace MIS.Util.Deploy
{

    /// <summary>
    /// This simple task open the web application project file and find all the files considered as
    /// content and copy all of them in the destination path in order to publish the application.
    /// </summary>
    public class WebApplicationDeployer
    {
        private string _WebAppFileName;
        
        /// <summary>
        /// 设置或取得Web项目的路径
        /// </summary>
        public string WebAppRoot { get; set; }
        /// <summary>
        /// 设置或取得发布到的位置
        /// </summary>
        public string WebAppDestination { get; set; }

        /// <summary>
        /// 发布
        /// </summary>
        public void Deploy()
        {
            if (!WebAppRoot.EndsWith("\\"))
                WebAppRoot += "\\";
            if (!WebAppDestination.EndsWith("\\"))
                WebAppDestination += "\\";

            _WebAppFileName = Path.GetFileName(Directory.GetFiles(WebAppRoot, "*.csproj")[0]);

            if (Directory.Exists(WebAppDestination))
                Directory.Delete(WebAppDestination);

            Directory.CreateDirectory(WebAppDestination);

            CopyFiles();
            CopyBin();
        }

        /// <summary>
        /// Copy the whole bin directory
        /// </summary>
        /// <returns></returns>
        private void CopyBin()
        {
            Directory.CreateDirectory(WebAppDestination + "bin");

            foreach (string file in Directory.GetFiles(WebAppRoot + "bin"))
            {
                string fileName = file.Substring(file.LastIndexOf("\\") + 1);
                File.Copy(file, WebAppDestination + "bin\\" + fileName, true);
            }
        }

        private void CopyFiles()
        {
            string filePath, fileName, destFilePath;
            XmlDocument xDoc = new XmlDocument();
            XmlNamespaceManager nManager = new XmlNamespaceManager(xDoc.NameTable);
            nManager.AddNamespace("ns", @"http://schemas.microsoft.com/developer/msbuild/2003");
            xDoc.Load(WebAppRoot + _WebAppFileName);

            // get all the 'content' and 'none' node.
            XmlNodeList contentList = xDoc.SelectNodes("//ns:Content | //ns:None", nManager);

            foreach (XmlNode node in contentList)
            {
                // only copy files considered as content or some none
                if (node.Name == "None" || node.ChildNodes.Count > 0)
                    continue;

                // get the value of the include attribute which is the file path from the app root.
                filePath = node.Attributes["Include"].Value;
                fileName = filePath.Substring(filePath.LastIndexOf("\\") + 1);
                filePath = filePath.Substring(0, filePath.LastIndexOf("\\") + 1);

                // Files located higher than the root will be included in the root
                destFilePath = filePath.Replace("..\\", "");

                // Does the source file exist
                if (!File.Exists(WebAppRoot + filePath + fileName))
                    continue;

                // create the dir if it does'nt exist
                if (!Directory.Exists(WebAppDestination + destFilePath))
                    Directory.CreateDirectory(WebAppDestination + destFilePath);

                File.Copy(WebAppRoot + filePath + fileName, WebAppDestination + destFilePath + fileName, true);
                File.SetAttributes(WebAppDestination + destFilePath + fileName, FileAttributes.Normal);
            }
        }
    }
}