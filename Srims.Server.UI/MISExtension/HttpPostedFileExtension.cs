using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Common;

namespace Srims.Server.UI.MISExtension
{
    /// <summary>
    /// 上传文档的相关扩展
    /// </summary>
    public static class HttpPostedFileExtension
    {
        /// <summary>
        /// 上传文档保存路径
        /// </summary> 
        public const string POSTED_FILE_ROOT_DIRECTORY = @"/SrimsDocument\";
        /// <summary>
        /// 保存上传文件
        /// </summary>
        /// <param name="postedFile"></param>
        /// <param name="context"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Guid Save(this HttpPostedFile postedFile, HttpContext context, IDatabase database)
        {
            string directory = context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            string fileName = Path.GetFileName(postedFile.FileName);
            string fileType = fileName.Substring(fileName.LastIndexOf(".") + 1);

            Resource resource = new Resource();
            resource.Type = fileType;
            resource.Save(database);

            string newFileName = resource.Guid + "." + fileType;
            string filePath = directory + newFileName;

            if (File.Exists(filePath))
                File.Delete(filePath);

            postedFile.SaveAs(filePath);

            return resource.Guid;
        }
        /// <summary>
        /// 根据guid删除文件
        /// </summary>
        /// <param name="context"></param>
        /// <param name="guid"></param>
        /// <param name="database"></param>
        public static void Delete(HttpContext context, Guid guid, IDatabase database)
        {
            Resource resource = database.Resources.GetByGuid(guid);
            if (resource == null)
                throw new ArgumentNullException("guid");

            string directory = context.Server.MapPath(POSTED_FILE_ROOT_DIRECTORY);
            string fileName = guid + "." + resource.Type;
            string filePath = directory + fileName;


            if (File.Exists(filePath))
                File.Delete(filePath);

            resource.Delete(database);
        }
        /// <summary>
        /// 取得文件路径
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="database"></param>
        public static string GetFilePath(this Guid guid, IDatabase database)
        {
            var server = HttpContext.Current.Server;
            Resource resource = database.Resources.GetByGuid(guid);
            if (resource == null)
                throw new ArgumentNullException("guid");

            string fileName = POSTED_FILE_ROOT_DIRECTORY + "/" + guid + "." + resource.Type;
            return fileName;
        }
    }
}
