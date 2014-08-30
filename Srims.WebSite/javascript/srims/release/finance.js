
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.Finance = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'receivedDate',
    type: 'date',
    mapping: 'ReceivedDate'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'isInvoiced',
    type: 'bool',
    mapping: 'IsInvoiced',
    convert: Boolean.toBoolean
}, {
    name: 'invoiceType',
    type: 'string',
    mapping: 'InvoiceType'
}, {
    name: 'invoiceTime',
    type: 'date',
    mapping: 'InvoiceTime'
}, {
    name: 'invoiceNumber',
    type: 'string',
    mapping: 'InvoiceNumber'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'descendAmount',
    type: 'int',
    mapping: 'DescendAmount'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}, {
    name: 'remarks',
    type: 'string',
    mapping: 'Remarks'
}, {
    name: 'hasPermission_Show',
    type: 'bool',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'bool',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Descend',
    type: 'bool',
    mapping: 'HasPermission_Descend',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Invoice',
    type: 'bool',
    mapping: 'HasPermission_Invoice',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteInvoice',
    type: 'bool',
    mapping: 'HasPermission_DeleteInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditInvoice',
    type: 'bool',
    mapping: 'HasPermission_EditInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermisson_ShowVouchers',
    type: 'bool',
    mapping: 'HasPermisson_ShowVouchers',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'bool',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'bool',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canDescend',
    type: 'bool',
    mapping: 'CanDescend',
    convert: Boolean.toBoolean
}, {
    name: 'canInvoice',
    type: 'bool',
    mapping: 'CanInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteInvoice',
    type: 'bool',
    mapping: 'CanDeleteInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'canEditInvoice',
    type: 'bool',
    mapping: 'CanEditInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'canShowVouchers',
    type: 'bool',
    mapping: 'CanShowVouchers',
    convert: Boolean.toBoolean
}]);

Srims.data.Entity.apply(Srims.fund.Finance);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeText = Ext.data.Record.create([{
    name: 'value',
    type: 'string',
    mapping: 'Value'
}, {
    name: 'valueSpell',
    type: 'string',
    mapping: 'ValueSpell'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}]);
Srims.data.Entity.apply(Srims.common.NoticeText);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeTextStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url, type){
        Srims.common.NoticeTextStore.superclass.constructor.call(this, new Srims.common.NoticeTextXmlReader(), url, {
            type: type
        });
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});

if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceBak = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'receivedDate',
    type: 'date',
    mapping: 'ReceivedDate'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}]);

Srims.data.Entity.apply(Srims.finance.FinanceBak);

if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceBakXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.finance.FinanceBakXmlReader.superclass.constructor.call(this, Srims.finance.FinanceBak);
    }
});

if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.finance.FinanceBakStore.superclass.constructor.call(this, new Srims.finance.FinanceBakXmlReader(), load_url, params);
    }
});

if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakGridPanel_ColumnModel = function(){
    Srims.finance.FinanceBakGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '到款时间',
        dataIndex: 'receivedDate',
        width: 100,
        sortable: true,
        renderer: Date.render
    }, {
        header: '凭单号',
        dataIndex: 'voucherNumber',
        sortable: true,
        width: 80
    }, {
        header: '金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '说明',
        dataIndex: 'abstract',
        width: 150
    }])
}
Ext.extend(Srims.finance.FinanceBakGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakGridPanel_ToolBar = function(store, panelId, queryParams){

    //fields
    this._panelId = panelId;
    this._store = store;
    
    //control
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.finance.exportFinanceBak(queryParams);
        },
        tooltip: '<b>导出财务经费到帐信息</b><br/>导出财务经费到帐信息'
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonExport.setVisible(user.isSurper || user.hasPermission_ExportFinanceData);
    
    Srims.finance.FinanceBakGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonExport]
    });
    
}
Ext.extend(Srims.finance.FinanceBakGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.finance) 
    Ext.namespace('Srims.finance');

Srims.finance.FinanceBakGridPanel = function(id, financeBakStore, title, iconCls, queryParams){

    this._store = financeBakStore;
    this._store.gird = this;
    
    this._columnModel = new Srims.finance.FinanceBakGridPanel_ColumnModel();
    
    this._toolBar = new Srims.finance.FinanceBakGridPanel_ToolBar(this._store, id, queryParams);
    
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.finance.FinanceBakGridPanel.superclass.constructor.call(this, params);
    
}
Ext.extend(Srims.finance.FinanceBakGridPanel, Srims.component.GridPanel, {});

if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceBakExport_Column = function(){
}

Srims.finance.FinanceBakExport_Column.basic = [['receivedDate', '到款日期', 'Date', '50'], ['voucherNumber', '凭单号', , '60'], ['amount', '数额(万元)', 'moneyRender', '50'], ['abstract', '说明', , '150']];

if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.VoucherExport_Column = function(){
}

Srims.finance.VoucherExport_Column.basic = [['VoucherNumber', '凭单号', , '150'], ['ExpertName', '专家', , '50'], ['ProjectName', '项目', , '150'], ['Amount', '总额', 'moneyRender', '60'],
 ['VoucherState', '状态', 'enum', '60'], ['FinanceAllocationDateTime', '财务分配日期', 'Date', '60'], ['FinanceNumber', '财务制单号', , '60'], ['AccountBookNumber', '账本号', , '80'], 
 ['AllocationHardware', '硬件费', 'moneyRender', '60'], ['AllocationIn', '校内分配', 'moneyRender', '60'], ['AllocationOut', '外协分配', 'moneyRender', '60'], ['OverheadExpensesIn', '校内分配管理费', 'moneyRender', '80'],
  ['OverheadExpensesOut', '外协分配管理费', 'moneyRender', '100'], ['OverheadExpenses', '管理费', 'moneyRender', '100'],
   ['IsRead', '已读', 'Boolean', '80']];

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel_ColumnModel = function(isFinanceManage, isExpertGuid){
    Srims.fund.FinanceGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '到款时间',
        dataIndex: 'receivedDate',
        width: 100,
        sortable: true,
        renderer: Date.render
    }, {
        header: '凭单号',
        dataIndex: 'voucherNumber',
        sortable: true,
        width: 80
    }, {
        header: '金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '已下拨金额(万元)',
        dataIndex: 'descendAmount',
        sortable: true,
        width: 80,
        renderer: Money.render,
        hidden: isFinanceManage
    }, {
        header: '发票类型',
        dataIndex: 'invoiceType',
        sortable: true,
        width: 100
    }, {
        header: '发票时间',
        dataIndex: 'invoiceTime',
        renderer: Date.render,
        sortable: true,
        width: 80
    }, {
        header: '发票号',
        dataIndex: 'invoiceNumber',
        sortable: true,
        width: 80
    }, {
        header: '说明',
        dataIndex: 'abstract',
        width: 150
		}, {
        header: '备注',
        dataIndex: 'remarks',
        width: 150
    }])
}
Ext.extend(Srims.fund.FinanceGridPanel_ColumnModel, Ext.grid.ColumnModel)

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

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel = function(id, financeStore, title, iconCls, queryParams, isFinanceManage){

    this._store = financeStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FinanceGridPanel_ColumnModel(isFinanceManage);
    
    this._toolBar = new Srims.fund.FinanceGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage);
    this._textItemFinanceSum = new Ext.Toolbar.TextItem('');
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._store,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFinanceSum]
    });
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;                                                 
    params.bbar = this._bbar;
    
    Srims.fund.FinanceGridPanel.superclass.constructor.call(this, params);
    
    this._store.on('load', function(store, records){
        if (records.financeSum == undefined || records.financeSum == null) 
            records.financeSum = records.financeDescendSum = 0;
        
        var financeSumMessage = String.format(" 总经费：<strong>{0}</strong>，已下拨经费：<strong>{1}</strong>", Money.render(records.financeSum), Money.render(records.financeDescendSum));
        Ext.get(store.gird._textItemFinanceSum.id).update(financeSumMessage);
    });
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var finance = grid.getStore().getAt(rowIndex);
        if (!isFinanceManage) 
            Srims.fund.showFundDescendManageWindow(finance, grid.getStore());
    }
}
Ext.extend(Srims.fund.FinanceGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceStore.superclass.constructor.call(this, new Srims.fund.FinanceXmlReader(), load_url, params);
    }
});
Srims.fund.FinanceSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceStore.superclass.constructor.call(this, new Srims.fund.FinanceSimpleXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceXmlReader.superclass.constructor.call(this, Srims.fund.Finance);
    },
    readRecords: function(responseXML){
        var result = Srims.fund.FinanceXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.financeSum = parseInt(Ext.DomQuery.selectValue("FinanceSum", responseXML), 10);
        result.records.financeDescendSum = parseInt(Ext.DomQuery.selectValue("FinanceDescendSum", responseXML), 10);
        
        return result;    
    }
});
Srims.fund.FinanceSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceSimpleXmlReader.superclass.constructor.call(this, Srims.fund.Finance);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceStateStore = [['True', '已下拨完'], ['False', '未下拨完'], ['', '全部']];

