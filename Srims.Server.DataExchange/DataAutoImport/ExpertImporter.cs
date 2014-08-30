using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Common;

namespace Srims.Server.DataExchange.DataAutoImport
{
    /// <summary>
    /// 专家导入
    /// </summary>
    public class ExpertImporter
    {
        /// <summary>
        /// 导入专家
        /// </summary>
        /// <param name="database"></param>
        public static void ImportExperts(DataBaseDelegate databaseDelegate)
        {
            IDatabase database = databaseDelegate();
            List<EntityImport> expertList = new List<EntityImport>();
            expertList = getExpertList(database);

            int importCount = 0;
            int updateCount = 0;

            StringBuilder logString = new StringBuilder();
            StringBuilder importLogString = new StringBuilder();
            StringBuilder updateLogString = new StringBuilder();
            StringBuilder errorLogString = new StringBuilder();
            StringBuilder numberAndNameNotMatchLog = new StringBuilder();

            foreach (var importExpert in expertList)
            {
                database = databaseDelegate();
                bool isNew = false;

                string number = getValueByTitle(importExpert, "Number");
                string name = getValueByTitle(importExpert, "Name");
                string sex = getValueByTitle(importExpert, "Sex");
                string birthday = getValueByTitle(importExpert, "Birthday");
                string policy = getValueByTitle(importExpert, "Policy");
                string nation = getValueByTitle(importExpert, "Nation");
                string comeDate = getValueByTitle(importExpert, "ComeDate");
                string fileNumber = getValueByTitle(importExpert, "FileNumber");
                string academyDegree = getValueByTitle(importExpert, "AcademyDegree");
                string occupation = getValueByTitle(importExpert, "Occupation");
                string isDoctorDirector = getValueByTitle(importExpert, "IsDoctorDirector");
                string isChinese = getValueByTitle(importExpert, "IsChinese");
                string language = getValueByTitle(importExpert, "Language");
                string languageLevel = getValueByTitle(importExpert, "LanguageLevel");
                string department = getValueByTitle(importExpert, "Department");
                string college = getValueByTitle(importExpert, "College");
                string post = getValueByTitle(importExpert, "Post");
                string postLevel = getValueByTitle(importExpert, "PostLevel");
                string mobilePhone = getValueByTitle(importExpert, "MobilePhone");
                string officePhone = getValueByTitle(importExpert, "OfficePhone");
                string homePhone = getValueByTitle(importExpert, "HomePhone");
                string fax = getValueByTitle(importExpert, "Fax");
                string address = getValueByTitle(importExpert, "Address");
                string zip = getValueByTitle(importExpert, "Zip");
                string email = getValueByTitle(importExpert, "Email");

                var expert = database.Experts.SingleOrDefault(q => q.Number == number);
                Object oldExpert = new Object();
                try
                {
                    if (expert == null)
                    {
                        isNew = true;

                        importLogString.AppendFormat("{0},", number);
                        //初始化不更新字段
                        expert = new Expert
                        {
                            Number = number,
                            Name = name,
                            IsAgreeLicence = false,
                            IsDeleted = false,
                            IsOnjob = true,
                            MobilePhone = mobilePhone,
                            OfficePhone = officePhone,
                            HomePhone = homePhone,
                            Fax = fax,
                            Zip = zip,
                            Address = address,
                            Email = email,
                            IsChinese = true,
                            IsDoctorDirector = false,
                        };
                    }

                    //当专家的工作证号和姓名不匹配时，记录日志，不做任何更新
                    if (!expert.IsNew)
                    {
                        oldExpert = expert.Clone();

                        if (expert.Name != name)
                        {
                            numberAndNameNotMatchLog.AppendFormat("专家姓名和工作证号不一致，工作证号为：{0}，原专家姓名为：{1}，要更新的专家姓名为：{2}\n", expert.Number, expert.Name, name);
                            continue;
                        }
                    }

                    if (!string.IsNullOrEmpty(sex))
                        expert.Sex = sex.GetSexType();

                    if (!string.IsNullOrEmpty(birthday))
                        expert.Birthday = Convert.ToDateTime(birthday);

                    if (!string.IsNullOrEmpty(nation))
                    {
                        expert.Nation = nation;
                        nation.AddNoticeText(NoticeTextType.Nation, database);
                    }

                    if (!string.IsNullOrEmpty(policy))
                    {
                        expert.Policy = policy;
                        policy.AddNoticeText(NoticeTextType.Policy, database);
                    }

                    if (!string.IsNullOrEmpty(comeDate))
                        expert.ComeDate = Convert.ToDateTime(comeDate);

                    if (!string.IsNullOrEmpty(fileNumber))
                        expert.FileNumber = fileNumber;

                    if (!string.IsNullOrEmpty(academyDegree))
                    {
                        expert.AcademyDegree = academyDegree;
                        academyDegree.AddNoticeText(NoticeTextType.AcaedemyDegree, database);
                    }

                    if (!string.IsNullOrEmpty(occupation))
                        expert.Occupation = occupation;

                    if (!string.IsNullOrEmpty(isDoctorDirector))
                        expert.IsDoctorDirector = Convert.ToBoolean(isDoctorDirector);

                    if (!string.IsNullOrEmpty(isChinese))
                        expert.IsChinese = Convert.ToBoolean(isChinese);

                    if (!string.IsNullOrEmpty(language))
                    {
                        expert.Language1 = language;
                        language.AddNoticeText(NoticeTextType.ForeignLanguage, database);
                    }

                    if (!string.IsNullOrEmpty(languageLevel))
                    {
                        expert.LanguageLevel1 = languageLevel;
                        languageLevel.AddNoticeText(NoticeTextType.LanguageLevel, database);
                    }

                    if (!string.IsNullOrEmpty(department))
                        expert.Department = department.GetDepartment(database);

                    if (!string.IsNullOrEmpty(college))
                        expert.College = college.GetCollege(database);

                    if (!string.IsNullOrEmpty(post))
                    {
                        expert.PostNew = post;
                        post.AddNoticeText(NoticeTextType.ExpertPost, database);
                    }

                    if (!string.IsNullOrEmpty(postLevel))
                        expert.PostLevel = new Nullable<Int32>(Convert.ToInt32(postLevel));

                    expert.Save(database);

                    //记录更新日志
                    if (!isNew)
                    {
                        var description = Log.GetEditOperationDescription(oldExpert, expert, Expert.GetDescriptionItems(), false);

                        if (!string.IsNullOrEmpty(description.Trim()))
                        {
                            updateCount++;
                            updateLogString.AppendFormat("编辑专家：{0}，编辑专家工作证号为：{1}，编辑详细信息为：{2}\n\n", expert.Name, expert.Number, description);
                        }
                    }
                    else
                        importCount++;
                }
                catch (Exception e)
                {
                    errorLogString.AppendFormat("导入专家错误，专家工作证号为：{0}，错误信息为{1}。\n", expert.Number, e.Message);
                }
            }
            logString.AppendFormat("导入的错误信息为：{0}\n\n", errorLogString);
            logString.AppendFormat("专家工作证号和姓名不匹配的信息为：{0}，系统没做任何更新，请联系管理员处理\n\n", numberAndNameNotMatchLog);
            logString.AppendFormat("成功导入{0}名专家，导入的专家的工作证号为：{1}\n\n", importCount, importLogString);
            logString.AppendFormat("成功更新{0}名专家，更新的详细信息为：{1}\n\n", updateCount, updateLogString);

            Log.Write("系统", (int)LogType.ExpertAutoImport, logString.ToString(), "自动导入专家", database);
        }
        private static List<EntityImport> getExpertList(IDatabase database)
        {
            List<EntityImport> expertList = new List<EntityImport>();

            expertList = XmlDocParse.parseXmlDocument(GetXmlDocFromWeb.LoadXMLDocument(database.SystemSettings.GetSystemSetting().ExpertWebAddress), "Experts");
            return expertList;
        }
        private static string getValueByTitle(EntityImport entity, string title)
        {
            return entity
                .ItemList
                .Single(q => q.Title == title)
                .Value
                .Trim();
        }
    }
}
