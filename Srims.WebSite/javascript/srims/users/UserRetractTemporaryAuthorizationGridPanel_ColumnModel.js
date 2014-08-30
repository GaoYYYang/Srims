
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel = function(){
    Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    },{
        header: "permissionID",
        hidden: true,
        hideable: false
    }, {
        header: "权限",
        dataIndex: 'permissionName',
        hidden: false,
        renderer: Srims.users.UserPermissionItem.render
    }, {
        header: "开始时间",
        dataIndex: 'accreditDateTime',
        hidden: false,
        renderer: Date.render
    }, {
        header: "终止时间",
        dataIndex: 'endDateTime',
        hidden: false,
        renderer: Date.render
    }]);
    this.defaultSortable = false;
};
Ext.extend(Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel, Ext.grid.ColumnModel);

