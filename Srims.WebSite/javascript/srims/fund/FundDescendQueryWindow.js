
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendQueryWindow = function(id, store, queryParams, isBorrow){

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
        fieldLabel: isBorrow ? '借款项目' : '下拨项目',
        width: 300
    });
    this._dateFieldDescendDateBegin = new Ext.form.DateField({
        fieldLabel: isBorrow ? '借款日期' : '下拨日期',
        width: 130
    });
    this._dateFieldDescendDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 130
    });
    this._numberFieldDescendAmountBegin = new Srims.component.MoneyField({
        fieldLabel: isBorrow ? '借款金额(万元)' : '下拨金额(万元)',
        allowNegative: false,
        width: 130
    });
    this._numberFieldDescendAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 130
    });
    
    var columnFirstItems = [this._dateFieldDescendDateBegin, this._numberFieldDescendAmountBegin];
    var columnSecondItems = [this._dateFieldDescendDateEnd, this._numberFieldDescendAmountEnd];
    
    Srims.fund.FundDescendQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isBorrow ? '借款查询' : '经费下拨查询',
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
                    items: columnFirstItems
                }), new Ext.Panel({
                    layout: 'form',
                    labelWidth: 20,
                    items: columnSecondItems
                })]
            })]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.buildParams = function(){
        queryParams.ProjectName = this._textFieldProjectName.getValue();
        queryParams.DescendAmountStart = this._numberFieldDescendAmountBegin.getMoney();
        queryParams.DescendAmountEnd = this._numberFieldDescendAmountEnd.getMoney();
        queryParams.DescendDateTimeStart = Date.format(this._dateFieldDescendDateBegin.getValue());
        queryParams.DescendDateTimeEnd = Date.format(this._dateFieldDescendDateEnd.getValue());
    }
    this.clearParams = function(){
        this._textFieldProjectName.reset();
        this._numberFieldDescendAmountBegin.reset();
        this._numberFieldDescendAmountEnd.reset();
        this._dateFieldDescendDateBegin.reset();
        this._dateFieldDescendDateEnd.reset();
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
Ext.extend(Srims.fund.FundDescendQueryWindow, Ext.Window);
