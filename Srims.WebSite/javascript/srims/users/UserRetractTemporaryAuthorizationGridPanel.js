
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRetractTemporaryAuthorizationGridPanel = function(id, permissionStore, title, iconCls){
    //fields
    this._permissionStore = permissionStore;
    this._permissionStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel();
    this._toolbar = new Srims.users.UserRetractTemporaryAuthorizationGridPanel_ToolBar(this._permissionStore, this._selections, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该用户没有临时权限'
    });
    
    //public methods
    this.getpermissionStore = function(){
        return this._permissionStore;
    };
    
    //constructor
    Srims.users.UserRetractTemporaryAuthorizationGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._permissionStore,
        sm: this._selections,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        colModel: this._columnModel,
        loadMask: true,
        view: this._view,
        tbar: this._toolbar
    });
    this._permissionStore.load();
}
Ext.extend(Srims.users.UserRetractTemporaryAuthorizationGridPanel, Ext.grid.GridPanel);
