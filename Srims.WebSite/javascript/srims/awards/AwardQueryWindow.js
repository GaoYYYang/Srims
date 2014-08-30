
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardQueryWindow = function(id, store, queryParams){
    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.awards.AwardQueryWindow_BasicPanel();
    this._otherPanel = new Srims.awards.AwardQueryWindow_OtherPanel();
    this._winnerPanel = new Srims.awards.AwardQueryWindow_ExpertPanel();
    
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
            if (!window.isValid(false)) 
                return;
            //清空筛选条件
            var filters = Ext.getCmp('AwardGridPanel_AwardList')._filters;
            filters.clearFilters();
            
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
            Srims.common.newView(Srims.common.ViewType.AwardQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
        
            Srims.common.showViewWindow(Srims.common.ViewType.AwardQuery);
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
            window.close();
        }
    });
    
    Srims.awards.AwardQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '奖励查询',
        iconCls: 'icon-award-query',
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
            items: [this._basicPanel, this._otherPanel, this._winnerPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._winnerPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._winnerPanel.clearParams();
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._basicPanel.isValid(preventMark) && result;
        return result;
    }
    
    
    this.getGridPanel = function(){
        var gridPanelID = "AwardGridPanel_AwardList";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
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

Ext.extend(Srims.awards.AwardQueryWindow, Ext.Window);
