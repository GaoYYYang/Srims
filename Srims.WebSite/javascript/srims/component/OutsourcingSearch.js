
if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.OutsourcingSearch = function() {
}
Srims.component.OutsourcingSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'taxNumber',
    type: 'string',
    mapping: 'TaxNumber'
}, {
    name: 'legalRepresentativeName',
    type: 'string',
    mapping: 'LegalRepresentativeName'
}]);
    Srims.component.OutsourcingSearch.Store = Ext.extend(Ext.data.Store, {
        url: Srims.service.common.OutsourcingService + '/SearchOutsourcing',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            idProperty: 'ID'
        }, Srims.component.OutsourcingSearch.Record)
    });
    Srims.component.OutsourcingSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
        store: new Srims.component.OutsourcingSearch.Store(),
        displayField: 'name',
        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}({legalRepresentativeName}): {legalRepresentativeName} {post}', '</div></tpl>'),
        onRender: function(B, A) {
            var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
            new Ext.ToolTip({
                target: this.getId(),
                html: '您可以通过输入外协<span style="color: Red;">名称</span>或者法定代表人姓名<span style="color: Red;"></span>查找并选择外协'
            });

            return result;
        }
    })