
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperQueryWindow = function(id, store, isMagazineQuery, queryParams) {

    this._id = id;
    this._store = store;
    this._params = queryParams;
    this._basicPanel = new Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel();
    this._otherPanel = new Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel();
    this._expertPanel = new Srims.component.QueryWindow_MemberPanel('专家信息');
    
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
            Srims.common.newView(Srims.common.ViewType.PaperQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){

        Srims.common.showViewWindow(Srims.common.ViewType.PaperQuery);
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

    Srims.papers.LiberalArtsPaperQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文科论文查询',
        iconCls: 'icon-paper-query',
        width: 716,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        autoHeight: true,
        stateful: false,
        //height: 550,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 760,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 550,
            deferredRender: false,
            autoScroll: true,
            items: [this._basicPanel, this._otherPanel, this._expertPanel]
        })],
       // buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
   
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._expertPanel.clearParams();
    }
    
    this.getGridPanel = function(){
    var gridPanelID = "LiberalArtsPaperGridPanel_LiberalArtsPaperList";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button){
        var window = button.window;
              window.getGridPanel();
              queryParams = window.getParams();

        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperQueryWindow, Ext.Window);
