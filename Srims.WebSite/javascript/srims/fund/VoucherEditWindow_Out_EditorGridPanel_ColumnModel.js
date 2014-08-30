
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel = function(fundAllocation) {
Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel.superclass.constructor.call(this, [{
    header: "id",
    dataIndex: 'ID',
    hidden: true
}, {
        header: "外协公司",
        dataIndex: 'outsourcingName',
        sortable: false,
        hidden: false,
        width: 160
    }, {
        header: "分配定额(万元)",
        dataIndex: 'amount',
        sortable: false,
        hidden: false,
        renderer: Money.render,
        width: 160
    }, {
        header: "已分配(万元)",
        dataIndex: 'alreadyAllocated',
        sortable: false,
        hidden: false,
        renderer: Money.render,
        width: 160
    }, {
    header: '<span style="color:#FF0000">本次分配(万元)</span>',
        dataIndex: 'wantAllocated',
        sortable: false,
        isCellEditable: false,
        editor: new Srims.component.MoneyField({
            allowNegative: false
            
        })
    }, {
        header: "剩余配额(万元)",
        dataIndex: 'remainAllocated',
        sortable: false,
        hidden: false,
        renderer: Money.render,
        width: 160
}])
    }
    Ext.extend(Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel, Ext.grid.ColumnModel)
