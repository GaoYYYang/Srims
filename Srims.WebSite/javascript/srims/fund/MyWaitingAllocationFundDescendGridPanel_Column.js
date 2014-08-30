
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel = function(sm){
    Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '下拨项目',
        dataIndex: 'projectName',
        sortable: false,
        width: 300
    }, {
        header: '下拨金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '经费凭单号',
        dataIndex: 'financeVoucherNumber',
        sortable: false
    }, {
        header: '经费说明',
        dataIndex: 'financeAbstract',
        sortable: false,
        width: 200
    }, {
        header: '下拨时间',
        dataIndex: 'descendDateTime',
        sortable: true,
        renderer: Date.render
    }])
}
Ext.extend(Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)