Srims.fund.FinanceQueryWindow_InforPanel = function(){

    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._dateFieldReceiveDateBegin = new Ext.form.DateField({
        fieldLabel: '到帐日期',
        width: 150
    });
    this._dateFieldReceiveDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._numberFieldAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        width: 150
    });
    this._numberFieldAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 150
    });
    this._comboBoxIsDescendAll = new Ext.form.ComboBox({
        fieldLabel: '状态',
        store: Srims.fund.FinanceStateStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._checkBoxIsInvoiced = new Ext.form.Checkbox({
        fieldLabel: '是否已开发票'
    });
    this._textFieldAbstract = new Ext.form.TextField({
        fieldLabel: '摘要',
        width: 150
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._dateFieldReceiveDateBegin, this._numberFieldAmountBegin, this._checkBoxIsInvoiced];
    var columnSecondItems = [this._comboBoxIsDescendAll, this._dateFieldReceiveDateEnd, this._numberFieldAmountEnd, this._textFieldAbstract];
    
    Srims.fund.FinanceQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 40,
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.buildParams = function(params){
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.isDescendAll = this._comboBoxIsDescendAll.getValue();
        params.isInvoiced = this._checkBoxIsInvoiced.checked ? "true" : "";
        params.amountStart = this._numberFieldAmountBegin.getMoney();
        params.amountEnd = this._numberFieldAmountEnd.getMoney();
        params.receivedDateStart = Date.format(this._dateFieldReceiveDateBegin.getValue());
        params.receivedDateEnd = Date.format(this._dateFieldReceiveDateEnd.getValue());
        params.financeAbstract = this._textFieldAbstract.getValue();
    }
    
    this.clearParams = function(){
        this._textFieldVoucherNumber.reset();
        this._comboBoxIsDescendAll.reset();
        this._numberFieldAmountBegin.reset();
        this._numberFieldAmountEnd.reset();
        this._dateFieldReceiveDateBegin.reset();
        this._dateFieldReceiveDateEnd.reset();
        this._checkBoxIsInvoiced.reset();
        this._textFieldAbstract.reset();
    }
}
Ext.extend(Srims.fund.FinanceQueryWindow_InforPanel, Ext.FormPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceQueryWindow = function(id, store, queryParams){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.fund.FinanceQueryWindow_InforPanel();
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.FinanceQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费到帐查询',
        iconCls: 'icon-finance-query',
        width: 500,
        height: 197,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 500,
            layout: 'form',
            labelWidth: 90,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.fund.FinanceQueryWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listFinance = function(){
    Srims.fund._listFinance('FinanceList', '经费到帐计划列表', 'icon-fund-finance');
}
Srims.fund._listFinance = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    queryParams.isDescendAll = false;
    
    if (panel) {
        financeStore = panel.getStore();
        financeStore.load();
    }
    else {
        financeStore = new Srims.fund.FinanceStore(Srims.service.fund.FinanceService + '/Query', queryParams);
        panel = new Srims.fund.FinanceGridPanel(panelId, financeStore, name, iconCls, queryParams, false);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.fund.showFinanceQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.fund.FinanceQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.newFinance = function(store){
    var Id = "NewFinanceWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var finance = new Srims.fund.Finance({});
        var window = new Srims.fund.FinanceEditWindow(Id, finance, store);
    }
    window.show();
}
Srims.fund.deleteFinance = function(finance, store){
    Ext.MessageBox.confirm('删除经费到帐', '你确定要删除这个经费到帐信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.financeID = finance.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.fund.FinanceService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    store.load();
                }
            });
        }
    }, this);
}
Srims.fund.atuoImportFinance = function(store){
    var loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在从财务处下载数据，请耐心等待...'
    });
    loadingAnimation.show();
    
    Ext.Ajax.request({
        url: Srims.service.fund.FinanceService + '/AutoImportFinance',
        scope: this,
        success: function(){
            store.load();
            loadingAnimation.hide();
        }
    });
}
Srims.fund.showVouchers = function(finance){
    var windowId = "financeVouchersShowWindow_" + finance.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.fund.FinanceVouchersShowWindow(windowId, finance);
    
    window.show();
}

Srims.fund.showImportArtsWindow = function(store){
    var windowId = 'ArtsImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.FinanceService + '/Import', '文科项目数据导入', false);
    
    window.show();
}

Srims.fund.showImportFinanceWindow = function(store) {
    var windowId = 'FinanceImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.FinanceService + '/ImportFinance', '暂存数据导入', false);

    window.show();
}
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceShowForm = function(finance, isBorrow){

    this._finance = finance;
    
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '金额',
        value: Money.render(finance.get('amount')),
        readOnly: true,
        width: 160
    });
    this._textFieldReceivedTime = new Ext.form.TextField({
        fieldLabel: '到帐时间',
        value: Date.render(finance.get('receivedDate')),
        readOnly: true,
        width: 160
    });
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        value: finance.get('voucherNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '描述',
        value: finance.get('abstract'),
        readOnly: true,
        width: 300
    });
    this._textFieldIsBorrowReamrk = new Ext.form.TextField({
        fieldLabel: '特别说明：',
        value: '此经费来源于借款',
        readOnly: true,
        width: 300
    });
    var columnFirstItems = [this._textFieldReceivedTime, this._textFieldAmount];
    var columnSecondItems = [this._textFieldVoucherNumber];
    
    Srims.fund.FinanceShowForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: isBorrow ? [this._textFieldIsBorrowReamrk] : [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    
    this.resetComponnentsValue = function(finance){
        this._textFieldAmount.setValue(Money.render(finance.get('amount')));
        this._textFieldReceivedTime.setValue(Date.render(finance.get('receivedDate')));
        this._textFieldVoucherNumber.setValue(finance.get('voucherNumber'));
        this._textFieldRemark.setValue(finance.get('abstract'));
    }
}

