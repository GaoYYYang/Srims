
if (!Srims.component) 
    Ext.namespace('Srims.component');
Srims.component.EntityComboBox = function(params) {

    this.selectEntityId = params.entityId;
    params.valueFiled = 'id';
    params.lazyInit = false;
    params.triggerAction = 'all';
    params.forceSelection = true;
    params.store.comboBox = this;

    Srims.component.EntityComboBox.superclass.constructor.call(this, params);
    params.store.on('load', function(store, records) {
        if (records.length == 0)
            store.comboBox.disable();
    });

}

Ext.extend(Srims.component.EntityComboBox, Ext.form.ComboBox, {
    onSelect: function(record) {
        this.selectEntityId = record.get('id');
        Srims.component.EntityComboBox.superclass.onSelect.call(this, record);
    },
    getValue: function() {
        return Srims.component.EntityComboBox.superclass.getValue.call(this) != '' ? this.selectEntityId : undefined;
    },
    getText: function() {
        return Srims.component.EntityComboBox.superclass.getValue.call(this)
    },
    getEntity: function() {
        var selectId = this.getValue();
        if (selectId == undefined)
            return undefined;

        return this.store.getById(selectId);
    },
    setSelectEntityId: function(value) {
        this.selectEntityId = value;
    }
});

