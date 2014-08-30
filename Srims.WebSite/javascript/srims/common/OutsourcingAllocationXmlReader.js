/**
* @author gy
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.OutsourcingAllocationXmlReader.superclass.constructor.call(
						this, Srims.common.OutsourcingAllocation);
    },
    readRecords: function(responseXML) {
        var result = Srims.common.OutsourcingAllocationXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.ProjectOutAllAmount = parseInt(Ext.DomQuery.selectValue("ProjectOutAllAmount", responseXML), 10);
        result.records.AllocatedAllAmount = parseInt(Ext.DomQuery.selectValue("AllocatedAllAmount", responseXML), 10);
        return result;
    }
});
