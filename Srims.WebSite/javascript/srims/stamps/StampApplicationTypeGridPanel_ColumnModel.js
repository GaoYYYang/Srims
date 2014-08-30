if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGridPanel_ColumnModel = function() {
    Srims.stamp.StampApplicationTypeGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        width: 60
    }, {
        header: "对应组",
        dataIndex: 'stampApplicationTypeGroupName',
        sortable: true,
        width: 60
    }, {
        header: "是否二次审核",
        dataIndex: 'isTwiceCancer',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: function(value) {
            return value == true ? '<span>是</span>' : '<span>否</span>';
        }
    }, {
        header: "是否项目相关",
        dataIndex: 'isProjectRelated',
        width: 60,
        sortable: true,
        renderer: function(value) {
            return value == true ? '<span>是</span>' : '<span>否</span>';
        }
}]);
    }
    Ext.extend(Srims.stamp.StampApplicationTypeGridPanel_ColumnModel, Ext.grid.ColumnModel);