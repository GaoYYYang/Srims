
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldGridPanel_ColumnModel = function(){
    Srims.type.ProjectSupportFieldGridPanel_ColumnModel.superclass.constructor.call(this, [{
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
        header: "项目类别",
        dataIndex: 'projectType',
        width: 50,
        sortable: false,
        hidden: false
    }])
}
Ext.extend(Srims.type.ProjectSupportFieldGridPanel_ColumnModel, Ext.grid.ColumnModel);
