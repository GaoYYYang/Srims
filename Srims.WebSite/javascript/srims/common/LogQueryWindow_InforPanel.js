
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogQueryWindow_InforPanel = function(){

    this._textFieldUser = new Ext.form.TextField({
        fieldLabel: '用户',
        width: 150
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '写入日期',
        width: 150
    });
    this._dateFieldDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    var typeItems = Srims.common.LogQueryWindow_InforPanel.LogTypeStore.checkboxGroupItems;
    this._comboBoxAction2 = new Srims.component.CheckBoxGroup({
        fieldLabel: '操作类型',
        columns: typeItems.length > 9 ? 8 : typeItems.length,
        items: typeItems,
        cls: 'srims-checkboxGroup-expert'
    });
    this._comboBoxAction = new Ext.form.TextField({
        fieldLabel: '操作描述',
        width: 150
    });
    Srims.common.LogQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        //  autoWidth: true,
        width: 500,
        layout: 'form',
        // labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            labelWidth: 60,
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: [this._dateFieldDateTime, this._textFieldUser]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: [this._dateFieldDateTimeEnd, this._comboBoxAction]
            }) ]
        })]
    });
    
    this.buildParams = function(params){
        params.user = this._textFieldUser.getValue();
        params.dateTimeStart = Date.format(this._dateFieldDateTime.getValue());
        params.dateTimeEnd = Date.format(this._dateFieldDateTimeEnd.getValue());
        params.action = this._comboBoxAction.getValue();
    }
    
    this.clearParams = function(){
        this._textFieldUser.reset();
        this._dateFieldDateTime.reset();
        this._dateFieldDateTimeEnd.reset();
        this._comboBoxAction.reset();
    }
}
Ext.extend(Srims.common.LogQueryWindow_InforPanel, Ext.FormPanel);

Srims.common.LogQueryWindow_InforPanel.LogTypeStore = new Srims.data.IDValueRecordStore(Srims.service.common.LogService + '/GetLogType');
Srims.common.LogQueryWindow_InforPanel.LogTypeStore.load({
    callback: Srims.common.LogQueryWindow_InforPanel.LogTypeStore.buildCheckboxGroupItems
});

