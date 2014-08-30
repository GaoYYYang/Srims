
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_BaseForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupBase = new Srims.component.CheckBoxGroup({
        fieldLabel: '基地',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupBaseModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupBase];
    Srims.common.LogSetPanel_BaseForm.superclass.constructor.call(this, {
        title: '基地模块',
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
        this._systemSetting.set('logType', this._checkboxGroupBase.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_BaseForm, Ext.form.FormPanel);
