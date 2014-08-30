
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.PayPlanItemXmlReader.superclass.constructor.call(this, Srims.fund.PayPlanItem);
    }
});
