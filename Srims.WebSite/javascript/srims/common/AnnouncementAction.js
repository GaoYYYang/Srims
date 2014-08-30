
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.AnnouncementAction = function() {
};
Srims.common.AnnouncementAction.listAnnouncement = function(showNewWindow) {
    var panelId = 'AnnouncementGridPanel';
    var announcementStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        announcementStore = panel.getAnnouncementStore();
    }
    else {
        announcementStore = new Srims.common.AnnouncementStore(Srims.service.common.AnnouncementService + '/Query');
        panel = new Srims.common.AnnouncementGridPanel(panelId, announcementStore, '通知列表', 'icon-announcement-list');
        Srims.WorkSpace.addPanel(panel);
    }

    if (showNewWindow)
        Srims.common.AnnouncementAction.newAnnouncement();
}

Srims.common.AnnouncementAction.newAnnouncement = function() {
    var id = 'NewAnnouncementWindow';
    var window = Ext.getCmp(id);

    if (!window) {
        var announcement = new Srims.common.Announcement({});
        announcement.set('state', Srims.common.AnnouncementState.Normal);
        window = new Srims.common.AnnouncementEditWindow(id, announcement);
    }

    window.show();
}

Srims.common.AnnouncementAction.editAnnouncement = function(announcement) {
    var id = 'AnnouncementEditWindow' + announcement.get('id');
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.common.AnnouncementEditWindow(id, announcement);

    window.show();
}

Srims.common.AnnouncementAction.showAnnouncement = function(announcement) {
    var id = 'ShowAnnouncementWindow' + announcement.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.common.AnnouncementShowWindow(id, announcement);
    }
    window.show();
}

