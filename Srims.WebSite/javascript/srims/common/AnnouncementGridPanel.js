
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel = function(id, announcementStore, title, iconCls){

    //fields
    this._announcementStore = announcementStore;
    this._announcementStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.common.AnnouncementGridPanel_ColumnModel();
    this._filters = new Srims.common.AnnouncementGridPanel_GridFilters();
    this._toolbar = new Srims.common.AnnouncementGridPanel_ToolBar(this._selections, this._announcementStore, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的通知'
    });
    
    //public methods
    this.getAnnouncementStore = function(){
        return this._announcementStore;
    }
    
    //constructor
    Srims.common.AnnouncementGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._announcementStore,
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
            store: this._announcementStore,
            plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._announcementStore.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var announcement = grid.getStore().getAt(rowIndex);
        Srims.common.AnnouncementAction.editAnnouncement(announcement);
    }
}
Ext.extend(Srims.common.AnnouncementGridPanel, Ext.grid.GridPanel);
