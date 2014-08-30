
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationShowPanel_ToolBar = function(fundAllocation, panel) {

    this._fundAllocation = fundAllocation;

    this._buttonPerformanceAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '填写/修改绩效分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            var fundAllocation = this.fundAllocation;
            fundAllocation.panel = panel;
            Srims.performance.showFundAllocationPerformanceWindow(fundAllocation);
        },
        hidden: true,
        tooltip: '<b>填写绩效分配。</b>'
    });


    this._buttonAllocationPerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '绩效分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.performance.newPerformanceVoucher(this.fundAllocation, "绩效");
        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配<br/>已分配绩效：' + Money.render(fundAllocation.get('allocatedPerformance')) + '，未分配绩效：' + Money.render(fundAllocation.get('arrivedPerformance') - fundAllocation.get('allocatedPerformance')) + '，绩效总额：' + Money.render(fundAllocation.get('arrivedPerformance'))
    });
    this._buttonSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-submit',
        text: '提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('提交经费分配', '你确定要提交这次经费分配吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.submitPerformanceAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交经费分配</b><br/>提交本次经费分配'
    });
    this._buttonUndoSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-submit',
        text: '撤销提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('撤销经费分配', '你确定要撤销这次经费分配吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.undoSubmitFundAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销提交经费分配</b><br/>撤销提交本次经费分配'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        panel: panel,
        handler: function() {
            var islegal = true;
            var vouchers = this.panel._formVoucher._gridPanelVoucher.store.getRange();
            for (var i = 0; i < vouchers.length; i++) {
                if (String.isEmpty(vouchers[i].get('accountBookNumber')) ||
				String.Trim(vouchers[i].get('accountBookNumber')) == '新建') {
                    islegal = false;
                    break;
                }
            }

            if (!islegal) {
                Ext.Msg.show({
                    title: '凭单审核通过错误',
                    msg: '分配生成的凭单中有凭单号为空或新建，请输入正确的账本号后，再审核通过',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return;
            }
            //判断绩效经费成员是不是在项目成员中
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceAllocationService + '/CheckExpertByPerformanceAllocation',
                params: {
                    PerformanceAllocationId: fundAllocation.get('id')
                },
                scope: this,
                success: function(response) {
                    if (response.responseText != 'blank')
                        Ext.MessageBox.show({
                            title: '经费成员不在项目成员中',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.YESNO,
                            scope: this,
                            fn: function(button) {
                                if (button == 'yes')
                                    Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, true);
                            },
                            icon: Ext.MessageBox.QUESTION
                        });
                    else {
                        Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, true);
                    }
                }
            });
            //Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, true);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过本次经费分配'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        handler: function() {
            Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回本次经费分配'
    });
    this._buttonCancel = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel',
        text: '作废',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        handler: function() {

            Ext.MessageBox.confirm('作废经费分配', '你确定要作废这次经费分配吗？此操作不可撤销', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.cancelFundAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>作废</b><br/>作废本次经费分配'
    });
    this._buttonAllocationCorrect = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配纠正',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('纠正经费分配', '纠正经费分配前，请先确认经费分配时间是否正确。', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.CorrectAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>纠正经费分配</b><br/>对经费分配进行纠正'
    });
    this._buttonAllocationDateTimeCorrect = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation-datetime-correct',
        text: '分配日期纠正',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.performance.CorrectAllocationDateTime(this.fundAllocation)
        },
        hidden: true,
        tooltip: '<b>纠正经费分配日期</b><br/>对经费分配的日期进行纠正'
    });

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            panel.refresh();
        },
        tooltip: '<b>刷新经费分配信息</b><br/>刷新经费分配信息'
    });

    items = [this._buttonPerformanceAllocation, this._buttonAllocationPerformance, this._buttonSubmit, this._buttonUndoSubmit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCancel, this._buttonAllocationDateTimeCorrect, this._buttonAllocationCorrect, new Ext.Toolbar.TextItem('&nbsp;  &nbsp; &nbsp; &nbsp;   <font color="FF0000">  提醒： 绩效经费具体分配事宜请联系财务处。</font>'), new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.performance.PerformanceAllocationShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));
    this._buttonPerformanceAllocation.setVisible(fundAllocation.get('canChangePerformanceAmount'));
    this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));

    this.resetButtonVisibleAndDisabled = function(fundAllocation) {

        this._fundAllocation = fundAllocation;

        if (fundAllocation.get('canAllocation') || fundAllocation.get('canSubmit')) {

            this._buttonAllocationPerformance.setVisible(fundAllocation.get('hasPermission_Allocation') && !fundAllocation.get('isCancel'));
            this._buttonAllocationPerformance.setDisabled(!fundAllocation.get('canAllocation'));
            this._buttonSubmit.setVisible(fundAllocation.get('hasPermission_Submit'));
            this._buttonSubmit.setDisabled(!fundAllocation.get('canSubmit'));
        } else {
            this._buttonSubmit.setVisible(false);
        }
        this._buttonPerformanceAllocation.setVisible(fundAllocation.get('canChangePerformanceAmount'));
        this._buttonUndoSubmit.setVisible(fundAllocation.get('canUndoSubmit'));
        this._buttonUndoSubmit.setDisabled(!fundAllocation.get('canUndoSubmit'));

        this._buttonCensorPass.setVisible(fundAllocation.get('canCensorPass'));
        this._buttonCensorPass.setDisabled(!fundAllocation.get('canCensorPass'));

        this._buttonCensorReject.setVisible(fundAllocation.get('canCensorReject'));
        this._buttonCensorReject.setDisabled(!fundAllocation.get('canCensorReject'));

        this._buttonCancel.setVisible(fundAllocation.get('canCancel'));
        this._buttonCancel.setDisabled(!fundAllocation.get('canCancel'));

        this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));

        this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));
    }
    this.resetButtonFundAllocation = function(fundAllocation) {
        this._buttonSubmit.fundAllocation = fundAllocation;
        this._buttonUndoSubmit.fundAllocation = fundAllocation;
        this._buttonCensorPass.fundAllocation = fundAllocation;
        this._buttonCensorReject.fundAllocation = fundAllocation;
        this._buttonCancel.fundAllocation = fundAllocation;
        this._buttonAllocationCorrect.fundAllocation = fundAllocation;
        this._buttonAllocationDateTimeCorrect.fundAllocation = fundAllocation;
        this._buttonAllocationPerformance.fundAllocation = fundAllocation;
    }
    this.resetButtonVisibleAndDisabled(fundAllocation);
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_ToolBar, Ext.Toolbar);