Ext.extend(Srims.fund.FinanceShowForm, Ext.form.FormPanel, {});
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'allocationDateTime',
    type: 'date',
    mapping: 'AllocationDateTime'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'allocationTotal',
    type: 'int',
    mapping: 'AllocationTotal'
}, {
    name: 'allocationIn',
    type: 'int',
    mapping: 'AllocationIn'
}, {
    name: 'allocationOut',
    type: 'int',
    mapping: 'AllocationOut'
},
{
    name: 'allocationWantOut',
    type: 'int',
    mapping: 'AllocationWantOut'
}, {
    name: 'performanceTotal',
    type: 'int',
    mapping: 'PerformanceTotal'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'allocationHardware',
    type: 'int',
    mapping: 'AllocationHardware'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'overheadPerformancePay',
    type: 'int',
    mapping: 'OverheadPerformancePay'
}, {
    name: 'state',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPricinpalName',
    type: 'string',
    mapping: 'ProjectPricinpalName'
}, {
    name: 'projectTypeName',
    type: 'string',
    mapping: 'ProjectTypeName'
}, {
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'fundDescendID',
    type: 'int',
    mapping: 'FundDescendID'
}, {
    name: 'hasPermission_Allocation',
    type: 'bool',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Canel',
    type: 'bool',
    mapping: 'HasPermission_Canel',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'bool',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'bool',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UndoSubmit',
    type: 'bool',
    mapping: 'HasPermission_UndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Correct',
    type: 'bool',
    mapping: 'HasPermission_Correct',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'bool',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCancel',
    type: 'bool',
    mapping: 'CanCancel',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'bool',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'bool',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'bool',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoSubmit',
    type: 'bool',
    mapping: 'CanUndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCorrect',
    type: 'bool',
    mapping: 'CanCorrect',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocationPerformancePay',
    type: 'bool',
    mapping: 'CanAllocationPerformancePay',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesMiddle',
    type: 'int',
    mapping: 'OverheadExpensesMiddle'
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}
]);

Srims.data.Entity.apply(Srims.fund.FundAllocation);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocation);
    }
    
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStore.superclass.constructor.call(this, new Srims.fund.FundAllocationXmlReader(), load_url, params);
    }
});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundAllocationState');

Srims.fund.fundAllocationState.UnSubmit = 'UnSubmit';
Srims.fund.fundAllocationState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundAllocationState.Reject = 'Reject';
Srims.fund.fundAllocationState.Passed = 'Passed';
Srims.fund.fundAllocationState.Canceled = 'Canceled';

