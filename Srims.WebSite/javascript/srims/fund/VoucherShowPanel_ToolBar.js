
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherShowPanel_ToolBar = function(voucher, store, panelId, isFinanceManage, panel) {

    //fields
    this._voucher = voucher;
    this._panelId = panelId;
    this._store = store;
    //controls
    this._buttonSignIn = new Ext.Toolbar.Button({
        iconCls: 'icon-sign-in',
        text: '签收',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        handler: function() {
            titile = '签收凭单';
            message = '你确定要签收这张凭单吗？';
            action = 'signIn';
            methodName = '/VoucherSignIn';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>签收凭单</b><br/>签收凭单'
    });

    this._buttonReturn = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '退回',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '退回凭单';
            message = '你确定要退回这张凭单吗？';
            action = 'return';
            methodName = '/VoucherReturn';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>退回凭单</b>、'
    });

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-allocate',
        text: '分配',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        hidden: true,
        handler: function() {
            Srims.finance.allocateVoucher(this.voucher, this.store);
        },
        tooltip: '<b>分配</b>'
    });

    this._buttonCancleAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel-allocate',
        text: '取消分配',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        handler: function() {
            titile = '取消分配凭单';
            message = '你确定要取消这张凭单的分配吗？';
            action = 'cancel';
            methodName = '/VoucherCancleAllocate';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>取消分配</b>'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';
            if (this.voucher.get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        disabled:!voucher.get('canResetPrint'),
        hidden: true,
        handler: function() {
            titile = '重置打印';
            message = '你确定要重置打印这张凭单吗？';
            action = 'resetPrint';
            methodName = '/VoucherResetPrint';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        voucher: this._voucher,
        handler: function() {
            Srims.fund.showVoucherFundAllocationInfo(this.voucher);
        },
        hidden: true,
        tooltip: '<b>查看该凭单对应的经费分配情况</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + '/GetById',
                params: {
                    voucherId: this.voucher.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.fund.VoucherXmlReader()
                    });
                    var currentVoucher = store.getAt(0);
                    //var panel = Ext.getCmp(isFinanceManage ? 'PerformanceVoucherFinanceShowPanel' : 'PerformanceVoucherShowPanel' + currentVoucher.get('id'));
                    panel.resetValues(currentVoucher);
                    panel._stateHistoryForm._store.load();
                    panel._voucherOutForm._store.load();
                }
            });
        },
        tooltip: '<b>刷新凭单</b><br/>更新凭单显示信息'
    });
    //initial
    this._buttonPrint.setVisible(voucher.get('hasPermission_Print'));
    this._buttonPrint.setDisabled(!voucher.get('canPrint'));

    this._buttonResetPrint.setVisible(voucher.get('hasPermission_ResetPrint'));
    this._buttonResetPrint.setDisabled(!voucher.get('canResetPrint'));

    this._buttonShowFundAllocation.setVisible(voucher.get('hasPermission_ShowFundAllocation'));
    this._buttonShowFundAllocation.setDisabled(!voucher.get('canShowFundAllocation'));

    this._buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
    this._buttonSignIn.setDisabled(!voucher.get('canSignIn'));

    this._buttonReturn.setVisible(voucher.get('hasPermission_ReturnVoucher'));
    this._buttonReturn.setDisabled(!voucher.get('canReturnVoucher'));

    this._buttonAllocate.setVisible(voucher.get('hasPermission_FinanceAllocate'));
    this._buttonAllocate.setDisabled(!voucher.get('canFinanceAllocate'));

    this._buttonCancleAllocate.setVisible(voucher.get('hasPermission_CancelFinanceAllocate'));
    this._buttonCancleAllocate.setDisabled(!voucher.get('canCancelFinanceAllocate'));

    var items;
    if (isFinanceManage)
        items = [this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonRefresh];
    else
        items = [this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh];
    Srims.fund.VoucherShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });

}
Ext.extend(Srims.fund.VoucherShowPanel_ToolBar, Ext.Toolbar);
