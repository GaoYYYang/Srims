
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampGridPanle_ColumnModel = function(){
    Srims.stamp.StampGridPanle_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "图章类型",
        dataIndex: 'type',
        width: 80
    }, {
        header: "图章拥有者",
        dataIndex: 'owner',
        width: 100
    }])
}
Ext.extend(Srims.stamp.StampGridPanle_ColumnModel, Ext.grid.ColumnModel);
