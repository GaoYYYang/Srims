/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceGridPanel_ToolBar = function(store, selection,
		queryParams, panelID) {
    this._store = store;
    this._panelID = panelID;
    this._selection = selection;
    var user = Srims.currentLoginLog.user;

    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.performance.showPerformanceQueryWindow('Performance_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));

        },
        tooltip: '<b>查询绩效单位</b><br/>填写相应效绩单位信息建立新的绩效单位'
    });

    this._buttonDescendPerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '课题组间接费用和绩效下拨/查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0 || this.selection.getSelected().get('arrivedPerformance') <= 0)
                return;
            Srims.performance.showPerformanceDescendManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>下拨绩效</b><br/>下拨后生成绩效分配条目'
    });

    this._buttonDescendSelectedPerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '课题组间接费和绩效批量下拨',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('课题组间接费和绩效批量下拨', '你确定要下拨所选课题组间接费和绩效吗？该操作会把所选条目剩余可下拨金额一次性完全下拨！', function(button) {
                if (button == 'yes') {
                    var param = '';
                    for (var i = 0; i < selection.selections.length; i++) {
                        param += selection.selections.items[i].get('id');
                        param += ',';
                    }
                    Ext.Ajax.request({
                        url: Srims.service.performance.PerformanceService + '/CheckPositive',
                        params: {
                            performanceIds: param
                        },
                        success: function(response) {
                            if (response.responseText == 'true')
                                Ext.MessageBox.confirm('注意', '所选条目对应的项目存在对课题组间接费用的追缴，请注意下拨金额，继续批量下拨吗？', function(button) {
                                    if (button != 'yes')
                                        return;
                                    Ext.Ajax.request({
                                        url: Srims.service.performance.PerformanceService + '/DescendSelectedPerformance',
                                        params: {
                                            performanceIds: param
                                        },
                                        success: function(response) {
                                            Ext.MessageBox.alert('提示', '已成功下拨' + response.responseText + '条记录！');
                                            store.load();
                                        }
                                    });
                                }, this);
                                else {
                                    Ext.Ajax.request({
                                        url: Srims.service.performance.PerformanceService + '/DescendSelectedPerformance',
                                        params: {
                                            performanceIds: param
                                        },
                                        success: function(response) {
                                            Ext.MessageBox.alert('提示', '已成功下拨' + response.responseText + '条记录！');
                                            store.load();
                                        }
                                    });
                            }

                        }
                    });

                }
            }, this);

        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新绩效单位列表'
    });

    Srims.performance.PerformanceGridPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: [this._buttonQuery, this._buttonDescendPerformance, this._buttonDescendSelectedPerformance, new Ext.Toolbar.Fill(), this._buttonRefresh]
			});
    // initial
    this._selection.buttonQuery = this._buttonQuery;
    this._selection.buttonDescend = this._buttonDescendPerformance;
    this._selection.buttonDescendSelectedPerformance = this._buttonDescendSelectedPerformance;
    // event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonQuery = selection.buttonQuery;
        var buttonDescend = selection.buttonDescend;
        var buttonDescendSelectedPerformance = selection.buttonDescendSelectedPerformance;
        if (selection.getCount() == 0 || selection.getSelected().get('arrivedPerformance') <= 0) {
            buttonDescend.hide();
            buttonDescendSelectedPerformance.hide();
            return;
        }
        buttonDescend.setVisible(user.userRoleType != 'Expert');
        buttonDescendSelectedPerformance.setVisible(user.userRoleType != 'Expert');
    }
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.performance.PerformanceGridPanel_ToolBar, Ext.Toolbar);