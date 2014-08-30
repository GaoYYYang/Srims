
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.listStamps = function() {
    Srims.stamp._listStamps('StampList', '文印列表', 'icon-stamp-list', '/Query', undefined);
}
Srims.stamp.listDepartmentStamps = function() {
    Srims.stamp._listStamps('DepartmentStampList', '文印列表', 'icon-stamp-list', '/Query', Srims.stamp.StampState.CensorPass);
}
Srims.stamp.listMyStamps = function() {
    Srims.stamp._listStamps('MyStampList', '我的文印列表', 'icon-stamp-list', '/Query', undefined);
}
Srims.stamp.listWaitingCensorStamps = function() {
    Srims.stamp._listStamps('WaitingCensorStampList', '待审核文印列表', 'icon-stamp-list', '/QueryForCensor', Srims.stamp.StampState.UnSubmit);
}
Srims.stamp.listWaitingStampStamps = function() {
    Srims.stamp._listStamps('WaitingStampStampList', '待盖章文印列表', 'icon-stamp-list', '/QueryForStampFeedback', Srims.stamp.StampState.DepartmentCensorPass);
}
Srims.stamp.listWaitingDepartmentCensorStamps = function() {
    Srims.stamp._listStamps('WaitingDepartmentCensorStampList', '部门待审核文印列表', 'icon-stamp-list', '/QueryForDepartmentCensor', Srims.stamp.StampState.WaitDepartmentCensor);
}
Srims.stamp._listStamps = function(id, name, iconCls, queryMethodName, stampState, showApplyWindow) {
    var panelId = 'StampApplicationGridPanel_' + id;
    var store = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        store = panel.getStore();
        store.load();
    } else {
        store = new Srims.stamp.StampApplicationStore(Srims.service.stamp.StampApplicationService + queryMethodName, queryParams);
        panel = new Srims.stamp.StampApplicationGridPanel(panelId, store, name, iconCls, queryParams, stampState);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.stamp.showStampApplicationQueryWindow = function(id, store, queryParams, gridPanel, stampState) {
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.stamp.StampApplicationQueryWindow(id, store, queryParams, stampState);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.stamp.newStampApplication = function(store) {
    var panelId = 'NewStampApplication';
    if (Srims.WorkSpace.active(panelId))
        return;
    var stampApplication = new Srims.stamp.StampApplication({});

    var panel = new Srims.stamp.StampApplicationEditPanel(panelId, stampApplication, store);
    Srims.WorkSpace.addPanel(panel);
}
Srims.stamp.editStampApplication = function(stampApplication, store) {
    var panelId = 'EditStamp' + stampApplication.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.stamp.StampApplicationEditPanel(panelId, stampApplication, store);
    Srims.WorkSpace.addPanel(panel);
}
Srims.stamp.editStampApplicationBasicInfor = function(stampApplication, store) {
    var windowId = 'EditStamp' + stampApplication.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampApplicationEditWindow(windowId, stampApplication, store);
    window.show();
}
Srims.stamp.showStampApplication = function(stampApplication, store, stampState) {
    var panelId = '';
    if (stampState == undefined)
        panelId = 'StampApplicationShowPanel' + stampApplication.get('id');
    if (stampState == Srims.stamp.StampState.UnSubmit)
        panelId = 'StampApplicationShowPanelForCensor' + stampApplication.get('id');
    if (stampState == Srims.stamp.StampState.DepartmentCensorPass)
        panelId = 'StampApplicationShowPanelForStamp' + stampApplication.get('id');
    if (stampState == Srims.stamp.StampState.CensorPass)
        panelId = 'StampApplicationShowPanelForDepartmentCensorPassStamp' + stampApplication.get('id');

    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.stamp.StampApplicationShowPanel(panelId, stampApplication, store, stampState);
    Srims.WorkSpace.addPanel(panel);
}
Srims.stamp.showStuffManangeWindow = function(stampApplication, stampApplicationStore) {
    var windowId = "StuffManageWindow" + stampApplication.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StuffManageWindow(windowId, stampApplication, stampApplicationStore);
    else
        window._stuffGridPanel.getStuffStore().load();
    window.show();
}
Srims.stamp.deleteStampApplication = function(stampApplication, store) {
    Ext.MessageBox.confirm('删除文印', '你确定要删除这个文印吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stampApplicationID = stampApplication.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StampApplicationService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStampApplication" + stampApplication.get('id');
                    closeWindow(windowId);
                    if (store)
                        store.load();
                }
            });
        }
    }, this);
}
Srims.stamp.addStuffAndStampInfor = function(stampApplication, stuffStore) {
    var windowId = "AddStuffAndStamp";
    var window = Ext.getCmp(windowId);
    if (!window) {
        var stuff = new Srims.stamp.Stuff({});
        window = new Srims.stamp.StampApplicationEditPanel_StuffStampForm(windowId, stuffStore, stuff, stampApplication);
    }
    window.show();
}
Srims.stamp.editStuffAndStampInfor = function(stuff, stampApplication, stuffStore) {
    var windowId = "EditStuffAndStamp" + stuff.get('id');
    var window = Ext.getCmp(windowId)
    if (!window) {
        window = new Srims.stamp.StampApplicationEditPanel_StuffStampForm(windowId, stuffStore, stuff, stampApplication);
    }
    window.show();
}
Srims.stamp.newStuff = function(store, stampApplication, stampApplicationStore) {
    var windowId = "NewStuff";
    var window = Ext.getCmp(windowId)
    if (!window) {
        var stuff = new Srims.stamp.Stuff({});
        window = new Srims.stamp.StuffEditWindow(windowId, stuff, stampApplication, store, stampApplicationStore);
    }
    window.show();
}
Srims.stamp.editStuff = function(stuff, store, stampApplication, stampApplicationStore) {
    if (!stuff.isNew()) {
        var windowId = "EditStuff" + stuff.get('id');
        var window = Ext.getCmp(windowId)
        if (!window)
            window = new Srims.stamp.StuffEditWindow(windowId, stuff, stampApplication, store, stampApplicationStore);
        window.show();
    }
}
Srims.stamp.deleteStuff = function(stuff, store, stampApplication, stampApplicationStore) {
    Ext.MessageBox.confirm('删除用印文件', '你确定要删除这个用印文件吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stuffID = stuff.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StuffService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    if (stampApplicationStore)
                        stampApplicationStore.load();
                    var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStamp" + stampApplication.get('id');
                    closeWindow(windowId);
                    Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
                }
            });
        }
    }, this);
}
Srims.stamp.removeStuff = function(stuff, stuffStore) {
    stuffStore.remove(stuff);
}
Srims.stamp.showStuffStampManageWindow = function(stuff, stuffStore, stampApplication, stampApplicationStore) {
    var windowId = "StuffStampManageWindow" + stuff.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StuffStampManageWindow(windowId, stuff, stuffStore, stampApplication, stampApplicationStore);
    else
        window._stuffStampGridPanel.getStuffStampStore().load();
    window.show();
}
Srims.stamp.newStuffStamp = function(store, stuff, stuffStore, stampApplication, stampApplicationStore) {
    var windowId = "NewStuffStamp";
    var window = Ext.getCmp(windowId)
    if (!window) {
        var stuffStamp = new Srims.stamp.StuffStamp({});
        window = new Srims.stamp.StuffStampEditWindow(windowId, stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore);
    }
    window.show();
}
Srims.stamp.editStuffStamp = function(stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore) {
    var windowId = "EditStuffStamp" + stuffStamp.get('id');
    var window = Ext.getCmp(windowId)
    if (!window)
        window = new Srims.stamp.StuffStampEditWindow(windowId, stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore);
    window.show();
}
Srims.stamp.deleteStuffStamp = function(stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore) {
    Ext.MessageBox.confirm('删除文件用印', '你确定要删除这个文件用印吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stuffStampID = stuffStamp.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StuffStampService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    stuffStore.load();
                    if (stampApplicationStore)
                        stampApplicationStore.load();
                    var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStampApplication" + stampApplication.get('id');
                    closeWindow(windowId);
                    Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
                }
            });
        }
    }, this);
}
Srims.stamp.changeStampState = function(stampApplication, store, title, message, methodName, stampState, remark) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stampApplicationID = stampApplication.get('id');
            params.remark = String.isEmpty(remark) ? '' : remark;
            Ext.Ajax.request({
                url: Srims.service.stamp.StampApplicationService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    if (store)
                        store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.stamp.StampApplicationXmlReader()
                    });
                    var editedStampApplication = newstore.getAt(0);
                    var panelId = '';
                    if (!stampState)
                        panelId = 'StampApplicationShowPanel' + editedStampApplication.get('id');
                    if (stampState == Srims.stamp.StampState.UnSubmit)
                        panelId = 'StampApplicationShowPanelForCensor' + editedStampApplication.get('id');
                    if (stampState == Srims.stamp.StampState.DepartmentCensorPass)
                        panelId = 'StampApplicationShowPanelForStamp' + editedStampApplication.get('id');
                    if (stampState == Srims.stamp.StampState.CensorPass)
                        panelId = 'StampApplicationShowPanelForDepartmentCensor' + editedStampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStampApplication" + editedStampApplication.get('id');
                    closeWindow(windowId);
                    if (!stampState || stampState == Srims.stamp.StampState.UnSubmit)
                        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorStamp());
                    Srims.stamp.showStampApplication(editedStampApplication, store, stampState);
                }
            });
        }
    }, this);
}
Srims.stamp.showStampManageWindow = function() {
    var windowId = "StampManageWindow";
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampManageWindow(windowId);
    else
        window._stampGridPanel.getStampStore().load();
    window.show();
}
Srims.stamp.newStamp = function(store) {
    var windowId = "NewStamp";
    var window = Ext.getCmp(windowId)
    if (!window) {
        var stamp = new Srims.stamp.Stamp({});
        window = new Srims.stamp.StampEditWindow(windowId, stamp, store);
    }
    window.show();
}
Srims.stamp.editStamp = function(stamp, store) {
    var windowId = "EditStamp" + stamp.get('id');
    var window = Ext.getCmp(windowId)
    if (!window)
        window = new Srims.stamp.StampEditWindow(windowId, stamp, store);
    window.show();
}
Srims.stamp.deleteStamp = function(stamp, store) {
    Ext.MessageBox.confirm('删除图章', '你确定要删除这个图章吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stampID = stamp.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StampService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                }
            });
        }
    }, this);
}
Srims.stamp.showStampRejectWindow = function(stampApplication, store, methodName, stampState) {
    var windowId = "RejectStamp" + stampApplication.get('id');
    var window = Ext.getCmp(windowId)
    if (!window)
        window = new Srims.stamp.StampCensorRejectWindow(windowId, stampApplication, store, methodName, stampState);
    window.show();
}
function closePanel(panelId) {
    if (Srims.WorkSpace.active(panelId)) {
        var panel = Ext.getCmp(panelId);
        Srims.WorkSpace.getWorkSpace().remove(panel);
    }
}

function closeWindow(windowId) {
    var window = Ext.getCmp(windowId);
    if (window)
        window.close();
}

Srims.stamp.downLoadStuffDoucment = function(stuff) {
    var stuffResource = stuff.get('stuffDocument');
    if (stuffResource == '' || stuffResource == null || stuffResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(stuff.get('stuffDocument'), '/GetStuffDocument');
};
