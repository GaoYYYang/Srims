
if (!Srims.common) 
    ext.namespace('Srims.common');

Srims.common.LogGridPanel = function(id, LogStore, title, iconCls, queryParams){

    //fields
    this._logStore = LogStore;
    this._logStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.common.LogGridPanel_ColumnModel();
    this._filters = new Srims.common.LogGridPanel_GridFilters();
    this._toolbar = new Srims.common.LogGridPanel_ToolBar(LogStore, this._selections, queryParams, id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的日志'
    });
    //public methods
    this.getLogStore = function(){
        return this._logStore;
    }
    //constructor
    Srims.common.LogGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._logStore,
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
            store: this._logStore,
            plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录'
        })
    });
    
    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
    
        var log = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.common.showLog(log, store);
    }
    
}
Ext.extend(Srims.common.LogGridPanel, Ext.grid.GridPanel);
