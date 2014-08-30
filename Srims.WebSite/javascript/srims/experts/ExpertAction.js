
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAction = function() {
};
//专家查询
Srims.experts.ExpertAction.listExpert = function(showExpertQueryPanel) {
    var panelId = 'ExpertGridPanel';
    var expertStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        expertStore = panel.getStore();
    }
    else {
        expertStore = new Srims.experts.ExpertStore(Srims.service.experts.ExpertService + '/Query', queryParams);
        panel = new Srims.experts.ExpertGridPanel(panelId, expertStore, '专家', 'icon-expert-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }

    if (showExpertQueryPanel) {
        Srims.experts.ExpertAction.showExpertQueryPanel(expertStore, queryParams, panel);
    }
};

Srims.experts.ExpertAction.exportExpert = function(filterParams, queryParams) {
    var windowId = 'ExpertExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.experts.ExpertService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息', Srims.experts.ExpertExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('专业信息', Srims.experts.ExpertExport_Column.major);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('联系方式', Srims.experts.ExpertExport_Column.contact);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('简历信息', Srims.experts.ExpertExport_Column.resume);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('统计信息', Srims.experts.ExpertExport_Column.statistic);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Expert');
};
Srims.experts.ExpertAction.showImportExpertWindow = function(store) {
    var windowId = 'ExpertImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.experts.ExpertService + '/Import', '导入专家数据', false);

    window.show();
}

Srims.experts.ExpertAction.showUpdateExpertWindow = function(store) {
    var windowId = 'ExpertUpdateWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.experts.ExpertService + '/Update', '更新专家数据', false);

    window.show();
}
Srims.experts.ExpertAction.showUpdateExpertIDCardWindow = function(store) {
    var windowId = 'ExpertUpdateWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.experts.ExpertService + '/UpdateIdCard', '更新专家数据', false);

    window.show();
}

Srims.experts.ExpertAction.showExpertQueryPanel = function(store, queryParams, gridPanel) {
    var panelId = 'ExpertQueryPanel'
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.experts.ExpertQueryPanel(panelId, store, queryParams, gridPanel)
        Srims.WorkSpace.addPanel(panel);
    }

    gridPanel.queryPanel = panel;

    var map = new Ext.KeyMap(panelId, {
        key: 13,
        fn: function() {
            if (!panel.hidden)
                panel.query(panel._buttonQuery);
        }
    });
};
Srims.experts.ExpertAction.showExpertSelfInfo = function() {
    var user = Srims.currentLoginLog.user;
    var params = {};
    params.expertId = user.expertId;
    Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/GetById',
        params: params,
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.experts.ExpertXmlReader()
            });
            var expert = store.getAt(0);
            Srims.experts.ExpertAction.showExpert(expert, undefined);
        }
    })
};
Srims.experts.ExpertAction.showExpert = function(expert, listStore) {
    var panelId = 'ExpertShowPanel' + expert.get('id');
    var panel = Srims.WorkSpace.active(panelId);

    if (!panel) {
        panel = new Srims.experts.ExpertShowPanel(panelId, expert, listStore);
        Srims.WorkSpace.addPanel(panel);
    }
};
//删除专家
Srims.experts.ExpertAction.DeleteExpert = function(expert, store) {
    Ext.MessageBox.confirm('删除专家', '你确定要删除这个专家吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var _params = {};
            _params.expertID = expert.get('id');
            var panelID = 'ExpertShowPanel' + expert.get('id');

            Ext.Ajax.request({
                url: Srims.service.experts.ExpertService + '/DeleteExpert',
                params: _params,
                scope: this,
                success: function() {
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    store.load();
                }
            });
        }
    }, this);
};

//添加专家
Srims.experts.ExpertAction.newExpert = function() {
    var panelId = 'NewExpertEditPanel';
    if (Srims.WorkSpace.active(panelId))
        return;
    var expert = new Srims.experts.Expert({});
    var panel = new Srims.experts.ExpertEditPanel(panelId, expert);

    Srims.WorkSpace.addPanel(panel);
};
Srims.experts.atuoImportExpert = function(store) {
    var loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在从人事处下载数据，请耐心等待...'
    });
    loadingAnimation.show();

    Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/AutoImport',
        scope: this,
        timeout: 1800000,
        success: function() {
            store.load();
            loadingAnimation.hide();
        }
    });
}
//编辑专家信息——管理员编辑
Srims.experts.ExpertAction.expertEdit = function(expert, expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(true);
    }

    for (var i = 0; i < items.length; i++) {
        var control = items[i][0].getEl().dom;
        control.expert = expert;
        control.panel = expertShowPanel;
        control.item = items[i];
        control.onclick = function() {
            var winID = 'expertEdit' + this.name;
            var window = Ext.getCmp(winID);
            if (!window) {
                window = Srims.experts.ExpertAction.GetExpertEditComponentWindow(winID, this);
                window.show();
            }
        };
    }
};

