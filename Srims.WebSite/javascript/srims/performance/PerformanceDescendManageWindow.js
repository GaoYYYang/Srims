
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceDescendManageWindow = function(id, performance, store) {

    this._id = id;
    this._performance = performance;

    this._performanceDescendManageWindow_PerformanceInfoPanel = new Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel(performance);
    this._PerformanceAllocationManageWindow_PerformanceAllocationPanel = new Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel(performance, this);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });
    this._buttonDescend = new Ext.Button({
        minWidth: 80,
        text: '下 拨',
        window: this,
        handler: function() {
            var window = this.window;
            if (this.ownerCt._performance.get('isAllocated') == true) {
                Ext.Msg.alert('提示', '该笔钱无可下拨余额');
                return;
            }
            if (this.ownerCt._performance.get('isCancel') == true) {
                Ext.Msg.alert('提示', '该笔钱已作废');
                return;
            }
            Srims.performance.newPerformanceDescend(window._performanceDescendManageWindow_PerformanceInfoPanel._performance, window._PerformanceAllocationManageWindow_PerformanceAllocationPanel._gridPanelPerformanceAllocation.getStore(), window);
        }
    });

    var user = Srims.currentLoginLog.user;


    Srims.performance.PerformanceDescendManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '课题组间接费用和绩效下拨管理',
        iconCls: 'icon-fund-descend-Manage',
        width: 900,
        height: 580,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [this._performanceDescendManageWindow_PerformanceInfoPanel, this._PerformanceAllocationManageWindow_PerformanceAllocationPanel],
        buttons: [this._buttonDescend, this._buttonClose]
    });

    //    this.resetButtonVisibleAndDisabled = function(currentFinance) {

    //    }
    this.on('hide', function() {
        store.load();
    })
}
Ext.extend(Srims.performance.PerformanceDescendManageWindow, Ext.Window);
