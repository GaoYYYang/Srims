
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Basic = function(expert){
    this._expert = expert;
    
    this._radioSex = new Ext.form.TextField({
        fieldLabel: '性别',
        value: Srims.experts.SexType.render(expert.get('sex')),
        readOnly: true,
        width: 160
    });
    this._radioIsDoctorDirector = new Ext.form.TextField({
        fieldLabel: '是否博导',
        value: Boolean.nullAbleRender(expert.get('isDoctorDirector')),
        readOnly: true,
        width: 160
    });
    this._radioIsAcademician = new Ext.form.TextField({
        fieldLabel: '是否院士',
        value: Boolean.nullAbleRender(expert.get('isAcademician')),
        readOnly: true,
        width: 160
    });
    this._radioIsChinese = new Ext.form.TextField({
        fieldLabel: '是否中国籍',
        value: Boolean.nullAbleRender(expert.get('isChinese')),
        readOnly: true,
        width: 160
    });
    this._radioIsOnjob = new Ext.form.TextField({
        fieldLabel: '是否在职',
        value: Boolean.nullAbleRender(expert.get('isOnjob')),
        readOnly: true,
        width: 160
    });
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '姓名',
        value: expert.get('name'),
        readOnly: true,
        expert: this._expert,
        width: 160
    });
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '工作证号',
        value: expert.get('number'),
        readOnly: true,
        width: 160
    });
    this._textFieldIdCardNumber = new Ext.form.TextField({
        fieldLabel: '身份证号',
        value: expert.get('idCardNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldOccupation = new Ext.form.TextField({
        fieldLabel: '职务',
        value: expert.get('occupation'),
        readOnly: true,
        width: 160
    });
    this._textFieldPhoto = new Ext.form.Label({
        fieldLabel: '照片',
        readOnly: true,
        html: expert.get('photo') == '' ? '<div style="height:100px;width:200px; display: table-cell; text-align:center; vertical-align:middle;"> <span id="SpanExpertImg_' + expert.get('id') + '">该专家暂时没有照片</span><img id="ImgExpert_' + expert.get('id') + '" height="100px" /></div>' : '<div width="160px" style="text-align:center;"><img id="ImgExpert_' + expert.get('id') + '" height="100px" src="../' + expert.get('photo') + '" /></div></div>',
        width: 160
    });
    this._textFieldVocationLevel = new Ext.form.TextField({
        fieldLabel: '职业等级',
        value: expert.get('vocationLevel'),
        readOnly: true,
        width: 160
    });
    this._fieldCollege = new Ext.form.Field({
        fieldLabel: '所属学院',
        value: expert.get('college'),
        readOnly: true,
        width: 160
    });
        this._fieldCollege2 = new Ext.form.Field({
        fieldLabel: '双聘单位',
        value: expert.get('college2'),
        readOnly: true,
        width: 160
    });
    this._textFieldDepartment = new Ext.form.TextField({
        fieldLabel: '所在部门',
        value: expert.get('department'),
        readOnly: true,
        width: 160
    });
    this._textFieldFileNumber = new Ext.form.TextField({
        fieldLabel: '档案号',
        value: expert.get('fileNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldOfficePhone = new Ext.form.TextField({
        fieldLabel: '办公电话',
        value: expert.get('officePhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldHomePhone = new Ext.form.TextField({
        fieldLabel: '家庭电话',
        value: expert.get('homePhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldFax = new Ext.form.TextField({
        fieldLabel: '传真',
        value: expert.get('fax'),
        readOnly: true,
        width: 160
    });
    this._textFieldMobilePhone = new Ext.form.TextField({
        fieldLabel: '手机',
        value: expert.get('mobilePhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldEmail = new Ext.form.TextField({
        fieldLabel: '电子邮件',
        value: expert.get('email'),
        readOnly: true,
        width: 160
    });
    this._textFieldAddress = new Ext.form.TextField({
        fieldLabel: '通信地址',
        value: expert.get('address'),
        readOnly: true,
        width: 760
    });
    this._textFieldZip = new Ext.form.TextField({
        fieldLabel: '邮编',
        value: expert.get('zip'),
        readOnly: true,
        width: 160
    });
    this._textFieldSocietyPost = new Ext.form.TextField({
        fieldLabel: '社会兼职',
        value: expert.get('societyPost'),
        readOnly: true,
        width: 760
    });
    this._textFieldSpecialty = new Ext.form.TextField({
        fieldLabel: '专长',
        value: expert.get('specialty'),
        width: 760,
        readOnly: true
    });
    this._dateFieldBirthday = new Ext.form.Field({
        fieldLabel: '出生日期',
        value: Date.render(expert.get('birthday')),
        readOnly: true,
        width: 160
    });
    this._dateFieldComeDate = new Ext.form.Field({
        fieldLabel: '来校时间',
        value: Date.render(expert.get('comeDate')),
        readOnly: true,
        width: 160
    });
    this._textAreaWorkExperience = new Ext.form.TextArea({
        fieldLabel: '工作简历',
        value: expert.get('workExperience'),
        width: 760,
        readOnly: true
    });
    this._textAreaResearchExperience = new Ext.form.TextArea({
        fieldLabel: '科研简历',
        value: expert.get('researchExperience'),
        width: 760,
        readOnly: true
    });
    this._fieldNation = new Ext.form.Field({
        fieldLabel: '民族',
        value: expert.get('nation'),
        readOnly: true,
        width: 160
    });
    this._fieldPolicy = new Ext.form.Field({
        fieldLabel: '政治面貌',
        value: expert.get('policy'),
        readOnly: true,
        width: 160
    });
    this._fieldAcaedemyDegree = new Ext.form.Field({
        fieldLabel: '学历',
        value: expert.get('academyDegree'),
        readOnly: true,
        width: 160
    });
    this._fieldExpertPost = new Ext.form.Field({
        fieldLabel: '职称',
        value: expert.get('post'),
        readOnly: true,
        width: 160
    });
    this._textFieldPostLevel = new Ext.form.TextField({
        fieldLabel: '职称等级',
        value: expert.get('postLevel'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguage1 = new Ext.form.Field({
        fieldLabel: '外语语种1',
        value: expert.get('language1'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguage2 = new Ext.form.Field({
        fieldLabel: '外语语种2',
        value: expert.get('language2'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguageLevel1 = new Ext.form.Field({
        fieldLabel: '熟练程度',
        value: expert.get('languageLevel1'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguageLevel2 = new Ext.form.Field({
        fieldLabel: '熟练程度',
        value: expert.get('languageLevel2'),
        readOnly: true,
        width: 160
    });
    this._fieldFirstLevelSubject1 = new Ext.form.Field({
        fieldLabel: '从事专业一级学科',
        readOnly: true,
        value: expert.get('researchSubjectFirstLevel1Name'),
        width: 160
    });
    this._fieldSecondLevelSubject1 = new Ext.form.Field({
        fieldLabel: '从事专业二级学科',
        readOnly: true,
        value: expert.get('researchSubjectSecondLevel1Name'),
        width: 160
    });
    this._fieldFirstLevelSubject2 = new Ext.form.Field({
        fieldLabel: '从事专业一级学科',
        readOnly: true,
        value: expert.get('researchSubjectFirstLevel2Name'),
        width: 160
    });
    this._fieldSecondLevelSubject2 = new Ext.form.Field({
        fieldLabel: '从事专业二级学科',
        readOnly: true,
        value: expert.get('researchSubjectSecondLevel2Name'),
        width: 160
    });
    this._fieldFirstLevelSubject3 = new Ext.form.Field({
        fieldLabel: '从事专业一级学科',
        readOnly: true,
        value: expert.get('researchSubjectFirstLevel3Name'),
        width: 160
    });
    this._fieldSecondLevelSubject3 = new Ext.form.Field({
        fieldLabel: '从事专业二级学科',
        readOnly: true,
        value: expert.get('researchSubjectSecondLevel3Name'),
        width: 160
    });
    this._fieldFirstLevelSubject = new Ext.form.Field({
        fieldLabel: '所学专业一级学科',
        readOnly: true,
        value: expert.get('majorSubejctFirstLevelName'),
        width: 160
    });
    this._fieldSecondLevelSubject = new Ext.form.Field({
        fieldLabel: '所学专业二级学科',
        readOnly: true,
        value: expert.get('majorSubjectSecondLevelName'),
        width: 160
    });
    this._textFieldNameSpell = new Ext.form.TextField({
        fieldLabel: '姓名拼音缩写',
        readOnly: true,
        value: expert.get('nameSpell'),
        width: 160
    });
    
    var item1 = [this._fieldExpertPost, this._textFieldOccupation, this._textFieldDepartment, this._fieldLanguage1, this._fieldLanguage2, this._fieldFirstLevelSubject1, this._fieldFirstLevelSubject2, this._fieldFirstLevelSubject3, this._fieldFirstLevelSubject, this._radioIsDoctorDirector];
    var item2 = [this._textFieldPostLevel,  this._fieldCollege,this._fieldCollege2, this._fieldLanguageLevel1, this._fieldLanguageLevel2, this._fieldSecondLevelSubject1, this._fieldSecondLevelSubject2, this._fieldSecondLevelSubject3, this._fieldSecondLevelSubject, this._radioIsChinese,this._textFieldVocationLevel];
    var item3 = [this._textFieldFileNumber, this._radioSex, this._textFieldMobilePhone, this._textFieldOfficePhone, this._textFieldHomePhone, this._textFieldFax, this._textFieldZip, this._textFieldEmail, this._dateFieldComeDate, this._radioIsOnjob];
    
    Srims.experts.ExpertShowPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 300,
                items: [this._textFieldName, this._textFieldNameSpell, this._fieldNation, this._fieldAcaedemyDegree]
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: [this._textFieldNumber, this._textFieldIdCardNumber, this._fieldPolicy, this._dateFieldBirthday]
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: [this._textFieldPhoto]
            })]
        }), new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 300,
                items: item1
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: item2
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: item3
            })]
        }), new Ext.Panel({
            layout: 'form',
            width: 900,
            items: [this._radioIsAcademician, this._textFieldSpecialty, this._textFieldSocietyPost, this._textFieldAddress, this._textAreaResearchExperience, this._textAreaWorkExperience]
        })]
    }))
    
    this.resetComponentValue = function(expert){
        this._textFieldName.setValue(expert.get('name'));
        this._textFieldNumber.setValue(expert.get('number'));
        this._textFieldIdCardNumber.setValue(expert.get('idCardNumber'));
        this._textFieldOccupation.setValue(expert.get('occupation'));
        this._fieldCollege.setValue(expert.get('college'));
        this._textFieldVocationLevel.setValue(expert.get('vocationLevel'));
        this._textFieldDepartment.setValue(expert.get('department'));
        this._textFieldFileNumber.setValue(expert.get('fileNumber'));
        this._textFieldOfficePhone.setValue(expert.get('officePhone'));
        this._textFieldHomePhone.setValue(expert.get('homePhone'));
        this._textFieldFax.setValue(expert.get('fax'));
        this._textFieldMobilePhone.setValue(expert.get('mobilePhone'));
        this._textFieldAddress.setValue(expert.get('address'));
        this._textFieldZip.setValue(expert.get('zip'));
        this._textFieldSocietyPost.setValue(expert.get('societyPost'));
        this._textFieldSpecialty.setValue(expert.get('specialty'));
        this._dateFieldBirthday.setValue(Date.render(expert.get('birthday')));
        this._dateFieldComeDate.setValue(Date.render(expert.get('comeDate')));
        this._textAreaWorkExperience.setValue(expert.get('workExperience'));
        this._textAreaResearchExperience.setValue(expert.get('researchExperience'));
        this._fieldNation.setValue(expert.get('nation'));
        this._fieldPolicy.setValue(expert.get('policy'));
        this._fieldAcaedemyDegree.setValue(expert.get('academyDegree'));
        this._fieldExpertPost.setValue(expert.get('post'));
        this._textFieldPostLevel.setValue(expert.get('postLevel'));
        this._fieldLanguage1.setValue(expert.get('language1'));
        this._fieldLanguage2.setValue(expert.get('language2'));
        this._fieldLanguageLevel1.setValue(expert.get('languageLevel1'));
        this._fieldLanguageLevel2.setValue(expert.get('languageLevel2'));
        this._textFieldEmail.setValue(expert.get('email'));
        
        this._fieldFirstLevelSubject1.setValue(expert.get('researchSubjectFirstLevel1Name'));
        this._fieldSecondLevelSubject1.setValue(expert.get('researchSubjectSecondLevel1Name'));
        this._fieldFirstLevelSubject2.setValue(expert.get('researchSubjectFirstLevel2Name'));
        this._fieldSecondLevelSubject2.setValue(expert.get('researchSubjectSecondLevel2Name'));
        this._fieldFirstLevelSubject3.setValue(expert.get('researchSubjectFirstLevel3Name'));
        this._fieldSecondLevelSubject3.setValue(expert.get('researchSubjectSecondLevel3Name'));
        this._fieldFirstLevelSubject.setValue(expert.get('majorSubejctFirstLevelName'));
        this._fieldSecondLevelSubject.setValue(expert.get('majorSubjectSecondLevelName'));
    }
    
    //管理员不能编辑的字段
    this.administratorCanNotEditItems = [this._textFieldName, this._textFieldNumber, this._textFieldFileNumber, this._radioIsAcademician];
    //联系方式管理员不能编辑的字段
    this.linkWayAdministratorCanNotEditItems = [this._textFieldNameSpell, this._radioSex, this._fieldNation, this._fieldAcaedemyDegree, this._fieldExpertPost, this._textFieldOccupation, this._textFieldIdCardNumber, this._fieldPolicy, this._textFieldPostLevel, this._textFieldVocationLevel, this._dateFieldBirthday, this._dateFieldComeDate, this._fieldCollege,this._fieldCollege2, this._textFieldDepartment, this._textFieldPhoto, this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, this._radioIsDoctorDirector, this._radioIsChinese, this._radioIsOnjob, this._textFieldSocietyPost, this._textFieldSpecialty, this._textAreaWorkExperience, this._textAreaResearchExperience, this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, this._fieldLanguage1, this._fieldLanguageLevel1, this._fieldLanguage2, this._fieldLanguageLevel2, this._textFieldName, this._textFieldNumber, this._textFieldFileNumber, this._radioIsAcademician];
    //专家不能编辑的
    this.expertSelfCanNotEditItems = [this._textFieldName, this._textFieldNumber, this._dateFieldComeDate, this._fieldExpertPost, this._radioIsChinese, this._radioIsOnjob, this._textFieldOccupation, this._textFieldPostLevel, this._textFieldVocationLevel, this._fieldAcaedemyDegree, this._textFieldFileNumber, this._radioIsAcademician];
    
    //管理员可以编辑的项目
    this.administratorEditItems = [[this._textFieldNameSpell, 'TextField', 'TextField', 'NameSpell'], [this._radioSex, 'RadioGroup', 'ComboBox', 'Sex'], [this._fieldNation, 'Field', 'NoticeTextComboBox', 'Nation', 'Nation'], [this._fieldAcaedemyDegree, 'Field', 'NoticeTextComboBox', 'AcademyDegree', 'AcaedemyDegree'], [this._fieldExpertPost, 'Field', 'NoticeTextComboBox', 'PostNew', 'ExpertPost'], [this._textFieldOccupation, 'TextField', 'TextField', 'Occupation'], [this._textFieldIdCardNumber, 'TextField', 'TextField', 'IDCardNumber'], [this._fieldPolicy, 'Field', 'NoticeTextComboBox', 'Policy', 'Policy'], [this._textFieldPostLevel, 'TextField', 'NumberField', 'PostLevel'], [this._textFieldVocationLevel, 'TextField', 'NumberField', 'VocationLevel'], [this._dateFieldBirthday, 'Field', 'DateField', 'Birthday'], [this._dateFieldComeDate, 'TextField', 'DateField', 'ComeDate'], [this._fieldCollege, 'Field', 'EntityComboBox', 'College', 'CollegeID'],[this._fieldCollege2, 'Field', 'EntityComboBox', 'College2', 'College2ID'], [this._textFieldDepartment, 'TextField', 'EntityComboBox', 'Department', 'DepartmentID'], [this._textFieldPhoto, 'Label', 'Label', 'Photo'], [this._radioIsDoctorDirector, 'RadioGroup', 'ComboBox', 'IsDoctorDirector'], [this._radioIsChinese, 'RadioGroup', 'ComboBox', 'IsChinese'], [this._radioIsOnjob, 'RadioGroup', 'ComboBox', 'IsOnjob'], [this._textFieldOfficePhone, 'TextField', 'TextField', 'OfficePhone'], [this._textFieldHomePhone, 'TextField', 'TextField', 'HomePhone'], [this._textFieldMobilePhone, 'TextField', 'TextField', 'MobilePhone'], [this._textFieldFax, 'TextField', 'TextField', 'Fax'], [this._textFieldAddress, 'TextField', 'TextField', 'Address'], [this._textFieldZip, 'TextField', 'TextField', 'Zip'], [this._textFieldEmail, 'TextField', 'TextField', 'Email'], [this._textFieldSocietyPost, 'TextField', 'TextField', 'SocietyPost'], [this._textFieldSpecialty, 'TextField', 'TextField', 'Specialty'], [this._textAreaWorkExperience, 'TextArea', 'TextArea', 'WorkExperience'], [this._textAreaResearchExperience, 'TextArea', 'TextArea', 'ResearchExperience'], [this._fieldFirstLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._fieldSecondLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._fieldFirstLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldSecondLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldFirstLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldSecondLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldFirstLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldSecondLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldLanguage1, 'Field', 'LanguageNoticeTextComboBox', 'language1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguageLevel1, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguage2, 'Field', 'LanguageNoticeTextComboBox', 'language2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']], [this._fieldLanguageLevel2, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']]];
    
    
    //联系方式管理员可编辑的字段
    this.linkWayEditItems = [[this._textFieldOfficePhone, 'TextField', 'TextField', 'OfficePhone'], [this._textFieldHomePhone, 'TextField', 'TextField', 'HomePhone'], [this._textFieldMobilePhone, 'TextField', 'TextField', 'MobilePhone'], [this._textFieldFax, 'TextField', 'TextField', 'Fax'], [this._textFieldAddress, 'TextField', 'TextField', 'Address'], [this._textFieldZip, 'TextField', 'TextField', 'Zip'], [this._textFieldEmail, 'TextField', 'TextField', 'Email']];
    //专家可编辑的字段
    this.expertSelfEditItems = [[this._textFieldNameSpell, 'TextField', 'TextField', 'NameSpell'], [this._radioSex, 'RadioGroup', 'ComboBox', 'Sex'], [this._fieldNation, 'Field', 'NoticeTextComboBox', 'Nation', 'Nation'], [this._textFieldIdCardNumber, 'TextField', 'TextField', 'IDCardNumber'], [this._fieldPolicy, 'Field', 'NoticeTextComboBox', 'Policy', 'Policy'], [this._dateFieldBirthday, 'Field', 'DateField', 'Birthday'], [this._fieldFirstLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._fieldSecondLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._radioIsDoctorDirector, 'RadioGroup', 'ComboBox', 'IsDoctorDirector'], [this._textFieldOfficePhone, 'TextField', 'TextField', 'OfficePhone'], [this._textFieldHomePhone, 'TextField', 'TextField', 'HomePhone'], [this._textFieldMobilePhone, 'TextField', 'TextField', 'MobilePhone'], [this._textFieldFax, 'TextField', 'TextField', 'Fax'], [this._textFieldAddress, 'TextField', 'TextField', 'Address'], [this._textFieldZip, 'TextField', 'TextField', 'Zip'], [this._textFieldEmail, 'TextField', 'TextField', 'Email'], [this._fieldCollege, 'Field', 'EntityComboBox', 'College', 'CollegeID'],[this._fieldCollege2, 'Field', 'EntityComboBox', 'College2', 'College2ID'], [this._textFieldDepartment, 'TextField', 'EntityComboBox', 'Department', 'DepartmentID'], [this._textFieldPhoto, 'Label', 'Label', 'Photo'], [this._textFieldSocietyPost, 'TextField', 'TextField', 'SocietyPost'], [this._textFieldSpecialty, 'TextField', 'TextField', 'Specialty'], [this._textAreaWorkExperience, 'TextArea', 'TextArea', 'WorkExperience'], [this._textAreaResearchExperience, 'TextArea', 'TextArea', 'ResearchExperience'], [this._fieldFirstLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldSecondLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldFirstLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldSecondLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldFirstLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldSecondLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldLanguage1, 'Field', 'LanguageNoticeTextComboBox', 'language1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguageLevel1, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguage2, 'Field', 'LanguageNoticeTextComboBox', 'language2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']], [this._fieldLanguageLevel2, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']]];
}
Ext.extend(Srims.experts.ExpertShowPanel_Basic, Ext.Panel, {});
