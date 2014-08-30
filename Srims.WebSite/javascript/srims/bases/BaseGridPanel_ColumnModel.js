
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel_ColumnModel = function(){

    Srims.bases.BaseGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "基地名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }, {
        header: "负责人",
        dataIndex: 'directorName',
        sortable: false,
        hidden: false
    }, {
        header: "学术负责人",
        dataIndex: 'academyDirectorName',
        sortable: false,
        hidden: true
    }, {
        header: "主管部门",
        dataIndex: 'administration',
        sortable: false,
        hidden: false
    }, {
        header: "等级",
        dataIndex: 'rank',
        sortable: true,
        hidden: false
    }, {
        header: "地址",
        dataIndex: 'address',
        sortable: false,
        hidden: true
    }, {
        header: "电话",
        dataIndex: 'phone',
        sortable: false,
        hidden: false
    }, {
        header: "传真",
        dataIndex: 'fax',
        sortable: false,
        hidden: true
    }, {
        header: "邮编",
        dataIndex: 'zip',
        sortable: false,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.bases.BaseGridPanel_ColumnModel, Ext.grid.ColumnModel);
