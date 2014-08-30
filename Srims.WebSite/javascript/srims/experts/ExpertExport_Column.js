
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertExport_Column = function(){
}
Srims.experts.ExpertExport_Column.basic = [['UserID', '登陆ID', , '100'], ['Number', '工作证号', , '100'], ['Name', '姓名', , '100'], ['NameSpell', '姓名拼音缩写', , '80'], ['Sex', '性别', 'sex', '60'], ['Birthday', '出生日期', 'Date', '100'], ['Nation', '民族', , '60'], ['Policy', '政治面貌', , '100'], ['MajorCode', '专业代码', , '100'], ['IDCardNumber', '身份证号', , '100'], ['ComeDate', '来校日期', 'Date', '100'], ['FileNumber', '档案号', , '100'], ['AcademyDegree', '学历', , '100'], ['Post', '职称', , '100'], ['PostLevel', '职称级别', , '80'], ['Occupation', '职业', , '100'], ['VocationLevel', '职业等级', , '40'], ['IsDoctorDirector', '是否博导', 'Boolean', '30'], ['IsOnjob', '是否在职', 'Boolean', '30'], ['IsChinese', '是否中国国籍', 'Boolean', '30'], ['College', '所在学院', , '100'], ['Department', '所在部门', , '100']];

Srims.experts.ExpertExport_Column.contact = [['MobilePhone', '移动电话', , '120'], ['OfficePhone', '办公电话', , '120'], ['HomePhone', '家庭电话', , '100'], ['Fax', '传真', , '100'], ['Address', '通讯地址', , '200'], ['Zip', '邮编', , '100'], ['Email', 'Email', , '100']];

Srims.experts.ExpertExport_Column.major = [['ResearchSubjectFirstLevel1Name', '从事专业1一级学科', , '100'], ['ResearchSubjectSecondLevel1Name', '从事专业1二级学科', , '100'], ['ResearchSubjectFirstLevel2Name', '从事专业2一级学科', , '100'], ['ResearchSubjectSecondLevel2Name', '从事专业2二级学科', , '100'], ['ResearchSubjectFirstLevel3Name', '从事专业3一级学科', , '100'], ['ResearchSubjectSecondLevel3Name', '从事专业3二级学科', , '100'], ['MajorSubejctFirstLevelName', '所学专业一级学科', , '100'], ['MajorSubjectSecondLevelName', '所学专业二级学科', , '100']];

Srims.experts.ExpertExport_Column.resume = [['Language1', '外语语种1', , '100'], ['LanguageLevel1', '外语1熟练程度', , '40'], ['Language2', '外语语种2', , '100'], ['LanguageLevel2', '外语2熟练程度', , '40'], ['Specialty', '特长', , '200'], ['SocietyPost', '社会兼职', , '1000'], ['WorkExperience', '工作简历', , '2000'], ['ResearchExperience', '科研简历', , '1000']];

Srims.experts.ExpertExport_Column.statistic = [['ProjectCount', '项目数目', , '40'], ['PaperCount', '论文数目', , '40'], ['PatentCount', '专利数目', , '40'], ['AwardCount', '奖励数目', , '40']];
