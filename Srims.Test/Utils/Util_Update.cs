using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;

using MIS.Common;
using MIS.Common.Message;

using MIS.Util.Data;
using MIS.Util.Data.DatabaseScriptGenerater;
using MIS.Util.Data.EntityPrase;
using MIS.Util.Data.LinqGenerater;
using MIS.Util.Deploy;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Awards;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Stamps;

using Srims.Server.DataAccess;

using Srims.Tools.DataImport;
using Srims.Server.DataExchange;
using Srims.Server.DataExchange.DataAutoImport;

using System.Data.OleDb;
using System.Data;
using System.Reflection;
using Excel = Microsoft.Office.Interop.Excel;

using System.Threading;
//using jmail;

namespace Srims.Test.Utils
{
    /// <summary>
    /// 工具方法
    /// </summary>
    [TestClass]
    public class Util_Update
    {
        private const string LINQ_MAPPING_FILE_NAMESPACE = @"http://schemas.microsoft.com/linqtosql/mapping/2007";

        /// <summary>
        /// 发布
        /// </summary>
        [TestMethod]
        public void Util_Deploy()
        {
            (new Util_Js()).Util_JsRelease();

            var version = "V0.5.22.0.26.5.7";
            var solutionPath = Global.SolutionPath;
            var releaseBasePath = Global.ReleaseBasePath;
            var xmlFilePath = Global.EntityXmlFileName;
            var developConnectionString = Global.DatabaseConnectionString;
            var deployConnectionString = developConnectionString.Replace("V5", version);
            var deployer = new Deployer(solutionPath, releaseBasePath, xmlFilePath, developConnectionString, deployConnectionString);

            deployer.Deploy(version);

            _UpdateCreateDatabaseScript(releaseBasePath, version);
            _SetLoadJsToReleaseMode(releaseBasePath, version);
        }
        private void _SetLoadJsToReleaseMode(string releaseBasePath, string version)
        {
            var loadJsPath = releaseBasePath + @"\" + version + @"\WebSite\javascript\srims\Load.js";
            var databaseSqlScript = File.ReadAllText(loadJsPath);
            File.WriteAllText(loadJsPath, databaseSqlScript.Replace("Srims.Load.isLoadReleaseJs = false;", "Srims.Load.isLoadReleaseJs = true;"));
        }
        private void _UpdateCreateDatabaseScript(string releaseBasePath, string version)
        {
            var databaseSqlScriptPath = releaseBasePath + @"\" + version + @"\Database.sql";
            var additionalDatabaseSqlScriptPath = releaseBasePath + @"\" + version + @"\AdditionalDatabaseScript.sql";
            var databaseSqlScript = File.ReadAllText(databaseSqlScriptPath);
            var additionalDatabaseSqlScript = Util_Create.GetSqlStript();

            File.WriteAllText(databaseSqlScriptPath, databaseSqlScript + "\n" + additionalDatabaseSqlScript);
            File.WriteAllText(additionalDatabaseSqlScriptPath, additionalDatabaseSqlScript, Encoding.UTF8);
        }

        /// <summary>
        /// 导入数据
        /// </summary>
        [TestMethod, Description("导入数据")]
        public void Util_DataImport()
        {
            var importManager = new ImportManager(Global.OldDatabaseConnectionString, Global.DatabaseConnectionString);
            importManager.NewMessage += new EventHandler<NewMessageEventArgs>(onNewMessage);

            DateTime beginTime = DateTime.Now;

            importManager.Clear();
            importManager.Import();

            TimeSpan costTime = DateTime.Now - beginTime;
            onNewMessage(null, new NewMessageEventArgs(MesssageType.Information, String.Format("数据导入完成,共用时:{0}.", costTime)));
        }

