
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentQueryWindow = function(id, store, queryParams){
    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.patents.PatentQueryWindow_BasicPanel();
    this._otherPanel = new Srims.patents.PatentQueryWindow_OtherPanel();
    this._ExpertPanel = new Srims.patents.PatentQueryWindow_ExpertPanel();
    
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
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            
            window.getParams();
            Srims.common.newView(Srims.common.ViewType.PatentQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
        
            Srims.common.showViewWindow(Srims.common.ViewType.PatentQuery);
            this.window.hide();
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
    
    Srims.patents.PatentQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '专利查询',
        iconCls: 'icon-patent-query',
        width: 725,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 560,
        closeAction: 'close',
        stateful: false,
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 700,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 480,
            deferredRender: false,
            autoScroll: true,
            items: [this._basicPanel, this._otherPanel, this._ExpertPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._ExpertPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._ExpertPanel.clearParams();
    }
    
    this.getGridPanel = function(){
        var gridPanelID = "PatentGridPanel_PatentList";
        Srims.WorkSpace.active(gridPanelID);
    }
    this.query = function(button){
        var window = button.window;
        window.getGridPanel();
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}

Ext.extend(Srims.patents.PatentQueryWindow, Ext.Window);









