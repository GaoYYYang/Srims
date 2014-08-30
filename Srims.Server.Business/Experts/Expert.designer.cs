using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Experts;

namespace Srims.Server.Business.Experts
{
    /// <summary>
    /// 专家
    /// </summary>
    public partial class Expert
    {
        #region ID和时间戳

        private int _ID = NEW_ENTITY_ID;
        private byte[] _TimeStamp = new byte[] { };

        /// <summary>
        /// 取得ID
        /// </summary>
        public override int ID
        {
            get { return _ID; }
        }
        /// <summary>
        /// 取得时间戳
        /// </summary>
        public override byte[] TimeStamp
        {
            get { return _TimeStamp; }
        }

        #endregion

        #region 成员

        private int _UserID;
        private EntityRef<User> _User;
        private string _Number;
        private string _Name;
        private string _NameSpell;
        private SexType _Sex;
        private DateTime? _Birthday;
        private string _Nation;
        private string _Policy;
        private int? _MajorCodeID;
        private EntityRef<SubjectSecondLevel> _MajorCode;
        private string _IDCardNumber;
        private DateTime? _ComeDate;
        private string _FileNumber;
        private string _AcademyDegree;
        private string _PostOld;
        private string _PostNew;
        private int? _PostLevel;
        private string _Occupation;
        private int? _VocationLevel;
        private bool? _IsDoctorDirector;
        private bool? _IsOnjob;
        private bool? _IsChinese;
        private string _MobilePhone;
        private string _OfficePhone;
        private string _HomePhone;
        private string _Fax;
        private string _Address;
        private string _Zip;
        private string _Email;
        private int? _CollegeID;
        private EntityRef<Department> _College;
        private int? _College2ID;
        private EntityRef<Department> _College2;
        private int? _DepartmentID;
        private EntityRef<Department> _Department;
        private string _Specialty;
        private Guid? _Photo;
        private int? _ResearchCode1ID;
        private EntityRef<SubjectSecondLevel> _ResearchCode1;
        private int? _ResearchCode2ID;
        private EntityRef<SubjectSecondLevel> _ResearchCode2;
        private int? _ResearchCode3ID;
        private EntityRef<SubjectSecondLevel> _ResearchCode3;
        private string _Language1;
        private string _LanguageLevel1;
        private string _Language2;
        private string _LanguageLevel2;
        private string _SocietyPost;
        private string _WorkExperience;
        private string _ResearchExperience;
        private bool _IsAgreeLicence;
        private DateTime? _AgreeLicenceDateTime;
        private string _AgreeLicenceIP;
        private bool _IsDeleted;

        #endregion

        #region 属性

