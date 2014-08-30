
if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.XmlReader = Ext.extend(Ext.data.XmlReader, {
    constructor: function(record){
        Srims.data.XmlReader.superclass.constructor.call(this, {
            totalRecords: 'Total',
            record: 'Record',
            id: 'ID'
        }, record);
    }
});
