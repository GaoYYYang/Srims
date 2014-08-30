
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.listPaper = function(showQueryWindow) {
    Srims.papers._listPaper('PaperList', '论文列表', 'icon-paper-list', showQueryWindow);
}
Srims.papers.listLiberalArtsPaper = function(showQueryWindow) {
    Srims.papers._listLiberalArtsPaper('LiberalArtsPaperList', '文科论文列表', 'icon-paper-list', showQueryWindow);
}
Srims.papers._listPaper = function(id, name, iconCls, showQueryWindow) {
    var panelId = 'PaperGridPanel_' + id;
    var paperStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        paperStore = panel.getStore();
        paperStore.load();
    }
    else {
        paperStore = new Srims.papers.PaperStore(Srims.service.papers.PaperService + '/Query', queryParams);
        panel = new Srims.papers.PaperGridPanel(panelId, paperStore, name, iconCls, queryParams);///////
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        Srims.papers.showPaperQueryWindow(panelId + '_QueryWindow', paperStore, false, queryParams, panel);
    }
}

Srims.papers._listLiberalArtsPaper = function(id, name, iconCls, showQueryWindow) {
var panelId = 'LiberalArtsPaperGridPanel_' + id;
    var paperStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        paperStore = panel.getStore();
        paperStore.load();
    }
    else {
        paperStore = new Srims.papers.LiberalArtsPaperStore(Srims.service.papers.LiberalArtsPaperService + '/Query', queryParams); ////获取数据
        panel = new Srims.papers.LiberalArtsPaperGridPanel(panelId, paperStore, name, iconCls, queryParams); /////
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        Srims.papers.showLiberalArtsPaperQueryWindow(panelId + '_QueryWindow', paperStore, false, queryParams, panel);
    }
}

Srims.papers.showPaperQueryWindow = function(id, store, isMagazineQuery, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.papers.PaperQueryWindow(id, store, isMagazineQuery, queryParams);
    }
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

Srims.papers.showLiberalArtsPaperQueryWindow = function(id, store, isMagazineQuery, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.papers.LiberalArtsPaperQueryWindow(id, store, isMagazineQuery, queryParams);
    }
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

Srims.papers.showPaper = function(paper, store) {
    var panelId = "PaperShowPanel_" + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
            var panel = new Srims.papers.PaperShowPanel(panelId, paper, store, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });

}

Srims.papers.showLiberalArtsPaper = function(paper, store) {
var panelId = "LiberalArtsPaperShowPanel_" + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
        var panel = new Srims.papers.LiberalArtsPaperShowPanel(panelId, paper, store, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}



Srims.papers.newPaper = function() {
    var panelId = "NewPaperEditPanel";
    if (Srims.WorkSpace.active(panelId))
        return;
    var paper = new Srims.papers.Paper({});

    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
            var panel = new Srims.papers.PaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}
Srims.papers.newLiberalArtsPaper = function() {

    var panelId = "newLiberalArtsPaperEditPanel";
    if (Srims.WorkSpace.active(panelId))
        return;
    var paper = new Srims.papers.LiberalArtsPaper({});

    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
        var panel = new Srims.papers.LiberalArtsPaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}

Srims.papers.editPaper = function(paper) {
    var panelId = 'PaperEditPanel' + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
            var panel = new Srims.papers.PaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}

Srims.papers.editLiberalArtsPaper = function(paper) {
var panelId = 'LiberalArtsPaperEditPanel' + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
        var panel = new Srims.papers.LiberalArtsPaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}

Srims.papers.deletePaper = function(paper) {

    Ext.MessageBox.confirm('删除论文', '你确定要删除这个论文吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.paperID = paper.get('id');
            Ext.Ajax.request({
                url: Srims.service.papers.PaperService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    var panelEditId = "PaperEditPanel" + paper.get('id');
                    var panelShowId = "PaperShowPanel_" + paper.get('id');
                    closePanel(panelShowId);
                    closePanel(panelEditId);
                    var windowId = "PaperAuthorManageWindow_" + paper.get('id');
                    closeWindow(windowId);
                    Srims.papers.listPaper(false);
                }
            });
        }
    }, this);
}

