if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherEditWindow_InForm = function(fundAllocation, voucher, project, canAllocationAmount, projectCanAllocationInAmount, allocatinName, minAllocationMoney) {

    this._fundAllocation = fundAllocation;
    this._voucher = voucher;
    this._project = project;
    this._allocatinName = allocatinName;

    this._comboBoxFundMember = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经费成员',
        value: this._voucher.get('expertName'),
        selectEntityId: this._voucher.get('expertID'),
        allowBlank: false,
        width: 160
    });
    this._checkboxIsSecondCollege = new Ext.form.Checkbox({
        fieldLabel: '双聘单位',
        checked: this._voucher.get('isExpertSecondCollege'),
        disabled: true
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: this._allocatinName + '分配(万元)',
        value: this._voucher.get('performancePay'),
        allowBlank: false,
        msgTarget: 'side',
        allowNegative: false,
        width: 160
    });

    var items;
    items = [this._comboBoxFundMember, this._checkboxIsSecondCollege, this._numberFieldFundAmount];
    Srims.performance.PerformanceVoucherEditWindow_InForm.superclass.constructor.call(this, {
        title: '注意：可分配绩效总额：' + Money.render(fundAllocation.get('arrivedPerformance')) + '，已分配绩效：' + Money.render(fundAllocation.get('allocatedPerformance')) + '，未分配绩效：' + Money.render(canAllocationAmount) + '。<br />每笔分配金额不能小于：' + Money.render(minAllocationMoney) + '；剩余金额小于' + Money.render(minAllocationMoney) + '，将不能分配',

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
        //检查经费成员是否是项目成员
        var expertID = comboBox.getEntity().get('id');
        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceAllocationService + '/CheckExpertByID',
            params: {
                ExpertId: expertID,
                FundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                if (!Boolean.toBoolean(response.responseText))
                    Ext.MessageBox.show({
                        title: '确认绩效分配成员',
                        msg: '注意：您添加的绩效分配成员不在项目成员中！',
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
        if (fundAmount < minAllocationMoney) {
            this.invalidText = '分配金额不能小于：' + Money.render(minAllocationMoney);
            return false;
        }
        if (canAllocationAmount - fundAmount < minAllocationMoney) {
            if (canAllocationAmount - fundAmount != 0) {
                this.invalidText = '剩余金额小于' + Money.render(minAllocationMoney) + '，将不能分配';
                return false;
            }
        }


        return true;
    }
    this._numberFieldFundAmount.panel = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    this.validate = function(preventMark) {
        var result = true;

        result = this._comboBoxFundMember.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        return result;
    }
    this.assginValues = function() {
        this._voucher.set('performancePay', this._numberFieldFundAmount.getMoney());
        this._voucher.set('projectID', this._fundAllocation.get('projectID'));
        this._voucher.set('expertID', this._comboBoxFundMember.getValue());
        this._voucher.set('expertName', this._comboBoxFundMember.getText());
        this._voucher.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
        this._voucher.set('performanceAllocationId', this._fundAllocation.get('id'));

    }
    this.focus = function() {
        this._comboBoxFundMember.focus(false, true);
    }
}
Ext.extend(Srims.performance.PerformanceVoucherEditWindow_InForm, Ext.form.FormPanel, {})