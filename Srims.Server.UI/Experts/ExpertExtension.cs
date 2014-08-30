using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.DataAccess;

namespace Srims.Server.UI.Experts
{
    /// <summary>
    /// 专家显示
    /// </summary>
    public static class ExpertExtension
    {
        /// <summary>
        /// 显示专家
        /// </summary>
        /// <param name="expert"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowExpert(Expert expert, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", expert.ID);
            response.WriteTagWithValue("UserID", expert.UserID);
            response.WriteTagWithValue("Name", expert.Name);
            response.WriteTagWithValue("NameSpell", expert.NameSpell);
            response.WriteTagWithValue("Number", expert.Number);
            response.WriteTagWithValue("Sex", expert.Sex);
            response.WriteTagWithValue("Birthday", expert.Birthday);
            response.WriteTagWithValue("Nation", expert.Nation);
            response.WriteTagWithValue("Policy", expert.Policy);
            response.WriteTagWithValue("MajorCodeID", expert.MajorCodeID);
            response.WriteTagWithValue("MajorCode", expert.MajorCodeID.HasValue ? expert.MajorCode.Name : String.Empty);
            response.WriteTagWithValue("IDCardNumber", expert.IDCardNumber);
            response.WriteTagWithValue("ComeDate", expert.ComeDate);
            response.WriteTagWithValue("FileNumber", expert.FileNumber);
            response.WriteTagWithValue("AcademyDegree", expert.AcademyDegree);

            response.WriteTagWithValue("CollegeID", expert.CollegeID);
            response.WriteTagWithValue("College", expert.CollegeID.HasValue ? expert.College.Name : String.Empty);

            response.WriteTagWithValue("College2ID", expert.College2ID);
            response.WriteTagWithValue("College2", expert.College2ID.HasValue ? expert.College2.Name : String.Empty);

