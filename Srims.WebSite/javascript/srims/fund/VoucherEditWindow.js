if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow = function(id, fundAllocation, voucher, project, isCorrect, allocatinName) {

    this._fundAllocation = fundAllocation;
    this._project = project;
    this._voucher = voucher;
    voucherEditWindow = this.window;

    if (allocatinName == "校内") {
        var fundAllocationAmount = fundAllocation.get('allocationTotal') - fundAllocation.get('allocationIn') - fundAllocation.get('allocationWantOut') - fundAllocation.get('allocationHardware') - fundAllocation.get('overheadExpensesMiddle') - fundAllocation.get('overheadExpensesExpert') - fundAllocation.get('overheadExpensesIn') - fundAllocation.get('overheadExpensesOut');
        this._canAllocationAmount = voucher.isNew() ? fundAllocationAmount : fundAllocationAmount + voucher.get('allocationIn') + voucher.get('allocationOut');
    } else {
        //绩效分配
        var fundAllocationAmount = fundAllocation.get('arrivedPerformance') - fundAllocation.get('allocatedPerformance');
        this._canAllocationAmount = voucher.isNew() ? fundAllocationAmount : fundAllocationAmount + voucher.get('overheadPerformancePay');
    }

    if (isCorrect) {
        //当为数据纠错功能时，经费一经分配便计入项目已分配经费
        this._projectCanAllocationInAmount = voucher.isNew() ? project.get('fundPlanIn') - project.get('fundAlreadyIn') : project.get('fundPlanIn')
         - project.get('fundAlreadyIn') + voucher.get('allocationIn');
        //this._projectCanAllocationOutAmount = voucher.isNew() ? project.get('fundPlanOut') - project.get('fundAlreadyOut') : project.get('fundPlanOut') - project.get('fundAlreadyOut') + voucher.get('allocationOut');
        this._projectCanAllocationOutAmount = fundAllocation.get('allocationWantOut');
    } else {
        this._projectCanAllocationInAmount = voucher.isNew() ? project.get('fundPlanIn') - project.get('fundAlreadyIn') - fundAllocation.get('allocationIn') : project.get('fundPlanIn') - project.get('fundAlreadyIn') - fundAllocation.get('allocationIn') + voucher.get('allocationIn');
        //this._projectCanAllocationOutAmount = voucher.isNew() ? project.get('fundPlanOut') - project.get('fundAlreadyOut') - fundAllocation.get('allocationWantOut') : project.get('fundPlanOut') - project.get('fundAlreadyOut') - fundAllocation.get('allocationWantOut') + voucher.get('allocationOut');
        this._projectCanAllocationOutAmount = fundAllocation.get('allocationWantOut');
    }
    this._inForm = new Srims.fund.VoucherEditWindow_InForm(fundAllocation, voucher, project, this._canAllocationAmount, this._projectCanAllocationInAmount, isCorrect, allocatinName);
    this._voucherOutStore = new Srims.fund.VoucherOutStore(voucher.get('id'));
    this._projectOutStore = new Srims.fund.ProjectOutStore(fundAllocation.get('id'));

    if (fundAllocation.get('allocationOut') > 0)
        this._projectCanAllocationOutAmount = 0;

    this._editGridPanel = new Srims.fund.VoucherEditWindow_Out_EditGridPanel(fundAllocation, project, this._projectOutStore, this._canAllocationAmount, this._projectCanAllocationOutAmount);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });

    Srims.fund.VoucherEditWindow.superclass.constructor.call(this, {
        id: id,
        title: '编辑凭单',
        width: 750,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._inForm, this._editGridPanel],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._inForm.focus();
    this._voucherOutStore.on('load', function() {
        var voucherOuts = this.getRange();
        for (var i = 0; i < voucherOuts.length; i++) {
            voucherOuts[i].set('amount', Money.render(voucherOuts[i].get('amount'), false));
        }
    })
    this._voucherOutStore.load();

    this.validateAllocationOut = function() {
        //carlsircfe2012.2.28 去掉验证，外协单位为系统加载
        //        var voucherOuts = this._voucherOutStore.getRange();

        //        for (var i = 0; i < voucherOuts.length; i++) {
        //            var corporation = voucherOuts[i].get('corporation');
        //            if (String.isEmpty(corporation)) {

        //                Ext.Msg.show({
        //                    title: '外协分配错误',
        //                    msg: '外协分配中有外协公司为空的分配，请修改或删除此外协分配',
        //                    buttons: Ext.Msg.OK,
        //                    icon: Ext.MessageBox.INFO
        //                });

        //                return false;
        //            }
        //            var allocationAmount = voucherOuts[i].get('amount');
        //            if (allocationAmount == null || allocationAmount == undefined || allocationAmount == 0) {
        //                Ext.Msg.show({
        //                    title: '外协分配错误',
        //                    msg: '外协分配中有分配金额等于0或为空的分配，请修改或删除此外协分配',
        //                    buttons: Ext.Msg.OK,
        //                    icon: Ext.MessageBox.INFO
        //                });
        //                return false;
        //            }
        //        }
        return true;
    }
    this.validateExpert = function() {

        var expertID = this._inForm._comboBoxFundMember.getEntity().get('expertID');
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetByExpertId',
            params: {
                expertID: expertID
            },
            scope: this,
            success: function(response) {
                if (!Boolean.toBoolean(responseText))
                    Ext.MessageBox.show({
                        title: '确认经费成员',
                        msg: '注意：您添加的经费成员不在项目成员中！',
                        buttons: Ext.MessageBox.YESNO,
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
    this.validateAllocationTotal = function() {
        //var voucherOuts = this._voucherOutStore.getRange();
        var projectOuts = this._projectOutStore.getRange();
        var fundAllocationOutTotal = 0;
        for (var i = 0; i < projectOuts.length; i++) {
            //var allocationAmount = voucherOuts[i].get('amount');
            var allocationAmount = projectOuts[i].get('wantAllocated');
            if (allocationAmount != null && allocationAmount != undefined && allocationAmount != 0)
                fundAllocationOutTotal += Money.toMoney(projectOuts[i].get('wantAllocated'));
        }
        if (fundAllocationOutTotal > this._projectCanAllocationOutAmount) {
            Ext.Msg.show({
                title: '外协分配错误',
                msg: '外协分配总额不能大于经费分配的最高外协分配金额：' + Money.render(this._projectCanAllocationOutAmount),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (fundAllocationOutTotal + this._inForm._numberFieldFundAmount.getMoney() == 0) {
            Ext.Msg.show({
                title: '经费分配错误',
                msg: '凭单总额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });

            return false;
        }
        if (this._inForm._numberFieldFundAmount.getMoney() > this._canAllocationAmount) {
            Ext.Msg.show({
                title: '经费分配错误',
                msg: '分配总额不能大于经费未分配总额：' + Money.render(this._canAllocationAmount),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }

        return true;
    }
    this.validate = function(preventMark) {
        var result = true;

        result = this._inForm.validate(preventMark) && result;
        result = this.validateAllocationOut() && result;
        result = this.validateAllocationTotal() && result;
        //result = this.validateExpert() && result;

        return result;
    }
    this.save = function() {
        var voucher = this._voucher;
        //var voucherOuts = this._voucherOutStore.getRange();
        var projectOuts = this._projectOutStore.getRange();
        var voucherOutString = '';
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('wantAllocated') > 0) {
                voucherOutString += Money.toMoney(projectOuts[i].get('wantAllocated'));
                voucherOutString += '###';
                voucherOutString += projectOuts[i].get('outsourcingName');
                voucherOutString += '|||';
            }

        }

        voucher.beginEdit();
        this._inForm.assginValues();
        voucher.commit();

        var params = voucher.data;
        params.voucherOutString = voucherOutString;
        params.isCorrect = isCorrect;
        //判断是否已经给这个专家分配过经费了

        if (allocatinName == "校内" && fundAllocation.get('overheadExpensesIn') == 0 && fundAllocation.get('allocationWantOut') != 0 && voucherOutString == "") {

            // Ext.MessageBox.confirm("提示", "您确定不用分配外协了吗？", function(button, text) {
            //  if (button == 'yes') {
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + '/Save',
                params: params,
                scope: this,
                async: false,
                success: function() {
                    var panel = fundAllocation.panel;
                    if (panel == undefined) {
                        voucherEditWindow.close();
                        return;
                    }

                    panel.fundAllocation = fundAllocation;
                    panel.refresh();


                    //以下仅用于数据纠错
                    if (isCorrect) {
                        if (fundAllocation.store) {
                            fundAllocation.store.load();
                        }

                        Ext.Ajax.request({
                            url: Srims.service.fund.FundAllocationService + '/GetById',
                            params: {
                                fundAllocationId: fundAllocation.get('id')
                            },
                            scope: this,
                            success: function(response) {
                                var store = new Ext.data.Store({
                                    data: response.responseXML,
                                    reader: new Srims.fund.FundAllocationXmlReader()
                                });
                                var currentFundAllocation = store.getAt(0);
                                currentFundAllocation.panel = panel;
                                currentFundAllocation.panel = fundAllocation.panel;
                                currentFundAllocation.store = fundAllocation.store;
                                currentFundAllocation.toobBar = fundAllocation.toobBar;
                                currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                            }
                        });
                    }

                    voucherEditWindow.close();
                }
            });
            //        }
            // });
            this.close();
        } else {
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + '/CheckIsPrinciple',
                params: params,
                scope: this,
                async: false,
                success: function(response) {
                    if (Boolean.toBoolean(response.responseText)) {
                        //var voucherOuts = this._voucherOutStore.getRange();
                        var projectOuts = this._projectOutStore.getRange();
                        var fundAllocationOutTotal = 0;
                        for (var i = 0; i < projectOuts.length; i++) {
                            var allocationAmount = projectOuts[i].get('wantAllocated');
                            if (allocationAmount != null && allocationAmount != undefined && allocationAmount != 0)
                                fundAllocationOutTotal += Money.toMoney(projectOuts[i].get('wantAllocated'));
                        }
                        if (projectOuts.length != 0 && fundAllocationOutTotal < this._projectCanAllocationOutAmount) {
                            Ext.Msg.show({
                                title: '经费分配错误',
                                msg: '当前已分配外协总额小于应分配额：' + Money.render(this._projectCanAllocationOutAmount),
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            this._buttonSave.enable();
                            return;
                        }
                        Ext.Ajax.request({
                            url: Srims.service.fund.VoucherService + '/Save',
                            params: params,
                            scope: this,
                            success: function() {
                                var panel = this._fundAllocation.panel;
                                if (panel == undefined) {
                                    this.close();
                                    return;
                                }

                                panel.fundAllocation = this._fundAllocation;
                                panel.refresh();


                                //以下仅用于数据纠错
                                if (isCorrect) {
                                    if (this._fundAllocation.store) {
                                        this._fundAllocation.store.load();
                                    }

                                    Ext.Ajax.request({
                                        url: Srims.service.fund.FundAllocationService + '/GetById',
                                        params: {
                                            fundAllocationId: fundAllocation.get('id')
                                        },
                                        scope: this,
                                        success: function(response) {
                                            var store = new Ext.data.Store({
                                                data: response.responseXML,
                                                reader: new Srims.fund.FundAllocationXmlReader()
                                            });
                                            var currentFundAllocation = store.getAt(0);
                                            currentFundAllocation.panel = panel;
                                            currentFundAllocation.panel = this._fundAllocation.panel;
                                            currentFundAllocation.store = this._fundAllocation.store;
                                            currentFundAllocation.toobBar = this._fundAllocation.toobBar;
                                            currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                                        }
                                    });
                                }
                                this.close();
                            }
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: '所选专家不是项目负责人！',
                            msg: '注意：您添加外协经费的成员不是项目负责人！请选择项目负责人重新填写。',
                            buttons: Ext.MessageBox.OK,
                            scope: this,
                            fn: function(button) {
                                if (button == 'yes')
                                    return true;
                            },
                            icon: Ext.MessageBox.QUESTION
                        });
                        this._buttonSave.enable();
                    }
                }
            });
        }
    }
    this.buttonSave_click = function(button, e) {
        var window = this.window;
        if (!window.validate(false))
            return;

        button.setText('保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.VoucherEditWindow, Ext.Window);