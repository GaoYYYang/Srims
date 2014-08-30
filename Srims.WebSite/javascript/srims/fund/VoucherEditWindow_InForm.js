if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherEditWindow_InForm = function(fundAllocation, voucher, project, canAllocationAmount, projectCanAllocationInAmount, isCorrect, allocatinName) {

    this._fundAllocation = fundAllocation;
    this._voucher = voucher;
    this._project = project;
    this._allocatinName = allocatinName;

    this._comboBoxFundMember = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经费成员',
        value: this._voucher.get('expertName'),
        selectEntityId: this._voucher.get('expertID'),
        allowBlank: false,
        panel: this,
        width: 160
    });
    this._checkboxIsSecondCollege = new Ext.form.Checkbox({
        fieldLabel: '双聘单位',
        checked: this._voucher.get('isExpertSecondCollege'),
        disabled: true
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: this._allocatinName + '分配(万元)',
        value: this._allocatinName == "校内" ? this._voucher.get('allocationIn') : this._voucher.get('performancePay'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });

    this._fieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        allowBlank: false,
        value: this._voucher.get('accountBookNumber'),
        width: 160
    });
    this._fieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        allowBlank: false,
        value: this._voucher.get('voucherNumber'),
        width: 160
    });
    this._PTextLabel = new Ext.form.Label({
        style: "color:#FF0000",
        text: '本次最高分配：' + Money.render(canAllocationAmount)
    });
    var items;
    if (!isCorrect)
        items = [this._comboBoxFundMember, this._checkboxIsSecondCollege, this._numberFieldFundAmount];
    else
        items = [this._comboBoxFundMember, this._checkboxIsSecondCollege, this._numberFieldFundAmount, this._fieldAccountBookNumber, this._fieldVoucherNumber];
    var totle = fundAllocation.get('allocationTotal') - fundAllocation.get('overheadExpenses') - fundAllocation.get('allocationWantOut');
    var direct = fundAllocation.get('allocationTotal') - fundAllocation.get('allocationWantOut') - fundAllocation.get('allocationHardware') - fundAllocation.get('overheadExpensesExpert') - fundAllocation.get('overheadExpensesMiddle') - fundAllocation.get('overheadExpensesIn') - fundAllocation.get('overheadExpensesOut');
    var indirect = fundAllocation.get('overheadExpensesExpert') + fundAllocation.get('overheadExpensesMiddle') + fundAllocation.get('overheadExpensesIn');
    var outmanagefee = fundAllocation.get('overheadExpensesOut');
    if (project.get('isHorizontal'))
        var h_title = '注意：本次到款' + Money.render(fundAllocation.get('allocationTotal')) + '，其中外协' + Money.render(fundAllocation.get('allocationWantOut')) + '。直接费用' + Money.render(direct) + '，间接费用' + Money.render(indirect) + '，外协管理费' + Money.render(outmanagefee) + '万元，<br />间接费用将自动分配到项目负责人名下。本次分配还可分直接费用为：' + '<font color="red">' + Money.render(canAllocationAmount) + '</font>。<br />如果本次有外协分配，请首先分配项目负责人。';

    else
        var h_title = '注意：本次到款' + Money.render(fundAllocation.get('allocationTotal')) + '，其中外协' + Money.render(fundAllocation.get('allocationWantOut')) + '。直接费用' + Money.render(direct) + '，间接费用' + Money.render(indirect) + '，<br />间接费用将自动分配到项目负责人名下。本次分配还可分直接费用为：' + '<font color="red">' + Money.render(canAllocationAmount) + '</font>。<br />如果本次有外协分配，请首先分配项目负责人。';

    Srims.fund.VoucherEditWindow_InForm.superclass.constructor.call(this, {
        //title: this._allocatinName + '分配',//：即扣除间接费和外协分配之后可分配：'+Money.render(totle)+'，已分配：'+Money.render(fundAllocation.get('allocationIn'))+'，未分配：' + Money.render(canAllocationAmount),
        //本次到款？万元，其中外协？万元。直接费用？万元，间接费用？万元，间接费用将自动分配到负责人名下，本次分配还可分直接费用为？万
        title: h_title,
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 100,
        items: items
    });
    this._comboBoxFundMember.checkboxIsSecondCollege = this._checkboxIsSecondCollege;
    this.comboBoxFundMember_Change = function(comboBox) {
        //若此人已分配过经费，如需继续为其分配经费，请删除原分配纪录后重新分配
        var expertID = comboBox.getEntity().get('id');
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/CheckExpertIsAllocated',
            params: {
                ExpertId: expertID,
                FundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.MessageBox.show({
                        title: '用户已有分配',
                        msg: '此人已分配过经费，如需继续为其分配经费，请删除原分配纪录后重新分配。',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                            if (button == 'yes')
                                return true;

                        },
                        icon: Ext.MessageBox.QUESTION
                    });
                    comboBox.setValue('');
                }
                else {
                    //检查经费成员是否是项目成员

                    Ext.Ajax.request({
                        url: Srims.service.fund.FundAllocationService + '/CheckExpertByID',
                        params: {
                            ExpertId: expertID,
                            FundAllocationId: fundAllocation.get('id')
                        },
                        scope: this,
                        success: function(response) {
                            if (!Boolean.toBoolean(response.responseText))
                                Ext.MessageBox.show({
                                    title: '确认经费成员',
                                    msg: '注意：您添加的经费成员不在项目成员中！<br />保存后该专家将自动添加至项目成员中,位次将从999起始逆序排列。',
                                    buttons: Ext.MessageBox.OK,
                                    scope: this,
                                    fn: function(button) {
                                        if (button == 'yes')
                                            return true;

                                    },
                                    icon: Ext.MessageBox.QUESTION
                                });
                        }
                    });
                }

            }
        });
        //        Ext.Ajax.request({
        //            url: Srims.service.fund.VoucherService + '/CheckExpertIsAllocated',
        //            params: {
        //                ExpertId: expertID,
        //                FundAllocationId: fundAllocation.get('id')
        //            },
        //            scope: this,
        //            success: function() {
        //                if (Boolean.toBoolean(response.responseText)) {
        //                    Ext.Msg.show({
        //                        title: '用户已有分配',
        //                        msg: '此人已分配过经费，如需继续为其分配经费，请删除原分配纪录后重新分配：',
        //                        buttons: Ext.Msg.OK,
        //                        icon: Ext.MessageBox.INFO
        //                    });
        //                    comboBox.setValue('');
        //                }
        //            }
        //        });

        //检查专家是否是项目负责人，将外协框置灰
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/DecideOutsourcingGrid',
            params: {
                ExpertId: expertID,
                FundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            async: false,
            success: function(response) {
                if (Boolean.toBoolean(response.responseText) && fundAllocation.get('allocationWantOut') != 0) {
                    comboBox.ownerCt.ownerCt._editGridPanel.enable();
                }
                else {
                    comboBox.ownerCt.ownerCt._editGridPanel.disable();
                }
            }
        });
        //处理专家变化
        var expertSecondCollege = comboBox.getEntity().get('college2');
        if (expertSecondCollege != '') {
            comboBox.checkboxIsSecondCollege.setDisabled(false);
        };
    }
    this._comboBoxFundMember.on('change', this.comboBoxFundMember_Change);

    this.validateFundAmount = function() {
        var panel = this.panel;

        var fundAmount = this.getMoney();

        if (fundAmount > canAllocationAmount) {
            this.invalidText = '分配金额不能大于经费未分配总额：' + Money.render(canAllocationAmount);
            return false;
        }
        if (this._allocatinName == "校内" && fundAmount > projectCanAllocationInAmount) {
            this.invalidText = '分配金额不能大于经费分配的最高校内分配金额：' + Money.render(projectCanAllocationInAmount);
            return false;
        }

        return true;
    }
    this._numberFieldFundAmount.panel = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    //this._numberFieldFundContract.on('change',this._onNumberFieldFundContract_Change);
    //    this._comboBoxFundMember.on('change', this._oncomboBoxFundMember_Change);
    //    var memberId = this._comboBoxFundMember.getEntity().get('expertID');
    //    this._oncomboBoxFundMember_Change = function() {

    //    }

    this.validate = function(preventMark) {
        var result = true;

        result = this._comboBoxFundMember.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        if (isCorrect) {
            result = this._numberFieldFundAmount.isValid(preventMark) && result;
            result = this._numberFieldFundAmount.isValid(preventMark) && result;
        }

        return result;
    }
    this.assginValues = function() {
        if (this._allocatinName == '校内') {
            this._voucher.set('allocationIn', this._numberFieldFundAmount.getMoney());
            this._voucher.set('performancePay', "");
        } else {
            this._voucher.set('allocationIn', "");
            this._voucher.set('performancePay', this._numberFieldFundAmount.getMoney());
            this._voucher.set('projectID', this._fundAllocation.get('projectID'));
        }
        this._voucher.set('expertID', this._comboBoxFundMember.getValue());
        this._voucher.set('expertName', this._comboBoxFundMember.getText());
        this._voucher.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
        this._voucher.set('fundAllocationID', this._fundAllocation.get('id'));

        if (isCorrect) {
            this._voucher.set('accountBookNumber', this._fieldAccountBookNumber.getValue());
            this._voucher.set('voucherNumber', this._fieldVoucherNumber.getValue());
        }

    }
    this.focus = function() {
        this._comboBoxFundMember.focus(false, true);
    }
}
Ext.extend(Srims.fund.VoucherEditWindow_InForm, Ext.form.FormPanel, {})