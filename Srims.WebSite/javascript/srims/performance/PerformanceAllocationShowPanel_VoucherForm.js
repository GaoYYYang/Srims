if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_VoucherForm = function(perfomance, isExpertGuid) {

    var load_url = Srims.service.performance.PerformanceVoucherService + '/GetByPerformanceAllocation';
    this._store = new Srims.performance.PerformanceVoucherStore(load_url, {
        performanceId: perfomance.get('id')
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Ext.grid.ColumnModel([{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        hidden: isExpertGuid
    }, {
        header: "经费成员",
        dataIndex: 'expertName'
    }, {
        header: "绩效金额(万元)",
        dataIndex: 'performancePay',
        renderer: Money.render
    }, {
        header: "课题组间接费用金额(万元)",
        dataIndex: 'overheadExpensesExpertRest',
        renderer: Money.render
    }, {
        header: "账本号",
        dataIndex: 'accountBookNumber'
    }, {
        id: 'voucherState',
        header: "状态",
        dataIndex: 'voucherState',
        hidden: isExpertGuid,
        renderer: Srims.performance.VoucherStateRender
}]);
        this._tbar = new Srims.performance.PerformanceVoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, perfomance, isExpertGuid, false);

        this._gridPanelVoucher = new Ext.grid.GridPanel({
            store: this._store,
            colModel: this._columnModel,
            enableColumnHide: false,
            enableColumnMove: true,
            enableHdMenu: false,
            border: false,
            tbar: this._tbar,
            sm: this._selections,
            width: 700,
            autoExpand: true,
            autoExpandColumn: 'voucherState',
            style: isExpertGuid == true ? 'padding:10px' : '',
            stripeRows: true,
            loadMask: true,
            autoHeight: true,
            stateful: false,
            viewConfig: {
                autoFill: true,
                scrollOffset: 0,
                forceFit: true,
                emptyText: '没有凭单信息'
            }
        });

        Srims.performance.PerformanceAllocationShowPanel_VoucherForm.superclass.constructor.call(this, {
            collapsible: true,
            title: '绩效分配凭单信息',
            frame: true,
            labelWidth: 100,
            layout: 'form',
            bodyStyle: 'padding:0 5px 0',
            style: 'margin-bottom: 2px',
            defaultType: 'textfield',
            titleCollapse: true,
            items: [this._gridPanelVoucher]
        });

        this._store.load();
        //仅专家向导使用
        this._gridPanelVoucher.form = this;
        this._gridPanelVoucher.refresh = function() {

            Ext.Ajax.request({
                url: Srims.service.fund.perfomanceService + '/GetById',
                params: {
                    perfomanceId: this.perfomance.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.fund.perfomanceXmlReader()
                    });
                    var currentperfomance = store.getAt(0);
                    this._perfomance = currentperfomance;
                    currentperfomance.panel = this;

                    this.getStore().load();
                    this.form._tbar.resetComponentperfomance(currentperfomance);
                    if (currentperfomance.get('canAllocation')) {
                        this.button.panel.next();
                        this.button.setText('分配');
                    } else if (currentperfomance.get('canSubmit'))
                        this.button.setText('提交');
                    else
                        this.button.setText('撤销提交');
                }
            });
        }
        function onCellDblClick(grid, rowIndex, columnIndex, e) {
            var voucher = grid.getStore().getAt(rowIndex);
            if (!voucher.get('canEdit'))
                return;

            Srims.fund.editVoucher(perfomance, voucher);
        };

        this._gridPanelVoucher.on('celldblclick', onCellDblClick);
    }
    Ext.extend(Srims.performance.PerformanceAllocationShowPanel_VoucherForm, Ext.form.FormPanel, {});