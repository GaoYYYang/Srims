if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_ExpertsForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupExperts = new Srims.component.CheckBoxGroup({
        fieldLabel: '专家',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupExpertsModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupExperts];
    Srims.common.LogSetPanel_ExpertsForm.superclass.constructor.call(this, {
        title: '专家模块',
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
    this.assignValues = function() {
        this._systemSetting.set('logType', this._checkboxGroupExperts.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_ExpertsForm, Ext.form.FormPanel);

