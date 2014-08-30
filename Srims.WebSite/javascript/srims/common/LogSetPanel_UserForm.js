
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_UserForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupUser = new Srims.component.CheckBoxGroup({
        fieldLabel: '用户',
        hideLabel: true,
        cls: 'srims-checkboxGroup',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupUserModelStore, this._systemSetting.get("logType"))
    });

    var columnItems = [this._checkboxGroupUser];

    Srims.common.LogSetPanel_UserForm.superclass.constructor.call(this, {
        title: '用户模块',
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
    this.assignValues = function() {
        this._systemSetting.set('logTypeUser', this._checkboxGroupUser.getSelecetedValue());
    }

    this.isValid = function(preventMark) {
        var result = true;

        result = this._checkboxGroupUser.isValid(preventMark) && result;
        return result;
    }


}
Ext.extend(Srims.common.LogSetPanel_UserForm, Ext.form.FormPanel);
