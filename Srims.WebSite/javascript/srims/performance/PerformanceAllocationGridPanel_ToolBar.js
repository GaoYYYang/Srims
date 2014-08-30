
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationGridPanel_ToolBar = function(selection, store, panelId, queryParams, canDelete, panel) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._canDelete = canDelete;
    this._panel = panel;

    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        hidden: false,
        handler: function() {
            Srims.performance.showFundAllocationQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费分配查询</b><br/>对经费分配信息进行查询'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看项目',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var performanceAllocation = this.selection.getSelected();
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: performanceAllocation.get('projectID')
                },
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectXmlReader()
                    });
                    var project = store.getAt(0);
                    Srims.projects.showProject(project);
                    //Srims.Load.loadProjectModule('Srims.projects.showProject(project);');
                }
            });
            //Srims.performance.showPerformanceAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看分配</b><br/>显示所选经费分配的详细信息'
    });
    this._buttonAllocatePerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '查看课题组间接费用分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.performance.showPerformanceAllocationInfoByPerformanceAllocation(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配'
    });
    this._buttonEnableAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '开启课题组间接费用和绩效分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('开启分配', '你确定要开启所选分配吗？该操作不可恢复！', function(button) {
                if (button == 'yes') {
                    var param = '';
                    for (var i = 0; i < selection.selections.length; i++) {
                        param += selection.selections.items[i].get('id');
                        param += ',';
                    }
                    Ext.Ajax.request({
                        url: Srims.service.performance.PerformanceAllocationService + '/EnableAllocate',
                        params: {
                            performanceAllocationIds: param
                        },
                        success: function(response) {
                            Ext.MessageBox.alert('提示', '已成功开启' + response.responseText + '条绩效分配！');
                            store.load();
                        }
                    });
                }
            }, this);

        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        panel: this._panel,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var performanceAllocation = this.selection.getSelected();
            if (performanceAllocation.get('canAllocate') == true) {
                Ext.MessageBox.alert('提示', '已开启课题组间接费用和绩效分配，不能删除！');
                return
            }
            var store = this.panel._store;
            Ext.MessageBox.confirm('删除经费下拨', '你确定要删除这个课题组间接费用和绩效下拨吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Ext.Ajax.request({
                        url: Srims.service.performance.PerformanceAllocationService + '/Delete',
                        params: {
                            performanceAllocationId: performanceAllocation.get('id')
                        },
                        success: function(response) {
                            Ext.MessageBox.alert('提示', '已成功删除！');
                            Srims.performance.PerformanceCallBack(store.window, response, store, undefined, true);
                            store.load();
                        }
                    });
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除课题组间接费用和绩效下拨</b><br/>删除选中的未分配课题组间接费用和绩效下拨'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费分配列表'
    });

    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        hidden: this._canDelete,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token', 'fundAllocationState', 'isHorizontal', 'IsStatistic'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var items = [this._buttonQuery, this._buttonShow, this._buttonAllocatePerformance, this._buttonEnableAllocate, this._buttonDelete, new Ext.Toolbar.TextItem('&nbsp;  &nbsp; &nbsp; &nbsp;   <font color="FF0000">  说明：本次分配校内经费值为0时，则该记录由系统自动调整产生。</font>'), new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];

    Srims.performance.PerformanceAllocationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });



    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonAllocatePerformance = this._buttonAllocatePerformance;
    this._selection.buttonEnableAllocate = this._buttonEnableAllocate;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonQuery = this._buttonQuery
    this._selection.canDelete = this._canDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonAllocatePerformance = selection.buttonAllocatePerformance;
        var buttonEnableAllocate = selection.buttonEnableAllocate;
        var buttonQuery = selection.buttonQuery;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonAllocatePerformance.hide();
            buttonEnableAllocate.hide();
            buttonDelete.hide();
            return;
        }
        if (user.userRoleType != 'Expert') {
            if (selection.getSelected().get('canAllocate') != true) {
                buttonEnableAllocate.setVisible(true);
                buttonEnableAllocate.setDisabled(false);
            }
            else {
                buttonEnableAllocate.setVisible(false);
                buttonEnableAllocate.setDisabled(true);
            }
            if (selection.getSelected().get('canAllocate') != true && selection.canDelete == true) {
                buttonDelete.setVisible(true);
                buttonDelete.setDisabled(false);
            }
        }
        buttonShow.setVisible(true);
        buttonShow.setDisabled(false);
        buttonAllocatePerformance.setVisible(true);
        buttonAllocatePerformance.setDisabled(false);
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.performance.PerformanceAllocationGridPanel_ToolBar, Ext.Toolbar);