        /// <summary>
        /// 构造Linq的XML映射文件
        /// </summary>
        [TestMethod, Description("构造Linq的XML映射文件")]
        public void Util_UpdateXmlMappingFile()
        {
            LinqMappingXmlGenerater linqMappingXmlBuilder = new LinqMappingXmlGenerater("", "", Global.DatabaseConnectionString);
            var typeArray = new System.Type[]{

                    typeof(SubjectFirstLevel),
                    typeof(SubjectSecondLevel),
                    typeof(Count),
                    typeof(SystemSetting),
                    typeof(Announcement),
                    typeof(NoticeText),
                    typeof(Log),
                    typeof(Outsourcing),
                    typeof(Event),
                    typeof(Resource),
                    typeof(View),

                    typeof(Expert),
                    typeof(ExpertInfoHistory),
                    typeof(Department),
                    typeof(ExpertAchieveStatistic),

                    typeof(User),
                    typeof(UserRole),
                    typeof(UserLoginLog),
                    typeof(UserLockLog),
                    typeof(Permission),
                    typeof(Message),
                    typeof(UserPermission),
                    typeof(UserRolePermission),

                    typeof(Base),

                    typeof(Project),
                    typeof(ProjectStateHistory),
                    typeof(ProjectMember),

                    typeof(ProjectRank),
                    typeof(ProjectType),
                    typeof(ProjectSupportCategory),
                    typeof(ProjectSupportField),
                    typeof(ProjectSupportSubField),
                    typeof(ProjectInfo_Type),
                    typeof(ProjectOut),

                    typeof(Finance),
                    typeof(FinanceBak),
                    typeof(PayPlanItem),
                    typeof(FundMember),
                    typeof(FundDescend),
                    typeof(FundDescendStateHistory),
                    typeof(FundAllocation),
                    typeof(FundAllocationStateHistory),
                    typeof(Voucher),
                    typeof(VoucherStateHistory),
                    typeof(VoucherOut),
                    typeof(ProjectInfo_Fund),
                    typeof(AccountBookNumberCount),
                    typeof(FinanceFundDescend),
                    typeof(ProjectQualityPrincipal),

                    typeof(Contract),
                    typeof(Document),
                    typeof(DocumentModel),
                    typeof(AwardDocument),

                    typeof(Award),
                    typeof(AwardWinner),

                    typeof(PatentAgency),
                    typeof(Patent),
                    typeof(PatentInventer),

                    typeof(Magazine),
                    typeof(MagazineInformation),
                    typeof(MagazineSubjectClass),
                    typeof(MagazineOccupation),
                    typeof(Paper),
                    typeof(PaperAuthor),
                    typeof(PaperIndexed),
                    typeof(SubjectClassChineseEnglish),

                    typeof(Stamp),
                    typeof(StampApplicationFirstAdmin),
                    typeof(StampApplicationSecondAdmin),
                    typeof(StampApplicationType),
                    typeof(StampApplicationTypeGroup),
                    typeof(StampStateHistory),
                    typeof(StampApplication),
                    typeof(Stuff),
                    typeof(StuffStamp),

                    typeof(Performance),
                    typeof(ManagementFees),
                    typeof(LiberalArtsPaper),
                    typeof(LiberalArtsPaperAuthor),
                    typeof(PerformanceAllocation),
                    typeof(Outsourcing),
                    typeof(ProjectOutsourcingBudget),
                    typeof(Recovery),
                    typeof(PerformanceVoucherStateHistory),
                    typeof(PerformanceVoucher),
                    typeof(PerformanceAllocationStateHistory)
                };
            linqMappingXmlBuilder.BuildMappingXml(typeArray, Global.LingMappingFile);
            processLinqXml(Global.LingMappingFile);
        }
        private void processLinqXml(string mappingXmlFileName)
        {
            XDocument xDocument = XDocument.Load(mappingXmlFileName);

            var typeNode = xDocument.Descendants().Single(n => n.Attribute("Name").Value == "Srims.Server.Business.Type.ProjectInfo_Type");
            foreach (var node in typeNode.Descendants().Where(n => n.Attribute("DbType") != null && n.Attribute("DbType").Value == "NVarChar(255)"))
                node.Attribute("Member").Value = "_" + node.Attribute("Member").Value;

            xDocument.Save(mappingXmlFileName);
        }
        private XName getXmlNodeName(string nodeName)
        {
            return "{" + LINQ_MAPPING_FILE_NAMESPACE + "}" + nodeName;
        }

        private void onNewMessage(object sender, NewMessageEventArgs e)
        {
            Debug.WriteLine(String.Format("{0} {1}:{2}", DateTime.Now, e.MessageType, e.Message));
        }

