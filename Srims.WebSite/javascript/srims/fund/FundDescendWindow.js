
if (!Srims.fund)
    Ext.namespace('Srims.fund');
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.fund.FundDescendWindow = function(id, finance, fundDescend, store, manageWindow, isLent) {

    this._id = id;
    this._store = store;
    this._finance = finance;
    this._fundDescend = fundDescend;
    this._manageWindow = manageWindow;

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

    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: isLent ? '借款项目' : '下拨项目',
        value: this._fundDescend.get('projectName'),
        selectEntityId: this._fundDescend.get('projectID'),
        allowBlank: false,
        isReturn: false,
        width: 300
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: isLent ? '借款金额(万元)' : '下拨金额(万元)',
        value: this._fundDescend.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });

    Srims.fund.FundDescendWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isLent ? '项目借款' : '经费下拨',
        width: 440,
        height: 160,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxProject, this._numberFieldFundAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.validateFundAmount = function() {
        var finance = this.window._finance;
        var fundDescend = this.window._fundDescend;

        if (this.getMoney() <= 0) {
            this.invalidText = '下拨金额必须大于0';
            return false;
        }
        if (isLent)
            return true;

        var financeUndescendAmount = fundDescend.isNew() ? (finance.get('amount') - finance.get('descendAmount')) : (finance.get('amount') - finance.get('descendAmount') + fundDescend.get('amount'));
        if (this.getMoney() > financeUndescendAmount) {
            this.invalidText = '下拨金额不能大于经费到帐信息的未下拨金额';
            return false;
        }

        return true;
    }

    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    this.validate = function(preventMark) {
        var result = true;

        result = this._comboBoxProject.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        return result;
    }
    this.assginValues = function(params) {
        params.projectID = this._comboBoxProject.getSelectEntityId();
        params.amount = this._numberFieldFundAmount.getMoney();
        params.isLent = isLent;

        if (!isLent)
            params.financeId = this._finance.get('id');
        if (!this._fundDescend.isNew())
            params.FundDescendId = this._fundDescend.get('id');
        if (!this._fundDescend.isNew() && this._fundDescend.get('projectID') != this._comboBoxProject.getSelectEntityId())
            params.oldProjectId = this._fundDescend.get('projectID');
    }
    this.save = function() {
        var params = {};
        this.assginValues(params);

        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(response) {
                Srims.fund.FundDescendCallBack(this._manageWindow, response, store, this, true);
            }

        });
    }
    this.buttonSave_click = function(button, e) {
        var window = button.window;

        if (!window.validate(false))
            return;

        var store = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/GetById', {
            projectId: window._comboBoxProject.getSelectEntityId()
        });
        store.numberFieldFundAmount = window._numberFieldFundAmount;

        store.on('load', function() {
            var project = this.getAt(0);
            var numberFieldFundAmount = this.numberFieldFundAmount;
            var isChangeProject = !fundDescend.isNew() && project.get('id') != fundDescend.get('projectID');
            var projectCanFundDescendAmount;

            if (fundDescend.isNew() || isChangeProject)
                projectCanFundDescendAmount = project.get('fundCanDescend');
            else
                projectCanFundDescendAmount = project.get('fundCanDescend') + fundDescend.get('amount');

            if (numberFieldFundAmount.getMoney() > projectCanFundDescendAmount) {
                Ext.Msg.show({
                    title: '经费下拨错误',
                    msg: '下拨金额不能大于项目的未下拨金额',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return;
            }
            //加入三四级外协公司控制

            var paramsProjectID = {};
            paramsProjectID.projectID = window._comboBoxProject.getSelectEntityId();

            Ext.Ajax.request({
                url: Srims.service.fund.FundDescendService + '/GetOutsourcingAmountByProject',
                params: paramsProjectID,
                scope: this,
                success: function(response) {
                    var outsourcingAmount = parseInt(response.responseText);
                    if (outsourcingAmount < 0)
                        outsourcingAmount = 0;
                    projectCanFundDescendAmount = project.get('fundPlanIn') - project.get('fundAlreadyIn') + outsourcingAmount;
                    if (numberFieldFundAmount.getMoney() > projectCanFundDescendAmount) {
                        Ext.Msg.show({
                            title: '经费下拨警告',
                            msg: '因该项目存在三级或四级外协公司，最多可以下拨' + Money.render(projectCanFundDescendAmount) + '。',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        //暂时屏蔽控制，只提示。
                        //return;
                    }
                    button.setText('正在保存');
                    button.disable();

                    window.save();
                }
            });


        })
        store.load();
    }

    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.FundDescendWindow, Ext.Window);
