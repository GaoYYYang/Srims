if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_BasicForm = function(fundAllocation, isVoucher) {

    this._fundAllocation = fundAllocation;
    this._textFieldProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        value: fundAllocation.get('projectNumber'),
        readOnly: true,
        width: 620
    });
    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: fundAllocation.get('projectName'),
        readOnly: true,
        width: 620
    });
    this._textFieldProjectPrincipal = new Ext.form.TextField({
        fieldLabel: '项目负责人',
        value: fundAllocation.get('projectPricinpalName'),
        readOnly: true,
        width: 220
    });
    this._textFieldProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        value: fundAllocation.get('projectTypeName'),
        readOnly: true,
        width: 220
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '分配金额',
        value: Money.render(fundAllocation.get('allocationTotal')) + '(校内间接费：' + Money.render(fundAllocation.get('overheadExpenses')) + ')',
        readOnly: true,
        width: 220
    });
    this._textFieldAllocateTime = new Ext.form.TextField({
        fieldLabel: '分配时间',
        value: Date.render(fundAllocation.get('allocationDateTime')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationIn = new Ext.form.TextField({
        fieldLabel: '校内分配',
        value: Money.render(fundAllocation.get('allocationIn')) ,
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationOut = new Ext.form.TextField({
        fieldLabel: '外协分配',
        value: Money.render(fundAllocation.get('allocationOut')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesOut')) + ')',
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationHardware = new Ext.form.TextField({
        fieldLabel: '硬件费',
        value: Money.render(fundAllocation.get('allocationHardware')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationOverheadPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效',
        value: Money.render(fundAllocation.get('overheadPerformancePay')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '已分课题组间接费用',
        value: Money.render(fundAllocation.get('performancePay')),
        readOnly: true,
        disabled: isVoucher,
        width: 220
    });
    this._textFieldAllocationShoolIn = new Ext.form.TextField({
        fieldLabel: '校内间接费用',
        value: Money.render(fundAllocation.get('overheadExpenses')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationShool = new Ext.form.TextField({
        fieldLabel: '学校间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesIn')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationCompus = new Ext.form.TextField({
        fieldLabel: '二级单位间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesMiddle')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesExpert')),
        readOnly: true,
        width: 220
    });
    this._textFieldFundState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.fund.fundAllocationStateRender(fundAllocation.get('state')),
        readOnly: true,
        width: 220
    });
    this._textFieldOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: fundAllocation.get('operator'),
        readOnly: true,
        width: 220
    });
    this._textFieldOperateTime = new Ext.form.TextField({
        fieldLabel: '操作时间',
        value: Date.render(fundAllocation.get('dateTime')),
        readOnly: true,
        width: 220
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '审核备注',
        value: fundAllocation.get('remark'),
        readOnly: true,
        width: 620
    });

    var columnFirstItems = [this._textFieldProjectPrincipal, this._textFieldAmount, this._textFieldAllocationIn, this._textFieldAllocationHardware, this._textFieldAllocationOverheadPerformancePay, this._textFieldAllocationShool, this._textFieldAllocationExpert, this._textFieldOperator];
    var columnSecondItems = [this._textFieldProjectType, this._textFieldAllocateTime, this._textFieldAllocationOut, this._textFieldFundState, this._textFieldAllocationShoolIn, this._textFieldAllocationCompus, this._textFieldAllocationPerformancePay,this._textFieldOperateTime];

    Srims.fund.FundAllocationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配基本信息',
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        layout: 'form',
        items: [this._textFieldProjectNumber, this._textFieldProject, new Ext.Panel({
            labelWidth: 70,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                items: columnFirstItems
            }), new Ext.Panel({
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    this.resetComponnentsValue = function(fundAllocation) {
        this._textFieldAmount.setValue(Money.render(fundAllocation.get('allocationTotal')) + '(校内间接费：' + Money.render(fundAllocation.get('overheadExpenses')) + ')');
        this._textFieldAllocateTime.setValue(Date.render(fundAllocation.get('allocationDateTime')));
        this._textFieldAllocationIn.setValue(Money.render(fundAllocation.get('allocationIn')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesIn')) + ')');
        this._textFieldAllocationOut.setValue(Money.render(fundAllocation.get('allocationOut')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesOut')) + ')');
        this._textFieldAllocationHardware.setValue(Money.render(fundAllocation.get('allocationHardware')));
        this._textFieldFundState.setValue(Srims.fund.fundAllocationStateRender(fundAllocation.get('state')));
        this._textFieldOperator.setValue(fundAllocation.get('operator'));
        this._textFieldOperateTime.setValue(Date.render(fundAllocation.get('dateTime')));
        this._textFieldRemark.setValue(fundAllocation.get('remark'));
        this._textFieldAllocationOverheadPerformancePay.setValue(Money.render(fundAllocation.get('overheadPerformancePay')));
    }
}
Ext.extend(Srims.fund.FundAllocationShowPanel_BasicForm, Ext.form.FormPanel, {});