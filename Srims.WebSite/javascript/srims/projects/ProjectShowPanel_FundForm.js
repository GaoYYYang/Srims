
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_FundForm = function(project) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._fieldFundContract = new Ext.form.Field({
        fieldLabel: '项目合同额',
        value: Money.render(project.get('fundContract')),
        readOnly: true,
        width: 140
    });
    this._fieldFundTotal = new Ext.form.Field({
        fieldLabel: '到校经费',
        value: Money.render(project.get('fundTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundPlanIn = new Ext.form.Field({
        fieldLabel: '计划校内分配',
        value: Money.render(project.get('fundPlanIn')),
        readOnly: true,
        width: 140
    });
    this._fieldFundPlanOut = new Ext.form.Field({
        fieldLabel: '计划外协分配',
        value: Money.render(project.get('fundPlanOut')),
        readOnly: true,
        width: 140
    });
    this._fieldFundReceived = new Ext.form.Field({
        fieldLabel: '已到经费',
        value: Money.render(project.get('fundReceived')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyTotal = new Ext.form.Field({
        fieldLabel: '已分配经费',
        value: Money.render(project.get('fundAlreadyTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        value: Money.render(project.get('fundAlreadyIn')),
        readOnly: true,
        width: 140
    });
    this._fieldfundAlreadyOut = new Ext.form.Field({
        fieldLabel: '已分配外协经费',
        value: Money.render(project.get('fundAlreadyOut')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyHardware = new Ext.form.Field({
        fieldLabel: '已分配硬件经费',
        value: Money.render(project.get('fundAlreadyHardware')),
        readOnly: true,
        width: 140
    });
    this._fieldProjectOverheadExpensesTotal = new Ext.form.Field({
        fieldLabel: '项目总间接费',
        value: Money.render(project.get('indirectCosts')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldProjectPerformanceTotal = new Ext.form.Field({
        fieldLabel: '项目总绩效',
        value: Money.render(project.get('projectPerformancePay')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpensesInStandard = new Ext.form.Field({
        fieldLabel: '校内基准间接费',
        value: Money.render(project.get('overheadExpensesInStandard')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpenseInTotal = new Ext.form.Field({
        fieldLabel: '校内合同间接费',
        value: Money.render(project.get('campusIndirectCosts')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadSchool = new Ext.form.Field({
        fieldLabel: '学校间接费',
        value: Money.render(project.get('overheadExpenseInTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadCompus = new Ext.form.Field({
        fieldLabel: '二级单位间接费',
        value: Money.render(project.get('overheadExpenseMiddleTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpert = new Ext.form.Field({
        fieldLabel: '课题组间接费',
        value: Money.render(project.get('overheadExpenseExpertTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpenseOutTotal = new Ext.form.Field({
        fieldLabel: '外协分配管理费',
        value: Money.render(project.get('overheadExpenseOutTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundManageProportion = new Ext.form.Field({
        fieldLabel: '国家规定管理费比例',
        value: ExpenseRate.render(project.get('fundManageProportion')),
        readOnly: true,
        width: 140
    });
    this._fieldPerformancePay = new Ext.form.Field({
        fieldLabel: '校内合同绩效',
        value: project.get('overheadExpenseInTotal') < 0 ? '' : Money.render(project.get('performancePay')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldAllocatedPerformence = new Ext.form.Field({
        fieldLabel: '课题组暂存（考虑追缴）',
        value: Money.render(project.get('allocatedPerformance')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldPerformancePayAlready = new Ext.form.Field({
        fieldLabel: '课题组暂存（不考虑追缴）',
        value: Money.render(project.get('performancePayAlready')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldOverheadExpensesAlreadyIn = new Ext.form.Field({
        fieldLabel: '已收学校间接费（不考虑追缴）',
        value: Money.render(project.get('overheadExpensesAlreadyIn')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldTrueOverheadExpensesAlreadyIn = new Ext.form.Field({
        fieldLabel: '实收学校间接费（考虑追缴）',
        value: Money.render(project.get('trueOverheadExpensesAlreadyIn')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldBorrowAmount = new Ext.form.Field({
        fieldLabel: '借款金额',
        value: Money.render(project.get('borrowAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldReturnAmount = new Ext.form.Field({
        fieldLabel: '还款金额',
        value: Money.render(project.get('returnAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldFundFrom = new Ext.form.Field({
        fieldLabel: '经费来源',
        value: project.get('fundFrom'),
        readOnly: true,
        width: 300
    });
    this._fieldFundFromUnit = new Ext.form.Field({
        fieldLabel: '来款单位',
        value: project.get('fundFromUnit'),
        readOnly: true,
        width: 300
    });
    this._fieldFundFromUnitAddress = new Ext.form.Field({
        fieldLabel: '来款单位地址',
        value: project.get('fundFromUnitAddress'),
        readOnly: true,
        width: 420
    });
    this._fieldPerformancePayStandard = new Ext.form.Field({
        fieldLabel: '校内基准绩效',
        value: Money.render(project.get('performancePayStandard')),
        hidden: userIsExpert,
        hideLabel: userIsExpert, //&& (project.get("state") == "WaitingStartInformation" || project.get("state") == "WaitingStartCensor")
        readOnly: true,
        width: 140
    });
    this._numberFieldEquipmentCost = new Ext.form.Field({
        fieldLabel: '设备购置费',
        value: Money.render(project.get('equipmentCost')),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    Srims.projects.ProjectShowPanel_FundForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldFundContract, this._fieldFundPlanIn, this._fieldFundReceived, this._fieldFundAlreadyIn, this._numberFieldEquipmentCost, this._fieldProjectOverheadExpensesTotal, this._fieldOverheadExpensesInStandard, this._fieldOverheadExpenseInTotal, this._fieldOverheadSchool]
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: [this._fieldFundTotal, this._fieldFundPlanOut, this._fieldFundAlreadyTotal, this._fieldfundAlreadyOut, this._fieldOverheadExpenseOutTotal, this._fieldProjectPerformanceTotal, this._fieldPerformancePayStandard, this._fieldPerformancePay, this._fieldOverheadCompus]
            })]
        }), this._fieldOverheadExpert,
     new Ext.Panel({
         width: 600,
         layout: 'column',
         items: [new Ext.Panel({
             width: 300,
             layout: 'form',
             style: 'width:300px',
             items: [this._fieldBorrowAmount, this._fieldPerformancePayAlready, this._fieldOverheadExpensesAlreadyIn]
         }), new Ext.Panel({
             width: 300,
             style: 'width:300px',
             layout: 'form',
             items: [this._fieldReturnAmount, this._fieldAllocatedPerformence, this._fieldTrueOverheadExpensesAlreadyIn]
         })]
     })

     , this._fieldFundFrom, this._fieldFundFromUnit, this._fieldFundFromUnitAddress]
    });
    //method
    this.resetComponentValue = function(project) {
        this._fieldFundContract.setValue(Money.render(project.get('fundContract')));
        this._fieldFundTotal.setValue(Money.render(project.get('fundTotal')));
        this._fieldFundPlanIn.setValue(Money.render(project.get('fundPlanIn')));
        this._fieldFundPlanOut.setValue(Money.render(project.get('fundPlanOut')));
        this._fieldFundReceived.setValue(Money.render(project.get('fundReceived')));
        this._fieldFundAlreadyTotal.setValue(Money.render(project.get('fundAlreadyTotal')));
        this._fieldFundAlreadyIn.setValue(Money.render(project.get('fundAlreadyIn')));
        this._fieldfundAlreadyOut.setValue(Money.render(project.get('fundAlreadyOut')));
        this._fieldFundAlreadyHardware.setValue(Money.render(project.get('fundAlreadyHardware')));
        this._fieldOverheadExpensesInStandard.setValue(Money.render(project.get('overheadExpensesInStandard')));
        this._fieldOverheadExpenseInTotal.setValue(Money.render(project.get('campusIndirectCosts')));
        this._fieldOverheadExpenseOutTotal.setValue(Money.render(project.get('overheadExpenseOutTotal')));
        this._fieldFundManageProportion.setValue(project.get('fundManageProportion'));
        this._fieldPerformancePay.setValue(Money.render(project.get('performancePay')));
        this._fieldAllocatedPerformence.setValue(Money.render(project.get('allocatedPerformance')));
        this._fieldPerformancePayAlready.setValue(Money.render(project.get('performancePayAlready')));
        this._fieldOverheadExpensesAlreadyIn.setValue(Money.render(project.get('overheadExpensesAlreadyIn')));
        this._fieldTrueOverheadExpensesAlreadyIn.setValue(Money.render(project.get('trueOverheadExpensesAlreadyIn')));
        this._fieldBorrowAmount.setValue(Money.render(project.get('borrowAmount')));
        this._fieldReturnAmount.setValue(Money.render(project.get('returnAmount')));
        this._fieldPerformancePayStandard.setValue(Money.render(project.get('performancePayStandard')));
        this._fieldProjectOverheadExpensesTotal.setValue(Money.render(project.get('indirectCosts'))); //
        this._fieldProjectPerformanceTotal.setValue(Money.render(project.get('projectPerformancePay'))); //
        this._fieldFundFrom.setValue(project.get('fundFrom'));
        this._fieldFundFromUnit.setValue(project.get('fundFromUnit'));
        this._fieldFundFromUnitAddress.setValue(project.get('fundFromUnitAddress'));
        this._numberFieldEquipmentCost.setValue(Money.render(project.get('equipmentCost')));
        this._fieldOverheadSchool.setValue(Money.render(project.get('overheadExpenseInTotal')));
        this._fieldOverheadCompus.setValue(Money.render(project.get('overheadExpenseMiddleTotal')));
        this._fieldOverheadExpert.setValue(Money.render(project.get('overheadExpenseExpertTotal')));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundForm, Ext.FormPanel);
