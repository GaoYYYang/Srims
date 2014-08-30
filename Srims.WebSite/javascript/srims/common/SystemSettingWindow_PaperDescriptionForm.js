
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_PaperDescriptionForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._textFieldFund = new Ext.form.TextArea({
        fieldLabel: '论文库界面上文字说明',
        minValue: 0,
        maxValue: 100,
        labelWidth: 90,
        value: systemSetting.get('paperDescription'),
        height: 80,
        width: 600
    });
    
    Srims.common.SystemSettingWindow_PaperDescriptionForm.superclass.constructor.call(this, {
        title: '论文库说明',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._textFieldFund]
        })]
    });
    //method
    this.isValid = function(preventMark){
        var result = true;
        result = this._textFieldFund.isValid(preventMark) && result;
        return result;
    }
    this.assignValues = function(){
        this._systemSetting.set('paperDescription', this._textFieldFund.getValue());
    }
}
Ext.extend(Srims.common.SystemSettingWindow_PaperDescriptionForm, Ext.form.FormPanel);
