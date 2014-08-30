using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;

using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Stamps;

using Srims.Server.UI;
using Srims.Server.UI.Documents;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

namespace Srims.WebSite.Service
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ResourceService : WebServiceBase
    {
        [WebMethod]
        public void GetDocument()
        {
            Guid guid = new Guid(Request["guid"]);

            var document = Database.Documents.GetByGuid(guid);
            string fullName = string.Format("{0}-{1}", document.Project.Name, document.Name);

            Get(fullName, guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);
        }
        [WebMethod]
        public void GetContract()
        {
            Guid guid = new Guid(Request["guid"]);

            var contract = Database.Contracts.getByGuid(guid);
            string fullName = string.Format("{0}-{1}", contract.Project.Name, contract.Type.ToShow());

            Get(fullName, guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);
        }
        [WebMethod]
        public void GetDocumentModel()
        {
            Guid guid = new Guid(Request["guid"]);

            var documentModel = Database.DocumentModels.GetByGuid(guid);
            string fullName = string.Format("{0}-文档模板-{1}", documentModel.ProjectType.Name, documentModel.Name);

            Get(fullName, guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);
        }
        [WebMethod]
        public void GetAwardDocument()
        {
            Guid guid = new Guid(Request["guid"]);

            var awardDocument = Database.AwardDocuments.GetByGuid(guid);
            string fullName = string.Format("{0}-文档-{1}", awardDocument.Award.Name, awardDocument.Name);

            Get(fullName, guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);
        }
        [WebMethod]
        public void GetStuffDocument()
        {
            Guid guid = new Guid(Request["guid"]);

            var stuffDocument = Database.Stuffs.GetByGuid(guid);
            string fullName = string.Empty;
            if (stuffDocument != null)
                fullName = string.Format("文印申请材料：{0}-{1}", stuffDocument.StampApplication.StampStuffFrom, stuffDocument.StuffName);
            else
                fullName = "文印申请文档";

            Get(fullName, guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);
        }
        [WebMethod]
        public void GetImportLog()
        {
            string name = Request["guid"];

            string fullName = "ImportLog" + DateTime.Now.ToLongDateString().ToString();

            Get(fullName, name, DataImportHelper.IMPORT_DATA_ROOT_DIRECTORY);
        }
        private void Get(string downLoadName, Guid guid, string MapPath)
        {
            var server = HttpContext.Current.Server;
            string directory = server.MapPath(MapPath);

            Resource resource = Database.Resources.GetByGuid(guid);
            if (resource == null)
                throw new ArgumentNullException("guid");

            string fileName = guid + "." + resource.Type;
            string filePath = directory + fileName;
            downLoadName += "." + resource.Type;

            downLoad(filePath, downLoadName);
        }

        private void Get(string downloadName, string name, string MapPath)
        {
            var server = HttpContext.Current.Server;
            string directory = server.MapPath(MapPath);

            string fileName = name + DataImportHelper.IMPORT_LOG_TYPE;
            string filePath = directory + fileName;
            downloadName += DataImportHelper.IMPORT_LOG_TYPE;

            downLoad(filePath, downloadName);
        }

        private void downLoad(string filePath, string downloadName)
        {
            bool isIE = Convert.ToBoolean(Request["isIE"]);
            if (isIE)
                downloadName = HttpUtility.UrlEncode(downloadName, System.Text.Encoding.UTF8);

            FileInfo fileInfo = new FileInfo(filePath);
            Response.Clear();
            Response.ClearContent();
            Response.ClearHeaders();

            Response.AddHeader("Content-Disposition", "attachment;filename=" + downloadName);
            Response.AddHeader("Content-Length", fileInfo.Length.ToString());
            Response.AddHeader("Content-Transfer-Encoding", "binary");
            Response.AddHeader("Connection", "Keep-Alive");

            Response.ContentType = "application/octet-stream";
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("gb2312");

            Response.WriteFile(fileInfo.FullName);
            Response.Flush();
            Response.End();
        }
        [WebMethod]
        public void IsSizeable()
        {
            var postedFiles = Request.GetHttpFiles();
            bool result = true;
            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                long size = postedFiles[iFile].ContentLength;
                if (size >= 100 * 1024 * 1024)
                {
                    result = false;
                    break;
                }
            }
            if (result)
                Response.Write("<html><body>{ success: true}</body></html>");
            else
                Response.Write("<html><body>{ success: false}</body></html>");
            Response.End();
        }
        [WebMethod]
        public void GetOutSoucingFile1()
        {
            var outsoucingID = Request["guid"];
            var outsoucing = Database.Outsourcings.First(ps => ps.ID == int.Parse(outsoucingID));
            var resource = Database.Resources.SingleOrDefault(c => c.Guid.ToString() == outsoucing.CompanyCard);
            Get("企业法人证书", resource.Guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);

        }
        [WebMethod]
        public void GetOutSoucingFile2()
        {
            var outsoucingID = Request["guid"];
            var outsoucing = Database.Outsourcings.First(ps => ps.ID == int.Parse(outsoucingID));
            var resource = Database.Resources.SingleOrDefault(c => c.Guid.ToString() == outsoucing.GroupCard);
            Get("组织机构代码证", resource.Guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);

        }
        [WebMethod]
        public void GetOutSoucingFile3()
        {
            var outsoucingID = Request["guid"];
            var outsoucing = Database.Outsourcings.First(ps => ps.ID == int.Parse(outsoucingID));
            var resource = Database.Resources.SingleOrDefault(c => c.Guid.ToString() == outsoucing.TaxCard);
            Get("税务登记证", resource.Guid, HttpPostedFileExtension.POSTED_FILE_ROOT_DIRECTORY);

        }
    }
}
