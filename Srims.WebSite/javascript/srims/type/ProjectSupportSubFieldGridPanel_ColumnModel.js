
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel = function(){
    Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false
    }, {
        header: "项目资助领域",
        dataIndex: 'projectSupportField',
        width: 60,
        sortable: false,
        hidden: false
    }])
}
Ext.extend(Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel, Ext.grid.ColumnModel);
