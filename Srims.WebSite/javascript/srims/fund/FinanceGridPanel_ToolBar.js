
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel_ToolBar = function(selection, store, panelId, queryParams, isFinanceManage) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.fund.showFinanceQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费到帐查询</b><br/>对经费到帐信息进行复杂查询'
    });
    this._buttonNewFinance = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新经费到帐',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.newFinance(this.store);
        },
        tooltip: '<b>新经费到帐</b>'
    });

    this._buttonDescend = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-descend',
        text: '下拨/还款',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.fund.showFundDescendManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>下拨经费</b><br/>对所选经费进行下拨'
    });
    this._buttonShowVouchers = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-voucher',
        text: '凭单信息',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.fund.showVouchers(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看凭单信息</b><br/>查看该经费到帐信息对应的所有凭单'
    });

    this._buttonImportAuto = new Ext.Toolbar.Button({
        iconCls: 'icon-finance-auto-import',
        text: '自动从财务导入经费',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.atuoImportFinance(this.store);
        },
        tooltip: '<b>自动从财务导入经费</b>、'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入文科',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.showImportArtsWindow(this.store);
        },
        hidden: false,
        tooltip: '<b>文科项目数据导入</b><br/>将文科项目数据从excel表导入到数据库中'
    });
    this._buttonImportFinance = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入暂存',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.showImportFinanceWindow(this.store);
        },
        hidden: false,
        tooltip: '<b>暂存数据导入</b><br/>将数据从excel表导入到数据库中'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.fund.deleteFinance(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除经费到帐信息</b>'
    });
    this._buttonInvoice = new Ext.Toolbar.Button({
        iconCls: 'icon-invoice-new',
        text: '开发票',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.invoiceFinance(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>自开发票</b>、'
    });
    this._buttonEditInvoice = new Ext.Toolbar.Button({
        iconCls: 'icon-invoice-edit',
        text: '编辑发票',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.invoiceFinance(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>自开发票</b>、'
    });
    this._buttonDeleteInvoice = new Ext.Toolbar.Button({
        iconCls: 'icon-invoice-delete',
        text: '删除发票',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.deleteInvoice(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除发票</b>'
    });

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐列表'
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
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    var items;
    if (isFinanceManage)
        items = [this._buttonImport, this._buttonImportFinance, this._buttonQuery, this._buttonInvoice, this._buttonEditInvoice, this._buttonDeleteInvoice, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    else
        items = [this._buttonImport, this._buttonImportFinance, this._buttonQuery, this._buttonNewFinance, this._buttonImportAuto, this._buttonDescend, this._buttonShowVouchers, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    Srims.fund.FinanceGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    //initial
    this._selection.buttonDescend = this._buttonDescend;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonInvoice = this._buttonInvoice;
    this._selection.buttonEditInvoice = this._buttonEditInvoice;
    this._selection.buttonDeleteInvoice = this._buttonDeleteInvoice;
    this._selection.buttonShowVouchers = this._buttonShowVouchers;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonDescend = selection.buttonDescend;
        var buttonDelete = selection.buttonDelete;
        var buttonInvoice = selection.buttonInvoice;
        var buttonEditInvoice = selection.buttonEditInvoice;
        var buttonDeleteInvoice = selection.buttonDeleteInvoice;
        var buttonShowVouchers = selection.buttonShowVouchers;


        if (selection.getCount() == 0) {
            buttonDescend.hide();
            buttonDelete.hide();
            buttonInvoice.hide();
            buttonEditInvoice.hide();
            buttonDeleteInvoice.hide();
            buttonShowVouchers.hide();
            return;
        }

        var finance = selection.getSelected();

        buttonDescend.setVisible(finance.get('hasPermission_Descend'));

        buttonDelete.setVisible(finance.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!finance.get('canDelete'));

        buttonInvoice.setVisible(finance.get('hasPermission_Invoice'));
        buttonInvoice.setDisabled(!finance.get('canInvoice'));

        buttonDeleteInvoice.setVisible(finance.get('hasPermission_DeleteInvoice'));
        buttonDeleteInvoice.setDisabled(!finance.get('canDeleteInvoice'));

        buttonEditInvoice.setVisible(finance.get('hasPermission_EditInvoice'));
        buttonEditInvoice.setDisabled(!finance.get('canEditInvoice'));

        buttonShowVouchers.setVisible(finance.get('hasPermisson_ShowVouchers'));
        buttonShowVouchers.setDisabled(!finance.get('canShowVouchers'));
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FinanceGridPanel_ToolBar, Ext.Toolbar);
