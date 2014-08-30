
if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundDescend_ExpertWindow = function(id, store){

    this._id = id;
    this._store = store;
    
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
        fieldLabel: '下拨项目',
        allowBlank: false,
        isReturn: false,
        width: 300
    });
    this._comboBoxFinance = new Srims.component.FinanceSearch.SearchComboBox({
        fieldLabel: '经费到帐',
        allowBlank: false,
        width: 300
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: '下拨金额(万元)',
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    
    items = [this._comboBoxFinance, this._comboBoxProject, this._numberFieldFundAmount];
    
    Srims.fund.FundDescend_ExpertWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费下拨',
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
        var finance = this.window._comboBoxFinance.getEntity();
        var project = this.window._comboBoxProject.getEntity();
        
        if (this.getMoney() <= 0) {
            this.invalidText = '下拨金额必须大于0';
            return false;
        }
        
        var financeCanDescendAmount = finance.get('amount') - finance.get('descendAmount');
        if (this.getMoney() > financeCanDescendAmount) {
            this.invalidText = '下拨金额不能大于经费到帐信息的未下拨金额';
            return false;
        }
        
        var projectCanDescendAmount = project.get('fundTotal') - project.get('fundReceived');
        if (this.getMoney() > projectCanDescendAmount) {
            this.invalidText = '下拨金额不能大于项目的未下拨金额';
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
        result = this._comboBoxFinance.isValid(preventMark) && result;
        
        return result;
    }
    this.assginValues = function(params){
        params.isLent = false;
        params.projectID = this._comboBoxProject.getSelectEntityId();
        params.amount = this._numberFieldFundAmount.getMoney();
        params.financeId = this._finance == undefined ? this._comboBoxFinance.getSelectEntityId() : this._finance.get('id');
    }
    this.save = function(){
        var params = {};
        this.assginValues(params);
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(){
                if (store) 
                    store.load();
                
                this.close();
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
    this._comboBoxProject.on('focus', function(){
        var user = Srims.currentLoginLog.user;
        this.setValue(user.name);
        this.store.load({
            params: {
                query: this.getText()
            }
        });
    })
}
Ext.extend(Srims.fund.FundDescend_ExpertWindow, Ext.Window);
