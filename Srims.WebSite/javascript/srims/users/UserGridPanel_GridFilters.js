
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserGridPanel_GridFilters = function(){
    Srims.users.UserGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'loginID'
        }, {
            type: 'list',
            labelField: 'value',
            dataIndex: 'userRole',
            store: new Srims.data.IDValueRecordStore(Srims.service.users.UserService + '/GetUserRolesForFilter'),
            phpmode: true
        }, {
            type: 'boolean',
            dataIndex: 'isSuper'
        }]
    })
};
Ext.extend(Srims.users.UserGridPanel_GridFilters, Ext.grid.GridFilters);

