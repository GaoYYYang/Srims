
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.ContractGridPanel_ColumnModel = function(isHorizontal){
    Srims.documents.ContractGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '合同编号',
        dataIndex: 'contractNumber',
        width: 100,
        hidden: !isHorizontal
    }, {
        id: 'type',
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
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
    }])
};

Ext.extend(Srims.documents.ContractGridPanel_ColumnModel, Ext.grid.ColumnModel)
