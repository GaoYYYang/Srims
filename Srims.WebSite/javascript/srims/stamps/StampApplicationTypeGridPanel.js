
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGridPanel = function(id, stampApplicationTypeStore, title, iconCls) {

    //fields
    this._stampApplicationTypeStore = stampApplicationTypeStore;
  
    this._stampApplicationTypeStore.grid = this;

    //controls
    this._selections = new Ext.grid.RowSelectionModel();

    this._columnModel = new Srims.stamp.StampApplicationTypeGridPanel_ColumnModel();
    // this._filters = new Srims.stamp.StampApplicationTypeGridPanel_GridFilters();
    this._toolbar = new Srims.stamp.StampApplicationTypeGridPanel_ToolBar(this._selections, this._stampApplicationTypeStore, id);

    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的文印申请类型'
    });

    //public methods
    this.getStampApplicationTypeStore = function() {
        return this._stampApplicationTypeStore;
    }

    //constructor
    Srims.stamp.StampApplicationTypeGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._stampApplicationTypeStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        //   plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._stampApplicationTypeStore,
            //    plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._stampApplicationTypeStore.load();
    /*this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    var stampApplicationType = grid.getStore().getAt(rowIndex);
    Srims.stamp.AnnouncementAction.editAnnouncement(announcement);
    }*/
}
Ext.extend(Srims.stamp.StampApplicationTypeGridPanel, Ext.grid.GridPanel);
