
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.EntitySearch = function(){
}

Srims.component.EntitySearch.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
    typeAhead: false,
    triggerClass: 'searchComboBoxTrigger',
    minChars: 2,
    listWidth: 300,
    itemSelector: 'div.search-item',
    onLoad: function(){
        if (this.store.getCount() <= 0) {
            this.selectEntity = undefined;
            this.selectEntityId = undefined;
        }
        Srims.component.EntitySearch.SearchComboBox.superclass.onLoad.call(this);
    },
    onSelect: function(record){
        this.selectEntity = record;
        this.selectEntityId = record.get('id');
        
        Srims.component.EntitySearch.SearchComboBox.superclass.onSelect.call(this, record);
    },
    getSelectEntityId: function(){
        return Srims.component.EntitySearch.SearchComboBox.superclass.getValue.call(this) != '' ? this.selectEntityId : undefined;
    },
    getEntity: function(){
        return Srims.component.EntitySearch.SearchComboBox.superclass.getValue.call(this) != '' ? this.selectEntity : undefined;
    },
    getValue: function(){
        return this.getSelectEntityId();
    },
    getText: function(){
        return Srims.component.EntityComboBox.superclass.getValue.call(this);
    },
    validator: function(){
        if (this.getSelectEntityId() == undefined || this.getSelectEntityId() == null) 
            return false;
        else 
            return true;
    },
    setSelectEntityId: function(value){
        this.selectEntityId = value;
    }
})
