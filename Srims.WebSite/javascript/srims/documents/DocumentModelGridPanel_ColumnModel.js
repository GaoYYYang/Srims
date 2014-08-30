
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentModelGridPanel_ColumnModel = function(){
    Srims.documents.DocumentModelGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '文档类型',
        dataIndex: 'name'
    }])
};

Ext.extend(Srims.documents.DocumentModelGridPanel_ColumnModel, Ext.grid.ColumnModel)
