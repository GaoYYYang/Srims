
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorGridPanel_ColumnModel = function(){
    Srims.documents.ContractCensorGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author'
    }])
};

Ext.extend(Srims.documents.ContractCensorGridPanel_ColumnModel, Ext.grid.ColumnModel)

