
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel = function(id, project, unsubmitProjectStore, isExpetEdit, projectOutPanel) {


    this._project = project;
    this._unsubmitProjectStore = unsubmitProjectStore;
    this._title = project.isNew() ? project.get('isHorizontal') ? '新建横向项目' : '新建纵向项目' : project.get('name');

    var projectOutAmount = 0;


    this._secretProjectMessagePanel = new Srims.projects.ProjectEditPanel_SecretProjectMessagePanel();

    this._formPanelBasic = new Srims.projects.ProjectEditPanel_BasicForm(project);
    this._formPanelType = new Srims.projects.ProjectEditPanel_TypeForm(project);

    //    this.validatFundForm = function() {
    //        var panel = this.panel;
    //        var projectOutStore = panel._projectOutPanel._store;
    //        var projectOuts = projectOutStore.getRange();
    //        for (var i = 0; i < projectOuts.length; i++) {
    //            projectOutAmount += projectOuts[i].get('amount');
    //        }
    //        this._numberFieldFundPlanOut.setValue(projectOutAmount);
    //        return true;
    //    }

    this._formPanelFund = new Srims.projects.ProjectEditPanel_FundForm(project, this._formPanelBasic, this._formPanelType, projectOutPanel);
    this._formPanelFund.parentPanel = this;
    //    this._formPanelFund.panel = this;
    //    this._formPanelFund.validator = this.validatFundForm;

    this._formPanelRemark = new Srims.projects.ProjectEditPanel_RemarkForm(project);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        hidden: isExpetEdit == true,
        panel: this
    });
    //carlsirce2013.2.28 控制项目编辑页面下的外协编辑框的显示
    if (Srims.currentLoginLog.user.userRoleType != 'Expert') {

        this._projectOutPanel = new Srims.projects.ProjectEditPanel_ProjectOutForm(project);
        this._projectOutPanel.parentPanel = this;
        Srims.projects.ProjectEditPanel.superclass.constructor.call(this, {
            id: id,
            style: 'padding:5px; width:1200px',
            closable: true,
            deferHeight: false,
            buttonAlign: 'center',
            title: isExpetEdit ? '' : this._title,
            iconCls: project.isNew() ? 'icon-project-new' : 'icon-project-edit',
            items: [this._projectOutPanel, this._formPanelBasic, this._formPanelType, this._formPanelFund, this._formPanelRemark],
            buttons: [this._buttonSave]
        });
    }
    else {
        Srims.projects.ProjectEditPanel.superclass.constructor.call(this, {
            id: id,
            style: 'padding:5px; width:1200px',
            closable: true,
            deferHeight: false,
            buttonAlign: 'center',
            title: isExpetEdit ? '' : this._title,
            iconCls: project.isNew() ? 'icon-project-new' : 'icon-project-edit',
            items: [this._formPanelBasic, this._formPanelType, this._formPanelFund, this._formPanelRemark],
            buttons: [this._buttonSave]
        });
    }


    //method
    this.assginValues = function() {
        this._formPanelBasic.assginValues();
        this._formPanelType.assginValues();
        this._formPanelFund.assginValues();
        this._formPanelRemark.assginValues();
    }

    this.isValid = function(preventMark) {
        var result = true;

        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelType.isValid(preventMark) && result;
        result = this._formPanelFund.isValid(preventMark) && result;
        result = this._formPanelRemark.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        //        if (this._formPanelFund._numberFieldFundContract.getMoney() * 0.4 < this._formPanelFund._numberFieldFundPlanOut.getMoney() && this._project.get('isHorizontal')) {
        //            Ext.Msg.show({
        //                title: '不能保存',
        //                msg: '计划外协经费不能超过合同额的40%。',
        //                buttons: Ext.Msg.OK,
        //                icon: Ext.MessageBox.WARNING
        //            });
        //            this._buttonSave.enable();
        //            return;
        //        }
        //carlsirce2013.3.11 判断横向项目外协经费比例
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetFundOutRatio',
            scope: this,
            success: function(response) {
                if (response.responseText) {
                    if (this._formPanelFund._numberFieldFundContract.getMoney() * response.responseText / 100 < this._formPanelFund._numberFieldFundPlanOut.getMoney() && this._project.get('isHorizontal')) {
                        Ext.Msg.show({
                            title: '不能保存',
                            msg: '计划外协经费不能超过合同额的' + response.responseText + '%。',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        this._buttonSave.enable();
                        return;
                    }
                }
            }
        });
//        if ((this._formPanelFund._numberFieldOverheadExpenseInTotal.getMoney() < 0.95 * this._formPanelFund._fieldOverheadExpensesInStandard.getMoney() || this._formPanelFund._numberFieldPerformancePay.getMoney() > 1.05 * this._formPanelFund._fieldPerformancePayStandard.getMoney()) && !Srims.currentUser.isSuper && !this._project.get('isHorizontal')) {
//            Ext.Msg.show({
//                title: '无权限保存',
//                msg: '您所编辑的绩效与间接费已经超过基准值5%，不能保存，请联系超级管理员编辑。',
//                buttons: Ext.Msg.OK,
//                icon: Ext.MessageBox.WARNING
//            });
//            this._buttonSave.enable();
//            return;
//        }
        var project = this._project;
        project.beginEdit();
        this.assginValues();
        project.commit();

        project.data.startDateValue = project.data.startDate.format("Y-m-d H:i:s");
        project.data.endDateValue = project.data.endDate.format("Y-m-d H:i:s");
        //carlsirce2013.2.28 加入外协单位保存
        //专家用户新建时
        if (this.parentPanel) {
            var projectOutPanel = this.parentPanel._ProjectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var projectOutString = '';

            for (var i = 0; i < projectOuts.length; i++) {
                projectOutString += Money.toMoney(projectOuts[i].get('amount'));
                projectOutString += '###';
                projectOutString += projectOuts[i].get('outSourcingName');
                projectOutString += '|||';
            }
            project.data.projectOutString = projectOutString;
        }
        //管理员用户编辑保存时
        if (this._projectOutPanel) {
            var projectOutPanel = this._projectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var projectOutString = '';

            for (var i = 0; i < projectOuts.length; i++) {
                projectOutString += Money.toMoney(projectOuts[i].get('amount'));
                projectOutString += '###';
                projectOutString += projectOuts[i].get('outSourcingName');
                projectOutString += '|||';
            }
            project.data.projectOutString = projectOutString;
        }
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/Save',
            params: project.data,
            scope: this,
            success: function(response) {
                if (this._unsubmitProjectStore)
                    this._unsubmitProjectStore.load();
                //此处是为了在修改项目信息时，刷新前边的GridPanel
                var project = this._project;
                if (project.projectStore != undefined) {
                    project.projectStore.load();
                }
                delete project.data.startDateValue;
                delete project.data.endDateValue;

                if (isExpetEdit == undefined)
                    Srims.WorkSpace.getWorkSpace().remove(this);

                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectSimpleXmlReader()
                });
                var project = store.getAt(0);

                //仅用户专家向导，刷新其他面板
                if (isExpetEdit == true) {
                    this.panel.panel.setIconClass('icon-project-edit');
                    this.panel.panel.setTitle('项目' + project.get('name') + '立项申请');
                    this.panel.panel._memberManagePanel.setProject(project);
                    Srims.expertGuide.next(this);
                    return;
                }

                Srims.projects.showProject(project);
            }
        });

    }
    this.validateProjectName = function() {
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/CountByName',
            params: {
                name: this._formPanelBasic._textFieldName.getValue()
            },
            scope: this,
            success: this._onValidateProjectName
        });
    }
    this._onValidateProjectName = function(response) {
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('项目重名', '目前已存在和该项目重名的项目，是否继续？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.save();
                }
                else {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
            }, this);
        }
        else {
            this.save();
        }
    }
    //event method
    this._onButonSave_Click = function(button, e) {
        var panel = button.panel;
        //alert(panel._formPanelBasic._comboBoxBase.getEntity().get('name'));

        if (!panel.isValid(false))
            return;

        var project = panel._project;
        panel.assginValues();
        //carlsirce2013.3.1 验证管理员编辑项目时的外协信息
        if (panel._projectOutPanel) {
            var projectOutPanel = panel._projectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var flag = 1;
            for (var i = 0; i < projectOuts.length; i++) {
                if (projectOuts[i].get('amount') <= 0 || projectOuts[i].get('outSourcingName') == '')
                    flag = 0;
            }
            if (flag == 0) {
                Ext.Msg.show({
                    title: '外协填写错误',
                    msg: '请检查所有外协单位不为空且分配数额大于0！',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
        }
        //验证到校经费必须大于计划外协经费与外协管理费的和
        if (panel._formPanelFund._numberFieldOverheadExpenseOutTotal.getValue() > panel._formPanelFund._numberFieldFundPlanIn.getValue()) {
            Ext.Msg.show({
                title: '填写错误',
                msg: '到校经费必须大于计划外协分配与外协管理费之和！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        //当项目的外协经费为零时，提示是否保存
        if (project.get('fundPlanOut') <= 0) {
            Ext.MessageBox.confirm('外协分配为零', '外协分配为0,你确定要继续吗？   ', function(buttonId) {
                if (buttonId == 'yes')
                    panel.saveAction(button);
            }, this);
        }
        else
            panel.saveAction(button);
    }
    this.saveAction = function(button) {
        button.setText('正在保存');
        button.disable();

        if (this._project.isNew())
            this.validateProjectName();
        else
            this.save();
    }

    //event
    this._buttonSave.on('click', this._onButonSave_Click);

    //刷新(仅用于专家向导)
    this.setProject = function(project) {
        this._project = project;
        this.setTitle(project.isNew() ? project.get('isHorizontal') ? '新建横向项目' : '新建纵向项目' : project.get('name'));
        this._formPanelBasic._resetFormPanel(this._project);
        this._formPanelType._resetFormPanel(this._project);
        this._formPanelFund._resetFormPanel(this._project, this._formPanelBasic, this._formPanelType);
        this._formPanelRemark._resetFormPanel(this._project);
    }

    this.next = function() {
        if (!this.isValid(false))
            return;
        this.save();
    }
}
Ext.extend(Srims.projects.ProjectEditPanel, Ext.Panel, {});
