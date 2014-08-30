
if (!Srims.performance)
    Ext.namespace("Srims.performance");
    

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.performance.listVoucher = function() {
    Srims.performance._listVoucher('VoucherList', '凭单列表', 'icon-fund-voucher');
}
Srims.performance.listMyVoucher = function() {
    Srims.fund._listVoucher('MyVoucherList', '凭单列表', 'icon-fund-voucher');
}
Srims.performance._listVoucher = function(id, name, iconCls, queryParams) {
    var panelId = 'PerformanceVoucherGridPanel_' + id;
    var voucherStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        voucherStore = panel.getStore();
        voucherStore.load();
    }
    else {
        voucherStore = new Srims.performance.PerformanceVoucherStore(Srims.service.performance.PerformanceVoucherService + '/Query', queryParams);
        panel = new Srims.performance.PerformanceVoucherGridPanel(panelId, voucherStore, name, iconCls, queryParams);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.performance.showVoucherQueryWindow = function(id, store, queryParams, isFinanceManage, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.performance.PerformanceVoucherQueryWindow(id, store, queryParams, isFinanceManage);

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
Srims.performance.changeVoucherState = function(voucher, store, title, message, action, methodName, isFinanceManage) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.performanceVoucherID = voucher.get('id');
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceVoucherService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.performance.PerformanceVoucherXmlReader()
                    });
                    var editedVoucher = newstore.getAt(0);
                    var panelId = (isFinanceManage ? 'PerformanceVoucherFinanceShowPanel' : 'PerformanceVoucherShowPanel') + editedVoucher.get('id');
                    if (Ext.getCmp(panelId))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                    Srims.performance.showVoucher(editedVoucher, store, isFinanceManage);
                    if (action == 'print')
                        window.open('PerformanceVoucherPrint.aspx?PerformanceVoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                }
            });
        }
    }, this);
}
Srims.performance.SetIsReadAndshowVoucher = function(voucher, store, isFinanceManage) {
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
            Srims.performance.showVoucher(voucher, store, isFinanceManage);
        }
    });

}
Srims.performance.showVoucher = function(voucher, store, isFinanceManage) {
    var panelId = (isFinanceManage ? 'PerformanceVoucherFinanceShowPanel' : 'PerformanceVoucherShowPanel') + voucher.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.performance.PerformanceVoucherShowPanel(panelId, voucher, store, isFinanceManage);
    Srims.WorkSpace.addPanel(panel);
}
Srims.performance.newPerformanceVoucher = function(performanceAllocation, allocationName) {
    var windowId = 'NewPerformanceVoucher' + allocationName;
    var voucher = new Srims.performance.PerformanceVoucher({});
    Srims.performance.ShowVoucherEditWindow(performanceAllocation, voucher, windowId, allocationName);
}
Srims.performance.editVoucher = function(fundAllocation, voucher, allocationName) {
    var windowId = 'EditPerformanceVoucher' + voucher.get('id');
    Srims.performance.ShowVoucherEditWindow(fundAllocation, voucher, windowId, allocationName);
}

Srims.performance.ShowVoucherEditWindow = function(performanceAllocation, voucher, windowId, allocationName) {
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: performanceAllocation.get('projectID')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var project = store.getAt(0);
            Ext.Ajax.request({
                url: Srims.service.common.NoticeTextService + '/Get',
                params: {
                    type: 'PerformanceAllocation'
                },
                success: function(response) {

                    var noticeTextStore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common.NoticeTextXmlReader()
                    });
                    var minAllocationMoney = noticeTextStore.getAt(0).get('value') * 1000000;
                    var window = Ext.getCmp(windowId);

                    if (!window)
                        var window = new Srims.performance.PerformanceVoucherEditWindow(id, performanceAllocation, voucher, project, allocationName, minAllocationMoney);

                    window.show();
                }
            })

        }
    })
}

Srims.performance.deleteVoucher = function(voucher, fundAllocation, isCorrect) {
    Ext.Ajax.request({
        url: Srims.service.performance.PerformanceVoucherService + '/Delete',
        params: {
            voucherId: voucher.get('id'),
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

Srims.performance.showEditAccountBookNumberWindow = function(voucher, fundAllocation) {
    var windowId = 'ResetPerformanceVoucherAccountBookNumber' + voucher.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.performance.PerformanceVoucherEditAccountBookNumberWindow(windowId, voucher, fundAllocation);

    window.show();
}
Srims.performance.showVoucherFundAllocationInfo = function(voucher) {
    Ext.Ajax.request({
        url: Srims.service.performance.PerformanceAllocationService + '/GetById',
        params: {
            performanceAllocationId: voucher.get('performanceAllocationId')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.performance.PerformanceAllocationXmlReader()
            });
            var currentPerformanceAllocation = store.getAt(0);
            Srims.performance.showPerformanceAllocationInfo(currentPerformanceAllocation);
        }
    });
}
