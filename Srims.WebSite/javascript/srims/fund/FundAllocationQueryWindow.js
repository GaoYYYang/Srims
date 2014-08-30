
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationQueryWindow = function(id, store, queryParams){

    this._id = id;
    this._store = store;
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            this.window.buildParams();
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: '分配项目',
        width: 300
    });
    this._numberFieldAllocationAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '分配金额(万元)',
        allowNegative: false,
        width: 130
    });
    this._numberFieldAllocationAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 130
    });
    this._checkboxFundAllocationStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '状态',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.fund.fundAllocationStore),
        cls: 'srims-checkboxGroup'
    });
    
    Srims.fund.FundAllocationQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费分配查询',
        iconCls: 'icon-query',
        width: 500,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            border: false,
            frame: true,
            height: 140,
            items: [this._textFieldProjectName, new Ext.Panel({
                layout: 'column',
                items: [new Ext.Panel({
                    width: 240,
                    layout: 'form',
                    labelWidth: 90,
                    items: this._numberFieldAllocationAmountBegin
                }), new Ext.Panel({
                    layout: 'form',
                    labelWidth: 20,
                    items: this._numberFieldAllocationAmountEnd
                })]
            }), this._checkboxFundAllocationStates]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.buildParams = function(){
        queryParams.projectName = this._textFieldProjectName.getValue();
        queryParams.fundAmountStart = this._numberFieldAllocationAmountBegin.getMoney();
        queryParams.fundAmountEnd = this._numberFieldAllocationAmountEnd.getMoney();
        queryParams.fundAllocationState = this._checkboxFundAllocationStates.getSelecetedValue();
    }
    this.clearParams = function(){
        this._textFieldProjectName.reset();
        this._numberFieldAllocationAmountBegin.reset();
        this._numberFieldAllocationAmountEnd.reset();
        this._checkboxFundAllocationStates.reset();
    }
    this.query = function(button, e){
        var window = button.window;
        window.buildParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.fund.FundAllocationQueryWindow, Ext.Window);
