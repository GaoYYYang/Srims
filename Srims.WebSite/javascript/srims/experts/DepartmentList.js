
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.listDepartment = function() {   
    var panelId = 'Department';
    var iconCls = 'icon-department-list';
    var name = '部门管理';
    var departmentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        departmentStore = panel.getDepartmentStore();
    }
    else {
        departmentStore = new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/QueryDepartment');
		panel = new Srims.experts.DepartmentGridPanel(panelId,departmentStore,name,iconCls);
		panel.getDepartmentStore().load();
		
		Srims.WorkSpace.addPanel(panel);
    }
};