            response.WriteTagWithValue("PostNew", expert.PostNew);
            response.WriteTagWithValue("PostLevel", expert.PostLevel);
            response.WriteTagWithValue("Occupation", expert.Occupation);
            response.WriteTagWithValue("VocationLevel", expert.VocationLevel);
            response.WriteTagWithValue("IsDoctorDirector", expert.IsDoctorDirector);
            response.WriteTagWithValue("IsAcademician", expert.IsAcademician);
            response.WriteTagWithValue("IsOnjob", expert.IsOnjob);
            response.WriteTagWithValue("IsChinese", expert.IsChinese);
            response.WriteTagWithValue("MobilePhone", expert.MobilePhone);
            response.WriteTagWithValue("OfficePhone", expert.OfficePhone);
            response.WriteTagWithValue("HomePhone", expert.HomePhone);
            response.WriteTagWithValue("Fax", expert.Fax);
            response.WriteTagWithValue("Address", expert.Address);
            response.WriteTagWithValue("Zip", expert.Zip);
            response.WriteTagWithValue("Email", expert.Email);
            response.WriteTagWithValue("DepartmentID", expert.DepartmentID);
            response.WriteTagWithValue("Department", expert.DepartmentID.HasValue ? expert.Department.Name : String.Empty);
            response.WriteTagWithValue("Specialty", expert.Specialty);
            response.WriteTagWithValue("Photo", expert.Photo.HasValue ? expert.Photo.Value.GetFilePath(database) : string.Empty);
            //response.WriteTagWithValue("ResearchCode1ID", expert.ResearchCode1ID);
            //response.WriteTagWithValue("ResearchCode1", expert.ResearchCode1ID.HasValue ? expert.ResearchCode1.Name : String.Empty);
            //response.WriteTagWithValue("ResearchCode2ID", expert.ResearchCode2ID);
            //response.WriteTagWithValue("ResearchCode2", expert.ResearchCode2ID.HasValue ? expert.ResearchCode2.Name : String.Empty);
            //response.WriteTagWithValue("ResearchCode3ID", expert.ResearchCode3ID);
            //response.WriteTagWithValue("ResearchCode3", expert.ResearchCode3ID.HasValue ? expert.ResearchCode3.Name : String.Empty);
            response.WriteTagWithValue("ResearchSubjectFirstLevel1ID", expert.ResearchCode1ID.HasValue ? expert.ResearchCode1.SubjectFirstLevelID : new Nullable<int>());
            response.WriteTagWithValue("ResearchSubjectFirstLevel1Name", expert.ResearchCode1ID.HasValue ? expert.ResearchCode1.SubjectFirstLevel.Name : String.Empty);
            response.WriteTagWithValue("ResearchSubjectSecondLevel1ID", expert.ResearchCode1ID.HasValue ? expert.ResearchCode1.ID : new Nullable<int>());
            response.WriteTagWithValue("ResearchSubjectSecondLevel1Name", expert.ResearchCode1ID.HasValue ? expert.ResearchCode1.Name : String.Empty);
            response.WriteTagWithValue("ResearchSubjectFirstLevel2ID", expert.ResearchCode2ID.HasValue ? expert.ResearchCode2.SubjectFirstLevelID : new Nullable<int>());
            response.WriteTagWithValue("ResearchSubjectFirstLevel2Name", expert.ResearchCode2ID.HasValue ? expert.ResearchCode2.SubjectFirstLevel.Name : String.Empty);
            response.WriteTagWithValue("ResearchSubjectSecondLevel2ID", expert.ResearchCode2ID.HasValue ? expert.ResearchCode2.ID : new Nullable<int>());
            response.WriteTagWithValue("ResearchSubjectSecondLevel2Name", expert.ResearchCode2ID.HasValue ? expert.ResearchCode2.Name : String.Empty);
            response.WriteTagWithValue("ResearchSubjectFirstLevel3ID", expert.ResearchCode3ID.HasValue ? expert.ResearchCode3.SubjectFirstLevelID : new Nullable<int>());
            response.WriteTagWithValue("ResearchSubjectFirstLevel3Name", expert.ResearchCode3ID.HasValue ? expert.ResearchCode3.SubjectFirstLevel.Name : String.Empty);
            response.WriteTagWithValue("ResearchSubjectSecondLevel3ID", expert.ResearchCode3ID.HasValue ? expert.ResearchCode3.ID : new Nullable<int>());
            response.WriteTagWithValue("ResearchSubjectSecondLevel3Name", expert.ResearchCode3ID.HasValue ? expert.ResearchCode3.Name : String.Empty);
            response.WriteTagWithValue("MajorSubejctFirstLevelID", expert.MajorCodeID.HasValue ? expert.MajorCode.SubjectFirstLevelID : new Nullable<int>());
            response.WriteTagWithValue("MajorSubejctFirstLevelName", expert.MajorCodeID.HasValue ? expert.MajorCode.SubjectFirstLevel.Name : String.Empty);
            response.WriteTagWithValue("MajorSubjectSecondLevelID", expert.MajorCodeID.HasValue ? expert.MajorCode.ID : new Nullable<int>());
            response.WriteTagWithValue("MajorSubjectSecondLevelName", expert.MajorCodeID.HasValue ? expert.MajorCode.Name : String.Empty);
            response.WriteTagWithValue("Language1", expert.Language1);
            response.WriteTagWithValue("LanguageLevel1", expert.LanguageLevel1);
            response.WriteTagWithValue("Language2", expert.Language2);
            response.WriteTagWithValue("LanguageLevel2", expert.LanguageLevel2);
            response.WriteTagWithValue("SocietyPost", expert.SocietyPost);
            response.WriteTagWithValue("WorkExperience", expert.WorkExperience);
            response.WriteTagWithValue("ResearchExperience", expert.ResearchExperience);
            response.WriteTagWithValue("IsAgreeLicence", expert.IsAgreeLicence);
            response.WriteTagWithValue("AgreeLicenceDateTime", expert.AgreeLicenceDateTime);
            response.WriteTagWithValue("AgreeLicenceIP", expert.AgreeLicenceIP);
            response.WriteTagWithValue("IsDeleted", expert.IsDeleted);

