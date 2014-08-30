
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel_ColumnModel = function() {
Srims.papers.LiberalArtsPaperGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, 
    //必须显示的 
    {
        header: "发表年",
        dataIndex: 'publishDateYear',
        width: 60,
        sortable: true,
        hidden: false
    },
     {
        header: "成果名",
        dataIndex: 'resultsName',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "成果类别",
        dataIndex: 'resultsType',
        width: 60,
        sortable: true,
        renderer: Srims.papers.ResultsTypeRender,
        hidden: false
    },
     {
        header: "来源作者",
        dataIndex: 'authors',
        width: 60,
        sortable: true,
        hidden: false
    }, 
    {
        header: "成果形式",
        dataIndex: 'resultsForm',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "期刊名或出版社",
        dataIndex: 'publisher',
        width: 60,
        sortable: true,
        hidden: false
    }, 
    {
        header: "第一作者",
        dataIndex: 'firstAuthorName',
        width: 60,
        sortable: true,
        hidden: false
    },
     {
        header: "我校署名位次",
        dataIndex: 'ourSchoolSignRank',
        width: 60,
        sortable: true,
        hidden: false
    }, 
    
    //选择显示的

    {
        header: "序列号",
        dataIndex: 'serialNumbe',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "总被引次数",
        dataIndex: 'citeTime',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "英文篇名",
        dataIndex: 'englishName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "文章等级",
        dataIndex: 'degree',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "第一机构",
        dataIndex: 'firstOrganization',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "机构名称",
        dataIndex: 'organizationName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "地区",
        dataIndex: 'region',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "所属院系",
        dataIndex: 'collegeName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "学科分类",
        dataIndex: 'subjectClass',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "学位分类",
        dataIndex: 'degreeType',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "关键词",
        dataIndex: 'keyWord',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "标志",
        dataIndex: 'mark',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "参考文献",
        dataIndex: 'references',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "基金",
        dataIndex: 'fund',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "基金类别",
        dataIndex: 'fundType',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "期刊代码",
        dataIndex: 'coden',
        width: 60,
        sortable: false,
        hidden: true
    }, {
        header: "ISSN",
        dataIndex: 'issn',
        width: 60,
        sortable: true,
        hidden: true,
       
    }, {
        header: "年代卷期",
        dataIndex: 'issuesDate',
        width: 60,
        sortable: true,
        hidden: true,
        
    }
    ]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.LiberalArtsPaperGridPanel_ColumnModel, Ext.grid.ColumnModel);
