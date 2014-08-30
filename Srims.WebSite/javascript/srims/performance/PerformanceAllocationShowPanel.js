
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel = function(id, perfomanceAllocation) {

    this._fundAllocation = perfomanceAllocation;
    this._fundAllocation.panel = this;

    this._toolBar = new Srims.performance.PerformanceAllocationShowPanel_ToolBar(this._fundAllocation, this);
    this._formPanelBasic = new Srims.performance.PerformanceAllocationShowPanel_BasicForm(this._fundAllocation);
    //this._formPanelProjectInfor = new Srims.performance.PerformanceAllocationShowPanel_ProjectInforForm(this._fundAllocation.get('projectID'));


    this._formPanelFundAllocationStateHistory = new Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm(this._fundAllocation);
    this._formPanelFundMember = new Srims.performance.PerformanceAllocationShowPanel_FundMemberForm(this._fundAllocation.get('projectID'));
    this._formVoucher = new Srims.performance.PerformanceAllocationShowPanel_VoucherForm(this._fundAllocation, false);
    //this._formPerfomanceStateHistory = new Srims.fund.PerformanceAllocationShowPanel_PerfomanceStateHistoryForm(this._fundAllocation);
    var items = [];


    items = [this._formPanelBasic, this._formVoucher, this._formPanelFundMember, this._formPanelFundAllocationStateHistory];

    Srims.performance.PerformanceAllocationShowPanel.superclass.constructor.call(this, {
        id: id,
        title: '绩效分配',
        tbar: this._toolBar,
        frame: true,
        iconCls: 'icon-fund-allocation-show',
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        items: items
    });

    this.refresh = function() {
        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceAllocationService + '/GetById',
            params: {
                performanceAllocationId: perfomanceAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.performance.PerformanceAllocationXmlReader()
                });
                var currentFundAllocation = store.getAt(0);
                this._fundAllocation = currentFundAllocation;
                currentFundAllocation.panel = this;

                this._formPanelBasic.resetComponnentsValue(currentFundAllocation);
                this._formPanelFundAllocationStateHistory._store.load();
                this._formPanelFundMember._store.load();
                this._formVoucher._store.load();
                this._formVoucher._tbar.resetComponentFundAllocation(currentFundAllocation);
                this._toolBar.resetButtonVisibleAndDisabled(currentFundAllocation);
                this._toolBar.resetButtonFundAllocation(currentFundAllocation);
            }
        });
    }
}

Ext.extend(Srims.performance.PerformanceAllocationShowPanel, Ext.Panel, {});
