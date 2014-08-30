
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserGridPanel_ColumnModel = function(){
    Srims.users.UserGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "用户名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }, {
        header: "登陆账号",
        dataIndex: 'loginID',
        sortable: true,
        hidden: false
    }, {
        header: "电子邮箱",
        dataIndex: 'email',
        hidden: false
    }, {
        header: "家庭电话",
        dataIndex: 'homePhone',
        hidden: false
    }, {
        header: "移动电话",
        dataIndex: 'mobilePhone',
        hidden: false
    }, {
        header: "办公电话",
        dataIndex: 'officePhone',
        hidden: false
    }, {
        header: "所属用户组",
        dataIndex: 'userRole',
        hidden: false
    }, {
        header: "是否自定义权限",
        dataIndex: 'isCustomPermission',
        hidden: false,
        renderer: Boolean.render
    }, {
        header: "姓名全拼",
        dataIndex: 'nameSpell',
        hidden: true
    }, {
        header: "传真",
        dataIndex: 'fax',
        hidden: true
    }, {
        header: "是否超级用户",
        dataIndex: 'isSuper',
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "是否被锁定",
        dataIndex: 'isLocked',
        hidden: true,
        renderer: Boolean.render
    }]);
    this.defaultSortable = false;
};
Ext.extend(Srims.users.UserGridPanel_ColumnModel, Ext.grid.ColumnModel);
