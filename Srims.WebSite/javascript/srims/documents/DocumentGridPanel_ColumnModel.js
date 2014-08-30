
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentGridPanel_ColumnModel = function(){
    Srims.documents.DocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '文档名称',
        dataIndex: 'name',
        width: 100
    }, {
        header: '状态',
        dataIndex: 'state',
        width: 70,
        renderer: Srims.CensorState.Render
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        width: 110,
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author',
        width: 80
    }, {
        header: '审核人',
        dataIndex: 'censor',
        width: 80
    }, {
        id: 'censorDateTime',
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }, {
        header: '催缴截止时间',
        dataIndex: 'deadline',
        width: 110,
        renderer: Date.render
    }, {
        header: '是否必须',
        dataIndex: 'isRequire',
        width: 70,
        renderer: Boolean.render
    }])
};

Ext.extend(Srims.documents.DocumentGridPanel_ColumnModel, Ext.grid.ColumnModel)
