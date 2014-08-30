
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffGridPanel_ColumnModel = function(){
    Srims.stamp.StuffGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "文件名称",
        dataIndex: 'stuffName',
        width: 200,
        sortable: false,
        hidden: false
    }, {
        header: "文件类型",
        dataIndex: 'stuffType',
        sortable: false,
        hidden: false
    }, {
        header: "盖章类型",
        dataIndex: 'stampTypes',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.stamp.StuffGridPanel_ColumnModel, Ext.grid.ColumnModel);
