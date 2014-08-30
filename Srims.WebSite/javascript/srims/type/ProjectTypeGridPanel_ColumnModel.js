
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeGridPanel_ColumnModel = function(){
    Srims.type.ProjectTypeGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "类别名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }, {
        header: "项目等级",
        dataIndex: 'projectRank',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "类别简称",
        dataIndex: 'shortName',
        sortable: true,
        hidden: true
    }, {
        header: "名称拼写",
        dataIndex: 'nameSpell',
        sortable: true,
        hidden: true
    }, {
//        header: "校内管理费率",
//        dataIndex: 'overheadExpenseInRate',
//        sortable: true,
//        renderer: ExpenseRate.render,
//        width: 30,
//        hidden: false
//    }, {
//        header: "外协管理费率",
//        dataIndex: 'overheadExpenseOutRate',
//        sortable: true,
//        hidden: false,
//        renderer: ExpenseRate.render,
//        width: 30
//    }, {
        header: "专管部门",
        dataIndex: 'administration',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "分类代码",
        dataIndex: 'code',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "备用代码",
        dataIndex: 'bakCode',
        width: 30,
        sortable: true,
        hidden: true
    }, {
        header: "原来代码",
        dataIndex: 'perCode',
        width: 30,
        sortable: true,
        hidden: true
    }, {
        header: "预算制",
        dataIndex: 'isBudget',
        width: 20,
        sortable: true,
        hidden: false,
        renderer: Boolean.render
    }, {
        header: "开发类项目",
        dataIndex: 'isExploit',
        width: 20,
        sortable: true,
        hidden: false,
        renderer: Boolean.render
    }, {
        header: "横向项目",
        dataIndex: 'isHorizontalType',
        width: 20,
        sortable: true,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "项目来源",
        dataIndex: 'projectComingFrom',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: Srims.type.projectFromRender
    }, {
        header: "学科分类",
        dataIndex: 'subjectNature',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: Srims.type.projectSubjectNatureRender
    },{
    	header: "管理费收取类别",
    	dataIndex: 'managementFeesType',
    	width: 40,
    	sortable: true,
    	hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.type.ProjectTypeGridPanel_ColumnModel, Ext.grid.ColumnModel);
