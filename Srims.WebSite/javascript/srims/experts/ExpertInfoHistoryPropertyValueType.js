
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Ext.namespace('Srims.experts.ExpertInfoHistoryPropertyValueType');

Srims.experts.ExpertInfoHistoryPropertyValueType.String = 'Text';
Srims.experts.ExpertInfoHistoryPropertyValueType.Int = 'Int';
Srims.experts.ExpertInfoHistoryPropertyValueType.DateTime = 'DateTime';
Srims.experts.ExpertInfoHistoryPropertyValueType.Guid = 'Guid';
Srims.experts.ExpertInfoHistoryPropertyValueType.LongText = 'LongText';
Srims.experts.ExpertInfoHistoryPropertyValueType.Entity = 'Entity';
Srims.experts.ExpertInfoHistoryPropertyValueType.Boolean = 'Boolean';

Srims.experts.ExpertInfoHistoryPropertyValueTypeRender = function(value, metadata){
    switch (value) {
        case 'Text':
            return '字符串';
        case 'Int':
            return '整数';
        case 'DateTime':
            return '时间';
        case 'Guid':
            return 'Guid';
        case 'LongText':
            return '长文本';
        case 'Entity':
            return '外键';
        case 'Boolean':
            return '布尔';
        default:
            return '未知';
    }
}

Srims.experts.ExpertInfoHistoryPropertyValueTypeStore = [['Text', '字符串'], ['Int', '整数'], ['DateTime', '时间'], ['Guid', 'Guid'], ['LongText', '长文本'], ['Entity', '外键'], ['Boolean', '布尔']];

Srims.experts.ExpertInfoHistoryPropertyValueNameRender = function(value, metadata){
    switch (value) {
        case 'IsDoctorDirector':
            return '是否博导';
        case 'MobilePhone':
            return '移动电话';
        case 'OfficePhone':
            return '办公电话';
        case 'HomePhone':
            return '家庭电话';
        case 'Fax':
            return '传真';
        case 'Address':
            return '通讯地址';
        case 'Zip':
            return '邮政编码';
        case 'Email':
            return '电子邮件';
        case 'College':
            return '所在学院';
        case 'Department':
            return '所在部门';
        case 'Specialty':
            return '专长';
        case 'Photo':
            return '照片资源';
        case 'ResearchCode1':
            return '从事专业代码1';
        case 'ResearchCode2':
            return '从事专业代码2';
        case 'ResearchCode3':
            return '从事专业代码3';
        case 'Language1':
            return '外语语种1';
        case 'LanguageLevel1':
            return '熟练程度1';
        case 'Language2':
            return '外语语种2';
        case 'LanguageLevel2':
            return '熟练程度2';
        case 'SocietyPost':
            return '社会兼职';
        case 'WorkExperience':
            return '工作简历';
        case 'ResearchExperience':
            return '科研简历';
        default:
            return '未知';
    }
}
Srims.experts.editEntityTypeIsSubject = function(value){
    switch (value) {
        case 'ResearchCode1':
            return true;
        case 'ResearchCode2':
            return true;
        case 'ResearchCode3':
            return true;
        default:
            return false;
    }
}

