
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherGridPanel_ToolBar = function(selection, store, panelId, queryParams, isFinanceManage, isFundAllocation, fundAllocation, isExpertGuid, isCorrect) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._fundAllocation = fundAllocation;
    if (this._fundAllocation) {
        this._fundAllocation.store = store;
        this._fundAllocation.toobBar = this;
    }
    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">分配产生的凭单信息</b>',
        minWidth: 60
    });
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.performance.showVoucherQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, isFinanceManage, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>凭单查询</b><br/>对凭单信息进行复杂查询'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.performance.editVoucher(this.fundAllocation, this.selection.getSelected(), '绩效');
        },
        hidden: true,
        tooltip: '<b>编辑凭单</b><br/>编辑选中的凭单'
    });
    this._buttonResetAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-edit-account-book-nunber',
        text: '编辑账本号',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.performance.showEditAccountBookNumberWindow(this.selection.getSelected(), this.fundAllocation);
        },
        hidden: true,
        tooltip: '<b>编辑凭单账本号</b><br/>当凭单账本号为新建时，编辑凭单账本号'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除凭单', '你确定要删除这个凭单吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.deleteVoucher(this.selection.getSelected(), this.fundAllocation, isCorrect);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除凭单</b><br/>删除选中的凭单'
    });
    this._buttonShowVoucher = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        isExpert: this._isExpert,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            if (this.isExpert)
                Srims.performance.SetIsReadAndshowVoucher(this.selection.getSelected(), this.store, isFinanceManage);
            else
                Srims.performance.showVoucher(this.selection.getSelected(), this.store, isFinanceManage);
        },
        tooltip: '<b>查看凭单信息</b>'
    });
    this._buttonFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.performance.newVoucher(this.fundAllocation, isCorrect);
        },
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.performance.showVoucherFundAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看该凭单对应的经费分配情况</b>'
    });
    this._buttonSignIn = new Ext.Toolbar.Button({
        iconCls: 'icon-sign-in',
        text: '签收',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '签收凭单';
            message = '你确定要签收这张凭单吗？';
            action = 'signIn';
            methodName = '/VoucherSignIn';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>签收凭单</b><br/>签收凭单'
    });

    this._buttonReturn = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '退回',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '退回凭单';
            message = '你确定要退回这张凭单吗？';
            action = 'return';
            methodName = '/VoucherReturn';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>退回凭单</b>、'
    });

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-allocate',
        text: '分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.allocateVoucher(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>分配</b>'
    });

    this._buttonCancleAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel-allocate',
        text: '取消分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '取消分配凭单';
            message = '你确定要取消这张凭单的分配吗？';
            action = 'cancel';
            methodName = '/VoucherCancleAllocate';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>取消分配</b>'
    });
    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';

            if (this.selection.getSelected().get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '重置打印';
            message = '你确定要重置打印这张凭单吗？';
            action = 'resetPrint';
            methodName = '/VoucherResetPrint';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出已签收凭单',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.finance.exportSignInVoucher(queryParams);
        },
        tooltip: '<b>导出已签收凭单</b><br/>导出已签收凭单'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        toolbar: this,
        fundAllocation: this._fundAllocation,
        handler: function() {
            this.store.load();

            //用于数据纠错
            if (isCorrect)
                Ext.Ajax.request({
                    url: Srims.service.fund.FundAllocationService + '/GetById',
                    params: {
                        fundAllocationId: fundAllocation.get('id')
                    },
                    scope: this,
                    success: function(response) {
                        var fundAllocationstore = new Ext.data.Store({
                            data: response.responseXML,
                            reader: new Srims.fund.FundAllocationXmlReader()
                        });
                        var currentFundAllocation = fundAllocationstore.getAt(0);
                        currentFundAllocation.panel = this.fundAllocation.panel;
                        currentFundAllocation.store = this.store;
                        currentFundAllocation.toobBar = this.toobBar;
                        this.toolbar.resetComponentFundAllocation(currentFundAllocation);
                    }
                });
        },
        tooltip: '<b>刷新列表</b><br/>更新凭单财务列表列表'
    });

    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            if (isFinanceManage)
                queryParams.voucherState = Srims.fund.FinanceVoucherState;
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    var items;
    if (isFundAllocation) {
        if (isExpertGuid)
            items = [this._buttonHeader, this._buttonShowVoucher, this._buttonEdit, this._buttonDelete, this._buttonResetAccountBookNumber]
        else {
            if (isCorrect)
                items = [this._buttonFundAllocation, this._buttonShowVoucher, this._buttonEdit, this._buttonDelete, this._buttonResetAccountBookNumber, new Ext.Toolbar.Fill(), this._buttonRefresh];
            else
                items = [this._buttonShowVoucher, this._buttonEdit, this._buttonDelete, this._buttonResetAccountBookNumber];
        }
    }
    else {
        if (isFinanceManage)
            items = [this._buttonQuery, this._buttonShowVoucher, this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonExport, this._buttonRefresh, this._buttonReset];
        else
            items = [this._buttonQuery, this._buttonShowVoucher, this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }
    Srims.performance.PerformanceVoucherGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });
    //initial
    this._selection.buttonShowVoucher = this._buttonShowVoucher;
    this._selection.buttonPrint = this._buttonPrint;
    this._selection.buttonResetPrint = this._buttonResetPrint;
    this._selection.buttonSignIn = this._buttonSignIn;
    this._selection.buttonReturn = this._buttonReturn;
    this._selection.buttonAllocate = this._buttonAllocate;
    this._selection.buttonCancleAllocate = this._buttonCancleAllocate;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonResetAccountBookNumber = this._buttonResetAccountBookNumber;
    this._selection.buttonShowFundAllocation = this._buttonShowFundAllocation;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShowVoucher = selection.buttonShowVoucher;
        var buttonPrint = selection.buttonPrint;
        var buttonResetPrint = selection.buttonResetPrint;
        var buttonSignIn = selection.buttonSignIn;
        var buttonReturn = selection.buttonReturn;
        var buttonAllocate = selection.buttonAllocate;
        var buttonCancleAllocate = selection.buttonCancleAllocate;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonResetAccountBookNumber = selection.buttonResetAccountBookNumber;
        var buttonShowFundAllocation = selection.buttonShowFundAllocation;

        if (selection.getCount() == 0) {
            buttonShowVoucher.hide();
            buttonPrint.hide();
            buttonResetPrint.hide();
            buttonSignIn.hide();
            buttonReturn.hide();
            buttonAllocate.hide();
            buttonCancleAllocate.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonResetAccountBookNumber.hide();
            buttonShowFundAllocation.hide();
            return;
        }

        var voucher = selection.getSelected();

        buttonResetAccountBookNumber.setVisible(voucher.get('hasPermission_ResetAccountBookNumber'));
        buttonResetAccountBookNumber.setDisabled(!voucher.get('canResetAccountBookNumber'));

        if (!isCorrect) {
            buttonEdit.setVisible(voucher.get('hasPermission_Edit'));
            buttonEdit.setDisabled(!voucher.get('canEdit'));

            buttonDelete.setVisible(voucher.get('hasPermission_Delete'));
            buttonDelete.setDisabled(!voucher.get('canDelete'));
        }
        else {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);

            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
        }

        buttonShowFundAllocation.setVisible(voucher.get('hasPermission_ShowFundAllocation'));
        buttonShowFundAllocation.setDisabled(!voucher.get('canShowFundAllocation'));

        buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
        buttonSignIn.setDisabled(!voucher.get('canSignIn'));

        buttonShowVoucher.setVisible(voucher.get('hasPermission_Show'));
        buttonShowVoucher.setDisabled(!voucher.get('canShow'));

        buttonPrint.setVisible(voucher.get('hasPermission_Print'));
        buttonPrint.setDisabled(!voucher.get('canPrint'));

        buttonResetPrint.setVisible(voucher.get('hasPermission_ResetPrint'));
        buttonResetPrint.setDisabled(!voucher.get('canResetPrint'));

        buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
        buttonSignIn.setDisabled(!voucher.get('canSignIn'));

        buttonReturn.setVisible(voucher.get('hasPermission_ReturnVoucher'));
        buttonReturn.setDisabled(!voucher.get('canReturnVoucher'));

        buttonAllocate.setVisible(voucher.get('hasPermission_FinanceAllocate'));
        buttonAllocate.setDisabled(!voucher.get('canFinanceAllocate'));

        buttonCancleAllocate.setVisible(voucher.get('hasPermission_CancelFinanceAllocate'));
        buttonCancleAllocate.setDisabled(!voucher.get('canCancelFinanceAllocate'));
    }
    this.resetComponentFundAllocation = function(currentFundAllocation) {
        this._buttonEdit.fundAllocation = currentFundAllocation;
        this._buttonDelete.fundAllocation = currentFundAllocation;
        this._buttonFundAllocation.fundAllocation = currentFundAllocation;
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.performance.PerformanceVoucherGridPanel_ToolBar, Ext.Toolbar);
