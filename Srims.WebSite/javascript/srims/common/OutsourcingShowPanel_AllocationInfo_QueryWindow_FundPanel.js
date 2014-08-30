
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel = function() {

    this._textFieldFundFroms = new Ext.form.TextField({
        fieldLabel: '资金来源',
        width: 280
    });
    this._numberFieldFundTotalBegin = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractBegin = new Srims.component.MoneyField({
        fieldLabel: '合同额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceiedBegin = new Srims.component.MoneyField({
        fieldLabel: '已到经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceivedEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._checkboxIsBorrowMoney = new Ext.form.Checkbox({
        fieldLabel: '借款'
    });
    this._checkboxIsNotReturnAll = new Ext.form.Checkbox({
        fieldLabel: '未还清借款'
    });
    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel.superclass.constructor.call(this, {
        title: '经费信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 100,
                items: [this._numberFieldFundTotalBegin, this._numberFieldFundContractBegin, this._numberFieldFundReceiedBegin, this._checkboxIsNotReturnAll]
            }), new Ext.Panel({
                labelWidth: 30,
                layout: 'form',
                items: [this._numberFieldFundTotalEnd, this._numberFieldFundContractEnd, this._numberFieldFundReceivedEnd, this._checkboxIsBorrowMoney]
            })]
        }), this._textFieldFundFroms]
    });

    this.buildParams = function(params) {
        params.fundFroms = this._textFieldFundFroms.getValue();
        params.fundTotalStart = this._numberFieldFundTotalBegin.getMoney();
        params.fundTotalEnd = this._numberFieldFundTotalEnd.getMoney();
        params.fundContractStart = this._numberFieldFundContractBegin.getMoney();
        params.fundContractEnd = this._numberFieldFundContractEnd.getMoney();
        params.fundReceivedStart = this._numberFieldFundReceiedBegin.getMoney();
        params.fundReceivedEnd = this._numberFieldFundReceivedEnd.getMoney();
        params.isBorrowMoney = this._checkboxIsBorrowMoney.checked ? this._checkboxIsBorrowMoney.getValue() : '';
        params.isNotReturnAll = this._checkboxIsNotReturnAll.checked ? this._checkboxIsNotReturnAll.getValue() : '';
    }
    this.clearParams = function() {
        this._textFieldFundFroms.reset();
        this._numberFieldFundTotalBegin.reset();
        this._numberFieldFundTotalEnd.reset();
        this._numberFieldFundContractBegin.reset();
        this._numberFieldFundContractEnd.reset();
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel, Ext.FormPanel);

