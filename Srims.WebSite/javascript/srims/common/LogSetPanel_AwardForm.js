if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_AwardForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupAward = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖励',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns:6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupAwardModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupAward];
    Srims.common.LogSetPanel_AwardForm.superclass.constructor.call(this, {
        title: '奖励模块',
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
        this._systemSetting.set('logType', this._checkboxGroupAward.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_AwardForm, Ext.form.FormPanel);

