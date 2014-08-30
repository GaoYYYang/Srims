if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel = function() {
Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        width: 80
    }]);
    }
    Ext.extend(Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel, Ext.grid.ColumnModel);