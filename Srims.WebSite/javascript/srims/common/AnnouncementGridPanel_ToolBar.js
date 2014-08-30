
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '发布',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.common.AnnouncementAction.newAnnouncement();
        },
        hidden: !user.hasPermission_ManageAnnouncement,
        tooltip: '<b>新建通知</b><br/>输入通知信息以新建通知'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.AnnouncementAction.showAnnouncement(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看通知</b><br/>显示所选通知的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.AnnouncementAction.editAnnouncement(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑通知</b><br/>编辑所选通知'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除通知', '你确定要删除这个通知吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.common.AnnouncementService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function() {
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel)
                                panel.getAnnouncementStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除通知</b><br/>删除所选通知'
    });
    this._buttonSetTop = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-settop',
        text: '置顶',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/SetTop',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>置顶</b><br/>置顶所选通知'
    });
    this._buttonCancelTop = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-canceltop',
        text: '取消置顶',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/CancelTop',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>取消置顶</b><br/>取消置顶所选通知'
    });
    this._buttonSetOverdue = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-setoverdue',
        text: '过期',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/SetOverdue',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>过期</b><br/>设置所选通知为过期'
    });
    this._buttonCancelOverdue = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-canceloverdue',
        text: '取消过期',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/CancelOverdue',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>取消过期</b><br/>取消所选通知过期'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新通知列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    Srims.common.AnnouncementGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonDelete, this._buttonSetTop, this._buttonCancelTop, this._buttonSetOverdue, this._buttonCancelOverdue, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonSetTop = this._buttonSetTop;
    this._selection.buttonCancelTop = this._buttonCancelTop;
    this._selection.buttonSetOverdue = this._buttonSetOverdue;
    this._selection.buttonCancelOverdue = this._buttonCancelOverdue;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonSetTop = selection.buttonSetTop;
        var buttonCancelTop = selection.buttonCancelTop;
        var buttonSetOverdue = selection.buttonSetOverdue;
        var buttonCancelOverdue = selection.buttonCancelOverdue;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonSetTop.setVisible(false);
            buttonCancelTop.setVisible(false);
            buttonSetOverdue.setVisible(false);
            buttonCancelOverdue.setVisible(false);
            return;
        }

        var announcement = selection.getSelected();
        buttonShow.show();
        buttonEdit.setVisible(announcement.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!announcement.get('canEdit'));
        buttonDelete.setVisible(announcement.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!announcement.get('canDelete'));
        buttonSetTop.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') != 'Top');
        buttonCancelTop.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') == 'Top');
        buttonSetOverdue.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') != 'Overdue');
        buttonCancelOverdue.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') == 'Overdue');
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.AnnouncementGridPanel_ToolBar, Ext.Toolbar);
