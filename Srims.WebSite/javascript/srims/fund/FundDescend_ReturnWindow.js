
if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundDescend_ReturnWindow = function(id, finance, store, manageWindow, project){

    this._id = id;
    this._store = store;
    this._finance = finance;
    this._manageWindow = manageWindow;
    this._project = project;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
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
        fieldLabel: '还款项目',
        value: this._project == undefined ? undefined : this._project.get('name'),
        selectEntityId: this._project == undefined ? undefined : this._project.get('id'),
        allowBlank: false,
        isReturn: true,
        disabled: this._project != undefined,
        width: 300
    });
    this._comboBoxFinance = new Srims.component.FinanceSearch.SearchComboBox({
        fieldLabel: '经费到帐',
        allowBlank: false,
        width: 300
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: '还款金额(万元)',
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    var items = [];
    if (finance != undefined) 
        items = [this._comboBoxProject, this._numberFieldFundAmount];
    else 
        items = [this._comboBoxProject, this._comboBoxFinance, this._numberFieldFundAmount];
    
    Srims.fund.FundDescend_ReturnWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目还款',
        width: 440,
        autoHeight: true,
        bodyStyle: 'padding:10px 10px 30px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.validateFundAmount = function(){
        var finance = this.window._finance;
        var fundDescend = this.window._fundDescend;
        var project = this.window._comboBoxProject.getEntity();
        
        if (this.getMoney() <= 0) {
            this.invalidText = '还款金额必须大于0';
            return false;
        }
        
        var financeCanReturnAmount = finance.get('amount') - finance.get('descendAmount');
        if (this.getMoney() > financeCanReturnAmount) {
            this.invalidText = '还款金额不能大于经费到帐信息的未下拨金额';
            return false;
        }
        
        var projectUnreturnAmount = project.get('borrowAmount') - project.get('returnAmount');
        if (this.getMoney() > projectUnreturnAmount) {
            this.invalidText = '还款金额不能大于项目的未还款金额';
            return false;
        }
        
        return true;
    }
    
    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;
    
    this.validate = function(preventMark){
        var result = true;
        
        result = this._comboBoxProject.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;
        if (this._finance == undefined) 
            result = this._comboBoxFinance.isValid(preventMark) && result;
        
        return result;
    }
    this.assginValues = function(params){
        params.projectID = this._comboBoxProject.getSelectEntityId();
        params.amount = this._numberFieldFundAmount.getMoney();
        params.financeId = this._finance == undefined ? this._comboBoxFinance.getSelectEntityId() : this._finance.get('id');
    }
    this.save = function(){
        var params = {};
        this.assginValues(params);
        
        Ext.Ajax.request({
            url: Srims.service.fund.FinanceFundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(response){
                Srims.fund.FundDescendCallBack(manageWindow, response, store, this, false);
            }
        });
    }
    this.buttonSave_click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.FundDescend_ReturnWindow, Ext.Window);
