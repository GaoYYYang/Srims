
if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.AwardNameSearch = function() {
}
Srims.component.AwardNameSearch.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params) {
        params.store = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + "/SearchAwardName");
        params.displayField = 'value';
        params.typeAhead = false;
        params.triggerClass = 'searchComboBoxTrigger';
        params.minChars = 2;
        params.editable = true;
        params.listWidth = 160;
        params.tpl = new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{value}', '</div></tpl>');
        params.itemSelector = 'div.search-item';
        params.onSelect = function(record) {
            this.selectAwardName = record.get('value');
            Srims.component.AwardNameSearch.SearchComboBox.superclass.onSelect.call(this, record);
        };
        params.getSelectAwardName = function() {
            return Srims.component.AwardNameSearch.SearchComboBox.superclass.getValue.call(this);
        };
        params.getValue = function() {
            return this.getSelectAwardName();
        },
        Srims.component.AwardNameSearch.SearchComboBox.superclass.constructor.call(this, params);
    }
})