Srims.papers.deleteLiberalArtsPaper = function(paper) {

    Ext.MessageBox.confirm('删除论文', '你确定要删除这个论文吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.paperID = paper.get('id');
            Ext.Ajax.request({
            url: Srims.service.papers.LiberalArtsPaperService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                var panelEditId = "LiberalArtsPaperEditPanel" + paper.get('id');
                var panelShowId = "LiberalArtsPaperShowPanel_" + paper.get('id');
                    closePanel(panelShowId);
                    closePanel(panelEditId);
                    var windowId = "LiberalArtsPaperAuthorManageWindow_" + paper.get('id');
                    closeWindow(windowId);
                    Srims.papers.listLiberalArtsPaper(false);
                }
            });
        }
    }, this);
}
Srims.papers.showPaperAuthorManageWindow = function(paper) {
    var windowId = 'PaperAuthorManageWindow_' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.papers.PaperAuthorWindow(windowId, paper);
    else
        window._paperAuthorGridPanel.getPaperAuthorStore().load();
    window.show();
}

Srims.papers.showLiberalArtsPaperAuthorManageWindow = function(paper) {
var windowId = 'LiberalArtsPaperAuthorManageWindow_' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.papers.LiberalArtsPaperAuthorWindow(windowId, paper);
    else
        window._paperAuthorGridPanel.getLiberalArtsPaperAuthorStore().load();
    window.show();
}

Srims.papers.newPaperAuthor = function(paper, store, isExpert) {
    var windowId = 'NewPaperAuthor' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        var paperAuthor = new Srims.papers.PaperAuthor({});
        window = new Srims.papers.PaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.editPaperAuthor = function(paper, paperAuthor, store) {
    var windowId = 'EditPaperAuthor' + paperAuthor.get('id');
    var isExpert = false;
    if (paperAuthor.get('expertID'))
        isExpert = true;
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.PaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.deletePaperAuthor = function(paper, paperAuthor, store) {

    Ext.MessageBox.confirm('删除论文作者信息', '你确定要删除这项信息吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.paperAuthorID = paperAuthor.get('id');

            Ext.Ajax.request({
                url: Srims.service.papers.PaperAuthorService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    var panelId = "PaperShowPanel_" + paper.get('id');
                    closePanel(panelId);
                    Srims.papers.showPaper(paper, store);
                }
            });
        }
    }, this);
}


Srims.papers.newLiberalArtsPaperAuthor = function(paper, store, isExpert) {
var windowId = 'NewLiberalArtsPaperAuthor' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        var paperAuthor = new Srims.papers.LiberalArtsPaperAuthor({});
        window = new Srims.papers.LiberalArtsPaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.editLiberalArtsPaperAuthor = function(paper, paperAuthor, store) {
var windowId = 'EditLiberalArtsPaperAuthor' + paperAuthor.get('id');
    var isExpert = false;
    if (paperAuthor.get('expertID'))
        isExpert = true;
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.LiberalArtsPaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.deleteLiberalArtsPaperAuthor = function(paper, paperAuthor, store) {

    Ext.MessageBox.confirm('删除论文作者信息', '你确定要删除这项信息吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.liberalArtsPaperAuthorID = paperAuthor.get('id');

            Ext.Ajax.request({
            url: Srims.service.papers.LiberalArtsPaperAuthorService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    var panelId = "LiberalArtsPaperShowPanel_" + paper.get('id');
                    closePanel(panelId);
                    Srims.papers.showLiberalArtsPaper(paper, store);
                }
            });
        }
    }, this);
}




Srims.papers.exportPaper = function(filterParams, queryParams) {
    var windowId = 'PaperExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.papers.PaperService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息字段', Srims.papers.PaperExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('作者信息字段', Srims.papers.PaperExport_Column.author);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('杂志信息字段', Srims.papers.PaperExport_Column.magazine);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Paper');
}

Srims.papers.exportLiberalArtsPaper = function(filterParams, queryParams) {
    var windowId = 'LiberalArtsPaperExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.papers.LiberalArtsPaperService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('所有信息字段', Srims.papers.LiberalArtsPaperExport_Column.basic);
   
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'LiberalArtsPaper');
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


Srims.papers.showImportWindow = function(store) {
    var windowId = 'PaperImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.PaperService + '/Import', '导入论文数据', false);

    window.show();
}
Srims.papers.showLiberalArtsImportWindow = function(store) {
var windowId = 'LiberalArtsPaperImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.LiberalArtsPaperService + '/Import', '导入论文数据', false);

    window.show();
}
