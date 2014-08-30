
if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.PayPlanItemEditWindow = function(id, payPlanItem, project, store){

    this._id = id;
    this._payPlanItem = payPlanItem;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '到款时间',
        value: this._payPlanItem.get('dateTime'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    this._numberFieldAmount = new Srims.component.MoneyField({
        fieldLabel: '数额(万元)',
        value: this._payPlanItem.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    Srims.fund.PayPlanItemEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑项目付款计划信息',
        width: 300,
        labelWidth: 70,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldDateTime, this._numberFieldAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._validAmount = function(){
        var amount = this._numberFieldAmount.getMoney();
        
        if (amount == 0) {
            Ext.Msg.show({
                title: '付款金额错误',
                msg: '付款金额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        
        var projectPayPlanItems = this._store.getRange();
        var projectFundTotal = this._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) {
            if (this._payPlanItem == projectPayPlanItems[i]) 
                continue;
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        }
        if (projectFundTotal < projectPayPlanAmountTotal + amount) {
            Ext.Msg.show({
                title: '付款金额错误',
                msg: '计划付款金额不能大于项目的到校经费金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldDateTime.isValid(preventMark) && result;
        result = this._numberFieldAmount.isValid(preventMark) && result;
        result = this._validAmount() && result;
        
        return result;
    }
    this._assignValues = function(){
        this._payPlanItem.set('dateTime', this._dateFieldDateTime.getValue());
        this._payPlanItem.set('amount', this._numberFieldAmount.getMoney());
        this._payPlanItem.set('projectID', this._project.get('id'));
    }
    this._save = function(){
        var payPlanItem = this._payPlanItem;
        payPlanItem.beginEdit();
        this._assignValues();
        payPlanItem.commit();
        
        payPlanItem.data.dateTime = payPlanItem.data.dateTime.format("Y-m-d H:i:s");
        
        Ext.Ajax.request({
            url: Srims.service.fund.PayPlanItemService + '/Save',
            params: payPlanItem.data,
            scope: this,
            success: function(){
                var payPlanItem = this._payPlanItem;
                delete payPlanItem.data.dateTime;
                this._store.load();
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.fund.PayPlanItemEditWindow, Ext.Window, {})
