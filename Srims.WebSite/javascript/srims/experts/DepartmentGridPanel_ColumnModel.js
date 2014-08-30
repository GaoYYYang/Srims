if (!Srims.experts)
	Ext.namespace('Srims.experts');

Srims.experts.DepartmentGridPanel_ColumnModel = function() {
	Srims.experts.DepartmentGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		hidden: true,
		hideable: false
	},{
		header: "部门代码",
		dataIndex: 'code',
		width: 100,
		sortable: true,
		hidden: false
	},{
		header: "部门名称",
		dataIndex: 'name',
		width: 100,
		sortable: true,
		hidden: false
	},{
		header: "部门简称",
		dataIndex: 'shortName',
		width: 100,
		sortable: false,
		hidden: false
	},{
		header: "是否学院",
		dataIndex: 'isCollege',
		width: 100,
		sortable: false,
		hidden: false
	}]);
	this.defaultSortable = false;
}
Ext.extend(Srims.experts.DepartmentGridPanel_ColumnModel, Ext.grid.ColumnModel);