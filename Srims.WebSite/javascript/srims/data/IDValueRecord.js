
if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.IDValueRecord = Ext.data.Record.create([{
    name: 'id',
    type: 'string',
    mapping: 'ID'
}, {
    name: 'value',
    type: 'string',
    mapping: 'Value'
}]);
Srims.data.Entity.apply(Srims.data.IDValueRecord);

Srims.data.IDValueRecordXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.data.IDValueRecordXmlReader.superclass.constructor.call(this, Srims.data.IDValueRecord);
    }
});

Srims.data.IDValueRecordStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.data.IDValueRecordStore.superclass.constructor.call(this, (new Srims.data.IDValueRecordXmlReader()), load_url);
    },
    buildGridFilterItems: function(){
        this.gridFilterItems = [];
        for (var i = 0; i < this.getCount(); i++) {
            this.gridFilterItems[this.gridFilterItems.length] = {
                id: this.getAt(i).get('id'),
                text: this.getAt(i).get('value')
            };
        }
    },
    buildCheckboxGroupItems: function(){
        this.checkboxGroupItems = [];
        for (var i = 0; i < this.getCount(); i++) {
            this.checkboxGroupItems[this.checkboxGroupItems.length] = {
                boxLabel: this.getAt(i).get('value'),
                name: this.getAt(i).get('id')
            };
        }
    }
});
