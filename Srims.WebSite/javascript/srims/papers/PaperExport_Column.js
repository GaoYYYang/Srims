
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.PaperExport_Column = function() {
}

Srims.papers.PaperExport_Column.basic = [['Name', '名称', , '200'], ['FullName', '杂志名称', , '150'], ['PublishYear', '出版年份', , '50'],
    ['InfluenceFactorOfPaper', '影响因子', 'influenceFactor', '50'], ['Indexed', '收录', , '50'], ['CollegeName', '所属学院', , '80'], ['Type', '类型', 'enum', '80'],
    ['CiteFrequencyOfPaper', '引用频次', , '50'], ['PublishDate', '发表日期', , '50'], ['DocumentNumber', '文档号', , '80'], ['Volume', '卷号', , '80'],
    ['StartPage', '起始页码', , '30'], ['EndPage', '终止页码', , '30'], ['Pages', '页数', , '30'], ['SubAirer', '分区', , '50'], ['SignOrder', '我校位次', , '10'], ['Lab', '实验室', , '80'],
    ['ISIUniqueArticleIdentifier', 'ISIIdentifier', , '80'], ['Abstract', '摘要', , '500']];

Srims.papers.PaperExport_Column.magazine = [['FullName', '发表杂志', , '150'], ['ShortName', '杂志简称', , '100'], ['ISSN', 'ISSN', , '80'],
    ['SubjectRank', '学科等级', , '50'], ['SubjectClass', '学科分类', , '80'], ['PublishType', '出版类型', 'enum', '80'],
    ['Language', '语种', 'enum', '50']];

Srims.papers.PaperExport_Column.author = [['LinkManName', '通讯作者', , '80'], ['LinkManSignUnit', '通讯作者署名单位', 'enum', '100'],
     ['LinkManAddress', '通讯作者地址', , '150'], ['LinkManEmail', '通讯作者Email', , '150'], ['FirstAuthorName', '第一作者', , '50'],
     ['FirstAuthorSignUnit', '第一作者署名单位', 'enum', '100'], ['AuthorKeyWord', '作者关键词', , '80'], ['Authors', '所有作者', , '250']];
