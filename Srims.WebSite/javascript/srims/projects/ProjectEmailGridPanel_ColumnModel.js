
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEmailGridPanel_ColumnModel = function(sm){
    Srims.projects.ProjectEmailGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        sortable: false,
        hidden: false
    }, {
        header: "负责人工作证号",
        dataIndex: 'principalNumber',
        sortable: false,
        hidden: false
    }, {
        header: "负责人Email",
        dataIndex: 'principalEmail',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.ProjectEmailGridPanel_ColumnModel, Ext.grid.ColumnModel)
