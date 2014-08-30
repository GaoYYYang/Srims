
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberGridPanel_ColumnModel = function() {
    Srims.stamp.StampAdminMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "姓名",
        dataIndex: 'userName',
        width: 70
    }]);
    }
    Ext.extend(Srims.stamp.StampAdminMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);
