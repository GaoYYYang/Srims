if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_BasicForm = function(fundAllocation) {

    this._fundAllocation = fundAllocation;

    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: fundAllocation.get('projectName'),
        readOnly: true,
        width: 560
    });
    this._textFieldProjectPrincipal = new Ext.form.TextField({
        fieldLabel: '项目负责人',
        value: fundAllocation.get('projectPricinpalName'),
        readOnly: true,
        width: 160
    });
    this._textFieldProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        value: fundAllocation.get('projectTypeName'),
        readOnly: true,
        width: 160
    });

    this._textFieldAllocationOverheadPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效金额',
        value: Money.render(fundAllocation.get('arrivedPerformance')),
        readOnly: true,
        width: 160
    });

    this._textFieldAllocationAll = new Ext.form.TextField({
        fieldLabel: '到账总额',
        value: Money.render(fundAllocation.get('arrivedOverheadexpensesExpert')),
        readOnly: true,
        width: 160
    });


    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接经费',
        value: Money.render(fundAllocation.get('arrivedOverheadexpensesExpert') - fundAllocation.get('arrivedPerformance')),
        readOnly: true,
        width: 160
    });



    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '已分配绩效',
        value: Money.render(fundAllocation.get('allocatedPerformance')),
        readOnly: true,
        width: 160
    });
    this._textFieldFundState = new Ext.form.TextField({
        fieldLabel: '绩效状态',
        value: Srims.performance.fundAllocationStateRender(fundAllocation.get('state')),
        readOnly: true,
        width: 160
    });
    this._textFieldFundCancelState = new Ext.form.TextField({
        fieldLabel: '是否已作废',
        value: fundAllocation.get('isCancel') ? '已作废' : '正常',
        readOnly: true,
        width: 160
    });
    this._textFieldOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: fundAllocation.get('operator'),
        readOnly: true,
        width: 160
    });
    this._textFieldOperateTime = new Ext.form.TextField({
        fieldLabel: '操作时间',
        value: Date.render(fundAllocation.get('dateTime')),
        readOnly: true,
        width: 160
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '审核备注',
        value: fundAllocation.get('remark'),
        readOnly: true,
        width: 560
    });

    var columnFirstItems = [this._textFieldProjectPrincipal, this._textFieldAllocationAll, this._textFieldAllocationOverheadPerformancePay, this._textFieldFundState, this._textFieldOperator];
    var columnSecondItems = [this._textFieldProjectType, this._textFieldAllocationExpert, this._textFieldAllocationPerformancePay, this._textFieldOperateTime, this._textFieldFundCancelState];

    Srims.performance.PerformanceAllocationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '课题组间接费用分配基本信息',
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        layout: 'form',
        items: [this._textFieldProject, new Ext.Panel({
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
        this._textFieldAllocationPerformancePay.setValue(Money.render(fundAllocation.get('allocatedPerformance')));
        this._textFieldFundState.setValue(Srims.performance.fundAllocationStateRender(fundAllocation.get('state')));
        this._textFieldOperator.setValue(fundAllocation.get('operator'));
        this._textFieldOperateTime.setValue(Date.render(fundAllocation.get('dateTime')));
        this._textFieldRemark.setValue(fundAllocation.get('remark'));
        this._textFieldAllocationExpert.setValue(Money.render(fundAllocation.get('arrivedOverheadexpensesExpert') - fundAllocation.get('arrivedPerformance')));
        this._textFieldAllocationAll.setValue(Money.render(fundAllocation.get('arrivedOverheadexpensesExpert')));
        this._textFieldAllocationOverheadPerformancePay.setValue(Money.render(fundAllocation.get('arrivedPerformance')));
    }
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_BasicForm, Ext.form.FormPanel, {});