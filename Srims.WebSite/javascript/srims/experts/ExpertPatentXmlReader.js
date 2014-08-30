
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPatentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertPatentXmlReader.superclass.constructor.call(this, Srims.experts.ExpertPatent);
    }
});

