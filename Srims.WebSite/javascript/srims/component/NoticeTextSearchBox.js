
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.NoticeTextSearch = function(){
}
Srims.component.NoticeTextSearch.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params){
        params.store = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + "/SearchNoticeText", params.noticeTextType);
        params.displayField = 'value';
        params.typeAhead = false;
        params.triggerClass = 'searchComboBoxTrigger';
        params.minChars = 2;
        params.editable = true;
        params.listWidth = 160;
        params.tpl = new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{value}', '</div></tpl>');
        params.itemSelector = 'div.search-item';
        params.onSelect = function(record){
            this.selectNoticeText = record.get('value') + ',';
            this.setValue(String.isEmpty(this.getValue()) ? this.selectNoticeText : this.getValue().substring(0, this.getValue().lastIndexOf(',') + 1) + this.selectNoticeText);
            this.collapse();
        };
        Srims.component.NoticeTextSearch.SearchComboBox.superclass.constructor.call(this, params);
    }
})
