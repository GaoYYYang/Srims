if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectOut = Ext.data.Record.create([{
    name: 'amount',
    type: 'float',
    mapping: 'Amount'
}, {
    name: 'outSourcingName',
    type: 'string',
    mapping: 'OutsourcingName'
}]);
    Srims.data.Entity.apply(Srims.projects.ProjectOut);