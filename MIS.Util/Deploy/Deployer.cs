using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;

using MIS.Util.Data;
using MIS.Util.Data.DatabaseScriptGenerater;
using MIS.Util.Data.EntityPrase;

namespace MIS.Util.Deploy
{
    /// <summary>
    /// 部署器
    /// </summary>
    public class Deployer
    {
        private string _SolutionPath;
        private string _ReleaseBasePath;
        private string _EntityXmlFilePath;
        private string _DevelopConnectionString;
        private string _DeployConnectionString;

        private List<string> _WebSiteProjectPathList = new List<string>();
        private List<string> _WindowsProjectPathList = new List<string>();

        private string _VersionReleasePath;
        private string _SrcPath;

        /// <summary>
        ///  构造部署器
        /// </summary>
        /// <param name="solutionPath">解决方案所在路径</param>
        /// <param name="releaseBasePath">发布版本所在基路径</param>
        /// <param name="entityXmlFilePath">实体XML文件路径</param>
        /// <param name="developConnectionString">部署的连接字符串</param>
        /// <param name="deployConnectionString">开发连接字符串</param>
        public Deployer(
            string solutionPath,
            string releaseBasePath,
            string entityXmlFilePath,
            string developConnectionString,
            string deployConnectionString)
        {
            this._SolutionPath = Path.GetFullPath(solutionPath);
            this._ReleaseBasePath = Path.GetFullPath(releaseBasePath);
            this._EntityXmlFilePath = Path.GetFullPath(entityXmlFilePath);
            this._DevelopConnectionString = developConnectionString;
            this._DeployConnectionString = deployConnectionString;
        }

        /// <summary>
        /// 发布
        /// </summary>
        /// <param name="version">要发布的版本</param>
        public void Deploy(string version)
        {
            findProjects();

            buildPath(version);
            createDirectory();

            copySrc();
            rebuild();

            publishProjects();
            createDatabaseSqlScript();

            clear();
        }

        private void findProjects()
        {
            foreach (var directory in Directory.GetDirectories(_SolutionPath))
                if (isWebProject(directory))
                    _WebSiteProjectPathList.Add(directory);
                else if (isWindowsProject(directory))
                    _WindowsProjectPathList.Add(directory);
        }
        private bool isWebProject(string directory)
        {
            return Directory.GetFiles(directory).Contains(directory + "\\" + "Web.config");
        }
        private bool isWindowsProject(string directory)
        {
            return Directory.GetFiles(directory).Contains(directory + "\\" + "Program.cs");
        }

        private void buildPath(string version)
        {
            this._VersionReleasePath = string.Format(@"{0}\{1}", _ReleaseBasePath, version);

            this._SrcPath = String.Format(@"{0}\Src", _VersionReleasePath);
        }
        private string getProjectName(string projectPath)
        {
            int index = projectPath.LastIndexOf('.') + 1;
            return projectPath.Substring(index);
        }

        private void createDirectory()
        {
            if (Directory.Exists(_VersionReleasePath))
                executeCommand("rmdir /S /Q " + _VersionReleasePath);

            Directory.CreateDirectory(_VersionReleasePath);
            Directory.CreateDirectory(_SrcPath);
        }

        private void copySrc()
        {
            executeCommand(String.Format(@"XCopy {0}\* {1} /E", _SolutionPath, _SrcPath));
        }
        private void rebuild()
        {
            var solutionFileName = Path.GetFileName(Directory.GetFiles(_SolutionPath, "*.sln")[0]);
            executeCommand(String.Format(@"C:\Windows\Microsoft.NET\Framework\v3.5\MSBuild /t:ReBuild /property:Configuration=release {0}\{1}", _SrcPath, solutionFileName));
        }

        private void publishProjects()
        {
            foreach (var project in _WebSiteProjectPathList)
                publishWebProject(project);
            foreach (var project in _WindowsProjectPathList)
                publishWindowsProject(project);
        }
        private void publishWebProject(string projectPath)
        {
            var releasePath = string.Format(@"{0}\{1}", _VersionReleasePath, getProjectName(projectPath));

            WebApplicationDeployer deployer = new WebApplicationDeployer();
            deployer.WebAppRoot = projectPath.Replace(_SolutionPath, _SrcPath);
            deployer.WebAppDestination = releasePath;
            deployer.Deploy();

            replaceConnectionString(String.Format(@"{0}\web.config", releasePath));
        }

        private void publishWindowsProject(string projectPath)
        {
            var releasePath = string.Format(@"{0}\{1}", _VersionReleasePath, getProjectName(projectPath));
            Directory.CreateDirectory(releasePath);

            executeCommand(String.Format(@"Xcopy {0}\bin\Release {1} /E", projectPath.Replace(_SolutionPath, _SrcPath), releasePath));

            foreach (var file in Directory.GetFiles(releasePath))
            {
                if (file.EndsWith("pdb"))
                    File.Delete(file);
                else if (file.EndsWith("manifest"))
                    File.Delete(file);
                else if (file.EndsWith("application"))
                    File.Delete(file);
                else if (file.Contains("vshost"))
                    File.Delete(file);
            }

            var configFileNames = Directory.GetFiles(releasePath, "*.config");
            if (configFileNames.Length > 0)
                replaceConnectionString(configFileNames[0]);
        }

        private void createDatabaseSqlScript()
        {
            XmlDocument document = new XmlDocument();
            document.Load(_EntityXmlFilePath);
            File.WriteAllText(_VersionReleasePath + @"\Database.sql", MsSqlServerScriptBuilder.GetSqlScript(EntityXmlParser.ParseXml(document)));
        }
        private void clear()
        {
            Directory.Delete(_SrcPath, true);
        }

        private void replaceConnectionString(string configFilePath)
        {
            if (!File.Exists(configFilePath))
                return;

            string webConfigContent = File.ReadAllText(configFilePath);
            webConfigContent = webConfigContent.Replace(_DevelopConnectionString, _DeployConnectionString);
            File.WriteAllText(configFilePath, webConfigContent);
        }

        private void executeCommand(string commandText)
        {
            var command = Process.Start("CMD.exe", @"/c " + commandText);
            command.WaitForExit();
        }
    }
}
