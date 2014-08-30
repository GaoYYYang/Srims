
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertProjectXmlReader.superclass.constructor.call(this, Srims.experts.ExpertProject);
    }
});
