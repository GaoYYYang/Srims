
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_FundForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupFund = new Srims.component.CheckBoxGroup({
        fieldLabel: '经费',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupFundModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupFund];
    Srims.common.LogSetPanel_FundForm.superclass.constructor.call(this, {
        title: '经费模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupFund.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_FundForm, Ext.form.FormPanel);
