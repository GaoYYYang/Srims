
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow = function(id, store, isHorizontal, queryParams){

    this._id = id;
    this._store = store;
    this._isHorizontal = isHorizontal;
    
    this._basicPanel = new Srims.projects.ProjectQueryWindow_BasicPanel(this._isHorizontal);
    this._typePanel = new Srims.projects.ProjectQueryWindow_TypePanel(this._isHorizontal, true);
    this._fundPanel = new Srims.projects.ProjectQueryWindow_FundPanel();
    this._memberPanel = new Srims.component.QueryWindow_MemberPanel('项目成员信息');
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.getGridPanel();
            this.window.clearParams();
            
            Srims.SetQueryParams.clearParams(queryParams, new Array('isHorizontal', 'token'));
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            
            window.getParams();
            if (isHorizontal) 
                Srims.common.newView(Srims.common.ViewType.HorizontalProjectQuery, Srims.SetQueryParams.toJSON(queryParams));
            else 
                Srims.common.newView(Srims.common.ViewType.VerticalProjectQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            if (isHorizontal) 
                Srims.common.showViewWindow(Srims.common.ViewType.HorizontalProjectQuery);
            else 
                Srims.common.showViewWindow(Srims.common.ViewType.VerticalProjectQuery);
            
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
    
    Srims.projects.ProjectQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isHorizontal ? '横向项目查询' : '纵向项目查询',
        iconCls: isHorizontal ? 'icon-project-horizontal-query' : 'icon-project-vertical-query',
        width: 850,
        height: 610,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 520,
            layout: 'form',
            autoScroll: true,
            height: 535,
            labelWidth: 100,
            autoScroll: true,
            items: [this._basicPanel, this._fundPanel, this._memberPanel]
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            labelWidth: 100,
            items: [this._typePanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        this._basicPanel.buildParams(queryParams);
        this._fundPanel.buildParams(queryParams);
        this._memberPanel.buildParams(queryParams);
        this._typePanel.buildParams(queryParams);
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._fundPanel.clearParams();
        this._memberPanel.clearParams();
        this._typePanel.clearParams();
    }
    this.getGridPanel = function(){
        var gridPanelID = this._isHorizontal ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
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
    //event
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.projects.ProjectQueryWindow, Ext.Window);

