
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOutColumnModel = function(){
    Srims.fund.VoucherOutColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "外协单位",
        dataIndex: 'corporation',
        width: 80,
        hidden: false
    }, {
        header: "金额(万元)",
        dataIndex: 'amount',
        width: 40,
        renderer: Money.render,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherOutColumnModel, Ext.grid.ColumnModel);
