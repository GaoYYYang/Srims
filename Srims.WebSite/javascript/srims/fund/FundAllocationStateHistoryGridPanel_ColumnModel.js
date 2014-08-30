
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel = function(){
    Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.fund.fundAllocationStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
    }])
}
Ext.extend(Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel, Ext.grid.ColumnModel);

