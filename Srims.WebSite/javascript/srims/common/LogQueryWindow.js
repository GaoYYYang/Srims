
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogQueryWindow = function(id, store, queryParams){
    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.common.LogQueryWindow_InforPanel();
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
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
    
    Srims.common.LogQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '日志查询',
        iconCls: 'icon-finance-query',
        autoHeight: true,
        autoWidth: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            layout: 'form',
            width: 500,
            labelWidth: 80,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.common.LogQueryWindow, Ext.Window);


