
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.RecoveryProjectStore.superclass.constructor.call(this, new Srims.projects.RecoveryProjectXmlReader(), load_url, params);
    }
});
Srims.projects.RecoveryProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.projects.RecoveryProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.RecoveryProjectSimpleXmlReader(), load_url, params);
    }
});