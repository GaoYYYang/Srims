
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewGridPanel_ColumnModel = function(){
    Srims.common.ViewGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "视图类型",
        dataIndex: "type",
        width: 100,
        sortable: false,
        renderer: Srims.common.viewTypeRender,
        hidden: true
    }, {
        header: "视图名称",
        dataIndex: 'name',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "是否公开",
        dataIndex: 'isPublic',
        width: 100,
        sortable: false,
        hidden: true
    }, {
        header: "建立用户",
        dataIndex: 'userName',
        width: 100,
        sortable: false,
        hidden: true
    }]);
}
Ext.extend(Srims.common.ViewGridPanel_ColumnModel, Ext.grid.ColumnModel);
