
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegateGridPanel_ColumnModel = function(sm){
    Srims.projects.ProjectSetDelegateGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        sortable: false,
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        width: 200,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "项目类型",
        dataIndex: 'typeName',
        sortable: false,
        hidden: false
    }, {
        header: "委托负责人",
        dataIndex: 'principalDelegate',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.ProjectSetDelegateGridPanel_ColumnModel, Ext.grid.ColumnModel);
