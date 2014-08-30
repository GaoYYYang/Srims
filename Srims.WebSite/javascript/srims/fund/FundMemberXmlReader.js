
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundMemberXmlReader.superclass.constructor.call(this, Srims.fund.FundMember);
    }
});

