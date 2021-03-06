
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationGridPanel_ColumnModel = function() {
    Srims.stamp.StampApplicationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "项目来源",
        dataIndex: 'stampStuffFromName',
        sortable: true,
        hidden: false
    }, {
        header: "材料份数",
        dataIndex: 'stuffNumber',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "盖章事由",
        dataIndex: 'stampReason',
        sortable: true,
        hidden: false
    }, {
        header: "骑缝章",
        dataIndex: 'sealPerforation',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "专家打印",
        dataIndex: 'expertPrint',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "双面打印",
        dataIndex: 'isDuplexPrint',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "关键字",
        dataIndex: 'keyWord',
        sortable: true,
        hidden: true
    }, {
        header: "文印申请类型",
        dataIndex: 'stampApplicationTypeName',
        sortable: true,
        hidden: false
    }, {
        header: "文印申请类型对应组",
        dataIndex: 'stampApplicationTypeGroupName',
        sortable: true,
        hidden: false
    }, {
        header: "经办人",
        dataIndex: 'manager',
        sortable: true,
        width: 30,
        hidden: false
    }, {
        header: "经办人电话",
        dataIndex: 'managerPhone',
        sortable: true,
        hidden: false,
        width: 30
    }, {
        header: "经办人邮箱",
        dataIndex: 'managerEmail',
        sortable: true,
        hidden: false,
        width: 30
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "当前状态",
        dataIndex: 'currentState',
        width: 30,
        sortable: true,
        renderer: Srims.stamp.StampStateRender,
        hidden: false
    }, {
        header: "当前状态时间",
        dataIndex: 'currentStateTime',
        width: 30,
        sortable: true,
        renderer: Date.render,
        hidden: true
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.stamp.StampApplicationGridPanel_ColumnModel, Ext.grid.ColumnModel);
