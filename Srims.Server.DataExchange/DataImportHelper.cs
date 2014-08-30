using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Common;

namespace Srims.Server.DataExchange
{
    /// <summary>
    /// 构建数据库委托
    /// </summary>
    /// <returns></returns>
    public delegate IDatabase DataBaseDelegate();
    /// <summary>
    /// 数据导入帮助
    /// </summary>
    public static class DataImportHelper
    {
        /// <summary>
        /// 数据导入日志保存地址
        /// </summary> 
        public const string IMPORT_DATA_ROOT_DIRECTORY = @"/SrimsDataImportLog\";
        public const string IMPORT_LOG_TYPE = ".doc";
        /// <summary>
        /// 取得所属学院
        /// </summary>
        /// <param name="CollegeName"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Department GetCollege(this string CollegeName, IDatabase database)
        {
            return database
                .Departments
                .SingleOrDefault(q => q.IsCollege && q.Name.Trim() == CollegeName.Trim());
        }
        /// <summary>
        /// 取得所属部门
        /// </summary>
        /// <param name="DepartmentName"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Department GetDepartment(this string DepartmentName, IDatabase database)
        {
            if (string.IsNullOrEmpty(DepartmentName))
                return null;

            return database
                .Departments
                .SingleOrDefault(q => q.Name.Trim() == DepartmentName.Trim());
        }
        /// <summary>
        /// 取得专家
        /// </summary>
        /// <param name="ExpertName"></param>
        /// <param name="collegeID"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Expert GetExpert(this string ExpertName, int? collegeID, IDatabase database, StringBuilder expertMathchString, string fruitName)
        {
            var experts = database.Experts.Where(q => q.Name.Trim() == ExpertName.Trim()).ToList();

            if (experts.Count == 0)
                return null;

            if (experts.Count == 1)
                return experts[0];

            expertMathchString.AppendFormat("成果名称：{0}\n\t", fruitName);
            expertMathchString.AppendFormat("    重名专家：{0}\n\t", ExpertName);
            foreach (var expert in experts)
            {
                expertMathchString.AppendFormat("        专家姓名：{0}，所属学院：{1}，工作证号：{2}\n\t", expert.Name, expert.College == null ? "" : expert.College.Name, expert.Number);
            }

            experts = experts.Where(q => q.CollegeID.HasValue && q.CollegeID == collegeID).ToList();
            if (experts.Count == 1)
            {
                expertMathchString.AppendFormat("        根据成果所属学院，自动匹配专家的工作证号：{0}，所属学院：{1}\n", experts[0].Number, experts[0].College == null ? "" : experts[0].College.Name);
                expertMathchString.AppendFormat("\n");
                expertMathchString.AppendFormat("\n");
                return experts[0];
            }

            expertMathchString.AppendFormat("\n");
            expertMathchString.AppendFormat("\n");
            return null;

        }
        /// <summary>
        /// 将多个空格替换为一个空格
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public static string RemoveMulSpace(this string s)
        {
            return System.Text.RegularExpressions.Regex.Replace(s, @" +", " ");

        }
        /// <summary>
        /// 取得数据导入日志writer
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="logFileName"></param>
        /// <returns></returns>
        public static StreamWriter GetLogWriter(this HttpContext httpContext, string logFileName)
        {
            string directory = httpContext.Server.MapPath(IMPORT_DATA_ROOT_DIRECTORY);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            string fileNameLog = httpContext.Server.MapPath(IMPORT_DATA_ROOT_DIRECTORY + "\\" + logFileName + IMPORT_LOG_TYPE);
            if (File.Exists(fileNameLog))
                File.Delete(fileNameLog);

            var writer = File.CreateText(fileNameLog);

            return writer;
        }
        /// <summary>
        /// 跟新数据时，判断是否更新数据的值
        /// </summary>
        /// <param name="newValue"></param>
        /// <param name="oldValue"></param>
        /// <param name="isNew"></param>
        /// <returns></returns>
        public static string ConfirmValue(this string newValue, string oldValue, bool isEntityNew)
        {
            if (isEntityNew)
                return newValue;

            if (string.IsNullOrEmpty(newValue))
                return oldValue;

            return newValue;
        }
        /// <summary>
        /// 添加提示文本
        /// </summary>
        /// <param name="noticeTextValue"></param>
        /// <param name="noticeTextType"></param>
        /// <param name="database"></param>
        public static void AddNoticeText(this string noticeTextValue, NoticeTextType noticeTextType, IDatabase database)
        {
            var noticeText = database
                .NoticeTexts
                .SingleOrDefault(q => q.Type == noticeTextType && q.Value == noticeTextValue);

            if (noticeText != null)
                return;

            var newNoticeText = new NoticeText
            {
                Value = noticeTextValue,
                Type = noticeTextType,
            };

            newNoticeText.Save(database);
        }
        /// <summary>
        /// 取得性别
        /// </summary>
        /// <param name="sexString"></param>
        /// <returns></returns>
        public static SexType GetSexType(this string sexString)
        {
            switch (sexString)
            {
                case "男": return SexType.Man;
                case "女": return SexType.Women;
                default: return SexType.Man;
            }
        }
        /// <summary>
        /// 取得布尔类型的值
        /// </summary>
        /// <param name="boolString"></param>
        /// <returns></returns>
        public static bool GetBoolean(this string boolString)
        {
            switch (boolString)
            {
                case "是": return true;
                default: return false;
            }
        }
    }
}
