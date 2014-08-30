
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeAction = function() {
};

Srims.stamp.StampApplicationTypeAction.listStampApplicationTypeGroup = function() {
    var panelId = 'StampApplicationTypeGroupGridPanel';
    var stampApplicationTypeGroupStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {};

    if (panel) {
        stampApplicationTypeGroupStore = panel.getStampApplicationGroupTypeGroupStore();
    }
    else {
        stampApplicationTypeGroupStore = new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query', params);
        stampApplicationTypeGroupStore.load();
        panel = new Srims.stamp.StampApplicationTypeGroupGridPanel(panelId, stampApplicationTypeGroupStore, '文印申请类型组列表', 'icon-stamp-list');
        Srims.WorkSpace.addPanel(panel);
    }


}


Srims.stamp.StampApplicationTypeAction.editStampApplicationTypeGroup = function(stampApplicationTypeGroup) {
    var id = 'StampApplicationTypeGroupEditWindow' + stampApplicationTypeGroup.get('id');
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.stamp.StampApplicationTypeGroupEditWindow(id, stampApplicationTypeGroup);

    window.show();
}

Srims.stamp.StampApplicationTypeAction.listStampApplicationType = function() {
var panelId = 'StampApplicationTypeGridPanel';
var stampApplicationTypeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {};

    if (panel) {
        stampApplicationTypeStore = panel.getStampApplicationTypeStore();
    }
    else {
        stampApplicationTypeStore = new Srims.stamp.StampApplicationTypeStore(Srims.service.stamp.StampApplicationTypeService + '/Query', params);
      //  stampApplicationTypeStore.load();
        panel = new Srims.stamp.StampApplicationTypeGridPanel(panelId, stampApplicationTypeStore, '文印申请类型列表', 'icon-stamp-list');
        Srims.WorkSpace.addPanel(panel);
    }


}

Srims.stamp.StampApplicationTypeAction.newStampApplicationTypeGroup = function() {
    var id = 'NewStampApplicationTypeGroupWindow';
    var window = Ext.getCmp(id);

    if (!window) {
        var stampApplicationTypeGroup = new Srims.stamp.StampApplicationTypeGroup({});
        window = new Srims.stamp.StampApplicationTypeGroupEditWindow(id, stampApplicationTypeGroup);
    }

    window.show();
}
Srims.stamp.StampApplicationTypeAction.newStampApplicationType = function() {
    var id = 'NewStampApplicationTypeWindow';
    var window = Ext.getCmp(id);

    if (!window) {
        var stampApplicationType = new Srims.stamp.StampApplicationType({});
        window = new Srims.stamp.StampApplicationTypeEditWindow(id, stampApplicationType);
    }

    window.show();
}
Srims.stamp.StampApplicationTypeAction.showStampApplicationType = function(stampApplicationType) {
    var id = 'ShowStampApplicationTypeWindow' + stampApplicationType.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.stamp.StampApplicationTypeShowWindow(id, stampApplicationType);
    }
    window.show();
}

Srims.stamp.StampApplicationTypeAction.editStampApplicationType = function(stampApplicationType) {
    var id = 'StampApplicationTypeEditWindow' + stampApplicationType.get('id');
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.stamp.StampApplicationTypeEditWindow(id, stampApplicationType);

    window.show();
}
Srims.stamp.StampApplicationTypeAction.showFirstAdminWindow = function(stampApplicationType) {
    var windowId = 'StampFirstAdminMemberWindow' + stampApplicationType.get('id');
    var title = '一级审核管理员管理';
    var sign = true;
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampAdminMemberWindow(windowId, stampApplicationType,title,sign);
    else
        window._stampAdminMemberGridPanel.getStore().load();
    window.show();
}
Srims.stamp.StampApplicationTypeAction.newStampAdminMember = function(stampApplicationType, store, sign) {
    var windowId = 'NewStampAdminMemberWindow' + stampApplicationType.get('id');
    this._sign = sign;
    var window = Ext.getCmp(windowId);
    if (!window) {
        var stampAdminMember = new Srims.stamp.StampAdminMember({});
        window = new Srims.stamp.StampAdminMemberEditWindow(windowId, stampAdminMember, stampApplicationType, store,this._sign);
    }
    window.show();
}
Srims.stamp.StampApplicationTypeAction.showSecondAdminWindow = function(stampApplicationType) {
    var windowId = 'StampSecondAdminMemberWindow' + stampApplicationType.get('id');
    var title = '二级审核管理员管理';
    var sign = false;
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampAdminMemberWindow(windowId, stampApplicationType, title,sign);
    else
        window._stampAdminMemberGridPanel.getStore().load();
    window.show();
}

//Srims.stamp.editProjectMember = function(project, projectMember, store) {
//    var windowId = 'EditProjectMemberWindow' + projectMember.get('id');

//    var window = Ext.getCmp(windowId);
//    if (!window) {
//        window = new Srims.stamp.ProjectMemberEditWindow(windowId, projectMember, project, store);
//    }
//    window.show();
//}