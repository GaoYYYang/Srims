
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampGridPanel = function(){

    var url = Srims.service.stamp.StampService + '/Query';
	var params = {};
    this._store = new Srims.stamp.StampStore(params,url);
    this._store.gird = this;
    this._columnModel = new Srims.stamp.StampGridPanle_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StampGridPanel_ToolBar(this._selections, this._store);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    //public methods
    this.getStampStore = function(){
        return this._store;
    }
    
    Srims.stamp.StampGridPanel.superclass.constructor.call(this, {
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
        var stamp = grid.getStampStore().getAt(rowIndex);
        Srims.stamp.editStamp(stamp, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.stamp.StampGridPanel, Srims.component.GridPanel, {});
