
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampGridPanel = function(stuff, stuffStore, stampApplication, stampApplicationStore){

    this._stuff = stuff;
    this._stuffStore = stuffStore;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._store = new Srims.stamp.StuffStampStore(this._stuff.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.stamp.StuffStampGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StuffStampGridPanel_ToolBar(this._selections, this._store, this._stuff, this._stuffStore, this._stampApplication, this._stampApplicationStore);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    //public methods
    this.getStuffStampStore = function(){
        return this._store;
    }
    
    Srims.stamp.StuffStampGridPanel.superclass.constructor.call(this, {
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
        height: 220,
        view: this._view
    });
    this._store.load();
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stuffStamp = grid.getStuffStampStore().getAt(rowIndex);
        Srims.type.editStuffStamp(stuffStamp, this._store, this._stuff, this._stuffStore, this._stampApplication, this._stampApplicationStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.stamp.StuffStampGridPanel, Srims.component.GridPanel, {});
