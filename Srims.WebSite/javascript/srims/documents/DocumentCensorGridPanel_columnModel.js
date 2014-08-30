
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentCensorGridPanel_ColumnModel = function(){
    Srims.documents.DocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '文档名称',
        dataIndex: 'name'
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author'
    }])
};

Ext.extend(Srims.documents.DocumentCensorGridPanel_ColumnModel, Ext.grid.ColumnModel)

