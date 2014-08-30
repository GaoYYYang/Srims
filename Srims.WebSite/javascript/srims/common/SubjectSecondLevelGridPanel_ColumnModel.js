
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelGridPanel_ColumnModel = function(){
    Srims.common.SubjectSecondLevelGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "学科名称",
        dataIndex: 'name',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "所属一级学科",
        dataIndex: "subjectFirstLevelName",
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "学科代码",
        dataIndex: 'code',
        width: 100,
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.common.SubjectSecondLevelGridPanel_ColumnModel, Ext.grid.ColumnModel);