        /// <summary>
        /// 将所有专家的密码设置为1
        /// </summary>
        [TestMethod, Description("将所有专家的密码设置为1")]
        public void Util_SetAllExpertPasswordTo1()
        {
            Database database = Database.New(Global.DatabaseConnectionString);
            int expertRoleID = database.UserRoles.First(ur => ur.Type == UserRoleType.Expert).ID;
            database.Execute("UPDATE [User] SET [Password] = {0} WHERE [UserRoleID] = {1}", PasswordBuilder.BuildPassword("1"), expertRoleID);
        }
        /// <summary>
        /// 设置所有专家同意协议为False
        /// </summary>
        [TestMethod, Description("设置所有专家同意协议为False")]
        public void Util_SetAllExpertAgreeLicenceToFalse()
        {
            Database database = Database.New(Global.DatabaseConnectionString);
            database.Execute(String.Format(@"UPDATE [Expert] SET IsAgreeLicence = 0, AgreeLicenceDateTime = NULL, AgreeLicenceIP = NULL"));
        }
        /// <summary>
        /// 设置所有用户的“是否允许多人登陆”设置为Ture
        /// </summary>
        [TestMethod, Description("置所有用户的“是否允许多人登陆”设置为Ture")]
        public void Util_SetAllUserAllowMultiLoginToTrue()
        {
            Database database = Database.New(Global.DatabaseConnectionString);
            database.Execute(String.Format(@"UPDATE [User] SET AllowMultiLogin = 1"));
        }
        //<summary>
        //测试发送邮件
        //</summary>
        [TestMethod, Description("测试发送邮件")]
        public void Util_SendEmail()
        {

            Database database = Database.New(Global.DatabaseConnectionString);
            var idList = database.Awards.Where(aw => aw.Year >= 2006 && aw.Rank == "国家级").Select(aw => aw.ID);
            int contguojiaji = database.AwardWinners.Where(awin => awin.Expert.Sex == SexType.Women && awin.Order <= 3 && idList.Contains(awin.AwardID)).Count();

            var sidList = database.Awards.Where(aw => aw.Year >= 2006 && aw.Rank == "省部级"
                && (aw.Class == "一等" || aw.Class == "二等")).Select(aw => aw.ID);
            int contshenbuji = database.AwardWinners.Where(awin => awin.Expert.Sex == SexType.Women && awin.Order <= 3 && sidList.Contains(awin.AwardID)).Count();

            //jmail.Message m = new jmail.Message();

            //m.Charset = "gb2312";

            //m.From = _sendMailAddress;

            //m.Subject = _Title;

            //m.AddRecipient(_ReceiverMailAddress, null, null);
            //m.MailServerUserName = UserName;
            //#region password

            //m.MailServerPassWord = Password;

            //#endregion
            //m.ContentType = "text/html";
            //m.Body = _Content;

            //m.Send("mail.ouc.edu.cn", false);


            //.net自带发送组件

            //MailAddress from = new MailAddress(_sendMailAddress);
            //MailAddress to = new MailAddress(_ReceiverMailAddress);
            //MailMessage mailMessage = new MailMessage(from, to);

            //mailMessage.Subject = _Title;
            //mailMessage.Body = _Content;
            //mailMessage.SubjectEncoding = System.Text.Encoding.Default;
            //mailMessage.BodyEncoding = System.Text.Encoding.Default;
            //mailMessage.IsBodyHtml = true;

            //SmtpClient smtp = new SmtpClient(MailServerAddress, Port);
            //smtp.UseDefaultCredentials = false;

            //NetworkCredential basicAuthenticationInfo = new NetworkCredential();
            //basicAuthenticationInfo.UserName = UserName;
            //basicAuthenticationInfo.Password = Password;

            //smtp.Credentials = basicAuthenticationInfo;
            //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            //smtp.Send(mailMessage);

        }
        public static System.Data.DataTable ExcelToDataTable(string strExcelFileName, string strSheetName)
        {
            //源的定义
            string strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + strExcelFileName + ";" + "Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";

            //Sql语句
            //string strExcel = string.Format("select * from [{0}$]", strSheetName); 这是一种方法
            string strExcel = "select * from   [aaa$]";

            //定义存放的数据表
            DataSet ds = new DataSet();

            //连接数据源
            OleDbConnection conn = new OleDbConnection(strConn);

            conn.Open();

            //适配到数据源
            OleDbDataAdapter adapter = new OleDbDataAdapter(strExcel, strConn);
            adapter.Fill(ds, strSheetName);

            conn.Close();

            return ds.Tables[strSheetName];
        }
        private void DTtoExcel(System.Data.DataTable dt, String fname)
        {

            Excel.Application excel = new Excel.Application();

            int rowIndex = 1;
            int colIndex = 0;
            Excel.Workbook xbook = excel.Workbooks.Add(true);

            foreach (DataColumn col in dt.Columns)
            {
                colIndex++;
                excel.Cells[1, colIndex] = col.ColumnName;
            }

            foreach (DataRow row in dt.Rows)
            {
                rowIndex++;
                colIndex = 0;
                foreach (DataColumn col in dt.Columns)
                {
                    colIndex++;
                    excel.Cells[rowIndex, colIndex] = row[col.ColumnName].ToString();
                }

            }
            xbook.SaveAs(fname, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Excel.XlSaveAsAccessMode.xlNoChange, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);
            xbook = null;
            excel.Quit();
            excel = null;
        }

    }
}
