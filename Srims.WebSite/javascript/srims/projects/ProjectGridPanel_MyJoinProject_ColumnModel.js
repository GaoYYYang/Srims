
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectGridPanel_MyJoinProject_ColumnModel = function(){
    Srims.projects.projectGridPanel_MyJoinProject_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: false,
        hidden: false
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
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: false,
        width: 30,
        renderer: Srims.projects.projectLevelRender
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.projectGridPanel_MyJoinProject_ColumnModel, Ext.grid.ColumnModel);
