
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_TextForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupText = new Srims.component.CheckBoxGroup({
        fieldLabel: '文档',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupTextModelStore, this._systemSetting.get("logType"))
    });
    
    var columnItems = [this._checkboxGroupText];
    
    Srims.common.LogSetPanel_TextForm.superclass.constructor.call(this, {
        title: '文档模块',
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
        this._systemSetting.set('logType',this._checkboxGroupText.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_TextForm, Ext.form.FormPanel);
