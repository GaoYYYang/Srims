
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAwardXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertAwardXmlReader.superclass.constructor.call(this, Srims.experts.ExpertAward);
    }
})
