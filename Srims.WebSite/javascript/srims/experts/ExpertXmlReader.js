
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertXmlReader.superclass.constructor.call(this, Srims.experts.Expert);
    },
    readRecords: function(responseXML){
        var result = Srims.experts.ExpertXmlReader.superclass.readRecords.call(this, responseXML);
        
        result.records.showProjectCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowProjectCount", responseXML));
        result.records.showPaperCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowPaperCount", responseXML));
        result.records.showPatentCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowPatentCount", responseXML));
        result.records.showAwardCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowAwardCount", responseXML));
        
        return result;
    }
});
