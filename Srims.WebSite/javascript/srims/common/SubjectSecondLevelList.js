if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.listSubjectSecondLevel = function() {
    Srims.common._listSubjectSecondLevel('SecondLevel', 'icon-subject-level-second-list', '二级学科列表');
}
Srims.common._listSubjectSecondLevel = function(id, iconCls, name) {
    var panelId = 'SubjectGridPanel_' + id;
    var subjectSecStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        subjectSecStore = panel.getSubjectStore();
    }
    else {
        subjectSecStore = new Srims.common.SubjectSecondLevelStore(Srims.service.common.SubjectService + '/QuerySubjectSecondLevel');
        panel = new Srims.common.SubjectSecondLevelGridPanel(panelId, subjectSecStore, name, iconCls);
        panel.getSubjectStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}

