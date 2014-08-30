
if (!Srims.common) 
    Ext.namespace('Srims.common');

//一级学科新建编辑
Srims.common.AddnewSubjectFirstLevel = function(store){
    var id = 'AddnewSubjectFirstLevel';
    var window = Ext.getCmp(id);
    
    if (!window) {
        var subjectfirstlevel = new Srims.common.SubjectFirstLevel({});
        window = new Srims.common.SubjectFirstLevelEditWindow(id, subjectfirstlevel, store);
    }
    
    window.show();
};
Srims.common.editSubjectFirstLevel = function(subjectfirstlevel, store){
    var id = 'SubjectFirstLevelEditWindow' + subjectfirstlevel.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.common.SubjectFirstLevelEditWindow(id, subjectfirstlevel, store);
    }
    window.show();
};

//二级学科新建编辑
Srims.common.AddnewSubjectSecondLevel = function(store){
    var id = 'AddnewSubjectSecondLevel';
    var window = Ext.getCmp(id);
    
    if (!window) {
        var subjectsecondlevel = new Srims.common.SubjectSecondLevel({});
        window = new Srims.common.SubjectSecondEditWindow(id, subjectsecondlevel, store);
    }
    window.show();
};
Srims.common.editSubjectSecondLevel = function(subjectsecondlevel, store){
    var id = 'SubjectsecondEditWindow' + subjectsecondlevel.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.common.SubjectSecondEditWindow(id, subjectsecondlevel, store);
    }
    window.show();
};
