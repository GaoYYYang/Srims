if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_StampForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupStamp = new Srims.component.CheckBoxGroup({
        fieldLabel: '文印',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupStampModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupStamp];
    Srims.common.LogSetPanel_StampForm.superclass.constructor.call(this, {
        title: '文印模块',
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
        this._systemSetting.set('logType', this._checkboxGroupStamp.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_StampForm, Ext.form.FormPanel);

