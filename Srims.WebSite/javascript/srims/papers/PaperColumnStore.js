
if (!Srims.papers)
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.ColumnStore');

Srims.papers.ColumnStore.Name = 'name';
Srims.papers.ColumnStore.FullName = 'fullName';
Srims.papers.ColumnStore.PublishYear = 'publishYear';
Srims.papers.ColumnStore.InfluenceFactorOfPaper = 'influenceFactorOfPaper';
Srims.papers.ColumnStore.Indexed = 'indexed';
Srims.papers.ColumnStore.CollegeName = 'collegeName';
Srims.papers.ColumnStore.LinkManName = 'linkManName';
Srims.papers.ColumnStore.FirstAuthorName = 'firstAuthorName';
Srims.papers.ColumnStore.Type = 'type';
Srims.papers.ColumnStore.CiteFrequencyOfPaper = 'citeFrequencyOfPaper';
Srims.papers.ColumnStore.PublishDate = 'publishDate';
Srims.papers.ColumnStore.DocumentNumber = 'documentNumber';
Srims.papers.ColumnStore.Volume = 'volume';
Srims.papers.ColumnStore.StartPage = 'startPage';
Srims.papers.ColumnStore.EndPage = 'endPage';
Srims.papers.ColumnStore.Pages = 'pages';
Srims.papers.ColumnStore.SubAirer = 'subAirer';
Srims.papers.ColumnStore.AuthorKeyWord = 'authorKeyWord';
Srims.papers.ColumnStore.KeyWord = 'keyWord';
Srims.papers.ColumnStore.LinkManAddress = 'linkManAddress';
Srims.papers.ColumnStore.LinkManEmail = 'linkManEmail';
Srims.papers.ColumnStore.LinkManSignUnit = 'linkManSignUnit';
Srims.papers.ColumnStore.FirstAuthorSignUnit = 'firstAuthorSignUnit';
Srims.papers.ColumnStore.SignOrder = 'signOrder';
Srims.papers.ColumnStore.Lab = 'lab';
Srims.papers.ColumnStore.IsiUniqueArticleIdentifier = 'isiUniqueArticleIdentifier';


Srims.papers.ColumnStoreRender = function(value, metadata) {
    switch (value) {
        case 'name':
            return '名称';
        case 'fullName':
            return '杂志名称';
        case 'publishYear':
            return '出版年份';
        case 'influenceFactorOfPaper':
            return '影响因子';
        case 'indexed':
            return '收录';
        case 'collegeName':
            return '所属学院';
        case 'linkManName':
            return '通讯作者';
        case 'firstAuthorName':
            return '第一作者';
        case 'type':
            return '类型';
        case 'citeFrequencyOfPaper':
            return '引用频次';
        case 'publishDate':
            return '出版日期';
        case 'documentNumber':
            return '文档号';
        case 'volume':
            return '卷号';
        case 'startPage':
            return '起始页码';
        case 'endPage':
            return '终止页码';
        case 'pages':
            return '页数';
        case 'subAirer':
            return '分区';
        case 'authorKeyWord':
            return '作者关键词';
        case 'linkManAddress':
            return '通讯作者地址';
        case 'linkManEmail':
            return '通讯作者Email';
        case 'linkManSignUnit':
            return '通讯作者署名单位';
        case 'firstAuthorSignUnit':
            return '第一作者署名单位';
        case 'signOrder':
            return '我校位次';
        case 'lab':
            return '实验室';
        case 'isiUniqueArticleIdentifier':
            return 'ISIIdentifier';
        default:
            return '未知';
    }
}

Srims.papers.PaperColumnStore = [['name', '名称'], ['fullName', '杂志名称'],
 ['publishYear', '出版年份'], ['influenceFactorOfPaper', '影响因子'], ['indexed', '收录'],
 ['collegeName', '所属学院'], ['linkManName', '通讯作者'], ['firstAuthorName', '第一作者'], ['type', '类型'],
 ['citeFrequencyOfPaper', '引用频次'], ['publishDate', '出版日期'], ['documentNumber', '文档号'],
 ['volume', '卷号'], ['startPage', '起始页码'], ['endPage', '终止页码'], ['pages', '页数'], ['subAirer', '分区'],
  ['authorKeyWord', '作者关键词'], ['linkManAddress', '通讯作者地址'], ['linkManEmail', '通讯作者Email'],
   ['linkManSignUnit', '通讯作者署名单位'], ['firstAuthorSignUnit', '第一作者署名单位'], ['signOrder', '我校位次'],
   ['lab', '实验室'], ['isiUniqueArticleIdentifier', 'ISIIdentifier']];
