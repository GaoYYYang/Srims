
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.ProjectOut = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'outsourcingName',
    type: 'string',
    mapping: 'OutsourcingName'
}, {
    name: 'outsourcingID',
    type: 'int',
    mapping: 'OutsourcingID'
}, {
    name: 'alreadyAllocated',
    type: 'int',
    mapping: 'AlreadyAllocated'
}, {
    name: 'wantAllocated',
    type: 'int',
    mapping: 'WantAllocated'
}, {
    name: 'remainAllocated',
    type: 'int',
    mapping: 'RemainAllocated'
}]);

    Srims.data.Entity.apply(Srims.fund.ProjectOut);


