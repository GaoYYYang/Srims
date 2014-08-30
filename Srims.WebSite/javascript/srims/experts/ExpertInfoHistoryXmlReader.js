
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertInfoHistoryXmlReader.superclass.constructor.call(this, Srims.experts.ExpertInfoHistory);
    }
});
