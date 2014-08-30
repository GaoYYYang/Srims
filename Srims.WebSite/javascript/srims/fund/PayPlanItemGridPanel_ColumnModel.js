
if (!Srims.fund) 
    Ext.namespace('Srims.fund');
Srims.fund.PayPlanItemGridPanel_ColumnModel = function(){
    Srims.fund.PayPlanItemGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '到帐时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'amount',
        header: '到帐金额(万元)',
        dataIndex: 'amount',
        renderer: Money.render
    }]);
}
Ext.extend(Srims.fund.PayPlanItemGridPanel_ColumnModel, Ext.grid.ColumnModel);
