
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceSelectPanel_QueryPanel = function(store){

    this._store = store;
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            window.query()
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.reset();
        }
    });
    this._numberFieldAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        width: 100
    });
    this._numberFieldAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 100
    });
    
    this._textFieldAbstract = new Ext.form.TextField({
        fieldLabel: '摘要',
        width: 180
    });
    
    Srims.fund.FinanceSelectPanel_QueryPanel.superclass.constructor.call(this, {
        layout: 'form',
        labelWidth: 80,
        items: [new Ext.Panel({
            layout: 'column',
            labelWidth: 80,
            items: [new Ext.Panel({
                labelWidth: 80,
                layout: 'form',
                items: [this._numberFieldAmountBegin]
            }), new Ext.Panel({
                labelWidth: 20,
                style: 'padding-left: 20px',
                layout: 'form',
                items: [this._numberFieldAmountEnd]
            }), new Ext.Panel({
                labelWidth: 40,
                layout: 'form',
                style: 'padding-left: 10px',
                items: [this._textFieldAbstract]
            }), new Ext.Panel({
                layout: 'form',
                style: 'padding-left: 10px',
                items: [this._buttonQuery]
            }), new Ext.Panel({
                layout: 'form',
                style: 'padding-left: 10px',
                items: [this._buttonReset]
            })]
        })]
    });
    this.reset = function(){
        this._numberFieldAmountBegin.reset();
        this._numberFieldAmountEnd.reset();
        this._textFieldAbstract.reset();
    }
    this.query = function(){
        if (this._numberFieldAmountBegin.getMoney() == '' && this._numberFieldAmountEnd.getMoney() == '' && this._textFieldAbstract.getValue() == '') {
            Ext.Msg.show({
                title: '请输入查询条件',
                msg: '至少需要输入一个查询条件',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        this._store.load({
            params: {
                amountStart: this._numberFieldAmountBegin.getMoney(),
                amountEnd: this._numberFieldAmountEnd.getMoney(),
                financeAbstract: this._textFieldAbstract.getValue(),
                IsDescendAll: false
            }
        })
    }
    this.focus = function(){
        this._numberFieldAmountBegin.focus(false, true);
    }
}
Ext.extend(Srims.fund.FinanceSelectPanel_QueryPanel, Ext.Panel);
