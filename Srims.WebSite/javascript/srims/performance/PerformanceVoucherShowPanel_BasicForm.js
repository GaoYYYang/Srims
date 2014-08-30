if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_BasicForm = function(voucher) {
    this._voucher = voucher;

    this._textFieldFundMember = new Ext.form.TextField({
        fieldLabel: '绩效经费成员',
        value: voucher.get('expertName'),
        readOnly: true,
        width: 160
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '绩效账本号',
        value: voucher.get('accountBookNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '绩效金额',
        value: Money.render(voucher.get('performancePay')),
        readOnly: true,
        width: 160
    });
    this._textFieldExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(voucher.get('overheadExpensesExpert')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.performance.VoucherStateRender(voucher.get('voucherState')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(voucher.get('stateDateTime')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: voucher.get('stateOperator'),
        readOnly: true,
        width: 160
    });
    var columnFirstItems = [this._textFieldFundMember, this._textFieldAmount, this._textFieldCurrentStateTime, this._textFieldCurrentStateOperator];
    var columnSecondItems = [this._textFieldAccountBookNumber, this._textFieldExpert, this._textFieldFinanceNumber, this._textFieldCurrentState];

    Srims.performance.PerformanceVoucherShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    //方法
    this.resetValues = function(voucher) {
        this._textFieldFundMember.setValue(voucher.get('expertName'));
        this._textFieldAccountBookNumber.setValue(voucher.get('accountBookNumber'));
        this._textFieldFinanceNumber.setValue(voucher.get('financeNumber'));
        this._textFieldAmount.setValue(Money.render(voucher.get('allocationIn')) + '(管理费：' + Money.render(voucher.get('overheadExpensesIn')) + ')');
        this._textFieldCurrentState.setValue(Srims.fund.VoucherStateRender(voucher.get('voucherState')));
        this._textFieldCurrentStateTime.setValue(Date.render(voucher.get('stateDateTime')));
        this._textFieldCurrentStateOperator.setValue(voucher.get('stateOperator'));
        this._textFieldPerformanceAccountBookNumber.setValue(voucher.get('performanceAccountBookNumber'));
        this._textFieldAllocationPerformancePay.setValue(Money.render(voucher.get('performancePay')));
        this._textFieldExpert.setValue(Money.render(voucher.get('overheadExpensesExpert')));
    }
}
Ext.extend(Srims.performance.PerformanceVoucherShowPanel_BasicForm, Ext.form.FormPanel, {});