//编辑专家信息——联系方式管理员编辑联系方式
Srims.experts.ExpertAction.expertLinkWayEdit = function(expert, expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(true);
    }
    for (var i = 0; i < items.length; i++) {
        var control = items[i][0].getEl().dom;
        control.expert = expert;
        control.panel = expertShowPanel;
        control.item = items[i];
        control.onclick = function() {
            var winID = 'expertEdit' + this.name;
            var window = Ext.getCmp(winID);
            if (!window) {
                if (this.item[2] == 'TextField')
                    window = new Srims.experts.ExpertEdit_Administrator_TextField(winID, this.expert, this.panel, this.item);
                window.show();
            }
        };
    }
};

//编辑专家信息——专家自己编辑
Srims.experts.ExpertAction.expertSelfEdit = function(expert, expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(true);
    }

    for (var i = 0; i < items.length; i++) {
        var control = items[i][0].getEl().dom;
        control.expert = expert;
        control.panel = expertShowPanel;
        control.item = items[i];
        control.onclick = function() {
            var winID = 'expertEdit' + this.name;
            var window = Ext.getCmp(winID);
            if (!window) {
                window = Srims.experts.ExpertAction.GetExpertEditComponentWindow(winID, this);
                window.show();
            }
        };
    }
};
Srims.experts.ExpertAction.GetExpertEditComponentWindow = function(winID, control) {
    var window;
    switch (control.item[2]) {
        case 'TextField': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_TextField(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'TextArea': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_TextArea(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'NumberField': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_NumberField(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'EntityComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_EntityComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'NoticeTextComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'DateField': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_DateField(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'ComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_ComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'LinkedEntityComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'LanguageNoticeTextComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'Label': 
            {
                window = new Srims.experts.ExpertUploadWindow(winID, control.expert);
                break;
            }
    }
    return window;
}
//结束编辑
Srims.experts.ExpertAction.finishEdit = function(expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(false);
    }
    for (var i = 0; i < items.length; i++) {
        var item = items[i][0];
        var control = item.getEl().dom;
        control.onclick = function() {
        };
    }

};

//Srims.experts.ExpertAction.queryExpert = function(){
//    var panelId = 'ExpertQueryPanel';
//    var panel = Srims.WorkSpace.active(panelId);
//    var expertStore = undefined;
//    var queryParams = {};
//    
//    if (!panel) {
//        expertStore = new Srims.experts.ExpertStore(Srims.service.experts.ExpertService + '/Query', queryParams);
//        panel = new Srims.experts.ExpertQueryPanel(expertStore, queryParams);
//        Srims.WorkSpace.addPanel(panel);
//    }
//    
//    //    var map = new Ext.KeyMap(id, {
//    //        key: 13,
//    //        fn: function(){
//    //            if (!panel.hidden) 
//    //                panel.query(panel._buttonQuery);
//    //        }
//    //    })
//}
Srims.experts.ExpertAction.showWaitingCensorExpertInfoHistories = function() {
    var panelId = 'WaitingCensorExpertInfoHistoriesGridPanel';
    var store = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        store = panel.getStore();
    }
    else {
        store = new Srims.experts.ExpertInfoHistoryStore(Srims.service.experts.ExpertInfoHistoryService + '/Query', queryParams);
        panel = new Srims.experts.ExpertInfoHistoryGridPanel(panelId, store, '专家历史信息', 'icon-expert-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.experts.ExpertAction.showExpertInfoHistory = function(expertInfoHistory, store) {
    var id = 'ExpertInfoHistoryShowWindow' + expertInfoHistory.get('id');
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.experts.ExpertInfoHistoryShowWindow(id, expertInfoHistory, store);

    window.show();
}
Srims.experts.ExpertAction.CensorExpertInfoHistory = function(expertInfoHistory, store, methodName) {
    expertInfoHistory.data.isSubject = Srims.experts.editEntityTypeIsSubject(expertInfoHistory.data.propertyName);
    Ext.Ajax.request({
        url: Srims.service.experts.ExpertInfoHistoryService + methodName,
        params: expertInfoHistory.data,
        scope: this,
        success: function() {
            store.load();
        }
    });
}
