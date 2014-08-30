using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;

namespace Srims.Tools.DataImport.Importer.Experts
{
    public class ExpertImporter : ImporterBase<Expert_Old, Expert>
    {
        private const string PHOTO_RESOURCE_TYPE = "jpg";
        private const int STATE_ON_JOB = 1;
        private const int STATE_ON_BROAD = 2;

        protected override string EntityName
        {
            get { return "专家"; }
        }

        public override void Clear()
        {
            NewDatabase.Execute("DELETE FROM ExpertInfoHistory");
            base.Clear();
        }
        protected override string GetEntityDescription(Expert_Old oldEntity)
        {
            return String.Format("{0}({1})", oldEntity.Name, oldEntity.Number);
        }

        protected override string ResourceColumn
        {
            get { return "Photo"; }
        }

        protected override Expert GetNewEntity(Expert_Old oldEntity)
        {
            var expert = new Expert();
            expert.AcademyDegree = oldEntity.AcademyDegree;
            expert.Address = oldEntity.Address;
            expert.AgreeLicenceDateTime = oldEntity.User_Old.IsProtocolAccept ? new DateTime?(DateTime.Now) : null;
            expert.AgreeLicenceIP = oldEntity.User_Old.IsProtocolAccept ? String.Empty : null;
            expert.Birthday = getBirthday(oldEntity);
            expert.College = getCollege(oldEntity);
            expert.ComeDate = null;
            expert.Department = getDepartment(oldEntity);
            expert.Email = oldEntity.Email;
            expert.Fax = oldEntity.Fax;
            expert.FileNumber = null;
            expert.HomePhone = oldEntity.HomePhone;
            expert.IDCardNumber = oldEntity.IDCardNumber;
            expert.IsAgreeLicence = oldEntity.User_Old.IsProtocolAccept;
            expert.IsChinese = true;
            expert.IsDeleted = false;
            expert.IsDoctorDirector = oldEntity.IsDoctorDirector;
            expert.Language1 = oldEntity.Language1;
            expert.Language2 = oldEntity.Language2;
            expert.LanguageLevel1 = oldEntity.LanguageLevel1;
            expert.LanguageLevel2 = oldEntity.LanguageLevel2;
            expert.MajorCode = getSubjectCode(oldEntity.MajorCodeID);
            expert.MobilePhone = oldEntity.MobilePhone;
            expert.Name = oldEntity.Name;
            expert.NameSpell = oldEntity.NameSpell;
            expert.Nation = oldEntity.Nation;
            expert.Number = oldEntity.Number;
            expert.OfficePhone = oldEntity.OfficePhone;
            expert.Policy = oldEntity.Policy;
            expert.Sex = (SexType)oldEntity.Sex;
            expert.User = getUser(oldEntity);
            expert.Zip = oldEntity.Zip;
            expert.Photo = getPhoto(oldEntity);
            expert.Occupation = oldEntity.Occupation;
            expert.Photo = getPhoto(oldEntity);
            expert.Policy = oldEntity.Policy;
            expert.PostNew = oldEntity.PostBak;
            expert.PostLevel = oldEntity.PostLevel;
            expert.ResearchCode1 = getSubjectCode(oldEntity.ResearchCode1ID);
            expert.ResearchCode2 = getSubjectCode(oldEntity.ResearchCode2ID);
            expert.ResearchCode3 = getSubjectCode(oldEntity.ResearchCode3ID);
            expert.ResearchExperience = oldEntity.ResearchExperience;
            expert.SocietyPost = oldEntity.SocietyPost;
            expert.Specialty = oldEntity.Specialty;
            expert.WorkExperience = oldEntity.WorkExperience;
            expert.IsOnjob = getIsOnjob(oldEntity);
            //TODO expert.VocationLevel

            expert.Save(NewDatabase);

            if (!String.IsNullOrEmpty(expert.MobilePhone))
                insertExpertInfoHistory(expert, "移动电话", ExpertInfoHistoryPropertyValueType.Text, expert.MobilePhone);
            if (!String.IsNullOrEmpty(expert.HomePhone))
                insertExpertInfoHistory(expert, "家庭电话", ExpertInfoHistoryPropertyValueType.Text, expert.HomePhone);
            if (!String.IsNullOrEmpty(expert.OfficePhone))
                insertExpertInfoHistory(expert, "办公电话", ExpertInfoHistoryPropertyValueType.Text, expert.OfficePhone);
            if (!String.IsNullOrEmpty(expert.Fax))
                insertExpertInfoHistory(expert, "传真", ExpertInfoHistoryPropertyValueType.Text, expert.Fax);
            if (!String.IsNullOrEmpty(expert.Address))
                insertExpertInfoHistory(expert, "通讯地址", ExpertInfoHistoryPropertyValueType.Text, expert.Address);
            if (!String.IsNullOrEmpty(expert.Zip))
                insertExpertInfoHistory(expert, "邮政编码", ExpertInfoHistoryPropertyValueType.Text, expert.Zip);
            if (!String.IsNullOrEmpty(expert.Email))
                insertExpertInfoHistory(expert, "电子邮件", ExpertInfoHistoryPropertyValueType.Text, expert.Email);
            if (expert.CollegeID.HasValue)
                insertExpertInfoHistory(expert, "所在学院", ExpertInfoHistoryPropertyValueType.Text, expert.College.ToString());
            if (expert.DepartmentID.HasValue)
                insertExpertInfoHistory(expert, "所在部门", ExpertInfoHistoryPropertyValueType.Text, expert.Department.ToString());
            if (!String.IsNullOrEmpty(expert.Specialty))
                insertExpertInfoHistory(expert, "专长", ExpertInfoHistoryPropertyValueType.Text, expert.Specialty);
            if (expert.Photo.HasValue)
                insertExpertInfoHistory(expert, "照片", ExpertInfoHistoryPropertyValueType.Guid, expert.Photo.Value);
            if (expert.ResearchCode1ID.HasValue)
                insertExpertInfoHistory(expert, "从事专业代码1", ExpertInfoHistoryPropertyValueType.Text, expert.ResearchCode1.ToString());
            if (expert.ResearchCode2ID.HasValue)
                insertExpertInfoHistory(expert, "从事专业代码2", ExpertInfoHistoryPropertyValueType.Text, expert.ResearchCode2.ToString());
            if (expert.ResearchCode3ID.HasValue)
                insertExpertInfoHistory(expert, "从事专业代码3", ExpertInfoHistoryPropertyValueType.Text, expert.ResearchCode3.ToString());
            if (!String.IsNullOrEmpty(expert.Language1))
                insertExpertInfoHistory(expert, "外语语种1", ExpertInfoHistoryPropertyValueType.Text, expert.Language1);
            if (!String.IsNullOrEmpty(expert.Language2))
                insertExpertInfoHistory(expert, "外语语种2", ExpertInfoHistoryPropertyValueType.Text, expert.Language2);
            if (!String.IsNullOrEmpty(expert.LanguageLevel1))
                insertExpertInfoHistory(expert, "熟练程度1", ExpertInfoHistoryPropertyValueType.Text, expert.LanguageLevel1);
            if (!String.IsNullOrEmpty(expert.LanguageLevel2))
                insertExpertInfoHistory(expert, "熟练程度2", ExpertInfoHistoryPropertyValueType.Text, expert.LanguageLevel2);
            if (!String.IsNullOrEmpty(expert.SocietyPost))
                insertExpertInfoHistory(expert, "社会兼职", ExpertInfoHistoryPropertyValueType.Text, expert.SocietyPost);
            if (!String.IsNullOrEmpty(expert.WorkExperience))
                insertExpertInfoHistory(expert, "工作简历", ExpertInfoHistoryPropertyValueType.LongText, expert.WorkExperience);
            if (!String.IsNullOrEmpty(expert.ResearchExperience))
                insertExpertInfoHistory(expert, "科研简历", ExpertInfoHistoryPropertyValueType.LongText, expert.ResearchExperience);

            return expert;
        }

