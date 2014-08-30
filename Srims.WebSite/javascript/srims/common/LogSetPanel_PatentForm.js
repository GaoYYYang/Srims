
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_PatentForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupPatent = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupPatentModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupPatent];
    Srims.common.LogSetPanel_PatentForm.superclass.constructor.call(this, {
        title: '专利模块',
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
        this._systemSetting.set('logType', this._checkboxGroupPatent.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_PatentForm, Ext.form.FormPanel);
