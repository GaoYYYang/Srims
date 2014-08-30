
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupGridPanel = function(id, stampApplicationTypeGroupStore, title, iconCls) {

    //fields
    this._stampApplicationTypeGroupStore = stampApplicationTypeGroupStore;

    this._stampApplicationTypeGroupStore.grid = this;

    //controls
    this._selections = new Ext.grid.RowSelectionModel();

    this._columnModel = new Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel();
    // this._filters = new Srims.stamp.StampApplicationTypeGridPanel_GridFilters();
    this._toolbar = new Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar(this._selections, this._stampApplicationTypeGroupStore, id);

    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的文印申请类型组'
    });

    //public methods
    this.getStampApplicationTypeGroupStore = function() {
        return this._stampApplicationTypeGroupStore;
    }

    //constructor
    Srims.stamp.StampApplicationTypeGroupGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._stampApplicationTypeGroupStore,
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
            store: this._stampApplicationTypeGroupStore,
            //    plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._stampApplicationTypeGroupStore.load();
    /*this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    var stampApplicationTypeGroup = grid.getStore().getAt(rowIndex);
    Srims.stamp.AnnouncementAction.editAnnouncement(announcement);
    }*/
}
Ext.extend(Srims.stamp.StampApplicationTypeGroupGridPanel, Ext.grid.GridPanel);