            //statistic
            response.WriteTagWithValue("ProjectCount", expert.GetProjectCount(database.ExpertAchieveStatistics).HasValue ? expert.GetProjectCount(database.ExpertAchieveStatistics) : new Nullable<int>());
            response.WriteTagWithValue("PaperCount", expert.GetPaperCount(database.ExpertAchieveStatistics).HasValue ? expert.GetPaperCount(database.ExpertAchieveStatistics) : new Nullable<int>());
            response.WriteTagWithValue("PatentCount", expert.GetPatentCount(database.ExpertAchieveStatistics).HasValue ? expert.GetPatentCount(database.ExpertAchieveStatistics) : new Nullable<int>());
            response.WriteTagWithValue("AwardCount", expert.GetAwardCount(database.ExpertAchieveStatistics).HasValue ? expert.GetAwardCount(database.ExpertAchieveStatistics) : new Nullable<int>());

            //permission
            response.WriteTagWithValue("HasPermission_ShowExpert", user.HasPermission_ShowExpert(database));
            response.WriteTagWithValue("HasPermission_EditExpert", user.HasPermission_EditExpert(database));
            response.WriteTagWithValue("HasPermission_EditExpertLinkWay", user.HasPermission_EditExpertLinkWay(database));

            //can
            response.WriteTagWithValue("CanShowExpert", user.CanShowExpert(database));
            response.WriteTagWithValue("CanEditExpert", user.CanEditExpert(database));
            response.WriteTagWithValue("CanEditExpertLinkWay", user.CanEditExpertLinkWay(database));
        }
        /// <summary>
        /// 显示专家列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Expert> list, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("List");
            foreach (var expert in list)
            {
                response.WriteTagBegin("Record");
                ShowExpert(expert, response, user, database);
                response.WriteTagEnd("Record");
            }
            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示专家查询结果
        /// </summary>
        /// <param name="resultList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Expert> resultList, HttpResponse response, User user, IDatabase database)
        {
            //ShowDelegateWithDatabase<Expert> showDelegate = new ShowDelegateWithDatabase<Expert>(ShowExpert);
            //resultList.Show<Expert>(response, database, showDelegate);
            ShowDelegateWithUserAndDatabase<Expert> showDelegate = new ShowDelegateWithUserAndDatabase<Expert>(ShowExpert);
            resultList.Show<Expert>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 显示专家查询结果
        /// </summary>
        /// <param name="result"></param>
        /// <param name="request"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Expert> result, HttpRequest request, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("QueryResult");

            response.WriteTagWithValue("Total", result.Total);

            response.WriteTagWithValue("ShowProjectCount", request.ShowProjectCount());
            response.WriteTagWithValue("ShowPaperCount", request.ShowPaperCount());
            response.WriteTagWithValue("ShowPatentCount", request.ShowPatentCount());
            response.WriteTagWithValue("ShowAwardCount", request.ShowAwardCount());

            result.ResultList.Show(response, user, database);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 显示筛选专家
        /// </summary>
        /// <param name="expert"></param>
        /// <param name="response"></param>
        public static void ShowAsExpertSearchRecord(Expert expert, HttpResponse response)
        {
            response.WriteTagWithValue("ID", expert.ID);
            response.WriteTagWithValue("Name", expert.Name);
            response.WriteTagWithValue("Number", expert.Number);
            //response.WriteTagWithValue("College", expert.CollegeID.HasValue ? expert.College.Name : String.Empty);
            //response.WriteTagWithValue("College2", expert.College2ID.HasValue ? expert.College2.Name : String.Empty);
            response.WriteTagWithValue("College", expert.College != null ? expert.College.Name : String.Empty);
            response.WriteTagWithValue("College2", expert.College2 != null ? expert.College2.Name : String.Empty);
            response.WriteTagWithValue("PostNew", expert.PostNew);
        }
        /// <summary>
        /// 显示筛选专家列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        public static void ShowAsSearchRecord(this IList<Expert> list, HttpResponse response)
        {
            ShowDelegate<Expert> showDelegate = new ShowDelegate<Expert>(ShowAsExpertSearchRecord);
            list.Show<Expert>(response, showDelegate);
        }
        /// <summary>
        /// 显示查询专家列表
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        public static void ShowAsSimpleQueryRecord(this IList<Expert> list, HttpResponse response, User user)
        {
            response.WriteTagBegin("QueryResult");

            foreach (var expert in list)
                expert.ShowAsSimpleQueryRecord(response, user);

            response.WriteTagEnd("QueryResult");
        }
        /// <summary>
        /// 显示查询专家
        /// </summary>
        /// <param name="expert"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        public static void ShowAsSimpleQueryRecord(this Expert expert, HttpResponse response, User user)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("ID", expert.ID);
            response.WriteTagWithValue("Name", expert.Name);
            response.WriteTagWithValue("OfficePhone", expert.OfficePhone);
            response.WriteTagWithValue("College", expert.CollegeID.HasValue ? expert.College.Name : String.Empty);
            response.WriteTagWithValue("Email", expert.Email);
            if (user.HasPermission_ExpertSimpleQuery_ShowDetail())
            {
                response.WriteTagWithValue("Number", expert.Number);
                response.WriteTagWithValue("MobilePhone", expert.MobilePhone);
                response.WriteTagWithValue("HomePhone", expert.HomePhone);
            }

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 根据ID取得专家
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Expert GetExpertById(this HttpRequest request, IDatabase database)
        {
            return request.GetEntity<Expert>(database.Experts, "expertId");
        }
        /// <summary>
        /// 管理员编辑专家时，取得该专家
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="field"></param>
        /// <returns></returns>
        public static Expert GetExpert(this HttpRequest request, IDatabase database, User user, string field)
        {
            Expert expert = request.getExpert(database, user);

            switch (field)
            {
                case "TextField":
                    {
                        expert = request.getExpert_Text(database, user, expert);
                        break;
                    }
                case "NoticeTextCBox":
                    {
                        expert = request.getExpert_Text(database, user, expert);
                        break;
                    }
                case "TextArea":
                    {
                        expert = request.getExpert_Text(database, user, expert);
                        break;
                    }
                case "NumberField":
                    {
                        expert = request.getExpert_NumberField(database, user, expert);
                        break;
                    }
                case "DateField":
                    {
                        expert = request.getExpert_DateField(database, user, expert);
                        break;
                    }
                case "ComboBox":
                    {
                        expert = request.getExpert_ComboBox(database, user, expert);
                        break;
                    }

                case "EntityComboBox":
                    {
                        expert = request.getExpert_Entity(database, user, expert);
                        break;
                    }
                case "LanguageNoticeTextCB":
                    {
                        expert = request.getExpert_Language(database, user, expert);
                        break;
                    }
                case "LinkEntityCB":
                    {
                        expert = request.getExpert_Entity(database, user, expert);
                        break;
                    }
            }
            return expert;
        }


        private static Expert getExpert_Entity(this HttpRequest request, IDatabase database, User user, Expert expert)
        {
            string paramName = request.GetString("paramName");
            string paramID = request.GetString("paramID");

            object valueEntity = null;
            if (paramName.Contains("ResearchCode") || paramName.Contains("MajorCode"))
                valueEntity = request.GetEntity<SubjectSecondLevel>(database.SubjectSecondLevels, paramID);
            else
                valueEntity = request.GetEntity<Department>(database.Departments, paramID);
            expert = request.setExpertValueDirect(user, database, paramName, expert, valueEntity);

            if (!paramName.Contains("MajorCode"))
            {
                ExpertInfoHistory inforHistory = getExpertHistoryInformationBasic(expert, paramName, ExpertInfoHistoryPropertyValueType.Entity, user, database);
                if (valueEntity == null)
                {
                    inforHistory.PropertyStringValue = "";
                    inforHistory.PropertyIntValue = null;
                }
                else
                {
                    var valueType = valueEntity.GetType();
                    inforHistory.PropertyStringValue = valueType.GetProperty("Name").GetValue(valueEntity, null).ToString();
                    inforHistory.PropertyIntValue = Convert.ToInt16(valueType.GetProperty("ID").GetValue(valueEntity, null));
                }
                inforHistory.Save(database);
            }

            return expert;
        }

        private static Expert getExpert_Language(this HttpRequest request, IDatabase database, User user, Expert expert)
        {
            string languageName = request.GetString("language");
            string levelName = request.GetString("level");
            string language = request.GetString(languageName);
            string level = request.GetString(levelName);
            if (request.isSetExpert(user, database))
            {
                var expertType = typeof(Expert);
                var propertyLanguage = expertType.GetProperty(languageName);
                var propertyLevel = expertType.GetProperty(levelName);
                propertyLanguage.SetValue(expert, language, null);
                propertyLevel.SetValue(expert, level, null);
            }
            ExpertInfoHistory languageInforHistory = getExpertHistoryInformationBasic(expert, languageName, ExpertInfoHistoryPropertyValueType.Text, user, database);
            languageInforHistory.PropertyStringValue = language;
            languageInforHistory.Save(database);
            ExpertInfoHistory levelInforHistory = getExpertHistoryInformationBasic(expert, levelName, ExpertInfoHistoryPropertyValueType.Text, user, database);
            levelInforHistory.PropertyStringValue = level;
            levelInforHistory.Save(database);

            return expert;
        }
        private static Expert getExpert_Text(this HttpRequest request, IDatabase database, User user, Expert expert)
        {
            string paramName = request.GetString("paramName");
            string value = request.GetString(paramName);
            expert = request.setExpertValueDirect(user, database, paramName, expert, value);

            if (paramName == "Fax" || paramName == "Address" || paramName == "Zip" || paramName == "Email" || paramName == "MobilePhone" || paramName == "OfficePhone" || paramName == "HomePhone" || paramName == "SocietyPost" || paramName == "Specialty")
            {
                ExpertInfoHistory inforHistory = getExpertHistoryInformationBasic(expert, paramName, ExpertInfoHistoryPropertyValueType.Text, user, database);
                inforHistory.PropertyStringValue = value;
                inforHistory.Save(database);
            }
            else if (paramName == "WorkExperience" || paramName == "ResearchExperience")
            {
                ExpertInfoHistory inforHistory = getExpertHistoryInformationBasic(expert, paramName, ExpertInfoHistoryPropertyValueType.LongText, user, database);
                inforHistory.PropertyLongStringValue = value;
                inforHistory.Save(database);
            }
            return expert;
        }
        private static Expert getExpert_ComboBox(this HttpRequest request, IDatabase database, User user, Expert expert)
        {
            string paramName = request.GetString("paramName");
            object value = null;

            if (paramName == "Sex")
                value = request.GetString(paramName) == "Man" ? SexType.Man : SexType.Women;
            else
                value = request.GetBoolean(paramName);
            expert = request.setExpertValueDirect(user, database, paramName, expert, value);
            if (paramName == "IsDoctorDirector")
            {
                ExpertInfoHistory inforHistory = getExpertHistoryInformationBasic(expert, paramName, ExpertInfoHistoryPropertyValueType.Boolean, user, database);
                inforHistory.PropertyStringValue = Convert.ToBoolean(value) == true ? "是" : "否";
                inforHistory.PropertyBooleanValue = Convert.ToBoolean(value);
                inforHistory.Save(database);
            }
            return expert;
        }

        private static Expert getExpert_NumberField(this HttpRequest request, IDatabase database, User user, Expert expert)
        {
            string paramName = request.GetString("paramName");
            int? value = request.GetInt(paramName);
            if (request.isSetExpert(user, database))
            {
                var expertType = typeof(Expert);
                var property = expertType.GetProperty(paramName);
                property.SetValue(expert, value, null);
            }
            return expert;
        }
        private static Expert getExpert_DateField(this HttpRequest request, IDatabase database, User user, Expert expert)
        {
            string paramName = request.GetString("paramName");
            DateTime? value = request.GetDateTime(paramName);
            if (request.isSetExpert(user, database))
            {
                var expertType = typeof(Expert);
                var property = expertType.GetProperty(paramName);
                property.SetValue(expert, value, null);
            }
            return expert;
        }
        private static Expert setExpertValueDirect(this HttpRequest request, User user, IDatabase database, string paramName, Expert expert, object value)
        {
            if (request.isSetExpert(user, database))
            {
                var expertType = typeof(Expert);
                var property = expertType.GetProperty(paramName);
                property.SetValue(expert, value, null);
            }
            return expert;
        }

        //判断是否可以将对专家某个字段的更改存到库中，还是只新建历史信息
        private static bool isSetExpert(this HttpRequest request, User user, IDatabase database)
        {
            string paramName = request.GetString("paramName");
            List<String> list = new List<string>() { "NameSpell", "Sex", "Birthday", "Nation", "Policy", "MajorCode", "IDCardNumber" };
            return user.HasPermission_EditExpertAndSaveDirect(database, list, paramName);
        }
        // 编辑专家的时候，建立专家字段的历史信息记录       
        private static ExpertInfoHistory getExpertHistoryInformationBasic(Expert expert, string propertyName, ExpertInfoHistoryPropertyValueType propertyValueType, User user, IDatabase database)
        {
            ExpertInfoHistory inforHistory = new ExpertInfoHistory();
            inforHistory.Expert = expert;
            inforHistory.PropertyName = propertyName;
            inforHistory.SubmitTime = DateTime.Now;
            inforHistory.SubmitOperator = user.Name;
            inforHistory.PropertyValueType = propertyValueType;
            inforHistory = getInforHistoryCensorByPower(database, user, inforHistory);
            return inforHistory;
        }
        //根据用户权限填写历史信息的审核情况
        private static ExpertInfoHistory getInforHistoryCensorByPower(IDatabase database, User user, ExpertInfoHistory inforHistory)
        {
            if (user.HasPermission_EditExpert(database) || user.HasPermission_EditExpertLinkWay(database))
            {
                inforHistory.CensorOperator = user.Name;
                inforHistory.CensorTime = DateTime.Now;
                inforHistory.CensorState = CensorState.Passed;
            }
            else if (user.IsExpert)
            {
                inforHistory.CensorState = CensorState.WaitingCensor;
            }
            return inforHistory;
        }


        /// <summary>
        /// 取得新添加的专家的信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Expert GetNewExpert(this HttpRequest request, IDatabase database, User user)
        {
            Expert expert = request.getExpert(database, user);
            expert.User = user;
            expert.Number = request.GetString("number");
            expert.Name = request.GetString("name");
            expert.NameSpell = request.GetString("nameSpell");
            expert.Sex = request.GetEnum<SexType>("sex");
            expert.Birthday = request.GetDateTime("birthdayValue");
            expert.IsOnjob = request.GetBoolean("isOnjob");
            expert.IsChinese = request.GetBoolean("isChinese");
            expert.MobilePhone = request.GetString("mobilePhone");
            expert.Department = request.GetEntity<Department>(database.Departments, "departmentID");
            expert.College = request.GetEntity<Department>(database.Departments, "CollegeID");
            expert.College2 = request.GetEntity<Department>(database.Departments, "College2ID");
            expert.IsAgreeLicence = false;
            expert.IsDeleted = false;
            return expert;
        }
        /// <summary>
        /// 管理员新建专家时新建相关字段历史信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="expert"></param>
        /// <param name="propertyName"></param>
        /// <param name="newValue"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ExpertInfoHistory buildNewExpertHistoryInformation(this HttpRequest request, Expert expert, string propertyName, string newValue, User user, IDatabase database)
        {
            ExpertInfoHistory inforHistory = new ExpertInfoHistory();
            inforHistory.Expert = expert;
            inforHistory.PropertyName = propertyName;
            inforHistory.SubmitTime = DateTime.Now;
            inforHistory.SubmitOperator = user.Name;
            inforHistory.PropertyValueType = ExpertInfoHistoryPropertyValueType.Text;
            inforHistory.PropertyStringValue = newValue;
            inforHistory.CensorOperator = user.Name;
            inforHistory.CensorTime = DateTime.Now;
            inforHistory.CensorState = CensorState.Passed;
            return inforHistory;
        }
        /// <summary>
        /// 上传照片时，保存历史信息操作
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="guid"></param>
        /// <returns></returns>
        public static Expert GetExpert_Label(this HttpRequest request, IDatabase database, User user, Guid guid)
        {
            Expert expert = request.getExpert(database, user);
            if (request.isSetExpert(user, database))
                expert.Photo = guid;

            ExpertInfoHistory inforHistory = getExpertHistoryInformationBasic(expert, "Photo", ExpertInfoHistoryPropertyValueType.Guid, user, database);
            inforHistory.PropertyGuildValue = guid;
            inforHistory.Save(database);
            return expert;
        }

        //根据ID取得专家实体
        private static Expert getExpert(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("expertID");
            if (id.HasValue)
                return database.Experts.GetByID(id.Value);
            return new Expert();
        }


        /// <summary>
        /// 取得等待审核的专家历史信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ExpertInfoHistory GetWaittingCensoeInfor(this HttpRequest request, IDatabase database, User user)
        {
            var infor = request.getWaittingCensoeInfor(database);
            infor.CensorState = CensorState.Passed;
            infor.CensorOperator = user.Name;
            infor.CensorTime = DateTime.Now;
            return infor;
        }
        private static ExpertInfoHistory getWaittingCensoeInfor(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.ExpertCensorInfos.GetByID(id.Value);
            return new ExpertInfoHistory();
        }
        /// <summary>
        /// 取得审核通过的专家历史信息对应的专家
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <param name="infor"></param>
        /// <param name="isSubject"></param>
        /// <returns></returns>
        public static Expert GetWaittingCensorExpert(this HttpRequest request, IDatabase database, User user, ExpertInfoHistory infor, bool? isSubject)
        {
            var expert = infor.Expert;
            var expertType = typeof(Expert);

            var property = expertType.GetProperty(infor.PropertyName);
            int valueType = (int)infor.PropertyValueType;

            if (valueType == 1)//text
                property.SetValue(expert, infor.PropertyStringValue, null);
            if (valueType == 2)//int
                property.SetValue(expert, infor.PropertyIntValue, null);
            if (valueType == 3)//datetiem
                property.SetValue(expert, infor.PropertyDateTimeValue, null);
            if (valueType == 4)//guid
                property.SetValue(expert, infor.PropertyGuildValue, null);
            if (valueType == 5)//longText
                property.SetValue(expert, infor.PropertyLongStringValue, null);
            if (valueType == 8)//bool
                property.SetValue(expert, infor.PropertyBooleanValue, null);
            if (valueType == 6) //entity
                if (isSubject == true)
                    property.SetValue(expert, infor.PropertyIntValue.HasValue ? database.SubjectSecondLevels.GetByID(infor.PropertyIntValue.Value) : null, null);
                else
                    property.SetValue(expert, infor.PropertyIntValue.HasValue ? database.Departments.GetByID(infor.PropertyIntValue.Value) : null, null);


            return expert;
        }
    }
}

