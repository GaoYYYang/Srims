
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_PaperForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupPaper = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupPaperModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupPaper];
    Srims.common.LogSetPanel_PaperForm.superclass.constructor.call(this, {
        title: '论文模块',
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
        this._systemSetting.set('logType', this._checkboxGroupPaper.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_PaperForm, Ext.form.FormPanel);
