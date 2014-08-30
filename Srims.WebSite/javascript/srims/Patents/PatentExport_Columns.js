
if (!Srims.patents)
    Ext.namespace('Srims.patents');

Srims.patents.PatentExport_Column = function() {
}

Srims.patents.PatentExport_Column.basic = [['Name', '专利名称', , '200'], ['Number', '专利号', , '100'],
    ['LawState', '法律状态', 'enum', '80'], ['Type', '专利类型', 'enum', '100'],
    ['LawStateTime', '法律状态时间', 'Date', '100'],
    ['Level', '级别', 'enum', '50'], ['MainCategoryNumber', '主分类号', , '50'],
    ['AllCategoryNumber', '全部分类号', , '180'],
    ['ApplicationDateTime', '申请时间', 'Date', '120'],
    ['AuthorizeDateTime', '授权时间', 'Date', '120'],
    ['Category', '专利分类', , '80'], ['Country', '国别', , '30'], ['Introduction', '简介', , '800'],
     ['CollegeName', '所属学院', , '100'],
    ['Remark', '备注', , '190']];

Srims.patents.PatentExport_Column.inventer = [['PatentInventersName', '所有发明人', , '150'], ['PatentPrincipalName', '负责人', , '50']];

Srims.patents.PatentExport_Column.agency = [['AgencyName', '专利代理机构名称', , '80'], ['Agent', '代理人', , '100'],
     ['Contract', '联系方式', , '150']];
