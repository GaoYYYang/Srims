
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryGridPanel_ColumnModel = function(){
    Srims.type.ProjectSupportCategoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
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
    }, {
        header: "是否收取管理费",
        dataIndex: 'isGetOverheadExpense',
        width: 50,
        sortable: false,
        renderer: Boolean.render,
        hidden: false
    }])
}
Ext.extend(Srims.type.ProjectSupportCategoryGridPanel_ColumnModel, Ext.grid.ColumnModel);
