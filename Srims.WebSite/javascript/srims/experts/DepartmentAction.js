
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

//部门新建编辑
Srims.experts.addDepartment = function(store){
    var id = 'DepartmentAddWindow'; 
    var window = Ext.getCmp(id);
    
    if (!window) {
        var department = new Srims.experts.Department({});
        window = new Srims.experts.DepartmentEditWindow(id, department, store);
    }
    window.show();
};
Srims.experts.editDepartment = function(department,store){
    var id = 'DepartmentEditWindow';
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.experts.DepartmentEditWindow(id, department, store);
    }
    window.show();
};
