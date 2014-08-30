
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundMemberStore.superclass.constructor.call(this, new Srims.fund.FundMemberXmlReader(), load_url, params);
    }
});


