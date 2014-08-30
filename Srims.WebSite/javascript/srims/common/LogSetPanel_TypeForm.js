
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_TypeForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupType = new Srims.component.CheckBoxGroup({
        fieldLabel: '类型',
        hideLabel: true,
        labelWidth: 700,
        cls: 'srims-checkboxGroup-logSetModel',
        columns:6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupTypeModelStore, this._systemSetting.get("logType"))
    });
    
    var columnItems = [this._checkboxGroupType];
    
    Srims.common.LogSetPanel_TypeForm.superclass.constructor.call(this, {
        title: '类型模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupType.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_TypeForm, Ext.form.FormPanel);
