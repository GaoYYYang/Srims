
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLiberalArtsPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
    Srims.experts.ExpertLiberalArtsPaperXmlReader.superclass.constructor.call(this, Srims.experts.ExpertLiberalArtsPaper);
    }
})