Srims.fund.fundAllocationStateRender = function(value){
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.fund.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.fund.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_BasicForm = function(fundAllocation, isVoucher) {

    this._fundAllocation = fundAllocation;
    this._textFieldProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        value: fundAllocation.get('projectNumber'),
        readOnly: true,
        width: 620
    });
    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: fundAllocation.get('projectName'),
        readOnly: true,
        width: 620
    });
    this._textFieldProjectPrincipal = new Ext.form.TextField({
        fieldLabel: '项目负责人',
        value: fundAllocation.get('projectPricinpalName'),
        readOnly: true,
        width: 220
    });
    this._textFieldProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        value: fundAllocation.get('projectTypeName'),
        readOnly: true,
        width: 220
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '分配金额',
        value: Money.render(fundAllocation.get('allocationTotal')) + '(校内间接费：' + Money.render(fundAllocation.get('overheadExpenses')) + ')',
        readOnly: true,
        width: 220
    });
    this._textFieldAllocateTime = new Ext.form.TextField({
        fieldLabel: '分配时间',
        value: Date.render(fundAllocation.get('allocationDateTime')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationIn = new Ext.form.TextField({
        fieldLabel: '校内分配',
        value: Money.render(fundAllocation.get('allocationIn')) ,
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationOut = new Ext.form.TextField({
        fieldLabel: '外协分配',
        value: Money.render(fundAllocation.get('allocationOut')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesOut')) + ')',
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationHardware = new Ext.form.TextField({
        fieldLabel: '硬件费',
        value: Money.render(fundAllocation.get('allocationHardware')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationOverheadPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效',
        value: Money.render(fundAllocation.get('overheadPerformancePay')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '已分课题组间接费用',
        value: Money.render(fundAllocation.get('performancePay')),
        readOnly: true,
        disabled: isVoucher,
        width: 220
    });
    this._textFieldAllocationShoolIn = new Ext.form.TextField({
        fieldLabel: '校内间接费用',
        value: Money.render(fundAllocation.get('overheadExpenses')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationShool = new Ext.form.TextField({
        fieldLabel: '学校间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesIn')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationCompus = new Ext.form.TextField({
        fieldLabel: '二级单位间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesMiddle')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesExpert')),
        readOnly: true,
        width: 220
    });
    this._textFieldFundState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.fund.fundAllocationStateRender(fundAllocation.get('state')),
        readOnly: true,
        width: 220
    });
    this._textFieldOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: fundAllocation.get('operator'),
        readOnly: true,
        width: 220
    });
    this._textFieldOperateTime = new Ext.form.TextField({
        fieldLabel: '操作时间',
        value: Date.render(fundAllocation.get('dateTime')),
        readOnly: true,
        width: 220
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '审核备注',
        value: fundAllocation.get('remark'),
        readOnly: true,
        width: 620
    });

    var columnFirstItems = [this._textFieldProjectPrincipal, this._textFieldAmount, this._textFieldAllocationIn, this._textFieldAllocationHardware, this._textFieldAllocationOverheadPerformancePay, this._textFieldAllocationShool, this._textFieldAllocationExpert, this._textFieldOperator];
    var columnSecondItems = [this._textFieldProjectType, this._textFieldAllocateTime, this._textFieldAllocationOut, this._textFieldFundState, this._textFieldAllocationShoolIn, this._textFieldAllocationCompus, this._textFieldAllocationPerformancePay,this._textFieldOperateTime];

    Srims.fund.FundAllocationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配基本信息',
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        layout: 'form',
        items: [this._textFieldProjectNumber, this._textFieldProject, new Ext.Panel({
            labelWidth: 70,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                items: columnFirstItems
            }), new Ext.Panel({
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    this.resetComponnentsValue = function(fundAllocation) {
        this._textFieldAmount.setValue(Money.render(fundAllocation.get('allocationTotal')) + '(校内间接费：' + Money.render(fundAllocation.get('overheadExpenses')) + ')');
        this._textFieldAllocateTime.setValue(Date.render(fundAllocation.get('allocationDateTime')));
        this._textFieldAllocationIn.setValue(Money.render(fundAllocation.get('allocationIn')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesIn')) + ')');
        this._textFieldAllocationOut.setValue(Money.render(fundAllocation.get('allocationOut')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesOut')) + ')');
        this._textFieldAllocationHardware.setValue(Money.render(fundAllocation.get('allocationHardware')));
        this._textFieldFundState.setValue(Srims.fund.fundAllocationStateRender(fundAllocation.get('state')));
        this._textFieldOperator.setValue(fundAllocation.get('operator'));
        this._textFieldOperateTime.setValue(Date.render(fundAllocation.get('dateTime')));
        this._textFieldRemark.setValue(fundAllocation.get('remark'));
        this._textFieldAllocationOverheadPerformancePay.setValue(Money.render(fundAllocation.get('overheadPerformancePay')));
    }
}
Ext.extend(Srims.fund.FundAllocationShowPanel_BasicForm, Ext.form.FormPanel, {});if (!Srims.fund)
    Ext.namespace('Srims.fund');
Srims.fund.FundAllocationGridPanel_ColumnModel = function(isShowProjectName) {
    Srims.fund.FundAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'projectNumber',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配项目',
        dataIndex: 'projectName',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配时间',
        dataIndex: 'allocationDateTime',
        sortable: true,
        width: 100,
        renderer: Date.render
    }, {
        header: '分配总额',
        dataIndex: 'allocationTotal',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '直接费用',
        dataIndex: 'allocationIn',
        width: 80,
        renderer: Money.render
    }, {
        header: '项目总绩效',
        dataIndex: 'PerformanceTotal',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '校内绩效',
        dataIndex: 'overheadPerformancePay',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '课题组间接费用及绩效',
        dataIndex: 'overheadExpensesExpert',
        width: 80,
        renderer: Money.render
    }, {
        header: '外协分配',
        dataIndex: 'allocationOut',
        width: 80,
        renderer: Money.render
    }, {
        header: '当前状态',
        dataIndex: 'state',
        sortable: true,
        width: 60,
        renderer: Srims.fund.fundAllocationStateRender
    }, {
        header: '当前状态时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '当前状态操作人',
        dataIndex: 'operator'
}])
    }
    Ext.extend(Srims.fund.FundAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.Voucher = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'allocationHardware',
    type: 'int',
    mapping: 'AllocationHardware'
}, {
    name: 'allocationIn',
    type: 'int',
    mapping: 'AllocationIn'
}, {
    name: 'allocationOut',
    type: 'int',
    mapping: 'AllocationOut'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'overheadPerformancePay',
    type: 'int',
    mapping: 'OverheadPerformancePay'
}, {
    name: 'performanceAccountBookNumber',
    type: 'string',
    mapping: 'PerformanceAccountBookNumber'
}, {
    name: 'financeNumber',
    type: 'string',
    mapping: 'FinanceNumber'
}, {
    name: 'isRead',
    type: 'bool',
    mapping: 'IsRead',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'currentStateID',
    type: 'int',
    mapping: 'CurrentStateID'
}, {
    name: 'voucherState',
    type: 'string',
    mapping: 'VoucherState'
}, {
    name: 'financeAllocationDateTime',
    type: 'date',
    mapping: 'FinanceAllocationDateTime'
}, {
    name: 'stateDateTime',
    type: 'date',
    mapping: 'StateDateTime'
}, {
    name: 'stateOperator',
    type: 'string',
    mapping: 'StateOperator'
}, {
    name: 'stateRemark',
    type: 'string',
    mapping: 'StateRemark'
}, {
    name: 'fundAllocationID',
    type: 'int',
    mapping: 'FundAllocationID'
}, {
    name: 'fundAllocationHardware',
    type: 'int',
    mapping: 'FundAllocationHardware'
}, {
    name: 'fundAllocationAllocationIn',
    type: 'int',
    mapping: 'FundAllocationAllocationIn'
}, {
    name: 'fundAllocationAllocationOut',
    type: 'int',
    mapping: 'FundAllocationAllocationOut'
}, {
    name: 'fundAllocationAllocationTotal',
    type: 'int',
    mapping: 'FundAllocationAllocationTotal'
}, {
    name: 'fundAllocationOverheadExpenses',
    type: 'int',
    mapping: 'FundAllocationOverheadExpenses'
}, {
    name: 'fundAllocationDateTime',
    type: 'date',
    mapping: 'FundAllocationDateTime'
}, {
    name: 'fundAllocationOverheadExpensesIn',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesIn'
}, {
    name: 'fundAllocationOverheadExpensesOut',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesOut'
}, {
    name: 'fundAllocationStateDateTime',
    type: 'date',
    mapping: 'FundAllocationStateDateTime'
}, {
    name: 'fundAllocationStateOperator',
    type: 'string',
    mapping: 'FundAllocationStateOperator'
}, {
    name: 'fundAllocationStateRemark',
    type: 'string',
    mapping: 'FundAllocationStateRemark'
}, {
    name: 'fundAllocationState',
    type: 'string',
    mapping: 'FundAllocationState'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPrincipal',
    type: 'string',
    mapping: 'ProjectPrincipal'
}, {
    name: 'projectIsSecret',
    type: 'bool',
    mapping: 'ProjectIsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'projectTypePreCode',
    type: 'string',
    mapping: 'ProjectTypePreCode'
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'userIsExpert',
    type: 'bool',
    mapping: 'UserIsExpert',
    convert: Boolean.toBoolean
}, {
    name: 'fundMemberID',
    type: 'int',
    mapping: 'FundMemberID'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'isExpertSecondCollege',
    type: 'string',
    mapping: 'IsExpertSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'deparment',
    type: 'string',
    mapping: 'Deparment'
}, {
    name: 'expertCollegeCode',
    type: 'string',
    mapping: 'ExpertCollegeCode'
}, {
    name: 'hasPermission_Show',
    type: 'bool',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'bool',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'bool',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Print',
    type: 'bool',
    mapping: 'HasPermission_Print',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetPrint',
    type: 'bool',
    mapping: 'HasPermission_ResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetAccountBookNumber',
    type: 'bool',
    mapping: 'HasPermission_ResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_SignIn',
    type: 'bool',
    mapping: 'HasPermission_SignIn',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ReturnVoucher',
    type: 'bool',
    mapping: 'HasPermission_ReturnVoucher',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_FinanceAllocate',
    type: 'bool',
    mapping: 'HasPermission_FinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CancelFinanceAllocate',
    type: 'bool',
    mapping: 'HasPermission_CancelFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Print',
    type: 'bool',
    mapping: 'HasPermission_Print',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetPrint',
    type: 'bool',
    mapping: 'HasPermission_ResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowFundAllocation',
    type: 'bool',
    mapping: 'HasPermission_ShowFundAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'bool',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'bool',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'bool',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canPrint',
    type: 'bool',
    mapping: 'CanPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canResetPrint',
    type: 'bool',
    mapping: 'CanResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canResetAccountBookNumber',
    type: 'bool',
    mapping: 'CanResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canSignIn',
    type: 'bool',
    mapping: 'CanSignIn',
    convert: Boolean.toBoolean
}, {
    name: 'canReturnVoucher',
    type: 'bool',
    mapping: 'CanReturnVoucher',
    convert: Boolean.toBoolean
}, {
    name: 'canFinanceAllocate',
    type: 'bool',
    mapping: 'CanFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canFinanceAllocate',
    type: 'bool',
    mapping: 'CanFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canCancelFinanceAllocate',
    type: 'bool',
    mapping: 'CanCancelFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canResetPrint',
    type: 'bool',
    mapping: 'CanResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canShowFundAllocation',
    type: 'bool',
    mapping: 'CanShowFundAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesMiddle',
    type: 'int',
    mapping: 'OverheadExpensesMiddle'
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'fundAllocationOverheadExpensesMiddle',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesMiddle'
}, {
    name: 'fundAllocationOverheadExpensesExpert',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesExpert'
}, {
    name: 'fundAllocationOverheadExpenses',
    type: 'int',
    mapping: 'FundAllocationOverheadExpenses'
}]);

    Srims.data.Entity.apply(Srims.fund.Voucher);
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.listVoucher = function() {
    Srims.fund._listVoucher('VoucherList', '凭单列表', 'icon-fund-voucher');
}
Srims.fund.listMyVoucher = function() {
    Srims.fund._listVoucher('MyVoucherList', '我的凭单列表', 'icon-fund-voucher');
}
Srims.fund._listVoucher = function(id, name, iconCls, queryParams) {
    var panelId = 'VoucherGridPanel_' + id;
    var voucherStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        voucherStore = panel.getStore();
        voucherStore.load();
    }
    else {
        voucherStore = new Srims.fund.VoucherStore(Srims.service.fund.VoucherService + '/Query', queryParams);
        panel = new Srims.fund.VoucherGridPanel(panelId, voucherStore, name, iconCls, queryParams);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
//carlsirce 2013.6.28 更新新旧外协名称
Srims.fund.showOutsourcingNameImportWindow = function(store) {
    var windowId = 'OutsourcingNameImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.VoucherService + '/ImportOutsourcingName', '导入外协映射数据', false);

    window.show();
}

Srims.fund.showVoucherQueryWindow = function(id, store, queryParams, isFinanceManage, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.fund.VoucherQueryWindow(id, store, queryParams, isFinanceManage);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.changeVoucherState = function(voucher, store, title, message, action, methodName, isFinanceManage) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.voucherID = voucher.get('id');
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.fund.VoucherXmlReader()
                    });
                    var editedVoucher = newstore.getAt(0);
                    var panelId = (isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel') + editedVoucher.get('id');
                    if (Ext.getCmp(panelId))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                    Srims.fund.showVoucher(editedVoucher, store, isFinanceManage);
                    if (action == 'print') {
                        if (voucher.get('isHorizontal') == true)
                            window.open('HorizonVoucherPrint.aspx?VoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                        else
                            window.open('VoucherPrint.aspx?VoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                    }
                }
            });
        }
    }, this);
}
Srims.fund.SetIsReadAndshowVoucher = function(voucher, store, isFinanceManage, fundAllocation) {
    var params = {
        voucherID: voucher.get('id')
    }

    Ext.Ajax.request({
        url: Srims.service.fund.VoucherService + '/SetIsRead',
        params: params,
        scope: this,
        success: function() {
            store.load();
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_MyUnReadVoucher());
            Srims.fund.showVoucher(voucher, store, isFinanceManage, fundAllocation);
        }
    });

}
Srims.fund.showVoucher = function(voucher, store, isFinanceManage, fundAllocation) {
    var panelId = (isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel') + voucher.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.fund.VoucherShowPanel(panelId, voucher, store, isFinanceManage, fundAllocation);
    Srims.WorkSpace.addPanel(panel);
}
Srims.fund.newVoucher = function(fundAllocation, isCorrect, allocationName) {
    var windowId = 'NewVoucher' + allocationName;
    var voucher = new Srims.fund.Voucher({});
    Srims.fund.ShowVoucherEditWindow(fundAllocation, voucher, windowId, isCorrect, allocationName);
}
Srims.fund.editVoucher = function(fundAllocation, voucher, isCorrect, allocationName) {
    var windowId = 'EditVoucher' + voucher.get('id');
    Srims.fund.ShowVoucherEditWindow(fundAllocation, voucher, windowId, isCorrect, allocationName);
}

Srims.fund.ShowVoucherEditWindow = function(fundAllocation, voucher, windowId, isCorrect, allocationName) {
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: fundAllocation.get('projectID')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var project = store.getAt(0);

            var window = Ext.getCmp(windowId);

            if (!window)
                var window = new Srims.fund.VoucherEditWindow(id, fundAllocation, voucher, project, isCorrect, allocationName);

            window._editGridPanel.getStore().load();
            window.show();
        }
    })
}

Srims.fund.deleteVoucher = function(voucher, fundAllocation, isCorrect) {
    Ext.Ajax.request({
        url: Srims.service.fund.VoucherService + '/Delete',
        params: {
            voucherId: voucher.get('id'),
            isCorrect: isCorrect
        },
        success: function() {
            //仅用于专家向导
            fundAllocation.panel.fundAllocation = fundAllocation;
            fundAllocation.panel.refresh();

            if (fundAllocation.store)
                fundAllocation.store.load();

            //用于数据纠错
            if (isCorrect)
                Ext.Ajax.request({
                    url: Srims.service.fund.FundAllocationService + '/GetById',
                    params: {
                        fundAllocationId: fundAllocation.get('id')
                    },
                    scope: this,
                    success: function(response) {
                        var store = new Ext.data.Store({
                            data: response.responseXML,
                            reader: new Srims.fund.FundAllocationXmlReader()
                        });
                        var currentFundAllocation = store.getAt(0);
                        currentFundAllocation.panel = fundAllocation.panel;
                        currentFundAllocation.store = fundAllocation.store;
                        currentFundAllocation.toobBar = fundAllocation.toobBar;
                        currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                    }
                });
        }
    });
}

Srims.fund.showEditAccountBookNumberWindow = function(voucher, fundAllocation) {
    var windowId = 'ResetAccountBookNumber' + voucher.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.fund.VoucherEditAccountBookNumberWindow(windowId, voucher, fundAllocation);

    window.show();
}
Srims.fund.showVoucherFundAllocationInfo = function(voucher) {
    Ext.Ajax.request({
        url: Srims.service.fund.FundAllocationService + '/GetById',
        params: {
            fundAllocationId: voucher.get('fundAllocationID')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.fund.FundAllocationXmlReader()
            });
            var currentFundAllocation = store.getAt(0);
            Srims.fund.showFundAllocationInfo(currentFundAllocation);
        }
    });
}

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherXmlReader.superclass.constructor.call(this, Srims.fund.Voucher);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.VoucherStore.superclass.constructor.call(this, new Srims.fund.VoucherXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Ext.namespace('Srims.fund.VoucherState');

Srims.fund.VoucherState.UnPrinted = 'UnPrinted';
Srims.fund.VoucherState.NotSignIn = 'NotSignIn';
Srims.fund.VoucherState.SignIn = 'SignIn';
Srims.fund.VoucherState.Allocated = 'Allocated';

Srims.fund.VoucherStateRender = function(value, metadata){
    switch (value) {
        case 'UnPrinted':
            return '审核通过/未打印';
        case 'NotSignIn':
            return '已打印/未签收';
        case 'SignIn':
            return '签收/未分配';
        case 'Allocated':
            return '已分配';
        case 'WaitingCensor':
            return '未审核';
        case 'Canceled':
            return '作废';
        case 'Reject':
            return '审核驳回';
        default:
            return '未知';
    }
}
Srims.fund.FinanceVoucherState = "NotSignIn,SignIn,Allocated";
Srims.fund.VoucherStateFilterItems = [{
    id: 'UnPrinted',
    text: '未打印'
}, {
    id: 'NotSignIn',
    text: '已打印/未签收'
}, {
    id: 'SignIn',
    text: '签收/未分配'
}, {
    id: 'Allocated',
    text: '已分配'
}];

Srims.fund.VoucherStateStore = [['UnPrinted', '未打印'], ['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
Srims.fund.VoucherStateForFinanceStore = [['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
if (!Srims.fund)
	Ext.namespace('Srims.fund');
Srims.fund.VoucherGridPanel_ColumnModel_Renderer = function(value, metadata, record) {

	if (record.get('isRead') == false)
		metadata.css = "voucher_unread " + metadata.css;

	return value;
};
Srims.fund.VoucherGridPanel_ColumnModel = function(isFinanceManage, isExpert) {
	Srims.fund.VoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber',
		sortable: true,
		width: 40,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "专家",
		dataIndex: 'expertName',
		sortable: true,
		width: 30,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "项目名称",
		dataIndex: 'projectName',
		sortable: true,
		hidden: false,
		width: 90,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "状态",
		dataIndex: 'voucherState',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Srims.fund.VoucherStateRender(value);
		}
	},{
		header: "财务分配时间",
		dataIndex: 'financeAllocationDateTime',
		width: 20,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Date.render(value);
		}
	},{
		header: "制单号",
		dataIndex: 'financeNumber',
		width: 40,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "硬件费(万元)",
		dataIndex: 'allocationHardware',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "校内分配(万元)",
		dataIndex: 'allocationIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效账本号",
		dataIndex: 'performanceAccountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "绩效分配(万元)",
		dataIndex: 'performancePay',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配(万元)",
		dataIndex: 'allocationOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "已读",
		dataIndex: 'isRead',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Boolean.render(value);
		}
	},{
		header: "校内分配管理费(万元)",
		dataIndex: 'overheadExpensesIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配管理费(万元)",
		dataIndex: 'overheadExpensesOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效管理费(万元)",
		dataIndex: 'overheadPerformancePay',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "管理费(万元)",
		dataIndex: 'overheadExpenses',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	}]);

	this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherGridPanel_ToolBar = function(selection, store, panelId, queryParams, isFinanceManage, isFundAllocation, fundAllocation, isExpertGuid, isCorrect) {

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
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '更新外协单位名称',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.showOutsourcingNameImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中',
        hidden: !user.isSuper
    });
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.fund.showVoucherQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, isFinanceManage, Ext.getCmp(this.panelId));
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
            Srims.fund.editVoucher(this.fundAllocation, this.selection.getSelected(), isCorrect);
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
            Srims.fund.showEditAccountBookNumberWindow(this.selection.getSelected(), this.fundAllocation);
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
                    Srims.fund.deleteVoucher(this.selection.getSelected(), this.fundAllocation, isCorrect);
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
                Srims.fund.SetIsReadAndshowVoucher(this.selection.getSelected(), this.store, isFinanceManage,fundAllocation);
            else
                Srims.fund.showVoucher(this.selection.getSelected(), this.store, isFinanceManage,fundAllocation);
        },
        tooltip: '<b>查看凭单信息</b>'
    });
    this._buttonFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.fund.newVoucher(this.fundAllocation, isCorrect);
        },
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.fund.showVoucherFundAllocationInfo(this.selection.getSelected());
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
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
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
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
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
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
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
                Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
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
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
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
            items = [this._buttonHeader, this._buttonShowVoucher, this._buttonDelete, this._buttonResetAccountBookNumber]//3-_buttonEdit
        else {
            if (isCorrect)
                items = [this._buttonFundAllocation, this._buttonShowVoucher, this._buttonDelete, this._buttonResetAccountBookNumber, new Ext.Toolbar.Fill(), this._buttonRefresh]; //3-this._buttonEdit,
            else
                items = [this._buttonShowVoucher, this._buttonDelete, this._buttonResetAccountBookNumber]; //2-this._buttonEdit,
        }
    }
    else {
        if (isFinanceManage)
            items = [this._buttonQuery,this._buttonImport , this._buttonShowVoucher, this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonExport, this._buttonRefresh, this._buttonReset];
        else
            items = [this._buttonQuery,this._buttonImport , this._buttonShowVoucher, this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }
    Srims.fund.VoucherGridPanel_ToolBar.superclass.constructor.call(this, {
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
Ext.extend(Srims.fund.VoucherGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.finance) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherGridPanel = function(id, voucherStore, title, iconCls, queryParams, isFinanceManage){

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    var user = Srims.currentLoginLog.user;
    var isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.VoucherGridPanel_ColumnModel(isFinanceManage, isExpert);
    this._toolbar = new Srims.fund.VoucherGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage, false, undefined);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    //constructor
    Srims.fund.VoucherGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.fund.showVoucher(voucher, grid._store, isFinanceManage);
    }
}
Ext.extend(Srims.fund.VoucherGridPanel, Srims.component.GridPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherQueryWindow_InforPanel = function(isFinanceManage){

    var voucherStateStore = isFinanceManage ? Srims.fund.VoucherStateForFinanceStore : Srims.fund.VoucherStateStore;
    
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 167
    });
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 167
    });
    this._dateFieldFinanceAllocationDateBegin = new Ext.form.DateField({
        fieldLabel: '财务分配时间',
        width: 150
    });
    this._dateFieldFinanceAllocationDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        width: 150
    });
    this._numberFieldFinanceNumber = new Ext.form.NumberField({
        fieldLabel: '财务制单号',
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minLength: 5,
        maxLength: 5,
        width: 150
    });
    this._checkBoxIsHorizontal = new Ext.form.Checkbox({
        fieldLabel: '是否横向项目'
    });
    this._checkboxGroupVoucherStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '凭单状态',
        cls: 'srims-checkboxGroup',
        columns: isFinanceManage ? 3 : 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(voucherStateStore)
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._comboBoxProject, this._textFieldAccountBookNumber, this._dateFieldFinanceAllocationDateBegin];
    var columnSecondItems = [this._comboBoxExpert, this._checkBoxIsHorizontal, this._numberFieldFinanceNumber, this._dateFieldFinanceAllocationDateEnd];
    
    Srims.fund.VoucherQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 252,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 90,
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._checkboxGroupVoucherStates]
    });
    
    this.buildParams = function(params){
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.accountBookNumber = this._textFieldAccountBookNumber.getValue();
        params.financeNumber = this._numberFieldFinanceNumber.getValue();
        params.isHorizontal = this._checkBoxIsHorizontal.checked ? "true" : "";
        params.allocationDateTimeStart = Date.format(this._dateFieldFinanceAllocationDateBegin.getValue());
        params.allocationDateTimeEnd = Date.format(this._dateFieldFinanceAllocationDateEnd.getValue());
        params.voucherState = this._checkboxGroupVoucherStates.getSelecetedValue();
        params.expertName = this._comboBoxExpert.getText();
        params.projectName = this._comboBoxProject.getText();
    }
    
    this.clearParams = function(){
        this._textFieldVoucherNumber.reset();
        this._textFieldAccountBookNumber.reset();
        this._numberFieldFinanceNumber.reset();
        this._checkBoxIsHorizontal.reset();
        this._dateFieldFinanceAllocationDateBegin.reset();
        this._dateFieldFinanceAllocationDateEnd.reset();
        this._checkboxGroupVoucherStates.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProject.reset();
    }
}
Ext.extend(Srims.fund.VoucherQueryWindow_InforPanel, Ext.FormPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherQueryWindow = function(id, store, queryParams, isFinanceManage){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.fund.VoucherQueryWindow_InforPanel(isFinanceManage);
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.VoucherQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '凭单查询',
        iconCls: 'icon-voucher-query',
        width: 603,
        height: 226,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 600,
            layout: 'form',
            labelWidth: 90,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        if (isFinanceManage && !params.voucherState) 
            params.voucherState = Srims.fund.FinanceVoucherState;
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.fund.VoucherQueryWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOut = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'alamount',
    type: 'int',
    mapping: 'AlAmount'
}, {
    name: 'plamount',
    type: 'int',
    mapping: 'PlAmount'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'corporation',
    type: 'string',
    mapping: 'Corporation'
}, {
    name: 'voucherID',
    type: 'int',
    mapping: 'VoucherID'
    }, {
    name: 'outsourcingID',
    type: 'int',
    mapping: 'OutsourcingID'
}]);

