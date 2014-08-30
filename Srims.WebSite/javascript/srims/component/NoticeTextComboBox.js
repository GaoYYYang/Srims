
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.NoticeTextComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params){
        params.store = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + "/SearchNoticeText", params.noticeTextType);
        params.displayField = 'value';
        params.valueFiled = 'value';
        params.mode = 'remote';
        params.lazyInit = false;
        params.editable = false;
        params.triggerAction = 'all';
        params.forceSelection = true;
        Srims.component.NoticeTextComboBox.superclass.constructor.call(this, params);
    },
    getStore: function(){
        return this.store;
    }
})