        private void insertExpertInfoHistory(Expert expert, string propertyName, ExpertInfoHistoryPropertyValueType type, object value)
        {
            var expertInfoHistory = new ExpertInfoHistory();
            expertInfoHistory.CensorOperator = "默认管理员";
            expertInfoHistory.CensorState = CensorState.Passed;
            expertInfoHistory.CensorTime = DateTime.Now;
            expertInfoHistory.Expert = expert;
            expertInfoHistory.SubmitOperator = "默认管理员";
            expertInfoHistory.SubmitTime = expertInfoHistory.CensorTime.Value;
            expertInfoHistory.PropertyValueType = type;
            expertInfoHistory.PropertyName = propertyName;
            switch (type)
            {
                case ExpertInfoHistoryPropertyValueType.Text:
                    expertInfoHistory.PropertyStringValue = (String)value;
                    break;
                case ExpertInfoHistoryPropertyValueType.Int:
                    expertInfoHistory.PropertyIntValue = (Int32)value;
                    break;
                case ExpertInfoHistoryPropertyValueType.DateTime:
                    expertInfoHistory.PropertyDateTimeValue = (DateTime)value;
                    break;
                case ExpertInfoHistoryPropertyValueType.Guid:
                    expertInfoHistory.PropertyGuildValue = (Guid)value;
                    break;
                case ExpertInfoHistoryPropertyValueType.LongText:
                    expertInfoHistory.PropertyLongStringValue = (String)value;
                    break;
            }
            expertInfoHistory.Save(NewDatabase);
        }

