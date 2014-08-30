
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertSimpleQuery = function(){
};

Srims.experts.ExpertSimpleQuery.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'college',
    type: 'string',
    mapping: 'College'
}, {
    name: 'mobilePhone',
    type: 'string',
    mapping: 'MobilePhone'
}, {
    name: 'officePhone',
    type: 'string',
    mapping: 'OfficePhone'
}, {
    name: 'homePhone',
    type: 'string',
    mapping: 'HomePhone'
}, {
    name: 'email',
    type: 'string',
    mapping: 'Email'
}]);

Srims.experts.ExpertSimpleQuery.store = new Ext.data.Store({
    url: Srims.service.experts.ExpertService + '/SimpleQuery',
    reader: new Ext.data.XmlReader({
        record: 'Record',
        id: 'ID'
    }, Srims.experts.ExpertSimpleQuery.Record)
});
Srims.experts.ExpertSimpleQuery.textFieldKeyWord = new Ext.form.TextField({
    fieldLabel: '姓名/拼音首字母',
    enableKeyEvents: true,
    width: 160
});
Srims.experts.ExpertSimpleQuery.columnModel = new Ext.grid.ColumnModel([{
    header: "姓名",
    dataIndex: 'name',
    width: 100
}, {
    header: "工作证号",
    dataIndex: 'number',
    hidden: !Srims.currentUser.hasPermission_ExpertSimpleQuery_ShowDetail,
    width: 100
}, {
    header: "所在院系",
    dataIndex: 'college',
    width: 100
}, {
    header: "办公电话",
    dataIndex: 'officePhone',
    width: 100
}, {
    header: "移动电话",
    dataIndex: 'mobilePhone',
    hidden: !Srims.currentUser.hasPermission_ExpertSimpleQuery_ShowDetail,
    width: 100
}, {
    header: "家庭电话",
    dataIndex: 'homePhone',
    hidden: !Srims.currentUser.hasPermission_ExpertSimpleQuery_ShowDetail,
    width: 100
}, {
    id: 'email',
    header: "电子邮箱",
    dataIndex: 'email'
}]);

Srims.experts.ExpertSimpleQuery.gridPanelExpert = new Ext.grid.GridPanel({
    store: Srims.experts.ExpertSimpleQuery.store,
    colModel: Srims.experts.ExpertSimpleQuery.columnModel,
    enableColumnHide: false,
    enableColumnMove: true,
    enableHdMenu: false,
    border: false,
    autoExpandColumn: 'email',
    autoExpand: true,
    loadMask: true,
    stateful: false,
    region: 'center',
    autoScroll: true,
    height: 200,
    viewConfig: {
        autoFill: true,
        forceFit: true
    }
});
Srims.experts.ExpertSimpleQuery.window = new Ext.Window({
    id: 'expert_simple_query_window',
    title: '专家查询',
    iconCls: 'icon-expert-search',
    width: 500,
    height: 300,
    closeAction: 'hide',
    plain: true,
    stateful: false,
    layout: 'border',
    items: [new Ext.Panel({
        region: 'north',
        autoHeight: true,
        frame: true,
        layout: 'form',
        items: [Srims.experts.ExpertSimpleQuery.textFieldKeyWord]
    }), Srims.experts.ExpertSimpleQuery.gridPanelExpert]
});
Srims.experts.ExpertSimpleQuery.window.on('show', function(){
    Srims.experts.ExpertSimpleQuery.textFieldKeyWord.focus(true, true);
});
Srims.experts.ExpertSimpleQuery.textFieldKeyWord.on('keyup', function(){
    var keyword = this.getValue();
    if (keyword.length < 2) 
        Srims.experts.ExpertSimpleQuery.store.removeAll();
    else 
        Srims.experts.ExpertSimpleQuery.store.load({
            params: {
                keyword: keyword
            }
        });
});

