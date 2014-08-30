if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_BasicForm = function(voucher) {
    this._voucher = voucher;

    this._textFieldFundMember = new Ext.form.TextField({
        fieldLabel: '经费成员',
        value: voucher.get('expertName'),
        readOnly: true,
        width: 200
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: voucher.get('overheadPerformancePay') > 0 ? '绩效账本号' : '账本号',
        value: voucher.get('accountBookNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '总金额',
        value: Money.render(voucher.get('amount')) + '(校内间接费：' + Money.render(voucher.get('overheadExpenses')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationIn = new Ext.form.TextField({
        fieldLabel: '校内分配',
        value: Money.render(voucher.get('allocationIn')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationOut = new Ext.form.TextField({
        fieldLabel: '外协分配',
        value: Money.render(voucher.get('allocationOut')) + '(间接费：' + Money.render(voucher.get('overheadExpensesOut')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationHardware = new Ext.form.TextField({
        fieldLabel: '硬件费',
        value: Money.render(voucher.get('allocationHardware')),
        readOnly: true,
        width: 200
    });
    this._textFieldPerformanceAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '绩效账本号',
        value: voucher.get('performanceAccountBookNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效分配',
        value: Money.render(voucher.get('overheadPerformancePay')) + '(绩效管理费：' + Money.render(voucher.get('performancePay')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.fund.VoucherStateRender(voucher.get('voucherState')),
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(voucher.get('stateDateTime')),
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: voucher.get('stateOperator'),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationShoolIn = new Ext.form.TextField({
        fieldLabel: '校内间接费用',
        value: Money.render(voucher.get('overheadExpenses')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationShool = new Ext.form.TextField({
        fieldLabel: '学校间接费用',
        value: Money.render(voucher.get('overheadExpensesIn')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationCompus = new Ext.form.TextField({
        fieldLabel: '二级单位间接费用',
        value: Money.render(voucher.get('overheadExpensesMiddle')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(voucher.get('overheadExpensesExpert')),
        readOnly: true,
        width: 200
    });
    var columnFirstItems = [this._textFieldFundMember, this._textFieldAmount, this._textFieldAllocationOut, this._textFieldAllocationShoolIn, this._textFieldAllocationCompus, this._textFieldFinanceNumber, this._textFieldCurrentStateTime, this._textFieldCurrentStateOperator];
    var columnSecondItems = [this._textFieldAccountBookNumber, this._textFieldAllocationIn, this._textFieldAllocationHardware, this._textFieldAllocationShool, this._textFieldAllocationExpert, this._textFieldAllocationPerformancePay, this._textFieldCurrentState];

    Srims.fund.VoucherShowPanel_BasicForm.superclass.constructor.call(this, {
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
        this._textFieldAmount.setValue(Money.render(voucher.get('amount')) + '(校内间接费：' + Money.render(voucher.get('overheadExpenses')) + ')');
        this._textFieldAllocationIn.setValue(Money.render(voucher.get('allocationIn')) + '(管理费：' + Money.render(voucher.get('overheadExpensesIn')) + ')');
        this._textFieldAllocationOut.setValue(Money.render(voucher.get('allocationOut')) + '(间接费：' + Money.render(voucher.get('overheadExpensesOut')) + ')');
        this._textFieldAllocationHardware.setValue(Money.render(voucher.get('allocationHardware')));
        this._textFieldCurrentState.setValue(Srims.fund.VoucherStateRender(voucher.get('voucherState')));
        this._textFieldCurrentStateTime.setValue(Date.render(voucher.get('stateDateTime')));
        this._textFieldCurrentStateOperator.setValue(voucher.get('stateOperator'));
        this._textFieldPerformanceAccountBookNumber.setValue(voucher.get('performanceAccountBookNumber'));
        this._textFieldAllocationPerformancePay.setValue(Money.render(voucher.get('overheadPerformancePay')) + '(绩效管理费：' + Money.render(voucher.get('performancePay')) + ')');
        this._textFieldAllocationShool.setValue(Money.render(voucher.get('overheadExpensesIn')));
        this._textFieldAllocationShoolIn.setValue(Money.render(voucher.get('overheadExpenses')));
        this._textFieldAllocationCompus.setValue(Money.render(voucher.get('overheadExpensesMiddle')));
        this._textFieldAllocationExpert.setValue(Money.render(voucher.get('overheadExpensesExpert')));
    }
}
Ext.extend(Srims.fund.VoucherShowPanel_BasicForm, Ext.form.FormPanel, {});