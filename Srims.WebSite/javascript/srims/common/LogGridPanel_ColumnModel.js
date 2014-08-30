
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogGridPanel_ColumnModel = function() {
    Srims.common.LogGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "用户",
        dataIndex: 'user',
        width: 10,
        sortable: false,
        hidden: false
    }, {
        header: "写入时间",
        dataIndex: 'dateTime',
        width: 20,
        sortable: true,
        hidden: false
    }, {
        header: "IP地址",
        dataIndex: 'userIP',
        width: 20,
        sortable: true,
        hidden: false
    }, {
        header: "操作",
        dataIndex: 'action',
        width: 20,
        sortable: false,
        hidden: false
    }, {
        header: "操作描述",
        dataIndex: 'description',
        sortable: false,
        hidden: false
}]);
        this.defaultSortable = false;
    }
    Ext.extend(Srims.common.LogGridPanel_ColumnModel, Ext.grid.ColumnModel);