Srims.data.Entity.apply(Srims.fund.VoucherOut);



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherOutXmlReader.superclass.constructor.call(this, Srims.fund.VoucherOut);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId){
        Srims.fund.VoucherOutStore.superclass.constructor.call(this, new Srims.fund.VoucherOutXmlReader(), Srims.service.fund.VoucherOutService + '/GetByVoucherID', {
            voucherID: voucherId
        });
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOutColumnModel = function(){
    Srims.fund.VoucherOutColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "外协单位",
        dataIndex: 'corporation',
        width: 80,
        hidden: false
    }, {
        header: "金额(万元)",
        dataIndex: 'amount',
        width: 40,
        renderer: Money.render,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherOutColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.fund.VoucherStateHistory);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryColumnModel = function(){
    Srims.fund.VoucherStateHistoryColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.fund.VoucherStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        header: "备注",
        dataIndex: 'remark'
    }])
}
Ext.extend(Srims.fund.VoucherStateHistoryColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.VoucherStateHistory);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId){
        Srims.fund.VoucherStateHistoryStore.superclass.constructor.call(this, new Srims.fund.VoucherStateHistoryXmlReader(),  Srims.service.fund.VoucherStateHistoryService + '/GetVoucherStateHistories', {
            voucherID: voucherId
        });
    }
});if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_BasicForm = function(voucher) {
    this._voucher = voucher;

    this._textFieldFundMember = new Ext.form.TextField({
        fieldLabel: '经费成员',
        value: voucher.get('expertName'),
        readOnly: true,
        width: 200
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: voucher.get('overheadPerformancePay') > 0 ? '绩效账本号' : '账本号',
        value: voucher.get('accountBookNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '总金额',
        value: Money.render(voucher.get('amount')) + '(校内间接费：' + Money.render(voucher.get('overheadExpenses')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationIn = new Ext.form.TextField({
        fieldLabel: '校内分配',
        value: Money.render(voucher.get('allocationIn')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationOut = new Ext.form.TextField({
        fieldLabel: '外协分配',
        value: Money.render(voucher.get('allocationOut')) + '(间接费：' + Money.render(voucher.get('overheadExpensesOut')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationHardware = new Ext.form.TextField({
        fieldLabel: '硬件费',
        value: Money.render(voucher.get('allocationHardware')),
        readOnly: true,
        width: 200
    });
    this._textFieldPerformanceAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '绩效账本号',
        value: voucher.get('performanceAccountBookNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效分配',
        value: Money.render(voucher.get('overheadPerformancePay')) + '(绩效管理费：' + Money.render(voucher.get('performancePay')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.fund.VoucherStateRender(voucher.get('voucherState')),
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(voucher.get('stateDateTime')),
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: voucher.get('stateOperator'),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationShoolIn = new Ext.form.TextField({
        fieldLabel: '校内间接费用',
        value: Money.render(voucher.get('overheadExpenses')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationShool = new Ext.form.TextField({
        fieldLabel: '学校间接费用',
        value: Money.render(voucher.get('overheadExpensesIn')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationCompus = new Ext.form.TextField({
        fieldLabel: '二级单位间接费用',
        value: Money.render(voucher.get('overheadExpensesMiddle')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(voucher.get('overheadExpensesExpert')),
        readOnly: true,
        width: 200
    });
    var columnFirstItems = [this._textFieldFundMember, this._textFieldAmount, this._textFieldAllocationOut, this._textFieldAllocationShoolIn, this._textFieldAllocationCompus, this._textFieldFinanceNumber, this._textFieldCurrentStateTime, this._textFieldCurrentStateOperator];
    var columnSecondItems = [this._textFieldAccountBookNumber, this._textFieldAllocationIn, this._textFieldAllocationHardware, this._textFieldAllocationShool, this._textFieldAllocationExpert, this._textFieldAllocationPerformancePay, this._textFieldCurrentState];

    Srims.fund.VoucherShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    //方法
    this.resetValues = function(voucher) {
        this._textFieldFundMember.setValue(voucher.get('expertName'));
        this._textFieldAccountBookNumber.setValue(voucher.get('accountBookNumber'));
        this._textFieldFinanceNumber.setValue(voucher.get('financeNumber'));
        this._textFieldAmount.setValue(Money.render(voucher.get('amount')) + '(校内间接费：' + Money.render(voucher.get('overheadExpenses')) + ')');
        this._textFieldAllocationIn.setValue(Money.render(voucher.get('allocationIn')) + '(管理费：' + Money.render(voucher.get('overheadExpensesIn')) + ')');
        this._textFieldAllocationOut.setValue(Money.render(voucher.get('allocationOut')) + '(间接费：' + Money.render(voucher.get('overheadExpensesOut')) + ')');
        this._textFieldAllocationHardware.setValue(Money.render(voucher.get('allocationHardware')));
        this._textFieldCurrentState.setValue(Srims.fund.VoucherStateRender(voucher.get('voucherState')));
        this._textFieldCurrentStateTime.setValue(Date.render(voucher.get('stateDateTime')));
        this._textFieldCurrentStateOperator.setValue(voucher.get('stateOperator'));
        this._textFieldPerformanceAccountBookNumber.setValue(voucher.get('performanceAccountBookNumber'));
        this._textFieldAllocationPerformancePay.setValue(Money.render(voucher.get('overheadPerformancePay')) + '(绩效管理费：' + Money.render(voucher.get('performancePay')) + ')');
        this._textFieldAllocationShool.setValue(Money.render(voucher.get('overheadExpensesIn')));
        this._textFieldAllocationShoolIn.setValue(Money.render(voucher.get('overheadExpenses')));
        this._textFieldAllocationCompus.setValue(Money.render(voucher.get('overheadExpensesMiddle')));
        this._textFieldAllocationExpert.setValue(Money.render(voucher.get('overheadExpensesExpert')));
    }
}
Ext.extend(Srims.fund.VoucherShowPanel_BasicForm, Ext.form.FormPanel, {});
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

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_StateHistoryForm = function(voucher){
    this._voucher = voucher;
    this._store = new Srims.fund.VoucherStateHistoryStore(voucher.get('id'));
    
    this._columnModel = new Srims.fund.VoucherStateHistoryColumnModel();
    
    this._gridPanelVoucherStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有凭单状态历史信息'
        }
    });
    
    Srims.fund.VoucherShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单状态历史信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherStateHistory]
    });
    
    this._store.load();
}

Ext.extend(Srims.fund.VoucherShowPanel_StateHistoryForm, Ext.form.FormPanel, {});

if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_FundAllocationForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFundAllocation = Srims.fund.getFundAllocationFromVoucher(this._voucher, this._fundAllocations);
    return new Srims.fund.FundAllocationShowPanel_BasicForm(this._voucherFundAllocation, true);
}
Srims.fund.getFundAllocationFromVoucher = function(voucher) {
    var fundAllocation = new Srims.fund.FundAllocation({});
    fundAllocation.set('allocationDateTime', voucher.get('fundAllocationDateTime'));
    fundAllocation.set('allocationTotal', voucher.get('fundAllocationAllocationTotal'));
    fundAllocation.set('allocationIn', voucher.get('fundAllocationAllocationIn'));
    fundAllocation.set('allocationOut', voucher.get('fundAllocationAllocationOut'));
    fundAllocation.set('allocationHardware', voucher.get('fundAllocationHardware'));


    fundAllocation.set('overheadExpenses', voucher.get('fundAllocationOverheadExpenses'));

    fundAllocation.set('dateTime', voucher.get('fundAllocationStateDateTime'));
    fundAllocation.set('operator', voucher.get('fundAllocationStateOperator'));
    fundAllocation.set('remark', voucher.get('fundAllocationStateRemark'));
    fundAllocation.set('state', voucher.get('fundAllocationState'));
    fundAllocation.set('overheadExpensesOut', voucher.get('fundAllocationOverheadExpensesOut'));
    fundAllocation.set('projectName', voucher.get('projectName'));
    fundAllocation.set('projectTypeName', voucher.get('projectType'));
    fundAllocation.set('projectPricinpalName', voucher.get('projectPrincipal'));

    fundAllocation.set('overheadPerformancePay', voucher.get('overheadPerformancePay'));
    fundAllocation.set('overheadExpensesMiddle', voucher.get('fundAllocationOverheadExpensesMiddle'));
    fundAllocation.set('overheadExpensesExpert', voucher.get('fundAllocationOverheadExpensesExpert'));
    fundAllocation.set('overheadExpensesIn', voucher.get('fundAllocationOverheadExpensesIn'));
    return fundAllocation;
}

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherShowPanel_VoucherOutForm = function(voucher){

    this._voucher = voucher;
    this._store = new Srims.fund.VoucherOutStore(voucher.get('id'));
    
    this._columnModel = new Srims.fund.VoucherOutColumnModel();
    
    this._gridPanelVoucherOut = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有外协分配信息'
        }
    });
    
    Srims.fund.VoucherShowPanel_VoucherOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协分配信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherOut]
    });
    
    this._store.load();
}
Ext.extend(Srims.fund.VoucherShowPanel_VoucherOutForm, Ext.FormPanel, {});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_FinanceForm = function(voucher){
    this._voucher = voucher;
    this._voucherFinance = Srims.fund.getFinanceFromVoucher(this._voucher);
    this._isBorrow = voucher.get('isBorrow');
    return new Srims.fund.FinanceShowForm(this._voucherFinance, this._isBorrow);
}
Srims.fund.getFinanceFromVoucher = function(voucher){
    var finance = new Srims.fund.Finance({});
    finance.set('amount', voucher.get('financeAmount'));
    finance.set('receivedDate', voucher.get('financeReceivedDate'));
    finance.set('voucherNumber', voucher.get('financeVoucherNumber'));
    finance.set('abstract', voucher.get('financeAbstract'));
    
    return finance;
}

if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel = function(panelId, voucher, store, isFinanceManage,fundAllocation) {

    this._id = panelId;
    this._voucher = voucher;
    this._store = store;

    this._basicForm = new Srims.fund.VoucherShowPanel_BasicForm(voucher);
    this._stateHistoryForm = new Srims.fund.VoucherShowPanel_StateHistoryForm(voucher);
    this._voucherOutForm = new Srims.fund.VoucherShowPanel_VoucherOutForm(voucher);
    this._fundAllocationForm = new Srims.fund.VoucherShowPanel_FundAllocationForm(voucher);
    this._financeForm = new Srims.fund.VoucherShowPanel_FinanceForm(voucher);
    this._toolBar = new Srims.fund.VoucherShowPanel_ToolBar(voucher, this._store, this._id, isFinanceManage, this);

    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;

    var items = [];
    if (this._isExpert)
        items = [this._basicForm, this._voucherOutForm, this._stateHistoryForm];
    else
        items = [this._basicForm, this._voucherOutForm, this._fundAllocationForm, this._financeForm, this._stateHistoryForm];

    Srims.fund.VoucherShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '凭单' + this._voucher.get('voucherNumber'),
        iconCls: 'icon-show',
        tbar: this._isExpert ? undefined : this._toolBar,
        items: items
    });
    this.resetValues = function(voucher) {
        var fundAllocation = Srims.fund.getFundAllocationFromVoucher(voucher,fundAllocation);
        var finance = Srims.fund.getFinanceFromVoucher(voucher);
        this._basicForm.resetValues(voucher);
        this._fundAllocationForm.resetComponnentsValue(fundAllocation);
        this._financeForm.resetComponnentsValue(finance);
    }
}
Ext.extend(Srims.fund.VoucherShowPanel, Ext.Panel, {});

if (!Srims.finance) 
    Ext.namespace("Srims.finance");
//finance
Srims.finance.listFinance = function(){
    Srims.finance._listFinance('FinanceInforList', '经费到帐信息列表', 'icon-finance');
}
Srims.finance._listFinance = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        financeStore = panel.getStore();
        financeStore.load();
    }
    else {
        financeStore = new Srims.fund.FinanceStore(Srims.service.fund.FinanceService + '/Query', queryParams);
        panel = new Srims.fund.FinanceGridPanel(panelId, financeStore, name, iconCls, queryParams, true);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.finance.invoiceFinance = function(finance, store){
    var Id = "InvoiceFinanceWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.finance.FinanceInvoiceEditWindow(Id, finance, store);
    }
    window.show();
}
Srims.finance.deleteInvoice = function(finance, store){
    Ext.MessageBox.confirm('删除发票信息', '你确定要删除这个发票信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.financeID = finance.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.fund.FinanceService + '/DeleteInvoice',
                params: params,
                scope: this,
                success: function(){
                    store.load();
                }
            });
        }
    }, this);
}
//voucher
Srims.finance.listVoucherFinance = function(){

    Srims.finance._listVoucherFinance('VoucherFinanceList', '凭单财务状态列表', 'icon-voucher-finance-state');
}
Srims.finance._listVoucherFinance = function(id, name, iconCls, queryParams){
    var panelId = 'VoucherGridPanel_' + id;
    var voucherStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    queryParams.voucherState = Srims.fund.FinanceVoucherState;
    if (panel) {
        voucherStore = panel.getStore();
        voucherStore.load();
    }
    else {
        voucherStore = new Srims.fund.VoucherStore(Srims.service.fund.VoucherService + '/Query', queryParams);
        panel = new Srims.fund.VoucherGridPanel(panelId, voucherStore, name, iconCls, queryParams, true);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.finance.allocateVoucher = function(voucher, store){
    var Id = "VoucherFinanceAllocateWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.finance.VoucherFinanceAllocateWindow(Id, voucher, store);
    }
    window.show();
}
//financebak
Srims.finance.listFinanceBak = function(){
    Srims.finance._listFinanceBak('FinanceBakList', '财务经费到帐信息列表', 'icon-finance');
}
Srims.finance._listFinanceBak = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeBakStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        financeBakStore = panel.getStore();
        financeBakStore.load();
    }
    else {
        financeBakStore = new Srims.finance.FinanceBakStore(Srims.service.fund.FinanceBakService + '/Query', queryParams);
        panel = new Srims.finance.FinanceBakGridPanel(panelId, financeBakStore, name, iconCls, queryParams);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
//export
Srims.finance.exportFinanceBak = function(queryParams){
    var windowId = 'FinanceBakExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(undefined, queryParams);
    var queryUrl = Srims.service.fund.FinanceBakService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('', Srims.finance.FinanceBakExport_Column.basic);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, '财务经费到帐信息');
}
Srims.finance.exportSignInVoucher = function(queryParams){
    var windowId = 'SignInVoucherExportWindow';
    //生成新Store
    queryParams.voucherState = 'SignIn,Allocated';
    var exportParams = Srims.exportAction.setExportQueryParams(undefined, queryParams);
    var queryUrl = Srims.service.fund.VoucherService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('', Srims.finance.VoucherExport_Column.basic);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, '已签收凭单');
}

