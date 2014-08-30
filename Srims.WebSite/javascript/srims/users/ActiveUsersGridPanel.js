
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.ActiveUsersGridPanel = function(id, userStore, title, iconCls){
    //fields
    this._userStore = userStore;
    this._userStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.users.UserGridPanel_ColumnModel();
    this._filters = new Srims.users.UserGridPanel_GridFilters();
    this._toolbar = new Srims.users.ActiveUsersGridPanel_ToolBar(this._userStore, this._selections, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的用户'
    });
    
    //public methods
    this.getUserStore = function(){
        return this._userStore;
    };
    
    //constructor
    Srims.users.ActiveUsersGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._userStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._userStore,
            plugins: this._filters,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._userStore.load();
}
Ext.extend(Srims.users.ActiveUsersGridPanel, Ext.grid.GridPanel);
