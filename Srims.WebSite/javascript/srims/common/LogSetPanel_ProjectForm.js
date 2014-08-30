
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_ProjectForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupProject = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupProjectModelStore, this._systemSetting.get("logType"))
    });
    
    var columnItems = [this._checkboxGroupProject];
    
    Srims.common.LogSetPanel_ProjectForm.superclass.constructor.call(this, {
        title: '项目模块',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logTypeProject',this._checkboxGroupProject.getSelecetedValue());		
    }
 }
Ext.extend(Srims.common.LogSetPanel_ProjectForm, Ext.form.FormPanel);
