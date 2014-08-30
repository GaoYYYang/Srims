/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace(Srims.performance);
Srims.performance.PerformanceShowPanel_ToolBar = function(performance, panelID, store) {
    this._performance = performance;
    this._panelID = panelID;
    this._store = store;

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '绩效分配',
        minWidth: 60,
        performance: this._performance,
        store: this._store,
        handler: function() {

        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b>'
    })
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        performance: this._performance,
        panelID: this._panelID,
        handler: function() {
            var params = {};
            params.id = this.performance.get('id');
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceService
								+ '/GetById',
                params: params,
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.performance
												.PerformanceXmlReader()
                    });
                    var currentPeformance = store.getAt(0);
                    var panel = Ext.getCmp(this.panelID)
                    panel.resetComponentValue(currentPerformance);
                    panel._toolBar
									._resetButtonVisibleAndDisabled(currenPeformance);
                    panel._toolBar._resetButtonPerformance(currentPerformance);
                }
            });
        },
        tooltip: '<b>刷新绩效信息</b>'
    });
    var buttonItems = [this._buttonAllocate,this._buttonRefresh];
    Srims.performance.PeroformanceShowPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: buttonItems,
			    height: 25
			});
}
Ext.extend(Srims.performance.PerformanceShowPanel_ToolBar, Ext.Toolbar);