
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel = function() {
Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    },     {
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
    }
])
    }
    Ext.extend(Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel, Ext.grid.ColumnModel);
