
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendGridPanel_ColumnModel = function(isNotNeedProjectName, isShowFinanceInfo){
    Srims.fund.FinanceFundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '经费凭单号',
        dataIndex: 'financeVoucherNumber',
        sortable: false,
        hidden: !isShowFinanceInfo
    }, {
        header: '经费说明',
        dataIndex: 'financeAbstract',
        sortable: false,
        hidden: !isShowFinanceInfo,
        width: 200
    }, {
        header: '还款项目',
        dataIndex: 'projectName',
        sortable: false,
        hidden: isNotNeedProjectName,
        width: 300
    }, {
        header: '还款金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '还款时间',
        dataIndex: 'operateDateTime',
        sortable: true,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '还款人',
        dataIndex: 'operator'
    }])
}
Ext.extend(Srims.fund.FinanceFundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)
