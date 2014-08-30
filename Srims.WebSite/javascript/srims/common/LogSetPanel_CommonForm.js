if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_CommonForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupCommon = new Srims.component.CheckBoxGroup({
        fieldLabel: '公共',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupCommonModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupCommon];
    Srims.common.LogSetPanel_CommonForm.superclass.constructor.call(this, {
        title: '公共模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function() {
    this._systemSetting.set('logType', this._checkboxGroupCommon.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_CommonForm, Ext.form.FormPanel);

