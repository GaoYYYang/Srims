
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel = function(){
    Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "下拨项目名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        width: 170,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "到校经费(万元)",
        dataIndex: 'fundTotal',
        width: 75,
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "可下拨经费（万元）",
        dataIndex: 'fundCanDescend',
        width: 80,
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        id: 'fundDescend',
        header: '下拨金额(万元)',
        dataIndex: 'fundDescend',
        sortable: false,
        editor: new Srims.component.MoneyField({
            allowNegative: false
        })
    }])
}
Ext.extend(Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel, Ext.grid.ColumnModel)