        private Department getCollege(Expert_Old oldEntity)
        {
            if (String.IsNullOrEmpty(oldEntity.CollegeName))
            {
                WriteMessage(MesssageType.Warning, "未指定对应的学院。");
                return null;
            }

            var college = NewDatabase
                .Departments
                .SingleOrDefault(d => d.IsCollege && d.Name == oldEntity.CollegeName);

            if (college == null)
            {
                WriteMessage(MesssageType.Warning, String.Format("对应的学院（{0}）未找到。", oldEntity.CollegeName));
                return null;
            }

            return college;
        }
        private Department getDepartment(Expert_Old oldEntity)
        {
            if (String.IsNullOrEmpty(oldEntity.Department2))
                return null;

            var department = NewDatabase
                .Departments
                .SingleOrDefault(d => d.Name == oldEntity.Department2);

            if (department == null)
            {
                WriteMessage(MesssageType.Warning, String.Format("对应的部门（{0}）未找到。", oldEntity.Department2));
                return null;
            }

            return department;
        }
        private bool? getIsAbroad(Expert_Old oldEntity)
        {
            if (oldEntity.State == STATE_ON_JOB)
                return false;
            else if (oldEntity.State == STATE_ON_BROAD)
                return true;
            else
                return null;
        }
        private bool? getIsOnjob(Expert_Old oldEntity)
        {
            if (oldEntity.State == STATE_ON_JOB)
                return true;
            else if (oldEntity.State == STATE_ON_BROAD)
                return false;
            else
                return null;
        }
        private Guid? getPhoto(Expert_Old oldEntity)
        {
            if (oldEntity.Image == null || oldEntity.Image.Length == 0)
                return null;

            var resource = new Resource();
            resource.Content = oldEntity.Image;
            resource.Guid = Guid.NewGuid();
            resource.Type = PHOTO_RESOURCE_TYPE;

            resource.Save(NewDatabase);
            return resource.Guid;
        }
        private SubjectSecondLevel getSubjectCode(int? codeID)
        {
            if (!codeID.HasValue)
                return null;

            var code = OldDatabase
                .SubjectSecondLevel_Olds
                .Single(ssl => ssl.ID == codeID.Value);

            return NewDatabase
                .SubjectSecondLevels
                .SingleOrDefault(ssl => ssl.Code == code.Code || ssl.Name == code.Name);
        }
        private User getUser(Expert_Old oldEntity)
        {
            return NewDatabase
                .Users
                .Single(u => u.LoginID == oldEntity.Number);
        }

        private DateTime? getBirthday(Expert_Old oldEntity)
        {
            if (String.IsNullOrEmpty(oldEntity.IDCardNumber)
                || (oldEntity.IDCardNumber.Length != 15 && oldEntity.IDCardNumber.Length != 18))
                return oldEntity.Birthday;

            string dateTimeString = null;
            if (oldEntity.IDCardNumber.Length == 15)
                dateTimeString = "19" + oldEntity.IDCardNumber.Substring(6, 6);
            else
                dateTimeString = oldEntity.IDCardNumber.Substring(6, 8);

            return ParseDateTime(dateTimeString);

        }
    }
}
