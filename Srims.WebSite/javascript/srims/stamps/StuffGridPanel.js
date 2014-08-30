
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffGridPanel = function(stampApplication, stampApplicationStore, stuffStore, isforStampApplicationEditPanel){

    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._store = stuffStore;
    this._store.gird = this;
    
    this.stuffs = new Array();
    
    this._columnModel = new Srims.stamp.StuffGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StuffGridPanel_ToolBar(this._selections, this._store, this._stampApplication, this._stampApplicationStore, isforStampApplicationEditPanel);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    
    //public methods
    this.getStuffStore = function(){
        return this._store;
    }
    
    this.getStuffs = function(){
        for (i = 0; i < this._store.getCount(); i++) {
            var stuff = this._store.getAt(i);
            stuff.set('id', '');
            this.stuffs[this.stuffs.length] = stuff;
        }
        
        return this.stuffs;
    }
    this.setToolBar = function(visible){
        this._toolBar.setVisible(visible);
    }
    
    Srims.stamp.StuffGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        width: 500,
        view: this._view,
        autoHeight: true
    });
    
    this._store.load();
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stuff = grid.getStuffStore().getAt(rowIndex);
        Srims.stamp.editStuff(stuff, this._store, this._stampApplication, this._stampApplicationStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.stamp.StuffGridPanel, Srims.component.GridPanel, {});
