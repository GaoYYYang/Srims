
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