        /// <summary>
        /// 取得对应对应用户的ID
        /// </summary>
        public int UserID
        {
            get { return _UserID; }
        }
        /// <summary>
        /// 取得对应的对应用户
        /// </summary>
        public User User
        {
            get { return _User.Entity; }
            set
            {
                _User.Entity = value;
                _UserID = value == null ? 0 : value.ID;
            }
        }
        /// <summary>
        /// 取得或设置职工号
        /// </summary>
        public string Number
        {
            get { return _Number; }
            set { _Number = value; }
        }
        /// <summary>
        /// 取得或设置姓名拼音缩写
        /// </summary>
        public string NameSpell
        {
            get { return _NameSpell; }
            set { _NameSpell = value; }
        }
        /// <summary>
        /// 取得或设置性别
        /// </summary>
        /// <remarks>男、女</remarks>
        public SexType Sex
        {
            get { return _Sex; }
            set { _Sex = value; }
        }
        /// <summary>
        /// 取得或设置出生日期
        /// </summary>
        public DateTime? Birthday
        {
            get { return _Birthday; }
            set { _Birthday = value; }
        }
        /// <summary>
        /// 取得或设置民族
        /// </summary>
        public string Nation
        {
            get { return _Nation; }
            set { _Nation = value; }
        }
        /// <summary>
        /// 取得或设置政治面貌
        /// </summary>
        public string Policy
        {
            get { return _Policy; }
            set { _Policy = value; }
        }
        /// <summary>
        /// 取得对应所学专业代码的ID
        /// </summary>
        public int? MajorCodeID
        {
            get { return _MajorCodeID; }
        }
        /// <summary>
        /// 取得对应的所学专业代码
        /// </summary>
        public SubjectSecondLevel MajorCode
        {
            get { return _MajorCode.Entity; }
            set
            {
                _MajorCode.Entity = value;
                _MajorCodeID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置身份证号
        /// </summary>
        /// <remarks>增加校验</remarks>
        public string IDCardNumber
        {
            get { return _IDCardNumber; }
            set { _IDCardNumber = value; }
        }
        /// <summary>
        /// 取得或设置来校年月
        /// </summary>
        public DateTime? ComeDate
        {
            get { return _ComeDate; }
            set { _ComeDate = value; }
        }
        /// <summary>
        /// 取得或设置档案号
        /// </summary>
        public string FileNumber
        {
            get { return _FileNumber; }
            set { _FileNumber = value; }
        }
        /// <summary>
        /// 取得或设置学历
        /// </summary>
        public string AcademyDegree
        {
            get { return _AcademyDegree; }
            set { _AcademyDegree = value; }
        }
        /// <summary>
        /// 取得或设置旧版本职称
        /// </summary>
        public string PostOld
        {
            get { return _PostOld; }
            set { _PostOld = value; }
        }
        /// <summary>
        /// 取得或设置新版本职称
        /// </summary>
        public string PostNew
        {
            get { return _PostNew; }
            set { _PostNew = value; }
        }
        /// <summary>
        /// 取得或设置职称等级
        /// </summary>
        public int? PostLevel
        {
            get { return _PostLevel; }
            set { _PostLevel = value; }
        }
        /// <summary>
        /// 取得或设置职务
        /// </summary>
        public string Occupation
        {
            get { return _Occupation; }
            set { _Occupation = value; }
        }
        /// <summary>
        /// 取得或设置职业等级
        /// </summary>
        /// <remarks>1-14</remarks>
        public int? VocationLevel
        {
            get { return _VocationLevel; }
            set { _VocationLevel = value; }
        }
        /// <summary>
        /// 取得或设置是否博导
        /// </summary>
        public bool? IsDoctorDirector
        {
            get { return _IsDoctorDirector; }
            set { _IsDoctorDirector = value; }
        }
        /// <summary>
        /// 取得或设置是否在职
        /// </summary>
        public bool? IsOnjob
        {
            get { return _IsOnjob; }
            set { _IsOnjob = value; }
        }
        /// <summary>
        /// 取得或设置是否中国籍
        /// </summary>
        public bool? IsChinese
        {
            get { return _IsChinese; }
            set { _IsChinese = value; }
        }
        /// <summary>
        /// 取得或设置移动电话
        /// </summary>
        public string MobilePhone
        {
            get { return _MobilePhone; }
            set { _MobilePhone = value; }
        }
        /// <summary>
        /// 取得或设置办公电话
        /// </summary>
        public string OfficePhone
        {
            get { return _OfficePhone; }
            set { _OfficePhone = value; }
        }
        /// <summary>
        /// 取得或设置家庭电话
        /// </summary>
        public string HomePhone
        {
            get { return _HomePhone; }
            set { _HomePhone = value; }
        }
        /// <summary>
        /// 取得或设置传真
        /// </summary>
        public string Fax
        {
            get { return _Fax; }
            set { _Fax = value; }
        }
        /// <summary>
        /// 取得或设置通讯地址
        /// </summary>
        public string Address
        {
            get { return _Address; }
            set { _Address = value; }
        }
        /// <summary>
        /// 取得或设置邮政编码
        /// </summary>
        public string Zip
        {
            get { return _Zip; }
            set { _Zip = value; }
        }
        /// <summary>
        /// 取得或设置电子邮件
        /// </summary>
        public string Email
        {
            get { return _Email; }
            set { _Email = value; }
        }
        /// <summary>
        /// 取得对应所在学院的ID
        /// </summary>
        public int? CollegeID
        {
            get { return _CollegeID; }
        }
        /// <summary>
        /// 取得对应的所在学院
        /// </summary>
        public Department College
        {
            get { return _College.Entity; }
            set
            {
                _College.Entity = value;
                _CollegeID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应双聘单位的ID
        /// </summary>
        public int? College2ID
        {
            get { return _College2ID; }
        }
        /// <summary>
        /// 取得对应的双聘单位
        /// </summary>
        public Department College2
        {
            get { return _College2.Entity; }
            set
            {
                _College2.Entity = value;
                _College2ID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应所在部门的ID
        /// </summary>
        public int? DepartmentID
        {
            get { return _DepartmentID; }
        }
        /// <summary>
        /// 取得对应的所在部门
        /// </summary>
        public Department Department
        {
            get { return _Department.Entity; }
            set
            {
                _Department.Entity = value;
                _DepartmentID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置专长
        /// </summary>
        public string Specialty
        {
            get { return _Specialty; }
            set { _Specialty = value; }
        }
        /// <summary>
        /// 取得或设置照片资源
        /// </summary>
        public Guid? Photo
        {
            get { return _Photo; }
            set { _Photo = value; }
        }
        /// <summary>
        /// 取得对应从事专业代码1的ID
        /// </summary>
        public int? ResearchCode1ID
        {
            get { return _ResearchCode1ID; }
        }
        /// <summary>
        /// 取得对应的从事专业代码1
        /// </summary>
        public SubjectSecondLevel ResearchCode1
        {
            get { return _ResearchCode1.Entity; }
            set
            {
                _ResearchCode1.Entity = value;
                _ResearchCode1ID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应从事专业代码2的ID
        /// </summary>
        public int? ResearchCode2ID
        {
            get { return _ResearchCode2ID; }
        }
        /// <summary>
        /// 取得对应的从事专业代码2
        /// </summary>
        public SubjectSecondLevel ResearchCode2
        {
            get { return _ResearchCode2.Entity; }
            set
            {
                _ResearchCode2.Entity = value;
                _ResearchCode2ID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得对应从事专业代码3的ID
        /// </summary>
        public int? ResearchCode3ID
        {
            get { return _ResearchCode3ID; }
        }
        /// <summary>
        /// 取得对应的从事专业代码3
        /// </summary>
        public SubjectSecondLevel ResearchCode3
        {
            get { return _ResearchCode3.Entity; }
            set
            {
                _ResearchCode3.Entity = value;
                _ResearchCode3ID = value == null ? null : new int?(value.ID);
            }
        }
        /// <summary>
        /// 取得或设置外语语种1
        /// </summary>
        public string Language1
        {
            get { return _Language1; }
            set { _Language1 = value; }
        }
        /// <summary>
        /// 取得或设置熟练程度1
        /// </summary>
        public string LanguageLevel1
        {
            get { return _LanguageLevel1; }
            set { _LanguageLevel1 = value; }
        }
        /// <summary>
        /// 取得或设置外语语种2
        /// </summary>
        public string Language2
        {
            get { return _Language2; }
            set { _Language2 = value; }
        }
        /// <summary>
        /// 取得或设置熟练程度2
        /// </summary>
        public string LanguageLevel2
        {
            get { return _LanguageLevel2; }
            set { _LanguageLevel2 = value; }
        }
        /// <summary>
        /// 取得或设置社会兼职
        /// </summary>
        public string SocietyPost
        {
            get { return _SocietyPost; }
            set { _SocietyPost = value; }
        }
        /// <summary>
        /// 取得或设置工作简历
        /// </summary>
        public string WorkExperience
        {
            get { return _WorkExperience; }
            set { _WorkExperience = value; }
        }
        /// <summary>
        /// 取得或设置科研简历
        /// </summary>
        public string ResearchExperience
        {
            get { return _ResearchExperience; }
            set { _ResearchExperience = value; }
        }
        /// <summary>
        /// 取得或设置是否同意用户协议
        /// </summary>
        public bool IsAgreeLicence
        {
            get { return _IsAgreeLicence; }
            set { _IsAgreeLicence = value; }
        }
        /// <summary>
        /// 取得或设置用户协议时间
        /// </summary>
        public DateTime? AgreeLicenceDateTime
        {
            get { return _AgreeLicenceDateTime; }
            set { _AgreeLicenceDateTime = value; }
        }
        /// <summary>
        /// 取得或设置用户协议时所用IP
        /// </summary>
        public string AgreeLicenceIP
        {
            get { return _AgreeLicenceIP; }
            set { _AgreeLicenceIP = value; }
        }
        /// <summary>
        /// 取得或设置是否已删除
        /// </summary>
        public bool IsDeleted
        {
            get { return _IsDeleted; }
            set { _IsDeleted = value; }
        }

        #endregion
    }
}
