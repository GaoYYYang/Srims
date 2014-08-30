
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.ProjectStatisticWindow = function(id, iconCls, title, url, dimension, renderer, additionalPanel, viewType){

    this._title = title;
    this._url = url;
    this._iconCls = iconCls;
    this._renderer = renderer;
    this._additionalPanel = additionalPanel;
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(dimension);
    this._basicPanel = new Srims.projects.ProjectQueryWindow_BasicPanel();
    this._typePanel = new Srims.projects.ProjectQueryWindow_TypePanel(undefined, false);
    this._fundPanel = new Srims.projects.ProjectQueryWindow_FundPanel();
    this._memberPanel = new Srims.component.QueryWindow_MemberPanel('项目成员信息');
    
    this._buttonStatistic = new Ext.Button({
        minWidth: 80,
        text: '统 计',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.showResult(this._title, this._iconCls, response, this._renderer);
                }
            });
        }
    });
    this._buttonExport = new Ext.Button({
        minWidth: 80,
        text: '导 出',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.exportToExcel(this._title, response, this._renderer);
                }
            });
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            var params = window.getParams();
            Srims.common.newView(viewType, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(viewType);
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
    
    var items = [this._dimensionPanel, this._basicPanel, this._fundPanel, this._memberPanel];
    if (this._additionalPanel) 
        items = [this._dimensionPanel, this._additionalPanel, this._basicPanel, this._fundPanel, this._memberPanel];
    
    Srims.statistic.ProjectStatisticWindow.superclass.constructor.call(this, {
        id: id,
        title: title,
        iconCls: iconCls,
        width: 836,
        height: 560,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 510,
            layout: 'form',
            autoScroll: true,
            height: 482,
            labelWidth: 100,
            items: items
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            labelWidth: 100,
            items: [this._typePanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    this.isValid = function(){
        var result = true;
        
        result = this._dimensionPanel.isValid() && result;
        
        if (this._additionalPanel && this._additionalPanel.isValid) 
            result = this._additionalPanel.isValid() && result;
        
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._fundPanel.buildParams(params);
        this._memberPanel.buildParams(params);
        this._typePanel.buildParams(params);
        
        if (this._additionalPanel) 
            this._additionalPanel.buildParams(params);
        
        params.isStatistic = true;
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._fundPanel.clearParams();
        this._memberPanel.clearParams();
        this._typePanel.clearParams();
        
        if (this._additionalPanel) 
            this._additionalPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.ProjectStatisticWindow, Ext.Window);

