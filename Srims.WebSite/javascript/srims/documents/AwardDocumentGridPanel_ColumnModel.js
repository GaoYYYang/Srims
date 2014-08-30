
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.AwardDocumentGridPanel_ColumnModel = function(isCensor){
    Srims.documents.AwardDocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '奖励名称',
        dataIndex: 'awardName',
        hidden: !isCensor,
        width: 260
    }, {
        header: '第一获奖人',
        dataIndex: 'awardFirstWinnerName',
        hidden: !isCensor
    }, {
        header: '文档名称',
        dataIndex: 'name'
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'authorName'
    }, {
        header: '状态',
        dataIndex: 'state',
        renderer: Srims.CensorState.Render
    }, {
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }, {
        header: '审核人',
        dataIndex: 'censor'
    }])
};

Ext.extend(Srims.documents.AwardDocumentGridPanel_ColumnModel, Ext.grid.ColumnModel)

