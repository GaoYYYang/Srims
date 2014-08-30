
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.fund.PayPlanItemService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.fund.PayPlanItemStore.superclass.constructor.call(this, new Srims.fund.PayPlanItemXmlReader(), load_url, params);
    }
});
