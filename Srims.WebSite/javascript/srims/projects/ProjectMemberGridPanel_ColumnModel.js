
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel_ColumnModel = function(){
    Srims.projects.ProjectMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "姓名",
        dataIndex: 'name',
        width: 70
    }, {
        header: "位次",
        dataIndex: 'order',
        width: 40
    }, {
        header: "工作证号",
        dataIndex: 'number',
        width: 70
    }, {
        header: "子课题编号",
        dataIndex: 'taskNo',
        width: 100
    }, {
        id: 'taskName',
        header: "子课题名称",
        dataIndex: 'taskName'
    }]);
}
Ext.extend(Srims.projects.ProjectMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);
