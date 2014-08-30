if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationShowPanel_ToolBar = function(fundAllocation, panel) {
    var isAllocationOut;
    if (fundAllocation.get('fundPlanOut') == 0)
    { isAllocationOut == false; }
    else if (fundAllocation.get('allocationOut') == 0 && fundAllocation.get('allocationIn') == 0 && fundAllocation.get('allocationWantOut') == 0) {
        Ext.MessageBox.show({
            title: '是否分配外协',
            msg: '您的本次分配是否有外协分配？<br />注意：如需要分配外协，请将外协经费分配在负责人名下！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
                if (button == 'no')
                    isAllocationOut = false;
                else
                    isAllocationOut = true;
                panel.refresh();
            },
            icon: Ext.MessageBox.QUESTION
        });
    }
    else {
        isAllocationOut = true;
    }
    this._fundAllocation = fundAllocation;
    var fundOut = false;
    this._buttonAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '经费分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            var currentFundAllocation = panel._fundAllocation;
            var allocationOut = currentFundAllocation.get('allocationOut');
            var b = currentFundAllocation.get('allocationWantOut');
            if (currentFundAllocation.get('allocationOut') == 0 && fundAllocation.get('allocationIn') == 0 && currentFundAllocation.get('allocationWantOut') == 0 && isAllocationOut == true)
                Srims.fund.showFundAllocationOutWindow(fundAllocation);
            else
                Srims.fund.newVoucher(this.fundAllocation, false, "校内");
        },
        hidden: true,
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配，<br/>已分配：' + Money.render(fundAllocation.get('allocationIn')) + '，未分配：' + Money.render(fundAllocation.get('allocationTotal') - fundAllocation.get('overheadExpenses') - fundAllocation.get('allocationOut') - fundAllocation.get('allocationIn')) + '，可分配总额：' + Money.render(fundAllocation.get('allocationTotal') - fundAllocation.get('overheadExpenses') - fundAllocation.get('allocationOut'))
    });

    this._buttonSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-submit',
        text: '提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.fund.FundAllocationService + '/CheckOutsourcing',
                params: { fundAllocationId: this.fundAllocation.get('id') },
                scope: this,
                success: function(response) {
                    var result = response.responseText;
                    if (result == 'true') {
                        Ext.MessageBox.confirm('提交经费分配', '你确定要提交这次经费分配吗？', function(buttonId) {
                            if (buttonId == 'yes')
                                Srims.fund.submitFundAllocation(this.fundAllocation);
                        }, this);

                    }
                    else {
                        //                        Ext.Msg.show({
                        //                            title: '提交警告',
                        //                            msg: '存在某外协公司分配金额超过当年允许分配最大额。详情如下：<br/>' + result,
                        //                            buttons: Ext.Msg.OK,
                        //                            icon: Ext.MessageBox.WARNING
                        //                        });
                        Ext.MessageBox.confirm('提交经费分配', '存在某外协公司分配金额超过当年允许分配最大额。详情如下：<br/>' + result + '<br/>你确定要提交这次经费分配吗？', function(buttonId) {
                            if (buttonId == 'yes')
                                Srims.fund.submitFundAllocation(this.fundAllocation);
                        }, this);
                    }
                }
            });

        },
        hidden: true,
        tooltip: '<b>提交经费分配</b><br/>提交本次经费分配'
    });
    this._PTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '     本次计划分配外协费用：' + Money.render(this._fundAllocation.get('allocationWantOut')) + '。     请注意：外协费用只能分配给项目负责人！'
    });
    this._buttonOutAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '填写/修改外协分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            var fundAllocation = this.fundAllocation;
            fundAllocation.panel = panel;
            Srims.fund.showFundAllocationOutWindow(fundAllocation);
        },
        hidden: true,
        tooltip: '<b>填写外协分配</b><br/>若有外协单位，必须先指定外协分配，才能进行经费分配。'
    });

    this._buttonUndoSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-submit',
        text: '撤销提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('撤销经费分配', '你确定要撤销这次经费分配吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.fund.undoSubmitFundAllocation(this.fundAllocation);
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
            Srims.fund.showFundAllocationCensorWindow(this.fundAllocation, true);
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
            Srims.fund.showFundAllocationCensorWindow(this.fundAllocation, false);
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
                    Srims.fund.cancelFundAllocation(this.fundAllocation);
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
                    Srims.fund.CorrectAllocation(this.fundAllocation);
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
            Srims.fund.CorrectAllocationDateTime(this.fundAllocation)
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

    items = [this._buttonOutAllocation, this._buttonAllocation, this._buttonSubmit, this._buttonUndoSubmit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCancel, this._buttonAllocationDateTimeCorrect, this._buttonAllocationCorrect, this._PTextLabel, new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.fund.FundAllocationShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));

    this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));

    this.resetButtonVisibleAndDisabled = function(fundAllocation) {

        this._fundAllocation = fundAllocation;
        //刷新本次外协分配额度
        this._PTextLabel.setText('     本次计划分配外协费用：' + Money.render(this._fundAllocation.get('allocationWantOut')) + '。     请注意：外协费用只能分配给项目负责人！');
        if (fundAllocation.get('canAllocation') || fundAllocation.get('canSubmit') || fundAllocation.get('canAllocationPerformancePay')) {

            this._buttonOutAllocation.setVisible(fundAllocation.get('hasPermission_Allocation'));
            this._buttonOutAllocation.setDisabled(!fundAllocation.get('canAllocation') || fundAllocation.get('allocationOut') > 0 || fundAllocation.get('allocationIn') > 0 || fundAllocation.get('fundPlanOut') == 0 || isAllocationOut == false);

            this._buttonAllocation.setDisabled(!fundAllocation.get('canAllocation'));
            this._buttonAllocation.setVisible(fundAllocation.get('hasPermission_Allocation'));


            this._buttonSubmit.setVisible(fundAllocation.get('hasPermission_Submit'));
            this._buttonSubmit.setDisabled(!fundAllocation.get('canSubmit'));
        } else {
            this._buttonOutAllocation.setVisible(false);
            this._buttonAllocation.setVisible(false);
            this._buttonSubmit.setVisible(false);
        }
        var user = Srims.currentLoginLog.user;
        this._buttonUndoSubmit.setVisible(fundAllocation.get('canUndoSubmit') && user.userRoleType == Srims.users.UserRoleType.Expert);
        this._buttonUndoSubmit.setDisabled(!fundAllocation.get('canUndoSubmit'));

        this._buttonCensorPass.setVisible(fundAllocation.get('canCensorPass'));
        this._buttonCensorPass.setDisabled(!fundAllocation.get('canCensorPass'));

        this._buttonCensorReject.setVisible(fundAllocation.get('canCensorReject'));
        this._buttonCensorReject.setDisabled(!fundAllocation.get('canCensorReject'));

        this._buttonCancel.setVisible(fundAllocation.get('canCancel') || user.isSuper);
        this._buttonCancel.setDisabled(!fundAllocation.get('canCancel') && !user.isSuper);

        this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));

        this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));
    }
    this.resetButtonFundAllocation = function(fundAllocation) {
        this._buttonAllocation.fundAllocation = fundAllocation;
        this._buttonSubmit.fundAllocation = fundAllocation;
        this._buttonUndoSubmit.fundAllocation = fundAllocation;
        this._buttonCensorPass.fundAllocation = fundAllocation;
        this._buttonCensorReject.fundAllocation = fundAllocation;
        this._buttonCancel.fundAllocation = fundAllocation;
        this._buttonAllocationCorrect.fundAllocation = fundAllocation;
        this._buttonAllocationDateTimeCorrect.fundAllocation = fundAllocation;
    }
    this.resetButtonVisibleAndDisabled(fundAllocation);
}
Ext.extend(Srims.fund.FundAllocationShowPanel_ToolBar, Ext.Toolbar);