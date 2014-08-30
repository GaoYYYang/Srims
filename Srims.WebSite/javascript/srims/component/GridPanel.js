
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.GridPanel = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(params){
    
        if (params.stateful == undefined) 
            params.stateful = true;
        if (params.enableColumnHide == undefined) 
            params.enableColumnHide = true;
        if (params.enableColumnMove == undefined) 
            params.enableColumnMove = true;
        if (params.border == undefined) 
            params.border = false;
        if (params.region == undefined) 
            params.region = 'center';
        if (params.loadMask == undefined) 
            params.loadMask = true;
        if (params.closable == undefined) 
            params.closable = true;
        if (params.defaultBBar) 
            params.bbar = new Ext.PagingToolbar({
                pageSize: 40,
                store: params.store,
                plugins: params.plugins,
                displayInfo: true,
                displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
                emptyMsg: "没有可以显示的记录"
            })
        params.view = new Ext.grid.GridView({
            forceFit: true,
            ignoreAdd: true,
            emptyText: '没有满足条件的记录'
        });
        
        this._store = params.store;
        Srims.component.GridPanel.superclass.constructor.call(this, params);
    },
    getStore: function(){
        return this._store;
    },
    onDestroy: function(){
        if (this.queryWindow) {
            this.queryWindow.show();
            this.queryWindow.close();
        }
        Srims.component.GridPanel.superclass.onDestroy.call(this);
    }
})
