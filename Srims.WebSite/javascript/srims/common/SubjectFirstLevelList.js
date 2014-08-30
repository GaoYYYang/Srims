
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.listSubjectFirstLevel = function(){
    Srims.common._listSubjectFirsLevel('FirstLevel', 'icon-subject-level-first-list', '一级学科列表');
};
Srims.common._listSubjectFirsLevel = function(id, iconCls, name){
    var panelId = 'SubjectGridPanel_' + id;
    var subjectFirstLevelStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        subjectFirstLevelStore = panel.getSubjectStore();
    }
    else {
        subjectFirstLevelStore = new Srims.common.SubjectFirstLevelStore(Srims.service.common.SubjectService + '/QuerySubjectFirstLevel');
        panel = new Srims.common.SubjectFirstLevelGridPanel(panelId, subjectFirstLevelStore, name, iconCls);
        panel.getSubjectStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
};
