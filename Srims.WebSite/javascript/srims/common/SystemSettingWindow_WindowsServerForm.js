
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_WindowsServerForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._textFieldFinanceWebAddress = new Ext.form.TextField({
        fieldLabel: '财务处网站',
        value: systemSetting.get('financeWebAddress'),
        columns: 1,
        width: 160
    });
    this._textFieldExpertWebAddress = new Ext.form.TextField({
        fieldLabel: '人事处网站',
        value: systemSetting.get('expertWebAddress'),
        columns: 1,
        width: 160
    });
    this._textFieldFinanceAndExpertWebAddress = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldFinanceWebAddress
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldExpertWebAddress
        })]
    });
    this._checkboxGroupWindowsService = new Srims.component.CheckBoxGroup({
        fieldLabel: 'Windows服务',
        cls: 'srims-checkboxGroup-logSetModel',
        bodyStyle: 'padding:10px 10px 0',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.WindowsServiceStore, this._systemSetting.get("windowsServiceType"))
    });
    Srims.common.SystemSettingWindow_WindowsServerForm.superclass.constructor.call(this, {
        title: 'Windows服务设置',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._textFieldFinanceAndExpertWebAddress, this._checkboxGroupWindowsService]
        })]
    });
    this.assignValues = function(){
        this._systemSetting.set('financeWebAddress', this._textFieldFinanceWebAddress.getValue());
        this._systemSetting.set('expertWebAddress', this._textFieldExpertWebAddress.getValue());
        this._systemSetting.set('windowsServiceType', this._checkboxGroupWindowsService.getSelecetedValue());
    }
}
Ext.extend(Srims.common.SystemSettingWindow_WindowsServerForm, Ext.form.FormPanel);
