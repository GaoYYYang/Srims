
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.FinanceSearch = function(){
}
Srims.component.FinanceSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'receivedDate',
    type: 'date',
    mapping: 'ReceivedDate'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'descendAmount',
    type: 'int',
    mapping: 'DescendAmount'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}]);
Srims.component.FinanceSearch.Store = Ext.extend(Ext.data.Store, {
    url: Srims.service.fund.FinanceService + '/Search',
    reader: new Ext.data.XmlReader({
        record: 'Record',
        idProperty: 'ID'
    }, Srims.component.FinanceSearch.Record)
});

Srims.component.FinanceSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
    store: new Srims.component.FinanceSearch.Store(),
    displayField: 'abstract',
    minChars: 1,
    listWidth: 500,
    tpl: new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>凭单号</td><td>到帐时间</td><td>到帐金额</td><td>已下拨金额</td><td>说明</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:60px">{voucherNumber}</td><td style="width:100px">{[Date.render(values.receivedDate)]}</td><td style="width:70px">{[Money.render(values.amount)]}</td><td style="width:70px">{[Money.render(values.descendAmount)]}</td><td style="width:200px">{abstract}</td>', '</tr></tpl>', '</table>'),
    itemSelector: 'tr.search-item',
    onRender: function(B, A){
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入经费到帐信息的<span style="color: Red;">凭单号，到帐金额</span>查找并选择经费到帐信息'
        });
        return result;
    }
});