if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.FinanceInvoiceEditWindow = function(id, finance, store){

    this._id = id;
    this._finance = finance;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._comboBoxInvoiceType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '发票类型',
        noticeTextType: 'InvoiceType',
        value: finance.get('invoiceType'),
        allowBlank: false,
        listWidth: 200,
        width: 200
    });
    this._textFieldInvoiceNumber = new Ext.form.TextField({
        fieldLabel: '发票号',
        allowBlank: true,
        value: finance.get('invoiceNumber'),
        width: 150
    });
    
    Srims.finance.FinanceInvoiceEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '发票信息',
        iconCls: 'icon-new',
        width: 350,
        labelWidth: 60,
        height: 140,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        layout: 'form',
        resizable: false,
        items: [this._textFieldInvoiceNumber, this._comboBoxInvoiceType],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxInvoiceType.isValid(preventMark) && result;
        result = this._textFieldInvoiceNumber.isValid(preventMark) && result;
        
        return result;
    }
    
    this._assignValues = function(){
        this._finance.set('invoiceNumber', this._textFieldInvoiceNumber.getValue());
        this._finance.set('invoiceType', this._comboBoxInvoiceType.getValue());
    }
    
    this._save = function(){
        var finance = this._finance;
        finance.beginEdit();
        this._assignValues();
        finance.commit();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FinanceService + '/SaveInvoice',
            params: finance.data,
            scope: this,
            success: function(){
                this._store.load();
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.finance.FinanceInvoiceEditWindow, Ext.Window, {})

if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.VoucherFinanceAllocateWindow = function(id, voucher, store){

    this._id = id;
    this._voucher = voucher;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._dateFieldFinanceAllocationDate = new Ext.form.DateField({
        fieldLabel: '财务分配时间',
        value: Date.render(voucher.get('financeAllocationDateTime')),
        readOnly: true,
        allowBlank: false,
        width: 150
    });
    this._numberFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        allowBlank: false,
        minLength: 5,
        maxLength: 5,
        enableKeyEvents: true,
        width: 150
    });
    Srims.finance.VoucherFinanceAllocateWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '凭单财务分配信息',
        iconCls: 'icon-new',
        width: 350,
        labelWidth: 80,
        height: 140,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        layout: 'form',
        resizable: false,
        items: [this._dateFieldFinanceAllocationDate, this._numberFieldFinanceNumber],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._numberFieldFinanceNumber.on('keypress', function(button, e){
        var allowed = '0123456789';
        var k = e.getKey();
        if (!Ext.isIE && (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)) {
            return;
        }
        var c = e.getCharCode();
        if (allowed.indexOf(String.fromCharCode(c)) === -1) {
            e.stopEvent();
        }
    });
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldFinanceAllocationDate.isValid(preventMark) && result;
        result = this._numberFieldFinanceNumber.isValid(preventMark) && result;
        
        return result;
    }
    
    this._assignValues = function(){
        this._voucher.set('financeNumber', this._numberFieldFinanceNumber.getValue());
        this._voucher.set('financeAllocationDate', Date.format(this._dateFieldFinanceAllocationDate.getValue()));
    }
    
    this._save = function(){
        var voucher = this._voucher;
        voucher.beginEdit();
        this._assignValues();
        voucher.commit();
        
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/VoucherAllocate',
            params: voucher.data,
            scope: this,
            success: function(response){
                this._store.load();
                this.close();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.VoucherXmlReader()
                });
                var editedVoucher = newstore.getAt(0);
                var panelId = 'VoucherFinanceShowPanel' + editedVoucher.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.fund.showVoucher(editedVoucher, this._store, true);
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.finance.VoucherFinanceAllocateWindow, Ext.Window, {})
