
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel = function(){
    Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">警告：账本号编辑操作不可撤销，编辑后不可修改，请仔细填写！</span>'
    });
}
Ext.extend(Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel, Ext.Panel);
