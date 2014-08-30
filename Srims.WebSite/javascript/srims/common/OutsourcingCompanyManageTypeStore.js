 
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.OutsourcingCompanyManageTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
    Srims.common.OutsourcingCompanyManageTypeStore.superclass.constructor.call(this, new Srims.common.OutsourcingCompanyManageTypeXmlReader(), load_url, params);
    }
});
