
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.ProjectOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(allocationId) {
    Srims.fund.ProjectOutStore.superclass.constructor.call(this, new Srims.fund.ProjectOutXmlReader(), Srims.service.fund.VoucherOutService + '/GetOutInfo', {
            FundAllocationID: allocationId
        });
    }
});
