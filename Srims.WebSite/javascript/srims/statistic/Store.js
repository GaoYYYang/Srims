
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.Store = function(record){
    Srims.statistic.Store.superclass.constructor.call(this, {
        autoLoad: false,
        remoteSort: false,
        reader: new Ext.data.XmlReader({
            record: "Row"
        }, record)
    });
}
Ext.extend(Srims.statistic.Store, Ext.data.Store);
