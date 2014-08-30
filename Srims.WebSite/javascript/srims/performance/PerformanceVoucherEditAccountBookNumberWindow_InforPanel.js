
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel = function() {
    Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">警告：账本号编辑操作不可撤销，编辑后不可修改，请仔细填写！</span>'
    });
}
Ext.extend(Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel, Ext.Panel);
