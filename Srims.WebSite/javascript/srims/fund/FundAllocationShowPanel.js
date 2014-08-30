
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel = function(id, fundAllocation) {

    this._fundAllocation = fundAllocation;
    this._fundAllocation.panel = this;
    this._isAjaxRequestCompleted = false;

    this._toolBar = new Srims.fund.FundAllocationShowPanel_ToolBar(this._fundAllocation, this);
    this._formPanelBasic = new Srims.fund.FundAllocationShowPanel_BasicForm(this._fundAllocation,false);
    this._formPanelProjectInfor = new Srims.fund.FundAllocationShowPanel_ProjectInforForm(this._fundAllocation.get('projectID'));
    this._formPanelProjectContract = new Srims.projects.ProjectShowPanel_ContractForm(this._fundAllocation.get('projectID'));

    var finance = new Srims.fund.Finance({});
    finance.set('amount', this._fundAllocation.get('financeAmount'));
    finance.set('receivedDate', this._fundAllocation.get('financeReceivedDate'));
    finance.set('voucherNumber', this._fundAllocation.get('financeVoucherNumber'));
    finance.set('abstract', this._fundAllocation.get('financeAbstract'));
    this._formPanelFinance = new Srims.fund.FinanceShowForm(finance, this._fundAllocation.get('isBorrow'));

    this._formPanelFundAllocationStateHistory = new Srims.fund.FundAllocationShowPanel_StateHistoryForm(this._fundAllocation);
    this._formPanelFundMember = new Srims.fund.FundAllocationShowPanel_FundMemberForm(this._fundAllocation.get('projectID'));
    this._formVoucher = new Srims.fund.FundAllocationShowPanel_VoucherForm(this._fundAllocation, false);
    this._formFundDescendStateHistory = new Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm(this._fundAllocation);
    var user = Srims.currentLoginLog.user;
    var items = [];

    if (user.userRoleType == 'Expert')
        items = [this._formPanelBasic, this._formVoucher, this._formPanelProjectInfor];
    else
        items = [this._formPanelBasic, this._formVoucher, this._formPanelFundMember, this._formPanelFundAllocationStateHistory, this._formFundDescendStateHistory, this._formPanelProjectInfor, this._formPanelProjectContract, this._formPanelFinance];

    Srims.fund.FundAllocationShowPanel.superclass.constructor.call(this, {
        id: id,
        title: '经费分配',
        tbar: this._toolBar,
        frame: true,
        iconCls: 'icon-fund-allocation-show',
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        items: items
    });
    //下载合同方法
    Srims.projects.downLoadContract = function(contract) {
        Srims.documents.downLoadResource(contract.get('contractResource'),'/GetContract');
    }

    this.refresh = function() {
        // this._isAjaxRequestCompleted = false;
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
                this._fundAllocation = currentFundAllocation;
                currentFundAllocation.panel = this;
                //this._isAjaxRequestCompleted = true;

                this._formPanelBasic.resetComponnentsValue(currentFundAllocation);
                this._formPanelFundAllocationStateHistory._store.load();
                this._formPanelFundMember._store.load();
                this._formVoucher._store.load();
                this._formVoucher._tbar.resetComponentFundAllocation(currentFundAllocation);
                this._formFundDescendStateHistory._store.load();
                this._formPanelProjectContract._store.load();
                this._formPanelProjectInfor.setCompontentValue(fundAllocation.get('projectID'));
                this._toolBar.resetButtonVisibleAndDisabled(currentFundAllocation);
                this._toolBar.resetButtonFundAllocation(currentFundAllocation);
                if (currentFundAllocation.get('canSubmit') == true && Srims.currentLoginLog.user.userRoleType == 'Expert') {
                    Ext.MessageBox.show({
                        title: '请提交经费分配！',
                        msg: '注意：本次经费分配已经完成，如果不需要修改请点击提交按钮,等待管理员审核。',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                            if (button == 'yes')
                                return true;
                        },
                        icon: Ext.MessageBox.QUESTION
                    });
                }
            }
        });
    }
}

Ext.extend(Srims.fund.FundAllocationShowPanel, Ext.Panel, {});
