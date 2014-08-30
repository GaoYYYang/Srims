
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_FundForm = function(systemSetting){
	this._systemSetting = systemSetting;
	
    this._textFieldFund = new Ext.form.NumberField({
        fieldLabel: '外协经费在总经费中所占的最大比例',
        minValue: 0,
        maxValue: 100,     
        value: systemSetting.get('fundOutRatio'),
        columns: 1,
        width: 160
    });
    
    Srims.common.SystemSettingWindow_FundForm.superclass.constructor.call(this, {
        title: '经费设置',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 200,
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
        this._systemSetting.set('fundOutRatio', this._textFieldFund.getValue());
    }
}
Ext.extend(Srims.common.SystemSettingWindow_FundForm, Ext.form.FormPanel);
