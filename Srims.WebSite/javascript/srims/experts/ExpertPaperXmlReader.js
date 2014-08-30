
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertPaperXmlReader.superclass.constructor.call(this, Srims.experts.ExpertPaper);
    }
})
