
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel = function(sm){
    Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
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
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel, Ext.grid.ColumnModel);
