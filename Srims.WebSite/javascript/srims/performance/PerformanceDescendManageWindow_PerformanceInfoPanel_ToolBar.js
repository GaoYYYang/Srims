
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar = function(performance, window) {
    //fields
    this._performance = performance;
    this._window = window;

    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">绩效到帐基本信息</b>',
        minWidth: 60
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        window: this._window,
        performance: this._performance,
        handler: function() {
            var store = new Srims.performance.PerformanceSimpleStore(Srims.service.performance.PerformanceService + '/GetByID', {
                performanceId: this.performance.get('id')
            });
            store.window = this.window;
            store.on('load', function() {
                var currentperformance = this.getAt(0);
                this.window.resetComponentValues(currentperformance);
            });
            store.load();
        },
        tooltip: '<b>刷新绩效到帐</b><br/>更新绩效到帐信息'
    });


    var items = [this._buttonHeader, new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
}
Ext.extend(Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar, Ext.Toolbar);
