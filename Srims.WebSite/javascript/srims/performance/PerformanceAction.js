/**
* @author dulintao//gychange 2013.5.14
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.listPerformance = function() {
    Srims.performance.Performancelist('listPerformance', '课题组间接费用及绩效到账(暂存)', 'icon-fund-waiting-allocation-vertical-project');
}

Srims.performance.Performancelist = function(panelId, title, iconcls) {
    var performanceStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (!panel) {
        performanceStore = new Srims.performance.PerformanceStore(Srims.service.performance.PerformanceService + '/Query', queryParams);
        panel = new Srims.performance.PerformanceGridPanel(panelId, performanceStore, title, iconcls, queryParams);
        //panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
    if (panel)
        performanceStore = panel.getStore();
}


// 查看绩效
Srims.performance.ShowPerformance = function(performance, store) {
    var panelId = 'PerformationShowPanel' + performance.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.performance.PerformanceAllocationShowPanel(panelId, performance);
        Srims.WorkSpace.addPanel(panel);
    }
    if (panel) {
        Srims.WorkSpace.active(panel);
    }

    //    Srims.performance.PerformanceAllocationShowPanel
    //    Ext.Ajax.request({
    //        url: Srims.service.projects.ProjectService + '/GetById',
    //        params: {
    //            projectId: performance.get('projectID')
    //        },
    //        success: function(response) {
    //            var store = new Ext.data.Store({
    //                data: response.responseXML,
    //                reader: new Srims.projects.ProjectXmlReader()
    //            });
    //            var project = store.getAt(0);
    //            Srims.projects.showProject(project);
    //        }
    //    });
}
//查询绩效
Srims.performance.showPerformanceQueryWindow = function(id, store, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.performance.PerformanceQueryWindow(id, store, queryParams);

    // gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
//显示绩效下拨窗口
Srims.performance.showPerformanceDescendManageWindow = function(performance, store) {
    var id = 'PerformanceDescendManageWindow' + performance.get('id');
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.performance.PerformanceDescendManageWindow(id, performance, store);
    window.show();
}
//显示绩效下拨子窗口
Srims.performance.newPerformanceDescend = function(performance, store, manageWindow) {
    var Id = "NewPerformanceDescend" + performance.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        var performanceAllocation = new Srims.performance.PerformanceAllocation({});
        var window = new Srims.performance.PerformanceDescendWindow(Id, performance, performanceAllocation, store, manageWindow);
    }
    window.show();
}

Srims.performance.PerformanceCallBack = function(manageWindow, response, store, window, isStartPoll) {

    if (manageWindow) {
        var performanceStore = new Ext.data.Store({
            data: response.responseXML,
            reader: new Srims.performance.PerformanceSimpleXmlReader()
        });
        var currentperformance = performanceStore.getAt(0);
        manageWindow._performanceDescendManageWindow_PerformanceInfoPanel.resetComponentValues(currentperformance);
        // manageWindow.resetButtonVisibleAndDisabled(currentFinace);
    }

    if (store)
        store.load();

    if (window)
        window.close();

    if (isStartPoll) {
        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingAllocationProjectPerformance);
    }
}