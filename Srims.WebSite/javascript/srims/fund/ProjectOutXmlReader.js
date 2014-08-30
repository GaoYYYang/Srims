
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.ProjectOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.fund.ProjectOutXmlReader.superclass.constructor.call(this, Srims.fund.ProjectOut);
    }
});
