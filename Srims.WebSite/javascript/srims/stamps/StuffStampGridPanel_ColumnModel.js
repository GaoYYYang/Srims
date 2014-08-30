
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampGridPanel_ColumnModel = function(){
    Srims.stamp.StuffStampGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "盖章类型",
        dataIndex: 'type',
        sortable: false,
        hidden: false
    }, {
        header: "盖章数量",
        dataIndex: 'number',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.stamp.StuffStampGridPanel_ColumnModel, Ext.grid.ColumnModel);
