if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_FundForm = function(project, formBasic,
		formType, projectOutPanel) {
    this._project = project;
    this._formBasic = formBasic;
    this._formType = formType;
    this._formFund = this;
    this._projectOutPanel = projectOutPanel;

    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._numberFieldFundContract = new Srims.component.MoneyField({
        fieldLabel: '项目合同额(万元)',
        value: project.get('fundContract'),
        allowBlank: false,
        width: 120
    });
    this._fieldOverheadExpensesInStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准间接费',
        value: project.get('overheadExpensesInStandard'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 120
    });
    this._numberFieldFundTotal = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        value: project.get('fundTotal'),
        allowBlank: false,
        disabled: project.get('level') == Srims.projects.ProjectLevel.Perside,
        width: 120
    });
    this._numberFieldFundPlanIn = new Srims.component.MoneyField({
        fieldLabel: '计划校内分配(万元)',
        value: project.get('fundPlanIn'), //
        allowBlank: false,
        disabled: true,
        width: 120
    });
    var amountA = 0;

    this._numberFieldFundPlanOut = new Srims.component.MoneyField({
        fieldLabel: '计划外协分配(万元)',
        value: project.get('fundPlanOut'),
        allowBlank: false,
        disabled: true,
        width: 120
    });

    this._numberFieldOverheadExpenseInTotal = new Srims.component.MoneyField({
        fieldLabel: '校内合同间接费(万元)',
        value: project.get('campusIndirectCosts'),
        disabled: Srims.currentUser.isExpert,
        allowBlank: false,
        readOnly: Srims.currentUser.isExpert,
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._numberFieldOverheadExpenseOutTotal = new Srims.component.MoneyField({
        fieldLabel: '外协分配管理费(万元)',
        value: project.get('overheadExpenseOutTotal'),
        disabled: !Srims.currentUser.isSuper,
        allowBlank: false,
        hidden: (userIsExpert && project.get('isHorizontal')) || (!project.get('isHorizontal')),
        hideLabel: (userIsExpert && project.get('isHorizontal')) || (!project.get('isHorizontal')),
        width: 120
    });
    this._percentFieldFundManageProportion = new Srims.component.PercentField({
        fieldLabel: '国家规定管理费比例',
        value: project.get('fundManageProportion'),
        allowBlank: false,
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 120
    });
    this._numberFieldPerformancePay = new Srims.component.MoneyField({
        fieldLabel: '校内合同绩效(万元)',
        value: project.get('performancePay') + 0,
        disabled: Srims.currentUser.isExpert,
        allowBlank: false,
        readOnly: Srims.currentUser.isExpert,
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._numberFieldPerformancePayAlready = new Srims.component.MoneyField({
        fieldLabel: '已分配绩效工资(万元)',
        value: project.get('performancePayAlready'),
        disabled: !Srims.currentUser.isSuper,
        allowBlank: false,
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 120
    });
    this._textFieldFundFrom = new Ext.form.TextField({
        fieldLabel: '经费来源',
        value: project.get('fundFrom'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300
    });
    this._textFieldFundFromUnit = new Ext.form.TextField({
        fieldLabel: '来款单位',
        value: project.get('fundFromUnit'),
        width: 300
    });
    this._textFieldFundFromUnitAddress = new Ext.form.TextField({
        fieldLabel: '来款单位地址',
        value: project.get('fundFromUnitAddress'),
        width: 420
    });
    this._numberFieldEquipmentCost = new Srims.component.MoneyField({
        fieldLabel: '总设备购置费(万元)',
        value: project.get('equipmentCost'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        allowBlank: false,
        width: 120
    });
    this._fieldPerformancePayStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准绩效',
        value: project.get('performancePayStandard'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 120
    });
    this._fieldProjectOverheadExpensesTotal = new Srims.component.MoneyField({
        fieldLabel: '项目总间接费',
        value: project.get('indirectCosts'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._fieldProjectPerformanceTotal = new Srims.component.MoneyField({
        fieldLabel: '项目总绩效',
        value: project.get('projectPerformancePay'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    Srims.projects.ProjectEditPanel_FundForm.superclass.constructor.call(this,
			{
			    collapsible: true,
			    title: '经费信息',
			    autoHeight: true,
			    frame: true,
			    labelWidth: 140,
			    bodyStyle: 'padding:5px 5px 0',
			    style: 'margin-bottom: 2px',
			    defaultType: 'textfield',
			    titleCollapse: true,
			    listeners: {
			        afterlayout: function(panel) {
			            if (userIsExpert)
			                if (panel._projectOutPanel) {
			                var amount = panel._projectOutPanel._amounts;
			                panel._numberFieldFundPlanOut.setValue(amount);
			            }

			        }
			    },
			    items: [
						new Ext.Panel({
						    widht: 600,
						    layout: 'column',
						    items: [new Ext.Panel({
						        width: 300,
						        layout: 'form',
						        style: 'width:300px',
						        items: [
										this._numberFieldFundContract,
										this._numberFieldFundPlanIn,
										this._numberFieldEquipmentCost,
										this._fieldProjectOverheadExpensesTotal,
										this._numberFieldOverheadExpenseInTotal,
										this._fieldOverheadExpensesInStandard

							]
						    }), new Ext.Panel({
						        width: 300,
						        style: 'width:300px',
						        layout: 'form',
						        items: [
										this._numberFieldFundTotal,
										this._numberFieldFundPlanOut,
										this._numberFieldOverheadExpenseOutTotal,
										this._fieldProjectPerformanceTotal,
										this._numberFieldPerformancePay,
										this._fieldPerformancePayStandard

										]
						    })]
						}), this._textFieldFundFrom,
						this._textFieldFundFromUnit,
						this._textFieldFundFromUnitAddress]

			});


    // method
    this.assginValues = function() {
        this._project.set('fundContract', this._numberFieldFundContract
						.getMoney());
        this._project.set('fundTotal', this._numberFieldFundTotal.getMoney());
        this._project.set('fundPlanIn', this._numberFieldFundPlanIn.getMoney());
        this._project.set('indirectCosts', this._fieldProjectOverheadExpensesTotal.getMoney());
        this._project.set('projectPerformancePay', this._fieldProjectPerformanceTotal.getMoney());
        this._project.set('fundPlanOut', this._numberFieldFundPlanOut
						.getMoney());
        this._project.set('overheadExpenseInTotal',
				this._numberFieldOverheadExpenseInTotal.getMoney() - this._numberFieldPerformancePay.getMoney());
        if (this._numberFieldOverheadExpenseOutTotal.getMoney())
            this._project.set('overheadExpenseOutTotal', this._numberFieldOverheadExpenseOutTotal.getMoney());
        else
            this._project.set('overheadExpenseOutTotal', 0);
        //this._numberFieldOverheadExpenseOutTotal.getMoney());
        this._project.set('fundManageProportion',
				this._percentFieldFundManageProportion.getValue());
        this._project.set('performancePay', this._numberFieldPerformancePay
						.getMoney());
        this._project.set('performancePayAlready', 0);
        this._project.set('fundFrom', this._textFieldFundFrom.getValue());
        this._project.set('fundFromUnit', this._textFieldFundFromUnit
						.getValue());
        this._project.set('fundFromUnitAddress',
				this._textFieldFundFromUnitAddress.getValue());
        this._project.set('equipmentCost',
				this._numberFieldEquipmentCost.getMoney());
        this._project.set('projectPerformancePay', this._fieldProjectPerformanceTotal.getMoney());
        this._project.set('campusIndirectCosts', this._numberFieldOverheadExpenseInTotal.getMoney());
        
    }
    this.isValid = function(preventMark) {
        var result = true;
        //result = this._Amount.isValid(preventMark) && result;
        if (project.get('isHorizontal')) {
            result = this._numberFieldFundContract.isValid(preventMark) && result;


        }
        else {
            result = this._numberFieldFundContract.isValid(preventMark) && result;
            result = this._numberFieldFundTotal.isValid(preventMark) && result;
            result = this._numberFieldFundPlanIn.isValid(preventMark) && result;
            result = this._numberFieldFundPlanOut.isValid(preventMark) && result;
            result = this._numberFieldOverheadExpenseInTotal.isValid(preventMark)
				&& result;
            result = this._numberFieldEquipmentCost.isValid(preventMark) && result;
            //            result = this._numberFieldOverheadExpenseOutTotal.isValid(preventMark)
            //				&& result;
            result = this._percentFieldFundManageProportion.isValid(preventMark)
				&& result;
            result = this._numberFieldPerformancePay.isValid(preventMark) && result;
            result = this._fieldProjectPerformanceTotal.isValid(preventMark) && result;
            //		&& result;
        }

        return result;
    }
    this.validateOverheadExpenseIn = function() {
        if (this._numberFieldFundPlanIn.getMoney() >= this._numberFieldOverheadExpenseInTotal
				.getMoney())
            return true;

        Ext.Msg.show({
            title: '校内管理费错误',
            msg: '校内管理费不能大于项目的计划校内分配',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    this.validateOverheadExpenseOut = function() {
        if (this._numberFieldFundPlanOut.getMoney() >= this._numberFieldOverheadExpenseOutTotal
				.getMoney())
            return true;

        Ext.Msg.show({
            title: '外协管理费错误',
            msg: '外协管理费不能大于项目的计划外协分配',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    // 获取新提出的管理费方案中的费率
    this.getManagementFees = function(managementFeeType,
			projectType_RateFieldName, projectTypeId, projectRankId, fundTotal, arriveSchoolFee, deviceCost, contractTotal) {
        if (userIsExpert)
            return 0;
        var params = {};
        var result = {};
        var managementFee_Fee = undefined;
        var managementFee_PerformancePay = undefined;
        var managementFee = undefined;

        if (managementFeeType == undefined || fundTotal == undefined
				|| projectType_RateFieldName == undefined || isNaN(fundTotal)
				|| fundTotal == '')
            return 0;
        params.ManagementFeeType = managementFeeType;
        params.paraType = projectType_RateFieldName;
        params.projectTypeId = projectTypeId;
        params.projectLevel = projectRankId;
        params.fundTotal = Math.round(fundTotal * 10000 * 1000000 / 10000);
        params.arriveSchoolFee = Math.round(arriveSchoolFee * 10000 * 1000000 / 10000);
        params.deviceCost = Math.round(deviceCost * 10000 * 1000000 / 10000);
        params.contractTotal = Math.round(contractTotal * 10000 * 1000000 / 10000);

        var conn = Ext.lib.Ajax.getConnectionObject().conn;
        var url = Srims.service.type.ManagementFeesService
				+ '/GetAllManagementFeesByType';
        // 以GET方式发送参数在IE浏览器下无法获取返回值，需要添加Header属性使用POST方法
        conn.open('POST', url, false);
        conn.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
        conn.send('ManagementFeeType=' + params.ManagementFeeType
				 + '&paraType=' + params.paraType
				 + '&projectTypeId=' + params.projectTypeId
				 + '&projectLevel=' + params.projectLevel
				 + '&fundTotal=' + params.fundTotal
				 + '&arriveSchoolFee=' + params.arriveSchoolFee
				 + '&deviceCost=' + params.deviceCost
				 + '&contractTotal=' + params.contractTotal);
        if (conn.status == '200') {
            var rateResult = conn.responseText;
            if (!isNaN(rateResult))
                return parseInt(rateResult);
        }
        //        Ext.Msg.show({
        //            title: '费率获取错误',
        //            msg: '无法获取对应的管理费率，将按照0来计算',
        //            buttons: Ext.Msg.OK,
        //            icon: Ext.MessageBox.WARNING
        //        });

        return 0;
    }
    this.getOverheadExpenseRate = function(projectType_RateFieldName, newValue) {
        var projectType = formType._comboBoxType.getEntity();
        var projectSupportCategory = formType._comboBoxSupportCategory
				.getEntity();

        if (projectType == undefined)
            return undefined;

        // 考虑某些资助类别不收取管理费的情况
        if (projectSupportCategory != undefined
				&& !projectSupportCategory.get('isGetOverheadExpense'))
            return 0;
        // 原8521费率
        /*
        * if (projectType.get('isBudget') && projectType_RateFieldName ==
        * 'overheadExpenseInRate') return this.getOverheadExpenseBudgetRate();
        */
        if (projectType_RateFieldName == 'overheadExpensePerformancePayRate'
				|| projectType_RateFieldName == 'overheadExpenseInRate') {
            var managementFeeType = projectType.get('managementFeesType');
            var projectTypeId = projectType.get('id');
            var projectRankId = formBasic._comboBoxLevel.getValue();
            var fundTotal = this._numberFieldFundPlanIn.getValue();
            var arriveSchoolFee = this._numberFieldFundTotal.getValue();
            var deviceCost = this._numberFieldEquipmentCost.getValue();
            var contractTotal = this._numberFieldFundContract.getValue();

            return this.getManagementFees(managementFeeType,
					projectType_RateFieldName, projectTypeId, projectRankId, fundTotal, arriveSchoolFee, deviceCost, contractTotal).div(10000);
        }

        return projectType.get(projectType_RateFieldName).div(10000); // 百分数以万分之一为单位
    }
    // 此函数暂时不用啦啦啦
    this.getOverheadExpenseBudgetRate = function() {
        var fundContract = parseFloat(this._numberFieldFundContract.getValue())
				* 10000 * 100;
        var baseLine = [0, 100 * 100 * 10000, 500 * 100 * 10000,
				1000 * 100 * 10000];
        var baseRate = [0.08, 0.05, 0.02, 0.01];

        var i = 0;
        var rate = 0;

        for (i = 1; i <= (parseInt(baseLine.length, 10) - 1)
				&& parseFloat(baseLine[i]) < fundContract; i++) {
            var baselineValue1 = parseFloat(baseLine[i]);
            var baselineValue2 = parseFloat(baseLine[i - 1]);
            var baseRateValue1 = parseFloat(baseRate[i - 1]);
            rate += (parseFloat((baselineValue1).sub(baselineValue2)))
					.mul(baseRateValue1);
        }

        var baseLineValue = parseFloat(baseLine[i - 1]);
        var baseRateValue = parseFloat(baseRate[i - 1]);
        var fundLeveal = parseFloat((parseFloat((fundContract)
				.sub(baseLineValue))).mul(baseRateValue));
        var overheadExpenseAll = parseFloat(((parseFloat(rate)).add(fundLeveal)))

        return parseFloat((overheadExpenseAll).div(fundContract));
    }

    this.updateOverheadExpense = function() {
        if (this._numberFieldFundPlanIn.getValue() != '')
            this._onNumberFieldFundPlan_Change(this._numberFieldFundPlanIn,
        					this._numberFieldFundPlanIn.getValue(), '');

        if (this._numberFieldFundPlanOut.getValue() != '')
            this._onNumberFieldFundPlan_Change(this._numberFieldFundPlanOut,
        					this._numberFieldFundPlanOut.getValue(), '');
    }

    // event method
    this._onFormBasic_ProjectLevel_Select = function(comboBox_ProjectLevel) {
        var numberFieldFundContract = comboBox_ProjectLevel.formFund._numberFieldFundContract;
        var numberFieldFundTotal = comboBox_ProjectLevel.formFund._numberFieldFundTotal;

        if (comboBox_ProjectLevel.getValue() == Srims.projects.ProjectLevel.Perside) {
            var oldValue = numberFieldFundTotal.getValue();
            var newValue = numberFieldFundContract.getValue();
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.disable();
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        } else if (comboBox_ProjectLevel.getValue() == Srims.projects.ProjectLevel.Join) {
            var oldValue = numberFieldFundTotal.getValue();
            var newValue = numberFieldFundContract.getValue();
            numberFieldFundTotal.enable();
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue); //参与 函数
        }
        else {
            numberFieldFundTotal.enable();
        }
    }
    this._onFormType_Type_Selelct = function(comboBox) {
        if (comboBox.getValue() == undefined)
            return;
        comboBox.formFund._numberFieldOverheadExpenseOutTotal.setValue(0);
        //如果是类型是科技转让，则没有外协经费，经费为0.（2013、2、23）
        if (comboBox.getValue() == 3) {
            var formFund = comboBox.formFund;
            formFund._numberFieldFundPlanIn.setDisabled(true);
            formFund._numberFieldFundPlanOut.setDisabled(true);
            formFund._numberFieldFundPlanOut.setValue(0);
            formFund._numberFieldFundPlanIn.setValue(formFund._numberFieldFundTotal.getMoney() / 1000000);
            return;
        }

        else {
            var formFund = comboBox.formFund;


            if (userIsExpert) {
                if (formFund._projectOutPanel) {
                    var amount = formFund._projectOutPanel._amounts;
                    formFund._numberFieldFundPlanOut.setValue(amount);
                }
            }
            else {
                var amountB = 0;
                var outStore = formFund.parentPanel._projectOutPanel._store;
                var projectOuts = outStore.getRange();
                for (var i = 0; i < projectOuts.length; i++) {
                    amountB += projectOuts[i].get('amount');
                }

                formFund._numberFieldFundPlanOut.setValue(amountB);
            }

        }
        comboBox.formFund._numberFieldFundPlanIn.setValue((comboBox.formFund._numberFieldFundTotal.getMoney() - comboBox.formFund._numberFieldFundPlanOut.getMoney()) / 1000000); //3.2wanshang 
        comboBox.formFund.updateOverheadExpense();
    }
    this._onFormBasic_TaskComingFrom_Change = function(textFieldTaskComingFrom,
			newValue, oldValue) {
        var formFund = textFieldTaskComingFrom.formFund;
        var textFieldFundFrom = formFund._textFieldFundFrom;
        var textFieldFundFromUnit = formFund._textFieldFundFromUnit;

        if (textFieldFundFrom.getValue() == ''
				|| textFieldFundFrom.getValue() == oldValue)
            textFieldFundFrom.setValue(newValue);
        if (textFieldFundFromUnit.getValue() == ''
				|| textFieldFundFromUnit.getValue() == oldValue)
            textFieldFundFromUnit.setValue(newValue);
    }
    /////合同额变化
    this._onNumberFieldFundContract_Change = function(numberFieldFundContract,
			newValue, oldValue) {
        var formFund = numberFieldFundContract.formFund;
        var numberFieldFundTotal = numberFieldFundContract.numberFieldFundTotal;

        formFund.updateOverheadExpense();

        if (numberFieldFundTotal.getValue() == oldValue) {
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        }
    }
    this._numberFieldEquipmentCost_Change = function(numberFieldEquipmentCost, newValue, oldValue) {
        var formFund = numberFieldEquipmentCost.formFund;
        var numberFieldFundTotal = numberFieldEquipmentCost.numberFieldFundTotal;

        formFund.updateOverheadExpense();

        if (numberFieldFundTotal.getValue() == oldValue) {
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        }
    }
    /////到校经费变化
    this._onNumberFieldFundTotal_Change = function(numberFieldFundTotal,
			newValue, oldValue) {
        var formFund = numberFieldFundTotal.formFund; //3.2晚上
        var numberFieldFundPlanIn = numberFieldFundTotal.numberFieldFundPlanIn;
        var numberFieldFundPlanOut = numberFieldFundTotal.numberFieldFundPlanOut;
        var numberFieldFundPlanIn_OldValue = numberFieldFundPlanIn.getValue();
        var numberFieldFundPlanOut_OldValue = numberFieldFundPlanOut.getValue();

        var isAllocatedEmpty = numberFieldFundPlanIn_OldValue == ''
        				&& numberFieldFundPlanOut_OldValue == '';
        var isAllocatedDefault = numberFieldFundPlanIn_OldValue == oldValue
        				&& numberFieldFundPlanOut_OldValue == '0';

        if (isAllocatedEmpty || isAllocatedDefault) {
            numberFieldFundPlanIn.setValue(newValue);
            numberFieldFundPlanIn.fireEvent('change', numberFieldFundPlanIn,
        					newValue, numberFieldFundPlanIn_OldValue);

            numberFieldFundPlanOut.setValue(0);
            numberFieldFundPlanOut.fireEvent('change', numberFieldFundPlanOut,
        					'0', numberFieldFundPlanOut_OldValue);
        }
        //3.2晚上
        formFund._numberFieldFundPlanIn.setValue((formFund._numberFieldFundTotal.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000);
        formFund.updateOverheadExpense();
    }
    this._onNumberFieldFundPlan_Change = function(numberFieldPlan, newValue,
			oldValue, SycnOtherPlanItem) {
        var formFund = numberFieldPlan.formFund;
        var numberFieldOverheadExpense = numberFieldPlan.numberFieldOverheadExpense;
        var projectType_RateFieldName = numberFieldPlan.projectType_RateFieldName;

        // 同步校内和外协，使其和等于总经费
        //        if (SycnOtherPlanItem == undefined) {
        //            var fundTotal = parseFloat(formFund._numberFieldFundTotal
        //					.getValue());
        //            var otherFundPlan = fundTotal.sub(parseFloat(newValue));
        //            if (otherFundPlan < 0)
        //                otherFundPlan = undefined;

        //            var otherPlanItem = numberFieldPlan.otherPlanItem;
        //            var otherFundPlan_OldValue = otherPlanItem.getValue();

        //            otherPlanItem.setValue(otherFundPlan);
        //            otherPlanItem.fireEvent('change', otherPlanItem, otherFundPlan,
        //					otherFundPlan_OldValue, true);

        //            formFund._numberFieldFundTotal.validate();
        //        }

        var overheadExpenseRate = formFund.getOverheadExpenseRate(
				projectType_RateFieldName, newValue);

        // 无法计算管理费的情况
        if ((newValue != '0' && newValue == '')
				|| overheadExpenseRate == undefined) {
            if (numberFieldOverheadExpense.getValue() != ''
					|| numberFieldOverheadExpense.getValue() == '0') {
                numberFieldOverheadExpense.setValue('');
            }
            return;
        }

        // 为判断是否已经手工指定准备条件
        var overheadExpense_Old = numberFieldOverheadExpense.getValue();
        var isForceReCalculate = oldValue == '';
        var isOldEmpty = overheadExpense_Old == '';
        var isOldDefault = parseFloat(overheadExpense_Old) == parseFloat(oldValue)
				.mul(overheadExpenseRate).toFixed(6);
        // 判断费用 有没有更改
        var isChange = parseFloat(overheadExpense_Old) != parseFloat(newValue)
				.mul(overheadExpenseRate).toFixed(6);

        // 如果不是手工指定，即为空或为默认
        if (isForceReCalculate || isOldEmpty || isOldDefault || isChange) {
            var overheadExpense_New = parseFloat(newValue)
					.mul(overheadExpenseRate);
            numberFieldOverheadExpense.setValue(overheadExpense_New);
            numberFieldOverheadExpense.fireEvent('change',
					numberFieldOverheadExpense, overheadExpense_New,
					overheadExpense_Old);
            numberFieldOverheadExpense.beforeBlur();
        }

        // 处理总绩效工资
        if (projectType_RateFieldName == 'overheadExpenseInRate') {
            numberFieldPlan.numberFieldOverheadExpense = formFund._fieldPerformancePayStandard;
            numberFieldPlan.projectType_RateFieldName = 'overheadExpensePerformancePayRate';
            numberFieldPlan.fireEvent('change', numberFieldPlan, newValue,
            		oldValue, true);
            numberFieldPlan.numberFieldOverheadExpense = formFund._fieldOverheadExpensesInStandard;
            numberFieldPlan.projectType_RateFieldName = 'overheadExpenseInRate';
            var rankId = formType._comboBoxType.getEntity();
            var isBudget = rankId.get('isBudget');
            if (!isBudget) {
                formFund._numberFieldPerformancePay.setValue(formFund._fieldPerformancePayStandard.getValue());
                formFund._numberFieldOverheadExpenseInTotal.setValue(formFund._fieldOverheadExpensesInStandard.getValue());
            }
        }

    }
    this._numberFieldFundContract_Validator = function(value) {
        var formFund = this.formFund;
        formFund._numberFieldFundPlanIn.setValue((formFund._numberFieldFundTotal.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000);
        if (this.getMoney() < formFund._numberFieldFundPlanOut.getMoney()) {
            this.invalidText = '合同额应大于预分配外协经费。';
            return false;
        }

        return true;
    }

    // validator
    this._numberFieldFundTotal_Validator = function(value) {
        var formFund = this.formFund;
        formFund._numberFieldFundPlanIn.setValue((this.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000); //修改到校经费变化校内计划分配
        if (this.getMoney() > formFund._numberFieldFundContract.getMoney()) {
            this.invalidText = '总经费（到校经费）不能大于合同额。';
            return false;
        }

        if (formFund._numberFieldFundPlanIn.getMoney()
				&& formFund._numberFieldFundPlanIn.getMoney()
						.add(formFund._numberFieldFundPlanOut.getMoney()) != this
						.getMoney()) {
            this.invalidText = '校内分配和外协分配的和必须等于总经费（到校经费）。';
            return false;
        }
        if (project.get('fundAlreadyTotal') > this.getMoney()) {
            this.invalidText = '到校经费必须大于项目的已到经费';
            return false;
        }
        return true;
    }

    this._numberFieldEquimentCost_Validator = function(value) {
        var formFund = this.formFund;

        if (this.getMoney() > formFund._numberFieldFundContract.getMoney()) {
            this.invalidText = '设备购置费不能大于合同额。';
            return false;
        }

        return true;
    }
    // initial controls
    this._formBasic._comboBoxLevel.formFund = this;
    this._formBasic._textFieldTaskComingFrom.formFund = this;

    this._formType._comboBoxType.formFund = this;
    this._formType._comboBoxSupportCategory.formFund = this;

    this._numberFieldFundContract.formFund = this;
    this._numberFieldFundContract.numberFieldFundTotal = this._numberFieldFundTotal;
    this._numberFieldFundContract.validator = this._numberFieldFundContract_Validator;

    this._numberFieldEquipmentCost.formFund = this;
    this._numberFieldEquipmentCost.numberFieldFundTotal = this._numberFieldFundTotal;

    this._numberFieldFundTotal.formFund = this;
    this._numberFieldFundTotal.numberFieldFundPlanIn = this._numberFieldFundPlanIn;
    this._numberFieldFundTotal.numberFieldFundPlanOut = this._numberFieldFundPlanOut;
    this._numberFieldFundTotal.numberFieldPerformancePay = this._numberFieldPerformancePay;
    this._numberFieldFundTotal.validator = this._numberFieldFundTotal_Validator;

    this._numberFieldEquipmentCost.formFund = this;
    this._numberFieldEquipmentCost.validator = this._numberFieldEquimentCost_Validator;



    // 间接管理费
    this._numberFieldFundPlanIn.formFund = this;
    this._numberFieldFundPlanIn.numberFieldOverheadExpense = this._fieldOverheadExpensesInStandard;
    this._numberFieldFundPlanIn.projectType_RateFieldName = 'overheadExpenseInRate';
    this._numberFieldFundPlanIn.otherPlanItem = this._numberFieldFundPlanOut;

    this._numberFieldFundPlanOut.formFund = this;
    this._numberFieldFundPlanOut.numberFieldOverheadExpense = this._numberFieldOverheadExpenseOutTotal;
    this._numberFieldFundPlanOut.projectType_RateFieldName = 'overheadExpenseOutRate';
    this._numberFieldFundPlanOut.otherPlanItem = this._numberFieldFundPlanIn;

    // event
    this._formBasic._comboBoxLevel.on('select',
			this._onFormBasic_ProjectLevel_Select);
    this._formBasic._textFieldTaskComingFrom.on('change',
			this._onFormBasic_TaskComingFrom_Change);
    this._formType._comboBoxType.projectOutPanel = this._projectOutPanel;
    this._formType._comboBoxType.on('select', this._onFormType_Type_Selelct);
    this._formType._comboBoxSupportCategory.on('select',
			this._onFormType_Type_Selelct);

    this._numberFieldFundContract.on('change',
			this._onNumberFieldFundContract_Change);
    this._numberFieldFundTotal
			.on('change', this._onNumberFieldFundTotal_Change);
    this._numberFieldEquipmentCost.on('change',
			this._numberFieldEquipmentCost_Change);
    this._numberFieldFundPlanIn
			.on('change', this._onNumberFieldFundPlan_Change);
    this._numberFieldFundPlanOut.on('change',
			this._onNumberFieldFundPlan_Change);

    // 刷新
    this._resetFormPanel = function(project, formBasic, formType) {
        this._project = project;
        this._formBasic = formBasic;
        this._formType = formType;
        this._numberFieldFundContract.setValue(Money.render(project
						.get('fundContract'), false));
        this._numberFieldFundTotal.setValue(Money.render(project
						.get('fundTotal'), false));
        this._fieldProjectOverheadExpensesTotal.setValue(Money.render(project
						.get('indirectCosts'), false)); //
        this._fieldProjectPerformanceTotal.setValue(Money.render(project
						.get('projectPerformancePay'), false)); //
        this._numberFieldFundTotal
				.setDisabled(project.get('level') == Srims.projects.ProjectLevel.Perside);
        this._numberFieldFundPlanIn.setValue(Money.render(project
						.get('fundPlanIn'), false));
        this._numberFieldFundPlanOut.setValue(Money.render(project
						.get('fundPlanOut'), false));
        this._numberFieldOverheadExpenseInTotal.setValue(Money.render(project
						.get('overheadExpenseInTotal'), false) + Money.render(project
						.get('performancePay'), false));
        this._numberFieldOverheadExpenseOutTotal.setValue(Money.render(project
						.get('overheadExpenseOutTotal'), false));
        this._percentFieldFundManageProportion.setValue(Money.render(project
						.get('fundManageProportion'), false));
        this._numberFieldPerformancePay.setValue(Money.render(project
						.get('performancePay'), false));
        this._fieldProjectPerformanceTotal.setValue(Money.render(project
						.get('projectPerformancePay'), false));
        this._numberFieldPerformancePayAlready.setValue(Money.render(project
						.get('performancePayAlready'), false));
        this._textFieldFundFrom.setValue(project.get('fundFrom'));
        this._textFieldFundFromUnit.setValue(project.get('fundFromUnit'));
        this._textFieldFundFromUnitAddress.setValue(project
				.get('fundFromUnitAddress'));

    }
}
Ext.extend(Srims.projects.ProjectEditPanel_FundForm, Ext.FormPanel);
